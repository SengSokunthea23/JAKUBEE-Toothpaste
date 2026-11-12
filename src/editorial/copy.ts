// ALL on-screen copy for Theme 03, taken from "My Scripts In Khmer" in README.md.
// Khmer phrases are lifted from the narration (spelling normalised, e.g. ពណ៍ → ពណ៌,
// ខ្យោយ → ខ្សោយ, សដោះគ → សដោះគោ). English lines are short supporting keywords only.
// No claim appears here that is not spoken in the script.

export const OFFER = {
  price1: '$5',
  bundle: '$20',
  wholesale: '$26',
  provinces: 25,
};

export const T = {
  intro: {
    eyebrow: 'JAKUBEE  ·  FACIAL FOAM',
    kh1: 'ហ្វូមលាងមុខ Jakubee',
    kh2: 'ឥឡូវមាន ២ ពណ៌',
    hl: '២ ពណ៌',
    en: 'TWO EDITIONS',
    blue: 'BLUEBERRY',
    green: 'GREEN',
  },
  blue: {
    eyebrow: 'EDITION 01  ·  BLUE',
    title: 'Blueberry',
    kh: 'ហ្វូមលាងមុខ Jakubee Blueberry',
    tag: 'ពណ៌ខៀវ',
    note: 'អត្ថប្រយោជន៍ល្អខ្លាំង',
  },
  oily: {
    eyebrow: 'SUITABLE FOR',
    kh: 'សាកសមជាមួយ',
    words: ['OILY SKIN', 'ACNE', 'SUN-EXPOSED SKIN'],
    cards: [
      { icon: 'drop', en: 'VERY OILY SKIN', kh: 'ស្បែកមុខប្រេងខ្លាំង ឡើងខ្លាញ់' },
      { icon: 'dot', en: 'ACNE', kh: 'មុនតូច · មុនធំ · មុនអង្កាម · មុនកប់សាច់' },
      { icon: 'spark', en: 'ITCHY SKIN', kh: 'អាសារោលរមាស់' },
      { icon: 'sun', en: 'SUN-EXPOSED SKIN', kh: 'ស្បែកមុខខ្លោចដោយសារកម្តៅថ្ងៃ' },
    ] as const,
  },
  clean: {
    queries: ['SKINCARE', 'FRESHNESS', 'DAILY CLEANSING'],
    title: 'Deep clean',
    kh1: 'ធូលីដី កាកសំណល់ផ្សេងៗ',
    kh2: 'សម្អាតបានយ៉ាងល្អ',
    chip: 'សាច់ហ្វូមល្មួត',
    chipEn: 'SMOOTH FOAM',
  },
  green: {
    eyebrow: 'EDITION 02  ·  GREEN',
    title: 'Green',
    badge: 'NEW IN STOCK',
    badgeKh: 'កូនពៅ ទើបចូលស្តុក',
    hot: 'លក់ដាច់មែនទែន',
    tag: 'ពណ៌បៃតង',
  },
  dry: {
    eyebrow: 'SUITABLE FOR',
    kh: 'សាកសមជាមួយ',
    cards: [
      { icon: 'drop', en: 'VERY DRY SKIN', kh: 'ស្បែកមុខស្អួតខ្លាំង' },
      { icon: 'crack', en: 'CRACKED · FLAKY', kh: 'ស្អួតបែកក្រហែង · ស្អួតបែកស្រកា' },
      { icon: 'dot', en: 'DARK SPOTS · FRECKLES', kh: 'មុខជាំ · អាចម៍រុយ' },
      { icon: 'shield', en: 'WEAK SKIN BARRIER', kh: 'Skin barrier ខ្សោយ' },
    ] as const,
  },
  makeup: {
    eyebrow: 'EVERY DAY',
    en: 'DAILY MAKEUP',
    kh1: 'អត់មានបញ្ហាស្បែក',
    kh2: 'តែ make up ជារៀងរាល់ថ្ងៃ',
    kh3: 'ក៏អាចជ្រើសរើសពណ៌បៃតងដែរ',
    foam: [
      { en: 'MILKY WHITE', kh: 'សាច់ហ្វូមពណ៌សដោះគោ' },
      { en: 'COOL FEELING', kh: 'អារម្មណ៍ត្រជាក់' },
      { en: 'REMOVES MAKEUP', kh: 'កម្ចាត់ធូលីដី ជាតិកខ្វក់ គ្រឿង make up' },
    ],
  },
  glow: {
    line1: 'Glow',
    line2: 'glass skin',
    kh1: 'មុខម៉ដ្ឋ ស ទន់រលោង',
    kh2: 'មានសំណើមដូចលាបសេរ៉ូម',
  },
  price: {
    eyebrow: 'SPECIAL PRICE',
    kh: 'តម្លៃពិសេសមែនទែន',
    each: 'ទិញ ១ ទីប',
    same: 'ពណ៌ខៀវ ពណ៌បៃតង តម្លៃដូចគ្នា',
  },
  bundle: {
    eyebrow: 'BUNDLE OFFER',
    kh: 'ចាប់ពី ៤ ទីប',
    tubes: '4 TUBES',
    delivery: 'ដឹកជញ្ជូនឥតគិតថ្លៃ ២៥ ខេត្តក្រុង',
    deliveryEn: 'FREE DELIVERY',
    condition: 'ទិញ ២ ទីប មិនមានដឹកជញ្ជូនឥតគិតថ្លៃ',
  },
  wholesale: {
    eyebrow: 'WHOLESALE',
    kh: 'ចង់យកទៅលក់បន្ត?',
    places: ['តាមផ្សារ', 'តាមតូប', 'ហាងគ្រឿងក្រអូប'],
    deal: 'ចាយត្រឹមតែ',
    dealAfter: 'បានតម្លៃបោះដុំ',
    any: 'ពណ៌មួយណាក៏បាន · សម្រាប់អ្នកប្រើប្រាស់ជាប្រចាំផងដែរ',
  },
  guarantee: {
    eyebrow: 'FULL REFUND GUARANTEE',
    kh1: 'ប្រើហើយមិនបានផល',
    kh2: 'ជូនលុយវិញគ្រប់ចំនួន',
    sub: 'ហ្វូមលាងមុខ ពណ៌ខៀវ និង ពណ៌បៃតង',
  },
  end: {
    eyebrow: 'JAKUBEE  ·  FACIAL FOAM',
    kh: 'កុម្ម៉ង់ឥឡូវនេះ',
    en: 'ORDER NOW',
    chips: ['១ ទីប $5', '៤ ទីប $20', 'លក់ដុំ $26'],
    delivery: 'ចាប់ពី ៤ ទីប · ដឹកជញ្ជូនឥតគិតថ្លៃ ២៥ ខេត្តក្រុង',
    cta: 'ផ្ញើសារមកកាន់យើងឥឡូវនេះ',
  },
};
