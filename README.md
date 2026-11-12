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

The facial foam film (Blueberry and Green Facial Foam). Its scene order and on-screen Khmer come from **My Scripts In Khmer** below. It's in Remotion Studio under the **Editorial** folder. 82 seconds, 1080×1920, 30 fps.

```bash
npm run dev                     # Studio → Editorial / JakubeeEditorial
npm run render:editorial        # → out/JAKUBEE_Editorial_9x16.mp4
npm run still:editorial         # → out/stills-editorial/*.png (one frame per scene)
npm run soundtrack:editorial    # rebuild public/audio/editorial-soundtrack.wav  (--cues prints the cue sheet)
```

### Adding the facial foam photos (required before the final render)

The two product photos aren't in the project yet. Until they are, every scene shows a clearly marked **PRODUCT IMAGE** slot. It is never toothpaste and never invented packaging. To add them:

1. Put transparent PNG cut-outs in `public/products/`, for example `foam-blueberry.png` and `foam-green.png`.
2. In `src/editorial/assets.ts`, set `file` for each edition, and set `aspect` to the image's width ÷ height.

Every scene then uses the real photos automatically.

### Storyboard

| # | Start | Script (Khmer narration) | Visual and technique | Transition in | Sound |
|---|---|---|---|---|---|
| 01 | 0:00.0 | ហ្វូមលាងមុខ Jakubee ឥឡូវមាន ២ ពណ៌ | Warm blurred-gradient intro, camera pull-back, two floating product cards, geometric pieces lock into place, green underline under "២ ពណ៌" | — | Swell, card whooshes, soft impact, pops, shimmer |
| 02 | 0:05.5 | Blueberry · ពណ៌ខៀវ · អត្ថប្រយោជន៍ល្អខ្លាំង | Blue light, blueberries and water beads at several depths, product turns into place, floating label cards | Circle mask | Whoosh, reveal impact, droplets |
| 03 | 0:11.0 | ស្បែកមុខប្រេងខ្លាំង · មុនតូច មុនធំ មុនអង្កាម មុនកប់សាច់ · អាសារោលរមាស់ · ខ្លោចដោយសារកម្តៅថ្ងៃ | Keywords highlighted one by one, four benefit panels with icons | Floating card | Clicks on each keyword, panel pops |
| 04 | 0:18.0 | ធូលីដី កាកសំណល់ · សម្អាតបានយ៉ាងល្អ · សាច់ហ្វូមល្មួត | Search bar types SKINCARE → FRESHNESS → DAILY CLEANSING, then a result card opens | Gradient wipe | Keystrokes, enter click, bubbles (drums drop to hats) |
| 05 | 0:24.0 | កូនពៅ ទើបចូលស្តុក · លក់ដាច់មែនទែន · ពណ៌បៃតង | Blue light changes to green, botanical leaves, "NEW IN STOCK" badge with a live dot | Color morph | Riser, sweep, shimmer, leaf air |
| 06 | 0:29.5 | ស្បែកស្អួតខ្លាំង · ស្អួតបែកក្រហែង / ស្រកា · មុខជាំ អាចម៍រុយ · skin barrier ខ្សោយ | Water ripples spread out from the product, four benefit panels | Floating card | Ripple drops, panel pops |
| 07 | 0:36.0 | អត់មានបញ្ហា តែ make up ជារៀងរាល់ថ្ងៃ → ក៏អាចជ្រើសរើសពណ៌បៃតងដែរ | A floating phone plays the green edition, with floating chips | Blur-to-focus | Phone whoosh and thump, pops |
| 08 | 0:42.0 | សាច់ហ្វូមពណ៌សដោះគោ · អារម្មណ៍ត្រជាក់ · កម្ចាត់ធូលីដី ជាតិកខ្វក់ គ្រឿង make up | Macro foam bank and bubbles, three foam panels | Camera push | Bubble texture, pops |
| 09 | 0:47.5 | មុខម៉ដ្ឋ ស ទន់រលោង · មានសំណើមដូចលាបសេរ៉ូម · glow glass skin | Large editorial headline, glow halo, warm light | Light leak | Swell, glow impact, sparkle (drums out) |
| 10 | 0:52.5 | ទិញ ១ ទីប $5 · ពណ៌ខៀវ ពណ៌បៃតង តម្លៃដូចគ្នា | Blue / green split screen, $5 on each side | Split reveal | Two panel whooshes, two price impacts (panned left and right) |
| 11 | 0:58.0 | ២ ទីប មិនមានដឹកឥតគិតថ្លៃ · ចាប់ពី ៤ ទីប $20 · ដឹកជញ្ជូនឥតគិតថ្លៃ ២៥ ខេត្តក្រុង | Four tube cards, $20, province counter, delivery condition shown | Floating card | Rising pops, price impact, counter ticks |
| 12 | 1:04.5 | ចង់យកទៅលក់បន្ត? តាមផ្សារ តាមតូប ហាងគ្រឿងក្រអូប · ចាយត្រឹមតែ $26 បានតម្លៃបោះដុំ | Isometric pedestals rise, products land on them, berry and leaf props | Gradient wipe | Thumps, droplets, clicks, price impact |
| 13 | 1:10.5 | ប្រើហើយមិនបានផល ជូនលុយវិញគ្រប់ចំនួន | Guarantee card, shield and check draw themselves | Circle mask | Ring swell, chime (drums out) |
| 14 | 1:15.5 | Offers recap + កុម្ម៉ង់ឥឡូវនេះ | Geometric shapes assemble around both editions, offer chips, CTA button | Light leak | Riser, hero impact, shimmer, CTA click, final chord |

