---
name: atelier-design
description: Use this skill to generate well-branded interfaces and assets for Atelier — a personal project gallery site brand — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Atelier is a quiet, motion-first personal gallery brand: monochrome ink-on-paper with one warm vermilion accent, NanumSquareNeo for Korean + English type, JetBrains Mono for indexes/timestamps, generous negative space, square corners by default, no emoji, no gradients on chrome.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of this skill and create static HTML files for the user to view. Always link `colors_and_type.css` from the skill root and use the semantic tokens (`var(--fg-1)`, `var(--bg-1)`, `var(--accent)`, etc) — never raw hex.

If working on production code, read the rules in README.md, copy fonts/ + assets/, and import the token CSS to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key files:
- `README.md` — full brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — all design tokens
- `fonts/NanumSquareNeo-Variable.ttf` — primary typeface
- `assets/logo.svg`, `assets/logo-mark.svg`, `assets/logo-mark-inverse.svg` — brand marks
- `ui_kits/gallery/` — interactive UI kit recreating the gallery site (Header, Hero, Filters, Grid, ProjectCard, ProjectDetail, Footer)
- `preview/` — small specimen cards for the design-system tab
