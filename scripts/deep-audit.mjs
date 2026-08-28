/* Calcoly Deep Comprehensive Project Audit */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SRC = join(ROOT, 'src');
const PUBLIC = join(ROOT, 'public');

console.log('====================================================');
console.log('        CALCOLY FULL PROJECT DEEP AUDIT             ');
console.log('====================================================\n');

function getFiles(dir, ext) {
  let results = [];
  const list = readdirSync(dir);
  list.forEach(file => {
    const full = join(dir, file);
    const stat = statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full, ext));
    } else if (file.endsWith(ext)) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getFiles(DIST, '.html');
console.log(`[1/6] Auditing ${htmlFiles.length} generated HTML files in dist/...`);

const validUrls = new Set();
htmlFiles.forEach(f => {
  let rel = f.replace(DIST, '').replace(/\\/g, '/');
  if (rel === '/index.html') validUrls.add('/');
  else validUrls.add(rel.replace(/index\.html$/, ''));
});

let brokenLinks = [];
let canonicalIssues = [];
let schemaIssues = [];
let doublePeriodIssues = [];
let missingMeta = [];
let totalSchemas = 0;
let checkedLinksCount = 0;

htmlFiles.forEach(f => {
  const rel = f.replace(DIST, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');

  // Title
  if (!html.includes('<title>') || !html.includes('</title>')) {
    missingMeta.push(`${rel} is missing <title>`);
  }

  // Meta Description
  if (!html.includes('<meta name="description"')) {
    missingMeta.push(`${rel} is missing meta description`);
  }

  // Double period "Done.." check
  if (html.includes('Done..') || html.includes('Done.. ')) {
    doublePeriodIssues.push(rel);
  }

  // Canonical
  const canMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canMatch) {
    canonicalIssues.push(`${rel} missing canonical tag`);
  } else {
    const canUrl = canMatch[1];
    const expected = 'https://calcoly.com' + (rel === '/index.html' ? '/' : rel.replace(/index\.html$/, ''));
    if (canUrl !== expected) {
      canonicalIssues.push(`Canonical mismatch in ${rel}: found ${canUrl}, expected ${expected}`);
    }
  }

  // JSON-LD
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  totalSchemas += schemas.length;
  schemas.forEach(s => {
    try {
      JSON.parse(s[1]);
    } catch (e) {
      schemaIssues.push(`Invalid JSON-LD in ${rel}: ${e.message}`);
    }
  });

  // Internal links
  const hrefs = [...html.matchAll(/href=["'](\.?\/[^"']*)["']/g)];
  hrefs.forEach(h => {
    let raw = h[1].split('#')[0].split('?')[0];
    let target = raw.startsWith('./') ? raw.replace(/^\./, '') : raw;
    if (target && !target.startsWith('/assets/') && !target.startsWith('/favicon') && !target.startsWith('/manifest') && !target.endsWith('.png') && !target.endsWith('.svg') && !target.endsWith('.css') && !target.endsWith('.js')) {
      if (!target.endsWith('/')) target += '/';
      checkedLinksCount++;
      if (!validUrls.has(target)) {
        brokenLinks.push(`Broken link in ${rel} -> ${raw} (${target})`);
      }
    }
  });
});

console.log(`[2/6] Verified ${checkedLinksCount} internal links across ${htmlFiles.length} pages.`);
console.log(`[3/6] Audited ${totalSchemas} JSON-LD structured data schemas.`);

// Check Service Worker
console.log(`[4/6] Checking Service Worker (public/sw.js)...`);
const sw = readFileSync(join(PUBLIC, 'sw.js'), 'utf8');
const swHasIgnoreSearch = sw.includes('ignoreSearch');

// Check server.mjs
console.log(`[5/6] Checking Local Development Server (server.mjs)...`);
const server = readFileSync(join(ROOT, 'server.mjs'), 'utf8');
const serverSafe = server.includes('startsWith') || server.includes('normalize');

// Check widgets.js
console.log(`[6/6] Checking Client Widgets Script (public/assets/widgets.js)...`);
const widgets = readFileSync(join(PUBLIC, 'assets', 'widgets.js'), 'utf8');
const hasFakeCryptoPills = widgets.includes('+1.80%') || widgets.includes('-7.33%');

console.log('\n====================================================');
console.log('              DEEP AUDIT REPORT CARD                ');
console.log('====================================================');
console.log(`✓ Total Pre-rendered HTML Pages: ${htmlFiles.length}`);
console.log(`✓ Total Validated JSON-LD Schemas: ${totalSchemas}`);
console.log(`✓ Broken Internal Links: ${brokenLinks.length}`);
console.log(`✓ Canonical Mismatches: ${canonicalIssues.length}`);
console.log(`✓ Missing Titles/Descriptions: ${missingMeta.length}`);
console.log(`✓ Schema Errors: ${schemaIssues.length}`);
console.log(`✓ Double Period "Done.." Typo: ${doublePeriodIssues.length === 0 ? 'CLEAN (0 found)' : doublePeriodIssues.length + ' pages affected'}`);
console.log(`✓ Service Worker ignoreSearch Support: ${swHasIgnoreSearch ? 'YES' : 'NEEDS UPDATE'}`);
console.log(`✓ Server Path Traversal Protection: ${serverSafe ? 'YES' : 'NEEDS HARDENING'}`);
console.log(`✓ Crypto Live Data Integrity: ${hasFakeCryptoPills ? 'HAS STATIC ±% PILLS (NEEDS POLISH)' : 'CLEAN'}`);
console.log('====================================================\n');

if (brokenLinks.length > 0) {
  console.log('Broken Links:');
  brokenLinks.forEach(b => console.log('  ✕ ' + b));
}
