import { defineConfig, type Plugin } from 'vite'

/** Dev-only mirror of api/aircraft.js, so `npm run dev` doesn't hit adsb.lol's CORS wall. */
function adsbDevProxy(): Plugin {
  return {
    name: 'adsb-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/aircraft', async (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost')
        const lat = Number(url.searchParams.get('lat'))
        const lon = Number(url.searchParams.get('lon'))
        const radius = Math.min(Math.max(Math.round(Number(url.searchParams.get('radius')) || 50), 1), 250)
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'lat and lon query params are required numbers' }))
          return
        }
        try {
          const upstream = await fetch(`https://api.adsb.lol/v2/point/${lat.toFixed(4)}/${lon.toFixed(4)}/${radius}`, { headers: { 'User-Agent': 'aerotrack/1.0 (+contact: chandrakanta@whitenoiseacademy.com)' } })
          const body = await upstream.text()
          res.statusCode = upstream.status
          res.setHeader('Content-Type', 'application/json')
          res.end(body)
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'upstream fetch failed' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [adsbDevProxy()],
  worker: { format: 'es' },
  optimizeDeps: { exclude: ['maplibre-gl'] },
})
