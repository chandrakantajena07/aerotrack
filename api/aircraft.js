export default async function handler(req, res) {
  const { lat, lon, radius } = req.query
  const latNum = Number(lat)
  const lonNum = Number(lon)
  const radiusNum = Math.min(Math.max(Math.round(Number(radius) || 50), 1), 250)

  if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) {
    res.status(400).json({ error: 'lat and lon query params are required numbers' })
    return
  }

  const url = `https://api.adsb.lol/v2/point/${latNum.toFixed(4)}/${lonNum.toFixed(4)}/${radiusNum}`
  try {
    const upstream = await fetch(url, { headers: { 'User-Agent': 'aerotrack/1.0 (+contact: chandrakanta@whitenoiseacademy.com)' } })
    const body = await upstream.text()
    res.status(upstream.status)
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    res.send(body)
  } catch {
    res.status(502).json({ error: 'upstream fetch failed' })
  }
}
