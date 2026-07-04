# erstahl — The Drift, official author site

Static site (HTML/CSS/JS, no backend). The site is styled as a page of the
Censor's ledger: thin rule lines, numbered entries, Space Mono as the
register's voice, and a live counter converting the visit into years.

- Palette: Cold #0B0F19 / Brace #E65F2B (tokens in `css/tokens.css`)
- Fonts: self-hosted (Space Grotesk / Inter / Space Mono), `css/fonts.css`
- All book cards render from `data/books.js` — one entry per volume
- Email capture: EmailOctopus (Phase 5)

## Structure
- `index.html` — single page, entries mounted progressively
- `css/` — fonts, tokens, base
- `js/` — main entry, `ledger.js` (counter), renderer (Phase 3)
- `data/books.js` — saga data, single source of truth
- `assets/fonts/`, `assets/covers/`
