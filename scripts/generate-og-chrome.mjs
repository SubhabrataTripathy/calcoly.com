/* Calcoly OG image via headless Chrome — real brand typography, 1200x630 */
import { writeFileSync, unlinkSync } from 'fs';
import { execFileSync } from 'child_process';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; overflow:hidden; }
  body {
    background:#faf9f5; position:relative;
    font-family:'Inter',sans-serif;
  }
  .frame { position:absolute; inset:28px; border:2px solid #e6dfd8; }
  .mark {
    position:absolute; left:50%; top:96px; width:130px; height:130px;
    background:#cc785c; border-radius:14px; transform:translateX(-50%) rotate(45deg);
  }
  .word {
    position:absolute; left:0; right:0; top:268px; text-align:center;
    font-family:'Cormorant Garamond',serif; font-weight:600;
    font-size:150px; line-height:1; letter-spacing:-0.02em; color:#141413;
  }
  .tag {
    position:absolute; left:0; right:0; top:452px; text-align:center;
    font-size:24px; font-weight:500; letter-spacing:6px; color:#6c6a64;
  }
  .tag b { color:#cc785c; font-weight:600; }
  .bar { position:absolute; left:50%; transform:translateX(-50%); top:512px; width:96px; height:5px; background:#cc785c; }
</style></head><body>
  <div class="frame"></div>
  <div class="mark"></div>
  <div class="word">Calcoly</div>
  <div class="tag">CALCULATE <b>&middot;</b> CONVERT <b>&middot;</b> DONE</div>
</body></html>`;

writeFileSync('scripts/og-card.tmp.html', html);

const here = process.cwd();                       // .../calcoly
const shot = here.replace(/\//g, '\\') + '\\public\\og-image.png';
const page = 'file:///' + here.replace(/\//g, '/') + '/scripts/og-card.tmp.html';

execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox',
  '--window-size=1200,630', '--hide-scrollbars',
  '--virtual-time-budget=8000',
  '--screenshot=' + shot,
  page,
], { stdio: 'pipe' });

unlinkSync('scripts/og-card.tmp.html');
console.log('public/og-image.png rendered via headless Chrome (1200x630)');
