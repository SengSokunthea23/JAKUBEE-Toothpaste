# JAKUBEE Toothpaste — Premium Commercial (React + Remotion)

A 9:16 vertical ad (1080×1920, 30 fps: Commercial 39 s, Cinematic 40 s, Editorial 35 s, Futuristic 45 s) for the Zesty Lemon (Blue Edition) and Herbal Mint (Green Edition) toothpastes. All three themes follow the **Jakubee Toothpaste script (source)** below: product benefits only, with no prices, delivery, wholesale or guarantee offers. Each has Khmer on-screen text, motion graphics and an original soundtrack. Every frame is a React component, rendered to MP4 by [Remotion](https://www.remotion.dev).

## Quick start

```bash
npm install
npm start            # Remotion Studio: live preview at http://localhost:3000
npm run render       # → out/JAKUBEE_Toothpaste_Commercial_9x16.mp4  (H.264, CRF 17)
npm run still        # → out/stills/*.png  (one review frame per scene)
```

You need Node 18 or newer. The first render downloads a headless Chrome automatically. To use a Chrome you already have instead, add `--browser-executable=/path/to/chrome`.

## Project structure

```
jakubee-commercial/
├── public/                     static assets (loaded with staticFile())
│   ├── products/               real JAKUBEE product cut-outs (transparent PNG)
│   ├── fonts/                  Manrope (Latin) + Kantumruy Pro (Khmer)
│   └── audio/soundtrack.wav    music bed + SFX, synced to the timeline
├── scripts/
│   ├── generate-commercial-soundtrack.mjs  rebuilds soundtrack.wav (Node, no Python)
│   ├── lib/audio-kit.mjs       shared synthesis / mixing toolkit
│   └── render-stills.mjs       renders one PNG per scene for review
├── src/
│   ├── index.ts                Remotion entry (registerRoot)
│   ├── Root.tsx                compositions: full ad, each scene, thumbnail
│   ├── Commercial.tsx          TransitionSeries + audio (optional voice-over)
│   ├── timing.json             scene order, durations, transitions ← edit timing here
│   ├── timeline.ts             maps timing.json scene ids to components
│   ├── lib/
│   │   ├── copy.ts             ALL text (Commercial + Cinematic) ← edit copy here
│   │   ├── theme.ts            brand colours, fonts, safe zone
│   │   ├── anim.ts             easing / progress helpers, seeded random
│   │   ├── fonts.ts            local font loading
│   │   └── useTime.ts          scene-local time in seconds
│   ├── components/             reusable motion-graphics building blocks
│   │   ├── Typography.tsx      Latin / Khmer / gradient text, mask Reveal, At
│   │   ├── Backgrounds.tsx     blue, green, ivory, fresh, dark, end-card backgrounds
│   │   ├── Product.tsx         product image with shadow + light sweep
│   │   ├── Decor.tsx           bubbles, sparkles, leaves, lemon slices, ice, foam
│   │   ├── Icons.tsx           line icons (sparkle, shield, tooth, bubbles, truck, arrow)
│   │   ├── GlassCard.tsx       glass panels, gradient dots, dashed rings
│   │   ├── Callout.tsx         circular product callouts with leader lines
│   │   ├── BenefitCard.tsx     infographic benefit cards
│   │   ├── VariantHero.tsx     shared layout for the two variant scenes
│   │   ├── GuaranteeShield.tsx protective shield with self-drawing check
│   │   └── CtaButton.tsx       pulsing Khmer CTA button
│   ├── scenes/                 S01Intro … S11EndCard (one file per scene)
│   └── transitions/
│       └── presentations.tsx   water ripple, liquid wave, split, wipe, fade
├── remotion.config.ts
├── tsconfig.json
└── package.json
```

## Scenes

| # | Time | Scene | Transition in |
|---|---|---|---|
| 01 | 0:00.0 | Two flavours, one brand · ថ្នាំដុសធ្មេញ ឥឡូវមាន ២ រសជាតិ | — |
| 02 | 0:04.2 | Zesty Lemon · Blue Edition · ថ្នាំដុសធ្មេញ · ប្រហើរក្លិននៃក្រូចឆ្មា | Water ripple |
| 03 | 0:08.4 | Herbal Mint · Green Edition · ថ្នាំដុសធ្មេញ · ក្លិនជីអង្កាមស្រស់ | Liquid wave |
| 04 | 0:12.6 | Fresh breath · clean teeth | Fade |
| 05 | 0:16.8 | Whitening: yellow stains fade from a tooth, whiter and shinier | Ripple |
| 06 | 0:21.0 | Tartar from cigarettes, tea and coffee is swept away | Diagonal wipe |
| 07 | 0:25.8 | Fluoride 1500ppm: anti-cavity, enamel, strong teeth | Fade |
| 08 | 0:30.0 | Sensitivity, gum bleeding, gum care, odour bacteria | Ripple |
| 09 | 0:34.2 | End card: daily use, oral hygiene, pack claims, Khmer CTA | Liquid wave |

**Length (39 s):** the music is 100 BPM and every scene lasts a whole number of beats (0.6 s = 18 frames), so every scene change lands on a beat and gets a kick. Each scene plays its animation about 1.1–1.33× faster than authored (`speed` in `src/timing.json`). The sound effects follow the speed automatically.

## Common edits

- **Text:** edit `src/lib/copy.ts` (shared by Commercial and Cinematic).
- **Timing:** edit `src/timing.json` (keep each `duration` a multiple of 0.6 s, and change `speed` with it: speed ≈ authored length ÷ new length), then run `npm run soundtrack` so the music and sound effects follow the picture. Add `--cues` to print the cue sheet.
- **Add a Khmer voice-over:** put it at `public/audio/voiceover.mp3`, then render with
  `npx remotion render JakubeeCommercial out/ad.mp4 --props='{"voiceover":"audio/voiceover.mp3"}'`.
  The music drops to 35% automatically. Use `musicVolume` to set it yourself.
- **Brand colours:** edit `src/lib/theme.ts`.

## Cinematic theme (`JakubeeCinematic`)

A second, premium look built from the same products and the same Khmer copy (`src/lib/copy.ts`). It's in Remotion Studio under the **Cinematic** folder.

```bash
npm run dev                    # Studio → Cinematic / JakubeeCinematic
npm run render:cinematic       # → out/JAKUBEE_Cinematic_9x16.mp4 (H.264, CRF 16)
npm run still:cinematic        # → out/stills-cinematic/*.png (one frame per scene)
npm run soundtrack:cinematic   # rebuild public/audio/cinematic-soundtrack.wav (Node only, no Python)
```

**Look:** dark studio sets lit with soft light beams, rim light, floor reflections and focus pulls. The camera pushes in slowly with parallax layers. Headlines sharpen letter by letter while their spacing tightens. Khmer text sharpens word by word and is never split inside a word. Water droplets, ice, leaves and foam drift in slow motion, there are frosted-glass info panels, and fine film grain over the whole picture.

| # | Start | Scene | Transition in |
|---|---|---|---|
| 01 | 0:00.0 | Both tubes come out of darkness under studio light | — |
| 02 | 0:04.0 | Blue Edition: underwater light, ice, droplets | Liquid wipe |
| 03 | 0:08.7 | Green Edition: forest light, slow-motion leaves | Blue → green light wash |
| 04 | 0:13.3 | Fresh breath and clean teeth | Iris |
| 05 | 0:17.3 | Whitening: a tooth clears under a spotlight, "BRIGHTER" | Whip-pan with motion blur |
| 06 | 0:22.0 | Tartar from cigarettes, tea and coffee swept away by light, tubes land | Camera push |
| 07 | 0:27.3 | Fluoride 1500ppm figure in underwater light, three benefit panels | Liquid wipe |
| 08 | 0:31.3 | Sensitivity and gums: a protective shield draws itself | Iris |
| 09 | 0:35.3 | Hero end card: daily use, oral hygiene, pack claims, Khmer CTA | Light sweep |

**Length (40 s):** every scene lasts a whole number of beats at 90 BPM (2/3 s = 20 frames), so every scene change lands on a beat and gets a kick. Scenes play at their authored speed so the camera moves stay smooth; the cut only trims the hold at the end of each scene, and the transitions keep their full cinematic length (0.7–1.2 s).

**Timing:** set scene durations and transitions in `src/cinematic/timing.json`. Both the video and the soundtrack read this file. After changing it, run `npm run soundtrack:cinematic` so the sound effects follow the picture. Add `--cues` to print the timed cue sheet.

**Audio:** an original 90 BPM ambient-pop bed (Amaj9 · F#m9 · Dmaj9 · E6/9) with soft pads, delayed plucks, light kick/clap/hats, and music that dips briefly under each kick. The sound effects are timed to the picture: risers, deep impacts, whooshes, splashes, droplets, shimmer and soft pops. The drums drop to hats during the blue → green colour change and drop out as the whitening tooth appears and under the gums scene. Add a voice-over with `--props='{"voiceover":"audio/voiceover.mp3"}'`. Music and effects then drop to 30%.

**Code:** the theme lives in `src/cinematic/`:
- `fx/Stage.tsx`: lighting sets, camera and depth layers, bokeh, film grain
- `fx/HeroProduct.tsx`: studio-lit product with rim light, reflection, focus and light sweep
- `fx/Elements.tsx`: droplets, ice, leaves, foam
- `fx/Type.tsx`: typography
- `fx/Panels.tsx`: glass panels and floating labels
- `transitions.tsx`
- `scenes/`

## Theme 03: Cinematic Editorial × Premium Digital (`JakubeeEditorial`)

A **JAKUBEE toothpaste** ad with both editions: **Zesty Lemon** (Blue) and **Herbal Mint** (Green). Like the other two themes, it introduces both editions first (02 Zesty Lemon, 03 Herbal Mint), then walks through every benefit in the **JAKUBEE Toothpaste** list with both tubes on screen, and ends on both together. It uses the real product photos in `public/products/`. It's in Remotion Studio under the **Editorial** folder. **35 seconds**, 1080×1920, 30 fps.

```bash
npm run dev                     # Studio → Editorial / JakubeeEditorial
npm run render:editorial        # → out/JAKUBEE_Editorial_9x16.mp4
npm run still:editorial         # → out/stills-editorial/*.png (one frame per scene)
npm run soundtrack:editorial    # rebuild public/audio/editorial-soundtrack.wav  (--cues prints the cue sheet)
```

### Storyboard

| # | Start | Script line | Visual and technique | Transition in | Sound |
|---|---|---|---|---|---|
| 01 | 0:00.0 | 🦷JAKUBEE Toothpaste · ថ្នាំដុសធ្មេញ ឥឡូវមាន ២ រសជាតិ | Warm gradient intro, camera pull-back, Zesty Lemon and Herbal Mint tubes in floating cards, geometric pieces lock into place, underline under "២ រសជាតិ" | — | Swell, card whooshes, soft impact, pops, shimmer |
| 02 | 0:03.0 | ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) · ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់ | Lemon slices and water beads at several depths, Zesty tube turns into place, "FLUORIDE 1500PPM" and "FRESH LEMON" labels | Circle mask | Whoosh, reveal impact, droplets |
| 03 | 0:06.5 | Herbal Mint · ក្លិនជីអង្កាមស្រស់ · ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ | Blue light changes to green, botanical leaves, Herbal tube and pack, "FLUORIDE 1500PPM", "FRESH MINT", "TARTAR REMOVAL · FRESH BREATH" | Color morph | Riser, color sweep, shimmer, reveal impact, leaf air |
| 04 | 0:10.0 | ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព | Search bar types CLEAN TEETH → FRESH BREATH → ZESTY LEMON, a result card opens on both tubes | Gradient wipe | Keystrokes, enter click (drums drop to hats) |
| 05 | 0:14.5 | ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង… · ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Illustrated tooth: yellow stains fade and a light sweeps the enamel, both tubes either side, Khmer keywords highlighted | Floating card | Soft fizz, shine shimmer, highlight clicks |
| 06 | 0:19.0 | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Cigarette, tea and coffee cards float in and are swept away, then both packs are revealed | Camera push | Pops, cleansing whoosh, reveal impact |
| 07 | 0:23.0 | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride · ពង្រឹងស្រទាប់ Enamel · ការពារធ្មេញឱ្យរឹងមាំ | Three isometric layers build up, both tubes land on top, three benefit panels | Blur-to-focus | Layer thumps, ticks, landing impact, pops |
| 08 | 0:27.0 | ស្រៀវធ្មេញ · ឈាមចេញតាមអញ្ចាញធ្មេញ · ថែរក្សាអញ្ចាញធ្មេញ · បាក់តេរីក្លិនមាត់ | Floating icon ecosystem around both tubes, four benefit panels | Floating card | Icon pops, panel pops |
| 09 | 0:31.0 | ថ្នាំដុសធ្មេញ JAKUBEE ២ រសជាតិ · ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ · ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ | Geometric finale: both tubes, lemon slice and mint leaf, the four claims printed on both tubes, Khmer CTA | Light leak | Riser, hero impact, shimmer, CTA click, final chord |

**Length:** to fit 35 s, the separate fresh-breath scene was removed (fresh breath is already said in the Zesty Lemon line "ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ…" and the FRESH BREATH pill in scene 04), and each scene ends soon after its last animation instead of holding. Scenes play about 1.25–1.4× faster than authored (`speed` in `timing.json`), the same pace as the earlier 45 s cut, and the daily-use lines live in the finale. To change the length, edit `duration` (keep it a multiple of 0.5 s, one beat at 120 BPM) and `speed` together (speed ≈ authored length ÷ new length), then run `npm run soundtrack:editorial`. The sound effects follow the speed automatically.

**Copy:** all text is in `src/editorial/copy.ts`, taken from the script below. Sensitivity uses the spelling **ស្រៀវធ្មេញ** from the JAKUBEE Toothpaste list. Please have a native speaker proofread **ស្ចឹម** (the general list writes it ស្នឹម). The English supporting words are short labels that match the script or what's printed on the pack. The Herbal Mint scene uses the general JAKUBEE Toothpaste list, which applies to both flavours, plus the English printed on the Herbal pack. The closing CTA "កុម្ម៉ង់ឥឡូវនេះ" is not in the script. Remove it in `copy.ts` and `scenes/T11Finale.tsx` if you don't want it. There are no prices or offers in any theme, because the script has none.

**Music:** an original 120 BPM bed (Emaj9 · C#m9 · Amaj9 · B6/9) with airy pads, soft keys through an echo delay, light kick, snap and hats, and gentle bass. The music dips briefly under each kick. The drums drop out for the search typing and the fresh-breath scene. Every scene lasts a whole number of beats, so every scene change lands on a beat and gets a kick. The sound effects are generated in code and timed to the picture.

**Voice-over:** add one with `--props='{"voiceover":"audio/voiceover.mp3"}'`. Music and effects then drop to 30%.

**Code:** the theme lives in `src/editorial/`:
- `copy.ts`: all on-screen text
- `timing.json`: scene durations and transitions
- `ui/`: backdrop, cards, product photos, typography, search bar, phone, isometric objects, lemon slices, tooth
- `transitions.tsx`
- `scenes/` (in script order; the daily-care phone scene and the fresh-breath scene were removed to shorten the ad)

### Jakubee Toothpaste script (source)
JAKUBEE ZESTY LEMON TOOTHPASTE
ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)
ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព
ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង និងស្នាម ឬស្ចឹមប្រឡាក់លើផ្ទៃធ្មេញ
ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ
ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន
ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ
ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride
ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ
ជួយកាត់បន្ថយបញ្ហាសៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ
ជួយថែរក្សាអញ្ចាញធ្មេញ កាត់បន្ថយបាក់តេរីដែលបណ្តាលឱ្យមានក្លិនមាត់
ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្តល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់
ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ
ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ
ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់ និងជួយឱ្យ មាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។
🦷JAKUBEE Toothpaste 🦷
🌿ជួយ​សម្អាត​ធ្មេញ​ នឹង​ បំបាត់​បញ្ហា​ក្លិន​មាត់​បាន​យ៉ាង​មាន​ប្រសិទ្ធភាព​🍊
🌿ជួយ​កាត់​បន្ថយ​ស្នាម​រឹស​ស្នឹម​លឿង​ នឹង​ ស្នាម​រឹស​ស្នឹម​ប្រឡាក់​លេី​ផ្ទៃ​ធ្មេញ​🍊
🌿​ជួយថែ​រក្សា​ នឹង​ ការ​ពារ​ធ្មេញ​ឲ្យ​រឹងមាំ​🍊
🌿​ជួយ​ឲ្យ​ធ្មេញ​សស្អាត​រឹងមាំ​ នឹង​ ភ្លឺ​រលោង​ជាង​មុន​🍊
🌿​ជួយ​សម្អាត​កំណក​កំបោរ​ ធ្មេញ​ដែល​បង្ក​ពី​បារី​ តែ​ កាហ្វេ​ បាន​ស្អាត​ល្អ​🍊
🌿​ជួយ​បង្ការ​ធ្មេញ​ពុក​ដោយមាន​សារ​ធាតុ​ (Fluoride) 1500ppn 
🌿​ជួយ​កាត់​បន្ថយ​បញ្ហា​ស្រៀវ​ធ្មេញ​ ឈាម​តាម​អញ្ចាញ​ធ្មេញ​​🍊
🌿​ជួយ​រក្សា​អញ្ចាញ​ធ្មេញ​ កាត់​បន្ថយ​បាក់តេរី​ដែល​បណ្ដាល​ឲ្យ​មាន​ក្លិន​មាត់​🍊
🌿​ជួយ​ឲ្យ​ខ្យល់​ដង្ហើម​ស្រស់ស្រាយ​ នឹង​ ផ្ដល់​អារម្មណ៍​ស្រស់​ថ្លា​ក្នុង​មាត់​🍊
🌿​ជួយ​រក្សា​អនាម័យ​មាត់​ធ្មេញ​បាន​ល្អ​🍊
🌿​ស័ក្ដិសម​សម្រាប់​ការ​ប្រើប្រាស់​ជា​ប្រចាំ​ថ្ងៃ​🍊

## Theme 04: Futuristic Dental Science × Cinematic Product Motion (`JakubeeFuturistic`)

A dark, high-tech **JAKUBEE Zesty Lemon** film in 13 chapters that follow the Khmer script line by line. It's in Remotion Studio under the **Futuristic** folder. **45 seconds**, 1080×1920, 30 fps.

```bash
npm run dev                     # Studio → Futuristic / JakubeeFuturistic
npm run render:futuristic       # → out/JAKUBEE_Futuristic_9x16.mp4 (H.264, CRF 16)
npm run still:futuristic        # → out/stills-futuristic/*.png (one frame per chapter)
npm run soundtrack:futuristic   # rebuild public/audio/futuristic-soundtrack.wav (add --cues for the cue sheet)
```

**Look:** obsidian-black sets with soft coloured light pools, a perspective grid, fine scanlines and film grain. Neon green (#A8F044) is used only for graphic accents, while the real tube keeps its silver, lemon-yellow and cyan. Elements include a metallic 3D tooth with a neon rim, dark glassmorphism cards, orbiting particles, air trails, water droplets, lemon slices, ice and mint, plus minimal data graphics (a ring indicator, thin pointers and technical labels). The data graphics show no numbers, percentages or lab results. Headlines use kinetic word reveals with tightening letter-spacing and a short, controlled glitch. Each Khmer script line sits in a dark glass caption bar. Its words fade up from a soft blur and are never split or masked.

**Transitions:** controlled glitch (RGB-split slices and scanlines), particle dissolve, blur-to-focus, zoom-through, neon light sweep and a directional push with motion blur.

| # | Start | Narration (script) | Visual | Transition in |
|---|---|---|---|---|
| 01 | 0:00.0 | ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) | Lemon slice turning in the dark, droplets, yellow-green light sweep, the tube rises; ZESTY LEMON glitches in | — |
| 02 | 0:03.5 | ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព | Metallic 3D tooth, orbiting cleansing particles, air trails, glass card CLEAN TEETH · FRESH BREATH | Particle dissolve |
| 03 | 0:07.0 | ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង និងស្នាម ឬស្ចឹមប្រឡាក់លើផ្ទៃធ្មេញ | Abstract surface spots cleared by a scan line, pointers, STAIN CARE | Glitch |
| 04 | 0:10.5 | ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | Tooth inside assembling hexagonal protective layers, STRONGER-LOOKING TEETH | Blur-to-focus |
| 05 | 0:13.5 | ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Cinematic tooth close-up, reflection sweep, sparkles, CLEAN. BRIGHT. FRESH. | Zoom-through |
| 06 | 0:16.5 | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Cigarette, tea and coffee glass cards shed stain particles, clean scan, then the tube | Glitch |
| 07 | 0:20.5 | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride | FLUORIDE, luminous particles gather into a protective ring, ring indicator | Neon light sweep |
| 08 | 0:23.5 | ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ | Stylised cross-section (enamel, dentin, pulp), enamel band lights up, thin pointers | Particle dissolve |
| 09 | 0:27.0 | ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ | Clean, non-graphic gumline under three teeth, green highlight traces it, glass card | Push |
| 10 | 0:30.0 | ជួយថែរក្សាអញ្ចាញធ្មេញ កាត់បន្ថយបាក់តេរីដែលបណ្តាលឱ្យមានក្លិនមាត់ | Abstract microscopic particles disperse in clean airflow, the tube takes the frame | Glitch |
| 11 | 0:33.5 | ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្តល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ | Camera orbit: lemon slices circle the tube, cyan particles, mint, air trails | Particle dissolve |
| 12 | 0:36.5 | ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ · ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ | Floating product card: tube, ORAL HYGIENE, DAILY USE, a week of tooth icons lighting up | Blur-to-focus |
| 13 | 0:40.0 | ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់ និងជួយឱ្យ មាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។ | Lemon environment, droplets, ice, mint, oversized ZESTY LEMON behind the tube, JAKUBEE glitch reveal and light sweep | Neon light sweep |

**Audio:** an original 120 BPM dark electronic bed (Am9 · Fmaj9 · Cmaj7 · G6) with sub bass, a pulsing filtered saw arp, tight kick/snap/hats and sidechain. Every chapter lasts a whole number of beats (0.5 s), so every cut lands on the beat and gets a kick. The drums thin to hats for the fluoride and enamel chapters, and the finale resolves on a held chord. The sound effects are synthesised and timed to the animation: glitch accents, digital whooshes, risers, deep impacts, neon sweeps, scanner tones, UI clicks, particle ticks, electronic pulses, water droplets and a lemon splash. There is no narration audio in the project. To add one, render with `--props='{"voiceover":"audio/voiceover.mp3"}'`: the music and effects drop to 30% under it.

**Code:** `src/futuristic/`: `ui/Stage.tsx` (sets, grid, scanlines, particles, camera), `ui/Objects.tsx` (the real tube on a dark set, tooth, cross-section, glass, data graphics, particles), `ui/Type.tsx` (kinetic, glitch, caption), `ui/Frame.tsx`, `transitions.tsx`, `copy.ts` (Khmer from the script), `timing.json`, `scenes/F01–F13`.

## Product integrity

The product images are the supplied JAKUBEE photos, used unchanged. Components only move, scale, rotate, shadow and light them. All claims come from the packaging: Whitening, Anti-Cavity, Anti-Sensitivity, Anti-Plaque, Fluoride 1500ppm, Tartar Removal, Fresh Breath.