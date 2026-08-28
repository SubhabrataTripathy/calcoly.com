/* Calcoly OG image generator — zero-dependency PNG encoder
   Draws the brand card (cream canvas · coral diamond · CALCOLY wordmark)
   at 2x supersampling, outputs public/og-image.png (1200x630).        */
import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';

const W = 1200, H = 630, S = 2; // S = supersample factor
const IW = W * S, IH = H * S;

const COL = {
  canvas: [250, 249, 245],   // #faf9f5
  coral: [204, 120, 92],     // #cc785c
  coralDark: [169, 88, 62],  // #a9583e
  ink: [20, 20, 19],         // #141413
  hairline: [230, 223, 216], // #e6dfd8
};

const buf = Buffer.alloc(IW * IH * 3);
for (let i = 0; i < IW * IH; i++) {
  buf[i * 3] = COL.canvas[0]; buf[i * 3 + 1] = COL.canvas[1]; buf[i * 3 + 2] = COL.canvas[2];
}

function setPx(x, y, c) {
  if (x < 0 || y < 0 || x >= IW || y >= IH) return;
  const i = (y * IW + x) * 3;
  buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2];
}

function fillRect(x0, y0, x1, y1, c) {
  for (let y = Math.round(y0); y <= Math.round(y1); y++)
    for (let x = Math.round(x0); x <= Math.round(x1); x++) setPx(x, y, c);
}

/* convex polygon fill via winding test inside bbox */
function poly(pts, c) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  pts.forEach(p => { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); });
  for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++)
    for (let x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
      let sgn = 0, inside = true;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], b = pts[(i + 1) % pts.length];
        const cr = (b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]);
        if (cr !== 0) {
          const cs = cr > 0 ? 1 : -1;
          if (sgn === 0) sgn = cs; else if (cs !== sgn) { inside = false; break; }
        }
      }
      if (inside) setPx(x, y, c);
    }
}

function circle(cx, cy, r, c) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++)
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) setPx(x, y, c);
}

function annulus(cx, cy, rO, rI, gapHalfDeg, c) {
  for (let y = Math.floor(cy - rO); y <= Math.ceil(cy + rO); y++)
    for (let x = Math.floor(cx - rO); x <= Math.ceil(cx + rO); x++) {
      const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
      if (d2 > rO * rO || d2 < rI * rI) continue;
      if (gapHalfDeg > 0 && Math.abs(Math.atan2(dy, dx)) * 180 / Math.PI < gapHalfDeg) continue;
      setPx(x, y, c);
    }
}

/* thick line segment as a quad: end points + half-width */
function seg(x1, y1, x2, y2, hw, c) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  const px = -dy / L * hw, py = dx / L * hw;
  poly([[x1 + px, y1 + py], [x2 + px, y2 + py], [x2 - px, y2 - py], [x1 - px, y1 - py]], c);
}

/* ---------- composition (all coords in supersampled space) ---------- */

// hairline frame, inset 56 (=28 css px)
fillRect(56, 56, IW - 57, 58, COL.hairline); fillRect(56, IH - 59, IW - 57, IH - 57, COL.hairline);
fillRect(56, 56, 58, IH - 57, COL.hairline); fillRect(IW - 59, 56, IW - 57, IH - 57, COL.hairline);

// coral diamond mark, centered horizontally, upper third
const dcx = IW / 2, dcy = 300, R = 200;
poly([[dcx, dcy - R], [dcx + R, dcy], [dcx, dcy + R], [dcx - R, dcy]], COL.coral);

// wordmark: C A L C O L Y — cap height 150, stroke 30
const capH = 150, midY = 700;               // letter vertical center
const wC = 160, wA = 140, wL = 120, wO = 160, wY = 108;   // advance widths
const gap = 18;
const widths = [wC, wA, wL, wC, wO, wL, wY];
const totalW = widths.reduce((a, b) => a + b) + gap * (widths.length - 1);
let pen = (IW - totalW) / 2;

const t = 26;         // stroke thickness / 2 (half-width)
const rO = capH / 2, rI = rO - 2 * t;

widths.forEach((w, idx) => {
  const cx = pen + w / 2, letter = ['C','A','L','C','O','L','Y'][idx];
  if (letter === 'C') annulus(cx, midY, rO, rI, 48, COL.ink);
  else if (letter === 'O') annulus(cx, midY, rO, rI, 0, COL.ink);
  else if (letter === 'A') {
    const apex = [cx, midY - rO];
    const bl = [cx - rO * 0.62, midY + rO], br = [cx + rO * 0.62, midY + rO];
    seg(apex[0], apex[1], bl[0], bl[1], t, COL.ink);
    seg(apex[0], apex[1], br[0], br[1], t, COL.ink);
    circle(apex[0], apex[1], t * 0.9, COL.ink);
    fillRect(cx - rO * 0.36, midY + capH * 0.12, cx + rO * 0.36, midY + capH * 0.26, COL.ink);
  } else if (letter === 'L') {
    seg(cx - rO * 0.66, midY - rO + t, cx - rO * 0.66, midY + rO - t, t, COL.ink);
    seg(cx - rO * 0.66, midY + rO - t, cx + rO * 0.70, midY + rO - t, t, COL.ink);
  } else if (letter === 'Y') {
    seg(cx - rO * 0.58, midY - rO + t * 0.6, cx, midY + capH * 0.06, t * 0.82, COL.ink);
    seg(cx + rO * 0.58, midY - rO + t * 0.6, cx, midY + capH * 0.06, t * 0.82, COL.ink);
    seg(cx, midY + capH * 0.02, cx, midY + rO, t * 0.86, COL.ink);
  }
  pen += w + gap;
});

// small coral bar accent below wordmark (stand-in for the tagline)
fillRect(IW / 2 - 190, 852, IW / 2 + 190, 862, COL.coral);

/* ---------- downsample 2x -> RGB out ---------- */
const out = Buffer.alloc(W * H * 3);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  let r = 0, g = 0, b = 0;
  for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
    const i = (((y * S + sy) * IW) + (x * S + sx)) * 3;
    r += buf[i]; g += buf[i + 1]; b += buf[i + 2];
  }
  const o = (y * W + x) * 3, n = S * S;
  out[o] = Math.round(r / n); out[o + 1] = Math.round(g / n); out[o + 2] = Math.round(b / n);
}

/* ---------- PNG encode (color type 2, RGB) ---------- */
let table = new Int32Array(256);
for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); table[n] = c; }
function crc32(data) { let c = 0xffffffff; for (const byte of data) c = table[(c ^ byte) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0;
  out.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3);
}
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
]);

writeFileSync('public/og-image.png', png);
console.log('public/og-image.png written (' + png.length + ' bytes, ' + W + 'x' + H + ')');
