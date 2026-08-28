# Calcoly

Static utility site — 111 pages, zero dependencies. `Calculate. Convert. Done.`

## Commands

```bash
node build.mjs                  # build dist/ (stamps service-worker cache id)
node server.mjs                 # local preview at http://localhost:3000
node validate-sitemap.mjs       # SEO audit: sitemap vs canonicals vs noindex
node scripts/generate-og-chrome.mjs   # regenerate public/og-image.png (needs Chrome)
```

Deploy: upload `dist/` to Cloudflare Pages (or any static host). No build environment needed on the host.

## URL convention (important — do not break)

Hubs are **plural**, tools are **singular**:

| Pillar | Hub (plural) | Tools (singular) |
|---|---|---|
| calculator | `/calculators/` | `/calculator/percentage/` |
| converter | `/converters/` | `/converter/kg-to-lbs/` |
| baking | `/baking/` | `/baking/cups-to-grams/` (same for hub & tools) |
| money | `/money/` | `/money/tip/` (same) |
| date | `/date/` | `/date/age/` (same) |
| everyday | `/everyday/` | `/everyday/word-counter/` (same) |

Rules:
- NEVER create tool pages under `/calculators/` or `/converters/` (plural) — those paths are hub-only.
- Every page needs: canonical, trailing slash, and a sitemap entry (the validator enforces all three).
- Adding a tool = add one entry to `src/tools.mjs` (widget type, lead, formula, examples, faqs) + a widget function in `src/templates.mjs` + logic in `public/assets/widgets.js` if new type. Bump `?v=` asset versions in `wrap()` when assets change.

## Content honesty rules

- Crypto converter uses **static reference rates** — never present them as live, never show fabricated change percentages.
- Health calculators (BMI/TDEE/macros) carry a "not medical advice" FAQ.
- Finance results are labeled estimates; official filings need an accountant.

## Design

See `../CALCOLY-DESIGN.md` — cream `#faf9f5`, coral `#cc785c`, ink `#141413`, Cormorant Garamond display + Inter UI. Results render in serif. Font budget: Cormorant 500/600 + Inter 400/500/600 only.
