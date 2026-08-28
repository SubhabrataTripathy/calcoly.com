/* Calcoly page templates — pure string interpolation, zero dependencies */
import { tools, pillars, ingredients, SITE, toolUrl, getInvertedTool, getClusterSiblings, getPopularTools } from './tools.mjs';

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function pillarName(id) {
  var p = pillars.find(x => x.id === id);
  return p ? p.name : id;
}

const NAV = pillars.map(p => ({ label: p.name, href: '/' + p.id + '/' }));

function searchIconSVG(sz) {
  var s = sz || 15;
  return '<svg class="search-icon" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
}

function navHTML(cur) {
  return '<nav class="top-nav"><div class="container top-nav-inner">' +
    '<a href="/" class="brand"><span class="mark"></span>Calcoly</a>' +
    '<div class="nav-links">' +
    NAV.map(l => '<a href="' + l.href + '"' + (cur === l.href ? ' aria-current="page"' : '') + '>' + esc(l.label) + '</a>').join('') +
    '</div>' +
    '<button class="nav-search-btn" id="nav-search-trigger" title="Search tools (Ctrl+K)"><span class="lens">' + searchIconSVG(14) + '</span><kbd>⌘K</kbd></button>' +
    '<a href="/all-tools/" class="btn btn-primary">All tools</a>' +
    '</div></nav>';
}

function footerHTML() {
  const cols = [
    { h: 'Calculators', slugs: ['percentage','percentage-increase','percentage-decrease','percent-off','bmi','fraction','gpa','tdee','macros'] },
    { h: 'Converters', slugs: ['kg-to-lbs','lbs-to-kg','cm-to-inches','inches-to-cm','mm-to-inches','cm-to-feet','miles-to-km','km-to-miles','celsius-to-fahrenheit','fahrenheit-to-celsius','stone-to-kg','kg-to-stone'] },
    { h: 'Kitchen & Finance', slugs: ['cups-to-grams','grams-to-cups','recipe-scaler','tbsp-to-cups','tip','discount','vat-calculator'] },
  ];
  const colHTML = cols.map(c => {
    const links = c.slugs.map(s => {
      var t = tools.find(x => x.slug === s);
      return t ? '<a href="' + toolUrl(t) + '">' + esc(t.name) + '</a>' : '';
    }).join('');
    return '<div><h4>' + esc(c.h) + '</h4>' + links + '</div>';
  }).join('');

  return '<footer class="site-footer"><div class="container footer-inner">' +
    '<div class="footer-top"><div>' +
    '<div class="footer-brand"><span class="mark"></span>Calcoly</div>' +
    '<p class="footer-tag">Calculate &middot; Convert &middot; Done.</p>' +
    '</div>' +
    '<div class="footer-assets">' +
    '<h4>Printable Cheat Sheets</h4>' +
    '<a href="/baking-conversion-chart/">Baking Conversion Chart</a>' +
    '<a href="/metric-to-imperial-cheat-sheet/">Metric to Imperial Cheat Sheet</a>' +
    '<a href="/percentage-formula-cheat-sheet/">Percentage Formula Cheat Sheet</a>' +
    '</div></div>' +
    '<div class="footer-cols">' + colHTML + '</div>' +
    '<div class="footer-base"><span>&copy; ' + new Date().getFullYear() + ' Calcoly &middot; Calculate. Convert. Done.</span>' +
    '<span><a href="/all-tools/">All Tools</a> &middot; <a href="/privacy/">Privacy</a> &middot; <a href="/terms/">Terms</a> &middot; <a href="/contact/">Contact</a></span></div>' +
    '</div></footer>';
}

function toolsStateScript() {
  var toolIndexJSON = JSON.stringify(tools.map(t => ({
    n: t.name,
    h: t.h1,
    u: toolUrl(t),
    k: (t.kw || []).join(' ')
  })));
  return '<script>window.CALCOLY_TOOLS=' + toolIndexJSON + ';</script>';
}

export function wrap(body, meta) {
  var title = meta.title || (SITE.name + ' \u2014 ' + SITE.tagline);
  var desc = meta.desc || (SITE.tagline + ' Free, instant, no sign-up.');
  var canUrl = meta.canonical || (SITE.url + '/');
  var can = '<link rel="canonical" href="' + canUrl + '">';
  var schema = meta.schema ? '<script type="application/ld+json">' + meta.schema + '</script>' : '';
  
  var ogTags = '<meta property="og:site_name" content="Calcoly">' +
    '<meta property="og:type" content="website">' +
    '<meta property="og:title" content="' + esc(title) + '">' +
    '<meta property="og:description" content="' + esc(desc) + '">' +
    '<meta property="og:url" content="' + canUrl + '">' +
    '<meta property="og:image" content="' + SITE.url + '/og-image.png">' +
    '<meta name="twitter:card" content="summary_large_image">' +
    '<meta name="twitter:title" content="' + esc(title) + '">' +
    '<meta name="twitter:description" content="' + esc(desc) + '">';

  var searchModalHTML = '<div class="search-modal-backdrop" id="search-modal">' +
    '<div class="search-modal-box">' +
    '<div class="sm-field"><span class="lens">' + searchIconSVG(18) + '</span><input type="text" id="sm-input" placeholder="Search a tool — e.g. &quot;sourdough&quot;, &quot;tdee&quot;, &quot;kg to lbs&quot;" autocomplete="off"><button class="sm-close" id="sm-close">&times;</button></div>' +
    '<div class="search-results sm-results" id="sm-results"></div>' +
    '</div>' +
    '</div>';

  var gtag = '<!-- Google tag (gtag.js) -->' +
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-69Y8M90R5P"></script>' +
    '<script>' +
    'window.dataLayer = window.dataLayer || [];' +
    'function gtag(){dataLayer.push(arguments);}' +
    'gtag("js", new Date());' +
    'gtag("config", "G-69Y8M90R5P");' +
    '</script>';

  return '<!DOCTYPE html><html lang="en"><head>' + gtag + '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/manifest.webmanifest">' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">' +
    '<title>' + esc(title) + '</title><meta name="description" content="' + esc(desc) + '">' + can + ogTags + schema +
    '<link rel="stylesheet" href="/assets/styles.css?v=3">' + toolsStateScript() + '</head><body>' + body +
    '<script src="/assets/app.js?v=3"></script><script src="/assets/widgets.js?v=3"></script>' + searchModalHTML + footerHTML() + '</body></html>';
}

/* ========== HOMEPAGE ========== */
export function homepage() {
  var pops = getPopularTools(8).map(t => '<a href="' + toolUrl(t) + '">' + esc(t.name) + '</a>').join('');
  
  var tiles = pillars.map(p => {
    var pillarTools = tools.filter(t => t.pillar === p.id);
    var links = pillarTools.slice(0, 6).map(t => '<li><a href="' + toolUrl(t) + '">' + esc(t.name) + '</a></li>').join('');
    return '<div class="tile"><h3><a href="/' + p.id + '/">' + esc(p.name) + '</a></h3><ul>' + links + '</ul>' +
      '<div style="margin-top:14px"><a href="/' + p.id + '/" class="caption" style="color:var(--primary)">Browse all ' + pillarTools.length + ' tools &rarr;</a></div></div>';
  }).join('');

  var toolIndexJSON = JSON.stringify(tools.map(t => ({
    n: t.name,
    h: t.h1,
    u: toolUrl(t),
    k: (t.kw || []).join(' ')
  })));

  var body = navHTML('/') +
  '<section class="hero container"><h1 class="display-hero">Calculate. Convert. Done.</h1>' +
  '<p class="body-md sub">Fast, precise calculators and converters for everyday math. Clean, instant, no sign-up.</p>' +
  '<div class="search-wrap" id="search"><div class="search-field"><span class="lens">' + searchIconSVG(18) + '</span>' +
  '<input type="text" id="q" placeholder="Search a tool \u2014 e.g. &quot;kg to lbs&quot;, &quot;cups to grams&quot;" autocomplete="off"><kbd>Enter</kbd></div>' +
  '<div class="search-results" id="results"></div></div>' +
  '<div class="popular"><span class="caption label">Popular Utility Tools</span>' + pops + '</div>' +
  '<div class="promise"><span>&#10003; Free forever</span><span>&#10003; No sign-up</span><span>&#10003; Instant results</span></div></section>' +

  '<section class="section container">' +
  '<div class="cheat-sheets-banner">' +
  '<div class="cs-content">' +
  '<span class="badge-pill">Free printable references</span>' +
  '<h2 class="title-lg" style="margin:8px 0 4px">Printable Cheat Sheets & Charts</h2>' +
  '<p class="body-sm">Free printable charts for food bloggers, teachers, students, and DIY enthusiasts.</p>' +
  '</div>' +
  '<div class="cs-links">' +
  '<a href="/baking-conversion-chart/" class="btn btn-secondary">Baking Chart</a>' +
  '<a href="/metric-to-imperial-cheat-sheet/" class="btn btn-secondary">Metric to Imperial</a>' +
  '<a href="/percentage-formula-cheat-sheet/" class="btn btn-secondary">Percentage Formulas</a>' +
  '</div></div>' +
  '<h2 class="display-sm" style="margin:40px 0 24px">Explore Calcoly</h2><div class="tiles">' + tiles + '</div></section>';

  return wrap(body, {
    title: SITE.name + ' \u2014 ' + SITE.tagline,
    canonical: SITE.url + '/'
  });
}


/* ---- FAQ augmentation: truthful per-category FAQs so every page has >=3 ---- */
function augmentFaqs(t) {
  var out = (t.faqs || []).slice();
  var has = s => out.some(f => f.q.toLowerCase().indexOf(s) > -1);
  if (!has('store') && !has('upload') && !has('sent to')) out.push({ q: 'Does Calcoly store or upload anything I type?', a: 'No. Every calculation runs locally in your browser with JavaScript \u2014 nothing you enter is sent to a server, logged, or shared.' });
  var s = t.slug || '';
  if (/bmi|tdee|macros|water-intake/.test(s)) {
    if (!has('medical')) out.push({ q: 'Is this medical advice?', a: 'No. It is an estimate based on published equations and general guidelines. Individual needs vary \u2014 consult a qualified health professional for personal advice.' });
  } else if (s === 'crypto-converter') {
    if (!has('live')) out.push({ q: 'Are these cryptocurrency prices live?', a: 'No. The built-in prices are static reference values for rough estimation only. Crypto markets move continuously, so always check a live exchange rate before transacting.' });
  } else if (t.pillar === 'finance') {
    if (!has('accounting')) out.push({ q: 'Can I use this for official tax or accounting work?', a: 'Treat the results as quick estimates for planning only. Official filings need proper accounting records \u2014 and rules differ by country and year, so confirm specifics with an accountant or your revenue authority.' });
  } else if (t.widget && t.widget.type === 'convert' && !s.includes('cup') && !s.includes('gallon') && !s.includes('fuel') && !s.includes('awg')) {
    if (!has('exact')) out.push({ q: 'Are the conversion factors exact?', a: 'Yes \u2014 they use the internationally agreed definitions (for example 1 inch = 2.54 cm exactly, 1 lb = 0.45359237 kg exactly), so the math is precise; display rounding is the only simplification.' });
  } else if (t.pillar === 'baking') {
    if (!has('differ') && !has('vary')) out.push({ q: 'Why might my result differ slightly from another chart?', a: 'Ingredient densities vary with brand, humidity and how firmly an ingredient is packed. Authoritative charts disagree by a few percent; professional bakers solve this by weighing in grams, which this site encourages.' });
  } else if (/paint|tile|concrete|soil-mulch|firewood-cord/.test(s)) {
    if (!has('extra') && !has('order')) out.push({ q: 'Should I buy more than the calculated amount?', a: 'Usually yes. Materials come in whole bags or units, real rooms are never perfectly square, and some waste is normal \u2014 adding roughly 10% covers most projects.' });
  } else if (/yarn|knitting|crochet|fabric|sewing|wpi|clothing-size/.test(s)) {
    if (!has('manufacturer') && !has('brand')) out.push({ q: 'Why do sizing standards vary between brands?', a: 'Craft and clothing sizes are voluntary conventions, not laws \u2014 manufacturers interpret them slightly differently. Use the result as a starting point and always check the specific brand\u2019s own chart or gauge.' });
  } else if (s.includes('awg')) {
    if (!has('code') && !has('insulation')) out.push({ q: 'Does AWG size include the wire insulation?', a: 'No \u2014 AWG describes the bare conductor. Current capacity also depends on insulation rating, bundling and installation, so follow your local electrical code for safe ampacity.' });
  }
  if (out.length < 3 && !has('accurate')) out.push({ q: 'How accurate are the results?', a: 'Calcoly uses standard published formulas and constants, computed locally in your browser. Results are rounded to sensible everyday precision; for engineering-grade work use dedicated measurement tools.' });
  return out;
}

