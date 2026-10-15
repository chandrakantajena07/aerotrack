# Architecture — Aerotrack

Six components, each matching a phase's `component` key in `tasks.json`.
The cockpit recolors the boxes below from live task-rollup state: grey =
untouched, amber = in progress, green = done and verified.

- **shell** (`index.html`, `src/main.ts`, project scaffolding) — the page
  shell and build tooling everything else mounts into.
- **data** (`src/data/adsbClient.ts`) — polls the adsb.lol live ADS-B feed
  for the current map viewport and parses aircraft records.
- **map** (`src/map/*`) — the MapLibre GL base map and the aircraft marker
  layer, including heading-rotated plane icons. Reads aircraft records from
  `data`.
- **ui** (`src/ui/*`) — the detail panel, search box, and stats bar. Reads
  selection/search state driven by `map` and `data`.
- **integration** — the manual browser walkthrough proving map, data, and ui
  work together with zero console errors. Not a source directory — a
  verification pass.
- **ship** — git init, GitHub push, and the Vercel production deployment.

```svg
<svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <style>
    .box { stroke: #333; stroke-width: 2; fill: #bbb; }
    .label { font-size: 15px; fill: #111; text-anchor: middle; }
    .edge { stroke: #888; stroke-width: 1.5; fill: none; marker-end: url(#arrow); }
  </style>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#888" />
    </marker>
  </defs>

  <rect x="20" y="20" width="860" height="420" fill="none" stroke="#222" stroke-dasharray="6,4" />
  <text x="450" y="45" class="label" font-size="18">shell (comp-shell)</text>
  <rect id="comp-shell" class="box" x="30" y="55" width="840" height="30" fill="#ddd" />

  <rect id="comp-data" class="box" x="80" y="150" width="160" height="60" />
  <text x="160" y="185" class="label">data</text>

  <rect id="comp-map" class="box" x="370" y="150" width="160" height="60" />
  <text x="450" y="185" class="label">map</text>

  <rect id="comp-ui" class="box" x="660" y="150" width="160" height="60" />
  <text x="740" y="185" class="label">ui</text>

  <rect id="comp-integration" class="box" x="370" y="280" width="160" height="50" fill="#ccc" />
  <text x="450" y="310" class="label">integration</text>

  <rect id="comp-ship" class="box" x="370" y="370" width="160" height="50" fill="#ccc" />
  <text x="450" y="400" class="label">ship</text>

  <path class="edge" d="M240,180 L370,180" />
  <path class="edge" d="M530,180 L660,180" />
  <path class="edge" d="M450,210 L450,280" />
  <path class="edge" d="M450,330 L450,370" />
</svg>
```
