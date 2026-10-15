# Plan of Record — Aerotrack

Aerotrack is a browser app with one job: show every aeroplane currently
flying, worldwide, on a live map — nothing else. No news, no markets, no
geopolitics. A dark map, little plane icons that point the way each aircraft
is actually heading, and a click-for-details panel.

This plan is written for a non-technical reader. Each phase below is a
self-contained unit of visible progress. "Done" for a phase means its
acceptance tests (see `BUILDPLAN.md`, the generated mirror of this plan) have
actually been run, not just that code exists.

## P0 — Scaffold & base map

Set up the basic project skeleton (Vite + TypeScript) and get a plain, dark,
pannable/zoomable world map rendering in the browser. Nothing moving yet —
just the empty map the planes will later appear on.

## P1 — Live aircraft layer

Connect to a free, public live-aircraft-position feed (adsb.lol) and draw
every aircraft currently in view as a small plane icon rotated to match its
real-world heading. Clicking a plane opens a panel with its callsign,
altitude, speed, heading, and squawk code. The layer keeps itself fresh by
refetching on a timer and whenever the user pans or zooms to a new area.

## P2 — Polish & local verification

Finish the dark "live radar" look across the whole page, add a search box
that flies the map to a specific callsign, and add a small live stats bar
(how many aircraft are currently in view, when the data last updated). Then
walk through the whole app by hand in a real browser and confirm nothing
throws a console error.

## P3 — Ship to GitHub

Turn the project into a real git repository and push it to a new public
GitHub repo.

## P4 — Deploy to Vercel

Deploy the production build to Vercel and confirm the live public URL
actually shows moving aircraft with no errors.
