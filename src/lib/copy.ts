// ALL on-screen copy for the Commercial and Cinematic themes — edit text in one place.
// Source: "Jakubee Toothpaste script (source)" in README.md. Khmer wherever Khmer exists; the only Latin
// words are those in the script (JAKUBEE, Zesty Lemon, Tartar, Fluoride, Enamel, 1500) plus the Herbal Mint product name.
// No prices, bundles, delivery, wholesale or guarantee offers (none are in the script).

export const COPY = {
  intro: {
    label: 'JAKUBEE Toothpaste',
    line1: 'ថ្នាំដុសធ្មេញ',
    line2: 'JAKUBEE',
    kh: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
  },
  lemon: {
    label: 'JAKUBEE',
    title1: 'ZESTY',
    title2: 'LEMON',
    kh: ['ជាប្រភេទថ្នាំដុសធ្មេញ', 'ប្រហើរក្លិននៃក្រូចឆ្មា'], // script: ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)
    khShort: ['ថ្នាំដុសធ្មេញ', 'ប្រហើរក្លិននៃក្រូចឆ្មា'], // Cinematic: shorter excerpt so it clears the tube
    callouts: [
      { big: '1500', small: 'ppm Fluoride' },
      { big: 'ស្រស់ស្រាយ', small: 'ខ្យល់ដង្ហើម' },
    ],
  },
  herbal: {
    label: 'JAKUBEE',
    title1: 'HERBAL',
    title2: 'MINT',
    kh: ['ថ្នាំដុសធ្មេញ', 'ជួយសម្អាតធ្មេញ'], // script: ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់…
    callouts: [
      { big: '1500', small: 'ppm Fluoride' },
      { big: 'ស្រស់ស្រាយ', small: 'ខ្យល់ដង្ហើម' },
    ],
  },
  fresh: {
    line1: 'ខ្យល់ដង្ហើម',
    line2: 'ស្រស់ស្រាយ',
    kh: 'ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់', // script line 9, in full
    pillEn: 'ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់', // script line 1, in full (with pillKh)
    pillKh: 'បានយ៉ាងមានប្រសិទ្ធភាព',
  },
  whitening: {
    label: 'ធ្មេញសស្អាត',
    en: 'ភ្លឺរលោង',
    kh1: 'ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង',
    kh2: 'និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ',
    kh3: 'ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន',
  },
  tartar: {
    label: 'កំណកកំបោរ (Tartar)',
    kh1: 'ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ',
    kh2: 'ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ',
    causes: [
      { icon: 'cigarette', en: 'CIGARETTES', kh: 'បារី' },
      { icon: 'tea', en: 'TEA', kh: 'តែ' },
      { icon: 'coffee', en: 'COFFEE', kh: 'កាហ្វេ' },
    ] as const,
  },
  strong: {
    label: 'សារធាតុ Fluoride',
    big: '1500',
    small: 'ppm Fluoride',
    lines: [
      { en: 'បង្ការធ្មេញពុក', kh: 'ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm' },
      { en: 'ស្រទាប់ Enamel', kh: 'ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ' },
      { en: 'ការពារធ្មេញ', kh: 'ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ' },
    ],
  },
  gums: {
    label: 'ស្រៀវធ្មេញ  ·  អញ្ចាញធ្មេញ',
    kh1: 'ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ',
    kh2: 'ឈាមចេញតាមអញ្ចាញធ្មេញ',
    kh3: 'ជួយថែរក្សាអញ្ចាញធ្មេញ',
    kh4: 'កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់',
  },
  end: {
    label: 'JAKUBEE Toothpaste',
    kh: 'ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ',
    en: 'សុខភាពធ្មេញ',
    hygiene: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
    claims: ['ធ្មេញសស្អាត', 'បង្ការធ្មេញពុក', 'ស្រៀវធ្មេញ', 'កំណកកំបោរ'], // the pack claims, in Khmer from the script
    cta: 'កុម្ម៉ង់ឥឡូវនេះ',
  },
};
