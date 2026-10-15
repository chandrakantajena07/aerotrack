# Aerotrack

A live map of every aeroplane currently broadcasting its position over the
area you're looking at — nothing else. No news, no markets, no geopolitics.

Visually inspired by [worldmonitor](https://github.com/koala73/worldmonitor)'s
dark "live intel" map style, but an independent, original codebase — not a
fork. worldmonitor's aircraft layer is tightly coupled to its own proprietary
backend (RPC services, a paid Wingbits enrichment API) and the project is
AGPL-3.0 licensed end to end, so this is a from-scratch build powered by a
free, public, keyless data source instead.

## How it works

- **Map**: [MapLibre GL JS](https://maplibre.org/) with the free
  [CARTO dark-matter](https://carto.com/basemaps) vector style.
- **Live aircraft data**: [adsb.lol](https://adsb.lol)'s public ADS-B API —
  free, no API key, globally covered, but bound to a 250 nautical mile radius
  per query (and it sends no CORS headers for direct browser calls). This app
  queries a radius around the current map center and refetches on pan/zoom
  and every 12 seconds. `api/aircraft.js` is a tiny same-origin proxy (a
  Vercel serverless function in production, a matching Vite dev-server
  middleware locally) that adds a descriptive User-Agent and works around the
  missing CORS headers.
- Click any plane for its callsign, altitude, ground speed, heading, and
  squawk. Search by callsign to fly to it if it's currently in view.

Because the data source is radius-bound, this shows live traffic **within
your current view**, like every other consumer flight tracker — it does not
attempt to render all in-flight aircraft worldwide in a single request.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Deployed on [Vercel](https://vercel.com) — `api/aircraft.js` is picked up
automatically as a serverless function, no extra configuration needed.
