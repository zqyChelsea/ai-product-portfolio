---
name: live-supplier-data
description: Integrate licensed flight, hotel and Japanese transit gateways with freshness, provenance and graceful missing-data states.
---

# Live supplier data

Keep keys server-side. Implement partner adapters against documented, authorized APIs only; Trip.com developer access and Japan transit data licensing must be obtained separately. A traveler-facing JR/Osaka Metro website is a human verification source, not a machine API. Normalize supplier responses into `amount`, `currency`, `quotedAt`, `source`, `bookingUrl` and `status`. Validate currencies, dates, route endpoints and positive amounts. Do not combine a live flight with a fixture hotel without marking the whole budget incomplete. Use short timeouts and explicit provider errors. Never infer a price from an attraction's rank or a train's distance. Only deep-link to allowed HTTPS destinations.