/* ========== TOOL PAGE ========== */
export function toolPage(t) {
  var path = toolUrl(t);
  var faqs = augmentFaqs(t);
  var inverted = getInvertedTool(t);
  var siblings = getClusterSiblings(t);
  var popular = getPopularTools(4);

  // WebApplication schema
  var appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.h1,
    url: SITE.url + path,
    description: t.metaDesc,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  };

  // BreadcrumbList Schema (Hierarchy: Home > Hub > Ecosystem > Tool)
  var breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' },
      { '@type': 'ListItem', position: 2, name: pillarName(t.pillar), item: SITE.url + '/' + t.pillar + '/' },
      { '@type': 'ListItem', position: 3, name: t.ecosystem, item: SITE.url + '/' + t.pillar + '/#' + t.ecosystem.toLowerCase() },
      { '@type': 'ListItem', position: 4, name: t.h1, item: SITE.url + path }
    ]
  };

  // FAQPage Schema
  var faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  var body = navHTML(path) +
  // Breadcrumb UI
  '<div class="container crumbs">' +
  '<a href="/">Home</a><span>&rsaquo;</span>' +
  '<a href="/' + t.pillar + '/">' + esc(pillarName(t.pillar)) + '</a><span>&rsaquo;</span>' +
  '<span>' + esc(t.ecosystem) + '</span><span>&rsaquo;</span>' +
  '<span>' + esc(t.h1) + '</span></div>' +

  // Header & Lead
  '<div class="container tool-head">' +
  '<div class="badge-pill">' + esc(t.ecosystem) + ' Ecosystem</div>' +
  '<h1 class="display-md" style="margin-top:8px">' + esc(t.h1) + '</h1>' +
  '<p class="body-md lead">' + esc(t.lead) + '</p></div>' +

  '<div class="container">' +
  // Tool Interactive Interface Widget
  widgetHTML(t) +

  // Inverted Tool Banner (if available)
  (inverted ?
    '<div class="inverted-banner">' +
    '<span>Need the opposite conversion?</span> ' +
    '<a href="' + toolUrl(inverted) + '" class="btn btn-secondary btn-sm">Convert ' + esc(inverted.h1) + ' &rarr;</a>' +
    '</div>' : '') +

  // Formula Section (Code Window Card) & AI Citation Summary
  '<div class="section-divider"></div>' +
  '<div class="formula-card-wrap">' +
  '<div class="code-window-card">' +
  '<div class="code-window-header"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="code-title">Formula &amp; AI Citation Summary</span></div>' +
  '<div class="code-window-body"><code>' + esc(t.formula) + '</code>' +
  '<div class="quick-summary-note"><strong>Quick Summary:</strong> ' + esc(t.lead) + ' Formula: <code>' + esc(t.formula) + '</code></div>' +
  '</div></div></div>' +

  // Practical Examples
  (t.examples && t.examples.length ?
    '<div class="examples-wrap" style="margin-top:32px">' +
    '<h3 class="title-md" style="margin-bottom:12px">Practical Examples</h3>' +
    '<ul class="examples-list">' + t.examples.map(ex => '<li>' + esc(ex) + '</li>').join('') + '</ul>' +
    '</div>' : '') +

  // Quick Conversion Table
  tableHTML(t) +

  // FAQ Accordions
  (faqs.length ?
    '<div class="faq-wrap" style="margin-top:40px">' +
    '<h2 class="title-lg" style="margin-bottom:16px">Frequently Asked Questions</h2>' +
    '<div class="faq">' + faqs.map(f => '<details><summary>' + esc(f.q) + '</summary><p class="a">' + esc(f.a) + '</p></details>').join('') + '</div>' +
    '</div>' : '') +

  '</div>' +

  // Related Tools & Interlinking Matrix
  relatedMatrixHTML(t, siblings, popular);

  return wrap(body, {
    title: t.metaTitle,
    desc: t.metaDesc,
    canonical: SITE.url + path,
    schema: JSON.stringify([appSchema, breadcrumbSchema, faqSchema])
  });
}

/* ========== PILLAR PAGE (HUB) ========== */
export function pillarPage(pid) {
  var p = pillars.find(x => x.id === pid); if (!p) return '';
  var pTools = tools.filter(t => t.pillar === pid);
  
  // Group by ecosystem
  var ecoMap = {};
  pTools.forEach(t => {
    ecoMap[t.ecosystem] = ecoMap[t.ecosystem] || [];
    ecoMap[t.ecosystem].push(t);
  });

  var ecoSections = Object.keys(ecoMap).map(ecoName => {
    var list = ecoMap[ecoName].map(t =>
      '<a href="' + toolUrl(t) + '" class="tool-card">' +
      '<div class="name">' + esc(t.h1) + '</div>' +
      '<div class="desc">' + esc(t.lead.slice(0, 90)) + '…</div>' +
      '</a>'
    ).join('');
    return '<div class="eco-group" id="' + ecoName.toLowerCase() + '" style="margin-bottom:40px">' +
      '<h2 class="display-sm" style="margin-bottom:16px">' + esc(ecoName) + ' Ecosystem</h2>' +
      '<div class="tool-grid">' + list + '</div>' +
      '</div>';
  }).join('');

  var body = navHTML('/' + pid + '/') +
    '<div class="container" style="padding:48px 24px 0">' +
    '<div class="crumbs"><a href="/">Home</a><span>&rsaquo;</span><span>' + esc(p.name) + '</span></div>' +
    '<h1 class="display-md" style="margin-top:12px">' + esc(p.name) + ' Hub</h1>' +
    '<p class="body-md" style="color:var(--muted);margin-top:8px;max-width:60ch">' + esc(p.blurb) + '</p>' +
    '</div>' +
    '<div class="section container">' + ecoSections + '</div>';

  return wrap(body, {
    title: p.name + ' Hub — Free Online ' + p.name + ' | Calcoly',
    desc: p.blurb + ' Browse clean, fast interactive tools. Free, instant, no sign-up.',
    canonical: SITE.url + '/' + pid + '/'
  });
}

/* ========== ALL TOOLS PAGE ========== */
export function allToolsPage() {
  var secs = pillars.map(p => {
    var cards = tools.filter(t => t.pillar === p.id).map(t =>
      '<a href="' + toolUrl(t) + '" class="tool-card">' +
      '<div class="name">' + esc(t.h1) + '</div>' +
      '<div class="desc">' + esc(t.lead.slice(0, 90)) + '…</div>' +
      '</a>'
    ).join('');
    return '<div style="margin-bottom:48px">' +
      '<h2 class="display-sm" style="margin-bottom:16px">' + esc(p.name) + ' (' + tools.filter(t => t.pillar === p.id).length + ')</h2>' +
      '<div class="tool-grid">' + cards + '</div>' +
      '</div>';
  }).join('');

  var body = navHTML('/all-tools/') +
    '<div class="container" style="padding:48px 24px 0">' +
    '<div class="crumbs"><a href="/">Home</a><span>&rsaquo;</span><span>All Tools</span></div>' +
    '<h1 class="display-lg" style="margin-top:12px">All Tools Directory</h1>' +
    '<p class="body-md" style="color:var(--muted);margin-top:8px">Every calculator, converter and kitchen utility on Calcoly.</p>' +
    '</div>' +
    '<div class="section container">' + secs + '</div>';

  return wrap(body, {
    title: 'All Tools Directory — Calculators, Converters & Utilities | Calcoly',
    desc: 'Browse every free tool on Calcoly: weight converters, length converters, percentage calculators, baking converters, finance tools and date calculators.',
    canonical: SITE.url + '/all-tools/'
  });
}

/* ========== LINKABLE ASSET PAGES ========== */

function printHeaderHTML() {
  return '<div class="print-header">' +
    '<div class="print-brand"><span class="mark"></span>Calcoly</div>' +
    '<div class="print-tag">Official Utility Reference Sheet &bull; www.calcoly.com</div>' +
    '</div>';
}

function printFooterHTML() {
  return '<div class="print-footer">' +
    '<span>&copy; ' + new Date().getFullYear() + ' Calcoly &bull; www.calcoly.com</span>' +
    '<span>Official Reference Document &bull; Page 1 of 1</span>' +
    '</div>';
}

export function bakingConversionChartPage() {
  var rows = ingredients.map(i =>
    '<tr><td>' + esc(i.n) + '</td><td class="num">' + i.g + ' g</td><td class="num">' + (i.g*0.5).toFixed(1) + ' g</td><td class="num">' + (i.g*0.25).toFixed(1) + ' g</td></tr>'
  ).join('');

  var body = navHTML('/') +
  '<div class="container crumbs"><a href="/">Home</a><span>&rsaquo;</span><a href="/baking/">Baking</a><span>&rsaquo;</span><span>Conversion Chart</span></div>' +
  '<div class="container" style="padding:32px 24px 64px">' +
  printHeaderHTML() +
  '<span class="badge-pill">Linkable Asset / Cheat Sheet</span>' +
  '<h1 class="display-lg" style="margin-top:8px">The Ultimate Baking Conversion Chart</h1>' +
  '<p class="body-md lead" style="margin-top:12px;max-width:64ch">Printable reference guide for flour, sugar, butter and 16 common baking ingredients. Grams per US Cup.</p>' +
  '<div class="cheat-sheet-box" style="margin-top:32px">' +
  '<div class="cs-actions"><button onclick="window.print()" class="btn btn-primary">&#128438; Print Chart / Save PDF</button></div>' +
  '<div class="table-wrap"><table class="data cs-table">' +
  '<thead><tr><th>Ingredient</th><th>1 US Cup</th><th>1/2 Cup</th><th>1/4 Cup</th></tr></thead>' +
  '<tbody>' + rows + '</tbody>' +
  '</table></div></div>' +
  '<div class="prose" style="margin-top:40px">' +
  '<h3>Why Weight Beats Volume in Baking</h3>' +
  '<p>A cup of flour can vary by up to 25% depending on whether it is scooped, sifted, or packed. Weighing ingredients in grams guarantees consistent baking results every time.</p>' +
  '<p>Use our interactive <a href="/baking/cups-to-grams/">Cups to Grams Converter</a> for live calculations.</p>' +
  '</div>' +
  printFooterHTML() +
  '</div>';

  return wrap(body, {
    title: 'The Ultimate Baking Conversion Chart (Cups to Grams Printable) | Calcoly',
    desc: 'Free printable baking conversion chart for flour, sugar, butter and baking ingredients. Convert cups to grams accurately.',
    canonical: SITE.url + '/baking-conversion-chart/'
  });
}

export function metricToImperialPage() {
  var rows = [
    { cat: 'Weight', metric: '1 Kilogram (kg)', imperial: '2.20462 Pounds (lbs)', link: '/converter/kg-to-lbs/' },
    { cat: 'Weight', metric: '1 Gram (g)', imperial: '0.03527 Ounces (oz)', link: '/converter/grams-to-ounces/' },
    { cat: 'Weight', metric: '1 Stone (st)', imperial: '6.35029 Kilograms (kg)', link: '/converter/stone-to-kg/' },
    { cat: 'Length', metric: '1 Centimeter (cm)', imperial: '0.39370 Inches (in)', link: '/converter/cm-to-inches/' },
    { cat: 'Length', metric: '1 Meter (m)', imperial: '3.28084 Feet (ft)', link: '/converter/meters-to-feet/' },
    { cat: 'Length', metric: '1 Kilometer (km)', imperial: '0.62137 Miles (mi)', link: '/converter/km-to-miles/' },
    { cat: 'Temperature', metric: '0 °Celsius (°C)', imperial: '32 °Fahrenheit (°F)', link: '/converter/celsius-to-fahrenheit/' },
    { cat: 'Temperature', metric: '100 °Celsius (°C)', imperial: '212 °Fahrenheit (°F)', link: '/converter/celsius-to-fahrenheit/' },
  ].map(r =>
    '<tr><td>' + esc(r.cat) + '</td><td>' + esc(r.metric) + '</td><td class="num">' + esc(r.imperial) + '</td><td><a href="' + r.link + '">Interactive Tool &rarr;</a></td></tr>'
  ).join('');

  var body = navHTML('/') +
  '<div class="container crumbs"><a href="/">Home</a><span>&rsaquo;</span><a href="/converters/">Converters</a><span>&rsaquo;</span><span>Metric Cheat Sheet</span></div>' +
  '<div class="container" style="padding:32px 24px 64px">' +
  printHeaderHTML() +
  '<span class="badge-pill">Linkable Asset / Cheat Sheet</span>' +
  '<h1 class="display-lg" style="margin-top:8px">Metric to Imperial Cheat Sheet</h1>' +
  '<p class="body-md lead" style="margin-top:12px;max-width:64ch">Printable cheat sheet for converting weight, length, distance, and temperature between Metric and Imperial systems.</p>' +
  '<div class="cheat-sheet-box" style="margin-top:32px">' +
  '<div class="cs-actions"><button onclick="window.print()" class="btn btn-primary">&#128438; Print Cheat Sheet / Save PDF</button></div>' +
  '<div class="table-wrap"><table class="data cs-table">' +
  '<thead><tr><th>Category</th><th>Metric Unit</th><th>Imperial Equivalent</th><th>Tool</th></tr></thead>' +
  '<tbody>' + rows + '</tbody>' +
  '</table></div></div>' +
  printFooterHTML() +
  '</div>';

  return wrap(body, {
    title: 'Metric to Imperial Cheat Sheet (Printable Reference Guide) | Calcoly',
    desc: 'Free printable Metric to Imperial conversion cheat sheet for weight, length, distance, and temperature.',
    canonical: SITE.url + '/metric-to-imperial-cheat-sheet/'
  });
}

