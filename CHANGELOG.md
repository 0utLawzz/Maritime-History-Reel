# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Video Studio Dashboard (root artifact) with Neo-Brutalism design
- `video_projects` database table with Drizzle ORM schema
- Full CRUD REST API for video projects (`/api/projects`)
- Dashboard stats endpoint (`/api/projects/stats`)
- 6-scene video content model (hook, 4 content scenes, CTA)
- Pipeline status system: Draft → Review → Approved → Scheduled → Published
- Auto-increment version on every project save
- Neo-Brutalism CSS theme (Bebas Neue, Space Grotesk, DM Mono)
- GitHub community docs: CONTRIBUTING, CODE_OF_CONDUCT, PR template, issue templates
- CI workflow with typecheck, build, and auto-tagging

---

## [1.0.0] — 2025-07-19

### Added
- Initial project import: Mary Rose History Reel video artifact
- pnpm monorepo structure with shared API server
- PostgreSQL + Drizzle ORM setup
- Express 5 API server with health check
- OpenAPI spec + Orval codegen pipeline
- `DATABASE_URL` secret connected
- All three artifact workflows configured and running

---

[Unreleased]: https://github.com/YOUR_ORG/YOUR_REPO/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/YOUR_ORG/YOUR_REPO/releases/tag/v1.0.0
