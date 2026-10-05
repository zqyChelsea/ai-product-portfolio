# Kansai Journey Agent

This is a separate travel-planning application and the portfolio case's runnable implementation. Run from this directory with Node 22+: `npm run dev`; tests: `npm test`. The static portfolio is exported to GitHub Pages and **cannot** host server-side secrets or supplier API calls. The web app can be previewed there, but live planning requires this backend deployed separately and configured with licensed providers.

## Product contract

- Ask for budget, dates, transport, interests, side-trip scope and must-see attractions before generating a route. Prefer multiple-choice answers; show a custom input only if choices do not fit.
- Hard constraints: never silently drop a selected must-see; never describe a fixture, stale record, or missing price as live; never substitute NGO for KIX without an explicit total-time-and-cost comparison. A route is a draft until all required supplier quotes are verified.
- Public transport is the default. Do not introduce car legs unless the user opts in; do not suggest shinkansen solely because it is fastest when a cheaper train is adequate.
- Keep AI-generated prose separate from supplier facts. A language model cannot invent a fare, timetable, ticket price, availability or booking link.
- The official JR West and Osaka Metro traveler sites are verification links, not scraping/API licenses. Use an authorized transit feed for machine-readable routing.

## Modules and skills

- `lib/catalog.mjs`: curated attractions and geography. Read `skills/attraction-discovery/SKILL.md` before changing attraction choice logic.
- `lib/providers.mjs`: flight, hotel and transit gateway clients. Read `skills/live-supplier-data/SKILL.md` before adding an adapter.
- `lib/planner.mjs`: itinerary assembly and validation. Read `skills/route-planning/SKILL.md` before changing route decisions.
- `lib/budget.mjs`: currency and completeness checks. Read `skills/budget-guardrail/SKILL.md` before changing money calculations.
- `lib/agent.mjs`: bounded language-model enrichment. It must never override verified supplier fields.

## API contract

`GET /api/status` reports configured capabilities without exposing secrets. `GET /api/attractions` returns pre-planning choices. `POST /api/plan` accepts selected constraints and returns the itinerary, provenance per quote, budget status, warnings and agent availability. Request validation, timeout, input-size limit and rate limit live in `server.mjs`.

`DATA_MODE=fixture` is for a clearly labelled end-to-end rehearsal. `DATA_MODE=live` requires provider gateways and does not silently fall back to fixtures. Exact supplier schemas are mapped in a separately owned gateway; changing only `xxxxx-api` and `xxxxx-url` will not magically grant Trip.com partner access.