export function percentageFormulaPage() {
  var body = navHTML('/') +
  '<div class="container crumbs"><a href="/">Home</a><span>&rsaquo;</span><a href="/calculators/">Calculators</a><span>&rsaquo;</span><span>Percentage Cheat Sheet</span></div>' +
  '<div class="container" style="padding:32px 24px 64px">' +
  printHeaderHTML() +
  '<span class="badge-pill">Linkable Asset / Cheat Sheet</span>' +
  '<h1 class="display-lg" style="margin-top:8px">Percentage Formula Cheat Sheet</h1>' +
  '<p class="body-md lead" style="margin-top:12px;max-width:64ch">The complete reference guide for percentage formulas, percentage increase, percent off, and relative change.</p>' +

  '<div class="pf-grid" style="margin-top:32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">' +
  '<div class="code-window-card">' +
  '<div class="code-window-header"><span class="code-title">1. Find X% of Y</span></div>' +
  '<div class="code-window-body"><code>Result = (X / 100) &times; Y</code></div>' +
  '<p class="body-sm" style="padding:14px;color:var(--muted)">Example: 15% of $200 = (15/100) &times; 200 = $30. <a href="/calculator/percentage/">Use Tool &rarr;</a></p>' +
  '</div>' +

  '<div class="code-window-card">' +
  '<div class="code-window-header"><span class="code-title">2. X is What % of Y</span></div>' +
  '<div class="code-window-body"><code>Percentage = (X / Y) &times; 100</code></div>' +
  '<p class="body-sm" style="padding:14px;color:var(--muted)">Example: 30 of 200 = (30/200) &times; 100 = 15%. <a href="/calculator/percentage/">Use Tool &rarr;</a></p>' +
  '</div>' +

  '<div class="code-window-card">' +
  '<div class="code-window-header"><span class="code-title">3. Percentage Increase</span></div>' +
  '<div class="code-window-body"><code>% Inc = ((New - Old) / Old) &times; 100</code></div>' +
  '<p class="body-sm" style="padding:14px;color:var(--muted)">Example: $80 to $100 = ((100-80)/80) &times; 100 = +25%. <a href="/calculator/percentage-increase/">Use Tool &rarr;</a></p>' +
  '</div>' +

  '<div class="code-window-card">' +
  '<div class="code-window-header"><span class="code-title">4. Percent Off (Discount)</span></div>' +
  '<div class="code-window-body"><code>Sale Price = Price &times; (1 - Discount%/100)</code></div>' +
  '<p class="body-sm" style="padding:14px;color:var(--muted)">Example: $100 at 20% off = 100 &times; 0.80 = $80. <a href="/calculator/percent-off/">Use Tool &rarr;</a></p>' +
  '</div>' +
  '</div>' +

  printFooterHTML() +
  '</div>';

  return wrap(body, {
    title: 'Percentage Formula Cheat Sheet (Free Reference Guide) | Calcoly',
    desc: 'Free printable percentage formula cheat sheet with formulas for percentage of a number, percentage increase, and discount prices.',
    canonical: SITE.url + '/percentage-formula-cheat-sheet/'
  });
}

/* ========== WIDGET HTML GENERATION ========== */
function widgetHTML(t) {
  var w = t.widget;
  switch (w.type) {
    case 'convert': return convertW(t);
    case 'percentage': return percentW(t);
    case 'pct_inc': return pctIncW(t);
    case 'pct_dec': return pctDecW(t);
    case 'bmi': return bmiW(t);
    case 'age': return ageW(t);
    case 'datecalc': return dateW(t);
    case 'wordcount': return wordcountW(t);
    case 'tip': return tipW(t);
    case 'discount': return discountW(t);
    case 'vat': return vatW(t);
    case 'cupsgrams': return cupsW(t);
    case 'recipe_scaler': return recipeScalerW(t);
    case 'fraction': return fractionW(t);
    case 'gpa': return gpaW(t);
    case 'sourdough': return sourdoughW(t);
    case 'bakers_pct': return bakersPctW(t);
    case 'cold_brew': return coldBrewW(t);
    case 'espresso_ratio': return espressoRatioW(t);
    case 'yeast_conv': return yeastConvW(t);
    case 'gelatin_conv': return gelatinW(t);
    case 'honey_sub': return honeySubW(t);
    case 'canning_alt': return canningAltW(t);
    case 'cocoa_sub': return cocoaSubW(t);
    case 'brine_calc': return brineW(t);
    case 'tdee': return tdeeW(t);
    case 'macros': return macrosW(t);
    case 'water_intake': return waterIntakeW(t);
    case 'paint': return paintW(t);
    case 'tile': return tileW(t);
    case 'concrete': return concreteW(t);
    case 'oven_temp': return ovenTempW();
    case 'density_converter': return densityConverterW();
    case 'yarn_gauge': return yarnGaugeW();
    case 'fabric_yardage': return fabricYardageW();
    case 'paper_dpi': return paperDpiW();
    case 'screen_ppi': return screenPpiW();
    case 'awg_converter': return awgConverterW();
    case 'exposure_triangle': return exposureTriangleW();
    case 'pan_substitution': return panSubstitutionW();
    case 'firewood_cord': return firewoodCordW();
    case 'aquarium_stocking': return aquariumStockingW();
    case 'soil_mulch': return soilMulchW();
    case 'paint_coverage': return paintCoverageW();
    case 'step_up_interest': return stepUpInterestW();
    case 'pan_equivalence': return panEquivalenceW();
    case 'humidity_hydration': return humidityHydrationW();
    case 'sewing_allowance': return sewingAllowanceW();
    case 'filament_calc': return filamentCalcW();
    case 'brew_abv': return brewAbvW();
    case 'crop_factor': return cropFactorW();
    case 'running_pace': return runningPaceW();
    case 'cycling_gear': return cyclingGearW();
    case 'firewood_btu': return firewoodBtuW();
    case 'solar_calc': return solarCalcW();
    case 'water_tank': return waterTankW();
    case 'ev_calc': return evCalcW();
    case 'guitar_tension': return guitarTensionW();
    case 'aquarium_co2': return aquariumCo2W();
    case 'crypto_converter': return cryptoConverterW();
    case 'wpi_yarn': return wpiYarnW();
    case 'knitting_needle': return knittingNeedleW();
    case 'crochet_hook': return crochetHookW();
    case 'priming_sugar': return primingSugarW();
    case 'print_cost': return printCostW();
    case 'cup_volume_conv': return cupVolumeConvW();
    case 'gallon_conv': return gallonConvW();
    case 'pressure_conv': return pressureConvW();
    case 'kids_clothing': return kidsClothingW();
    case 'date_resolver': return dateResolverW();
    case 'floor_conv': return floorConvW();
    case 'fuel_economy': return fuelEconomyW();
    default: return '';
  }
}

function convertW(t) {
  var w = t.widget;
  return '<div class="tool-card-ui"><div class="cv" data-type="convert" data-factor="' + (w.factor||1) + '" data-mode="' + (w.mode||'') + '" data-ua="' + esc(w.from.unit) + '" data-ub="' + esc(w.to.unit) + '" data-dec="' + (w.dec||4) + '">' +
    '<div class="convert-row">' +
    '<div class="field"><label>' + esc(w.from.label) + '</label><input type="number" id="cv-a" value="' + (w.start||1) + '" inputmode="decimal" step="any" class="num-input"><div class="unit-tag">' + esc(w.from.unit) + '</div></div>' +
    '<button class="swap-btn" id="cv-swap" title="Swap units">&#8693;</button>' +
    '<div class="field"><label>' + esc(w.to.label) + '</label><input type="number" id="cv-b" inputmode="decimal" step="any" readonly class="num-input"><div class="unit-tag">' + esc(w.to.unit) + '</div></div>' +
    '</div>' +
    '<div class="result-box dark-surface">' +
    '<div class="rlabel"><span>Calculated Result</span><button class="copy-btn" id="cv-copy">Copy</button></div>' +
    '<div class="result-lg tabular-nums" id="cv-result">&mdash;</div>' +
    '</div>' +
    '</div></div>';
}

function percentW() {
  return '<div class="tool-card-ui">' +
    '<div class="tabs"><button class="tab" data-pt="pctof" aria-selected="true">X% of Y</button><button class="tab" data-pt="pctis">X is what % of Y</button><button class="tab" data-pt="pctchg">% Change</button></div>' +
    '<div class="pct-mode" id="pm-pctof">' +
    '<div class="inline-mode"><div class="q">What is <input type="number" id="pa" value="15" inputmode="decimal" class="num-input">% of <input type="number" id="pb" value="200" inputmode="decimal" class="num-input">?</div>' +
    '<div class="inputs"><span class="eq">=</span><span class="answer tabular-nums" id="pr1">30</span></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Summary</span><button class="copy-btn" id="pc1">Copy</button></div><div class="result-lg tabular-nums" id="pf1">15% of 200 = 30</div></div>' +
    '</div>' +
    '<div class="pct-mode" id="pm-pctis" style="display:none">' +
    '<div class="inline-mode"><div class="q"><input type="number" id="pc" value="30" inputmode="decimal" class="num-input"> is what % of <input type="number" id="pd" value="200" inputmode="decimal" class="num-input">?</div>' +
    '<div class="inputs"><span class="eq">=</span><span class="answer tabular-nums" id="pr2">15%</span></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Summary</span><button class="copy-btn" id="pc2">Copy</button></div><div class="result-lg tabular-nums" id="pf2">30 is 15% of 200</div></div>' +
    '</div>' +
    '<div class="pct-mode" id="pm-pctchg" style="display:none">' +
    '<div class="inline-mode"><div class="q">From <input type="number" id="pe" value="80" inputmode="decimal" class="num-input"> to <input type="number" id="pf" value="100" inputmode="decimal" class="num-input"></div>' +
    '<div class="inputs"><span class="eq">=</span><span class="answer tabular-nums" id="pr3">+25%</span></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Summary</span><button class="copy-btn" id="pc3">Copy</button></div><div class="result-lg tabular-nums" id="pf3">Change from 80 to 100 = +25%</div></div>' +
    '</div>' +
    '</div>';
}

function pctIncW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2">' +
    '<div class="field"><label>Original Value</label><input type="number" id="pi-old" value="80" inputmode="decimal" class="num-input"></div>' +
    '<div class="field"><label>New Value</label><input type="number" id="pi-new" value="100" inputmode="decimal" class="num-input"></div>' +
    '</div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Percentage Increase</span><button class="copy-btn" id="pic">Copy</button></div><div class="result-lg tabular-nums" id="pir">+25%</div></div>' +
    '</div>';
}

function pctDecW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2">' +
    '<div class="field"><label>Original Value</label><input type="number" id="pd-old" value="100" inputmode="decimal" class="num-input"></div>' +
    '<div class="field"><label>New Value</label><input type="number" id="pd-new" value="75" inputmode="decimal" class="num-input"></div>' +
    '</div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Percentage Decrease</span><button class="copy-btn" id="pdc">Copy</button></div><div class="result-lg tabular-nums" id="pdr">-25%</div></div>' +
    '</div>';
}

function bmiW() {
  return '<div class="tool-card-ui"><div class="tabs"><button class="tab" data-bt="metric" aria-selected="true">Metric</button><button class="tab" data-bt="imperial">Imperial</button></div>' +
    '<div id="bm"><div class="row2"><div class="field" id="bmf-h"><label>Height (cm)</label><input type="number" id="bh" value="175" inputmode="decimal" class="num-input"></div><div class="field" id="bmf-w"><label>Weight (kg)</label><input type="number" id="bw" value="70" inputmode="decimal" class="num-input"></div></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>BMI Result</span><button class="copy-btn" id="bc">Copy</button></div><div class="result-lg tabular-nums" id="br">&mdash;</div><div id="bc2" class="caption" style="margin-top:8px;color:var(--on-dark-soft)"></div></div>' +
    '</div>';
}

function ageW() {
  return '<div class="tool-card-ui">' +
    '<div class="field"><label>Date of Birth</label><input type="date" id="adob" value="2000-01-15"></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Exact Age</span><button class="copy-btn" id="ac">Copy</button></div><div class="result-lg tabular-nums" id="ar">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Total months</div><div class="v tabular-nums" id="arm">&mdash;</div></div><div class="subresult"><div class="k">Total days</div><div class="v tabular-nums" id="ard">&mdash;</div></div><div class="subresult"><div class="k">Next birthday</div><div class="v tabular-nums" id="arb">&mdash;</div></div></div>' +
    '</div>';
}

function dateW() {
  return '<div class="tool-card-ui">' +
    '<div class="tabs"><button class="tab" data-dt="diff" aria-selected="true">Days Between</button><button class="tab" data-dt="add">Add / Subtract Days</button></div>' +
    '<div id="dm-diff"><div class="row2"><div class="field"><label>Start date</label><input type="date" id="ds1" value="2024-01-01"></div><div class="field"><label>End date</label><input type="date" id="ds2" value="2024-12-31"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Date Difference</span></div><div class="result-lg tabular-nums" id="dr">&mdash;</div><div class="subresults" id="dsr" style="margin-top:14px"></div></div></div>' +
    '<div id="dm-add" style="display:none"><div class="row2"><div class="field"><label>Start date</label><input type="date" id="da1" value="2024-01-01"></div><div class="field"><label>Days to add (+) or subtract (&minus;)</label><input type="number" id="da2" value="30" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Resulting Date</span><button class="copy-btn" id="dac">Copy</button></div><div class="result-lg tabular-nums" id="dar">&mdash;</div></div></div>' +
    '</div>';
}

function wordcountW() {
  return '<div class="tool-card-ui">' +
    '<div class="field"><label>Enter or paste text</label><textarea id="wt" placeholder="Start typing or paste text here…">The quick brown fox jumps over the lazy dog. Calcoly provides instant utility calculations.</textarea></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Words</div><div class="v tabular-nums" id="waw">&mdash;</div></div><div class="subresult"><div class="k">Characters</div><div class="v tabular-nums" id="wac">&mdash;</div></div><div class="subresult"><div class="k">Characters (no spaces)</div><div class="v tabular-nums" id="wans">&mdash;</div></div><div class="subresult"><div class="k">Sentences</div><div class="v tabular-nums" id="was">&mdash;</div></div><div class="subresult"><div class="k">Paragraphs</div><div class="v tabular-nums" id="wap">&mdash;</div></div><div class="subresult"><div class="k">Reading time</div><div class="v tabular-nums" id="war">&mdash;</div></div></div>' +
    '</div>';
}

