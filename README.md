# JAKUBEE Toothpaste — Premium Commercial (React + Remotion)

A 9:16 vertical ad (1080×1920, 60 fps: Commercial 39 s, Cinematic 40 s, Editorial 36.5 s, Futuristic 25 s, Lavender 40.5 s) for the Zesty Lemon (Blue Edition) and Herbal Mint (Green Edition) toothpastes. All five themes follow the **Jakubee Toothpaste script (source)** below: product benefits only, with no prices, delivery, wholesale or guarantee offers. Each has Khmer on-screen text, motion graphics and an original soundtrack. Every frame is a React component, rendered to MP4 by [Remotion](https://www.remotion.dev).

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

The Khmer on screen comes word for word from the **Jakubee Toothpaste script (source)** below, with the same spelling as Theme 04. A long line is split only between words.

| # | Start | Scene | Khmer on screen (script) | Transition in |
|---|---|---|---|---|
| 01 | 0:00.0 | Two flavours, one brand | ថ្នាំដុសធ្មេញ JAKUBEE | — |
| 02 | 0:04.2 | Zesty Lemon · Blue Edition | ជាប្រភេទថ្នាំដុសធ្មេញ · ប្រហើរក្លិននៃក្រូចឆ្មា | Water ripple |
| 03 | 0:08.4 | Herbal Mint · Green Edition | ថ្នាំដុសធ្មេញ · ជួយសម្អាតធ្មេញ | Liquid wave |
| 04 | 0:12.6 | Fresh breath · clean teeth | ខ្យល់ដង្ហើម ស្រស់ស្រាយ · ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ · ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព | Fade |
| 05 | 0:16.8 | Whitening: yellow stains fade from a tooth, whiter and shinier | ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ · ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Ripple |
| 06 | 0:21.0 | Tartar from cigarettes, tea and coffee is swept away | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Diagonal wipe |
| 07 | 0:25.8 | Fluoride 1500ppm: anti-cavity, enamel, strong teeth | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm · ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ · ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | Fade |
| 08 | 0:30.0 | Sensitivity, gum bleeding, gum care, odour bacteria | ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ · ឈាមចេញតាមអញ្ចាញធ្មេញ · ជួយថែរក្សាអញ្ចាញធ្មេញ · កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់ | Ripple |
| 09 | 0:34.2 | End card: daily use, oral hygiene, pack claims, Khmer CTA | ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ · ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ · កុម្ម៉ង់ឥឡូវនេះ (CTA) | Liquid wave |

**Frame rate:** every theme renders at **60 fps** (`FPS` in `src/lib/theme.ts`). All timing is in seconds (`timing.json`), and the scene clock (`useTime`) reads the real frame rate, so the picture and the soundtrack stay in sync. Film grain still changes 30 times a second, like real grain.

**Length (39 s):** the music is 100 BPM and every scene lasts a whole number of beats (0.6 s = 36 frames at 60 fps), so every scene change lands on a beat and gets a kick. Each scene plays its animation about 1.1–1.33× faster than authored (`speed` in `src/timing.json`). The sound effects follow the speed automatically.

## Common edits

- **Text:** edit `src/lib/copy.ts` (shared by Commercial and Cinematic). Copy Khmer from the script, and split a long line only at a space, never inside a word.
- **Timing:** edit `src/timing.json` (keep each `duration` a multiple of 0.6 s, and change `speed` with it: speed ≈ authored length ÷ new length), then run `npm run soundtrack` so the music and sound effects follow the picture. Add `--cues` to print the cue sheet.
- **Add a Khmer voice-over:** put it at `public/audio/voiceover.mp3`, then render with
  `npx remotion render JakubeeCommercial out/ad.mp4 --props='{"voiceover":"audio/voiceover.mp3"}'`.
  The music drops to 35% automatically. Use `musicVolume` to set it yourself.
- **Brand colours:** edit `src/lib/theme.ts`.

## Cinematic theme (`JakubeeCinematic`)

A second, premium look built from the same products and the same copy (`src/lib/copy.ts`). It's in Remotion Studio under the **Cinematic** folder.

```bash
npm run dev                    # Studio → Cinematic / JakubeeCinematic
npm run render:cinematic       # → out/JAKUBEE_Cinematic_9x16.mp4 (H.264, CRF 16)
npm run still:cinematic        # → out/stills-cinematic/*.png (one frame per scene)
npm run soundtrack:cinematic   # rebuild public/audio/cinematic-soundtrack.wav (Node only, no Python)
```

**Look:** dark studio sets lit with soft light beams, rim light, floor reflections and focus pulls. The camera pushes in slowly with parallax layers. Headlines sharpen letter by letter while their spacing tightens. Khmer text sharpens word by word and is never split inside a word. Water droplets, ice, leaves and foam drift in slow motion, there are frosted-glass info panels, and fine film grain over the whole picture.

| # | Start | Scene | Khmer on screen (script) | Transition in |
|---|---|---|---|---|
| 01 | 0:00.0 | Both tubes come out of darkness under studio light | ថ្នាំដុសធ្មេញ JAKUBEE | — |
| 02 | 0:04.0 | Blue Edition: underwater light, ice, droplets | ថ្នាំដុសធ្មេញ · ប្រហើរក្លិននៃក្រូចឆ្មា | Liquid wipe |
| 03 | 0:08.7 | Green Edition: forest light, slow-motion leaves | ថ្នាំដុសធ្មេញ · ជួយសម្អាតធ្មេញ | Blue → green light wash |
| 04 | 0:13.3 | Fresh breath and clean teeth | ខ្យល់ដង្ហើម ស្រស់ស្រាយ · ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ · ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព | Iris |
| 05 | 0:17.3 | Whitening: a tooth clears under a spotlight, ភ្លឺរលោង | ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ · ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Whip-pan with motion blur |
| 06 | 0:22.0 | Tartar from cigarettes, tea and coffee swept away by light, tubes land | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Camera push |
| 07 | 0:27.3 | Fluoride 1500ppm figure in underwater light, three benefit panels | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm · ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ · ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | Liquid wipe |
| 08 | 0:31.3 | Sensitivity and gums: a protective shield draws itself | ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ · ឈាមចេញតាមអញ្ចាញធ្មេញ · ជួយថែរក្សាអញ្ចាញធ្មេញ · កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់ | Iris |
| 09 | 0:35.3 | Hero end card: daily use, oral hygiene, pack claims, Khmer CTA | ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ · ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ · កុម្ម៉ង់ឥឡូវនេះ (CTA) | Light sweep |

In scene 02 the Cinematic theme uses the shorter excerpt (without ជាប្រភេទ) so the Khmer clears the tube (`khShort` in `copy.ts`).

**Length (40 s):** every scene lasts a whole number of beats at 90 BPM (2/3 s = 40 frames at 60 fps), so every scene change lands on a beat and gets a kick. Scenes play at their authored speed so the camera moves stay smooth; the cut only trims the hold at the end of each scene, and the transitions keep their full cinematic length (0.7–1.2 s).

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

A **JAKUBEE toothpaste** ad with both editions: **Zesty Lemon** (Blue) and **Herbal Mint** (Green). Like the other two themes, it introduces both editions first (02 Zesty Lemon, 03 Herbal Mint), then walks through every benefit in the **JAKUBEE Toothpaste** list with both tubes on screen, and ends on both together. It uses the real product photos in `public/products/`. It's in Remotion Studio under the **Editorial** folder. **36.5 seconds**, 1080×1920, 60 fps.

```bash
npm run dev                     # Studio → Editorial / JakubeeEditorial
npm run render:editorial        # → out/JAKUBEE_Editorial_9x16.mp4
npm run still:editorial         # → out/stills-editorial/*.png (one frame per scene)
npm run soundtrack:editorial    # rebuild public/audio/editorial-soundtrack.wav  (--cues prints the cue sheet)
```

### Storyboard

| # | Start | Khmer on screen (script) | Visual and technique | Transition in | Sound |
|---|---|---|---|---|---|
| 01 | 0:00.0 | ថ្នាំដុសធ្មេញ JAKUBEE | Warm gradient intro, camera pull-back, Zesty Lemon and Herbal Mint tubes in floating cards, geometric pieces lock into place, underline under "JAKUBEE" | — | Swell, card whooshes, soft impact, pops, shimmer |
| 02 | 0:03.0 | ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) · ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់ | Lemon slices and water beads at several depths, Zesty tube turns into place, "Fluoride 1500ppm" and "ក្លិននៃក្រូចឆ្មា" labels | Circle mask | Whoosh, reveal impact, droplets |
| 03 | 0:06.5 | ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ | Blue light changes to green, botanical leaves, Herbal tube and pack, "Fluoride 1500ppm", "ស្រស់ស្រាយ", "កំណកកំបោរ (Tartar) · ខ្យល់ដង្ហើមស្រស់ស្រាយ" | Color morph | Riser, color sweep, shimmer, reveal impact, leaf air |
| 04 | 0:10.0 | ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់ បានយ៉ាងមានប្រសិទ្ធភាព | Search bar: someone looks for a good toothpaste, ថ្នាំដុសធ្មេញល្អ → ថ្នាំដុសធ្មេញណាល្អបំផុត? → JAKUBEE Toothpaste, and a result card opens on both tubes | Gradient wipe | Keystrokes, enter click (drums drop to hats) |
| 05 | 0:16.0 | ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ · ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Illustrated tooth: yellow stains fade and a light sweeps the enamel, both tubes either side, Khmer keywords highlighted | Floating card | Soft fizz, shine shimmer, highlight clicks |
| 06 | 0:20.5 | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Cigarette, tea and coffee cards float in and are swept away, then both packs are revealed | Camera push | Pops, cleansing whoosh, reveal impact |
| 07 | 0:24.5 | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm · ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ · ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | Three isometric layers build up, both tubes land on top, three benefit panels | Blur-to-focus | Layer thumps, ticks, landing impact, pops |
| 08 | 0:28.5 | ជួយថែរក្សាអញ្ចាញធ្មេញ · ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ · ឈាមចេញតាមអញ្ចាញធ្មេញ · កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់ | Floating icon ecosystem around both tubes, four benefit panels | Floating card | Icon pops, panel pops |
| 09 | 0:32.5 | ថ្នាំដុសធ្មេញ JAKUBEE · ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ · ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ · កុម្ម៉ង់ឥឡូវនេះ (CTA) | Geometric finale: both tubes, lemon slice and mint leaf, the four claims printed on both tubes, Khmer CTA | Light leak | Riser, hero impact, shimmer, CTA click, final chord |

