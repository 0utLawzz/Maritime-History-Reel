# Past In A Minute — Product Progress

This file tracks the agreed direction and implementation milestones for the history-reel production platform.

## Current foundation

- [x] React/Vite studio dashboard
- [x] Express REST API
- [x] PostgreSQL + Drizzle persistence
- [x] Six-scene reel editor
- [x] Draft → Review → Approved → Scheduled → Published statuses
- [x] Live 9:16 preview
- [x] Animated Mary Rose reel preview
- [x] Replit development workflows

## Product decisions

- Authentication: Replit login
- Workspace: shared studio
- Permissions: administrator-controlled roles
- Initial bulk workflow: CSV upload
- Script workflow: manual entry or bulk import; no automatic AI script generation in the initial scope
- Delivery style: small, reviewable batches pushed to GitHub

## Roadmap

### Milestone 1 — Accounts and team permissions

- [ ] Add Replit login
- [ ] Add users and roles
- [ ] Add administrator controls
- [ ] Protect dashboard and API routes

### Milestone 2 — Content intake

- [ ] Add CSV template and documentation
- [ ] Add CSV upload and validation
- [ ] Add bulk preview before import
- [ ] Add import error reporting
- [ ] Preserve manual project creation

### Milestone 3 — Research and metadata

- [ ] Add optional Wikipedia/history research lookup
- [ ] Add title and hook helpers
- [ ] Add SEO title and description fields
- [ ] Add platform-specific hashtags and tags
- [ ] Keep imported and manually edited content reviewable

### Milestone 4 — Media and rendering

- [ ] Add image selection per scene
- [ ] Add reusable media library
- [ ] Render saved projects as MP4
- [ ] Add render progress and failure states
- [ ] Support bulk rendering

### Milestone 5 — Publishing

- [ ] Connect Facebook publishing
- [ ] Connect Instagram publishing
- [ ] Connect YouTube publishing
- [ ] Add platform-specific publishing settings
- [ ] Add scheduling, retry, and publishing history

### Milestone 6 — Mobile companion

- [ ] Define mobile workflows
- [ ] Add mobile project and status views
- [ ] Add preview and approval actions
- [ ] Connect mobile app to the existing API

## Working rules

- Do not replace the existing stack or restructure the monorepo without approval.
- Build one milestone or clearly bounded slice at a time.
- Run typecheck/build and verify the affected workflow after each implementation batch.
- Commit and push completed batches separately so changes are easy to review or revert.