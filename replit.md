# Video Studio Dashboard

A full-stack video studio for creating and managing 9:16 short-form history reels, with a Neo-Brutalist React dashboard, Express API, PostgreSQL persistence, and an optional animated Mary Rose reel preview.

## Run & Operate

- **Dashboard** — the `Video Studio Dashboard` workflow serves the main app at `/`.
- **API server** — the `Video Studio API` workflow serves the REST API at `/api`. Requires `DATABASE_URL` to be set first (see below).
- **Video app** — run `pnpm --filter @workspace/mary-rose-reel run dev` with `PORT` and `BASE_PATH` set to preview the optional Mary Rose reel.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to the dev database

## Required environment variables

- `DATABASE_URL` — PostgreSQL connection string (required by the API server and `@workspace/db`). The video app runs without it.
- `SESSION_SECRET` — available for session signing when authentication is added.
- `PORT` and `BASE_PATH` — supplied by the Replit artifact/workflow configuration; the dashboard uses `PORT=5000` and the API uses `PORT=8080` in the current development workflows.

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Video: React 19 + Vite 7, Framer Motion, GSAP, Three.js / React Three Fiber
- API: Express 5 + Pino logging
- DB: PostgreSQL + Drizzle ORM + drizzle-zod
- Validation: Zod (v4), drizzle-zod
- API codegen: Orval (from `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle for API server)

## Where things live

- `artifacts/mary-rose-reel/src/components/video/` — all scene components and the video player shell
- `artifacts/mary-rose-reel/src/lib/video/` — `useVideoPlayer` hook and animation presets
- `artifacts/mary-rose-reel/public/` — static assets (audio, images, video)
- `artifacts/api-server/src/` — Express app, routes, middlewares
- `lib/db/src/schema/` — Drizzle schema (source of truth for DB shape)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/` — generated React query hooks (from Orval)
- `lib/api-zod/` — generated Zod schemas (from Orval)

## Architecture decisions

- The video player detects whether it is embedded in an iframe (`window.self !== window.top`). When viewed directly it renders a bare `<VideoTemplate />` (for recording/export); the full controls UI only appears when iframed.
- Scene durations are defined in `VideoTemplate.tsx` (`SCENE_DURATIONS`) and shared with the controls layer so progress bars stay in sync.
- Audio seek position is computed from cumulative scene start times so background music stays aligned when the user jumps between scenes.
- API types flow from a single OpenAPI spec → Orval codegen → typed React hooks + Zod validators. Run `pnpm --filter @workspace/api-spec run codegen` after changing the spec.

## Product

A ~27-second animated history reel covering the Mary Rose warship (1545), with six scenes, background particle video, a soundtrack, and a mobile-first 9:16 layout.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The video player's `isIframed` check means a direct browser visit shows `<VideoTemplate />` with no controls. To see controls, embed in an iframe or view via the Replit preview pane (which wraps the artifact in an iframe).
- `DATABASE_URL` must be set before starting the API server workflow — it throws at startup if missing.
- Scene durations in `VideoTemplate.tsx` must stay in sync with `SCENE_START_SEC` (computed automatically from `SCENE_DURATIONS`). Audio sync breaks if durations are changed without also recomputing the offset map.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
