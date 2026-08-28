/* Calcoly build script — zero dependencies, Node.js only
   Usage: node build.mjs                          */

import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const OUT = join(__dirname, 'dist');

/* dynamic import for .mjs tools & templates */
const { tools, pillars, toolUrl, SITE } = await import('./src/tools.mjs');
const {
  homepage,
  toolPage,
  pillarPage,
  allToolsPage,
  bakingConversionChartPage,
  metricToImperialPage,
  percentageFormulaPage,
  privacyPage,
  termsPage,
  contactPage
} = await import('./src/templates.mjs');

/* --- helpers --- */
function write(rel, html) {
  const p = join(OUT, rel);
  const dir = p.replace(/[^/\\]+$/, '');
  mkdirSync(dir, { recursive: true });
  writeFileSync(p, html, 'utf8');
  console.log('  ' + rel);
}

/* --- clean & copy static assets --- */
console.log('Building Calcoly (Phase 1 Blueprint Alignment)...\n');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(__dirname, 'public'), join(OUT), { recursive: true });

/* --- stamp service worker cache with this build's id (so returning users refresh) --- */
const swPath = join(OUT, 'sw.js');
const buildId = 'v' + Date.now().toString(36);
writeFileSync(swPath, readFileSync(swPath, 'utf8').replace('__BUILD__', buildId), 'utf8');
console.log('Service worker cache id: calcoly-' + buildId + '\n');

console.log('Pages:');
/* --- homepage --- */
write('index.html', homepage());

/* --- pillar hub pages --- */
pillars.forEach(p => {
  write(p.id + '/index.html', pillarPage(p.id));
});

/* --- all-tools --- */
write('all-tools/index.html', allToolsPage());

/* --- privacy, terms & contact pages --- */
write('privacy/index.html', privacyPage());
write('terms/index.html', termsPage());
write('contact/index.html', contactPage());

/* --- linkable asset cheat sheets --- */
write('baking-conversion-chart/index.html', bakingConversionChartPage());
write('metric-to-imperial-cheat-sheet/index.html', metricToImperialPage());
write('percentage-formula-cheat-sheet/index.html', percentageFormulaPage());

/* --- tool pages --- */
tools.forEach(t => {
  const urlPath = toolUrl(t); // e.g. /converter/kg-to-lbs/
  const relPath = urlPath.replace(/^\//, '') + 'index.html'; // converter/kg-to-lbs/index.html
  write(relPath, toolPage(t));
});

/* --- sitemap --- */
const today = new Date().toISOString().split('T')[0]; // e.g. 2026-08-26

const urls = [
  SITE.url + '/',
  SITE.url + '/all-tools/',
  SITE.url + '/privacy/',
  SITE.url + '/terms/',
  SITE.url + '/contact/',
  SITE.url + '/baking-conversion-chart/',
  SITE.url + '/metric-to-imperial-cheat-sheet/',
  SITE.url + '/percentage-formula-cheat-sheet/'
];

pillars.forEach(p => urls.push(SITE.url + '/' + p.id + '/'));
tools.forEach(t => urls.push(SITE.url + toolUrl(t)));

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url>\n    <loc>' + u + '</loc>\n    <lastmod>' + today + '</lastmod>\n  </url>').join('\n') +
  '\n</urlset>\n';

write('sitemap.xml', sitemap);

/* --- make pages work from file:// too: rewrite root-relative asset paths to relative --- */
function relifyHtml(filePath) {
  const rel = filePath.slice(OUT.length + 1).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;              // index.html=0, converter/x/index.html=2
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  let html = readFileSync(filePath, 'utf8');
  html = html.replace(/(\s(?:href|src))="\//g, `$1="${prefix}`);
  writeFileSync(filePath, html, 'utf8');
}
const htmlFiles = (function walk(dir, out = []) {
  const entries = readdirSync(dir);
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out); else if (p.endsWith('.html')) out.push(p);
  }
  return out;
})(OUT);
htmlFiles.forEach(relifyHtml);
console.log('\nAsset paths relativized in ' + htmlFiles.length + ' pages (file:// safe)');

console.log('\nDone — Built ' + (tools.length + pillars.length + 8) + ' pages + sitemap.xml in dist/');
