import { Map, NavigationControl, LngLat, setWorkerUrl } from 'maplibre-gl'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'

setWorkerUrl(maplibreWorkerUrl)

const DARK_STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

export function createMap(container: HTMLElement): Map {
  const map = new Map({
    container,
    style: DARK_STYLE_URL,
    center: [2.5, 49.5],
    zoom: 5.2,
    attributionControl: { compact: true },
  })
  map.addControl(new NavigationControl({ showCompass: false }), 'top-right')
  return map
}

/** Great-circle distance in nautical miles from the map center to the nearest viewport edge. */
export function viewportRadiusNm(map: Map): number {
  const bounds = map.getBounds()
  const center = map.getCenter()
  const edge = new LngLat(bounds.getEast(), center.lat)
  return center.distanceTo(edge) / 1852
}