function tipW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Bill amount ($)</label><input type="number" id="tb" value="85" inputmode="decimal" step="0.01" class="num-input"></div><div class="field"><label>Tip (%)</label><input type="number" id="tt" value="18" inputmode="decimal" class="num-input"></div><div class="field"><label>Split between</label><input type="number" id="tn" value="1" inputmode="numeric" min="1" class="num-input"></div></div>' +
    '<div class="chips"><button class="chip" data-v="15">15%</button><button class="chip" data-v="18">18%</button><button class="chip" data-v="20">20%</button><button class="chip" data-v="25">25%</button></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Amount Per Person</span><button class="copy-btn" id="tc">Copy</button></div><div class="result-lg tabular-nums" id="tr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Tip amount</div><div class="v tabular-nums" id="t1">&mdash;</div></div><div class="subresult"><div class="k">Total with tip</div><div class="v tabular-nums" id="t2">&mdash;</div></div><div class="subresult"><div class="k">Per person</div><div class="v tabular-nums" id="t3">&mdash;</div></div></div>' +
    '</div>';
}

function discountW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Original price ($)</label><input type="number" id="dd" value="100" inputmode="decimal" step="0.01" class="num-input"></div><div class="field"><label>Discount (%)</label><input type="number" id="dp" value="25" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Final Sale Price</span><button class="copy-btn" id="dc">Copy</button></div><div class="result-lg tabular-nums" id="dres">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">You save</div><div class="v tabular-nums" id="d1">&mdash;</div></div><div class="subresult"><div class="k">Sale price</div><div class="v tabular-nums" id="d2">&mdash;</div></div></div>' +
    '</div>';
}

function vatW() {
  return '<div class="tool-card-ui">' +
    '<div class="tabs"><button class="tab" data-vatm="add" aria-selected="true">Add VAT</button><button class="tab" data-vatm="remove">Remove VAT</button></div>' +
    '<div class="row2"><div class="field"><label>Amount (<span id="vlab">$</span>)</label><input type="number" id="va" value="100" inputmode="decimal" step="0.01" class="num-input"></div><div class="field"><label>VAT rate</label><div class="chips"><button class="chip" data-r="20">20% (UK std)</button><button class="chip" data-r="5">5% (reduced)</button><button class="chip" data-r="0">0%</button><input type="number" id="vr" value="20" inputmode="decimal" style="width:80px" class="num-input">%</div></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Amount</span><button class="copy-btn" id="vc">Copy</button></div><div class="result-lg tabular-nums" id="vres">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Net</div><div class="v tabular-nums" id="v1">&mdash;</div></div><div class="subresult"><div class="k">VAT</div><div class="v tabular-nums" id="v2">&mdash;</div></div><div class="subresult"><div class="k">Gross</div><div class="v tabular-nums" id="v3">&mdash;</div></div></div>' +
    '</div>';
}

function cupsW(t) {
  var dir = t.widget.dir;
  var opts = ingredients.map(i => '<option value="' + i.g + '">' + esc(i.n) + '</option>').join('');
  return '<div class="tool-card-ui" data-cg-dir="' + dir + '">' +
    '<div class="row2"><div class="field"><label>Ingredient</label><select id="cgi">' + opts + '</select></div><div class="field"><label>' + (dir === 'c2g' ? 'US Cups' : 'Grams') + '</label><input type="number" id="cgv" value="1" inputmode="decimal" step="any" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Weight Result</span><button class="copy-btn" id="cgc">Copy</button></div><div class="result-lg tabular-nums" id="cgr">&mdash;</div></div>' +
    '<div class="table-wrap" style="margin-top:20px"><table class="data"><thead><tr><th>Ingredient</th><th>1 US Cup = Grams</th></tr></thead><tbody>' + ingredients.slice(0, 8).map(i => '<tr><td>' + esc(i.n) + '</td><td class="num">' + i.g + ' g</td></tr>').join('') + '</tbody></table></div>' +
    '</div>';
}

function recipeScalerW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Original Servings</label><input type="number" id="rs-orig" value="4" inputmode="numeric" min="1" class="num-input"></div><div class="field"><label>Target Servings</label><input type="number" id="rs-targ" value="8" inputmode="numeric" min="1" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Multiplier Scale Factor</span><button class="copy-btn" id="rsc">Copy</button></div><div class="result-lg tabular-nums" id="rsr">2.0x</div></div>' +
    '</div>';
}

function fractionW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3">' +
    '<div class="field"><label>Num 1</label><input type="number" id="fn1" value="1" inputmode="numeric" class="num-input"></div>' +
    '<div class="field"><label>Den 1</label><input type="number" id="fd1" value="3" inputmode="numeric" min="1" class="num-input"></div>' +
    '<div class="field"><label>Op</label><select id="fo"><option value="+">+</option><option value="-">&minus;</option><option value="&times;">&times;</option><option value="&divide;">&divide;</option></select></div>' +
    '<div class="field"><label>Num 2</label><input type="number" id="fn2" value="1" inputmode="numeric" class="num-input"></div>' +
    '<div class="field"><label>Den 2</label><input type="number" id="fd2" value="4" inputmode="numeric" min="1" class="num-input"></div>' +
    '</div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Fraction Result</span><button class="copy-btn" id="fc">Copy</button></div><div class="result-lg tabular-nums" id="fr">&mdash;</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="fdec"></div></div>' +
    '</div>';
}

function gpaW() {
  return '<div class="tool-card-ui">' +
    '<div id="grows"><div class="row3 gpa-row" style="margin-bottom:10px;align-items:end"><div class="field"><label>Course</label><input type="text" value="Math 101" placeholder="Course name" style="height:44px"></div><div class="field"><label>Grade</label><select style="height:44px"><option>A+</option><option>A</option><option>A-</option><option selected>B+</option><option>B</option><option>B-</option><option>C+</option><option>C</option><option>C-</option><option>D+</option><option>D</option><option>F</option></select></div><div class="field"><label>Credits</label><input type="number" value="3" inputmode="numeric" min="1" style="height:44px" class="num-input"></div></div></div>' +
    '<div class="chips" style="margin-bottom:20px"><button class="chip" id="gadd">+ Add Course</button><button class="chip" id="gclear" style="color:var(--muted)">Clear All</button></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Weighted GPA (4.0 Scale)</span><button class="copy-btn" id="gpc">Copy</button></div><div class="result-lg tabular-nums" id="gpr">&mdash;</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="gpinfo"></div></div>' +
    '</div>';
}

function sourdoughW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Flour Weight (g)</label><input type="number" id="sd-flour" value="500" inputmode="decimal" class="num-input"></div><div class="field"><label>Water Weight (g)</label><input type="number" id="sd-water" value="375" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Dough Hydration</span><button class="copy-btn" id="sdc">Copy</button></div><div class="result-lg tabular-nums" id="sdr">75.0%</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="sdcat">Standard Open-Crumb Sourdough</div></div>' +
    '</div>';
}

function bakersPctW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Target Total Dough Weight (g)</label><input type="number" id="bp-target" value="800" inputmode="decimal" class="num-input"></div><div class="field"><label>Water Hydration (%)</label><input type="number" id="bp-water" value="75" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Salt (%)</label><input type="number" id="bp-salt" value="2" inputmode="decimal" class="num-input"></div><div class="field"><label>Starter / Levain (%)</label><input type="number" id="bp-starter" value="20" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Flour Weight</span><button class="copy-btn" id="bpc">Copy</button></div><div class="result-lg tabular-nums" id="bpr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Flour (100%)</div><div class="v tabular-nums" id="bp-f1">&mdash;</div></div><div class="subresult"><div class="k">Water</div><div class="v tabular-nums" id="bp-f2">&mdash;</div></div><div class="subresult"><div class="k">Salt</div><div class="v tabular-nums" id="bp-f3">&mdash;</div></div><div class="subresult"><div class="k">Starter / Levain</div><div class="v tabular-nums" id="bp-f4">&mdash;</div></div></div>' +
    '</div>';
}

function coldBrewW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Coffee Grounds (g)</label><input type="number" id="cb-grounds" value="100" inputmode="decimal" class="num-input"></div><div class="field"><label>Brew Strength Ratio</label><select id="cb-ratio"><option value="4">1:4 (Cold Brew Concentrate)</option><option value="8" selected>1:8 (Standard Cold Brew)</option><option value="12">1:12 (Light Cold Brew)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Water Volume</span><button class="copy-btn" id="cbc">Copy</button></div><div class="result-lg tabular-nums" id="cbr">&mdash;</div></div>' +
    '</div>';
}

function espressoRatioW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Coffee Dose (g)</label><input type="number" id="ep-dose" value="18" inputmode="decimal" class="num-input"></div><div class="field"><label>Espresso Liquid Yield (g)</label><input type="number" id="ep-yield" value="36" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Espresso Brew Ratio</span><button class="copy-btn" id="epc">Copy</button></div><div class="result-lg tabular-nums" id="epr">1 : 2.0</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="epcat">Normale (Standard Espresso)</div></div>' +
    '</div>';
}

function yeastConvW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Yeast Amount (g)</label><input type="number" id="yc-val" value="21" inputmode="decimal" class="num-input"></div><div class="field"><label>From Yeast Type</label><select id="yc-type"><option value="fresh" selected>Fresh Cake Yeast</option><option value="active">Active Dry Yeast</option><option value="instant">Instant Dry Yeast</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Equivalent Conversion</span><button class="copy-btn" id="ycc">Copy</button></div><div class="result-lg tabular-nums" id="ycr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Fresh Cake Yeast</div><div class="v tabular-nums" id="yc1">&mdash;</div></div><div class="subresult"><div class="k">Active Dry Yeast</div><div class="v tabular-nums" id="yc2">&mdash;</div></div><div class="subresult"><div class="k">Instant Dry Yeast</div><div class="v tabular-nums" id="yc3">&mdash;</div></div></div>' +
    '</div>';
}

function gelatinW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Quantity</label><input type="number" id="gl-qty" value="4" inputmode="decimal" class="num-input"></div><div class="field"><label>Gelatin Type</label><select id="gl-type"><option value="silver" selected>Silver Sheet (~2.5g)</option><option value="bronze">Bronze Sheet (~1.8g)</option><option value="gold">Gold Sheet (~2.0g)</option><option value="platinum">Platinum Sheet (~1.7g)</option><option value="powder">Powdered Gelatin (g)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Powder Equivalent (g)</span><button class="copy-btn" id="glc">Copy</button></div><div class="result-lg tabular-nums" id="glr">&mdash;</div></div>' +
    '</div>';
}

function honeySubW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Sugar Amount in Recipe</label><input type="number" id="hs-val" value="200" inputmode="decimal" class="num-input"></div><div class="field"><label>Unit</label><select id="hs-unit"><option value="grams" selected>Grams (g)</option><option value="cups">US Cups</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Honey Amount Needed</span><button class="copy-btn" id="hsc">Copy</button></div><div class="result-lg tabular-nums" id="hsr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Honey Weight/Volume</div><div class="v tabular-nums" id="hs1">&mdash;</div></div><div class="subresult"><div class="k">Reduce Liquid By</div><div class="v tabular-nums" id="hs2">&mdash;</div></div><div class="subresult"><div class="k">Add Baking Soda</div><div class="v tabular-nums" id="hs3">&mdash;</div></div><div class="subresult"><div class="k">Oven Temp Adjustment</div><div class="v tabular-nums" id="hs4">&minus;25&deg;F (&minus;15&deg;C)</div></div></div>' +
    '</div>';
}

function canningAltW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Your Elevation Altitude (ft)</label><input type="number" id="ca-alt" value="2500" inputmode="decimal" class="num-input"></div><div class="field"><label>Pressure Canner Gauge Type</label><select id="ca-gauge"><option value="weighted" selected>Weighted Gauge</option><option value="dial">Dial Gauge</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Canning Pressure (PSI)</span><button class="copy-btn" id="cac">Copy</button></div><div class="result-lg tabular-nums" id="car">&mdash;</div></div>' +
    '</div>';
}

function cocoaSubW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Unsweetened Chocolate Amount</label><input type="number" id="cc-val" value="2" inputmode="decimal" class="num-input"></div><div class="field"><label>Unit</label><select id="cc-unit"><option value="oz" selected>Ounces (oz)</option><option value="g">Grams (g)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Substitution Combination</span><button class="copy-btn" id="ccc">Copy</button></div><div class="result-lg tabular-nums" id="ccr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Cocoa Powder</div><div class="v tabular-nums" id="cc1">&mdash;</div></div><div class="subresult"><div class="k">Unsalted Butter / Oil</div><div class="v tabular-nums" id="cc2">&mdash;</div></div></div>' +
    '</div>';
}

function brineW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Water Volume</label><input type="number" id="br-vol" value="1" inputmode="decimal" class="num-input"></div><div class="field"><label>Volume Unit</label><select id="br-unit"><option value="liters" selected>Liters (L)</option><option value="cups">US Cups</option><option value="gallons">Gallons</option></select></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Brine Strength %</label><select id="br-type"><option value="1.5">1.5% (Equilibrium Brine - Light)</option><option value="2.0">2.0% (Equilibrium Brine - Standard)</option><option value="5.0" selected>5.0% (Standard Wet Brine)</option><option value="8.0">8.0% (Quick Wet Brine - Poultry)</option><option value="10.0">10.0% (Heavy Pickling Brine)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Salt Weight (g)</span><button class="copy-btn" id="brc">Copy</button></div><div class="result-lg tabular-nums" id="brr">&mdash;</div></div>' +
    '</div>';
}

