// Theme 04 on-screen copy. Khmer narration is taken word for word from
// "Jakubee Toothpaste script (source)" in README.md, in script order; it is only broken into
// lines between words. English headlines follow the Theme 04 brief. No numbers, percentages or lab claims.

export const FUT = {
  intro: {
    label: 'JAKUBEE · ORAL CARE',
    en: 'ZESTY LEMON',
    sub: 'TOOTHPASTE',
    kh: ['ជាប្រភេទថ្នាំដុសធ្មេញ', 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)'],
  },
  clean: {
    label: 'CLEAN · FRESH',
    en: 'CLEAN TEETH',
    en2: 'FRESH BREATH',
    kh: ['ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់', 'បានយ៉ាងមានប្រសិទ្ធភាព'],
  },
  stains: {
    label: 'SURFACE CARE',
    en: 'STAIN CARE',
    kh: ['ជួយកាត់បន្ថយស្នាម ឬ ស្ចឹមលឿង', 'និងស្នាម ឬស្ចឹមប្រឡាក់លើផ្ទៃធ្មេញ'],
    tags: ['SURFACE', 'STAIN CARE'],
  },
  strong: {
    label: 'PROTECT',
    en: 'STRONGER-LOOKING TEETH',
    kh: ['ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ'],
  },
  bright: {
    label: 'APPEARANCE',
    words: ['CLEAN.', 'BRIGHT.', 'FRESH.'],
    kh: ['ជួយឱ្យធ្មេញសស្អាតរឹងមាំ', 'និងភ្លឺរលោងជាងមុន'],
  },
  tartar: {
    label: 'TARTAR · STAINS',
    en: 'TARTAR CARE',
    kh: ['ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ', 'ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ'],
    causes: [
      { icon: 'cigarette', en: 'CIGARETTES', kh: 'បារី' },
      { icon: 'tea', en: 'TEA', kh: 'តែ' },
      { icon: 'coffee', en: 'COFFEE', kh: 'កាហ្វេ' },
    ] as const,
  },
  fluoride: {
    label: 'ANTI-CAVITY',
    en: 'FLUORIDE',
    ring: 'PROTECT',
    kh: ['ជួយបង្ការធ្មេញពុក', 'ដោយមានសារធាតុ Fluoride'],
  },
  enamel: {
    label: 'CROSS-SECTION',
    en: 'ENAMEL CARE',
    parts: ['ENAMEL', 'DENTIN', 'PULP'],
    kh: ['ជួយពង្រឹងស្រទាប់ Enamel', 'និងថែរក្សាសុខភាពធ្មេញ'],
  },
  gums: {
    label: 'GUMLINE',
    en: 'GUM CARE',
    items: ['SENSITIVITY', 'GUM CARE'],
    kh: ['ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ', 'ឈាមចេញតាមអញ្ចាញធ្មេញ'],
  },
  bacteria: {
    label: 'ODOUR · BACTERIA',
    en: 'FRESHER MOUTH',
    kh: ['ជួយថែរក្សាអញ្ចាញធ្មេញ', 'កាត់បន្ថយបាក់តេរីដែលបណ្តាលឱ្យមានក្លិនមាត់'],
  },
  breath: {
    label: 'FRESHNESS',
    en1: 'FRESH BREATH.',
    en2: 'FRESH FEELING.',
    kh: ['ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ', 'និងផ្តល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់'],
  },
  daily: {
    label: 'EVERY DAY',
    en: 'YOUR DAILY ORAL CARE.',
    items: ['ORAL HYGIENE', 'DAILY USE'],
    kh: ['ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ', 'ស័ក្តិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ'],
  },
  finale: {
    label: 'JAKUBEE',
    en: 'ZESTY LEMON',
    brand: 'JAKUBEE',
    kh: ['ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)', 'ផ្តល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់', 'និងជួយឱ្យ មាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។'],
  },
};

export const CHAPTERS = 13;
export const chapter = (n: number, label: string) => `${String(n).padStart(2, '0')} / ${CHAPTERS} — ${label}`;
