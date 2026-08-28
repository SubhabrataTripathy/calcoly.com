/* Site-wide QA: broken internal links, missing widget IDs, missing assets */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const DIST = 'dist';

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out); else out.push(p.replace(/\\/g, '/'));
  }
  return out;
}

const files = walk(DIST).filter(f => f.endsWith('.html'));
console.log('HTML pages:', files.length);

/* ---------- 1. internal href/src check ---------- */
let broken = 0, totalRefs = 0;
const linkErrors = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const r of refs) {
    if (r.startsWith('http') || r.startsWith('data:') || r.startsWith('mailto:') || r.startsWith('#') || r === '') continue;
    totalRefs++;
    const target = r.split('?')[0].split('#')[0];
    if (target === '') continue;
    let fsPath = target.startsWith('/') ? join(DIST, target) : join(f, '..', target);
    fsPath = fsPath.split('\\').join('/');
    const candidates = [fsPath, fsPath + '.html', fsPath + '/index.html'];
    if (!candidates.some(c => existsSync(c) && statSync(c).isFile())) {
      broken++;
      if (linkErrors.length < 40) linkErrors.push(f + '  ->  ' + r);
    }
  }
}
console.log('internal refs:', totalRefs, '| broken:', broken);
linkErrors.forEach(e => console.log('  BROKEN:', e));

/* ---------- 2. widget ID cross-check ----------
   For each page: collect every id referenced by widgets.js/app.js via
   getElementById / querySelector('#x'), and every id present in the HTML.
   A page FAILS if it references a #id (via <script> src usage) that's missing
   BUT only when the page contains the widget family's trigger element.     */
const js = readFileSync('public/assets/widgets.js', 'utf8') + readFileSync('public/assets/app.js', 'utf8');
const wantedIds = new Set([...js.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]));
console.log('\nIDs referenced by JS:', wantedIds.size);

let idFails = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const present = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
  // Widget trigger = first id the page actually contains among JS-referenced ids.
  // Report only pages where JS references an id the page lacks AND the page
  // contains at least one other JS-referenced id (i.e. a widget IS active).
  const active = [...present].filter(id => wantedIds.has(id));
  if (!active.length) continue;
  // find ids that widgets.js requires as a group: approximate by checking each
  // id referenced immediately adjacent (same IIFE) — instead, cheap heuristic:
  // flag only ids missing from pages that contain the widget's primary input.
  const missing = [...wantedIds].filter(id => !present.has(id));
  if (missing.length) {
    // which missing ids belong to widget families present on the page?
    const fams = new Set(active.map(id => id.slice(0, 2)));
    const sus = missing.filter(id => fams.has(id.slice(0, 2)));
    if (sus.length) {
      idFails++;
      if (idFails <= 25) console.log('  ID-MISMATCH:', f, 'missing:', sus.join(','));
    }
  }
}
console.log('pages with ID mismatches:', idFails);

/* ---------- 3. OG image + favicon + sw + manifest ---------- */
for (const p of ['og-image.png', 'favicon.svg', 'sw.js', 'manifest.webmanifest', 'robots.txt', 'sitemap.xml']) {
  console.log(existsSync(join(DIST, p)) ? 'OK   ' + p : 'MISS ' + p);
}
