// Theme 04 on-screen copy (Zesty Lemon + Herbal Mint), in the 9-chapter structure of the Commercial theme. Khmer narration is taken word for word from
// "Jakubee Toothpaste script (source)" in README.md, in script order; it is only broken into
// lines between words. Headlines and labels are Khmer too; the only Latin words are those in the script
// (JAKUBEE, Zesty Lemon, Tartar, Fluoride, Enamel) plus the Herbal Mint product name. No percentages or lab claims.

export const FUT = {
  intro: {
    label: 'JAKUBEE Toothpaste',
    en: 'ZESTY LEMON',
    sub: 'ថ្នាំដុសធ្មេញ',
    kh: ['ជាប្រភេទថ្នាំដុសធ្មេញ', 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)'],
  },
  // Herbal Mint (Green Edition): the script has no Herbal-only line, so the caption mirrors chapter 01
  // (ជាប្រភេទថ្នាំដុសធ្មេញ + the product name).
  herbal: {
    label: 'JAKUBEE Toothpaste',
    en: 'HERBAL MINT',
    sub: 'ថ្នាំដុសធ្មេញ',
    kh: ['ជាប្រភេទថ្នាំដុសធ្មេញ', '(Herbal Mint)'], // same form as chapter 01: script words + the product name
  },
  clean: {
    label: 'សម្អាតធ្មេញ · ខ្យល់ដង្ហើម',
    en: 'សម្អាតធ្មេញ',
    en2: 'បំបាត់បញ្ហាក្លិនមាត់',
    kh: ['ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់', 'បានយ៉ាងមានប្រសិទ្ធភាព', 'ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ', 'និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់'],
  },
  stains: {
    label: 'ផ្ទៃធ្មេញ',
    en: 'ស្នាម ឬ ស្នឹមលឿង',
    accent: ['ស្នឹមលឿង'],
    kh: ['ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង', 'និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ', 'ជួយឱ្យធ្មេញសស្អាតរឹងមាំ និងភ្លឺរលោងជាងមុន'],
    tags: ['ផ្ទៃធ្មេញ', 'ស្នឹមប្រឡាក់'],
  },
  tartar: {
    label: 'Tartar · បារី តែ កាហ្វេ',
    en: 'កំណកកំបោរ (Tartar)',
    accent: ['(Tartar)'],
    kh: ['ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ', 'ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ'],
    causes: [
      { icon: 'cigarette', en: 'CIGARETTES', kh: 'បារី' },
      { icon: 'tea', en: 'TEA', kh: 'តែ' },
      { icon: 'coffee', en: 'COFFEE', kh: 'កាហ្វេ' },
    ] as const,
  },
  fluoride: {
    label: 'បង្ការធ្មេញពុក · Enamel',
    en: 'FLUORIDE',
    ring: 'ការពារ',
    kh: ['ជួយបង្ការធ្មេញពុកដោយមានសារធាតុ Fluoride 1500ppm', 'ជួយពង្រឹងស្រទាប់ Enamel និងថែរក្សាសុខភាពធ្មេញ', 'ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ'],
  },
  gums: {
    label: 'អញ្ចាញធ្មេញ · បាក់តេរី',
    en: 'អញ្ចាញធ្មេញ',
    accent: ['អញ្ចាញធ្មេញ'],
    items: ['ស្រៀវធ្មេញ', 'ឈាមចេញ'],
    kh: ['ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ ឈាមចេញតាមអញ្ចាញធ្មេញ', 'ជួយថែរក្សាអញ្ចាញធ្មេញ', 'កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់'],
  },
  daily: {
    label: 'ប្រចាំថ្ងៃ',
    en1: 'អនាម័យមាត់ធ្មេញ',
    en2: 'ប្រចាំថ្ងៃ',
    items: ['អនាម័យមាត់ធ្មេញ', 'ប្រើប្រាស់ជាប្រចាំថ្ងៃ'],
    kh: ['ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ', 'ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ'],
  },
  finale: {
    label: 'JAKUBEE',
    en: 'Zesty Lemon · Herbal Mint',
    brand: 'JAKUBEE',
    cta: 'កុម្ម៉ង់ឥឡូវនេះ', // order CTA, as in the Commercial theme (not in the script)
    kh: ['ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)', 'ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់', 'និងជួយឱ្យមាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។'],
  },
};

export const CHAPTERS = 9;
export const chapter = (n: number, label: string) => `${String(n).padStart(2, '0')} / ${CHAPTERS} — ${label}`;
