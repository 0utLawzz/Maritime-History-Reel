# Maritime History Reel — Video Studio Dashboard

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-10.x-orange.svg)
![Node](https://img.shields.io/badge/node-20.x-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success)

> Full-stack platform for creating, managing, and publishing **9:16 short-form maritime history reels** to Facebook Pages, Instagram Reels, and YouTube Shorts.

Built as a **pnpm monorepo**: React studio dashboard + Express API + PostgreSQL.

---

## Features

| Area | Capability |
|------|------------|
| Studio dashboard | Plan and manage reel projects |
| Vertical video | 9:16 short-form focus |
| Multi-platform | Facebook Pages, Instagram Reels, YouTube Shorts |
| Sample reel | `mary-rose-reel` artifact for product demos |
| Mockup sandbox | UI previews |

---

## Architecture

```text
artifacts/
  studio-dashboard/   Operator UI (React + Vite)
  api-server/         Express API
  mary-rose-reel/     Sample maritime reel experience
  mockup-sandbox/     UI sandbox
lib/
  db/                 PostgreSQL / Drizzle (via workspace)
  api-spec/           OpenAPI contracts (if present)
```

---

## Install & run

### Prerequisites

- Node.js 20+
- **pnpm** (required)
- PostgreSQL (`DATABASE_URL`)

```bash
git clone https://github.com/0utLawzz/Maritime-History-Reel.git
cd Maritime-History-Reel
pnpm install

# Schema
pnpm --filter @workspace/db run push

# API
pnpm --filter @workspace/api-server run dev

# Studio dashboard
pnpm --filter @workspace/studio-dashboard run dev
```

Copy `.env.example` to `.env` and fill in secrets. Never commit `.env`.

---

## Contributing & Security

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [CHANGELOG.md](CHANGELOG.md)

---

## License

MIT © 2025–2026 Nadeem (OutLawZ) — see [LICENSE](LICENSE).

---

## Author

**Nadeem (OutLawZ)**  
Custom Automation Specialist  

- GitHub: [0utLawzz](https://github.com/0utLawzz)  
- Contact: net2outlawzz@gmail.com  

*Need custom short-form video or multi-platform publishing systems? Contact me.*
