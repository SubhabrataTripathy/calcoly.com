/* One-shot surgical patcher for audit fixes — verifies every match, exits non-zero on miss */
import { readFileSync, writeFileSync } from 'fs';

const files = {
  tpl: 'src/templates.mjs',
  sw: 'public/sw.js',
  srv: 'server.mjs',
  wj: 'public/assets/widgets.js',
};

function patch(name, rel, pairs) {
  let src = readFileSync(rel, 'utf8');
  let ok = true;
  for (const [oldS, newS, tag] of pairs) {
    const n = src.split(oldS).length - 1;
    if (n === 0) { console.error(`MISS [${name}]${tag ? ':' + tag : ''} — pattern not found`); ok = false; continue; }
    src = src.split(oldS).join(newS);
    console.log(`ok   [${name}]${tag ? ':' + tag : ''} (${n}×)`);
  }
  if (ok) writeFileSync(rel, src);
  return ok;
}

let all = true;

/* ---------- templates.mjs ---------- */
all &= patch('tpl', files.tpl, [
  // meta description double period
  ["SITE.tagline + '. Free, instant, no sign-up.'", "SITE.tagline + ' Free, instant, no sign-up.'", 'desc'],
  // og:image -> real PNG, twitter card large
  [`'<meta property="og:image" content="' + SITE.url + '/favicon.svg">' +\n    '<meta name="twitter:card" content="summary">'`,
   `'<meta property="og:image" content="' + SITE.url + '/og-image.png">' +\n    '<meta name="twitter:card" content="summary_large_image">'`, 'og'],
  // font diet
  ['family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
   'family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap', 'fonts'],
  // asset busting v2 -> v3
  ['/assets/styles.css?v=2', '/assets/styles.css?v=3', 'css-v'],
  ['/assets/app.js?v=2', '/assets/app.js?v=3', 'app-v'],
  ['/assets/widgets.js?v=2', '/assets/widgets.js?v=3', 'wgt-v'],
  // copy drift
  ["Calcoly. High-Speed Utility Engine.", "Calcoly &middot; Calculate. Convert. Done.", 'footer'],
  ['High-Speed Utility Engine (calcoly.com)', 'www.calcoly.com', 'print-footer'],
  ['&#10003; 100% Free Forever</span><span>&#10003; Zero Ads Above Fold</span><span>&#10003; Instant Client Calculation',
   '&#10003; Free forever</span><span>&#10003; No sign-up</span><span>&#10003; Instant results', 'promise'],
  ['Linkable Reference Assets', 'Free printable references', 'badge'],
  ['Explore Ecosystems', 'Explore Calcoly', 'explore'],
  // crypto honesty: rename refresh + add disclaimer caption under rate box
  [`>↻ Refresh Rates</button></div>' +`,
   `>↻ Recalculate</button></div><div class="caption" style="margin-top:10px;text-align:center;color:var(--muted)">Reference rates \u2014 static illustrative snapshot, not live market data. Cryptocurrencies are highly volatile; verify on an exchange before acting.</div>' +`, 'crypto-disclaimer'],
  // FAQ augmentation wiring: toolPage local var
  ['export function toolPage(t) {\n  var path = toolUrl(t);',
   'export function toolPage(t) {\n  var path = toolUrl(t);\n  var faqs = augmentFaqs(t);', 'faq-var'],
  // schema uses augmented
  ['mainEntity: (t.faqs || []).map(f => ({', 'mainEntity: faqs.map(f => ({', 'faq-schema'],
  // body uses augmented
  ['(t.faqs && t.faqs.length ?', '(faqs.length ?', 'faq-cond'],
  ["'<div class=\"faq\">' + t.faqs.map(f =>", "'<div class=\"faq\">' + faqs.map(f =>", 'faq-body'],
]);

