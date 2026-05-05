# Atelier — Gallery UI Kit

The single product in this brand: a personal project gallery. One person uploads small visual experiments; visitors browse and view.

## Files

- `index.html` — interactive click-thru. Renders the home grid, opens project detail in a lightbox, switches between filter tags. All state in-memory; no real backend.
- `Header.jsx` — top bar with logo, nav, current-page accent dot.
- `Hero.jsx` — homepage display-type intro, single-line.
- `Filters.jsx` — pill-shaped tag row.
- `Grid.jsx` — masonry-ish 2-column grid of `<ProjectCard>`.
- `ProjectCard.jsx` — thumbnail + meta. Hosts the entrance/hover motion.
- `ProjectDetail.jsx` — full-bleed lightbox view of one work.
- `Footer.jsx` — single-line mono footer.
- `mockProjects.jsx` — fake data.

## Notes

- Project thumbnails are CSS-only "placeholder scenes" — gradients, dot fields, line waves — built to *imply* the kind of motion-driven work the gallery hosts. Replace with real video/canvas embeds when wiring to real data.
- All copy is bilingual (ko + en) and follows the voice rules in the root `README.md`.
- Header + Footer are slim by design. The gallery does the talking.
