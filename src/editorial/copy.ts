// ALL on-screen copy for Theme 03 — JAKUBEE Zesty Lemon Toothpaste.
// Khmer lines are taken word-for-word from the client script (spelling kept as supplied).
// English lines are short supporting keywords; the four pack claims are printed on the tube.
// No claim appears here that is not in the script or on the packaging.

export const T = {
  intro: {
    eyebrow: 'JAKUBEE  ·  ORAL CARE',
    en1: 'ZESTY LEMON',
    en2: 'TOOTHPASTE',
    kh1: 'ជាប្រភេទថ្នាំដុសធ្មេញ',
    kh2: 'ប្រហើរក្លិននៃក្រូចឆ្មា',
  },
  lemon: {
    eyebrow: 'ZESTY LEMON',
    title: 'Zesty Lemon',
    kh: 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)',
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
      { icon: 'tooth', en: 'ANTI-SENSITIVITY', kh: 'ជួយកាត់បន្ថយបញ្ហាសៀវធ្មេញ' },
      { icon: 'drop', en: 'GUM BLEEDING', kh: 'ឈាមចេញតាមអញ្ចាញធ្មេញ' },
      { icon: 'shield', en: 'GUM CARE', kh: 'ជួយថែរក្សាអញ្ចាញធ្មេញ' },
      { icon: 'bacteria', en: 'BAD-BREATH BACTERIA', kh: 'កាត់បន្ថយបាក់តេរីដែលបណ្តាលឱ្យមានក្លិនមាត់' },
    ] as const,
  },
  breath: {
    line1: 'Fresh',
    line2: 'breath',
    kh1: 'ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ',
    kh2: 'និងផ្តល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់',
  },
  daily: {
    eyebrow: 'EVERY DAY',
    kh1: 'ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ',
    kh2: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    en: 'DAILY ORAL CARE',
  },
  end: {
    eyebrow: 'JAKUBEE  ·  ZESTY LEMON TOOTHPASTE',
    kh1: 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)',
    kh2: 'ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់',
    kh3: 'និងជួយឱ្យ មាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។',
    claims: ['WHITENING', 'ANTI-CAVITY', 'ANTI-SENSITIVITY', 'ANTI-PLAQUE'], // printed on the tube
    cta: 'កុម្ម៉ង់ឥឡូវនេះ',
  },
};