function tdeeW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Gender</label><select id="td-gender"><option value="m" selected>Male</option><option value="f">Female</option></select></div><div class="field"><label>Age (years)</label><input type="number" id="td-age" value="30" inputmode="numeric" class="num-input"></div><div class="field"><label>Height (cm)</label><input type="number" id="td-h" value="175" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Weight (kg)</label><input type="number" id="td-w" value="75" inputmode="decimal" class="num-input"></div><div class="field"><label>Activity Level</label><select id="td-act"><option value="1.2">Sedentary (office job)</option><option value="1.375">Lightly Active (1-3 days/wk)</option><option value="1.55" selected>Moderately Active (3-5 days/wk)</option><option value="1.725">Very Active (6-7 days/wk)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>TDEE Maintenance Calories</span><button class="copy-btn" id="tdc">Copy</button></div><div class="result-lg tabular-nums" id="tdr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Cutting (-500 kcal)</div><div class="v tabular-nums" id="td-cut">&mdash;</div></div><div class="subresult"><div class="k">Bulking (+300 kcal)</div><div class="v tabular-nums" id="td-bulk">&mdash;</div></div><div class="subresult"><div class="k">BMR (Basal Rate)</div><div class="v tabular-nums" id="td-bmr">&mdash;</div></div></div>' +
    '</div>';
}

function macrosW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Daily Target Calories (kcal)</label><input type="number" id="mc-cal" value="2000" inputmode="numeric" class="num-input"></div><div class="field"><label>Dietary Goal Split</label><select id="mc-split"><option value="bal" selected>Balanced (30% P / 40% C / 30% F)</option><option value="lowcarb">Low Carb / Cutting (40% P / 30% C / 30% F)</option><option value="keto">Keto (25% P / 5% C / 70% F)</option><option value="highcarb">High Carb / Athlete (25% P / 55% C / 20% F)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Macro Breakdown</span><button class="copy-btn" id="mcc">Copy</button></div><div class="result-lg tabular-nums" id="mcr">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">Protein (4 kcal/g)</div><div class="v tabular-nums" id="mc-p">&mdash;</div></div><div class="subresult"><div class="k">Carbohydrates (4 kcal/g)</div><div class="v tabular-nums" id="mc-c">&mdash;</div></div><div class="subresult"><div class="k">Fats (9 kcal/g)</div><div class="v tabular-nums" id="mc-f">&mdash;</div></div></div>' +
    '</div>';
}

function waterIntakeW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Body Weight (kg)</label><input type="number" id="wi-w" value="70" inputmode="decimal" class="num-input"></div><div class="field"><label>Daily Workout (minutes)</label><input type="number" id="wi-ex" value="45" inputmode="numeric" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Daily Water Hydration Goal</span><button class="copy-btn" id="wic">Copy</button></div><div class="result-lg tabular-nums" id="wir">&mdash;</div></div>' +
    '</div>';
}

function paintW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Room Length (ft)</label><input type="number" id="pt-l" value="15" inputmode="decimal" class="num-input"></div><div class="field"><label>Room Width (ft)</label><input type="number" id="pt-w" value="12" inputmode="decimal" class="num-input"></div><div class="field"><label>Wall Height (ft)</label><input type="number" id="pt-h" value="8" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Number of Coats</label><input type="number" id="pt-coats" value="2" inputmode="numeric" min="1" class="num-input"></div><div class="field"><label>Doors / Windows (Count)</label><input type="number" id="pt-open" value="2" inputmode="numeric" min="0" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Paint Required</span><button class="copy-btn" id="ptc">Copy</button></div><div class="result-lg tabular-nums" id="ptr">&mdash;</div></div>' +
    '</div>';
}

function tileW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Room Length (ft)</label><input type="number" id="tl-rl" value="10" inputmode="decimal" class="num-input"></div><div class="field"><label>Room Width (ft)</label><input type="number" id="tl-rw" value="10" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Tile Width (inches)</label><input type="number" id="tl-tw" value="12" inputmode="decimal" class="num-input"></div><div class="field"><label>Tile Height (inches)</label><input type="number" id="tl-th" value="12" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Tiles Needed (Incl. 10% Waste)</span><button class="copy-btn" id="tlc">Copy</button></div><div class="result-lg tabular-nums" id="tlr">&mdash;</div></div>' +
    '</div>';
}

function concreteW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Slab Length (ft)</label><input type="number" id="cc-l" value="10" inputmode="decimal" class="num-input"></div><div class="field"><label>Slab Width (ft)</label><input type="number" id="cc-w" value="10" inputmode="decimal" class="num-input"></div><div class="field"><label>Thickness (inches)</label><input type="number" id="cc-t" value="4" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Volume in Cubic Yards</span><button class="copy-btn" id="ccc2">Copy</button></div><div class="result-lg tabular-nums" id="ccr2">&mdash;</div></div>' +
    '<div class="subresults"><div class="subresult"><div class="k">80lb Premix Bags</div><div class="v tabular-nums" id="cc-b80">&mdash;</div></div><div class="subresult"><div class="k">60lb Premix Bags</div><div class="v tabular-nums" id="cc-b60">&mdash;</div></div><div class="subresult"><div class="k">Cubic Feet</div><div class="v tabular-nums" id="cc-cf">&mdash;</div></div></div>' +
    '</div>';
}

function ovenTempW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Celsius (&deg;C standard)</label><input type="number" id="ot-c" value="180" inputmode="decimal" class="num-input"></div><div class="field"><label>Fahrenheit (&deg;F)</label><input type="number" id="ot-f" value="350" inputmode="decimal" class="num-input"></div><div class="field"><label>Gas Mark</label><input type="number" id="ot-gm" value="4" inputmode="decimal" step="0.5" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Fan-Forced (Convection) Temp</span><button class="copy-btn" id="otc">Copy</button></div><div class="result-lg tabular-nums" id="otr">160&deg;C (325&deg;F)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="otcat">Moderate Baking Temperature</div></div>' +
    '</div>';
}

function densityConverterW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>High-Density Ingredient</label><select id="dc-ing"><option value="1.42">Honey (1.42 g/ml)</option><option value="0.91" selected>Olive Oil / Veg Oil (0.91 g/ml)</option><option value="0.90">Ghee / Clarified Butter (0.90 g/ml)</option><option value="1.40">Molasses (1.40 g/ml)</option><option value="1.37">Maple Syrup (1.37 g/ml)</option><option value="1.15">Peanut Butter (1.15 g/ml)</option><option value="1.03">Whole Milk (1.03 g/ml)</option></select></div><div class="field"><label>Volume Amount</label><input type="number" id="dc-vol" value="1" inputmode="decimal" step="any" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Volume Unit</label><select id="dc-unit"><option value="cups" selected>US Cups</option><option value="tbsp">Tablespoons (tbsp)</option><option value="tsp">Teaspoons (tsp)</option><option value="ml">Milliliters (ml)</option><option value="floz">Fluid Ounces (fl oz)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Exact Calculated Weight</span><button class="copy-btn" id="dcc">Copy</button></div><div class="result-lg tabular-nums" id="dcr">218.4 g</div></div>' +
    '</div>';
}

function yarnGaugeW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Yarn Weight Standard Category</label><select id="yg-cat"><option value="0">0 Lace / Thread</option><option value="1">1 Super Fine / Fingering</option><option value="2">2 Fine / Sport</option><option value="3">3 Light / DK</option><option value="4" selected>4 Medium / Worsted</option><option value="5">5 Bulky / Chunky</option><option value="6">6 Super Bulky</option><option value="7">7 Jumbo</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Standard Gauge &amp; Needle Guide</span><button class="copy-btn" id="ygc">Copy</button></div><div class="result-lg tabular-nums" id="ygr">16–20 sts / 4" (10cm)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="yginfo">Needle: 4.5–5.5 mm (US 7–9) | Hook: 5.5–6.5 mm (US I-9 to K-10.5)</div></div>' +
    '</div>';
}

function fabricYardageW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Fabric Yards</label><input type="number" id="fy-yd" value="2.5" inputmode="decimal" step="any" class="num-input"></div><div class="field"><label>Fabric Bolt Width</label><select id="fy-width"><option value="44" selected>44" / 45" Standard Cotton</option><option value="60">60" Wide Apparel / Knit</option><option value="54">54" Home Decor</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Metric Meters &amp; Total Area</span><button class="copy-btn" id="fyc">Copy</button></div><div class="result-lg tabular-nums" id="fyr">2.29 Meters</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="fyinfo">Total Fabric Surface: ~2.55 sq meters (27.5 sq ft)</div></div>' +
    '</div>';
}

function paperDpiW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Standard Paper Preset</label><select id="pd-preset"><option value="a4" selected>A4 (210 &times; 297 mm)</option><option value="a3">A3 (297 &times; 420 mm)</option><option value="a5">A5 (148 &times; 210 mm)</option><option value="letter">US Letter (8.5 &times; 11 in)</option><option value="legal">US Legal (8.5 &times; 14 in)</option><option value="tabloid">US Tabloid (11 &times; 17 in)</option></select></div><div class="field"><label>Target Resolution (DPI / PPI)</label><select id="pd-dpi"><option value="72">72 DPI (Web Screen)</option><option value="150">150 DPI (Draft / Medium Print)</option><option value="300" selected>300 DPI (High-Quality Print Standard)</option><option value="600">600 DPI (Ultra Fine Art)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Canvas Pixel Dimensions</span><button class="copy-btn" id="pdc">Copy</button></div><div class="result-lg tabular-nums" id="pdr">2480 &times; 3508 px</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="pdinfo">Total Uncompressed Image: 8.7 Megapixels</div></div>' +
    '</div>';
}

function screenPpiW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Horizontal Pixels</label><input type="number" id="sp-w" value="3840" inputmode="numeric" class="num-input"></div><div class="field"><label>Vertical Pixels</label><input type="number" id="sp-h" value="2160" inputmode="numeric" class="num-input"></div><div class="field"><label>Diagonal Size (inches)</label><input type="number" id="sp-d" value="27" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Screen Pixel Density</span><button class="copy-btn" id="spc">Copy</button></div><div class="result-lg tabular-nums" id="spr">163.18 PPI</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="spinfo">Physical Display: 23.5" &times; 13.2" (Dot Pitch: 0.155 mm)</div></div>' +
    '</div>';
}

function awgConverterW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>AWG Wire Gauge</label><input type="number" id="aw-gauge" value="12" inputmode="numeric" min="0" max="40" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Cross-Sectional Area (mm&sup2;)</span><button class="copy-btn" id="awc">Copy</button></div><div class="result-lg tabular-nums" id="awr">3.31 mm&sup2;</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="awinfo">Diameter: 2.05 mm (0.0808 inches) | Max Ampacity: ~20 Amps</div></div>' +
    '</div>';
}

function exposureTriangleW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Shutter Speed (sec)</label><select id="et-shutter"><option value="0.00025">1/4000s</option><option value="0.0005">1/2000s</option><option value="0.001">1/1000s</option><option value="0.002">1/500s</option><option value="0.004">1/250s</option><option value="0.008" selected>1/125s</option><option value="0.0166">1/60s</option><option value="0.0333">1/30s</option><option value="0.0666">1/15s</option></select></div><div class="field"><label>Aperture (f-stop)</label><select id="et-aperture"><option value="1.4">f/1.4</option><option value="2.0">f/2.0</option><option value="2.8">f/2.8</option><option value="4.0">f/4.0</option><option value="5.6">f/5.6</option><option value="8.0" selected>f/8.0</option><option value="11.0">f/11</option><option value="16.0">f/16</option></select></div><div class="field"><label>ISO Speed</label><select id="et-iso"><option value="100" selected>ISO 100</option><option value="200">ISO 200</option><option value="400">ISO 400</option><option value="800">ISO 800</option><option value="1600">ISO 1600</option><option value="3200">ISO 3200</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Exposure Value (EV @ ISO 100)</span><button class="copy-btn" id="etc">Copy</button></div><div class="result-lg tabular-nums" id="etr">EV 13.0</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="etinfo">Equivalent: 1/250s @ f/5.6 ISO 100</div></div>' +
    '</div>';
}

function panSubstitutionW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Original Recipe Pan</label><select id="ps-orig"><option value="9_round" selected>9" Round Cake Pan (63.6 sq in)</option><option value="8_round">8" Round Cake Pan (50.3 sq in)</option><option value="8_square">8" Square Pan (64.0 sq in)</option><option value="9_square">9" Square Pan (81.0 sq in)</option><option value="9x13">9" &times; 13" Rectangular Pan (117 sq in)</option></select></div><div class="field"><label>New Replacement Pan</label><select id="ps-new"><option value="8_square">8" Square Pan (64.0 sq in)</option><option value="8_round" selected>8" Round Cake Pan (50.3 sq in)</option><option value="9_round">9" Round Cake Pan (63.6 sq in)</option><option value="9_square">9" Square Pan (81.0 sq in)</option><option value="9x13">9" &times; 13" Rectangular Pan (117 sq in)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Pan Area &amp; Bake Time Adjustment</span><button class="copy-btn" id="psc">Copy</button></div><div class="result-lg tabular-nums" id="psr">0.79x Area</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="psinfo">Batter will be thicker: Lower oven temp by 25&deg;F (15&deg;C) &amp; add +10-15 mins bake time.</div></div>' +
    '</div>';
}

function firewoodCordW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Stack Length (ft)</label><input type="number" id="fc-l" value="8" inputmode="decimal" class="num-input"></div><div class="field"><label>Stack Height (ft)</label><input type="number" id="fc-h" value="4" inputmode="decimal" class="num-input"></div><div class="field"><label>Log Length (inches)</label><input type="number" id="fc-log" value="16" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Firewood Volume</span><button class="copy-btn" id="fcc">Copy</button></div><div class="result-lg tabular-nums" id="fcr">0.33 Full Cords (1.0 Face Cord)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="fcinfo">Volume: 42.7 cu ft (~1,200 kg seasoned oak weight)</div></div>' +
    '</div>';
}

