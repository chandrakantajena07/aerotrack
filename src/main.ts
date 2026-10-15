import 'maplibre-gl/dist/maplibre-gl.css'
import './style.css'
import { createMap } from './map/map'
import { AircraftLayer } from './map/aircraftLayer'
import { ViewportPollLoop } from './data/pollLoop'
import { DetailPanel } from './ui/detailPanel'
import { StatsBar } from './ui/statsBar'
import { SearchBox } from './ui/searchBox'

const mapContainer = document.getElementById('map')!
const overlay = document.getElementById('overlay')!

const map = createMap(mapContainer)
const aircraftLayer = new AircraftLayer(map)
const detailPanel = new DetailPanel(overlay)
const statsBar = new StatsBar(overlay)
new SearchBox(overlay, (callsign) => {
  const found = aircraftLayer.findByCallsign(callsign)
  if (!found) return false
  aircraftLayer.setSelected(found.icao)
  detailPanel.show(found)
  map.flyTo({ center: [found.lon, found.lat], zoom: Math.max(map.getZoom(), 6) })
  return true
})

aircraftLayer.onAircraftSelect((a) => {
  if (a) detailPanel.show(a)
  else detailPanel.hide()
})

map.on('load', () => {
  aircraftLayer.init()

  const poll = new ViewportPollLoop(map, {
    onData: (aircraft, at) => {
      aircraftLayer.setData(aircraft)
      statsBar.update(aircraft.length, at)
      const selected = aircraftLayer.getSelectedIcao()
      if (selected) {
        const refreshed = aircraftLayer.getByIcao(selected)
        if (refreshed) detailPanel.show(refreshed)
      }
    },
    onError: (err) => {
      console.error('aerotrack: failed to fetch aircraft', err)
      statsBar.setError('data feed unreachable, retrying…')
    },
  })
  poll.start()
})
