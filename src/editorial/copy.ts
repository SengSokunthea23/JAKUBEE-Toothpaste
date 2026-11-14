// ALL on-screen copy for Theme 03 — JAKUBEE Zesty Lemon + Herbal Mint Toothpaste.
// Khmer lines are taken word-for-word from the client script (spelling as in Theme 04).
// Khmer wherever Khmer exists; the only Latin words are those in the script (JAKUBEE, Zesty Lemon,
// Tartar, Fluoride, Enamel, 1500) plus the Herbal Mint product name.
// No claim appears here that is not in the script or on the packaging.

export const T = {
  intro: {
    eyebrow: 'JAKUBEE Toothpaste',
    en1: 'JAKUBEE',
    en2: 'ថ្នាំដុសធ្មេញ',
    kh1: 'ជួយរក្សាអនាម័យមាត់ធ្មេញ',
    kh2: 'បានល្អ',
  },
  lemon: {
    eyebrow: 'Zesty Lemon',
    title: 'Zesty Lemon',
    kh: 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)',
    kh2: 'ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់',
    chip1: 'Fluoride 1500ppm',
    chip2: 'ក្លិននៃក្រូចឆ្មា',
  },
  clean: {
    // search bar: someone looks for a good toothpaste and finds JAKUBEE (free wording, agreed with the client)
    queries: ['ថ្នាំដុសធ្មេញល្អ', 'ថ្នាំដុសធ្មេញណាល្អបំផុត?', 'JAKUBEE Toothpaste'],
    pills: ['សម្អាតធ្មេញ', 'បំបាត់បញ្ហាក្លិនមាត់'],
    title: 'សម្អាតធ្មេញ',
    kh1: 'ជួយសម្អាតធ្មេញ',
    kh2: 'និងបំបាត់បញ្ហាក្លិនមាត់',
    kh3: 'បានយ៉ាងមានប្រសិទ្ធភាព',
  },
  stains: {
    eyebrow: 'ធ្មេញសស្អាត',
    en: 'ភ្លឺរលោងជាងមុន',
    kh1: 'ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង',
    kh2: 'និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ',
    words: ['សស្អាត', 'រឹងមាំ', 'ភ្លឺរលោង'],
    kh3: 'ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន',
  },
  tartar: {
    eyebrow: 'កំណកកំបោរ (Tartar)',
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
    eyebrow: 'Fluoride  ·  Enamel',
    layers: ['Enamel', 'Fluoride', 'រឹងមាំ'],
    lines: [
      { en: 'បង្ការធ្មេញពុក', kh: 'ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm' },
      { en: 'ស្រទាប់ Enamel', kh: 'ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ' },
      { en: 'ការពារធ្មេញ', kh: 'ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ' },
    ],
  },
  gums: {
    eyebrow: 'ស្រៀវធ្មេញ  ·  អញ្ចាញធ្មេញ',
    kh: 'ជួយថែរក្សាអញ្ចាញធ្មេញ',
    cards: [
      { icon: 'tooth', en: 'ស្រៀវធ្មេញ', kh: 'ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ' },
      { icon: 'drop', en: 'ឈាមចេញ', kh: 'ឈាមចេញតាមអញ្ចាញធ្មេញ' },
      { icon: 'shield', en: 'អញ្ចាញធ្មេញ', kh: 'ជួយថែរក្សាអញ្ចាញធ្មេញ' },
      { icon: 'bacteria', en: 'បាក់តេរី', kh: 'កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់' },
    ] as const,
  },
  // Herbal Mint (Green Edition): uses the general "JAKUBEE Toothpaste" list in the script
  // (it applies to both flavours) plus the text printed on the Herbal pack.
  herbal: {
    eyebrow: 'JAKUBEE',
    title: 'Herbal Mint',
    kh1: 'ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ', // script line 9, in full (fresh mint)
    kh2: 'និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់',
    chip1: 'Fluoride 1500ppm',
    chip2: 'ស្រស់ស្រាយ',
    pack: ['កំណកកំបោរ (Tartar)', 'ខ្យល់ដង្ហើមស្រស់ស្រាយ'], // the claims printed on the Herbal pack, in Khmer
  },
  end: {
    eyebrow: 'JAKUBEE  ·  Zesty Lemon  ·  Herbal Mint',
    kh1: 'ថ្នាំដុសធ្មេញ JAKUBEE',
    kh2: 'ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ',
    kh3: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
    claims: ['ធ្មេញសស្អាត', 'បង្ការធ្មេញពុក', 'ស្រៀវធ្មេញ', 'កំណកកំបោរ'], // the pack claims, in Khmer from the script
    cta: 'កុម្ម៉ង់ឥឡូវនេះ',
  },
};
