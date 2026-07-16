# Handoff: Blueprint "Dev Log" Portfolio Redesign

## Overview
A redesign of Jay Cris Bahandi's portfolio site (currently a conventional dark-theme Next.js portfolio at jcnbahandi.vercel.app) into an **engineer's blueprint notebook**: the entire one-page site is a single dark-navy blueprint sheet with an engineering grid, a drafting title block in the corner, handwritten-marker headings, mono-type spec labels, rubber-stamp accents, and a taped-on photo. All existing site content (about, skills with percentages, 6 projects, 6 jobs, contact) is preserved — only the visual language changes.

## About the Design Files
The file in this bundle (`Jay Cris Bahandi Portfolio.dc.html`) is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the existing Next.js codebase** (Next.js 15 / TypeScript / Tailwind CSS / Framer Motion per the current site), using its established patterns. Keep the existing routing, SEO metadata, resume link, and contact form functionality; restyle the presentation.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final. Recreate pixel-perfectly using Tailwind (arbitrary values where needed).

## Page Structure (single scrolling page)

### Global frame
- **Page background (the "desk")**: `#101319`, padding ~48px 24px, content centered.
- **The blueprint sheet**: one continuous container, `max-width: 1000px`, background `#122a41`, padding `56px 60px 64px`, border `1px solid rgba(140,190,230,.25)`, shadow `0 12px 40px rgba(0,0,0,.6)`.
- **Engineering grid** on the sheet via two layered CSS background grids:
  - Major lines: `rgba(140,190,230,.14)` 1px, every `120px` (horizontal + vertical)
  - Minor lines: `rgba(140,190,230,.05)` 1px, every `24px`
  - CSS: `background-image: linear-gradient(rgba(140,190,230,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(140,190,230,.14) 1px, transparent 1px), linear-gradient(rgba(140,190,230,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(140,190,230,.05) 1px, transparent 1px); background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;`
- **Drafting title block**: absolutely positioned top-right corner of the sheet; borders left+bottom `1px solid rgba(140,190,230,.4)`; monospace 10px, letter-spacing 1px, color `#7fa8c9`, right-aligned, padding 10px 16px, line-height 18px. Copy:
  `PROJECT: PORTFOLIO — J.C. BAHANDI / SCALE: 1:1 · SHEET 1 OF 1 · REV 06 / CEBU, PH · GMT+8`

### Typography system
- **Display / headings**: `Permanent Marker` (Google Fonts), weight 400. H1 54px, section H2 32px, card titles 20–26px. Color `#f2efe6`.
- **Body / handwriting**: `Gochi Hand` (Google Fonts). Body 19–20px / line-height ~29–30px. Color `#d9e4ee` (primary), `#b9c9d8` (secondary), `#9fb8cd` (tertiary).
- **Annotations**: `Shadows Into Light` (Google Fonts), 17px, accent color, rotated ~-0.8deg — used for the small sub-caption under each section heading.
- **Spec/labels**: system monospace (`ui-monospace, Menlo, monospace`), 10–13px, letter-spacing 1–2px, uppercase, color `#7fa8c9`.

### Color tokens
- Desk: `#101319`
- Sheet: `#122a41`
- Grid major: `rgba(140,190,230,.14)`, minor: `rgba(140,190,230,.05)`
- Card fill: `rgba(10,20,32,.45–.5)`; card border: `rgba(140,190,230,.25–.35)`
- Ink (headings): `#f2efe6`
- Body text: `#d9e4ee` / `#b9c9d8` / `#9fb8cd`
- Label blue: `#7fa8c9`
- **Accent (amber)**: `#e8b64c` — stats numbers, section captions, borders-left, arrows, skill bars, contact frame. (Alternates explored: cyan `#6cc3e0`, red `#d95b3d`.)
- **Stamp red**: `#d95b3d` — "AVAILABLE FOR WORK", "FEATURED", "REPLIES < 24H", REMOTE/FULL-TIME/FREELANCE chips.
- Footer text: `#5d6b7c`

