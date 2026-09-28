# project decisions

- keep the public resource directory behind `src/lib/api.ts` and use the shared environment-backed database client so map data cannot drift to a retired service.
- keep campus resources as reviewed client-side records because student mode needs fast, school-specific filtering and source notes.
- use one shared city configuration for maps, postcode search, marketing copy, and sitemap generation to prevent city lists from drifting.
- treat local network profiles and job requests as authenticated backend data because approval status and private ownership require row-level access control.
- keep exact home addresses out of public maker records and display approximate coordinates because maker privacy is a product requirement.