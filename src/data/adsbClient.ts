import type { AdsbRawAircraft, Aircraft, ViewportQuery } from './types'

const MAX_RADIUS_NM = 250

function parseAircraft(raw: AdsbRawAircraft): Aircraft | null {
  if (typeof raw.lat !== 'number' || typeof raw.lon !== 'number') return null
  return {
    icao: raw.hex,
    callsign: (raw.flight ?? raw.hex).trim(),
    registration: raw.r ?? null,
    type: raw.t ?? null,
    lat: raw.lat,
    lon: raw.lon,
    headingDeg: typeof raw.track === 'number' ? raw.track : 0,
    altitudeFt: raw.alt_baro ?? 'ground',
    speedKt: typeof raw.gs === 'number' ? raw.gs : null,
    squawk: raw.squawk ?? null,
    category: raw.category ?? null,
  }
}

/** Calls our own same-origin /api/aircraft proxy (api/aircraft.js in prod, the Vite dev-middleware locally) — adsb.lol itself sends no CORS headers for direct browser fetches. */
export async function fetchAircraftInView(query: ViewportQuery, signal?: AbortSignal): Promise<Aircraft[]> {
  const radius = Math.min(Math.max(Math.round(query.radiusNm), 1), MAX_RADIUS_NM)
  const params = new URLSearchParams({
    lat: query.lat.toFixed(4),
    lon: query.lon.toFixed(4),
    radius: String(radius),
  })
  const res = await fetch(`/api/aircraft?${params}`, { signal })
  if (!res.ok) throw new Error(`aircraft proxy responded ${res.status}`)
  const data = await res.json() as { ac?: AdsbRawAircraft[] }
  return (data.ac ?? []).map(parseAircraft).filter((a): a is Aircraft => a !== null)
}