### Recurring patterns
- **Section heading**: Permanent Marker 32px `#f2efe6`, followed by a flex-grown `1px dashed rgba(140,190,230,.4)` rule on the same baseline; beneath it a Shadows Into Light 17px accent-colored caption rotated -0.8deg.
- **Rubber stamp**: monospace bold 10–13px, letter-spacing 2px, `2–3px solid #d95b3d` border, color `#d95b3d`, padding ~8px 14px, border-radius 4px, rotated 2–3deg.
- **Chip/tag**: monospace 10–11px, 1px border `rgba(140,190,230,.4)`, color `#9fb8cd`, padding 6px 12px, radius 3px.

## Screens / Sections (top to bottom)

### 1. Hero
- Flex row, gap 40px.
- **Taped photo** (left): wrapper rotated -2.5deg, cream mat `#e9e4d6`, padding `10px 10px 30px`, shadow `0 6px 16px rgba(0,0,0,.45)`; a translucent "tape" strip (`rgba(220,220,215,.5)`, 76×24px, rotated 4deg) overlapping the top edge; photo 190×210px (use the real headshot); caption under photo in Shadows Into Light 16px `#555`: "the developer, on site".
- **Right column**: accent handwriting intro "spec sheet — hello, I'm" (20px, rotated -1deg) → H1 "JAY CRIS BAHANDI" (Permanent Marker 54px) → mono subtitle "SENIOR FULL-STACK DEVELOPER · CEBU, PHILIPPINES" → intro paragraph (Gochi Hand 20px/30px, max-width 560px): "I build scalable applications, AI-powered automations, and modern digital systems that deliver exceptional user experiences — from backend APIs to blockchain integrations."
- **Action row**: red stamp "AVAILABLE FOR WORK" + outlined mono link buttons GITHUB ↗ / LINKEDIN ↗ / EMAIL ✉ (existing URLs). Keep the existing Resume PDF link here as another outlined button.
- **Stats strip** below (40px margin-top): 4 equal cells in a `1px solid rgba(140,190,230,.35)` frame with internal dividers; number in Permanent Marker 36px accent, label mono 10px uppercase `#7fa8c9`. Values: 6+ years experience · 30+ projects shipped · 15+ clients served · ∞ cups of coffee.

### 2. About Me
- Heading "ABOUT ME"; caption "building products with purpose & craft ✎".
- Two columns (flex 1.5 : 1, gap 36px).
- Left: the site's three existing about paragraphs verbatim; "AI automation workflows" and "Web3 applications" get a `3px solid` accent underline. Below: 6 capability chips (Full-Stack Web Development, AI & Automation Systems, Web3 & Blockchain Apps, Enterprise Architecture, API Design & Integration, UI/UX Implementation).
- Right: three stacked info cards (dark fill, blue border, mono micro-label):
  - **BASED IN** — "Cebu, Philippines" (Permanent Marker 26px) + "GMT+8 · open to remote work worldwide"
  - **STATUS** — "Open to opportunities" (accent) + copy + red chips REMOTE / FULL-TIME / FREELANCE
  - **CURRENT STACK** — mono list: Next.js 15 · TypeScript · NestJS · PostgreSQL · Tailwind CSS · Framer Motion · Wagmi · Docker

### 3. The Stack (skills)
- Heading "THE STACK"; caption "technologies I work with, honestly graded".
- 2-column grid, gap 22px 36px; one card per category (Frontend, Backend, Databases, Blockchain & Web3, AI & Automation, Tools & DevOps).
- Card: category title Permanent Marker 20px; each skill = name (17px) + right-aligned mono percentage + a 5px progress bar (track `rgba(140,190,230,.15)`, fill accent, radius 2px). Use the site's exact percentages (React 95, Next.js 95, TypeScript 90, Tailwind 92, Material UI 88; Node 92, NestJS 88, Laravel 85; PostgreSQL 90, MongoDB 88, MySQL 90, MSSQL 80; Wagmi 85, Ethers.js 82, Solidity 75, Wallet Connect 88; Make 88, n8n 85; Docker 82, GitHub 95, Vercel 92, Figma 80).
- Footer counts row: 8+ LANGUAGES · 12+ FRAMEWORKS · 20+ TOOLS · 6+ YEARS LEARNING (accent numbers, mono labels).

