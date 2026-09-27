# under the hood

## structure

fabnet is a react single-page application. the public atlas and local network are sibling experiences that share city definitions, map behavior, typography, controls, and visual tokens.

the public atlas lives in `src/components`. city and campus records live in `src/data`. backend reads and submissions pass through `src/lib/api.ts`. the local network is grouped in `src/localnetwork`, keeping maker discovery, joining, requests, dashboards, and public profiles close to their shared data shapes.

## data flow

when a visitor chooses a city, the map requests approved public locations for that exact city name. filters run in the browser, then the map receives only matching locations. student mode adds reviewed campus resources for the selected school without mixing restricted campus access into the public directory.

local network pages read approved maker profiles. profile owners may edit pending profiles, but public queries cannot return them until approval. fabrication requests are written to the backend and exposed according to ownership, city eligibility, and matching status.

## key abstractions

- city configuration keeps map centers, zoom levels, and postcode centroids together.
- the public api adapter translates database column names into the stable location shape used by map screens.
- map views own leaflet setup and markers while page screens own selection, filters, drawers, and urls.
- machine records are stored as a list so one maker can describe different fabrication tools without creating duplicate profiles.

## organization decisions

the public atlas and local network remain separate feature areas because they answer different questions. shared city data prevents duplicate regional logic. campus resources remain reviewed in source because access notes and equipment claims need editorial verification before release.