// insert augmentFaqs helper before TOOL PAGE section (only if not already there)
{
  let src = readFileSync(files.tpl, 'utf8');
  if (!src.includes('function augmentFaqs')) {
    const helper = `
/* ---- FAQ augmentation: truthful per-category FAQs so every page has >=3 ---- */
function augmentFaqs(t) {
  var out = (t.faqs || []).slice();
  var has = s => out.some(f => f.q.toLowerCase().indexOf(s) > -1);
  if (!has('store') && !has('upload') && !has('sent to')) out.push({ q: 'Does Calcoly store or upload anything I type?', a: 'No. Every calculation runs locally in your browser with JavaScript \\u2014 nothing you enter is sent to a server, logged, or shared.' });
  var s = t.slug || '';
  if (/bmi|tdee|macros|water-intake/.test(s)) {
    if (!has('medical')) out.push({ q: 'Is this medical advice?', a: 'No. It is an estimate based on published equations and general guidelines. Individual needs vary \\u2014 consult a qualified health professional for personal advice.' });
  } else if (s === 'crypto-converter') {
    if (!has('live')) out.push({ q: 'Are these cryptocurrency prices live?', a: 'No. The built-in prices are static reference values for rough estimation only. Crypto markets move continuously, so always check a live exchange rate before transacting.' });
  } else if (t.pillar === 'finance') {
    if (!has('accounting')) out.push({ q: 'Can I use this for official tax or accounting work?', a: 'Treat the results as quick estimates for planning only. Official filings need proper accounting records \\u2014 and rules differ by country and year, so confirm specifics with an accountant or your revenue authority.' });
  } else if (t.widget && t.widget.type === 'convert' && !s.includes('cup') && !s.includes('gallon') && !s.includes('fuel') && !s.includes('awg')) {
    if (!has('exact')) out.push({ q: 'Are the conversion factors exact?', a: 'Yes \\u2014 they use the internationally agreed definitions (for example 1 inch = 2.54 cm exactly, 1 lb = 0.45359237 kg exactly), so the math is precise; display rounding is the only simplification.' });
  } else if (t.pillar === 'baking') {
    if (!has('differ') && !has('vary')) out.push({ q: 'Why might my result differ slightly from another chart?', a: 'Ingredient densities vary with brand, humidity and how firmly an ingredient is packed. Authoritative charts disagree by a few percent; professional bakers solve this by weighing in grams, which this site encourages.' });
  } else if (/paint|tile|concrete|soil-mulch|firewood-cord/.test(s)) {
    if (!has('extra') && !has('order')) out.push({ q: 'Should I buy more than the calculated amount?', a: 'Usually yes. Materials come in whole bags or units, real rooms are never perfectly square, and some waste is normal \\u2014 adding roughly 10% covers most projects.' });
  } else if (/yarn|knitting|crochet|fabric|sewing|wpi|clothing-size/.test(s)) {
    if (!has('manufacturer') && !has('brand')) out.push({ q: 'Why do sizing standards vary between brands?', a: 'Craft and clothing sizes are voluntary conventions, not laws \\u2014 manufacturers interpret them slightly differently. Use the result as a starting point and always check the specific brand\\u2019s own chart or gauge.' });
  } else if (s.includes('awg')) {
    if (!has('code') && !has('insulation')) out.push({ q: 'Does AWG size include the wire insulation?', a: 'No \\u2014 AWG describes the bare conductor. Current capacity also depends on insulation rating, bundling and installation, so follow your local electrical code for safe ampacity.' });
  }
  if (out.length < 3 && !has('accurate')) out.push({ q: 'How accurate are the results?', a: 'Calcoly uses standard published formulas and constants, computed locally in your browser. Results are rounded to sensible everyday precision; for engineering-grade work use dedicated measurement tools.' });
  return out;
}
`;
    src = src.replace('/* ========== TOOL PAGE ========== */', helper + '\n/* ========== TOOL PAGE ========== */');
    if (!src.includes('function augmentFaqs')) { console.error('MISS [tpl]:augment-insert'); all = false; }
    else { writeFileSync(files.tpl, src); console.log('ok   [tpl]:augment-insert'); }
  }
}

/* ---------- sw.js ---------- */
if (process.env.ONLY !== 'tpl') all &= patch('sw', files.sw, [
  ["const CACHE_NAME = 'calcoly-v2';", "const CACHE_NAME = 'calcoly-__BUILD__';", 'cache-token'],
  ['caches.match(event.request).then(cachedResponse =>', 'caches.match(event.request, { ignoreSearch: true }).then(cachedResponse =>', 'ignore-search'],
]);

