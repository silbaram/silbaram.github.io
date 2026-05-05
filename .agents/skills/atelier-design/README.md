# Atelier — Personal Project Gallery Design System

> *A quiet stage for loud work.*

Atelier is a design system for **a personal project gallery site** — a place where one person uploads small, playful, visually-driven experiments (motion studies, micro-interactions, generative pieces, "그냥 한번 해본 것들"). The site itself is the frame; the projects are the paintings. Chrome stays quiet so the work can be loud.

The brand is built around three ideas:

1. **Stage, not showroom.** The interface recedes. Lots of negative space, a single accent color, no decorative cruft.
2. **Motion is the medium.** Most uploaded work is animated or interactive. Hovers, transitions, and entrances carry brand weight that color and texture would in a louder system.
3. **Korean-first, bilingual-comfortable.** Type system has to feel native in Hangul. NanumSquareNeo is the foundation.

---

## Sources

This system was authored from scratch with limited inputs:

- **Uploaded font:** `uploads/NanumSquareNeo-Variable.ttf` (now in `fonts/`)
- **Brand brief (verbatim):**
  - 개인 프로젝트 갤러리 사이트
  - 개인 프로젝트를 올려서 공유하는 사이트
  - 색상은 심플한 색상
  - 간단하게 즐길수 있는 게안, 화려한 모션을 주로 올림

No codebase, Figma file, or existing screens were provided. Every visual decision below is an opinionated proposal — please push back, and I'll iterate.

---

## Index

```
.
├── README.md                  ← this file
├── SKILL.md                   ← agent skill manifest
├── colors_and_type.css        ← all design tokens (colors, type, spacing, motion)
├── fonts/
│   └── NanumSquareNeo-Variable.ttf
├── assets/
│   ├── logo.svg               ← Atelier wordmark
│   ├── logo-mark.svg          ← square mark
│   └── placeholder-*.svg      ← gallery thumbnail placeholders
├── preview/                   ← Design System tab cards
│   ├── type-*.html
│   ├── color-*.html
│   ├── spacing-*.html
│   ├── component-*.html
│   └── brand-*.html
└── ui_kits/
    └── gallery/
        ├── README.md
        ├── index.html         ← interactive click-thru of the site
        └── *.jsx              ← Header, Grid, ProjectCard, Detail, Footer, etc.
```

---

## Content Fundamentals

**Voice:** Quiet, slightly self-deprecating, present-tense. The site belongs to one person; copy reads like that one person talking, not a brand. Korean and English coexist — Korean is the default, English shows up where it's natural (project titles, code terms), no italics or special framing for either.

**Casing:**
- UI labels and nav: lowercase English (`works`, `about`, `index`) — sentence-case Korean (`작업`, `소개`).
- Project titles: as-authored. Don't title-case.
- Buttons: short verbs, lowercase (`view`, `보기`, `close`, `닫기`).

**Pronouns:** First-person singular (`나`, `I`, `내`) when describing the work. Second-person (`you`, `당신`) is avoided — it's a portfolio, not a product pitch.

**Punctuation:** Sparingly. Periods are optional on short labels. En-dash for ranges and asides ( – ). No exclamation marks. No emoji.

**Numbers:** Arabic numerals always (`2026`, not `이천이십육`). Indexes are zero-padded to two digits when listed (`01 / 24`).

**Tone examples (write like this):**

| Don't | Do |
|---|---|
| "Welcome to my amazing portfolio! 🎨✨" | "작업들. 대부분 움직임에 관한 것." |
| "Click here to explore my projects" | "보기 →" |
| "Crafted with passion and code" | "made in seoul, mostly at night" |
| "Featured Work — Latest Projects" | "recent / 최근" |
| "About Me" | "소개" / "about" |
| "Get in touch with me today!" | "say hi — hello@…" |

