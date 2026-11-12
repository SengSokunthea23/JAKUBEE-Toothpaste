// ALL on-screen copy lives here — edit prices and Khmer text in one place.

export const OFFER = {
  pricePerTube: '$5',
  bundleQty: '៤',
  bundlePrice: '$20',
  wholesalePrice: '$26',
  provinces: 25,
};

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
    kh: ['ក្លិនក្រូចឆ្មា', 'ស្រស់ត្រជាក់'],
    callouts: [
      { big: '1500', small: 'PPM FLUORIDE' },
      { big: 'FRESH', small: 'LEMON' },
    ],
  },
  herbal: {
    label: 'VARIANT 02  ·  GREEN EDITION',
    title1: 'HERBAL',
    title2: 'MINT',
    kh: ['រុក្ខជាតិ', 'ក្លិនជីអង្កាមស្រស់'],
    callouts: [
      { big: '1500', small: 'PPM FLUORIDE' },
      { big: 'FRESH', small: 'MINT' },
    ],
  },
  benefits: {
    label: 'BOTH FLAVOURS  ·  EVERY TUBE',
    kh: 'ការថែទាំធ្មេញ ៤ យ៉ាង',
    // Only claims printed on the packaging.
    items: [
      { icon: 'sparkle', en: 'WHITENING', kh: 'ធ្វើឲ្យធ្មេញស' },
      { icon: 'shield', en: 'ANTI-CAVITY', kh: 'ការពារធ្មេញពុក' },
      { icon: 'tooth', en: 'ANTI-SENSITIVITY', kh: 'កាត់បន្ថយការស្រៀវធ្មេញ' },
      { icon: 'bubbles', en: 'ANTI-PLAQUE', kh: 'ការពារការកកកុញកំណក' },
    ] as const,
    badgeBig: '1500',
    badgeSmall: 'PPM FLUORIDE',
  },
  fresh: {
    line1: 'FRESH',
    line2: 'BREATH',
    kh: 'ដង្ហើមស្រស់ ធ្មេញស្អាត',
    pillEn: 'TARTAR REMOVAL',
    pillKh: 'ជួយជម្រះកំណកធ្មេញ',
  },
  choose: {
    label: 'CHOOSE YOUR FLAVOUR',
    kh1: 'ជ្រើសរើសរសជាតិ',
    kh2: 'ដែលអ្នកចូលចិត្ត',
    or: 'ឬ',
    left: { en: 'ZESTY LEMON', kh: 'ក្លិនក្រូចឆ្មា' },
    right: { en: 'HERBAL MINT', kh: 'ក្លិនជីអង្កាម' },
  },
  price: {
    label: 'PRICE PER TUBE',
    kh: 'តម្លៃ ១ ដើម',
    tag: 'PROMOTION',
    same: 'តម្លៃដូចគ្នាទាំង ២ រសជាតិ',
  },
  bundle: {
    label: 'SPECIAL OFFER',
    kh: 'ទិញ ៤ ដើម ត្រឹមតែ',
    tubes: '4 TUBES',
    deliveryEn: '+ FREE DELIVERY',
    deliveryKh: 'ដឹកជញ្ជូនឥតគិតថ្លៃ ២៥ ខេត្តក្រុង',
    provincesLabel: 'PROVINCES',
  },
  wholesale: {
    label: 'WHOLESALE',
    kh: 'ចង់យកទៅលក់បន្ត?',
    subBefore: 'ទិញ ',
    subAfter: ' ទទួលបានតម្លៃលក់ដុំ',
  },
  guarantee: {
    label: 'MONEY-BACK GUARANTEE',
    kh: 'ធានាសងប្រាក់វិញពេញលេញ',
    sub: 'ប្រសិនបើមិនទទួលបានលទ្ធផលដូចការសន្យា',
  },
  end: {
    label: 'JAKUBEE  ·  ORAL CARE',
    kh: 'កុម្ម៉ង់ឥឡូវនេះ',
    en: 'ORDER NOW',
    perTube: ' / ដើម',
    tubesKh: '៤ ដើម ',
    wholesaleKh: 'លក់ដុំ ',
    delivery: ['ទិញ ៤ ដើម', 'ដឹកជញ្ជូនឥតគិតថ្លៃ ២៥ ខេត្តក្រុង'],
    cta: 'ផ្ញើសារមកកាន់យើងឥឡូវនេះ',
  },
};