function aquariumStockingW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Tank Length (in)</label><input type="number" id="aq-l" value="30" inputmode="decimal" class="num-input"></div><div class="field"><label>Tank Width (in)</label><input type="number" id="aq-w" value="12" inputmode="decimal" class="num-input"></div><div class="field"><label>Tank Height (in)</label><input type="number" id="aq-h" value="12" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Tank Water Capacity</span><button class="copy-btn" id="aqc">Copy</button></div><div class="result-lg tabular-nums" id="aqr">18.7 US Gallons (70.8 L)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="aqinfo">Stocking Capacity: ~18-19 inches total adult small fish</div></div>' +
    '</div>';
}

function soilMulchW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Bed Length (ft)</label><input type="number" id="sm-l" value="10" inputmode="decimal" class="num-input"></div><div class="field"><label>Bed Width (ft)</label><input type="number" id="sm-w" value="10" inputmode="decimal" class="num-input"></div><div class="field"><label>Depth (inches)</label><input type="number" id="sm-d" value="3" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Soil / Mulch Volume</span><button class="copy-btn" id="smc">Copy</button></div><div class="result-lg tabular-nums" id="smr">0.93 Cubic Yards</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="sminfo">25.0 Cubic Feet = 13.5 bags (2 cu ft bags)</div></div>' +
    '</div>';
}

function paintCoverageW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Total Wall Area (sq ft)</label><input type="number" id="pc-area" value="500" inputmode="decimal" class="num-input"></div><div class="field"><label>Wall Surface Texture</label><select id="pc-tex"><option value="350" selected>Smooth Drywall (350 sq ft/gal)</option><option value="300">Textured Drywall / Stucco (300 sq ft/gal)</option><option value="250">Rough Masonry / Brick (250 sq ft/gal)</option></select></div><div class="field"><label>Coats</label><input type="number" id="pc-coats" value="2" inputmode="numeric" min="1" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Paint Quantity</span><button class="copy-btn" id="pcc">Copy</button></div><div class="result-lg tabular-nums" id="pcr">2.86 Gallons (10.8 L)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="pcinfo">Buy 3 &times; 1-Gallon Cans</div></div>' +
    '</div>';
}

function stepUpInterestW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Initial Deposit ($)</label><input type="number" id="su-init" value="5000" inputmode="decimal" class="num-input"></div><div class="field"><label>Monthly Starting Contribution ($)</label><input type="number" id="su-mo" value="500" inputmode="decimal" class="num-input"></div><div class="field"><label>Annual Step-Up Increase (%)</label><input type="number" id="su-step" value="5" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Annual Interest Rate (%)</label><input type="number" id="su-rate" value="7" inputmode="decimal" class="num-input"></div><div class="field"><label>Investment Horizon (years)</label><input type="number" id="su-years" value="10" inputmode="numeric" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Projected Future Portfolio Value</span><button class="copy-btn" id="suc">Copy</button></div><div class="result-lg tabular-nums" id="sur">$121,480</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="suinfo">Total Principal Invested: $80,488 | Total Interest Earned: $40,992</div></div>' +
    '</div>';
}

function panEquivalenceW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Baking Pan Type &amp; Dimensions</label><select id="pe-pan"><option value="9_round" selected>9" &times; 2" Round Cake Pan (6.0 Cups)</option><option value="8_round">8" &times; 2" Round Cake Pan (4.5 Cups)</option><option value="8_square">8" &times; 8" &times; 2" Square Pan (5.6 Cups)</option><option value="9_square">9" &times; 9" &times; 2" Square Pan (7.2 Cups)</option><option value="9x13">9" &times; 13" &times; 2" Rectangular Pan (13.0 Cups)</option><option value="bundt10">10" 12-Cup Fluted Bundt Pan (12.0 Cups)</option><option value="spring9">9" Springform Cheesecake Pan (10.0 Cups)</option><option value="pie9">9" Standard Pie Dish (4.0 Cups)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Liquid Cup Capacity &amp; Equivalents</span><button class="copy-btn" id="pec">Copy</button></div><div class="result-lg tabular-nums" id="per">6.0 US Cups Capacity</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="peinfo">Equivalent to: 8" Square Pan or 1.3x 8" Round Pan</div></div>' +
    '</div>';
}

function humidityHydrationW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Flour Weight (g)</label><input type="number" id="hh-flour" value="500" inputmode="decimal" class="num-input"></div><div class="field"><label>Target Recipe Hydration (%)</label><input type="number" id="hh-hyd" value="75" inputmode="decimal" class="num-input"></div><div class="field"><label>Ambient Room Humidity (%)</label><input type="number" id="hh-hum" value="75" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Adjusted Water Weight</span><button class="copy-btn" id="hhc">Copy</button></div><div class="result-lg tabular-nums" id="hhr">365 g Water (73.0% Net)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="hhinfo">High humidity: Reduced water by &minus;10g because flour absorbed ambient moisture.</div></div>' +
    '</div>';
}

function sewingAllowanceW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Finished Measurement (inches)</label><input type="number" id="sa-val" value="34" inputmode="decimal" class="num-input"></div><div class="field"><label>Seam Allowance Per Edge</label><select id="sa-allow"><option value="0.625" selected>5/8" (1.5 cm Standard)</option><option value="0.5">1/2" (1.3 cm)</option><option value="0.375">3/8" (1.0 cm)</option><option value="0.25">1/4" (0.6 cm Quilting)</option><option value="0.75">3/4" (2.0 cm Heavy)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Pattern Cut Measurement</span><button class="copy-btn" id="sac">Copy</button></div><div class="result-lg tabular-nums" id="sar">35.25 inches</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="sainfo">Total Seam Allowance Added: +1.25 inches (+3.18 cm)</div></div>' +
    '</div>';
}

function filamentCalcW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Filament Weight (g)</label><input type="number" id="fl-wt" value="1000" inputmode="decimal" class="num-input"></div><div class="field"><label>Material Type</label><select id="fl-mat"><option value="1.24" selected>PLA (1.24 g/cm&sup3;)</option><option value="1.04">ABS (1.04 g/cm&sup3;)</option><option value="1.27">PETG (1.27 g/cm&sup3;)</option><option value="1.21">TPU / Flexible (1.21 g/cm&sup3;)</option><option value="1.14">Nylon (1.14 g/cm&sup3;)</option></select></div><div class="field"><label>Filament Diameter</label><select id="fl-dia"><option value="1.75" selected>1.75 mm</option><option value="2.85">2.85 mm / 3.0mm</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Calculated Filament Length</span><button class="copy-btn" id="flc">Copy</button></div><div class="result-lg tabular-nums" id="flr">335.2 Meters</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="flinfo">Volume: 806.5 cm&sup3; (1,099.7 ft of filament)</div></div>' +
    '</div>';
}

function brewAbvW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Original Gravity (OG)</label><input type="number" id="ba-og" value="1.050" inputmode="decimal" step="0.001" class="num-input"></div><div class="field"><label>Final Gravity (FG)</label><input type="number" id="ba-fg" value="1.010" inputmode="decimal" step="0.001" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Alcohol By Volume (ABV %)</span><button class="copy-btn" id="bac">Copy</button></div><div class="result-lg tabular-nums" id="bar">5.25% ABV</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="bainfo">Apparent Attenuation: 79.2% | Calories: ~165 kcal / 12oz</div></div>' +
    '</div>';
}

function cropFactorW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Actual Lens Focal Length (mm)</label><input type="number" id="cf-fl" value="50" inputmode="decimal" class="num-input"></div><div class="field"><label>Lens Aperture (f-stop)</label><input type="number" id="cf-fstop" value="1.8" inputmode="decimal" step="0.1" class="num-input"></div><div class="field"><label>Camera Sensor Format</label><select id="cf-sensor"><option value="1.5" selected>APS-C (Sony / Nikon / Fuji 1.5x)</option><option value="1.6">APS-C (Canon 1.6x)</option><option value="2.0">Micro Four Thirds (2.0x)</option><option value="2.7">1" Type Sensor (2.7x)</option><option value="0.79">Medium Format 44x33 (0.79x)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>35mm Full-Frame Equivalent</span><button class="copy-btn" id="cfc">Copy</button></div><div class="result-lg tabular-nums" id="cfr">75mm f/2.7 Eq.</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="cfinfo">Field of view matches a 75mm lens on a full-frame sensor.</div></div>' +
    '</div>';
}

function runningPaceW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Race / Target Distance</label><select id="rp-dist"><option value="5">5K (5.0 km)</option><option value="10">10K (10.0 km)</option><option value="21.0975" selected>Half Marathon (21.1 km)</option><option value="42.195">Full Marathon (42.2 km)</option></select></div><div class="field"><label>Target Finish Time (Hours)</label><input type="number" id="rp-h" value="1" inputmode="numeric" min="0" class="num-input"></div><div class="field"><label>Minutes</label><input type="number" id="rp-m" value="45" inputmode="numeric" min="0" max="59" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Required Running Pace</span><button class="copy-btn" id="rpc">Copy</button></div><div class="result-lg tabular-nums" id="rpr">4:58 min/km</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="rpinfo">Equivalent Pace: 8:00 min/mile | Speed: 12.1 km/h (7.5 mph)</div></div>' +
    '</div>';
}

function cyclingGearW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Chainring Teeth (Front)</label><input type="number" id="cg-front" value="50" inputmode="numeric" class="num-input"></div><div class="field"><label>Cog Teeth (Rear)</label><input type="number" id="cg-rear" value="11" inputmode="numeric" class="num-input"></div><div class="field"><label>Pedal Cadence (RPM)</label><input type="number" id="cg-cad" value="90" inputmode="numeric" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Road Speed &amp; Gear Inches</span><button class="copy-btn" id="cgc2">Copy</button></div><div class="result-lg tabular-nums" id="cgr2">45.4 km/h (28.2 mph)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="cginfo">Gear Ratio: 4.55 : 1 | Gear Inches: 122.8" | Development: 9.80 meters/turn</div></div>' +
    '</div>';
}

function firewoodBtuW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Firewood Wood Species</label><select id="fb-wood"><option value="25.7" selected>White Oak (25.7 Million BTU/cord)</option><option value="27.7">Hickory (27.7 Million BTU/cord)</option><option value="24.0">Sugar Maple (24.0 Million BTU/cord)</option><option value="23.6">White Ash (23.6 Million BTU/cord)</option><option value="20.3">Paper Birch (20.3 Million BTU/cord)</option><option value="15.9">White Pine (15.9 Million BTU/cord)</option></select></div><div class="field"><label>Quantity of Wood (Cords)</label><input type="number" id="fb-cords" value="1" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Thermal Energy Output</span><button class="copy-btn" id="fbc">Copy</button></div><div class="result-lg tabular-nums" id="fbr">25.7 Million BTU</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="fbinfo">Equivalent Heat: ~184 Gallons of Heating Oil or 7,530 kWh Electricity</div></div>' +
    '</div>';
}

function solarCalcW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Monthly Electricity Bill (&sbquo;)</label><input type="number" id="sl-bill" value="3000" inputmode="numeric" class="num-input"></div><div class="field"><label>Average Tariff Rate (&sbquo;/unit kWh)</label><input type="number" id="sl-rate" value="8.5" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Recommended Solar System Capacity</span><button class="copy-btn" id="slc">Copy</button></div><div class="result-lg tabular-nums" id="slr">3.0 kW Plant</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="slinfo">Generates ~360 units/month | Annual Savings: ~&sbquo;36,720 | Rooftop Area: ~270 sq ft</div></div>' +
    '</div>';
}

function waterTankW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Water Tank Capacity (Liters)</label><input type="number" id="wt-vol" value="1000" inputmode="numeric" class="num-input"></div><div class="field"><label>Pump Flow Rate (LPM - Liters/min)</label><input type="number" id="wt-flow" value="25" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Refill Time</span><button class="copy-btn" id="wtc">Copy</button></div><div class="result-lg tabular-nums" id="wtr">40 Minutes</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="wtinfo">Flow Rate: 0.42 Liters/sec (6.6 GPM US)</div></div>' +
    '</div>';
}

function evCalcW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>EV Vehicle / Battery Preset</label><select id="ev-preset"><option value="40.5_325" selected>Tata Nexon EV Long Range (40.5 kWh / 325 km)</option><option value="50.3_400">MG ZS EV (50.3 kWh / 400 km)</option><option value="4.0_170">Ola S1 Pro Scooter (4.0 kWh / 170 km)</option><option value="60.0_450">BYD Atto 3 (60.0 kWh / 450 km)</option></select></div><div class="field"><label>State Electricity Tariff (&sbquo;/kWh)</label><input type="number" id="ev-rate" value="8" inputmode="decimal" class="num-input"></div><div class="field"><label>Charger Type</label><select id="ev-type"><option value="3.3">3.3 kW Home Socket AC</option><option value="7.2" selected>7.2 kW AC Wallbox</option><option value="50.0">50 kW DC Fast Charger</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Full Charge Cost &amp; Running Cost</span><button class="copy-btn" id="evc">Copy</button></div><div class="result-lg tabular-nums" id="evr">&sbquo;324 Full Charge (&sbquo;1.00/km)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="evinfo">Full Charge Time: ~5.6 Hours on 7.2 kW AC Wallbox</div></div>' +
    '</div>';
}

