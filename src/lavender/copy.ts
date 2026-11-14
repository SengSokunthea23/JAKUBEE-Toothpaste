// Theme 05 on-screen copy (Zesty Lemon hero + Herbal Mint). The Khmer narration is the client script,
// word for word, with the corrected spelling (README → "Jakubee Toothpaste script"). Headlines are Khmer
// words from the script; Latin only where the script uses it (JAKUBEE, Zesty Lemon, Tartar, Fluoride,
// Enamel, 1500ppm) plus the product name Herbal Mint. No percentages or lab claims.

export const LAV = {
  intro: {
    label: 'JAKUBEE Toothpaste',
    title: 'Zesty Lemon',
    sub: 'ថ្នាំដុសធ្មេញ',
    kh: ['ជាប្រភេទថ្នាំដុសធ្មេញ', 'ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)'],
  },
  clean: {
    label: 'សម្អាតធ្មេញ',
    head: ['សម្អាតធ្មេញ', 'បំបាត់ក្លិនមាត់'],
    kh: ['ជួយសម្អាតធ្មេញ និងបំបាត់បញ្ហាក្លិនមាត់', 'បានយ៉ាងមានប្រសិទ្ធភាព'],
  },
  stains: {
    label: 'ផ្ទៃធ្មេញ',
    head: ['ស្នាម ឬ', 'ស្នឹមលឿង'],
    tags: ['ស្នឹមលឿង', 'ស្នឹមប្រឡាក់'],
    kh: ['ជួយកាត់បន្ថយស្នាម ឬ ស្នឹមលឿង', 'និងស្នាម ឬ ស្នឹមប្រឡាក់លើផ្ទៃធ្មេញ'],
  },
  strong: {
    label: 'ការពារធ្មេញ',
    head: ['ការពារធ្មេញ', 'ឱ្យរឹងមាំ'],
    kh: ['ជួយថែរក្សា និងការពារធ្មេញឱ្យរឹងមាំ'],
  },
  bright: {
    label: 'ធ្មេញសស្អាត',
    words: ['សស្អាត', 'រឹងមាំ', 'ភ្លឺរលោង'],
    kh: ['ជួយឱ្យធ្មេញសស្អាតរឹងមាំ', 'និងភ្លឺរលោងជាងមុន'],
  },
  tartar: {
    label: 'បារី · តែ · កាហ្វេ',
    head: ['កំណកកំបោរ', 'Tartar'],
    causes: [
      { icon: 'cigarette', kh: 'បារី' },
      { icon: 'tea', kh: 'តែ' },
      { icon: 'coffee', kh: 'កាហ្វេ' },
    ] as const,
    kh: ['ជួយសម្អាតកំណកកំបោរ (Tartar) ធ្មេញ', 'ដែលបង្កពីបារី តែ និងកាហ្វេ បានស្អាតល្អ'],
  },
  fluoride: {
    label: 'បង្ការធ្មេញពុក',
    title: 'Fluoride',
    sub: '1500ppm',
    kh: ['ជួយបង្ការធ្មេញពុក', 'ដោយមានសារធាតុ Fluoride 1500ppm'],
  },
  enamel: {
    label: 'សុខភាពធ្មេញ',
    head: ['ស្រទាប់', 'Enamel'],
    kh: ['ជួយពង្រឹងស្រទាប់ Enamel', 'និងថែរក្សាសុខភាពធ្មេញ'],
  },
  gums: {
    label: 'អញ្ចាញធ្មេញ',
    head: ['អញ្ចាញធ្មេញ'],
    items: ['ស្រៀវធ្មេញ', 'ឈាមចេញ'],
    kh: ['ជួយកាត់បន្ថយបញ្ហាស្រៀវធ្មេញ', 'ឈាមចេញតាមអញ្ចាញធ្មេញ'],
  },
  bacteria: {
    label: 'បាក់តេរី · ក្លិនមាត់',
    head: ['កាត់បន្ថយ', 'បាក់តេរី'],
    kh: ['ជួយថែរក្សាអញ្ចាញធ្មេញ', 'កាត់បន្ថយបាក់តេរីដែលបណ្ដាលឱ្យមានក្លិនមាត់'],
  },
  breath: {
    label: 'ស្រស់ស្រាយ',
    head: ['ខ្យល់ដង្ហើម', 'ស្រស់ស្រាយ'],
    kh: ['ជួយឱ្យខ្យល់ដង្ហើមស្រស់ស្រាយ', 'និងផ្ដល់អារម្មណ៍ស្រស់ថ្លាក្នុងមាត់'],
  },
  daily: {
    label: 'ប្រចាំថ្ងៃ',
    head: ['អនាម័យមាត់ធ្មេញ', 'ប្រចាំថ្ងៃ'],
    items: ['អនាម័យមាត់ធ្មេញ', 'ប្រើប្រាស់ជាប្រចាំថ្ងៃ'],
    kh: ['ជួយរក្សាអនាម័យមាត់ធ្មេញបានល្អ', 'ស័ក្ដិសមសម្រាប់ការប្រើប្រាស់ជាប្រចាំថ្ងៃ'],
  },
  finale: {
    label: 'JAKUBEE',
    title: 'Zesty Lemon',
    brand: 'JAKUBEE',
    names: 'Zesty Lemon · Herbal Mint',
    kh: ['ប្រហើរក្លិននៃក្រូចឆ្មា (Zesty Lemon)', 'ផ្ដល់នូវខ្យល់ដង្ហើមស្រស់ស្រាយ បំបាត់អារម្មណ៍ធ្ងន់ក្នុងមាត់', 'និងជួយឱ្យមាត់មានអារម្មណ៍ស្អាត បន្ទាប់ពីដុសធ្មេញរួច។'],
  },
};

export const SCENES = 13;
export const chapterNo = (n: number) => String(n).padStart(2, '0');
