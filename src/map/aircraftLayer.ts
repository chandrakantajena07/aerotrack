import { Map as MapLibreMap, GeoJSONSource, type MapLayerMouseEvent } from 'maplibre-gl'
import type { Feature, FeatureCollection, Point } from 'geojson'
import type { Aircraft } from '../data/types'
import { buildPlaneIcon } from './planeIcon'

const SOURCE_ID = 'aircraft'
const ICON_LAYER_ID = 'aircraft-icons'
const HIGHLIGHT_LAYER_ID = 'aircraft-highlight'
const ICON_ID = 'plane-icon'

function toFeature(a: Aircraft): Feature<Point> {
  return {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [a.lon, a.lat] },
    properties: {
      icao: a.icao,
      callsign: a.callsign,
      heading: a.headingDeg,
    },
  }
}

export class AircraftLayer {
  private map: MapLibreMap
  private byIcao = new Map<string, Aircraft>()
  private selectedIcao: string | null = null
  private onSelect: ((a: Aircraft | null) => void) | null = null

  constructor(map: MapLibreMap) {
    this.map = map
  }

  init(): void {
    const icon = buildPlaneIcon(32, '#38bdf8')
    this.map.addImage(ICON_ID, icon)

    this.map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] } as FeatureCollection,
    })

    this.map.addLayer({
      id: HIGHLIGHT_LAYER_ID,
      type: 'circle',
      source: SOURCE_ID,
      filter: ['==', ['get', 'icao'], ''],
      paint: {
        'circle-radius': 14,
        'circle-color': '#f59e0b',
        'circle-opacity': 0.35,
      },
    })

    this.map.addLayer({
      id: ICON_LAYER_ID,
      type: 'symbol',
      source: SOURCE_ID,
      layout: {
        'icon-image': ICON_ID,
        'icon-size': 0.9,
        'icon-rotate': ['get', 'heading'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    })

    this.map.on('click', ICON_LAYER_ID, (e: MapLayerMouseEvent) => {
      const f = e.features?.[0]
      const icao = f?.properties?.icao as string | undefined
      if (!icao) return
      const aircraft = this.byIcao.get(icao) ?? null
      this.setSelected(icao)
      this.onSelect?.(aircraft)
    })

    this.map.on('mouseenter', ICON_LAYER_ID, () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })
    this.map.on('mouseleave', ICON_LAYER_ID, () => {
      this.map.getCanvas().style.cursor = ''
    })
  }

  onAircraftSelect(cb: (a: Aircraft | null) => void): void {
    this.onSelect = cb
  }

  setSelected(icao: string | null): void {
    this.selectedIcao = icao
    this.map.setFilter(HIGHLIGHT_LAYER_ID, ['==', ['get', 'icao'], icao ?? ''])
  }

  getSelectedIcao(): string | null {
    return this.selectedIcao
  }

  setData(aircraft: Aircraft[]): void {
    this.byIcao = new Map(aircraft.map((a) => [a.icao, a]))
    const source = this.map.getSource(SOURCE_ID) as GeoJSONSource | undefined
    source?.setData({
      type: 'FeatureCollection',
      features: aircraft.map(toFeature),
    })
  }

  getByIcao(icao: string): Aircraft | undefined {
    return this.byIcao.get(icao)
  }

  findByCallsign(callsign: string): Aircraft | undefined {
    const needle = callsign.trim().toUpperCase()
    if (!needle) return undefined
    for (const a of this.byIcao.values()) {
      if (a.callsign.toUpperCase() === needle) return a
    }
    return undefined
  }

  all(): Aircraft[] {
    return [...this.byIcao.values()]
  }
}
