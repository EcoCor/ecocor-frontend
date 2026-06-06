# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm start        # Dev server on localhost:3000
pnpm build        # TypeScript check + production build to build/
pnpm test         # Vitest in watch mode (jsdom environment)
pnpm lint         # ESLint on src/
```

Run a single test file: `pnpm test src/path/to/file.test.tsx`

## Architecture

**Stack:** React 19 + TypeScript, Vite 6, TanStack Router v1 (file-based), Tailwind CSS v4, Axios, Vitest + MSW.

### Routing

Routes live in [src/routes/](src/routes/) and are processed by TanStack Router's Vite plugin — the route tree is auto-generated in `routeTree.gen.ts` (do not edit manually). Each route file calls `createFileRoute()`. Dynamic segments use `$paramName` syntax. The root layout ([src/routes/__root.tsx](src/routes/__root.tsx)) provides the `Topnav`.

Route hierarchy:
- `/` → redirects to `/corpora`
- `/corpora` → corpus list
- `/corpora/$corpusId` → corpus detail
- `/corpora/$corpusId/$textId/` → text detail with nested tabs: `entities`, `animals`, `plants`, `fulltext`
- `/doc/$id` → markdown documentation pages (fetched from public assets)
- `/doc/api` → interactive OpenAPI docs (swagger-ui-react)

### API Client

[src/api.ts](src/api.ts) wraps Axios with cancel-token support. The base URL comes from `VITE_ECOCOR_API` (default `/api`). In development, Vite proxies `/api/*` to `http://localhost:8090/${PROXY_PATH}` (default `PROXY_PATH=/exist/restxq/ecocor`).

In tests (`VITE_MOCK_API=yes`), MSW intercepts requests — handlers are in [src/mocks/](src/mocks/).

### State Management

No global state library. Components load data with `useEffect` + Axios cancel tokens and track an `isMounted` flag to prevent state updates after unmount.

### Component Library

`@dracor/react` provides shared components: `Table`, `IdLink`, `AuthorInfo`, `NavBar`, `Tabs`, `DocPage`, `ApiDoc`. Prefer these over building equivalents from scratch.

### Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `VITE_ECOCOR_API` | `/api` | API base URL |
| `VITE_MOCK_API` | `no` | Set to `yes` to enable MSW mocking |
| `PROXY_PATH` | `/exist/restxq/ecocor` | Backend path for dev proxy |

### Testing

- `renderWithRouter` helper wraps components in TanStack Router for route-aware tests
- `.env.test` sets `VITE_MOCK_API=yes` automatically — no manual setup needed
- MSW mock data lives in [src/mocks/](src/mocks/)