**Length (36.5 s):** the search scene (04) lasts 6 s so the three Khmer queries can be read. Typing time is shared by query length (Khmer needs more characters than Latin), each query is held before it clears, and the keystroke sounds follow the same schedule (`searchSchedule` in `ui/Interface.tsx`). To fit the rest, the separate fresh-breath scene was removed (fresh breath is already in the Zesty Lemon line "ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ…" and the បំបាត់បញ្ហាក្លិនមាត់ pill in scene 04), and each scene ends soon after its last animation instead of holding. Scenes play about 1.25–1.4× faster than authored (`speed` in `timing.json`), the same pace as the earlier 45 s cut, and the daily-use lines live in the finale. To change the length, edit `duration` (keep it a multiple of 0.5 s, one beat at 120 BPM) and `speed` together (speed ≈ authored length ÷ new length), then run `npm run soundtrack:editorial`. The sound effects follow the speed automatically.

**Copy:** all text is in `src/editorial/copy.ts`. The Khmer is copied word for word from the script below, with the same spelling as Theme 04. The English supporting words are short labels that match the script or what's printed on the pack. The closing CTA "កុម្ម៉ង់ឥឡូវនេះ" is not in the script. Remove it in `copy.ts` and `scenes/T11Finale.tsx` if you don't want it. There are no prices or offers in any theme, because the script has none.

