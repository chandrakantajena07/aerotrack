import type { Map } from 'maplibre-gl'
import { fetchAircraftInView } from './adsbClient'
import { viewportRadiusNm } from '../map/map'
import type { Aircraft } from './types'

const REFRESH_MS = 12000
const MOVE_DEBOUNCE_MS = 900

export interface PollCallbacks {
  onData: (aircraft: Aircraft[], at: Date) => void
  onError: (err: unknown) => void
}

export class ViewportPollLoop {
  private map: Map
  private callbacks: PollCallbacks
  private timer: ReturnType<typeof setInterval> | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null
  private inFlight: AbortController | null = null
  private stopped = false

  constructor(map: Map, callbacks: PollCallbacks) {
    this.map = map
    this.callbacks = callbacks
  }

  start(): void {
    this.stopped = false
    this.fetchNow()
    this.timer = setInterval(() => this.fetchNow(), REFRESH_MS)
    this.map.on('moveend', this.onMoveEnd)
  }

  stop(): void {
    this.stopped = true
    if (this.timer) clearInterval(this.timer)
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    this.inFlight?.abort()
    this.map.off('moveend', this.onMoveEnd)
  }

  private onMoveEnd = (): void => {
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => this.fetchNow(), MOVE_DEBOUNCE_MS)
  }

  private async fetchNow(): Promise<void> {
    if (this.stopped) return
    this.inFlight?.abort()
    const controller = new AbortController()
    this.inFlight = controller
    const center = this.map.getCenter()
    const radiusNm = viewportRadiusNm(this.map)
    try {
      const aircraft = await fetchAircraftInView(
        { lat: center.lat, lon: center.lng, radiusNm },
        controller.signal,
      )
      if (this.stopped || controller.signal.aborted) return
      this.callbacks.onData(aircraft, new Date())
    } catch (err) {
      if (controller.signal.aborted) return
      this.callbacks.onError(err)
    }
  }
}