**Microcopy patterns:**
- Empty states: `아직 없음.` / `nothing here yet.`
- Loading: `…` (literal ellipsis, no "loading")
- Errors: `안 됨. 새로고침.` — admit it broke, suggest the fix.
- Timestamps: relative, lowercase (`3일 전`, `last week`).

---

## Visual Foundations

### Color
A **monochrome ink-on-paper** base with **one warm accent**. That's it.

- `--ink` `#0E0E0C` — near-black with a hair of warmth. Body text, logos, primary surfaces in dark mode.
- `--paper` `#F6F4EE` — off-white, slightly warm. Default page background. Never pure `#FFF` — pure white feels clinical and kills the gallery vibe.
- `--paper-pure` `#FCFBF7` — for cards that need to lift off `--paper`.
- `--mute` `#8A8780` — secondary text, dividers in disguise.
- `--rule` `#E4E0D6` — hairlines, borders, table rules.
- `--accent` `#FF5B2E` — single warm vermilion. Used *sparingly*: hover indicators, current-page dot, the one CTA per screen, link underlines on hover. Never for backgrounds or large fills.
- `--accent-ink` `#0E0E0C` — text on accent (yes, ink-on-vermilion, not white).

Semantic tokens (`--fg-1`, `--fg-2`, `--bg-1`, `--bg-2`, `--border`, `--focus`) live in `colors_and_type.css` and remap automatically for dark mode.

**Imagery vibe:** warm-leaning, slight grain when at rest, full saturation when moving. Project thumbnails are shown unprocessed — the artist owns the color. The system never tints them.

### Typography
Two families, both already loaded:

- **NanumSquareNeo** (variable, 100–900) — primary for Korean and English. Display + body + UI. Tight letter-spacing on display, normal on body.
- **JetBrains Mono** (CDN) — for indexes, timestamps, code, and numeric labels. Sets the "studio notebook" feel.

Scale (modular, ratio ~1.25):

| Token | Size / LH | Use |
|---|---|---|
| `--t-display` | 96 / 1.0 | Hero, project title takeover |
| `--t-h1` | 56 / 1.05 | Page title |
| `--t-h2` | 32 / 1.15 | Section title |
| `--t-h3` | 22 / 1.3 | Card title |
| `--t-body` | 16 / 1.55 | Default reading |
| `--t-small` | 13 / 1.45 | Captions, meta |
| `--t-mono-s` | 12 / 1.4 | Index numbers, timestamps |

Weights used: 300 (display only), 400 (body), 700 (emphasis). Never 500/600 — feels muddy in NanumSquareNeo.

### Spacing
4px base. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Page gutters are generous: 64px on tablet, 96–128px on desktop. The empty space *is* the design.

### Layout
- 12-column grid, 24px gutters.
- Max content width 1440px, but most reading lives in 720px columns.
- Fixed top bar (56px tall, paper background, hairline at bottom on scroll only).
- Footer is a single line of 12px mono, left-aligned, no background.

### Motion (this is the brand)
Easing tokens:
- `--ease-out`: `cubic-bezier(0.2, 0.7, 0.1, 1)` — default for entrances.
- `--ease-in-out`: `cubic-bezier(0.7, 0, 0.3, 1)` — for state crossfades.
- `--ease-spring`: `linear(0, 0.5 30%, 1.05 60%, 0.97 75%, 1)` — for playful pops on the gallery itself, never on chrome.

Durations:
- `--dur-fast`: 120ms (hover color shifts)
- `--dur-base`: 280ms (page transitions, card hovers)
- `--dur-slow`: 600ms (entrance staggers)

**Hover states:**
- Links: underline appears with `--accent`, animates from left to right (200ms).
- Buttons (ghost/outline): border darkens to `--ink`, fill fades in at 8% ink.
- Cards: image scales 1.02, caption shifts up 4px, no shadow change.
- No hover on touch devices — handled via `@media (hover: hover)`.

**Press states:**
- Buttons: scale 0.98, no color change.
- Cards: scale 0.99, dampened.