/* ---------- server.mjs path traversal guard ---------- */
if (process.env.ONLY !== 'tpl') all &= patch('srv', files.srv, [
  [`  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  let filePath = path.join(DIST, urlPath);`,
   `  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  let filePath = path.join(DIST, path.normalize(urlPath));
  if (filePath !== DIST && !filePath.startsWith(DIST + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }`, 'traversal-guard'],
]);

/* ---------- widgets.js: strip fake % change pills ---------- */
const pillsOld = `  function renderPills(){
    var container = document.getElementById('crypto-pills');
    if(!container) return;
    var pairs = [
      { c: 'BTC', f: 'INR', chg: '+1.80%' },
      { c: 'BTC', f: 'USD', chg: '+1.80%' },
      { c: 'BTC', f: 'IDR', chg: '+1.62%' },
      { c: 'BTC', f: 'EUR', chg: '-1.69%' },
      { c: 'ETH', f: 'INR', chg: '+1.48%' },
      { c: 'ETH', f: 'USD', chg: '+1.15%' },
      { c: 'SOL', f: 'USD', chg: '+2.10%' },
      { c: 'USDT', f: 'INR', chg: '+0.12%' },
      { c: 'XRP', f: 'PHP', chg: '-7.33%' },
      { c: 'BNB', f: 'PHP', chg: '-0.77%' }
    ];
    container.innerHTML = pairs.map(function(p){
      var cPrice = cryptoUsd[p.c] || 1;
      var fInfo = fiatRates[p.f] || fiatRates['USD'];
      var val = cPrice * fInfo.r;
      var isUp = p.chg.charAt(0) === '+';
      var valStr = fInfo.s + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return '<div class="pill-tag" style="font-size:13px;padding:6px 12px;display:inline-flex;align-items:center;gap:6px;background:var(--surface-soft)">' +
        '<span>' + (names[p.c]||p.c) + ' to ' + p.f + '</span>' +
        '<strong style="color:var(--ink)">' + valStr + '</strong>' +
        '<span style="color:' + (isUp ? '#2e7d32' : '#c62828') + ';font-weight:600">' + p.chg + '</span>' +
        '</div>';
    }).join('');
  }`;
const pillsNew = `  function renderPills(){
    var container = document.getElementById('crypto-pills');
    if(!container) return;
    var pairs = [
      { c: 'BTC', f: 'INR' }, { c: 'BTC', f: 'USD' }, { c: 'BTC', f: 'IDR' }, { c: 'BTC', f: 'EUR' },
      { c: 'ETH', f: 'INR' }, { c: 'ETH', f: 'USD' }, { c: 'SOL', f: 'USD' }, { c: 'USDT', f: 'INR' },
      { c: 'XRP', f: 'PHP' }, { c: 'BNB', f: 'PHP' }
    ];
    container.innerHTML = pairs.map(function(p){
      var cPrice = cryptoUsd[p.c] || 1;
      var fInfo = fiatRates[p.f] || fiatRates['USD'];
      var val = cPrice * fInfo.r;
      var valStr = fInfo.s + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return '<a class="pill-tag" href="/money/crypto-converter/" title="Reference-rate conversion" style="font-size:13px;padding:6px 12px;display:inline-flex;align-items:center;gap:6px;background:var(--surface-soft)">' +
        '<span>' + (names[p.c]||p.c) + ' to ' + p.f + '</span>' +
        '<strong style="color:var(--ink)">' + valStr + '</strong>' +
        '</a>';
    }).join('');
  }`;
if (process.env.ONLY !== 'tpl') {
{
  let src = readFileSync(files.wj, 'utf8');
  const n = src.split(pillsOld).length - 1;
  if (n !== 1) { console.error(`MISS [wj]:renderPills (found ${n})`); all = false; }
  else { src = src.replace(pillsOld, pillsNew); writeFileSync(files.wj, src); console.log('ok   [wj]:renderPills'); }
}
}

console.log(all ? '\nALL PATCHES APPLIED' : '\nPATCH FAILURES — see above');
process.exit(all ? 0 : 1);
