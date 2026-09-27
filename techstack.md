# technology stack

## react and typescript

react supports the map's stateful controls, drawers, forms, and sibling experiences without a server-rendered application layer. typescript keeps location, maker, machine, and request records explicit across screens.

## vite

vite provides a small development setup and a static production bundle. this matches fabnet's client-side architecture and keeps deployment portable across static hosts.

## tailwind css and radix primitives

tailwind utilities express the established visual system close to each interface. radix-based controls provide accessible dialogs, sheets, selects, switches, and tooltips while preserving fabnet's own styling.

## leaflet and carto

leaflet handles map movement, markers, tooltips, and radius overlays. carto voyager supplies a readable street map that fits the quiet atlas design. openstreetmap and carto attribution remains visible on both map experiences.

## postgres backend and browser client

the backend provides postgres tables, authentication, row-level access policies, and generated browser access. the public atlas uses a narrow adapter so its data source can move independently. the local network uses authenticated queries because profiles and requests have ownership rules.

## tanstack query and react router

react router maps city, marketing, local network, and maker profile urls to screens. tanstack query provides a shared foundation for request caching where screens need it, although simple map reads currently remain local to their feature.

## testing

vitest and testing library support focused behavior tests. production builds provide an additional check for type and bundling errors.