**Music:** an original 120 BPM bed (Emaj9 · C#m9 · Amaj9 · B6/9) with airy pads, soft keys through an echo delay, light kick, snap and hats, and gentle bass. The music dips briefly under each kick. The drums drop out for the search typing and the fresh-breath scene. Every scene lasts a whole number of beats, so every scene change lands on a beat and gets a kick. The sound effects are generated in code and timed to the picture.

**Voice-over:** add one with `--props='{"voiceover":"audio/voiceover.mp3"}'`. Music and effects then drop to 30%.

**Code:** the theme lives in `src/editorial/`:
- `copy.ts`: all on-screen text
- `timing.json`: scene durations and transitions
- `ui/`: backdrop, cards, product photos, typography, search bar, phone, isometric objects, lemon slices, tooth
- `transitions.tsx`
- `scenes/` (in script order; the daily-care phone scene and the fresh-breath scene were removed to shorten the ad)

## Theme 04: Futuristic Dental Science × Cinematic Product Motion (`JakubeeFuturistic`)

A dark, high-tech **JAKUBEE toothpaste** film with both editions: **Zesty Lemon** (Blue) and **Herbal Mint** (Green). Like the other themes, it introduces both editions first (01 Zesty Lemon, 02 Herbal Mint), then walks through every line of the Khmer script in 9 chapters, the same structure as the Commercial theme, with both tubes in every product shot and an order CTA at the end. It's in Remotion Studio under the **Futuristic** folder. **25 seconds**, 1080×1920, 60 fps.

```bash
npm run dev                     # Studio → Futuristic / JakubeeFuturistic
npm run render:futuristic       # → out/JAKUBEE_Futuristic_9x16.mp4 (H.264, CRF 16)
npm run still:futuristic        # → out/stills-futuristic/*.png (one frame per chapter)
npm run soundtrack:futuristic   # rebuild public/audio/futuristic-soundtrack.wav (add --cues for the cue sheet)
```

**Look:** obsidian-black sets with soft coloured light pools, a perspective grid, fine scanlines and film grain. Neon green (#A8F044) is used only for graphic accents, while the real tubes keep their own colours: silver, lemon-yellow and cyan for Zesty Lemon, silver and green for Herbal Mint. Elements include a metallic 3D tooth with a neon rim, dark glassmorphism cards, orbiting particles, air trails, water droplets, lemon slices, ice and mint leaves, plus minimal data graphics (a ring indicator, thin pointers and technical labels). The data graphics show no numbers, percentages or lab results. Headlines use kinetic word reveals with tightening letter-spacing and a short, controlled glitch. Each Khmer script line sits in a dark glass caption bar. Its words fade up from a soft blur and are never split or masked.

**Transitions:** controlled glitch (RGB-split slices and scanlines), particle dissolve, blur-to-focus, zoom-through, neon light sweep and a directional push with motion blur.

| # | Start | Narration (script) | Visual | Transition in |
|---|---|---|---|---|
| 01 | 0:00.0 | ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) | Lemon slice turning in the dark, droplets, yellow-green light sweep, the Zesty Lemon tube rises; ZESTY LEMON glitches in, ថ្នាំដុសធ្មេញ below | — |
| 02 | 0:02.5 | ជាប្រភេទថ្នាំដុសធ្មេញ (Herbal Mint) | Herbal Mint: mint leaves drift in the dark, green light sweep, the Herbal Mint tube rises; HERBAL MINT glitches in, ថ្នាំដុសធ្មេញ below | Neon light sweep |
| 03 | 0:05.0 | ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព · ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ | Metallic 3D tooth, orbiting cleansing particles, air trails, glass card សម្អាតធ្មេញ · បំបាត់បញ្ហាក្លិនមាត់ | Particle dissolve |
| 04 | 0:08.0 | ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ · ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Abstract surface spots cleared by a scan line, pointers, ស្នាម ឬ ស្នឹមលឿង | Glitch |
| 05 | 0:11.0 | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Cigarette, tea and coffee glass cards shed stain particles, clean scan, then both tubes | Zoom-through |
| 06 | 0:14.0 | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm · ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ · ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | FLUORIDE, luminous particles gather into a protective ring, ring indicator | Neon light sweep |
| 07 | 0:17.0 | ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ · ជួយថែរក្សាអញ្ចាញធ្មេញ កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់ | Clean, non-graphic gumline under three teeth, green highlight traces it, glass card | Push |
| 08 | 0:20.0 | ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ · ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ | Floating product card: both tubes, អនាម័យមាត់ធ្មេញ, ប្រើប្រាស់ជាប្រចាំថ្ងៃ, a week of tooth icons lighting up | Blur-to-focus |
| 09 | 0:22.0 | ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់ និងជួយឱ្យមាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។ | Lemon and mint environment, droplets, ice, oversized LEMON / MINT behind both tubes, JAKUBEE glitch reveal, Zesty Lemon · Herbal Mint, neon order button កុម្ម៉ង់ឥឡូវនេះ | Neon light sweep |

**Length (25 s):** chapters last 2–3 s (whole beats at 120 BPM). Chapters with a lot of animation play up to 1.35× faster than authored (`speed` in `timing.json`), and the long captions come in earlier so there is time to read them. The chapters follow the Commercial theme: both editions, then the benefits grouped by topic, daily use, and a finale with the order CTA. Every script line from the earlier 14-chapter cut is still on screen. Where chapters were merged, their lines share one caption: clean teeth + fresh breath (03), stains + brightness (04), fluoride + enamel + strong teeth (06), gums + bacteria (07). The script has no line for Herbal Mint alone, so the chapter 02 caption has the same form as chapter 01: ជាប្រភេទថ្នាំដុសធ្មេញ (Herbal Mint). The CTA "កុម្ម៉ង់ឥឡូវនេះ" comes from the Commercial theme, not the script; remove `cta` in `copy.ts` and `NeonCta` in `scenes/F13Finale.tsx` if you don't want it.

**Audio:** an original 120 BPM dark electronic bed (Am9 · Fmaj9 · Cmaj7 · G6) with sub bass, a pulsing filtered saw arp, tight kick/snap/hats and sidechain. Every chapter lasts a whole number of beats (0.5 s), so every cut lands on the beat and gets a kick. The drums thin to hats for the fluoride chapter, the CTA gets a soft pop and click, and the finale resolves on a held chord. A soft riser leads into every cut that has no other lead-in, and quiet particle ticks and shimmers fill the moments when a long caption is being read. The sound effects are synthesised and timed to the animation: glitch accents, digital whooshes, risers, deep impacts, neon sweeps, scanner tones, UI clicks, particle ticks, electronic pulses, water droplets, leaf air and a lemon splash. There is no narration audio in the project. To add one, render with `--props='{"voiceover":"audio/voiceover.mp3"}'`: the music and effects drop to 30% under it.

**Code:** `src/futuristic/`: `ui/Stage.tsx` (sets, grid, scanlines, particles, camera), `ui/Objects.tsx` (the real Zesty Lemon and Herbal Mint tubes on a dark set via `Hero flavour="lemon" | "herbal"`, tooth, cross-section, glass, data graphics, particles), `ui/Type.tsx` (kinetic, glitch, caption), `ui/Frame.tsx`, `transitions.tsx`, `copy.ts` (Khmer from the script), `timing.json`, `scenes/` (F01Intro, F01bHerbal, F02Clean, F03Stains, F06Tartar, F07Fluoride, F09Gums, F12Daily, F13Finale).

## Theme 05: Lavender Editorial × Symbolic 3D Storytelling (`JakubeeLavender`)

A premium editorial film for **JAKUBEE Zesty Lemon** (the hero), with **Herbal Mint** beside it in the product shots. It follows the Khmer script line by line in 13 scenes. It's in Remotion Studio under the **Lavender** folder. **40.5 seconds**, 1080×1920, 60 fps.

```bash
npm run dev                     # Studio → Lavender / JakubeeLavender
npm run render:lavender         # → out/JAKUBEE_Lavender_9x16.mp4 (H.264, CRF 16)
npm run still:lavender          # → out/stills-lavender/*.png (one frame per scene)
npm run soundtrack:lavender     # rebuild public/audio/lavender-soundtrack.wav (add --cues for the cue sheet)
```

**Brief and limits:** the brief asked for a reference video to be studied first. None was supplied, so the look follows the written brief only, and no reference was analysed. There is also no Khmer voice-over in the project; add one with `--props='{"voiceover":"audio/voiceover.mp3"}'` and the music and effects drop to 30% under it. As agreed, on-screen words follow the language rule below (Khmer headlines; Latin only for script words), so the brief's English headlines (CLEAN TEETH, FRESH BREATH, YOUR DAILY ORAL CARE…) are given in Khmer from the script.

**Colours (changed at the client's request):** the brief's lavender and purple were replaced by the product's own colours, so the film matches the tubes: ice white #F3FBFE, pale aqua #CFEFF9, fresh aqua #4FC3E6, deep cyan #0789BF and deep sea navy #123544 for text, with lemon #F7D900, fresh green #D8EF43 and cyan #00BDEB as accents. The component and file names still say "lavender".

**Look:** pale ice-white and aqua gradients with slow, soft aqua organic shapes, a fine editorial grid and light film grain. Latin words from the script (Zesty Lemon, Tartar, Fluoride, Enamel) are set in large italic **DM Serif Display** (OFL, `public/fonts/`); Khmer headlines are bold Kantumruy Pro, never italicised and never split inside a word. Small tracked labels with an aqua rule number each scene. Symbolic objects carry the story: a porcelain 3D tooth sculpture, thin waveform lines, geometric protective layers, an enamel cross-section, a clean gumline, abstract particles, lemon slices, mint leaves, water droplets and a row of minimal silhouettes. The real tubes are used unchanged. The Khmer narration is set as free editorial typography under the visual (a short lemon rule, a bold navy first line, the rest in cyan), with no caption box, like themes 01–03.

**Transitions:** soft aqua haze fade, organic shape wipe, blur-to-focus, soft light sweep, editorial grid wipe and a gentle camera push. No glitches and no spins.

| # | Start | Narration (script) | Visual | Transition in |
|---|---|---|---|---|
| 01 | 0:00.0 | ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) | Lavender opening, a lemon slice turns and drifts aside, the Zesty Lemon tube rises; italic *Zesty Lemon*, ថ្នាំដុសធ្មេញ | — |
| 02 | 0:03.5 | ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព | Porcelain tooth turning slowly, fine grid, cyan/violet waveform lines; សម្អាតធ្មេញ / បំបាត់ក្លិនមាត់ | Organic shape wipe |
| 03 | 0:06.5 | ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ | Abstract yellow stain particles drift off the tooth surface, two callouts; ស្នាម ឬ ស្នឹមលឿង | Blur-to-focus |
| 04 | 0:09.5 | ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | Three rotating geometric protective layers around the tooth; ការពារធ្មេញ ឱ្យរឹងមាំ | Lavender fade |
| 05 | 0:12.0 | ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | White tooth hero, light sweep, delicate sparkles; សស្អាត · រឹងមាំ · ភ្លឺរលោង | Light sweep |
| 06 | 0:14.5 | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Cigarette, tea and coffee cards clear away, both tubes rise; កំណកកំបោរ *Tartar* | Organic shape wipe |
| 07 | 0:18.0 | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm | Luminous particles gather into a ring around the tooth, fine grid; italic *Fluoride*, 1500ppm | Grid wipe |
| 08 | 0:20.5 | ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ | Layered tooth cross-section, the enamel layer lights up, a thin pointer; ស្រទាប់ *Enamel* with a drawn underline | Blur-to-focus |
| 09 | 0:23.5 | ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ | Clean gumline under three teeth, a purple line traces the gum, two info pills | Camera push |
| 10 | 0:26.5 | ជួយថែរក្សាអញ្ចាញធ្មេញ កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់ | Abstract microscopic particles disperse in airflow, both tubes take the frame | Lavender fade |
| 11 | 0:29.5 | ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ | Lemon slices orbit both tubes in depth, cyan waveform, mint leaves, droplets | Organic shape wipe |
| 12 | 0:32.5 | ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ · ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ | Editorial info card with both tubes, a week of checks, a row of minimal silhouettes | Grid wipe |
| 13 | 0:36.0 | ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ… បន្ទាប់ពីដុសធ្មេញរួច។ | Lemon environment, oversized italic *Zesty Lemon* behind both tubes, JAKUBEE logo reveal, *Zesty Lemon · Herbal Mint* | Light sweep |

**Audio:** an original synthesised 120 BPM bed felt in half time (Dmaj9 · Bm11 · Gmaj9 · A6/9) with airy pads, soft felt keys, a bell motif, a soft kick on beat 1 and on every cut, and a light shaker. It builds after the intro, thins for fluoride and enamel, and resolves on a held chord. Sound effects follow the picture: elegant whooshes and reverse swells into transitions, shimmer on light sweeps, grid ticks, soft impacts on product entrances, droplets, airy textures and a cinematic final impact. No reference audio was available, so the sound follows the brief.

**Code:** `src/lavender/`: `theme.ts`, `copy.ts` (Khmer from the script), `timing.json`, `transitions.tsx`, `scenes.tsx` (L01–L13), `ui/Stage.tsx` (lavender stage, organic shapes, grid, camera), `ui/Type.tsx` (serif/Khmer headlines, labels, underline, caption), `ui/Objects.tsx` (tooth sculpture, waveform, protective layers, cross-section, gumline, particles, callouts, silhouettes), `ui/Frame.tsx`.

## Jakubee Toothpaste script (source)

The client script has two parts. The Khmer on screen in all four themes comes from it, word for word.

### 1. JAKUBEE ZESTY LEMON TOOTHPASTE

1. ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)
2. ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព
3. ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ
4. ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ
5. ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន
6. ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ
7. ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm
8. ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ
9. ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ
10. ជួយថែរក្សាអញ្ចាញធ្មេញ កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់
11. ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់
12. ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ
13. ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ
14. ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់ និងជួយឱ្យមាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។

