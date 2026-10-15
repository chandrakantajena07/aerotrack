// Seed task list for the Aerotrack build arc.
// id scheme: P<phase>[.<leaf>] — lexicographically sortable, P0-P9.
export const seedTasks = [
  { id: 'P0', parent: '', title: 'Scaffold & base map', acceptance: '', component: '' },
  { id: 'P0.1', parent: 'P0', title: 'Vite + TypeScript project scaffolded', acceptance: 'package.json has vite + typescript deps; npm run dev starts without error', component: 'shell' },
  { id: 'P0.2', parent: 'P0', title: 'MapLibre GL base map renders full-bleed dark basemap', acceptance: 'npm run dev loaded in a browser shows a pannable, zoomable world map with no console errors', component: 'map' },
  { id: 'P0.3', parent: 'P0', title: 'Project folder structure (src/map, src/data, src/ui)', acceptance: 'ls src shows map, data, and ui directories', component: 'shell' },

  { id: 'P1', parent: '', title: 'Live aircraft layer', acceptance: '', component: '' },
  { id: 'P1.1', parent: 'P1', title: 'adsb.lol fetch client bounded to current viewport', acceptance: 'src/data/adsbClient.ts exports a function that fetches live aircraft for a lat/lon/radius and returns parsed records with lat, lon, track, altitude, speed, callsign', component: 'data' },
  { id: 'P1.2', parent: 'P1', title: 'Plane markers rendered with heading rotation', acceptance: 'a MapLibre layer renders a plane icon per aircraft whose rotation is bound to each aircraft track field; rotating/panning the map shows icons pointing along their reported heading', component: 'map' },
  { id: 'P1.3', parent: 'P1', title: 'Click-for-detail panel', acceptance: 'clicking a plane marker in the browser opens a panel showing callsign, altitude, ground speed, heading, and squawk for that aircraft', component: 'ui' },
  { id: 'P1.4', parent: 'P1', title: 'Auto-refresh loop tied to viewport, cleaned up correctly', acceptance: 'the aircraft layer refetches on a fixed interval and on pan/zoom (debounced); devtools shows exactly one active poll interval at a time, none left running after navigating away', component: 'data' },

  { id: 'P2', parent: '', title: 'Polish & local verification', acceptance: '', component: '' },
  { id: 'P2.1', parent: 'P2', title: 'Dark live-intel theme across map and UI chrome', acceptance: 'base map style and all panels share a consistent dark theme and accent color, confirmed visually in the browser', component: 'ui' },
  { id: 'P2.2', parent: 'P2', title: 'Search/filter by callsign', acceptance: 'typing a callsign in the search box flies the map to and highlights the matching in-view aircraft', component: 'ui' },
  { id: 'P2.3', parent: 'P2', title: 'Live stats bar (aircraft count, last update time)', acceptance: 'the header shows an aircraft-in-view count and a last-updated timestamp that both change after a refresh', component: 'ui' },
  { id: 'P2.4', parent: 'P2', title: 'Full manual walkthrough with zero console errors', acceptance: 'npm run dev loaded in a browser; pan, zoom, search, and click-for-detail walkthrough completes with zero console errors', component: 'integration' },

  { id: 'P3', parent: '', title: 'Ship to GitHub', acceptance: '', component: '' },
  { id: 'P3.1', parent: 'P3', title: 'Git repo initialized with a correct .gitignore', acceptance: 'git status is clean after the initial commit; node_modules and dist are not tracked', component: 'ship' },
  { id: 'P3.2', parent: 'P3', title: 'Public GitHub repo created and pushed', acceptance: 'gh repo view <owner>/aerotrack succeeds and shows the pushed main branch', component: 'ship' },

  { id: 'P4', parent: '', title: 'Deploy to Vercel', acceptance: '', component: '' },
  { id: 'P4.1', parent: 'P4', title: 'Vercel build config correct for the static Vite app', acceptance: 'vercel build (or an equivalent local production build) completes without error', component: 'ship' },
  { id: 'P4.2', parent: 'P4', title: 'Production deployment live and verified', acceptance: 'the deployed Vercel URL returns 200, and opening it in a browser shows live aircraft on the map with zero console errors', component: 'ship' },
]