function guitarTensionW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Guitar Type &amp; Set</label><select id="gt-set"><option value="10-46" selected>Electric Light (10-46)</option><option value="9-42">Electric Extra Light (9-42)</option><option value="11-52">Electric Medium (11-52)</option><option value="12-53">Acoustic Light (12-53)</option><option value="45-105">4-String Bass Medium (45-105)</option></select></div><div class="field"><label>Scale Length (inches)</label><input type="number" id="gt-scale" value="25.5" inputmode="decimal" class="num-input"></div><div class="field"><label>Tuning</label><select id="gt-tune"><option value="std" selected>E Standard (E A D G B E)</option><option value="drop_d">Drop D (D A D G B E)</option><option value="d_std">D Standard (D G C F A D)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total String Tension Load</span><button class="copy-btn" id="gtc">Copy</button></div><div class="result-lg tabular-nums" id="gtr">108.4 lbs (49.2 kg)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="gtinfo">Average Per String: 18.1 lbs | Neck Load: Safe Standard</div></div>' +
    '</div>';
}

function aquariumCo2W() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Aquarium Water pH</label><input type="number" id="ac-ph" value="6.8" inputmode="decimal" step="0.1" class="num-input"></div><div class="field"><label>Carbonate Hardness (dKH)</label><input type="number" id="ac-kh" value="4.0" inputmode="decimal" step="0.5" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Dissolved CO2 Concentration</span><button class="copy-btn" id="acc">Copy</button></div><div class="result-lg tabular-nums" id="acr">19.0 ppm CO2</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="acinfo">Status: Optimal CO2 Zone (Good plant growth, safe for fish)</div></div>' +
    '</div>';
}

function cryptoConverterW() {
  return '<div class="tool-card-ui">' +
    '<div class="field" style="margin-bottom:14px"><label>Amount</label><input type="number" id="cc-amount" value="1" inputmode="decimal" step="any" class="num-input" style="font-size:20px;font-weight:600"></div>' +
    '<div class="row3" style="align-items:center;gap:10px">' +
    '<div class="field" style="flex:1;margin-bottom:0"><label>From Crypto</label><select id="cc-from"><option value="BTC" selected>Bitcoin (BTC)</option><option value="ETH">Ethereum (ETH)</option><option value="SOL">Solana (SOL)</option><option value="USDT">Tether (USDT)</option><option value="XRP">XRP (XRP)</option><option value="BNB">BNB (BNB)</option><option value="DOGE">Dogecoin (DOGE)</option><option value="ADA">Cardano (ADA)</option></select></div>' +
    '<button class="swap-btn" id="cc-swap" title="Swap currencies" style="height:48px;width:48px;margin-top:20px;flex-shrink:0">&#8693;</button>' +
    '<div class="field" style="flex:1;margin-bottom:0"><label>To Currency</label><select id="cc-to"><option value="USD" selected>United States Dollar "$" (USD)</option><option value="INR">Indian Rupee "&#8377;" (INR)</option><option value="EUR">Euro "&euro;" (EUR)</option><option value="GBP">British Pound "&pound;" (GBP)</option><option value="PHP">Philippine Peso "&#8369;" (PHP)</option><option value="IDR">Indonesian Rupiah "Rp" (IDR)</option><option value="CAD">Canadian Dollar "$" (CAD)</option><option value="AUD">Australian Dollar "$" (AUD)</option></select></div>' +
    '</div>' +
    '<div class="result-box dark-surface" style="margin-top:20px;text-align:center">' +
    '<div class="rlabel" style="justify-content:center"><span>Conversion Rate</span><button class="copy-btn" id="ccc3" style="margin-left:12px">Copy</button></div>' +
    '<div class="result-lg tabular-nums" id="cc-res" style="font-size:26px;margin:8px 0">1 Bitcoin (BTC) = 77,737.21 USD</div>' +
    '<div class="chips" style="justify-content:center;margin-top:10px"><button class="chip" id="cc-refresh" style="background:var(--surface-strong);color:var(--ink)">↻ Recalculate</button></div><div class="caption" style="margin-top:10px;text-align:center;color:var(--muted)">Reference rates — static illustrative snapshot, not live market data. Cryptocurrencies are highly volatile; verify on an exchange before acting.</div>' +
    '</div>' +
    '<div style="margin-top:36px;border-top:1px solid var(--hairline);padding-top:24px">' +
    '<h3 class="title-md" style="margin-bottom:16px;text-align:center">Popular Cryptocurrency Conversions</h3>' +
    '<div id="crypto-pills" class="pills" style="justify-content:center;gap:8px"></div>' +
    '</div>' +
    '</div>';
}

function wpiYarnW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Wraps Per Inch (WPI)</label><input type="number" id="wp-val" value="12" inputmode="numeric" min="1" max="40" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Yarn Category &amp; Weight</span><button class="copy-btn" id="wpc">Copy</button></div><div class="result-lg tabular-nums" id="wpr">#4 Medium (Worsted / Aran)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="wpinfo">Ply: 10-12 Ply (AU/UK) | Recommended Needle: 4.5–5.5 mm (US 7–9)</div></div>' +
    '</div>';
}

function knittingNeedleW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Knitting Needle Size</label><select id="kn-size"><option value="2.25">2.25 mm (US 1 / UK 13)</option><option value="3.25">3.25 mm (US 3 / UK 10)</option><option value="4.0">4.00 mm (US 6 / UK 8)</option><option value="4.5" selected>4.50 mm (US 7 / UK 7)</option><option value="5.0">5.00 mm (US 8 / UK 6)</option><option value="6.0">6.00 mm (US 10 / UK 4)</option><option value="8.0">8.00 mm (US 11 / UK 0)</option><option value="10.0">10.00 mm (US 15 / UK 000)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Three-Way Equivalent Sizing</span><button class="copy-btn" id="knc">Copy</button></div><div class="result-lg tabular-nums" id="knr">US 7 = UK 7 = 4.5 mm</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="kninfo">In US sizing, larger numbers mean thicker needles; in traditional UK, smaller numbers are thicker!</div></div>' +
    '</div>';
}

function crochetHookW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Crochet Hook Size</label><select id="ch-size"><option value="2.25">2.25 mm (US B-1 / UK 13)</option><option value="3.5">3.50 mm (US E-4 / UK 9)</option><option value="4.0">4.00 mm (US G-6 / UK 8)</option><option value="5.0" selected>5.00 mm (US H-8 / UK 6)</option><option value="5.5">5.50 mm (US I-9 / UK 5)</option><option value="6.0">6.00 mm (US J-10 / UK 4)</option><option value="6.5">6.50 mm (US K-10.5 / UK 3)</option><option value="9.0">9.00 mm (US M/N-13 / UK 00)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Equivalent Hook Standards</span><button class="copy-btn" id="chc">Copy</button></div><div class="result-lg tabular-nums" id="chr">US H-8 = UK 6 = 5.0 mm</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="chinfo">Standard size for Worsted weight (#4 Medium) yarns.</div></div>' +
    '</div>';
}

function primingSugarW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Batch Volume (Gallons)</label><input type="number" id="ps-vol" value="5" inputmode="decimal" class="num-input"></div><div class="field"><label>Target CO2 Volumes</label><input type="number" id="ps-co2" value="2.4" inputmode="decimal" step="0.1" class="num-input"></div><div class="field"><label>Beer Temp (&deg;F)</label><input type="number" id="ps-temp" value="68" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Priming Sugar Weights</span><button class="copy-btn" id="psc2">Copy</button></div><div class="result-lg tabular-nums" id="psr2">113 g Corn Sugar (4.0 oz)</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="psinfo">Table Sugar: 106 g (3.7 oz) | DME: 154 g (5.4 oz) | Honey: 140 g (4.9 oz)</div></div>' +
    '</div>';
}

function printCostW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Filament Weight (g)</label><input type="number" id="pc-wt" value="150" inputmode="decimal" class="num-input"></div><div class="field"><label>Spool Price ($/kg)</label><input type="number" id="pc-spool" value="20" inputmode="decimal" class="num-input"></div><div class="field"><label>Print Time (Hours)</label><input type="number" id="pc-hrs" value="8" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="row2" style="margin-top:12px"><div class="field"><label>Printer Power (Watts)</label><input type="number" id="pc-pwr" value="150" inputmode="numeric" class="num-input"></div><div class="field"><label>Electricity Rate ($/kWh)</label><input type="number" id="pc-elec" value="0.15" inputmode="decimal" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Total Print Cost</span><button class="copy-btn" id="pcc2">Copy</button></div><div class="result-lg tabular-nums" id="pcr2">$3.18 Total Cost</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="pcinfo">Filament: $3.00 | Electricity: $0.18 (1.2 kWh total used)</div></div>' +
    '</div>';
}

function cupVolumeConvW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Ingredient</label><select id="cv-ing"><option value="120" selected>All-Purpose Flour (120g/US cup)</option><option value="200">Granulated Sugar (200g/US cup)</option><option value="213">Packed Brown Sugar (213g/US cup)</option><option value="227">Butter (227g/US cup)</option><option value="240">Water / Milk (240g/US cup)</option></select></div><div class="field"><label>Quantity</label><input type="number" id="cv-qty" value="1" inputmode="decimal" step="any" class="num-input"></div><div class="field"><label>From Cup Type</label><select id="cv-type"><option value="236.59" selected>US Customary Cup (236.6 ml)</option><option value="240.0">US Legal / Nutrition Cup (240 ml)</option><option value="250.0">Metric Cup (250 ml - AU/CA/NZ)</option><option value="284.13">Imperial UK Cup (284.1 ml)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Converted Volume &amp; Gram Weight</span><button class="copy-btn" id="cvc">Copy</button></div><div class="result-lg tabular-nums" id="cvr">120 g Flour</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="cvinfo">Metric Cup: 0.95 cups (127g) | UK Imperial Cup: 0.83 cups (144g)</div></div>' +
    '</div>';
}

function gallonConvW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Volume Quantity</label><input type="number" id="gl-val" value="10" inputmode="decimal" class="num-input"></div><div class="field"><label>From Gallon System</label><select id="gl-from"><option value="us" selected>US Fluid Gallons (3.785 L)</option><option value="uk">UK Imperial Gallons (4.546 L)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Converted Gallons &amp; Liters</span><button class="copy-btn" id="glc2">Copy</button></div><div class="result-lg tabular-nums" id="glr2">8.33 UK Imperial Gallons</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="glinfo">Metric Volume: 37.85 Liters</div></div>' +
    '</div>';
}

function pressureConvW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Tire Pressure Value</label><input type="number" id="pr-val" value="32" inputmode="decimal" class="num-input"></div><div class="field"><label>Unit</label><select id="pr-unit"><option value="psi" selected>PSI (Pounds / sq in - US)</option><option value="bar">BAR (European Standard)</option><option value="kpa">kPa (Kilopascals - Canada)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Pressure Equivalents</span><button class="copy-btn" id="prc">Copy</button></div><div class="result-lg tabular-nums" id="prr">2.21 BAR</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="prinfo">32.0 PSI = 2.21 BAR = 220.6 kPa</div></div>' +
    '</div>';
}

function kidsClothingW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>US Kids Size Tag</label><select id="kc-size"><option value="2t" selected>2T (Toddler - 33-35" / 86-92 cm)</option><option value="3t">3T (Toddler - 35-38" / 92-98 cm)</option><option value="4t">4T / 4 (Child - 38-41" / 98-104 cm)</option><option value="5">5 (Child - 41-44" / 104-110 cm)</option><option value="6">6 (Child - 44-47" / 110-116 cm)</option><option value="7">7 (Child - 47-50" / 116-122 cm)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>International Equivalent Sizes</span><button class="copy-btn" id="kcc">Copy</button></div><div class="result-lg tabular-nums" id="kcr">UK: 2-3 Years | EU: 92 cm</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="kcinfo">Child Height Range: 86–92 cm (33–36 inches) | Weight: 13–15 kg (28–32 lbs)</div></div>' +
    '</div>';
}

function dateResolverW() {
  return '<div class="tool-card-ui">' +
    '<div class="row3"><div class="field"><label>Month or Day (Part 1)</label><input type="number" id="dr-p1" value="4" inputmode="numeric" min="1" max="31" class="num-input"></div><div class="field"><label>Month or Day (Part 2)</label><input type="number" id="dr-p2" value="5" inputmode="numeric" min="1" max="31" class="num-input"></div><div class="field"><label>Year</label><input type="number" id="dr-yr" value="2024" inputmode="numeric" class="num-input"></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Date Resolution &amp; Ambiguity Flag</span><button class="copy-btn" id="drc">Copy</button></div><div class="result-lg tabular-nums" id="drr">US: April 5, 2024 | UK: May 4, 2024</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="drinfo">&#9888; Ambiguous Date: Both numbers are &le; 12! Clarify if US (MM/DD) or UK (DD/MM).</div></div>' +
    '</div>';
}

function floorConvW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Floor Designation</label><select id="fl-val"><option value="g">Ground Floor (G / 0)</option><option value="1" selected>1st Floor</option><option value="2">2nd Floor</option><option value="3">3rd Floor</option><option value="4">4th Floor</option><option value="-1">Basement (-1 / B1)</option></select></div><div class="field"><label>From Building System</label><select id="fl-sys"><option value="uk" selected>UK / European Convention (G = Ground)</option><option value="us">US / Canada Convention (1 = Ground)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Elevator &amp; Floor Equivalent</span><button class="copy-btn" id="flc2">Copy</button></div><div class="result-lg tabular-nums" id="flr2">US Equivalent: 2nd Floor</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="flinfo">UK 1st Floor is one flight above Ground level (US 2nd Floor).</div></div>' +
    '</div>';
}