**Entrances:** stagger child elements by 40ms, fade + 12px upward translate, `--ease-out`, `--dur-base`. Project grids do this on first paint and on filter change.

### Borders & Dividers
- Hairline: `1px solid var(--rule)`. That's the only border weight in the system.
- No double borders. No accent borders. Borders are structural, never decorative.

### Corners
- `--r-0`: 0 — default. Most things have square corners.
- `--r-1`: 4px — buttons, input fields.
- `--r-2`: 12px — cards, modals.
- `--r-pill`: 999px — tags, status chips only.

The system leans toward **0 radius**. Roundness is reserved for things that need to feel "soft enough to tap."

### Shadows
Used very sparingly. The gallery feels flat by default; shadows imply lift only when an element genuinely floats.

- `--shadow-1`: `0 1px 2px rgb(14 14 12 / 0.04)` — subtle card lift on hover.
- `--shadow-2`: `0 12px 32px -8px rgb(14 14 12 / 0.12)` — modal/lightbox.
- No inner shadows. No glows. No colored shadows.

### Transparency & Blur
- Top bar: solid `--paper` always. No blur. (The gallery thumbnails behind it would compete.)
- Lightbox backdrop: `rgb(14 14 12 / 0.92)` — near-opaque, no blur.
- Tooltips: solid `--ink` background, no blur.

Blur is a design tool we explicitly avoid. It dates fast and conflicts with the motion-first content.

### Backgrounds
- Default: solid `--paper`. No textures, no gradients, no patterns.
- Project pages may go full-bleed `--ink` if the work calls for it — that's a per-project decision, not a system default.
- Never use brand-owned imagery as page backgrounds.

### Cards
A card is **a thumbnail + a caption block**, no border, no shadow at rest, no background fill. The image carries the visual weight; text sits below in 13/16/22 sizing depending on density. Hover applies `--shadow-1` and a 1.02 image scale. That's the entire card system.

### Layout Rules (fixed elements)
- Top bar: fixed, 56px, `--paper`, hairline-bottom on scroll.
- "Back to top" link: appears bottom-right after 800px scroll, 12px mono.
- Nothing else floats. No sticky CTAs, no chat bubbles, no cookie banners (designed out).

---

## Iconography

**Approach:** Icons are used **rarely**. The system favors text labels (`보기`, `view`, `close`) over symbols. When an icon is needed, the rules are:

- **1.5px stroke**, square caps, no fills.
- 24px grid, 20×20 visual size by default.
- Color always `currentColor` — never accent unless indicating an interactive state.
- One pair only: a glyph + its text label, never icon-only buttons except for `close (×)` and `external (↗)`.

**Source:** Lucide, loaded from CDN (`https://unpkg.com/lucide-static@latest/`). Lucide's stroke and grid match the system. Specific icons used in the UI kit: `arrow-right`, `arrow-up-right`, `x`, `search`, `play`, `pause`. **This is a substitution** — no icon set was provided in the brief. If you have a preferred set, swap and I'll re-link.

**Unicode marks** are used in place of icons where they read cleanly:
- `→` next / view
- `↗` external link
- `×` close
- `·` separator
- `—` aside

**No emoji.** Anywhere. The system is cooler than that.

**Logos and marks:** see `assets/logo.svg` (wordmark) and `assets/logo-mark.svg` (square mark — a single filled glyph that reads as both "A" and an aperture). Both are monochrome, work on `--paper` or `--ink`.

---

## How to use this system

1. Link `colors_and_type.css` from any HTML file.
2. Use semantic tokens (`var(--fg-1)`, `var(--bg-1)`) in components, not raw hex.
3. Pull components from `ui_kits/gallery/` — they are mostly cosmetic React; copy and adjust.
4. When in doubt, **remove something**. The brand defaults toward less.

See `SKILL.md` for agent-friendly invocation.
