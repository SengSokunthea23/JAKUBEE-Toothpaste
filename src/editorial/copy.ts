// ALL on-screen copy for Theme 03 — JAKUBEE Zesty Lemon + Herbal Mint Toothpaste.
// Khmer lines are taken word-for-word from the client script (spelling kept as supplied).
// English lines are short supporting keywords; the four pack claims are printed on the tube.
// No claim appears here that is not in the script or on the packaging.

export const T = {
  intro: {
    eyebrow: 'JAKUBEE  ·  ORAL CARE',
    en1: 'JAKUBEE',
    en2: 'TOOTHPASTE',
    kh1: 'ថ្នាំដុសធ្មេញ ឥឡូវមាន',
    kh2: '២ រសជាតិ',
  },
  lemon: {
    eyebrow: 'ZESTY LEMON',
    title: 'Zesty Lemon',
    kh: 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)',
    kh2: 'ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់',
    chip1: 'FLUORIDE 1500PPM',
    chip2: 'FRESH LEMON',
  },
  clean: {
    queries: ['CLEAN TEETH', 'FRESH BREATH', 'ZESTY LEMON'],
    title: 'Clean & fresh',
    kh1: 'ជួយសម្អាតធ្មេញ',
    kh2: 'និងបំបាត់បញ្ហាក្លិនមាត់',
    kh3: 'បានយ៉ាងមានប្រសិទ្ធភាព',
  },
  stains: {
    eyebrow: 'WHITENING',
    en: 'Brighter smile',
    kh1: 'ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង',
    kh2: 'និងស្នាម ឬស្ចឹមប្រឡាក់លើផ្ទៃធ្មេញ',
    words: ['សស្អាត', 'រឹងមាំ', 'ភ្លឺរលោង'],
    kh3: 'ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន',
  },
  tartar: {
    eyebrow: 'TARTAR REMOVAL',
    kh1: 'ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ',
    kh2: 'ដែលបង្កពីបារី តែ និងកាហ្វេ',
    kh3: 'បានស្អាតល្អ',
    causes: [
      { icon: 'cigarette', en: 'CIGARETTES', kh: 'បារី' },
      { icon: 'tea', en: 'TEA', kh: 'តែ' },
      { icon: 'coffee', en: 'COFFEE', kh: 'កាហ្វេ' },
    ] as const,
  },
  strong: {
    eyebrow: 'FLUORIDE  ·  ENAMEL',
    layers: ['ENAMEL', 'FLUORIDE', 'STRONG TEETH'],
    lines: [
      { en: 'ANTI-CAVITY', kh: 'ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride' },
      { en: 'ENAMEL', kh: 'ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ' },
      { en: 'STRONG TEETH', kh: 'ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ' },
    ],
  },
  gums: {
    eyebrow: 'SENSITIVITY  ·  GUMS',
    kh: 'ថែរក្សាធ្មេញ និងអញ្ចាញធ្មេញ',
    cards: [
      { icon: 'tooth', en: 'ANTI-SENSITIVITY', kh: 'ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ' },
      { icon: 'drop', en: 'GUM BLEEDING', kh: 'ឈាមចេញតាមអញ្ចាញធ្មេញ' },
      { icon: 'shield', en: 'GUM CARE', kh: 'ជួយថែរក្សាអញ្ចាញធ្មេញ' },
      { icon: 'bacteria', en: 'BAD-BREATH BACTERIA', kh: 'កាត់បន្ថយបាក់តេរីដែលបណ្តាលឱ្យមានក្លិនមាត់' },
    ] as const,
  },
  // Herbal Mint (Green Edition): uses the general "JAKUBEE Toothpaste" list in the script
  // (it applies to both flavours) plus the text printed on the Herbal pack.
  herbal: {
    eyebrow: 'VARIANT 02  ·  GREEN EDITION',
    title: 'Herbal Mint',
    kh1: 'ក្លិនជីអង្កាមស្រស់',
    kh2: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
    chip1: 'FLUORIDE 1500PPM',
    chip2: 'FRESH MINT',
    pack: ['TARTAR REMOVAL', 'FRESH BREATH'], // printed on the Herbal pack
  },
  end: {
    eyebrow: 'JAKUBEE  ·  ZESTY LEMON  ·  HERBAL MINT',
    kh1: 'ថ្នាំដុសធ្មេញ JAKUBEE ២ រសជាតិ',
    kh2: 'ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ',
    kh3: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
    claims: ['WHITENING', 'ANTI-CAVITY', 'ANTI-SENSITIVITY', 'ANTI-PLAQUE'], // printed on both tubes
    cta: 'កុម្ម៉ង់ឥឡូវនេះ',
  },
};
