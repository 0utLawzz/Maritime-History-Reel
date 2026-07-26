# Theme Tokens — Past In A Minute

Exact values to use when generating assets or styling scene components.
Don't invent new colors — pick from the matching theme below.

## Theme A — Vintage Sepia Gold (default)

- Background gradient: `#3a2c1e` → `#241a10` → `#120c06` (radial, dark vignette)
- Solid background (e.g. hook scene): `#1C1C1C`
- Gold accent gradient: `#f3d38a` → `#c99a3f` → `#8a6423`
- Primary gold (flat): `#D4AF37`
- Muted cream text: `rgba(245,245,220,0.5)`
- Headline font: Georgia / Times New Roman, bold, letter-spacing 2–6px
- Label font: sans-serif, small size, letter-spacing 0.2em, uppercase
- Texture: soft radial gold burst overlay + light grain, particle gold video/loop
- Motion: typewriter text reveal, gentle fade/scale transitions (0.6–0.8s)

## Theme B — Dark Cinematic

- Background: near-black `#0a0a0a` → `#161616`
- Accent: high-contrast white `#FFFFFF` + red `#C0392B` (use red sparingly, for
  emphasis words or the dramatic-peak scene only)
- Text: white headlines, light-gray body (`#D0D0D0`)
- Headline font: bold sans-serif (e.g. Bebas Neue / Space Grotesk), tight tracking
- Texture: film grain overlay, occasional flash/glitch cut on transitions
- Motion: faster cuts (~0.3–0.4s transitions), hard cuts over fades

## Theme C — Modern Minimal

- Background: off-white/cream `#F5F0E6`
- Accent: gold rule lines only, `#c99a3f`, thin (1–1.5px)
- Text: black `#1A1A1A` headlines, dark gray `#4A4A4A` body
- Headline font: serif, same family as Theme A but dark-on-light
- Texture: none — flat design, no particles or glow
- Motion: quick, clean slide/fade (0.3–0.5s), no elaborate burst effects

## Usage rule

Whichever theme is active, keep the 6-scene timing identical
(hook 4.0s / scene2 4.5s / scene3 4.5s / scene4 5.5s / scene5 4.5s / scene6 4.0s)
— only color, type weight, and transition style change between themes.
