# CALCOLY — PRE-DEPLOYMENT QA REPORT

**Date:** 2026-08-28  
**Scope:** Final Pre-Deployment Quality Assurance Audit for Calcoly Live Production  
**Status:** **READY FOR DEPLOYMENT**

---

## 1. Build Result

- **Build Engine:** Custom Zero-Dependency Static Site Generator (`build.mjs`)
- **Status:** **PASS** (Exit Code: 0)
- **Artifacts Generated:**
  - 112 Pre-rendered Static HTML Pages in `dist/`
  - 1 Production Sitemap in `dist/sitemap.xml`
  - Client assets mirrored in `dist/assets/` (`app.js?v=4`, `widgets.js?v=4`, `styles.css?v=4`)
  - Static root assets: `favicon.svg`, `og-image.png`, `manifest.webmanifest`, `robots.txt`, `sw.js`
- **Build Errors:** 0

---

## 2. Validation & Test Results

| Test / Audit Script | Target Scope | Results | Status |
|---------------------|--------------|---------|--------|
| `validate-sitemap.mjs` | 112 URLs in `sitemap.xml` vs `dist/` | 112 valid / 0 removed / 0 broken / 0 duplicate / 0 non-200 | **PASS** |
| `scripts/deep-audit.mjs` | Internal links, schemas, service worker, server | 112 HTML files audited, 123 internal link routes verified, 98 JSON-LD schemas validated | **PASS** |
| `scripts/qa-check.mjs` | 6,658 link/asset references in HTML | 6,658 internal refs checked / 0 broken links | **PASS** |
| `scratch/pre-deploy-qa.mjs` | Comprehensive pre-deploy verification | All routes, metadata, sitemap rules, and mobile tags verified | **PASS** |

---

## 3. Production Route Verification

All requested primary and priority routes were verified to exist as pre-rendered HTML files in `dist/`:

- [x] `/` (`dist/index.html`)
- [x] `/all-tools/` (`dist/all-tools/index.html`)
- [x] `/calculators/` (`dist/calculators/index.html`)
- [x] `/converters/` (`dist/converters/index.html`)
- [x] `/baking/` (`dist/baking/index.html`)
- [x] `/money/` (`dist/money/index.html`)
- [x] `/date/` (`dist/date/index.html`)
- [x] `/everyday/` (`dist/everyday/index.html`)
- [x] `/converter/cm-to-inches/` (`dist/converter/cm-to-inches/index.html`)
- [x] `/converter/inches-to-cm/` (`dist/converter/inches-to-cm/index.html`)
- [x] `/converter/kg-to-lbs/` (`dist/converter/kg-to-lbs/index.html`)
- [x] `/converter/lbs-to-kg/` (`dist/converter/lbs-to-kg/index.html`)
- [x] `/converter/mm-to-inches/` (`dist/converter/mm-to-inches/index.html`)
- [x] `/converter/celsius-to-fahrenheit/` (`dist/converter/celsius-to-fahrenheit/index.html`)
- [x] `/converter/fahrenheit-to-celsius/` (`dist/converter/fahrenheit-to-celsius/index.html`)
- [x] `/calculator/percentage/` (`dist/calculator/percentage/index.html`)
- [x] `/calculator/percentage-increase/` (`dist/calculator/percentage-increase/index.html`)
- [x] `/baking/cups-to-grams/` (`dist/baking/cups-to-grams/index.html`)

---

## 4. Homepage SEO & Content Verification

- **Title:** `Free Online Calculators & Converters | Calcoly` (Verified exact)
- **H1:** `Free Online Calculators & Converters` (Verified exact)
- **Brand Tagline:** `Calculate. Convert. Done.` (Verified exact)
- **Meta Description:** `Free online calculators and converters for everyday math, unit conversions, baking, money, dates and more. Fast, accurate and easy to use.` (Verified exact)
- **Canonical URL:** `https://calcoly.com/` (Verified exact)
- **Open Graph & Twitter Cards:** Configured with matching title, description, and canonical URL.

---

## 5. Priority Pages SEO & Metadata Verification (10 Tools)

All 10 priority pages possess unique metadata, exact canonicals, formula cards, crawlable data tables, and social sharing tags:

