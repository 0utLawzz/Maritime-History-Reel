---
name: Project Architecture
description: Full-stack structure, key decisions, and how the pieces connect.
---

## What this project is
A **Video Studio Dashboard** — create, manage, and publish 9:16 short-form history video reels (Facebook Reels, Instagram Reels, YouTube Shorts) from a Neo-Brutalism CRUD dashboard backed by PostgreSQL.

## Monorepo layout

| Package | Path | Purpose |
|---|---|---|
| studio-dashboard | artifacts/studio-dashboard | Main dashboard app at `/` (React+Vite) |
| mary-rose-reel | artifacts/mary-rose-reel | 9:16 animated video at `/mary-rose-reel/` |
| api-server | artifacts/api-server | Express 5 REST API at `/api` |
| mockup-sandbox | artifacts/mockup-sandbox | Canvas design tool at `/__mockup` |
| db | lib/db | Drizzle ORM + PostgreSQL client |
| api-spec | lib/api-spec | OpenAPI 3.1 spec (source of truth) |
| api-client-react | lib/api-client-react | Generated React Query hooks (Orval) |
| api-zod | lib/api-zod | Generated Zod schemas (Orval) |

## Database schema (video_projects table)
Fields: id, title, topic, hookDate, hookYear, scene2Headline, scene2Subline, scene3Headline, scene3Body, scene4Headline, scene4Body, scene5Headline, scene5Body, scene6Cta, status (draft/review/approved/scheduled/published), scheduledAt, publishedAt, version (auto-increments on save), createdAt, updatedAt.

## API routes (all under /api)
- GET/POST /projects
- GET /projects/stats (must be before /:id)
- GET/PUT/DELETE /projects/:id
- PATCH /projects/:id/status

## Design system: Neo-Brutalism
Cream bg #F0E8D0, near-black #0C0C0C borders, orange #C94A00 CTAs, teal #0D9970 accents. Fonts: Bebas Neue (display), Space Grotesk (body), DM Mono (labels). Hard shadows, zero blur, zero gradients. Utility classes in artifacts/studio-dashboard/src/index.css: nb-card, nb-btn, nb-btn-primary, nb-btn-secondary, nb-btn-teal, nb-input, nb-textarea, nb-badge-{status}, nb-preview-916, nb-shadow, nb-stamp-{orange/teal/yellow}.

## Key rules
- /projects/stats route MUST be before /projects/:id in Express (otherwise "stats" is treated as an id)
- Every PUT/PATCH to a project auto-increments version via sql\`${videoProjectsTable.version} + 1\`
- DATABASE_URL is a Replit secret (already set)
- After any OpenAPI spec change: run pnpm --filter @workspace/api-spec run codegen
- After any DB schema change: run pnpm --filter @workspace/db run push

**Why:** Documented so future agents know the route order gotcha and the version-increment pattern.

**How to apply:** When adding new routes, always register specific paths before parameterized ones.
