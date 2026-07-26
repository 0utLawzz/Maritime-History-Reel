---
name: Brand System
description: Canonical brand guidance for the video studio project and how it conflicts with existing UI copy.
---

## Canonical brand

The project is being aligned with the **Past In A Minute** history-reel brand, documented in `.agents/skills/past-in-a-minute-branding/`.

- Tagline: "History, One Day At A Time."
- Voice: calm documentary narrator, short sentences, curiosity hook → fact → twist → reflection → CTA
- Visual defaults: charcoal/near-black backgrounds (`#1C1C1C`), gold accents (`#D4AF37`), serif headlines, sans-serif labels
- 6-scene structure: Hook (4.0s) → Scene 2 (4.5s) → Scene 3 (4.5s) → Scene 4 (5.5s) → Scene 5 (4.5s) → Scene 6 (4.0s)
- Standard CTA: "Follow for daily history." (use "Follow for daily maritime history." for naval topics)

## Current conflict

The studio dashboard still renders **BRIGHT.STORIES** branding in the navbar (`artifacts/studio-dashboard/src/pages/Dashboard.tsx`) and uses a Neo-Brutalism cream/orange/teal theme for the editor chrome. The live 9:16 preview panel already leans toward the Past In A Minute gold-on-dark aesthetic.

**Why:** The dashboard was built before the Past In A Minute brand skill was added. Future work that touches logos, navbar copy, colors, or generated assets should migrate the dashboard to the Past In A Minute tokens.

**How to apply:** Before generating thumbnails, logos, banners, video scene copy, or restyling the dashboard, load the `past-in-a-minute-branding` skill and pull exact tokens from `references/theme-tokens.md`.
