// Renders a PNG of each scene at its fullest moment for review.
//   node scripts/render-stills.mjs             → original theme  → out/stills/
//   node scripts/render-stills.mjs cinematic   → cinematic theme → out/stills-cinematic/
//   node scripts/render-stills.mjs editorial   → theme 03        → out/stills-editorial/
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';

const theme = process.argv[2];
const THEMES = {
  cinematic: { comp: 'JakubeeCinematic', timing: 'src/cinematic/timing.json' },
  editorial: { comp: 'JakubeeEditorial', timing: 'src/editorial/timing.json' },
};

let comp = 'JakubeeCommercial';
let dir = 'out/stills';
let moments = { // seconds on the master clock
  '01-intro': 4.2, '02-zesty-lemon': 9.4, '03-herbal-mint': 14.6, '04-benefits': 21.6,
  '05-fresh-breath': 24.5, '06-choose-flavour': 30.8, '07-price': 35.0, '08-bundle-delivery': 41.0,
  '09-wholesale': 45.2, '10-guarantee': 48.4, '11-end-card': 55.1,
};

if (THEMES[theme]) {
  comp = THEMES[theme].comp;
  dir = `out/stills-${theme}`;
  // one frame near the end of each scene (everything revealed)
  const { scenes } = JSON.parse(readFileSync(THEMES[theme].timing, 'utf8'));
  moments = {};
  let f = 0;
  for (const s of scenes) {
    const len = Math.round(s.duration * 30);
    moments[s.id] = (f + len - 12) / 30;
    f += len;
  }
}

mkdirSync(dir, { recursive: true });
for (const [id, s] of Object.entries(moments)) {
  const frame = Math.round(s * 30);
  console.log(`→ ${id} (frame ${frame})`);
  execSync(`npx remotion still ${comp} ${dir}/${id}.png --frame=${frame}`, { stdio: 'inherit' });
}