### 4. Things I've Built (projects)
- Heading "THINGS I'VE BUILT"; caption "enterprise SaaS, Web3 platforms, analytics & AI automation".
- Vertical list of 6 cards (dark fill, blue border, padding 18px 22px), each: accent mono index (01–06) | title (Gochi Hand 23px) + category chip + red FEATURED stamp on the first three | one-line blurb | mono meta row (role / duration / team / type / status per project as on the current site) | dashed-top divider, then mono stack line.
- Below list: link "view more on GitHub →" (accent).
- Keep the current site's category filter (All / Automation / Enterprise / Web3 / Analytics / Data) if desired — style filter pills as chips, active pill accent-bordered.

### 5. Where I've Worked (experience)
- Heading "WHERE I'VE WORKED"; caption "shipping products, leading features, growing as an engineer".
- 6 cards, each a flex row: left rail 150px (mono dates `#7fa8c9`, red duration label, location) | right: role + "@ Company" (company in accent), description, arrow bullets ("→" in accent) with the site's exact bullet copy, dashed-top divider, mono tech-tag line.
- All 6 jobs from the current site, same order and copy (The Codebox Inc, Vertex, The Block Labs, Virginia Food Inc, Ripeconcepts, Wisebox IT Solutions).

### 6. Contact + footer
- Full-width frame `2px solid` accent, padding 34px 40px, rotated -0.3deg. Left: "LET'S BUILD SOMETHING GREAT." (Permanent Marker 34px) + copy + linked email/GitHub/LinkedIn (mono 13px). Right: red stamp "REPLIES < 24H" (rotated 3deg) + "Cebu, Philippines · GMT+8" annotation. Keep the existing contact form if desired — style inputs as thin blue-bordered dark fields with mono labels; submit button as an accent-bordered stamp.
- Footer: centered mono 11px `#5d6b7c`: "© 2026 JAY CRIS BAHANDI · DRAWN UP IN CEBU, PHILIPPINES".

## Interactions & Behavior
- The prototype is static; on the real site keep existing behaviors (smooth-scroll nav, contact form submit, project filters) and restyle them.
- Links: default color accent `#e8b64c`, hover `#d95b3d`.
- Suggested motion (matches current site's Framer Motion usage): sections fade/slide up on scroll-into-view; skill bars animate width from 0 on first view; stamps can "thump" in (scale 1.15→1, ~200ms ease-out). Keep it subtle.
- Responsive: below ~768px, hero stacks (photo above text), about and skills grids collapse to one column, stats strip wraps 2×2, experience left rail moves above content. Title block can hide on small screens.

## State Management
No new state beyond what the site already has (filter selection, form fields). Tweakable design flags in the prototype: accent color (`#e8b64c` default; `#6cc3e0`, `#d95b3d` alternates), show/hide skill bars, show/hide availability stamp.

## Design Tokens
See "Color tokens" and "Typography system" above. Spacing rhythm: 64px between sections, 16–22px card padding, 24px base grid. Radius: 3–4px (chips/stamps only; cards are square). Borders: 1px blue-alpha for structure, 2–3px solid for accent/stamp frames.

## Assets
- Google Fonts: **Permanent Marker**, **Gochi Hand**, **Shadows Into Light** (all OFL).
- The photo slot expects the real headshot; the tape strip and cream mat are pure CSS.
- No images/SVGs otherwise — grid, title block, stamps are all CSS.

## Files
- `Jay Cris Bahandi Portfolio.dc.html` — the full high-fidelity design reference (open in a browser; content + logic are inline; ignore the `image-slot.js` helper, it's just the prototype's photo placeholder).
- `image-slot.js` — prototype-only photo placeholder component; do not port.
