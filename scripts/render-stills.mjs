// Renders a PNG of each scene at its fullest moment for review.
//   node scripts/render-stills.mjs             → commercial theme → out/stills/
//   node scripts/render-stills.mjs cinematic   → cinematic theme → out/stills-cinematic/
//   node scripts/render-stills.mjs editorial   → theme 03        → out/stills-editorial/
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';

const theme = process.argv[2] ?? 'commercial';
const THEMES = {
  commercial: { comp: 'JakubeeCommercial', timing: 'src/timing.json', dir: 'out/stills' },
  cinematic: { comp: 'JakubeeCinematic', timing: 'src/cinematic/timing.json', dir: 'out/stills-cinematic' },
  editorial: { comp: 'JakubeeEditorial', timing: 'src/editorial/timing.json', dir: 'out/stills-editorial' },
};
const cfg = THEMES[theme];
if (!cfg) throw new Error(`Unknown theme "${theme}" (use: ${Object.keys(THEMES).join(', ')})`);

// one frame near the end of each scene (everything revealed); optional scene-id filter as argv[3]
const only = process.argv[3];
const { scenes } = JSON.parse(readFileSync(cfg.timing, 'utf8'));
const moments = {};
let f = 0;
for (const sc of scenes) {
  const len = Math.round(sc.duration * 30);
  if (!only || sc.id.includes(only)) moments[sc.id] = f + len - 12;
  f += len;
}

mkdirSync(cfg.dir, { recursive: true });
for (const [id, frame] of Object.entries(moments)) {
  console.log(`→ ${id} (frame ${frame})`);
  execSync(`npx remotion still ${cfg.comp} ${cfg.dir}/${id}.png --frame=${frame}`, { stdio: 'inherit' });
}
