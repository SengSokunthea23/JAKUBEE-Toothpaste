// ALL on-screen copy for the Commercial and Cinematic themes — edit text in one place.
// Source: "Jakubee Toothpaste script (source)" in README.md, plus the text printed on the packs.
// No prices, bundles, delivery, wholesale or guarantee offers (none are in the script).

export const COPY = {
  intro: {
    label: 'JAKUBEE  ·  ORAL CARE',
    line1: 'TWO FLAVOURS.',
    line2: 'ONE BRAND.',
    kh: 'ថ្នាំដុសធ្មេញ ឥឡូវមាន ២ រសជាតិ',
  },
  lemon: {
    label: 'VARIANT 01  ·  BLUE EDITION',
    title1: 'ZESTY',
    title2: 'LEMON',
    kh: ['ថ្នាំដុសធ្មេញ', 'ប្រហើរក្លិននៃក្រូចឆ្មា'], // script: ជាប្រភេទថ្នាំដុសធ្មេញប្រហើរក្លិននៃក្រូចឆ្មា
    callouts: [
      { big: '1500', small: 'PPM FLUORIDE' },
      { big: 'FRESH', small: 'LEMON' },
    ],
  },
  herbal: {
    label: 'VARIANT 02  ·  GREEN EDITION',
    title1: 'HERBAL',
    title2: 'MINT',
    kh: ['ថ្នាំដុសធ្មេញ', 'ក្លិនជីអង្កាមស្រស់'],
    callouts: [
      { big: '1500', small: 'PPM FLUORIDE' },
      { big: 'FRESH', small: 'MINT' },
    ],
  },
  fresh: {
    line1: 'FRESH',
    line2: 'BREATH',
    kh: 'ជួយឲ្យខ្យល់ដង្ហើមស្រស់ស្រាយ',
    pillEn: 'CLEAN TEETH',
    pillKh: 'ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់',
  },
  whitening: {
    label: 'WHITENING',
    en: 'BRIGHTER',
    kh1: 'ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង',
    kh2: 'និងស្នាម ឬស្ចឹមប្រឡាក់លើផ្ទៃធ្មេញ',
    kh3: 'ជួយឲ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន',
  },
  tartar: {
    label: 'TARTAR REMOVAL',
    kh1: 'ជួយសម្អាតកំណកកំបោរធ្មេញ',
    kh2: 'ដែលបង្កពីបារី តែ កាហ្វេ បានស្អាតល្អ',
    causes: [
      { icon: 'cigarette', en: 'CIGARETTES', kh: 'បារី' },
      { icon: 'tea', en: 'TEA', kh: 'តែ' },
      { icon: 'coffee', en: 'COFFEE', kh: 'កាហ្វេ' },
    ] as const,
  },
  strong: {
    label: 'FLUORIDE 1500PPM',
    big: '1500',
    small: 'PPM FLUORIDE',
    lines: [
      { en: 'ANTI-CAVITY', kh: 'ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride' },
      { en: 'ENAMEL', kh: 'ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ' },
      { en: 'STRONG TEETH', kh: 'ជួយថែរក្សា និងការពារធ្មេញឲ្យរឹងមាំ' },
    ],
  },
  gums: {
    label: 'SENSITIVITY  ·  GUMS',
    kh1: 'ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ',
    kh2: 'ឈាមតាមអញ្ចាញធ្មេញ',
    kh3: 'ជួយរក្សាអញ្ចាញធ្មេញ',
    kh4: 'កាត់បន្ថយបាក់តេរីដែលបណ្តាលឲ្យមានក្លិនមាត់',
  },
  end: {
    label: 'JAKUBEE  ·  ORAL CARE',
    kh: 'ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ',
    en: 'DAILY ORAL CARE',
    hygiene: 'ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ',
    claims: ['WHITENING', 'ANTI-CAVITY', 'ANTI-SENSITIVITY', 'ANTI-PLAQUE'], // printed on both tubes
    cta: 'កុម្ម៉ង់ឥឡូវនេះ',
  },
};