| Tool URL | H1 | Unique Title | Unique Meta Description | Canonical URL Match |
|----------|----|--------------|-------------------------|---------------------|
| `/converter/cm-to-inches/` | CM to Inches Converter | CM to Inches Converter \| Convert Centimeters to Inches \| Calcoly | Convert centimeters to inches (cm to inches) instantly. Exact 2.54 cm/inch formula, step-by-step calculation, and common conversion reference table. Free. | `https://calcoly.com/converter/cm-to-inches/` |
| `/converter/inches-to-cm/` | Inches to CM Converter | Inches to CM Converter \| Convert Inches to Centimeters \| Calcoly | Convert inches to centimeters (inches to cm) instantly. Standard 2.54 conversion factor, live calculation, formula, and reference chart. Free. | `https://calcoly.com/converter/inches-to-cm/` |
| `/converter/kg-to-lbs/` | KG to LBS Converter | KG to LBS Converter \| Convert Kilograms to Pounds \| Calcoly | Convert kilograms to pounds (kg to lbs) instantly. Exact 2.2046226218 lb/kg factor, live calculation, formula explanation, and conversion table. Free. | `https://calcoly.com/converter/kg-to-lbs/` |
| `/converter/lbs-to-kg/` | LBS to KG Converter | LBS to KG Converter \| Convert Pounds to Kilograms \| Calcoly | Convert pounds to kilograms (lbs to kg) instantly. Official international definition (0.45359237 kg/lb), formula, and gym & body weight chart. Free. | `https://calcoly.com/converter/lbs-to-kg/` |
| `/converter/mm-to-inches/` | MM to Inches Converter | MM to Inches Converter \| Convert Millimeters to Inches \| Calcoly | Convert millimeters to inches (mm to inches) instantly. Exact 25.4 mm/inch engineering standard, formula explanation, and quick conversion table. Free. | `https://calcoly.com/converter/mm-to-inches/` |
| `/converter/celsius-to-fahrenheit/` | Celsius to Fahrenheit Converter | Celsius to Fahrenheit Converter \| °C to °F \| Calcoly | Convert Celsius to Fahrenheit (°C to °F) instantly. Exact formula °F = (°C × 9/5) + 32, temperature calculation steps, and cooking/weather table. Free. | `https://calcoly.com/converter/celsius-to-fahrenheit/` |
| `/converter/fahrenheit-to-celsius/` | Fahrenheit to Celsius Converter | Fahrenheit to Celsius Converter \| °F to °C \| Calcoly | Convert Fahrenheit to Celsius (°F to °C) instantly. Exact formula °C = (°F − 32) × 5/9, live calculation, and oven & weather conversion chart. Free. | `https://calcoly.com/converter/fahrenheit-to-celsius/` |
| `/calculator/percentage/` | Percentage Calculator | Percentage Calculator \| Calculate Percentages Online \| Calcoly | Free online percentage calculator. Solve what is X% of Y, X is what percent of Y, and percentage change instantly with clear step-by-step formulas. | `https://calcoly.com/calculator/percentage/` |
| `/calculator/percentage-increase/` | Percentage Increase Calculator | Percentage Increase Calculator \| Calculate Percent Increase \| Calcoly | Calculate percentage increase between two numbers instantly. Exact formula ((New − Old) ÷ Old) × 100 with clear examples for prices, salary, and growth. | `https://calcoly.com/calculator/percentage-increase/` |
| `/baking/cups-to-grams/` | Cups to Grams Converter | Cups to Grams Converter \| Baking Conversion Chart \| Calcoly | Convert cups to grams for flour, sugar, butter and 16 baking ingredients. Accurate density-specific kitchen conversion table and live calculator. Free. | `https://calcoly.com/baking/cups-to-grams/` |

---

## 6. Sitemap Verification (`sitemap.xml`)

- **XML Standard:** Valid XML 1.0 format with `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` namespace.
- **URL Count:** Exactly 112 URLs (100% match with static build).
- **HTTPS & Canonical:** All URLs use `https://calcoly.com/...`.
- **Cleanliness:**
  - 0 query string (`?`) URLs
  - 0 duplicate URLs
  - 0 non-existent (404) URLs
  - No misleading identical `<lastmod>` timestamps
  - No obsolete `<changefreq>` or `<priority>` tags

---

## 7. Robots.txt Verification (`robots.txt`)

- **File Content:**
  ```text
  User-agent: *
  Allow: /

  Sitemap: https://calcoly.com/sitemap.xml
  ```
- **Directives:** Open crawl access (`Allow: /`) for search engine bots. No legitimate tool or category pages blocked. Reference to `sitemap.xml` verified.

---

## 8. JSON-LD Structured Data Verification

- **Total Validated Schemas:** 98 JSON-LD blocks across all pages.
- **Schema Types:**
  - `WebApplication`: Application category `UtilityApplication`, price `0`.
  - `BreadcrumbList`: Accurate hierarchical breadcrumb elements.
  - `FAQPage`: Factual, tool-specific Q&A pairs.
- **Spam / Penalty Check:** 
  - Fake reviews: **0**
  - Fake aggregate ratings: **0**
  - Fake awards / claims: **0**

---

## 9. Functionality & Calculation Logic Verification

- **Calculation Core:** Client-side JavaScript (`public/assets/widgets.js` and `public/assets/app.js`).
- **Precision:**
  - `cm-to-inches`: `cm ÷ 2.54` (Floating-point precision with 4 decimals)
  - `inches-to-cm`: `inches × 2.54` (3 decimals)
  - `kg-to-lbs`: `kg × 2.2046226218` (4 decimals)
  - `lbs-to-kg`: `lbs × 0.45359237` (4 decimals)
  - `mm-to-inches`: `mm ÷ 25.4` (4 decimals)
  - `celsius-to-fahrenheit`: `(°C × 9/5) + 32` (2 decimals)
  - `fahrenheit-to-celsius`: `(°F − 32) × 5/9` (2 decimals)
  - `percentage`: 3 modes (`X% of Y`, `X is what % of Y`, and `% Change`)
  - `percentage-increase`: `((New − Old) ÷ Old) × 100`
  - `cups-to-grams`: 16 verified culinary density multipliers (e.g., flour = 120g/cup, sugar = 200g/cup, butter = 227g/cup)
- **Interactive UI:** Real-time calculation on input, live ⇄ unit swap button, clipboard one-click copy, and ⌘K quick-search modal.

---

## 10. Mobile Responsiveness & Layout Verification

- **Viewport Configuration:** `<meta name="viewport" content="width=device-width,initial-scale=1">` present across all 112 HTML files.
- **Form Controls:** 16px base font size on inputs to prevent iOS automatic zoom.
- **Touch Targets:** 44px touch targets on swap buttons, modal triggers, and nav elements.
- **Fluid Layout:** CSS Grid and Flexbox with responsive breakpoints (`@media (max-width: 640px)`) for cards, tables, and conversion rows.

---

## 11. Warnings & Notes

- No blockers, warnings, or errors found during the QA audit.
- No files were pushed to git or deployed to live servers.

---

## Final QA Verdict

# READY FOR DEPLOYMENT
