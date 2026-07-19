# Contributing Guide

Thank you for wanting to improve this project! This guide covers everything you need to get set up and make great contributions.

---

## Table of Contents

1. [Installation Guide](#installation-guide)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Submitting Changes](#submitting-changes)
5. [Version System](#version-system)
6. [Auto Publish Pipeline](#auto-publish-pipeline)

---

## Installation Guide

### Prerequisites

| Tool | Minimum Version | Check |
|---|---|---|
| Node.js | 20.x | `node --version` |
| pnpm | 10.x | `pnpm --version` |
| PostgreSQL | 15+ | Provided by Replit |

### Step 1 — Clone the repo

```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO.git
cd YOUR_REPO
```

### Step 2 — Install dependencies

```bash
pnpm install
```

> ⚠️ Only use `pnpm`. The `package.json` preinstall script will reject `npm` or `yarn`.

### Step 3 — Set environment variables

Create a `.env` file at the project root (never commit it):

```bash
cp .env.example .env
```

Fill in:

```env
DATABASE_URL=postgres://user:password@host:5432/dbname
SESSION_SECRET=your-random-secret-here
```

If you're on Replit, these are managed as Secrets (no `.env` file needed).

### Step 4 — Set up the database

```bash
pnpm --filter @workspace/db run push
```

This applies the Drizzle schema to your development database.

### Step 5 — Start the services

```bash
# Terminal 1 — API server
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Dashboard (main app)
pnpm --filter @workspace/studio-dashboard run dev

# Terminal 3 — (optional) Video reel previewer
pnpm --filter @workspace/mary-rose-reel run dev
```

On Replit, the workflows start all three automatically.

### Step 6 — Verify

- Dashboard: `http://localhost:<PORT>/`
- API health: `http://localhost:<API_PORT>/api/healthz`

---

## Development Workflow

### Before coding

```bash
# Always pull latest changes
git pull origin main

# Check types pass
pnpm run typecheck
```

### After changing `lib/api-spec/openapi.yaml`

**Always regenerate the API client:**

```bash
pnpm --filter @workspace/api-spec run codegen
```

This updates `lib/api-client-react/src/generated/` and `lib/api-zod/src/generated/`. Commit the generated files alongside your spec change.

### After changing `lib/db/src/schema/`

**Push the schema to dev:**

```bash
pnpm --filter @workspace/db run push
```

Do NOT run `push` against production — Replit's Publish flow handles that automatically.

### Branch naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/short-description` | `feat/facebook-publish` |
| Fix | `fix/short-description` | `fix/scene-preview-crash` |
| Chore | `chore/short-description` | `chore/update-deps` |
| Docs | `docs/short-description` | `docs/add-install-guide` |

---

## Code Standards

### TypeScript

- Strict mode is on — no `any`, no `ts-ignore` without a comment explaining why
- Prefer `const` over `let`; never `var`
- Use entity-shaped names for API schemas (`NoteInput`, not `CreateNoteBody`)

### React

- Functional components only
- Co-locate component, types, and hooks when possible
- Use TanStack Query for all server state — no `useState` for fetched data

### API

- All new endpoints go in `artifacts/api-server/src/routes/`
- Always validate with the Zod schema from `@workspace/api-zod`
- Return appropriate HTTP status codes (201 for create, 204 for delete, 404 for missing)

### Formatting

```bash
pnpm exec prettier --write .
```

Prettier is configured at the root; CI enforces it.

---

## Submitting Changes

1. Fork and branch from `main`
2. Make your changes
3. Run `pnpm run typecheck` — must pass
4. Open a Pull Request using the [PR template](.github/PULL_REQUEST_TEMPLATE.md)
5. A maintainer will review within 2 business days

---

## Version System

We use [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

| Change type | Version bump | Example |
|---|---|---|
| Breaking API/DB change | MAJOR | `1.x.x → 2.0.0` |
| New feature (backward-compatible) | MINOR | `1.0.x → 1.1.0` |
| Bug fix, style, doc update | PATCH | `1.0.0 → 1.0.1` |

### How to release

1. Update `CHANGELOG.md` with what changed
2. Bump `version` in the relevant `package.json`(s)
3. Open a PR titled `chore: release vX.Y.Z`
4. Once merged, CI automatically tags the commit and publishes release notes

### Video project versioning

Every time a video project is saved, the `version` field in the database auto-increments. This lets you track edit history:

- `v1` — Initial draft
- `v2` — First revision
- `v3+` — Subsequent saves

The dashboard shows the current version number on every project card.

---

## Auto Publish Pipeline

The CI workflow (`.github/workflows/ci.yml`) runs on every push to `main`:

1. **Install** — `pnpm install --frozen-lockfile`
2. **Typecheck** — `pnpm run typecheck`
3. **Build** — `pnpm run build`
4. **Tag** — Creates a git tag `vX.Y.Z` on release PRs

To trigger a full deploy to Replit production, click **Publish** in the Replit workspace. Replit diffs the dev schema against prod and applies migrations automatically.

---

## Getting Help

- Open an [issue](.github/ISSUE_TEMPLATE/) for bugs or feature requests
- Ping a maintainer in the PR if you're stuck
- Read `replit.md` for Replit-specific gotchas
