# JAKUBEE Toothpaste — Premium Commercial (React + Remotion)

A 9:16 vertical ad (1080×1920, 30 fps, about 55 s) for the Zesty Lemon (Blue Edition) and Herbal Mint (Green Edition) toothpastes. It has Khmer on-screen text, motion graphics and an original soundtrack. Every frame is a React component, rendered to MP4 by [Remotion](https://www.remotion.dev).

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
│   ├── generate_soundtrack.py  rebuilds soundtrack.wav (numpy + scipy)
│   └── render-stills.mjs       renders one PNG per scene for review
├── src/
│   ├── index.ts                Remotion entry (registerRoot)
│   ├── Root.tsx                compositions: full ad, each scene, thumbnail
│   ├── Commercial.tsx          TransitionSeries + audio (optional voice-over)
│   ├── timeline.ts             scene order, durations, transitions ← edit timing here
│   ├── lib/
│   │   ├── copy.ts             ALL text and prices ← edit copy here
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
│   │   ├── DeliveryRoute.tsx   truck + 25-province route animation
│   │   ├── GuaranteeShield.tsx shield with self-drawing check
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
| 01 | 0:00 | Two flavours, one brand | — |
| 02 | 0:04.6 | Zesty Lemon · Blue Edition | Water ripple |
| 03 | 0:09.8 | Herbal Mint · Green Edition | Liquid wave |
| 04 | 0:15.0 | 4 on-pack benefits (glass cards) | Fade |
| 05 | 0:22.0 | Fresh breath · tartar removal (foam) | Fade |
| 06 | 0:26.6 | Choose your flavour (blue vs green split) | Split |
| 07 | 0:31.0 | $5 per tube | Ripple |
| 08 | 0:35.2 | 4 tubes = $20 + free delivery, 25 provinces | Diagonal wipe |
| 09 | 0:41.2 | Wholesale from $26 | Fade |
| 10 | 0:45.4 | Money-back guarantee | Ripple |
| 11 | 0:48.8 | End card + Khmer CTA | Liquid wave |

## Common edits

- **Prices and text:** edit `src/lib/copy.ts`.
- **Timing:** edit `SCENES` in `src/timeline.ts`. If you change it, change the `TIMELINE` list in `scripts/generate_soundtrack.py` to match and run `npm run soundtrack`.
- **Add a Khmer voice-over:** put it at `public/audio/voiceover.mp3`, then render with
  `npx remotion render JakubeeCommercial out/ad.mp4 --props='{"voiceover":"audio/voiceover.mp3"}'`.
  The music drops to 35% automatically. Use `musicVolume` to set it yourself.
- **Brand colours:** edit `src/lib/theme.ts`.

## Cinematic theme (`JakubeeCinematic`)

A second, premium look built from the same products and the same checked Khmer copy. It's in Remotion Studio under the **Cinematic** folder. The original toothpaste ad is unchanged.

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
| 02 | 0:05.0 | Blue Edition: underwater light, ice, droplets | Liquid wipe |
| 03 | 0:10.4 | Macro pan down the real tube, ends on "Fluoride 1500ppm" | Camera push |
| 04 | 0:14.6 | Green Edition: forest light, slow-motion leaves | Blue → green light wash |
| 05 | 0:20.0 | 4 on-pack benefits, light orbit, glass cards | Light sweep |
| 06 | 0:26.6 | Fresh breath and tartar removal, creamy foam | Iris |
| 07 | 0:31.4 | $5 under a spotlight, tubes land | Whip-pan with motion blur |
| 08 | 0:35.8 | 4 tubes = $20, free delivery to 25 provinces | Camera push |
| 09 | 0:41.8 | Wholesale $26 display with depth of field | Liquid wipe |
| 10 | 0:46.2 | Guarantee emblem that draws itself | Iris |
| 11 | 0:50.0 | Hero end card, offers, Khmer CTA | Light sweep |

**Timing:** set scene durations and transitions in `src/cinematic/timing.json`. Both the video and the soundtrack read this file. After changing it, run `npm run soundtrack:cinematic` so the sound effects follow the picture. Add `--cues` to print the timed cue sheet.

**Audio:** an original 100 BPM ambient-pop bed (Amaj9 · F#m9 · Dmaj9 · E6/9) with soft pads, delayed plucks, light kick/clap/hats, and music that dips briefly under each kick. The sound effects are timed to the picture: risers, deep impacts, whooshes, splashes, droplets, shimmer and soft pops. The drums drop out for the macro shot, before the price hit and under the guarantee. Add a voice-over with `--props='{"voiceover":"audio/voiceover.mp3"}'`. Music and effects then drop to 30%.

**Code:** the theme lives in `src/cinematic/`:
- `fx/Stage.tsx`: lighting sets, camera and depth layers, bokeh, film grain
- `fx/HeroProduct.tsx`: studio-lit product with rim light, reflection, focus and light sweep
- `fx/Elements.tsx`: droplets, ice, leaves, foam
- `fx/Type.tsx`: typography
- `fx/Panels.tsx`: glass panels and floating labels
- `transitions.tsx`
- `scenes/`

## Theme 03: Cinematic Editorial × Premium Digital (`JakubeeEditorial`)

A **JAKUBEE toothpaste** ad with both editions: **Zesty Lemon** (Blue) and **Herbal Mint** (Green). Scenes 01–09 follow the Zesty Lemon script below, scene 10 introduces Herbal Mint, and scene 11 shows both together. It uses the real product photos in `public/products/`. It's in Remotion Studio under the **Editorial** folder. 68.5 seconds, 1080×1920, 30 fps.

```bash
npm run dev                     # Studio → Editorial / JakubeeEditorial
npm run render:editorial        # → out/JAKUBEE_Editorial_9x16.mp4
npm run still:editorial         # → out/stills-editorial/*.png (one frame per scene)
npm run soundtrack:editorial    # rebuild public/audio/editorial-soundtrack.wav  (--cues prints the cue sheet)
```

### Storyboard

| # | Start | Script line | Visual and technique | Transition in | Sound |
|---|---|---|---|---|---|
| 01 | 0:00.0 | JAKUBEE ZESTY LEMON TOOTHPASTE · ជាប្រភេទថ្នាំដុសធ្មេញ ប្រហើរក្លិននៃក្រូចឆ្មា | Warm lemon gradient intro, camera pull-back, Zesty Lemon and Herbal Mint tubes in floating cards, geometric pieces lock into place, lemon underline | — | Swell, card whooshes, soft impact, pops, shimmer |
| 02 | 0:06.0 | ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon) | Lemon slices and water beads at several depths, hero tube turns into place, "FLUORIDE 1500PPM" and "FRESH LEMON" label cards | Circle mask | Whoosh, reveal impact, droplets |
| 03 | 0:11.5 | ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់បានយ៉ាងមានប្រសិទ្ធភាព | Search bar types CLEAN TEETH → FRESH BREATH → ZESTY LEMON, then a result card opens | Gradient wipe | Keystrokes, enter click (drums drop to hats) |
| 04 | 0:18.0 | ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង… · ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន | Illustrated tooth: yellow stains fade, a light sweeps the enamel, Khmer keywords highlighted one by one | Floating card | Soft fizz, shine shimmer, highlight clicks |
| 05 | 0:24.5 | ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ | Cigarette, tea and coffee cards float in, a cleansing sweep clears them, the pack is revealed | Camera push | Pops, cleansing whoosh, reveal impact |
| 06 | 0:30.5 | ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride · ពង្រឹងស្រទាប់ Enamel · ការពារធ្មេញឱ្យរឹងមាំ | Three isometric layers build up, the tube lands on top, three benefit panels | Blur-to-focus | Layer thumps, ticks, landing impact, pops |
| 07 | 0:37.0 | សៀវធ្មេញ · ឈាមចេញតាមអញ្ចាញធ្មេញ · ថែរក្សាអញ្ចាញធ្មេញ · បាក់តេរីក្លិនមាត់ | Floating icon ecosystem around the tube, four benefit panels | Floating card | Icon pops, panel pops |
| 08 | 0:44.0 | ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្តល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់ | "Fresh breath" headline, airy breath ribbons, lemon and water, glow halo | Light leak | Swell, air, glow impact, droplets (drums out) |
| 09 | 0:49.5 | ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ · ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ | Floating phone with a week of daily checkmarks, floating chips | Circle mask | Phone whoosh and thump, a tick for each day |
| 10 | 0:55.5 | (Herbal Mint, no script lines) រុក្ខជាតិ · ក្លិនជីអង្កាមស្រស់ | Blue light changes to green, botanical leaves, Herbal tube and pack, "FLUORIDE 1500PPM", "FRESH MINT" and the pack's "TARTAR REMOVAL · FRESH BREATH" | Color morph | Riser, color sweep, shimmer, reveal impact, leaf air, pops |
| 11 | 1:01.5 | ប្រហើរក្លិននៃក្រូចឆ្មា… មាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។ | Geometric finale: Zesty Lemon and Herbal Mint tubes, lemon slice and mint leaf, the four claims printed on both tubes, Khmer CTA | Light leak | Riser, hero impact, shimmer, CTA click, final chord |

**Copy:** all text is in `src/editorial/copy.ts`, taken word for word from the Zesty Lemon script. Please have a native speaker proofread it, especially **សៀវធ្មេញ** (the usual spelling is ស្រៀវធ្មេញ) and **ស្ចឹម**. The English supporting words are short labels that match the script or what's printed on the pack. The closing CTA "កុម្ម៉ង់ឥឡូវនេះ" is not in the script. Remove it in `copy.ts` and `scenes/T10Finale.tsx` if you don't want it. The Herbal Mint scene has no lines in the script, so its Khmer (រុក្ខជាតិ · ក្លិនជីអង្កាមស្រស់) comes from the copy already used in the original ad (`src/lib/copy.ts`), and its English labels are printed on the Herbal pack. There are no prices in this theme, because the script has none.

**Music:** an original 110 BPM bed (Emaj9 · C#m9 · Amaj9 · B6/9) with airy pads, soft keys through an echo delay, light kick, snap and hats, and gentle bass. The music dips briefly under each kick. The drums drop out for the search typing and the fresh-breath scene. The sound effects are generated in code and timed to the picture.

**Voice-over:** add one with `--props='{"voiceover":"audio/voiceover.mp3"}'`. Music and effects then drop to 30%.

**Code:** the theme lives in `src/editorial/`:
- `copy.ts`: all on-screen text
- `timing.json`: scene durations and transitions
- `ui/`: backdrop, cards, product photos, typography, search bar, phone, isometric objects, lemon slices, tooth
- `transitions.tsx`
- `scenes/T01…T11`

### Zesty Lemon script (source)

```
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
```


## Product integrity

The product images are the supplied JAKUBEE photos, used unchanged. Components only move, scale, rotate, shadow and light them. All claims come from the packaging: Whitening, Anti-Cavity, Anti-Sensitivity, Anti-Plaque, Fluoride 1500ppm, Tartar Removal, Fresh Breath.

## My Scripts In Khmer
ហ្វូមJakubee យើងឥឡូវគឺមាន២ពណ៍ណាបងប្អូន។ រាល់ដងបងប្អូនធ្លាប់លាបជាមួយនឹងហ្វូមលាងមុខ Jakubee Blue berry គឺពណ៍ខៀវ បងប្អូនដឹងហើយអត្ថប្រយោជន៍គីល្អខ្លាំងមែនទែន
សាកសមជាមួយបងប្អូនដែលមានស្បែកមុខប្រេងខ្លាំង ឡើងខ្លាញ់ហើយនិងមានមុខមុនតូច មុនធំ មុនអង្កាម មុនកប់សាច់ឬអាសារោលរមាស់ឬដែរបងប្អូនដែលគាត់ជិះក្រោមកម្តៅថ្ងៃហាស ស្បែកមុខគាត់ខ្លោចដោយសារកម្តៅថ្ងៃហើយជាពិសេសបងប្អូនដែរគាត់ស្បែកមុខគាត់មានធូលីដីកាកសំណល់ផ្សេងៗហ្នឹងហាស គឺលាបសម្អាតបានយ៉ាងល្អ ហើយសាច់ហ្វូមគឺល្មួត បងប្អូនដែលគាត់មានស្បែកមុខលក្ខណៈដូចមានមុនតូច មុនធំ មុនអង្កាម អាសារោលអាសាអីហ្នឹងហាសគាត់អាចយកពណ៍ខៀវបាន។ រីឯសម្រាប់កូនពៅទើបចូលស្តុកក្តៅៗហាស លក់ដាច់មែនទែន ពណ៍បៃតងហាសបងប្អូន សម្រាប់ស្បែកមុខគាត់ដែលមានស្បែកមុខស្អួតខ្លាំង ស្អួតបែកក្រហែង ស្អួតបែកស្រកា ជាពិសេសបងប្អូនដែលគាត់ប្រើប្រាស់ផលិតផលជាពិសេសរើសហ្វូមហាស ស្បែកមុខគាត់ហាស បងប្អូនដែលគាត់មានមុខជាំ អាចម៍រុយ ស្បែកមុខដែលគាត់ខ្យោយ skin barrier នៅខាងក្នុង អញ្ចឹងបងប្អូនអាចប្រើជាមួយហ្នឹងហ្វូមលាងមុខពណ៍បៃតងនេះបាន។ សម្រាប់បងប្អូនដែលគាត់អត់មានបញ្ហាអីទេ ប៉ុន្តែគាត់អាសា make up ជារៀងរាល់ថ្ងៃហាស គាត់ក៏អាចជ្រើសរើសជាមួយហ្នឹងពណ៍បៃតងដែរ។ សាច់ហ្វូមគឺពណ៍សដោះគ ពេលដែលបងប្អូនដាក់លាងនៅលើមុខហាសទទួលបានអារម្មណ៍មួយគឺត្រជាក់ហើយកម្ចាត់រាល់បញ្ហាធូលីដីកាកសំណល់ ជាតិកខ្វក់ជាពិសេសគ្រឿង make up ហើយបញអូនពេលដែលលាងហើយលាងទឹកចេញនិយាយពីថាមុខម៉ដ្ឋសទុនរលោងហើយមានសំណើមដូចលាបសេរ៉ូមអញ្ចឹងឡើង glow glass skin តែម្តង។ អញ្ចឹងបងប្អូន២នេះសាកសមជាមួយហ្នឹងស្បែកមុខបងប្អូនមួយណាបងប្អូនអាចយកទៅតម្លៃគឺពិសេសមែនទែន បើបងប្អូនទិញមួយទីបតម្លៃ៥ដុល្លា ពណ៍ខៀវ ពណ៍បៃតងតម្លៃ៥ដុល្លាដូចគ្នាប៉ុន្តែបើបងប្អូនយក២ទីបអត់ free ដឹកទេបងប្អូនយកចាប់ពី៤ទីបទៅ២០ដុល្លា ខ្ញុំមានការfree delivery ២៥ខេត្តក្រុង។ សម្រាប់បងប្អូនដែលគាត់ចង់យកទៅលក់បន្តតាមផ្សារតាមតូបតាមគ្រឿងក្រអូបនានា ចាយត្រឹមតែ២៦ដុល្លាទេបានតម្លៃបោះដុំឬក៏បងប្អូនដែលគាត់ប្រើប្រាស់ជាប្រចាំជាមួយហ្នឹងហ្វូមលាងមុខ Jakubee ហាសពណ៍មួយណាក៏ដោយបងប្អូនអាចយកតម្លៃ២៦ទៅបានតម្លៃបោះដុំ។ សំខាន់ណាស់បងប្អូនហ្វូមលាងមុខពណ៍ខៀងនិងពណ៍បៃតងហាសបងប្អូនយកទៅប្រើប្រាស់អត់បានផលទេជូនលុយបងប្អូនវិញគ្រប់ចំនួនទៀត។