### 2. JAKUBEE Toothpaste (both flavours), corrected

The general list for the brand. It applies to both Zesty Lemon and Herbal Mint. **Every theme shows all 11 lines in full.**

**🦷 JAKUBEE Toothpaste 🦷**

1. ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព
2. ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ
3. ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ
4. ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន
5. ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ
6. ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm
7. ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ
8. ជួយថែរក្សាអញ្ចាញធ្មេញ កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់
9. ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់
10. ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ
11. ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ

**Corrections made to the supplied lists (approved by the client):**

| # | Supplied | Corrected |
|---|---|---|
| 1 | នឹង (as "and") | **និង** |
| 2 | សៀវធ្មេញ | **ស្រៀវធ្មេញ** |
| 3 | ឈាមតាមអញ្ចាញធ្មេញ | ឈាម**ចេញ**តាមអញ្ចាញធ្មេញ |
| 4 | ជួយរក្សាអញ្ចាញធ្មេញ | ជួយ**ថែ**រក្សាអញ្ចាញធ្មេញ |
| 5 | កំណកកំបោរ … តែ កាហ្វេ | កំណកកំបោរ **(Tartar)** … តែ **និង**កាហ្វេ |
| 6 | ឲ្យ / ឱ្យ (mixed) | **ឱ្យ** everywhere |
| 7 | ផ្ដល់, បណ្ដាល, ស័ក្ដិសម | **ផ្ដល់, បណ្ដាល, ស័ក្ដិសម** |
| 8 | លេី (vowels in the wrong order) | **លើ** |
| 9 | ស្នាមរឹសស្នឹម / ស្នាម ឬ ស្នឹម | ស្នាម **ឬ** **ស្នឹម** (លឿង and ប្រឡាក់) |
| 10 | 1500ppn | **1500ppm** (as on the pack) |
| 11 | និងជួយឱ្យ␣មាត់ | និងជួយឱ្យមាត់ (extra space removed) |
| 12 | 125 zero-width spaces | removed |