**Music:** an original 110 BPM bed (Emaj9 · C#m9 · Amaj9 · B6/9) with airy pads, soft keys through an echo delay, light kick, snap and hats, and gentle bass. The music dips briefly under each kick. The drums drop out for the search typing, the glow scene and the guarantee. The sound effects are generated in code: UI clicks, keystrokes, card whooshes, droplets, bubbles, price impacts and shimmer.

**Voice-over:** add one with `--props='{"voiceover":"audio/voiceover.mp3"}'`. Music and effects then drop to 30%.

**Copy:** all text is in `src/editorial/copy.ts`. I normalized some spellings from the spoken script: ពណ៍ → ពណ៌, ខ្យោយ → ខ្សោយ, សដោះគ → សដោះគោ, ម៉ដ្ឋសទុន → ម៉ដ្ឋ ស ទន់. Colloquial terms such as អាសារោលរមាស់ are kept exactly as spoken. Please have a native speaker proofread this file before the final render.

**Code:** the theme lives in `src/editorial/`:
- `assets.ts`: product photos
- `copy.ts`: all on-screen text
- `timing.json`: scene durations and transitions
- `ui/`: backdrop, cards, foam product, typography, search bar, phone, isometric objects
- `transitions.tsx`
- `scenes/`

## Product integrity

The product images are the supplied JAKUBEE photos, used unchanged. Components only move, scale, rotate, shadow and light them. All claims come from the packaging: Whitening, Anti-Cavity, Anti-Sensitivity, Anti-Plaque, Fluoride 1500ppm, Tartar Removal, Fresh Breath.

## My Scripts In Khmer
ហ្វូមJakubee យើងឥឡូវគឺមាន២ពណ៍ណាបងប្អូន។ រាល់ដងបងប្អូនធ្លាប់លាបជាមួយនឹងហ្វូមលាងមុខ Jakubee Blue berry គឺពណ៍ខៀវ បងប្អូនដឹងហើយអត្ថប្រយោជន៍គីល្អខ្លាំងមែនទែន
សាកសមជាមួយបងប្អូនដែលមានស្បែកមុខប្រេងខ្លាំង ឡើងខ្លាញ់ហើយនិងមានមុខមុនតូច មុនធំ មុនអង្កាម មុនកប់សាច់ឬអាសារោលរមាស់ឬដែរបងប្អូនដែលគាត់ជិះក្រោមកម្តៅថ្ងៃហាស ស្បែកមុខគាត់ខ្លោចដោយសារកម្តៅថ្ងៃហើយជាពិសេសបងប្អូនដែរគាត់ស្បែកមុខគាត់មានធូលីដីកាកសំណល់ផ្សេងៗហ្នឹងហាស គឺលាបសម្អាតបានយ៉ាងល្អ ហើយសាច់ហ្វូមគឺល្មួត បងប្អូនដែលគាត់មានស្បែកមុខលក្ខណៈដូចមានមុនតូច មុនធំ មុនអង្កាម អាសារោលអាសាអីហ្នឹងហាសគាត់អាចយកពណ៍ខៀវបាន។ រីឯសម្រាប់កូនពៅទើបចូលស្តុកក្តៅៗហាស លក់ដាច់មែនទែន ពណ៍បៃតងហាសបងប្អូន សម្រាប់ស្បែកមុខគាត់ដែលមានស្បែកមុខស្អួតខ្លាំង ស្អួតបែកក្រហែង ស្អួតបែកស្រកា ជាពិសេសបងប្អូនដែលគាត់ប្រើប្រាស់ផលិតផលជាពិសេសរើសហ្វូមហាស ស្បែកមុខគាត់ហាស បងប្អូនដែលគាត់មានមុខជាំ អាចម៍រុយ ស្បែកមុខដែលគាត់ខ្យោយ skin barrier នៅខាងក្នុង អញ្ចឹងបងប្អូនអាចប្រើជាមួយហ្នឹងហ្វូមលាងមុខពណ៍បៃតងនេះបាន។ សម្រាប់បងប្អូនដែលគាត់អត់មានបញ្ហាអីទេ ប៉ុន្តែគាត់អាសា make up ជារៀងរាល់ថ្ងៃហាស គាត់ក៏អាចជ្រើសរើសជាមួយហ្នឹងពណ៍បៃតងដែរ។ សាច់ហ្វូមគឺពណ៍សដោះគ ពេលដែលបងប្អូនដាក់លាងនៅលើមុខហាសទទួលបានអារម្មណ៍មួយគឺត្រជាក់ហើយកម្ចាត់រាល់បញ្ហាធូលីដីកាកសំណល់ ជាតិកខ្វក់ជាពិសេសគ្រឿង make up ហើយបញអូនពេលដែលលាងហើយលាងទឹកចេញនិយាយពីថាមុខម៉ដ្ឋសទុនរលោងហើយមានសំណើមដូចលាបសេរ៉ូមអញ្ចឹងឡើង glow glass skin តែម្តង។ អញ្ចឹងបងប្អូន២នេះសាកសមជាមួយហ្នឹងស្បែកមុខបងប្អូនមួយណាបងប្អូនអាចយកទៅតម្លៃគឺពិសេសមែនទែន បើបងប្អូនទិញមួយទីបតម្លៃ៥ដុល្លា ពណ៍ខៀវ ពណ៍បៃតងតម្លៃ៥ដុល្លាដូចគ្នាប៉ុន្តែបើបងប្អូនយក២ទីបអត់ free ដឹកទេបងប្អូនយកចាប់ពី៤ទីបទៅ២០ដុល្លា ខ្ញុំមានការfree delivery ២៥ខេត្តក្រុង។ សម្រាប់បងប្អូនដែលគាត់ចង់យកទៅលក់បន្តតាមផ្សារតាមតូបតាមគ្រឿងក្រអូបនានា ចាយត្រឹមតែ២៦ដុល្លាទេបានតម្លៃបោះដុំឬក៏បងប្អូនដែលគាត់ប្រើប្រាស់ជាប្រចាំជាមួយហ្នឹងហ្វូមលាងមុខ Jakubee ហាសពណ៍មួយណាក៏ដោយបងប្អូនអាចយកតម្លៃ២៦ទៅបានតម្លៃបោះដុំ។ សំខាន់ណាស់បងប្អូនហ្វូមលាងមុខពណ៍ខៀងនិងពណ៍បៃតងហាសបងប្អូនយកទៅប្រើប្រាស់អត់បានផលទេជូនលុយបងប្អូនវិញគ្រប់ចំនួនទៀត។