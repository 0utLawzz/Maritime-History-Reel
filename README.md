# Video Studio Dashboard

A full-stack platform for creating, managing, and publishing 9:16 short-form history reels to Facebook Pages, Instagram Reels, and YouTube Shorts — built on a pnpm monorepo with React, Express, and PostgreSQL.

---

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Set the required environment variable
#    Copy from .env.example (or ask your team lead for the Replit secret)
#    DATABASE_URL=postgres://...

# 3. Push database schema
pnpm --filter @workspace/db run push

# 4. Start the API server
pnpm --filter @workspace/api-server run dev

# 5. Start the dashboard
pnpm --filter @workspace/studio-dashboard run dev

# 6. (optional) Start the video reel previewer
pnpm --filter @workspace/mary-rose-reel run dev
```

---

## What It Does

| Feature | Description |
|---|---|
| **Video Studio Dashboard** | Create and manage short-form video projects with a structured 6-scene format |
| **Neo-Brutalism UI** | Bold, no-nonsense design system — cream, orange, teal, hard shadows |
| **Live 9:16 Preview** | See your video as you type, before export |
| **Pipeline Status** | Draft → Review → Approved → Scheduled → Published |
| **Version System** | Every save auto-increments the version number |
| **Export** | Open the video reel in a new tab ready for screen recording |
| **API Server** | Express 5 + Drizzle ORM REST API |

---

## Project Structure

```
.
├── artifacts/
│   ├── api-server/        — Express 5 REST API (port auto-assigned by Replit)
│   ├── mary-rose-reel/    — Animated 9:16 video reel (React + Vite)
│   ├── mockup-sandbox/    — Component previews (design tool)
│   └── studio-dashboard/  — Main dashboard app (React + Vite, root path)
├── lib/
│   ├── api-client-react/  — Generated React Query hooks (from Orval)
│   ├── api-spec/          — OpenAPI spec (source of truth for API)
│   ├── api-zod/           — Generated Zod schemas (from Orval)
│   └── db/                — Drizzle ORM schema + client
├── scripts/               — Post-merge automation
├── CHANGELOG.md           — Version history
├── CONTRIBUTING.md        — How to contribute
└── replit.md              — Developer notes
```

---

## Scripts Reference

| Command | What it does |
|---|---|
| `pnpm install` | Install all workspace dependencies |
| `pnpm run typecheck` | Full TypeScript check across all packages |
| `pnpm run build` | Typecheck + build all packages |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks + Zod schemas from OpenAPI spec |
| `pnpm --filter @workspace/db run push` | Push Drizzle schema to dev database |

---

## Tech Stack

- **Monorepo**: pnpm workspaces, Node.js 20, TypeScript 5.9
- **Frontend**: React 19, Vite 7, TanStack Query, Wouter, Tailwind CSS v4
- **Design System**: Neo-Brutalism (Bebas Neue + Space Grotesk + DM Mono)
- **Backend**: Express 5, Pino logging
- **Database**: PostgreSQL + Drizzle ORM + drizzle-zod
- **API Contract**: OpenAPI 3.1 → Orval codegen → typed hooks + Zod validators
- **Animation**: Framer Motion, GSAP, Three.js / React Three Fiber

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `SESSION_SECRET` | ⚠️ Prod | Secret for session signing |
| `PORT` | Auto | Injected by Replit per-artifact |
| `BASE_PATH` | Auto | Injected by Replit per-artifact |

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](./CHANGELOG.md) for release history.

- **v1.x** — Foundation: dashboard, pipeline, database, API
- **v2.x** — Auto-publish to Facebook/Instagram via API
- **v3.x** — AI-generated scene content

---

## License

MIT © 2025 — See [LICENSE](./LICENSE) for details.