function fuelEconomyW() {
  return '<div class="tool-card-ui">' +
    '<div class="row2"><div class="field"><label>Fuel Economy Value</label><input type="number" id="fe-val" value="30" inputmode="decimal" class="num-input"></div><div class="field"><label>From Standard</label><select id="fe-unit"><option value="us_mpg" selected>US Miles Per Gallon (US MPG)</option><option value="uk_mpg">UK Imperial MPG (UK MPG)</option><option value="l100km">Liters per 100km (L/100km)</option></select></div></div>' +
    '<div class="result-box dark-surface"><div class="rlabel"><span>Converted Fuel Efficiency</span><button class="copy-btn" id="fec">Copy</button></div><div class="result-lg tabular-nums" id="fer">36.0 UK MPG | 7.84 L/100km</div><div class="caption" style="margin-top:6px;color:var(--on-dark-soft)" id="feinfo">Note: UK MPG is higher because UK Imperial gallons are 20% larger than US gallons.</div></div>' +
    '</div>';
}

/* Format tables for quick pre-calculated values */
function Calcoly_fmt(n) {
  if (!isFinite(n)) return '&mdash;';
  var abs = Math.abs(n);
  var d = abs >= 1000 ? 2 : abs >= 1 ? 4 : 4;
  return Number(n.toFixed(d)).toLocaleString('en-US', { maximumFractionDigits: d });
}

function tableHTML(t) {
  var w = t.widget;
  if (w.type === 'convert' && w.factor) {
    var f = w.factor; var a = w.from.unit; var b = w.to.unit;
    var vals = [0.5, 1, 2, 5, 10, 20, 50, 100, 150, 200];
    var rows = vals.map(v =>
      '<tr><td>' + v + ' ' + a + '</td><td class="num tabular-nums">' + Calcoly_fmt(v*f) + ' ' + b + '</td></tr>'
    ).join('');

    return '<div class="table-card-wrap" style="margin-top:40px">' +
      '<h2 class="title-lg" style="margin-bottom:14px">Quick Conversion Table (' + a + ' to ' + b + ')</h2>' +
      '<div class="table-wrap"><table class="data"><thead><tr><th>' + a + '</th><th>' + b + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '</div>';
  }
  return '';
}

function relatedMatrixHTML(t, siblings, popular) {
  var sibPills = siblings.slice(0, 8).map(r =>
    '<a href="' + toolUrl(r) + '" class="pill-tag">' + esc(r.h1) + '</a>'
  ).join('');

  var popPills = popular.map(r =>
    '<a href="' + toolUrl(r) + '" class="pill-tag">' + esc(r.h1) + '</a>'
  ).join('');

  return '<div class="related container" style="margin-top:48px;border-top:1px solid var(--hairline);padding-top:40px">' +
    (sibPills ?
      '<div style="margin-bottom:28px">' +
      '<h3 class="title-md" style="margin-bottom:12px">More ' + esc(t.ecosystem) + ' Converters</h3>' +
      '<div class="pills">' + sibPills + '</div>' +
      '</div>' : '') +
    '<div>' +
    '<h3 class="title-md" style="margin-bottom:12px">Popular Calcoly Utility Tools</h3>' +
    '<div class="pills">' + popPills + '</div>' +
    '</div>' +
    '<div style="margin-top:24px"><a href="/' + t.pillar + '/" class="btn btn-secondary">View all ' + esc(pillarName(t.pillar)) + ' &rarr;</a></div>' +
    '</div>';
}

/* ========== PRIVACY POLICY PAGE ========== */
export function privacyPage() {
  var path = '/privacy/';
  var body = navHTML(path) +
  '<div class="container crumbs"><a href="/">Home</a><span>&rsaquo;</span><span>Privacy Policy</span></div>' +
  '<div class="container tool-head"><div class="badge-pill">Trust &amp; Transparency</div>' +
  '<h1 class="display-md" style="margin-top:8px">Privacy Policy</h1>' +
  '<p class="body-md lead">Calcoly operates on a strict client-side utility architecture. Your data belongs to you.</p></div>' +
  '<div class="container" style="max-width:760px;margin-top:24px;line-height:1.7">' +
  '<h2 class="title-lg" style="margin:24px 0 12px">1. 100% Client-Side Calculations</h2>' +
  '<p>All mathematical operations, unit conversions, and formula calculations performed on Calcoly run locally inside your browser using vanilla JavaScript. None of the values you type into any calculator or converter are transmitted to our servers or stored in remote databases.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">2. Zero Account &amp; No Sign-Up</h2>' +
  '<p>Calcoly requires no registration, no user profiles, no passwords, and no email addresses to access any tool or cheat sheet. All 57+ utility engines are freely accessible without sign-up.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">3. Cookies &amp; Local Storage</h2>' +
  '<p>We do not use third-party tracking or advertising cookies. We utilize standard browser <code>localStorage</code> solely for operational preferences (such as saving offline service worker cache states and storing anonymous zero-result search terms locally to improve tool coverage).</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">4. Infrastructure &amp; Security</h2>' +
  '<p>Standard web server logs (IP address, browser user-agent, timestamp) are retained briefly by our hosting infrastructure strictly for security monitoring, DDoS prevention, and performance diagnostics. These logs are never correlated with individual users or tool inputs.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">5. Contact Information</h2>' +
  '<p>If you have any questions regarding this Privacy Policy, please reach out via our <a href="/contact/" class="in-text-link">Contact Page</a> or email us at <strong>support@calcoly.com</strong>.</p>' +
  '</div>';

  return wrap(body, {
    title: 'Privacy Policy — Calcoly',
    desc: 'Calcoly Privacy Policy. 100% client-side calculations, zero account registration, zero tracking cookies.',
    canonical: SITE.url + '/privacy/'
  });
}

/* ========== TERMS OF SERVICE PAGE ========== */
export function termsPage() {
  var path = '/terms/';
  var body = navHTML(path) +
  '<div class="container crumbs"><a href="/">Home</a><span>&rsaquo;</span><span>Terms of Service</span></div>' +
  '<div class="container tool-head"><div class="badge-pill">Legal &amp; Transparency</div>' +
  '<h1 class="display-md" style="margin-top:8px">Terms of Service</h1>' +
  '<p class="body-md lead">Please review the terms and conditions governing the use of Calcoly.com and its online calculation tools.</p></div>' +
  '<div class="container" style="max-width:760px;margin-top:24px;line-height:1.7">' +
  '<p class="body-sm" style="color:var(--muted);margin-bottom:20px">Last updated: August 2026</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">1. Acceptance of Terms</h2>' +
  '<p>By accessing and using Calcoly (accessible at <a href="https://calcoly.com/" class="in-text-link">https://calcoly.com</a>), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any portion of these terms, please discontinue use of the website immediately.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">2. Educational &amp; Informational Purpose Only</h2>' +
  '<p>All interactive calculators, unit conversion formulas, baking ratio scalers, and estimation tools provided on Calcoly are designed solely for general educational, household, and informational purposes. Specifically:</p>' +
  '<ul style="margin:12px 0 16px 24px;list-style:disc">' +
  '<li><strong>Health &amp; Fitness:</strong> Calculators such as BMI, TDEE, and macronutrient targets do not constitute medical advice or diagnostic evaluation. Consult a physician or registered dietitian before undertaking dietary or exercise regimens.</li>' +
  '<li><strong>Financial &amp; Tax:</strong> Tools including VAT, discounts, and step-up compound interest calculators provide mathematical projections and estimates. They do not constitute certified financial, tax, or investment advice.</li>' +
  '<li><strong>DIY &amp; Construction:</strong> Tools for paint coverage, concrete volume, or wire gauges are estimates based on standard theoretical factors. Always verify specifications on material manufacturer labels before purchasing or building.</li>' +
  '</ul>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">3. Client-Side Processing &amp; Privacy</h2>' +
  '<p>Calcoly operates on a strict client-side compute architecture. All mathematical operations are calculated locally in your web browser. We do not store, log, or transmit your individual input values to remote servers. Please review our <a href="/privacy/" class="in-text-link">Privacy Policy</a> for full details on our data protection practices.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">4. Intellectual Property &amp; Acceptable Use</h2>' +
  '<p>The user interface design, branding, typography, cheat sheet reference assets, and curated algorithms of Calcoly are the intellectual property of Calcoly. You are granted a non-exclusive license to use these tools for personal, educational, and commercial reference purposes. You agree not to:</p>' +
  '<ul style="margin:12px 0 16px 24px;list-style:disc">' +
  '<li>Attempt to disrupt, overload, or perform denial-of-service (DDoS) attacks against our infrastructure;</li>' +
  '<li>Scrape or mirror the website in a manner that degrades service availability for others;</li>' +
  '<li>Circumvent or tamper with client-side security headers or service worker configurations.</li>' +
  '</ul>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">5. Disclaimer of Warranties</h2>' +
  '<p>Calcoly provides all tools, formulas, cheat sheets, and content on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or accuracy. While we make every reasonable effort to maintain verified mathematical constants and standard equations, we do not warrant that the tools will be completely error-free or uninterrupted.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">6. Limitation of Liability</h2>' +
  '<p>In no event shall Calcoly, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, materials, or business interruption, arising out of or in connection with your use or inability to use the tools or reference sheets provided on this site.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">7. External Links</h2>' +
  '<p>Calcoly may contain links to third-party reference documentation, government measurement standards (e.g. NIST, ISO), or external educational resources. We do not control or endorse the content or privacy policies of third-party websites.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">8. Modifications to Terms</h2>' +
  '<p>We reserve the right to modify or replace these Terms of Service at any time. Any changes will be posted directly to this page with an updated revision date.</p>' +
  '<h2 class="title-lg" style="margin:24px 0 12px">9. Contact Us</h2>' +
  '<p>If you have any questions, suggestions, or concerns regarding these Terms of Service, please contact our team directly at <a href="mailto:support@calcoly.com" class="in-text-link"><strong>support@calcoly.com</strong></a> or through our <a href="/contact/" class="in-text-link">Contact Page</a>.</p>' +
  '</div>';

  return wrap(body, {
    title: 'Terms of Service — Calcoly',
    desc: 'Terms of Service and conditions of use for Calcoly.com online calculators, converters, and reference tools.',
    canonical: SITE.url + '/terms/'
  });
}

/* ========== CONTACT PAGE ========== */
export function contactPage() {
  var path = '/contact/';
  var body = navHTML(path) +
  '<div class="container crumbs"><a href="/">Home</a><span>&rsaquo;</span><span>Contact Us</span></div>' +
  '<div class="container tool-head"><div class="badge-pill">Get In Touch</div>' +
  '<h1 class="display-md" style="margin-top:8px">Contact &amp; Support</h1>' +
  '<p class="body-md lead">Have a question, tool suggestion, or calculation issue? Send us a message and we will respond to you at <strong>support@calcoly.com</strong>.</p></div>' +
  '<div class="container" style="max-width:760px;margin-top:24px">' +
  '<div class="tool-card-ui">' +
  '<div id="contact-msg" style="display:none;margin-bottom:20px;padding:16px;background:var(--surface-soft);border-left:4px solid var(--primary);border-radius:var(--r-sm);color:var(--ink);font-weight:500">' +
  '✓ Thank you! Your message has been sent successfully. We will reply to your email shortly.' +
  '</div>' +
  '<form id="contact-form" action="https://formsubmit.co/support@calcoly.com" method="POST">' +
  '<div class="field"><label for="c-name">Your Name</label><input type="text" id="c-name" name="name" placeholder="e.g. Sarah Jenkins" required></div>' +
  '<div class="field"><label for="c-email">Your Email Address</label><input type="email" id="c-email" name="email" placeholder="sarah@example.com" required></div>' +
  '<div class="field"><label for="c-subject">Subject</label><select id="c-subject" name="_subject" style="height:48px"><option value="[Calcoly] Tool Suggestion / Feature Request">Tool Suggestion / Feature Request</option><option value="[Calcoly] Bug Report / Calculation Issue">Bug Report / Calculation Issue</option><option value="[Calcoly] General Feedback">General Feedback</option><option value="[Calcoly] Partnership Inquiries">Partnership Inquiries</option></select></div>' +
  '<div class="field"><label for="c-msg">Message</label><textarea id="c-msg" name="message" rows="5" placeholder="Tell us how we can help..." style="width:100%;padding:12px;border:1px solid var(--hairline);border-radius:var(--r-md);background:var(--canvas);color:var(--ink);font-family:var(--sans);font-size:16px" required></textarea></div>' +
  '<input type="hidden" name="_captcha" value="false">' +
  '<input type="hidden" name="_template" value="table">' +
  '<input type="hidden" name="_next" value="https://calcoly.com/contact/?status=success">' +
  '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
  '<button type="submit" id="contact-submit-btn" class="btn btn-primary" style="flex:1;height:48px;font-size:16px">Send Message &rarr;</button>' +
  '<a href="mailto:support@calcoly.com?subject=Calcoly%20Inquiry" class="btn btn-secondary" style="height:48px;display:inline-flex;align-items:center;padding:0 20px;text-decoration:none">Open in Email App</a>' +
  '</div>' +
  '</form>' +
  '</div>' +
  '<script>' +
  'if (window.location.search.indexOf("status=success") !== -1) {' +
  '  var m = document.getElementById("contact-msg"); if (m) m.style.display = "block";' +
  '}' +
  '</script>' +
  '<div style="margin-top:32px;line-height:1.7">' +
  '<h3 class="title-md">Direct Contact Info</h3>' +
  '<p>Official Email: <a href="mailto:support@calcoly.com" class="in-text-link"><strong>support@calcoly.com</strong></a><br>Website: <a href="https://calcoly.com/" class="in-text-link">https://calcoly.com</a></p>' +
  '</div></div>';

  return wrap(body, {
    title: 'Contact Us — Calcoly',
    desc: 'Contact Calcoly support team. Submit tool requests, report bugs, or share feedback at support@calcoly.com.',
    canonical: SITE.url + '/contact/'
  });
}
