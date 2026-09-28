# running fabnet locally

## requirements

- node.js 20 or newer
- npm 10 or newer, or bun 1.1 or newer
- access to a compatible backend project

## install

1. clone the repository.
2. open the repository folder in a terminal.
3. run `npm install` or `bun install`.

## environment

create a local `.env` file with these public browser values:

```text
vite_supabase_url=https://your-project-host
vite_supabase_publishable_key=your-publishable-key
vite_supabase_project_id=your-project-id
```

the public resource directory, local network, and authentication all use the same environment-backed client. publishable keys may be used in browser code only when row-level access policies are enabled.

## development

run `npm run dev` or `bun run dev`, then open the local address printed by vite. the sitemap is regenerated before the development server starts.

## checks

- run `npm run test` for automated tests.
- run `npm run lint` for source checks.
- run `npm run build` for a production build.

## deployment

1. add the same public environment values to the hosting provider.
2. run `npm run build`.
3. deploy the generated `dist` folder as a single-page application.
4. configure unknown paths to return `index.html` so city and local network urls load directly.
5. update the public base address in `scripts/generate-sitemap.ts` if the domain changes.

no separate application server is required. database access, authentication, and policies run in the connected backend.