### How the script is used on screen

**Language rule:** every word on screen is Khmer from the script: headlines, labels, chips, pointers and pack claims, not only the captions. Latin appears only where the script itself uses it: **JAKUBEE**, **Zesty Lemon**, **Tartar**, **Fluoride**, **Enamel** and the number **1500** (ppm). There are two exceptions: the product name **Herbal Mint**, which is printed on the pack but is not in the script, and the Editorial search-bar queries (scene 04), which use free wording as agreed with the client. Khmer in the Latin type styles gets no letter-spacing and a taller line-height, is never split inside a word, and small Khmer labels use a 35% larger face (`Kantumruy Pro Label` in `src/lib/fonts.ts`) so they stay readable.

All four themes use the corrected spelling above, and every theme shows all 11 lines of the JAKUBEE Toothpaste list in full. Themes 01–03 keep their own layouts. Where a slot is small, a line is split between words across a headline and the text below it.

| Script line | Commercial / Cinematic | Editorial | Futuristic |
|---|---|---|---|
| 🦷 JAKUBEE Toothpaste 🦷 (ថ្នាំដុសធ្មេញ JAKUBEE) | 01 | 01, 09 | — |
| 1. ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) | 02 | 02 | 01 (02 uses the same form: ជាប្រភេទថ្នាំដុសធ្មេញ (Herbal Mint)) |
| 2. ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់… | 04 (in full) | 04 | 03 |
| 3. ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង… | 05 | 05 | 04 |
| 4. ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ | 07 | 07 | 06 |
| 5. ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | 05 | 05 | 04 |
| 6. ជួយសម្អាតកំណកកំបោរ (Tartar)… | 06 | 06 | 05 |
| 7. ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm | 07 | 07 | 06 |
| 8. ជួយពង្រឹងស្រទាប់ Enamel… | 07 | 07 | 06 |
| 9. ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ… | 08 | 08 | 07 |
| 10. ជួយថែរក្សាអញ្ចាញធ្មេញ… | 08 | 08 | 07 |
| 11. ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ… | 04 | 03 | 03 |
| 12. ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ | 01, 09 | 01, 09 | 08 |
| 13. ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ | 09 | 09 | 08 |
| 14. ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) ផ្ដល់នូវ… | — | 02 (first half) | 09 |

The Khmer that was not in the script has been replaced: "ថ្នាំដុសធ្មេញ ឥឡូវមាន ២ រសជាតិ", "ក្លិនជីអង្កាមស្រស់", "ថែរក្សាធ្មេញ និងអញ្ចាញធ្មេញ" and "ថ្នាំដុសធ្មេញ JAKUBEE ២ រសជាតិ".

## Product integrity

The product images are the supplied JAKUBEE photos, used unchanged. Components only move, scale, rotate, shadow and light them. All claims come from the packaging: Whitening, Anti-Cavity, Anti-Sensitivity, Anti-Plaque, Fluoride 1500ppm, Tartar Removal, Fresh Breath.