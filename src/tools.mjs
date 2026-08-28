/* Calcoly tool registry — single source of truth for all pages */

export const SITE = {
  url: 'https://calcoly.com',
  name: 'Calcoly',
  tagline: 'Calculate. Convert. Done.',
};

export const pillars = [
  { id: 'calculators', prefix: 'calculator', name: 'Calculators', tile: ['Percentage', 'BMI', 'Age', 'Fraction', 'GPA'], blurb: 'Everyday math, solved instantly.' },
  { id: 'converters', prefix: 'converter', name: 'Converters', tile: ['kg → lbs', 'cm → inches', '°C → °F', 'miles → km', 'mm → inches'], blurb: 'Units of every kind, both ways.' },
  { id: 'baking', prefix: 'baking', name: 'Baking & Cooking', tile: ['Cups → Grams', 'Grams → Cups', 'Sourdough Hydration', 'Cold Brew Ratio'], blurb: 'Kitchen, baking & coffee math that stays accurate.' },
  { id: 'money', prefix: 'money', name: 'Money & Finance', tile: ['Tip', 'Discount', 'VAT Calculator'], blurb: 'Money decisions, done in seconds.' },
  { id: 'date', prefix: 'date', name: 'Date & Time', tile: ['Days Between Dates', 'Age Calculator'], blurb: 'Time intervals, milestones & dates.' },
  { id: 'everyday', prefix: 'everyday', name: 'Everyday Tools', tile: ['Word Counter'], blurb: 'Small tools you reach for daily.' },
];

export function toolUrl(t) {
  const p = t.prefix || (pillars.find(x => x.id === t.pillar)?.prefix) || 'tool';
  return `/${p}/${t.slug}/`;
}

/* Baking ingredient densities — grams per US cup */
export const ingredients = [
  { n: 'All-purpose flour', g: 120 },
  { n: 'Bread flour', g: 128 },
  { n: 'Cake flour', g: 114 },
  { n: 'Whole-wheat flour', g: 130 },
  { n: 'Granulated sugar', g: 200 },
  { n: 'Brown sugar (packed)', g: 213 },
  { n: 'Powdered sugar', g: 120 },
  { n: 'Butter', g: 227 },
  { n: 'Milk', g: 240 },
  { n: 'Water', g: 240 },
  { n: 'Vegetable oil', g: 218 },
  { n: 'Honey', g: 340 },
  { n: 'Cocoa powder', g: 100 },
  { n: 'Rolled oats', g: 85 },
  { n: 'Chocolate chips', g: 170 },
  { n: 'White rice (uncooked)', g: 185 },
];

export const tools = [
  /* ============================================================
     WEIGHT CLUSTER (Priority 1)
     ============================================================ */
  {
    slug: 'kg-to-lbs', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'kg → lbs',
    h1: 'KG to LBS Converter',
    metaTitle: 'KG to LBS Converter | Convert Kilograms to Pounds | Calcoly',
    metaDesc: 'Convert kilograms to pounds (kg to lbs) instantly. Exact 2.2046226218 lb/kg factor, live calculation, formula explanation, and conversion table. Free.',
    kw: ['kg to lbs', 'kilograms to pounds', 'kg to pounds', 'kilogram to pound', 'convert kg to lbs'],
    widget: { type: 'convert', factor: 2.2046226218, from: { unit: 'kg', label: 'Kilograms' }, to: { unit: 'lbs', label: 'Pounds' }, start: 1, dec: 4 },
    lead: 'Convert kilograms to pounds instantly with live calculations as you type in both directions.',
    formula: 'pounds = kilograms × 2.2046226218',
    explanation: 'One international avoirdupois pound is defined as exactly 0.45359237 kg, which means 1 kilogram equals approximately 2.2046226218 pounds. To convert kg to lbs, multiply the kilogram value by 2.20462 (or divide by 0.45359237).',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Enter the weight in <strong>Kilograms (kg)</strong> into the first input box.</li><li>The equivalent in <strong>Pounds (lbs)</strong> calculates immediately.</li><li>Use the <strong>Swap (⇄)</strong> button to convert pounds to kilograms.</li><li>Click <strong>Copy</strong> to paste the converted weight anywhere.</li></ol>',
    examples: [
      'An adult weighing 80 kg equals 176.37 lbs (80 × 2.20462).',
      'A standard 23 kg airline check-in bag limit equals 50.71 lbs.',
      'A 50 kg weight plate equals 110.23 lbs.',
      'An average newborn weighing 3.5 kg equals 7.72 lbs.'
    ],
    customTable: {
      title: 'Kilograms to Pounds Conversion Table',
      headers: ['Kilograms (kg)', 'Pounds (lbs)', 'Common Example'],
      rows: [
        ['1 kg', '2.2046 lbs', 'Standard baseline'],
        ['2 kg', '4.4092 lbs', 'Flour bag / small parcel'],
        ['5 kg', '11.0231 lbs', 'Dumbbell / bag of rice'],
        ['10 kg', '22.0462 lbs', 'Carry-on luggage'],
        ['20 kg', '44.0925 lbs', 'Standard Olympic barbell'],
        ['23 kg', '50.7063 lbs', 'Standard airline baggage limit'],
        ['50 kg', '110.2311 lbs', 'Adult body weight benchmark'],
        ['60 kg', '132.2774 lbs', 'Adult body weight benchmark'],
        ['70 kg', '154.3236 lbs', 'Adult body weight benchmark'],
        ['80 kg', '176.3698 lbs', 'Adult body weight benchmark'],
        ['90 kg', '198.4160 lbs', 'Adult body weight benchmark'],
        ['100 kg', '220.4623 lbs', 'Heavy barbell lift']
      ]
    },
    invertedSlug: 'lbs-to-kg',
    related: ['lbs-to-kg', 'grams-to-ounces', 'ounces-to-grams', 'grams-to-kg', 'kg-to-grams'],
    faqs: [
      { q: 'How many pounds is 1 kilogram?', a: 'One kilogram equals 2.20462 pounds (exactly 2.2046226218 lbs).' },
      { q: 'How do I convert kg to lbs in my head?', a: 'Double the kilograms, then add 10% of that number. For 80 kg: 80 × 2 = 160, plus 16 = 176 lbs (very close to exact 176.37 lbs).' },
      { q: 'What is 50 kg in lbs?', a: '50 kg equals 110.23 pounds.' },
      { q: 'What is the airline luggage limit of 23 kg in lbs?', a: '23 kg equals 50.71 lbs (commonly rounded to 50 lbs by airlines).' }
    ],
  },
  {
    slug: 'lbs-to-kg', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'lbs → kg',
    h1: 'LBS to KG Converter',
    metaTitle: 'LBS to KG Converter | Convert Pounds to Kilograms | Calcoly',
    metaDesc: 'Convert pounds to kilograms (lbs to kg) instantly. Official international definition (0.45359237 kg/lb), formula, and gym & body weight chart. Free.',
    kw: ['lbs to kg', 'pounds to kilograms', 'pounds to kg', 'lb to kg', 'convert lbs to kg'],
    widget: { type: 'convert', factor: 0.45359237, from: { unit: 'lbs', label: 'Pounds' }, to: { unit: 'kg', label: 'Kilograms' }, start: 1, dec: 4 },
    lead: 'Enter a weight in pounds and get exact kilograms instantly in both directions.',
    formula: 'kilograms = pounds × 0.45359237',
    explanation: 'Under the 1959 International Yard and Pound Agreement, 1 avoirdupois pound is legally defined as exactly 0.45359237 kilograms. To convert lbs to kg, multiply the weight in pounds by 0.45359237 (or divide by 2.20462).',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Type the weight in <strong>Pounds (lbs)</strong> in the first box.</li><li>The value in <strong>Kilograms (kg)</strong> updates in real time.</li><li>Click the <strong>Swap (⇄)</strong> button to convert from kilograms to pounds.</li><li>Click <strong>Copy</strong> to save the result.</li></ol>',
    examples: [
      'A gym weight plate of 45 lbs equals 20.41 kg.',
      'An adult weighing 150 lbs equals 68.04 kg (150 × 0.45359).',
      'A gym lift of 200 lbs equals 90.72 kg.',
      'A 10 lb dumbbell equals 4.54 kg.'
    ],
    customTable: {
      title: 'Pounds to Kilograms Conversion Table',
      headers: ['Pounds (lbs)', 'Kilograms (kg)', 'Common Context'],
      rows: [
        ['1 lb', '0.4536 kg', 'Single pound standard'],
        ['5 lbs', '2.2680 kg', 'Small dumbbell'],
        ['10 lbs', '4.5359 kg', 'Medium hand weight'],
        ['25 lbs', '11.3398 kg', 'Barbell weight plate'],
        ['45 lbs', '20.4117 kg', 'Standard Olympic weight plate'],
        ['50 lbs', '22.6796 kg', 'Checked baggage allowance'],
        ['100 lbs', '45.3592 kg', 'Body weight benchmark'],
        ['130 lbs', '58.9670 kg', 'Body weight benchmark'],
        ['150 lbs', '68.0389 kg', 'Body weight benchmark'],
        ['180 lbs', '81.6466 kg', 'Body weight benchmark'],
        ['200 lbs', '90.7185 kg', 'Body weight / gym milestone'],
        ['250 lbs', '113.3981 kg', 'Heavy gym lift']
      ]
    },
    invertedSlug: 'kg-to-lbs',
    related: ['kg-to-lbs', 'lbs-to-ounces', 'ounces-to-lbs', 'grams-to-kg'],
    faqs: [
      { q: 'How many kilograms is 1 pound?', a: 'One pound equals exactly 0.45359237 kilograms.' },
      { q: 'What is 200 lbs in kg?', a: '200 pounds equals 90.72 kilograms.' },
      { q: 'What is 150 lbs in kg?', a: '150 pounds equals 68.04 kilograms.' },
      { q: 'How do I convert lbs to kg in my head?', a: 'Divide the number of pounds by 2.2. For example, 150 lbs ÷ 2.2 ≈ 68.18 kg (close to exact 68.04 kg).' }
    ],
  },
  {
    slug: 'grams-to-ounces', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'grams → ounces',
    h1: 'Grams to Ounces Converter',
    metaTitle: 'Grams to Ounces Converter — g to oz | Calcoly',
    metaDesc: 'Convert grams to ounces instantly. Live results, formula, and common culinary & postal conversion table. Free.',
    kw: ['grams to ounces', 'g to oz', 'grams into ounces', '100 grams to oz'],
    widget: { type: 'convert', factor: 0.03527396195, from: { unit: 'g', label: 'Grams' }, to: { unit: 'oz', label: 'Ounces' }, start: 100, dec: 4 },
    lead: 'Convert grams to ounces for cooking, postage, and science — live two-way instant calculator.',
    formula: 'ounces = grams × 0.035274',
    examples: [
      '100 grams of chocolate equals 3.53 oz.',
      '250 grams of butter equals 8.82 oz.',
      '28.35 grams equals 1 oz.'
    ],
    invertedSlug: 'ounces-to-grams',
    related: ['ounces-to-grams', 'kg-to-lbs', 'grams-to-kg', 'cups-to-grams'],
    faqs: [
      { q: 'How many ounces is 100 grams?', a: '100 grams equals 3.5274 ounces.' },
      { q: 'How many grams in an ounce?', a: 'There are exactly 28.3495 grams in 1 avoirdupois ounce.' },
      { q: 'Is 1 oz equal to 30g?', a: 'For rough kitchen rounding, 30g is often used, but the precise value is 28.35 grams.' },
    ],
  },
  {
    slug: 'ounces-to-grams', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'ounces → grams',
    h1: 'Ounces to Grams Converter',
    metaTitle: 'Ounces to Grams Converter — oz to g | Calcoly',
    metaDesc: 'Convert ounces to grams instantly. Live calculations, formula, and recipe conversion table. Free.',
    kw: ['ounces to grams', 'oz to g', 'oz in grams', '8 oz in grams'],
    widget: { type: 'convert', factor: 28.349523125, from: { unit: 'oz', label: 'Ounces' }, to: { unit: 'g', label: 'Grams' }, start: 8, dec: 3 },
    lead: 'Enter weight in ounces and get grams instantly — ideal for baking recipes and postal scales.',
    formula: 'grams = ounces × 28.3495',
    examples: [
      'An 8 oz block of cheese equals 226.8 grams.',
      '16 oz (1 pound) equals 453.59 grams.',
      '1 oz equals 28.35 grams.'
    ],
    invertedSlug: 'grams-to-ounces',
    related: ['grams-to-ounces', 'lbs-to-kg', 'lbs-to-ounces'],
    faqs: [
      { q: 'How many grams in an ounce?', a: 'One ounce equals 28.3495 grams.' },
      { q: 'How many grams is 8 oz?', a: '8 ounces equals 226.8 grams.' },
      { q: 'What is 16 oz in grams?', a: '16 ounces equals 453.59 grams (1 pound).' },
    ],
  },
  {
    slug: 'stone-to-kg', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'stone → kg',
    h1: 'Stone to Kg Converter',
    metaTitle: 'Stone to Kg Converter — Stones to Kilograms | Calcoly',
    metaDesc: 'Convert stones to kilograms instantly. Live results as you type, exact formula, and stone-to-kg chart. Free.',
    kw: ['stone to kg', 'stones to kilograms', 'st to kg', 'weight stone'],
    widget: { type: 'convert', factor: 6.35029318, from: { unit: 'st', label: 'Stones' }, to: { unit: 'kg', label: 'Kilograms' }, start: 10, dec: 3 },
    lead: 'The UK and Ireland measure body weight in stones — convert stones to kilograms instantly in both directions.',
    formula: 'kilograms = stones × 6.35029',
    examples: [
      '10 stone equals 63.50 kg.',
      '12 stone equals 76.20 kg.',
      '14 stone equals 88.90 kg.'
    ],
    invertedSlug: 'kg-to-stone',
    related: ['kg-to-stone', 'lbs-to-kg', 'kg-to-lbs'],
    faqs: [
      { q: 'How many kg is 1 stone?', a: 'One stone equals 6.35029 kg (14 pounds).' },
      { q: 'What is 10 stone in kg?', a: '10 stone is 63.50 kg.' },
      { q: 'Why does the UK use stones?', a: 'Tradition: stones remain standard for human body weight in the British Isles.' },
    ],
  },
  {
    slug: 'kg-to-stone', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'kg → stone',
    h1: 'Kg to Stone Converter',
    metaTitle: 'Kg to Stone Converter — Kilograms to Stones | Calcoly',
    metaDesc: 'Convert kilograms to stones and pounds instantly. Live results as you type, with conversion chart. Free.',
    kw: ['kg to stone', 'kilograms to stones', 'kg to st'],
    widget: { type: 'convert', factor: 0.1574730444, from: { unit: 'kg', label: 'Kilograms' }, to: { unit: 'st', label: 'Stones' }, start: 70, dec: 3 },
    lead: 'Convert kilograms into stones — see decimal stones and exact stones & pounds breakdown live.',
    formula: 'stones = kilograms × 0.157473',
    examples: [
      '70 kg equals 11 stone 0.3 lbs (11.02 st).',
      '80 kg equals 12 stone 8.3 lbs (12.60 st).',
      '60 kg equals 9 stone 6.2 lbs (9.45 st).'
    ],
    invertedSlug: 'stone-to-kg',
    related: ['stone-to-kg', 'lbs-to-kg', 'kg-to-lbs'],
    faqs: [
      { q: 'What is 70 kg in stones?', a: '70 kg equals 11.02 stone (11 stone 0.3 lb).' },
      { q: 'How many kg in 12 stone?', a: '12 stone equals 76.2 kg.' },
      { q: 'How do stones convert to pounds?', a: '1 stone equals 14 pounds.' },
    ],
  },
  {
    slug: 'grams-to-kg', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'grams → kg',
    h1: 'Grams to Kg Converter',
    metaTitle: 'Grams to Kg Converter — g to kg | Calcoly',
    metaDesc: 'Convert grams to kilograms instantly. Live results as you type with standard metric formula. Free.',
    kw: ['grams to kg', 'g to kg', 'grams into kg', '500g to kg'],
    widget: { type: 'convert', factor: 0.001, from: { unit: 'g', label: 'Grams' }, to: { unit: 'kg', label: 'Kilograms' }, start: 500, dec: 4 },
    lead: 'Convert grams to kilograms instantly — metric weight conversion made simple.',
    formula: 'kilograms = grams ÷ 1000',
    examples: [
      '500 grams equals 0.5 kg.',
      '1,000 grams equals 1 kg.',
      '2,500 grams equals 2.5 kg.'
    ],
    invertedSlug: 'kg-to-grams',
    related: ['kg-to-grams', 'grams-to-ounces', 'kg-to-lbs'],
    faqs: [
      { q: 'How many grams are in a kilogram?', a: 'There are exactly 1,000 grams in 1 kilogram.' },
      { q: 'What is 500g in kg?', a: '500 grams equals 0.5 kg.' },
      { q: 'How do I convert g to kg manually?', a: 'Divide the number of grams by 1,000.' },
    ],
  },
  {
    slug: 'kg-to-grams', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'kg → grams',
    h1: 'Kg to Grams Converter',
    metaTitle: 'Kg to Grams Converter — kg to g | Calcoly',
    metaDesc: 'Convert kilograms to grams instantly. Live calculations, metric formula, and weight table. Free.',
    kw: ['kg to grams', 'kg to g', 'kilograms to grams', '1.5 kg to g'],
    widget: { type: 'convert', factor: 1000, from: { unit: 'kg', label: 'Kilograms' }, to: { unit: 'g', label: 'Grams' }, start: 1, dec: 2 },
    lead: 'Convert kilograms to grams instantly with live metric updates.',
    formula: 'grams = kilograms × 1000',
    examples: [
      '1 kg equals 1,000 grams.',
      '2.5 kg equals 2,500 grams.',
      '0.75 kg equals 750 grams.'
    ],
    invertedSlug: 'grams-to-kg',
    related: ['grams-to-kg', 'kg-to-lbs', 'grams-to-ounces'],
    faqs: [
      { q: 'How many grams in 1 kg?', a: '1 kilogram equals 1,000 grams.' },
      { q: 'What is 2.5 kg in grams?', a: '2.5 kg equals 2,500 grams.' },
    ],
  },
  {
    slug: 'lbs-to-ounces', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'lbs → ounces',
    h1: 'Lbs to Ounces Converter',
    metaTitle: 'Lbs to Ounces Converter — lb to oz | Calcoly',
    metaDesc: 'Convert pounds to ounces instantly. Live results as you type, exact 16 oz/lb formula, and weight table. Free.',
    kw: ['lbs to ounces', 'lb to oz', 'pounds to ounces'],
    widget: { type: 'convert', factor: 16, from: { unit: 'lbs', label: 'Pounds' }, to: { unit: 'oz', label: 'Ounces' }, start: 1, dec: 2 },
    lead: 'Convert pounds to ounces instantly — based on 16 ounces per pound.',
    formula: 'ounces = pounds × 16',
    examples: [
      '1 pound equals 16 ounces.',
      '5 pounds equals 80 ounces.',
      '0.5 pounds equals 8 ounces.'
    ],
    invertedSlug: 'ounces-to-lbs',
    related: ['ounces-to-lbs', 'lbs-to-kg', 'ounces-to-grams'],
    faqs: [
      { q: 'How many ounces in a pound?', a: 'There are exactly 16 ounces in 1 pound.' },
      { q: 'What is 5 lbs in oz?', a: '5 pounds equals 80 ounces.' },
    ],
  },
  {
    slug: 'ounces-to-lbs', pillar: 'converters', prefix: 'converter', ecosystem: 'Weight', name: 'ounces → lbs',
    h1: 'Ounces to Lbs Converter',
    metaTitle: 'Ounces to Lbs Converter — oz to lb | Calcoly',
    metaDesc: 'Convert ounces to pounds instantly. Live results as you type, exact formula, and conversion chart. Free.',
    kw: ['ounces to lbs', 'oz to lb', 'ounces to pounds'],
    widget: { type: 'convert', factor: 0.0625, from: { unit: 'oz', label: 'Ounces' }, to: { unit: 'lbs', label: 'Pounds' }, start: 16, dec: 4 },
    lead: 'Convert ounces to pounds instantly — live imperial weight calculation.',
    formula: 'pounds = ounces ÷ 16',
    examples: [
      '16 ounces equals 1 pound.',
      '32 ounces equals 2 pounds.',
      '8 ounces equals 0.5 pounds.'
    ],
    invertedSlug: 'lbs-to-ounces',
    related: ['lbs-to-ounces', 'ounces-to-grams', 'lbs-to-kg'],
    faqs: [
      { q: 'How many pounds is 16 oz?', a: '16 ounces equals exactly 1 pound.' },
      { q: 'What is 32 oz in lbs?', a: '32 ounces equals 2 pounds.' },
    ],
  },

  /* ============================================================
     LENGTH CLUSTER (Priority 1)
     ============================================================ */
  {
    slug: 'cm-to-inches', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'cm → inches',
    h1: 'CM to Inches Converter',
    metaTitle: 'CM to Inches Converter | Convert Centimeters to Inches | Calcoly',
    metaDesc: 'Convert centimeters to inches (cm to inches) instantly. Exact 2.54 cm/inch formula, step-by-step calculation, and common conversion reference table. Free.',
    kw: ['cm to inches', 'centimeters to inches', 'centimetres to inches', 'cm in inches', 'convert cm to inches', 'cm to inch converter'],
    widget: { type: 'convert', factor: 0.3937007874, from: { unit: 'cm', label: 'Centimeters' }, to: { unit: 'in', label: 'Inches' }, start: 10, dec: 4 },
    lead: 'Convert centimeters to inches instantly with live calculations as you type in both directions.',
    formula: 'inches = centimeters ÷ 2.54',
    explanation: 'One inch is internationally standardized as exactly 2.54 centimeters. To convert centimeters to decimal inches, divide your measurement in centimeters by 2.54 (or multiply by 0.393701).',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Enter the value in <strong>Centimeters (cm)</strong> in the input box above.</li><li>The converted value in <strong>Inches (in)</strong> appears instantly as you type.</li><li>Click the <strong>Swap (⇄)</strong> button if you want to convert from inches back to centimeters.</li><li>Click <strong>Copy</strong> to copy the calculated result to your clipboard.</li></ol>',
    examples: [
      'A standard 30 cm school ruler equals 11.81 inches (30 ÷ 2.54).',
      '100 cm (1 meter) equals 39.37 inches.',
      '15 cm equals 5.91 inches.',
      '180 cm (a common adult height) equals 70.87 inches (5 feet 10.87 inches).'
    ],
    customTable: {
      title: 'Centimeters to Inches Conversion Table',
      headers: ['Centimeters (cm)', 'Inches (in)', 'Feet & Inches (approx)'],
      rows: [
        ['1 cm', '0.3937 in', '0′ 0.39″'],
        ['2.54 cm', '1.0000 in', '0′ 1.00″'],
        ['5 cm', '1.9685 in', '0′ 1.97″'],
        ['10 cm', '3.9370 in', '0′ 3.94″'],
        ['15 cm', '5.9055 in', '0′ 5.91″'],
        ['20 cm', '7.8740 in', '0′ 7.87″'],
        ['25 cm', '9.8425 in', '0′ 9.84″'],
        ['30 cm', '11.8110 in', '0′ 11.81″'],
        ['50 cm', '19.6850 in', '1′ 7.69″'],
        ['100 cm', '39.3701 in', '3′ 3.37″'],
        ['150 cm', '59.0551 in', '4′ 11.06″'],
        ['180 cm', '70.8661 in', '5′ 10.87″']
      ]
    },
    invertedSlug: 'inches-to-cm',
    related: ['inches-to-cm', 'mm-to-inches', 'cm-to-feet', 'feet-to-cm'],
    faqs: [
      { q: 'How many inches is 1 cm?', a: '1 centimeter equals approximately 0.3937 inches (1 ÷ 2.54).' },
      { q: 'What is 30 cm in inches?', a: '30 cm equals 11.81 inches (equal to 0.984 feet).' },
      { q: 'How do I convert cm to inches in my head?', a: 'Divide the centimeters by 2.5 for a quick mental estimate. For example, 100 cm ÷ 2.5 = 40 inches (the exact answer is 39.37 inches).' },
      { q: 'Why is 1 inch exactly 2.54 cm?', a: 'Under the 1959 International Yard and Pound Agreement between the US, UK, Canada, Australia, New Zealand, and South Africa, the international inch was standardized as exactly 25.4 mm (2.54 cm).' },
    ],
  },
  {
    slug: 'inches-to-cm', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'inches → cm',
    h1: 'Inches to CM Converter',
    metaTitle: 'Inches to CM Converter | Convert Inches to Centimeters | Calcoly',
    metaDesc: 'Convert inches to centimeters (inches to cm) instantly. Standard 2.54 conversion factor, live calculation, formula, and reference chart. Free.',
    kw: ['inches to cm', 'inches to centimeters', 'inches to centimetres', 'inch to cm', 'convert inches to cm', 'inch to centimeter converter'],
    widget: { type: 'convert', factor: 2.54, from: { unit: 'in', label: 'Inches' }, to: { unit: 'cm', label: 'Centimeters' }, start: 1, dec: 3 },
    lead: 'Enter a length or dimension in inches and get exact centimeters instantly in both directions.',
    formula: 'centimeters = inches × 2.54',
    explanation: 'Because 1 inch is defined as exactly 2.54 centimeters, converting from inches to centimeters simply requires multiplying your inch measurement by 2.54.',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Type the length in <strong>Inches (in)</strong> into the first field.</li><li>The measurement in <strong>Centimeters (cm)</strong> calculates in real time.</li><li>Click <strong>Swap (⇄)</strong> to switch to centimeters-to-inches mode.</li><li>Click <strong>Copy</strong> to instantly copy the centimeter value.</li></ol>',
    examples: [
      'A 55-inch TV diagonal equals 139.7 cm (55 × 2.54).',
      'A 65-inch TV diagonal equals 165.1 cm.',
      '12 inches (1 foot) equals 30.48 cm.',
      '6 feet (72 inches) equals 182.88 cm.'
    ],
    customTable: {
      title: 'Inches to Centimeters Conversion Table',
      headers: ['Inches (in)', 'Centimeters (cm)', 'Common Context'],
      rows: [
        ['1 in', '2.54 cm', 'Standard definition'],
        ['2 in', '5.08 cm', 'Small hardware / screws'],
        ['4 in', '10.16 cm', 'Smartphone width'],
        ['6 in', '15.24 cm', 'Pocket ruler length'],
        ['8 in', '20.32 cm', 'Small cake pan diameter'],
        ['10 in', '25.40 cm', 'Dinner plate diameter'],
        ['12 in', '30.48 cm', '1 Foot / Standard ruler'],
        ['24 in', '60.96 cm', '2 Feet / Counter depth'],
        ['36 in', '91.44 cm', '1 Yard / Door width'],
        ['55 in', '139.70 cm', '55″ Television diagonal'],
        ['65 in', '165.10 cm', '65″ Television diagonal'],
        ['75 in', '190.50 cm', '75″ Television diagonal']
      ]
    },
    invertedSlug: 'cm-to-inches',
    related: ['cm-to-inches', 'inches-to-mm', 'inches-to-feet', 'feet-to-inches'],
    faqs: [
      { q: 'How many cm is 1 inch?', a: '1 inch equals exactly 2.54 centimeters.' },
      { q: 'What is 55 inches in cm?', a: '55 inches equals 139.7 centimeters.' },
      { q: 'What is 65 inches in cm?', a: '65 inches equals 165.1 centimeters.' },
      { q: 'How do I convert inches to cm manually?', a: 'Multiply the number of inches by 2.54. For instance, 10 inches × 2.54 = 25.4 cm.' }
    ],
  },
  {
    slug: 'mm-to-inches', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'mm → inches',
    h1: 'MM to Inches Converter',
    metaTitle: 'MM to Inches Converter | Convert Millimeters to Inches | Calcoly',
    metaDesc: 'Convert millimeters to inches (mm to inches) instantly. Exact 25.4 mm/inch engineering standard, formula explanation, and quick conversion table. Free.',
    kw: ['mm to inches', 'millimeters to inches', 'millimetres to inches', 'mm in inches', 'convert mm to inches'],
    widget: { type: 'convert', factor: 0.03937007874, from: { unit: 'mm', label: 'Millimeters' }, to: { unit: 'in', label: 'Inches' }, start: 10, dec: 4 },
    lead: 'Convert millimeters to inches for engineering, machining, 3D printing, and DIY with live precision calculations.',
    formula: 'inches = millimeters ÷ 25.4',
    explanation: 'There are exactly 25.4 millimeters in one international inch. To convert from millimeters to decimal inches, divide the millimeter measurement by 25.4 (or multiply by 0.0393701).',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Enter the measurement in <strong>Millimeters (mm)</strong> in the first box.</li><li>The value in <strong>Inches (in)</strong> updates automatically in real time.</li><li>Click <strong>Swap (⇄)</strong> to convert inches to millimeters.</li><li>Click <strong>Copy</strong> to copy the result.</li></ol>',
    examples: [
      '10 mm equals 0.3937 inches (10 ÷ 25.4).',
      '25.4 mm equals exactly 1.0 inch.',
      '6.35 mm equals 0.25 inches (1/4 inch).',
      '12.7 mm equals 0.50 inches (1/2 inch).'
    ],
    customTable: {
      title: 'Millimeters to Inches Conversion Table',
      headers: ['Millimeters (mm)', 'Decimal Inches (in)', 'Fractional Inch (approx)'],
      rows: [
        ['1 mm', '0.0394 in', '≈ 3/64″'],
        ['2 mm', '0.0787 in', '≈ 5/64″'],
        ['3.175 mm', '0.1250 in', '1/8″'],
        ['5 mm', '0.1969 in', '≈ 3/16″'],
        ['6.35 mm', '0.2500 in', '1/4″'],
        ['10 mm', '0.3937 in', '≈ 25/64″'],
        ['12.7 mm', '0.5000 in', '1/2″'],
        ['15 mm', '0.5906 in', '≈ 19/32″'],
        ['19.05 mm', '0.7500 in', '3/4″'],
        ['20 mm', '0.7874 in', '≈ 25/32″'],
        ['25.4 mm', '1.0000 in', '1″ (Exact)'],
        ['50 mm', '1.9685 in', '≈ 1 31/32″']
      ]
    },
    invertedSlug: 'inches-to-mm',
    related: ['inches-to-mm', 'cm-to-inches', 'inches-to-cm'],
    faqs: [
      { q: 'How many inches is 10 mm?', a: '10 mm equals 0.3937 inches (just under 13/32 inch).' },
      { q: 'How many millimeters in 1 inch?', a: 'There are exactly 25.4 millimeters in 1 inch.' },
      { q: 'What is 5 mm in inches?', a: '5 mm equals 0.1969 inches (approximately 3/16 inch).' },
      { q: 'How do I convert mm to inches manually?', a: 'Divide the number of millimeters by 25.4. For example, 12.7 mm ÷ 25.4 = 0.5 inches.' }
    ],
  },
  {
    slug: 'inches-to-mm', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'inches → mm',
    h1: 'Inches to MM Converter',
    metaTitle: 'Inches to MM Converter — Inches to Millimeters | Calcoly',
    metaDesc: 'Convert inches to millimeters instantly. Live results as you type, exact 25.4 mm/inch formula. Free.',
    kw: ['inches to mm', 'inches to millimeters', 'inch mm'],
    widget: { type: 'convert', factor: 25.4, from: { unit: 'in', label: 'Inches' }, to: { unit: 'mm', label: 'Millimeters' }, start: 1, dec: 3 },
    lead: 'Convert inches to millimeters instantly — accurate engineering & tool sizing calculator.',
    formula: 'millimeters = inches × 25.4',
    examples: [
      '1 inch equals 25.4 mm.',
      '0.5 inches equals 12.7 mm.',
      '1/4 inch (0.25 in) equals 6.35 mm.'
    ],
    invertedSlug: 'mm-to-inches',
    related: ['mm-to-inches', 'inches-to-cm', 'inches-to-feet'],
    faqs: [
      { q: 'How many mm in 1 inch?', a: 'Exactly 25.4 millimeters.' },
      { q: 'What is 1/2 inch in mm?', a: '0.5 inches equals 12.7 mm.' },
    ],
  },
  {
    slug: 'cm-to-feet', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'cm → feet',
    h1: 'CM to Feet Converter',
    metaTitle: 'CM to Feet Converter — Centimeters to Feet and Inches | Calcoly',
    metaDesc: 'Convert centimeters to feet and inches instantly. Live height calculator with feet-and-inches breakdown. Free.',
    kw: ['cm to feet', 'centimeters to feet', 'height converter', '170 cm to feet', '180 cm in feet'],
    widget: { type: 'convert', factor: 0.03280839895, from: { unit: 'cm', label: 'Centimeters' }, to: { unit: 'ft', label: 'Feet' }, start: 170, dec: 3 },
    lead: 'Convert centimeters to feet for height and building — results include exact feet-and-inches breakdown.',
    formula: 'feet = centimeters ÷ 30.48',
    examples: [
      '170 cm height equals 5 feet 6.9 inches (5′7″).',
      '180 cm height equals 5 feet 10.9 inches (5′11″).',
      '160 cm height equals 5 feet 3.0 inches (5′3″).'
    ],
    invertedSlug: 'feet-to-cm',
    related: ['feet-to-cm', 'meters-to-feet', 'cm-to-inches', 'inches-to-feet'],
    faqs: [
      { q: 'How tall is 170 cm in feet?', a: '170 cm is 5 feet 6.9 inches (commonly rounded to 5′7″).' },
      { q: 'Is 180 cm equal to 6 feet?', a: 'Almost — 180 cm is 5 feet 10.9 inches. 6 feet is 182.88 cm.' },
    ],
  },
  {
    slug: 'feet-to-cm', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'feet → cm',
    h1: 'Feet to CM Converter',
    metaTitle: 'Feet to CM Converter — Feet to Centimeters | Calcoly',
    metaDesc: 'Convert feet and inches to centimeters instantly. Live calculation, height chart, and formula. Free.',
    kw: ['feet to cm', 'feet to centimeters', 'ft to cm', '6 feet in cm'],
    widget: { type: 'convert', factor: 30.48, from: { unit: 'ft', label: 'Feet' }, to: { unit: 'cm', label: 'Centimeters' }, start: 5.9, dec: 2 },
    lead: 'Convert feet to centimeters instantly — perfect for height conversions and room dimensions.',
    formula: 'centimeters = feet × 30.48',
    examples: [
      '6 feet tall equals 182.88 cm.',
      '5.5 feet (5′6″) equals 167.64 cm.',
      '5 feet tall equals 152.40 cm.'
    ],
    invertedSlug: 'cm-to-feet',
    related: ['cm-to-feet', 'feet-to-meters', 'inches-to-cm'],
    faqs: [
      { q: 'How many cm in 6 feet?', a: '6 feet equals 182.88 cm.' },
      { q: 'How many cm in 1 foot?', a: '1 foot equals 30.48 cm.' },
    ],
  },
  {
    slug: 'meters-to-feet', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'meters → feet',
    h1: 'Meters to Feet Converter',
    metaTitle: 'Meters to Feet Converter — Meters to Feet and Inches | Calcoly',
    metaDesc: 'Convert meters to feet instantly. Live results as you type, with feet-and-inches breakdown. Free.',
    kw: ['meters to feet', 'm to ft', 'metres to feet', '10 meters in feet'],
    widget: { type: 'convert', factor: 3.280839895, from: { unit: 'm', label: 'Meters' }, to: { unit: 'ft', label: 'Feet' }, start: 1, dec: 3 },
    lead: 'Convert meters to feet instantly — room sizes, sports distances, and elevations live.',
    formula: 'feet = meters × 3.28084',
    examples: [
      '1 meter equals 3.28 feet (3′3.3″).',
      '10 meters equals 32.81 feet.',
      '100 meters equals 328.08 feet.'
    ],
    invertedSlug: 'feet-to-meters',
    related: ['feet-to-meters', 'cm-to-feet', 'miles-to-km'],
    faqs: [
      { q: 'How many feet in a meter?', a: 'One meter equals 3.28084 feet.' },
      { q: 'What is 10 meters in feet?', a: '10 meters equals 32.81 feet.' },
    ],
  },
  {
    slug: 'feet-to-meters', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'feet → meters',
    h1: 'Feet to Meters Converter',
    metaTitle: 'Feet to Meters Converter — Feet to Meters | Calcoly',
    metaDesc: 'Convert feet to meters instantly. Live calculation, exact formula, and height/distance table. Free.',
    kw: ['feet to meters', 'ft to m', 'feet to metres'],
    widget: { type: 'convert', factor: 0.3048, from: { unit: 'ft', label: 'Feet' }, to: { unit: 'm', label: 'Meters' }, start: 10, dec: 3 },
    lead: 'Convert feet to meters instantly — accurate length and height calculations.',
    formula: 'meters = feet × 0.3048',
    examples: [
      '10 feet equals 3.048 meters.',
      '100 feet equals 30.48 meters.',
      '6 feet equals 1.829 meters.'
    ],
    invertedSlug: 'meters-to-feet',
    related: ['meters-to-feet', 'feet-to-cm', 'km-to-miles'],
    faqs: [
      { q: 'How many meters in 1 foot?', a: '1 foot equals exactly 0.3048 meters.' },
      { q: 'What is 100 feet in meters?', a: '100 feet equals 30.48 meters.' },
    ],
  },
  {
    slug: 'miles-to-km', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'miles → km',
    h1: 'Miles to Km Converter',
    metaTitle: 'Miles to Km Converter — Miles to Kilometers | Calcoly',
    metaDesc: 'Convert miles to kilometers instantly. Live results as you type, exact formula, driving & running table. Free.',
    kw: ['miles to km', 'miles to kilometers', 'mph to kph', '50 miles to km'],
    widget: { type: 'convert', factor: 1.609344, from: { unit: 'mi', label: 'Miles' }, to: { unit: 'km', label: 'Kilometers' }, start: 1, dec: 3 },
    lead: 'Convert miles to kilometers instantly — running, driving or flying distances live.',
    formula: 'kilometers = miles × 1.60934',
    examples: [
      '1 mile equals 1.609 km.',
      '60 mph equals 96.56 km/h.',
      '26.2 miles (marathon) equals 42.195 km.'
    ],
    invertedSlug: 'km-to-miles',
    related: ['km-to-miles', 'celsius-to-fahrenheit', 'meters-to-feet'],
    faqs: [
      { q: 'How many km is 1 mile?', a: 'One mile equals 1.609344 kilometers.' },
      { q: 'How far is a marathon in km?', a: 'A 26.2 mile marathon equals 42.195 kilometers.' },
    ],
  },
  {
    slug: 'km-to-miles', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'km → miles',
    h1: 'Km to Miles Converter',
    metaTitle: 'Km to Miles Converter — Kilometers to Miles | Calcoly',
    metaDesc: 'Convert kilometers to miles instantly. Live results as you type, 5K/10K race distances table. Free.',
    kw: ['km to miles', 'kilometers to miles', 'kph to mph', '5k in miles', '10k in miles'],
    widget: { type: 'convert', factor: 0.6213711922, from: { unit: 'km', label: 'Kilometers' }, to: { unit: 'mi', label: 'Miles' }, start: 5, dec: 4 },
    lead: 'Enter kilometers, get miles instantly — live two-way distance conversion.',
    formula: 'miles = kilometers × 0.62137',
    examples: [
      '5 km (5K race) equals 3.11 miles.',
      '10 km (10K race) equals 6.21 miles.',
      '100 km equals 62.14 miles.'
    ],
    invertedSlug: 'miles-to-km',
    related: ['miles-to-km', 'meters-to-feet', 'celsius-to-fahrenheit'],
    faqs: [
      { q: 'What is 5K in miles?', a: '5 kilometers equals 3.107 miles.' },
      { q: 'What is 10K in miles?', a: '10 kilometers equals 6.214 miles.' },
      { q: 'How do I convert km to miles in my head?', a: 'Multiply by 5, then divide by 8. For 80 km: 400 ÷ 8 = 50 miles (exact: 49.71).' },
    ],
  },
  {
    slug: 'inches-to-feet', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'inches → feet',
    h1: 'Inches to Feet Converter',
    metaTitle: 'Inches to Feet Converter — Inches to Feet | Calcoly',
    metaDesc: 'Convert inches to feet instantly. Live results as you type, with feet-and-inches remainder breakdown. Free.',
    kw: ['inches to feet', 'in to ft', '60 inches in feet'],
    widget: { type: 'convert', factor: 0.08333333333, from: { unit: 'in', label: 'Inches' }, to: { unit: 'ft', label: 'Feet' }, start: 24, dec: 3 },
    lead: 'Convert inches to feet instantly — DIY measurements and heights live in both directions.',
    formula: 'feet = inches ÷ 12',
    examples: [
      '60 inches equals 5 feet.',
      '72 inches equals 6 feet.',
      '50 inches equals 4 feet 2 inches (4.167 ft).'
    ],
    invertedSlug: 'feet-to-inches',
    related: ['feet-to-inches', 'cm-to-feet', 'inches-to-cm'],
    faqs: [
      { q: 'How many feet is 60 inches?', a: '60 inches equals exactly 5 feet.' },
      { q: 'How do I convert inches to feet and inches?', a: 'Divide by 12: the whole number is feet, the remainder is inches. E.g. 70 inches = 5 ft 10 in.' },
    ],
  },
  {
    slug: 'feet-to-inches', pillar: 'converters', prefix: 'converter', ecosystem: 'Length', name: 'feet → inches',
    h1: 'Feet to Inches Converter',
    metaTitle: 'Feet to Inches Converter — Feet to Inches | Calcoly',
    metaDesc: 'Convert feet to inches instantly. Live calculation, 12 in/ft formula, and conversion table. Free.',
    kw: ['feet to inches', 'ft to in', 'feet in inches'],
    widget: { type: 'convert', factor: 12, from: { unit: 'ft', label: 'Feet' }, to: { unit: 'in', label: 'Inches' }, start: 5, dec: 2 },
    lead: 'Convert feet to inches instantly — fast calculation for building and height.',
    formula: 'inches = feet × 12',
    examples: [
      '5 feet equals 60 inches.',
      '6 feet equals 72 inches.',
      '5.5 feet equals 66 inches.'
    ],
    invertedSlug: 'inches-to-feet',
    related: ['inches-to-feet', 'feet-to-cm', 'cm-to-inches'],
    faqs: [
      { q: 'How many inches in 6 feet?', a: '6 feet equals 72 inches.' },
      { q: 'How many inches in 1 foot?', a: '1 foot equals 12 inches.' },
    ],
  },

  /* ============================================================
     TEMPERATURE CLUSTER
     ============================================================ */
  {
    slug: 'celsius-to-fahrenheit', pillar: 'converters', prefix: 'converter', ecosystem: 'Temperature', name: '°C → °F',
    h1: 'Celsius to Fahrenheit Converter',
    metaTitle: 'Celsius to Fahrenheit Converter | °C to °F | Calcoly',
    metaDesc: 'Convert Celsius to Fahrenheit (°C to °F) instantly. Exact formula °F = (°C × 9/5) + 32, temperature calculation steps, and cooking/weather table. Free.',
    kw: ['celsius to fahrenheit', 'Celsius to Fahrenheit converter', '°C to °F', 'convert Celsius to Fahrenheit'],
    widget: { type: 'convert', mode: 'c2f', from: { unit: '°C', label: 'Celsius' }, to: { unit: '°F', label: 'Fahrenheit' }, start: 20, dec: 2 },
    lead: 'Convert Celsius to Fahrenheit instantly — weather, oven temperatures, and science measurements live in both directions.',
    formula: '°F = (°C × 9/5) + 32',
    explanation: 'On the Celsius scale, water freezes at 0°C and boils at 100°C (a 100-degree span). On the Fahrenheit scale, water freezes at 32°F and boils at 212°F (a 180-degree span). Each 1°C equals 1.8°F (9/5). To convert, multiply Celsius by 9/5 (or 1.8) and add 32.',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Enter the temperature in <strong>Celsius (°C)</strong> in the first box.</li><li>The value in <strong>Fahrenheit (°F)</strong> calculates in real time.</li><li>Click the <strong>Swap (⇄)</strong> button to convert from Fahrenheit to Celsius.</li><li>Click <strong>Copy</strong> to copy the result.</li></ol>',
    examples: [
      '20°C (comfortable room temperature) equals 68°F ((20 × 1.8) + 32).',
      '0°C (freezing point of water) equals 32°F.',
      '37°C (normal human body temperature) equals 98.6°F.',
      '100°C (boiling water at sea level) equals 212°F.',
      '180°C (moderate baking oven) equals 356°F.'
    ],
    customTable: {
      title: 'Celsius to Fahrenheit Conversion Table',
      headers: ['Celsius (°C)', 'Fahrenheit (°F)', 'Key Temperature Benchmark'],
      rows: [
        ['-40°C', '-40°F', 'Exact parity point (Scales equal)'],
        ['-20°C', '-4°F', 'Deep freezer temperature'],
        ['0°C', '32°F', 'Freezing point of water'],
        ['10°C', '50°F', 'Cool autumn day'],
        ['20°C', '68°F', 'Room temperature'],
        ['25°C', '77°F', 'Warm summer day'],
        ['37°C', '98.6°F', 'Normal human body temperature'],
        ['40°C', '104°F', 'Severe heatwave / high fever'],
        ['100°C', '212°F', 'Boiling point of water at sea level'],
        ['180°C', '356°F', 'Standard baking oven (Gas Mark 4)'],
        ['200°C', '392°F', 'Hot oven (Gas Mark 6)'],
        ['220°C', '428°F', 'Very hot roasting oven (Gas Mark 7)']
      ]
    },
    invertedSlug: 'fahrenheit-to-celsius',
    related: ['fahrenheit-to-celsius', 'oven-temp-gas-mark'],
    faqs: [
      { q: 'What is 20°C in Fahrenheit?', a: '20°C equals 68°F.' },
      { q: 'What is the formula for Celsius to Fahrenheit?', a: '°F = (°C × 9/5) + 32, or °F = (°C × 1.8) + 32.' },
      { q: 'At what temperature are Celsius and Fahrenheit the same?', a: 'At −40°, both scales read the exact same value (−40°C = −40°F).' },
      { q: 'What is 180°C in Fahrenheit for baking?', a: '180°C equals 356°F (typically rounded to 350°F in US recipes).' }
    ],
  },
  {
    slug: 'fahrenheit-to-celsius', pillar: 'converters', prefix: 'converter', ecosystem: 'Temperature', name: '°F → °C',
    h1: 'Fahrenheit to Celsius Converter',
    metaTitle: 'Fahrenheit to Celsius Converter | °F to °C | Calcoly',
    metaDesc: 'Convert Fahrenheit to Celsius (°F to °C) instantly. Exact formula °C = (°F − 32) × 5/9, live calculation, and oven & weather conversion chart. Free.',
    kw: ['fahrenheit to celsius', 'Fahrenheit to Celsius converter', '°F to °C', 'convert Fahrenheit to Celsius'],
    widget: { type: 'convert', mode: 'f2c', from: { unit: '°F', label: 'Fahrenheit' }, to: { unit: '°C', label: 'Celsius' }, start: 68, dec: 2 },
    lead: 'Convert Fahrenheit to Celsius instantly — oven settings, fever checks, and weather forecasts live.',
    formula: '°C = (°F − 32) × 5/9',
    explanation: 'To convert Fahrenheit to Celsius, subtract 32 from the Fahrenheit temperature (to align the zero point), then multiply by 5/9 (or divide by 1.8) to account for the scale ratio.',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Type the temperature in <strong>Fahrenheit (°F)</strong> into the first field.</li><li>The value in <strong>Celsius (°C)</strong> computes immediately.</li><li>Click <strong>Swap (⇄)</strong> to convert Celsius to Fahrenheit.</li><li>Click <strong>Copy</strong> to copy the result.</li></ol>',
    examples: [
      '350°F (standard oven baking temp) equals 176.67°C ((350 − 32) × 5/9).',
      '32°F (freezing point of water) equals 0°C.',
      '68°F (comfortable room temperature) equals 20°C.',
      '98.6°F (normal body temperature) equals 37°C.',
      '400°F (roasting oven) equals 204.44°C.'
    ],
    customTable: {
      title: 'Fahrenheit to Celsius Conversion Table',
      headers: ['Fahrenheit (°F)', 'Celsius (°C)', 'Culinary & Weather Note'],
      rows: [
        ['-40°F', '-40°C', 'Scales equal'],
        ['0°F', '-17.78°C', 'Frigid winter temperature'],
        ['32°F', '0°C', 'Freezing point of water'],
        ['68°F', '20°C', 'Standard room temperature'],
        ['72°F', '22.22°C', 'Comfortable indoor temperature'],
        ['98.6°F', '37°C', 'Normal body temperature'],
        ['104°F', '40°C', 'High fever / extreme heat'],
        ['212°F', '100°C', 'Boiling point of water at sea level'],
        ['325°F', '162.78°C', 'Slow baking / custards'],
        ['350°F', '176.67°C', 'Standard baking (175°C–180°C)'],
        ['375°F', '190.56°C', 'Moderate high heat (190°C)'],
        ['400°F', '204.44°C', 'Roasting vegetables & chicken (200°C)'],
        ['450°F', '232.22°C', 'High heat pizza & crusty bread (230°C)']
      ]
    },
    invertedSlug: 'celsius-to-fahrenheit',
    related: ['celsius-to-fahrenheit', 'oven-temp-gas-mark'],
    faqs: [
      { q: 'What is 350°F in Celsius?', a: '350°F equals 176.67°C (often rounded to 175°C or 180°C in European recipes).' },
      { q: 'What is 400°F in Celsius?', a: '400°F equals 204.44°C (rounded to 200°C fan).' },
      { q: 'How do I convert Fahrenheit to Celsius in my head?', a: 'Subtract 30 from the Fahrenheit temperature, then divide by 2. For 72°F: (72 − 30) ÷ 2 = 21°C (close to the exact 22.22°C).' },
      { q: 'What is 32°F in Celsius?', a: '32°F equals exactly 0°C.' }
    ],
  },

  /* ============================================================
     PERCENTAGE ECOSYSTEM
     ============================================================ */
  {
    slug: 'percentage', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Percentage', name: 'Percentage',
    h1: 'Percentage Calculator',
    metaTitle: 'Percentage Calculator | Calculate Percentages Online | Calcoly',
    metaDesc: 'Free online percentage calculator. Solve what is X% of Y, X is what percent of Y, and percentage change instantly with clear step-by-step formulas.',
    kw: ['percentage calculator', 'percent calculator', 'calculate percentage', 'percentage formula', 'percentage calculator online'],
    widget: { type: 'percentage' },
    lead: 'Solve the three most common percentage calculations live: what is X% of Y, X is what percent of Y, and percentage change.',
    formula: 'percentage = (part ÷ whole) × 100',
    explanation: 'A percentage represents a fraction of 100. To find what percentage a part represents of a total whole, divide the part by the total and multiply by 100. To calculate X percent of a number Y, multiply Y by (X ÷ 100).',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li><strong>What is X% of Y:</strong> Enter the percentage and total to find the portion amount.</li><li><strong>X is what % of Y:</strong> Enter the portion and whole to find the percentage rate.</li><li><strong>Percentage Change:</strong> Enter starting and ending values to calculate the percentage difference.</li><li>Results calculate in real time as you type each digit.</li></ol>',
    examples: [
      'What is 15% of $200? Result: $30 ((15 ÷ 100) × 200).',
      '30 is what percent of 200? Result: 15% ((30 ÷ 200) × 100).',
      'An increase from $80 to $100 equals a +25% change.',
      'A reduction from $100 to $75 equals a −25% change.'
    ],
    customTable: {
      title: 'Common Percentages of $100 and $200',
      headers: ['Percentage Rate', 'Of $100', 'Of $200', 'Decimal Multiplier'],
      rows: [
        ['5%', '$5.00', '$10.00', '× 0.05'],
        ['10%', '$10.00', '$20.00', '× 0.10'],
        ['15%', '$15.00', '$30.00', '× 0.15'],
        ['20%', '$20.00', '$40.00', '× 0.20'],
        ['25%', '$25.00', '$50.00', '× 0.25'],
        ['30%', '$30.00', '$60.00', '× 0.30'],
        ['50%', '$50.00', '$100.00', '× 0.50'],
        ['75%', '$75.00', '$150.00', '× 0.75'],
        ['100%', '$100.00', '$200.00', '× 1.00']
      ]
    },
    related: ['percentage-increase', 'percentage-decrease', 'percent-off', 'discount'],
    faqs: [
      { q: 'How do I calculate a percentage of a number?', a: 'Multiply the number by the percentage written as a decimal. For example, 15% of 200 = 200 × 0.15 = 30.' },
      { q: 'What is the mathematical percentage formula?', a: 'Percentage = (Part ÷ Whole) × 100.' },
      { q: 'How do I calculate what percentage one number is of another?', a: 'Divide the specific number by the total number, then multiply by 100. For example, 25 out of 50 = (25 ÷ 50) × 100 = 50%.' }
    ],
  },
  {
    slug: 'percentage-increase', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Percentage', name: 'Percentage Increase',
    h1: 'Percentage Increase Calculator',
    metaTitle: 'Percentage Increase Calculator | Calculate Percent Increase | Calcoly',
    metaDesc: 'Calculate percentage increase between two numbers instantly. Exact formula ((New − Old) ÷ Old) × 100 with clear examples for prices, salary, and growth.',
    kw: ['percentage increase calculator', 'percent increase calculator', 'percentage increase', 'calculate percentage increase', 'percentage change'],
    widget: { type: 'pct_inc' },
    lead: 'Calculate the percentage growth or rate of increase from an initial starting value to a new final value instantly.',
    formula: 'percentage increase = ((new value − original value) ÷ original value) × 100',
    explanation: 'To determine percentage increase, first find the absolute growth by subtracting the original value from the new value. Then divide that growth by the original value and multiply by 100 to convert to a percentage.',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Type the <strong>Original (Starting) Value</strong> into the first input box.</li><li>Type the <strong>New (Final) Value</strong> into the second input box.</li><li>The <strong>Percentage Increase (%)</strong> and absolute difference calculate automatically.</li></ol>',
    examples: [
      'Salary rising from $50,000 to $55,000 is a 10% increase ((55000 − 50000) ÷ 50000 × 100).',
      'Price rising from $80 to $100 is a 25% increase ((100 − 80) ÷ 80 × 100).',
      'Website traffic growing from 500 to 1,200 visits is a 140% increase.'
    ],
    customTable: {
      title: 'Percentage Increase Multiplier Guide',
      headers: ['Percent Increase', 'Mathematical Multiplier', 'Example ($100 base)'],
      rows: [
        ['+5% Increase', '× 1.05', '$105.00'],
        ['+10% Increase', '× 1.10', '$110.00'],
        ['+15% Increase', '× 1.15', '$115.00'],
        ['+20% Increase', '× 1.20', '$120.00'],
        ['+25% Increase', '× 1.25', '$125.00'],
        ['+30% Increase', '× 1.30', '$130.00'],
        ['+50% Increase', '× 1.50', '$150.00'],
        ['+75% Increase', '× 1.75', '$175.00'],
        ['+100% Increase (Doubled)', '× 2.00', '$200.00']
      ]
    },
    related: ['percentage', 'percentage-decrease', 'percent-off', 'discount'],
    faqs: [
      { q: 'What is the formula for percentage increase?', a: 'Percentage Increase = ((New Value − Original Value) ÷ Original Value) × 100.' },
      { q: 'How do I calculate a 10% increase on a number?', a: 'Multiply the original number by 1.10. For example, $80 × 1.10 = $88.' },
      { q: 'Can percentage increase exceed 100%?', a: 'Yes. Any time a value more than doubles, the increase is greater than 100%. For example, increasing from 10 to 30 is a 200% increase.' }
    ],
  },
  {
    slug: 'percentage-decrease', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Percentage', name: 'Percentage Decrease',
    h1: 'Percentage Decrease Calculator',
    metaTitle: 'Percentage Decrease Calculator — Calculate % Drop | Calcoly',
    metaDesc: 'Calculate the percentage decrease between two values or subtract a percent instantly. Free.',
    kw: ['percentage decrease calculator', 'percent drop', 'percent reduction'],
    widget: { type: 'pct_dec' },
    lead: 'Calculate the percent drop or reduction between two values instantly.',
    formula: 'decrease % = ((old - new) / old) × 100',
    examples: [
      'Weight drop from 200 lbs to 180 lbs is a 10% decrease.',
      'Price drop from $100 to $75 is a 25% decrease.'
    ],
    related: ['percentage-increase', 'percent-off', 'discount', 'percentage'],
    faqs: [
      { q: 'How do I calculate a percentage drop?', a: '((Initial Value − Final Value) ÷ Initial Value) × 100.' },
    ],
  },
  {
    slug: 'percent-off', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Percentage', name: 'Percent Off',
    h1: 'Percent Off Calculator',
    metaTitle: 'Percent Off Calculator — Calculate Sale Savings | Calcoly',
    metaDesc: 'Calculate exact savings and final price for 10% off, 20% off, 30% off, 50% off and more. Free.',
    kw: ['percent off calculator', '20 percent off', '30 percent off', '50 percent off'],
    widget: { type: 'discount' },
    lead: 'Enter original price and percent off to see final price and total money saved.',
    formula: 'final price = original price × (1 - discount%/100)',
    examples: [
      '$100 item with 20% off costs $80 (you save $20).',
      '$75 item with 30% off costs $52.50 (you save $22.50).'
    ],
    related: ['discount', 'percentage', 'percentage-decrease', 'vat-calculator'],
    faqs: [
      { q: 'How do I calculate 20% off?', a: 'Multiply the price by 0.80 to get the final sale price.' },
      { q: 'How do I calculate 30% off?', a: 'Multiply the price by 0.70.' },
    ],
  },

  /* ============================================================
     BAKING & ARTISAN COFFEE ECOSYSTEM
     ============================================================ */
  {
    slug: 'cups-to-grams', pillar: 'baking', prefix: 'baking', ecosystem: 'Baking', name: 'Cups → Grams',
    h1: 'Cups to Grams Converter',
    metaTitle: 'Cups to Grams Converter | Baking Conversion Chart | Calcoly',
    metaDesc: 'Convert cups to grams for flour, sugar, butter and 16 baking ingredients. Accurate density-specific kitchen conversion table and live calculator. Free.',
    kw: ['cups to grams', 'cup to grams', 'cups in grams', 'convert cups to grams', 'baking cups to grams', 'ingredient cups to grams'],
    widget: { type: 'cupsgrams', dir: 'c2g' },
    lead: 'Convert cups to grams for 16 essential baking ingredients with verified culinary density values.',
    formula: 'grams = cups × ingredient density (g/cup)',
    explanation: 'One measuring cup does not equal a universal gram weight because cups measure volume while grams measure mass. Ingredient density varies drastically: 1 US cup of all-purpose flour weighs approximately 120 grams, 1 cup of granulated sugar weighs 200 grams, and 1 cup of butter weighs 227 grams. Accurate baking requires multiplying cups by the specific ingredient density.',
    howToUse: '<ol style="margin:8px 0 12px 20px;line-height:1.7"><li>Select your <strong>Baking Ingredient</strong> from the dropdown menu.</li><li>Enter the number of <strong>Cups</strong> (fractions or decimals supported).</li><li>The exact weight in <strong>Grams (g)</strong> calculates instantly.</li><li>Click <strong>Swap (⇄)</strong> to convert grams back to cups.</li></ol>',
    examples: [
      '1 US cup of All-purpose flour = 120 grams (2 cups = 240g).',
      '1 US cup of Granulated sugar = 200 grams (1/2 cup = 100g).',
      '1 US cup of Unsalted butter = 227 grams (1 stick = 1/2 cup = 113.5g).',
      '1 US cup of Rolled oats = 90 grams.',
      '1 US cup of Honey = 340 grams.'
    ],
    customTable: {
      title: 'Baking Ingredient Cups to Grams Conversion Chart',
      headers: ['Ingredient', '1 Cup', '1/2 Cup', '1/3 Cup', '1/4 Cup'],
      rows: [
        ['All-Purpose Flour (spooned)', '120 g', '60 g', '40 g', '30 g'],
        ['Bread Flour', '128 g', '64 g', '43 g', '32 g'],
        ['Cake Flour', '114 g', '57 g', '38 g', '29 g'],
        ['Whole Wheat Flour', '130 g', '65 g', '43 g', '33 g'],
        ['Granulated White Sugar', '200 g', '100 g', '67 g', '50 g'],
        ['Brown Sugar (packed)', '220 g', '110 g', '73 g', '55 g'],
        ['Powdered / Icing Sugar', '120 g', '60 g', '40 g', '30 g'],
        ['Butter (unsalted)', '227 g', '113.5 g', '76 g', '57 g'],
        ['Cocoa Powder (unsweetened)', '100 g', '50 g', '33 g', '25 g'],
        ['Rolled Oats', '90 g', '45 g', '30 g', '23 g'],
        ['Honey / Molasses', '340 g', '170 g', '113 g', '85 g'],
        ['Milk / Water', '240 g', '120 g', '80 g', '60 g']
      ]
    },
    invertedSlug: 'grams-to-cups',
    related: ['grams-to-cups', 'recipe-scaler', 'bakers-percentage-scaler', 'ingredient-density-converter', 'pan-size-substitution'],
    faqs: [
      { q: 'How many grams is 1 cup of all-purpose flour?', a: '1 US cup of all-purpose flour equals 120 grams when stirred and spooned into the measuring cup.' },
      { q: 'Why is 1 cup of sugar heavier than 1 cup of flour?', a: 'Granulated sugar has a much higher physical density than flour. 1 cup of sugar weighs 200 grams, whereas 1 cup of flour weighs only 120 grams.' },
      { q: 'How many grams is 1 cup of butter?', a: '1 US cup of butter equals 227 grams (equivalent to 2 standard US sticks of butter).' },
      { q: 'Why do bakers recommend kitchen scales over measuring cups?', a: 'Scooping flour directly with a measuring cup can pack it down and add up to 25% extra flour to your recipe. Weighing ingredients in grams guarantees consistent, repeatable baking results.' }
    ],
  },
  {
    slug: 'grams-to-cups', pillar: 'baking', prefix: 'baking', ecosystem: 'Baking', name: 'Grams → Cups',
    h1: 'Grams to Cups Converter',
    metaTitle: 'Grams to Cups Converter — With Ingredient Chart | Calcoly',
    metaDesc: 'Convert grams to cups for flour, sugar, butter and 16 ingredients. Live results with per-ingredient densities. Free.',
    kw: ['grams to cups', 'gram to cup', 'how many cups is 250 grams of flour'],
    widget: { type: 'cupsgrams', dir: 'g2c' },
    lead: 'Converting a metric recipe to cups? Pick the ingredient and enter grams — cups update live.',
    formula: 'cups = grams ÷ ingredient density (g/cup)',
    examples: [
      '240g of All-purpose flour = 2.0 US cups.',
      '200g of Granulated sugar = 1.0 US cup.',
      '113g of Butter = 0.5 US cups (1 stick).'
    ],
    invertedSlug: 'cups-to-grams',
    related: ['cups-to-grams', 'recipe-scaler', 'tbsp-to-cups'],
    faqs: [
      { q: 'How many cups is 250 grams of flour?', a: 'About 2.08 US cups of all-purpose flour (120g/cup).' },
      { q: 'How many cups is 200g of sugar?', a: 'Exactly 1.0 US cup of granulated sugar.' },
    ],
  },
  {
    slug: 'sourdough-hydration', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Sourdough Hydration',
    h1: 'Sourdough Hydration Calculator',
    metaTitle: 'Sourdough Hydration Calculator — Calculate Dough % | Calcoly',
    metaDesc: 'Calculate sourdough hydration percentage from flour and water weights. Free, live artisan bread math.',
    kw: ['sourdough hydration calculator', 'dough hydration percentage', 'bakers hydration', 'sourdough water flour ratio'],
    widget: { type: 'sourdough' },
    lead: 'Enter flour and water weights to calculate sourdough hydration percentage instantly.',
    formula: 'hydration % = (water_weight / flour_weight) × 100',
    examples: [
      '500g flour + 375g water = 75% hydration (standard open-crumb sourdough).',
      '500g flour + 400g water = 80% hydration (high hydration dough).'
    ],
    related: ['bakers-percentage-scaler', 'yeast-conversion', 'cups-to-grams'],
    faqs: [
      { q: 'What is a good sourdough hydration for beginners?', a: '68% to 72% hydration is easy to shape while yielding great open crumb.' },
      { q: 'How does starter levain affect total hydration?', a: 'If your starter is 100% hydration (equal flour and water), add half its weight to water and half to flour.' }
    ],
  },
  {
    slug: 'bakers-percentage-scaler', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Baker\'s Percentage Scaler',
    h1: 'Baker\'s Percentage Scaler',
    metaTitle: 'Baker\'s Percentage Scaler — Scale to Target Dough Weight | Calcoly',
    metaDesc: 'Input baker\'s percentages and target total dough weight to scale flour, water, salt, and levain grams instantly.',
    kw: ['bakers percentage calculator', 'dough weight scaler', 'bakers math', 'scale bread recipe'],
    widget: { type: 'bakers_pct' },
    lead: 'Enter baker\'s percentages and target total dough weight to calculate exact ingredient weights in grams.',
    formula: 'flour_g = target_dough_g / (total_% / 100); ingredient_g = flour_g × (ingredient_% / 100)',
    examples: [
      'Target 800g dough at 75% water, 2% salt, 20% levain = 406g flour, 305g water, 8.1g salt, 81g levain.'
    ],
    related: ['sourdough-hydration', 'cups-to-grams', 'recipe-scaler'],
    faqs: [
      { q: 'What is baker\'s percentage notation?', a: 'Total flour weight is always set to 100%, and every other ingredient is expressed as a ratio of the flour.' }
    ],
  },
  {
    slug: 'cold-brew-coffee-ratio', pillar: 'baking', prefix: 'baking', ecosystem: 'Coffee & Brew', name: 'Cold Brew Coffee Ratio',
    h1: 'Cold Brew Coffee Ratio Calculator',
    metaTitle: 'Cold Brew Coffee Ratio Calculator — Grounds to Water | Calcoly',
    metaDesc: 'Calculate exact coffee grounds (g) and water (ml/oz) for standard or concentrate cold brew ratio strengths.',
    kw: ['cold brew ratio calculator', 'cold brew coffee grounds to water', 'cold brew concentrate ratio'],
    widget: { type: 'cold_brew' },
    lead: 'Calculate exact coffee grounds and water volume for cold brew concentrate (1:4) or standard cold brew (1:8).',
    formula: 'water (ml) = coffee_grounds (g) × ratio_factor',
    examples: [
      '100g coffee grounds + 400ml water = 1:4 Cold Brew Concentrate.',
      '100g coffee grounds + 800ml water = 1:8 Ready-to-Drink Cold Brew.'
    ],
    related: ['espresso-brew-ratio', 'recipe-scaler'],
    faqs: [
      { q: 'What is the standard cold brew coffee ratio?', a: '1:4 for strong concentrate (dilute 1:1 with milk/ice) or 1:8 for ready-to-drink.' }
    ],
  },
  {
    slug: 'espresso-brew-ratio', pillar: 'baking', prefix: 'baking', ecosystem: 'Coffee & Brew', name: 'Espresso Brew Ratio',
    h1: 'Espresso Brew Ratio Calculator',
    metaTitle: 'Espresso Brew Ratio Calculator — Dose to Yield Ratio | Calcoly',
    metaDesc: 'Calculate espresso dose to yield ratios (Ristretto 1:1, Normale 1:2, Lungo 1:3) instantly. Free.',
    kw: ['espresso brew ratio calculator', 'espresso dose to yield', '1:2 espresso ratio'],
    widget: { type: 'espresso_ratio' },
    lead: 'Enter coffee dose in grams and liquid espresso yield in grams to calculate shot ratio and classification.',
    formula: 'ratio = 1 : (espresso_yield_g / coffee_dose_g)',
    examples: [
      '18g coffee dose : 36g espresso yield = 1:2 ratio (Standard Normale Espresso).',
      '18g coffee dose : 24g espresso yield = 1:1.3 ratio (Ristretto).'
    ],
    related: ['cold-brew-coffee-ratio'],
    faqs: [
      { q: 'What is standard espresso brew ratio?', a: '1:2 ratio (e.g. 18g coffee dose yielding 36g liquid espresso in 25-30 seconds).' }
    ],
  },
  {
    slug: 'yeast-conversion', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Yeast Conversion',
    h1: 'Yeast Conversion Calculator',
    metaTitle: 'Yeast Conversion Calculator — Fresh, Active Dry, Instant | Calcoly',
    metaDesc: 'Convert grams between Fresh Cake Yeast, Active Dry Yeast, and Instant Yeast instantly. Free.',
    kw: ['yeast conversion calculator', 'fresh yeast to active dry', 'instant yeast to fresh yeast'],
    widget: { type: 'yeast_conv' },
    lead: 'Convert between Fresh Cake Yeast, Active Dry Yeast, and Instant Yeast for any bread recipe.',
    formula: 'Fresh : Active Dry : Instant = 3 : 1.5 : 1',
    examples: [
      '21g Fresh Cake Yeast = 10.5g Active Dry Yeast = 7g Instant Yeast.'
    ],
    related: ['sourdough-hydration', 'bakers-percentage-scaler', 'cups-to-grams'],
    faqs: [
      { q: 'How do I substitute Instant Yeast for Active Dry?', a: 'Use 25% less Instant Yeast than Active Dry (multiply Active Dry grams by 0.75).' }
    ],
  },
  {
    slug: 'gelatin-converter', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Gelatin Sheet to Powder',
    h1: 'Gelatin Sheet to Powder Converter',
    metaTitle: 'Gelatin Sheet to Powder Converter — Bronze, Silver, Gold, Platinum | Calcoly',
    metaDesc: 'Convert gelatin sheets (Bronze, Silver, Gold, Platinum) to powdered gelatin grams. Free.',
    kw: ['gelatin sheet to powder converter', 'silver gelatin sheet grams', 'gold gelatin sheet to powder'],
    widget: { type: 'gelatin_conv' },
    lead: 'Convert gelatin sheets (Bronze, Silver, Gold, Platinum) to powdered gelatin grams accurately for pastry recipes.',
    formula: 'Bronze: 1.8g/sheet, Silver: 2.5g/sheet, Gold: 2.0g/sheet, Platinum: 1.7g/sheet; 1 average sheet ≈ 2.0g powder',
    examples: [
      '4 Silver Gelatin Sheets (2.5g each) = 10 grams powdered gelatin.'
    ],
    related: ['cups-to-grams', 'recipe-scaler'],
    faqs: [
      { q: 'Are gelatin sheets interchangeable by sheet count?', a: 'Yes — gelatin sheets are standardized by Bloom strength, so 1 Gold sheet sets the same volume as 1 Silver sheet despite weight differences.' }
    ],
  },
  {
    slug: 'honey-for-sugar-substitute', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Honey for Sugar Substitute',
    h1: 'Honey for Sugar Substitute Calculator',
    metaTitle: 'Honey for Sugar Substitute Calculator — Adjust Liquid & Temp | Calcoly',
    metaDesc: 'Calculate honey substitution for granulated white sugar, including liquid reduction, baking soda, and oven temperature drop.',
    kw: ['substitute honey for sugar calculator', 'honey instead of sugar in baking', 'how to swap honey for sugar'],
    widget: { type: 'honey_sub' },
    lead: 'Calculate exact honey weight/volume when swapping white sugar, with automatic liquid, baking soda, and temperature adjustments.',
    formula: 'Honey = 0.75-0.80 × Sugar; Reduce recipe liquids by 1/4 cup per cup honey; Add 1/4 tsp baking soda per cup honey; Lower oven by 25°F.',
    examples: [
      '1 cup (200g) Sugar = 3/4 cup (255g) Honey + reduce liquid by 60ml + add 1/4 tsp baking soda + drop oven by 25°F (15°C).'
    ],
    related: ['cups-to-grams', 'grams-to-cups'],
    faqs: [
      { q: 'Why lower oven temperature when baking with honey?', a: 'Honey caramelizes and browning occurs at a lower temperature than table sugar.' }
    ],
  },
  {
    slug: 'canning-pressure-altitude', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Canning Pressure by Altitude',
    h1: 'Canning Pressure Altitude Adjuster',
    metaTitle: 'Canning Pressure Altitude Adjuster — Weighted & Dial Gauge PSI | Calcoly',
    metaDesc: 'Calculate safe pressure canner PSI adjustments based on your elevation altitude above sea level. Free.',
    kw: ['canning pressure altitude calculator', 'pressure canning PSI elevation', 'canning altitude chart'],
    widget: { type: 'canning_alt' },
    lead: 'Input your elevation altitude to calculate safe pressure canning PSI requirements for weighted and dial gauge canners.',
    formula: 'Above 1,000 ft: increase weighted gauge from 10 PSI to 15 PSI; dial gauge increases by +1 PSI per 2,000 ft.',
    examples: [
      'At 2,500 ft elevation: Weighted Gauge = 15 PSI; Dial Gauge = 12 PSI.'
    ],
    related: ['brine-calculator', 'recipe-scaler'],
    faqs: [
      { q: 'Why adjust pressure canning for altitude?', a: 'Water boils at lower temperatures at higher elevations, requiring higher pressure to kill botulism spores safely.' }
    ],
  },
  {
    slug: 'cocoa-powder-chocolate-substitute', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Cocoa Powder to Chocolate',
    h1: 'Cocoa Powder to Chocolate Substitute',
    metaTitle: 'Cocoa Powder to Melted Chocolate Substitute Calculator | Calcoly',
    metaDesc: 'Convert unsweetened baking chocolate to cocoa powder and butter/oil fat additions accurately. Free.',
    kw: ['substitute cocoa powder for baking chocolate', 'unsweetened chocolate to cocoa powder', 'cocoa powder butter ratio'],
    widget: { type: 'cocoa_sub' },
    lead: 'Calculate cocoa powder and butter/oil amounts when substituting unsweetened baking chocolate in baking recipes.',
    formula: '1 oz (28g) Unsweetened Chocolate = 3 tbsp (18g) Cocoa Powder + 1 tbsp (14g) Butter/Oil',
    examples: [
      '4 oz Unsweetened Chocolate = 12 tbsp (72g) Cocoa Powder + 4 tbsp (56g) Butter.'
    ],
    related: ['cups-to-grams', 'recipe-scaler'],
    faqs: [
      { q: 'Can I use Dutch-process cocoa powder instead of natural cocoa?', a: 'Dutch-process cocoa is neutralized and will not react with baking soda; use natural cocoa if baking soda is the only leavener.' }
    ],
  },
  {
    slug: 'brine-calculator', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Brine Calculator',
    h1: 'Brine Calculator (Water to Salt Ratio)',
    metaTitle: 'Brine Calculator — Water to Salt Ratio by Weight & Volume | Calcoly',
    metaDesc: 'Calculate exact salt weight (g) for equilibrium brine (1.5%-2%) or wet brine (5%-10%) for poultry, pork, and pickles. Free.',
    kw: ['brine calculator', 'turkey brine salt ratio', 'equilibrium brine calculator', 'pickling brine salt percentage'],
    widget: { type: 'brine_calc' },
    lead: 'Calculate exact salt weight in grams for wet brining turkey, chicken, pork, or pickling vegetables based on water volume.',
    formula: 'salt (g) = water_weight (g) × (brine_% / 100)',
    examples: [
      '1 Liter (1,000g) water at 5% standard brine = 50g Kosher/Sea Salt.',
      '4 Liters (4,000g) water for Turkey at 6% brine = 240g Salt.'
    ],
    related: ['canning-pressure-altitude', 'cups-to-grams'],
    faqs: [
      { q: 'What is equilibrium brining vs wet brining?', a: 'Equilibrium brining uses 1.5% to 2% total salt weight (meat + water) so it can never get over-salted. Wet brining uses 5-8% salt for faster absorption.' }
    ],
  },
  {
    slug: 'recipe-scaler', pillar: 'baking', prefix: 'baking', ecosystem: 'Baking', name: 'Recipe Scaler',
    h1: 'Recipe Scaler Calculator',
    metaTitle: 'Recipe Scaler Calculator — Scale Batch Sizes | Calcoly',
    metaDesc: 'Scale any baking or cooking recipe up or down instantly. Enter serving sizes to resize ingredients. Free.',
    kw: ['recipe scaler', 'recipe multiplier', 'double recipe calculator', 'halve recipe'],
    widget: { type: 'recipe_scaler' },
    lead: 'Double, triple, or halve any recipe — scale ingredient quantities instantly for any target batch size.',
    formula: 'new quantity = original quantity × (target servings / original servings)',
    examples: [
      'Scaling a 4-serving recipe up to 10 servings multiplies ingredients by 2.5×.',
      'Halving an 8-serving cake recipe divides all quantities by 2.'
    ],
    related: ['cups-to-grams', 'grams-to-cups', 'tbsp-to-cups'],
    faqs: [
      { q: 'How do I double a recipe?', a: 'Multiply each ingredient quantity by 2. Baking time may increase slightly if using deeper pans.' },
      { q: 'Does scaling affect baking time?', a: 'If you keep pan depth the same by using more pans, bake time stays similar. Deeper batter takes longer.' },
    ],
  },
  {
    slug: 'tbsp-to-cups', pillar: 'baking', prefix: 'baking', ecosystem: 'Baking', name: 'Tbsp → Cups',
    h1: 'Tablespoons to Cups Converter',
    metaTitle: 'Tablespoons to Cups Converter — tbsp to cups | Calcoly',
    metaDesc: 'Convert tablespoons to cups instantly. Live calculation, fluid ounces, and kitchen measurement table. Free.',
    kw: ['tbsp to cups', 'tablespoons to cups', 'how many tablespoons in a cup'],
    widget: { type: 'convert', factor: 0.0625, from: { unit: 'tbsp', label: 'Tablespoons' }, to: { unit: 'cup', label: 'US Cups' }, start: 16, dec: 4 },
    lead: 'Convert tablespoons to cups instantly — standard kitchen volume calculator.',
    formula: 'cups = tablespoons ÷ 16',
    examples: [
      '16 tablespoons = 1 cup.',
      '8 tablespoons = 1/2 cup.',
      '4 tablespoons = 1/4 cup.'
    ],
    related: ['cups-to-grams', 'grams-to-cups', 'recipe-scaler'],
    faqs: [
      { q: 'How many tablespoons in a cup?', a: 'There are exactly 16 tablespoons in 1 US cup.' },
      { q: 'How many tablespoons in 1/2 cup?', a: '8 tablespoons equal 1/2 cup.' },
    ],
  },

  /* ============================================================
     DATE & TIME ECOSYSTEM
     ============================================================ */
  {
    slug: 'days-between-dates', pillar: 'date', prefix: 'date', ecosystem: 'Date & Time', name: 'Days Between Dates',
    h1: 'Days Between Dates Calculator',
    metaTitle: 'Days Between Dates Calculator — Date Difference | Calcoly',
    metaDesc: 'Calculate days between two dates, or add/subtract days from any date. Live results, leap years included. Free.',
    kw: ['days between dates', 'date calculator', 'date difference', 'how many days between'],
    widget: { type: 'datecalc' },
    lead: 'Calculate exact days, weeks, and months between any two calendar dates instantly.',
    formula: 'days = date2 - date1 (calendar days)',
    examples: [
      'Days between Jan 1, 2024 and Dec 31, 2024 = 365 days (leap year).',
      'Days between today and Christmas countdown.'
    ],
    related: ['age', 'word-counter', 'percentage'],
    faqs: [
      { q: 'Does this date calculator account for leap years?', a: 'Yes — all calculations use exact calendar math including leap years.' },
      { q: 'How many days in a year?', a: 'A standard year has 365 days, while a leap year has 366 days.' },
    ],
  },
  {
    slug: 'age', pillar: 'date', prefix: 'date', ecosystem: 'Date & Time', name: 'Age Calculator',
    h1: 'Age Calculator',
    metaTitle: 'Age Calculator — Exact Age from Date of Birth | Calcoly',
    metaDesc: 'Calculate exact age in years, months, and days from date of birth — plus total days lived and next birthday countdown. Free.',
    kw: ['age calculator', 'date of birth calculator', 'how old am i', 'exact age'],
    widget: { type: 'age' },
    lead: 'Enter a date of birth and get exact age in years, months, days, total days lived, and birthday countdown.',
    formula: 'age = current date - date of birth',
    examples: [
      'Born Jan 15, 2000: exact age in years, months, days calculated live.',
      'Total days lived milestone tracker.'
    ],
    related: ['days-between-dates', 'percentage', 'gpa'],
    faqs: [
      { q: 'How is exact age calculated?', a: 'Full calendar years, remaining full months, and leftover days.' },
      { q: 'Does it count leap year birthdays?', a: 'Yes — February 29 leap day births are accurately handled.' },
    ],
  },

  /* ============================================================
     MONEY ECOSYSTEM
     ============================================================ */
  {
    slug: 'tip', pillar: 'money', prefix: 'money', ecosystem: 'Money', name: 'Tip Calculator',
    h1: 'Tip Calculator',
    metaTitle: 'Tip Calculator — Tip and Split the Bill | Calcoly',
    metaDesc: 'Calculate restaurant tip and split the bill per person instantly. 15%, 18%, 20% quick buttons. Free.',
    kw: ['tip calculator', 'gratuity calculator', 'split bill', 'tip splitter'],
    widget: { type: 'tip' },
    lead: 'Enter the bill, pick tip percent, set number of people — tip, total, and per-person amounts update live.',
    formula: 'tip = bill × (tip%/100); total per person = (bill + tip) / people',
    examples: [
      '$85 bill with 18% tip split 2 ways = $9.00 tip per person, total $50.15 each.',
      '$50 bill with 20% tip = $10 tip, total $60.'
    ],
    related: ['discount', 'vat-calculator', 'percent-off'],
    faqs: [
      { q: 'How much should I tip at a US restaurant?', a: '18% to 20% is standard for good table service.' },
      { q: 'Should I tip on pre-tax subtotal?', a: 'Tipping on pre-tax subtotal is traditional, though tipping on total is common.' },
    ],
  },
  {
    slug: 'discount', pillar: 'money', prefix: 'money', ecosystem: 'Money', name: 'Discount Calculator',
    h1: 'Discount Calculator',
    metaTitle: 'Discount Calculator — Sale Price and Savings | Calcoly',
    metaDesc: 'Calculate sale prices instantly: enter price and discount percent to see final price and money saved. Free.',
    kw: ['discount calculator', 'sale price calculator', 'percent off calculator'],
    widget: { type: 'discount' },
    lead: 'Enter original price and discount percentage — final price and savings update live.',
    formula: 'savings = price × (discount%/100); sale price = price - savings',
    examples: [
      '$100 original price with 25% discount = $75 sale price (save $25).',
      '$250 jacket with 40% discount = $150 sale price (save $100).'
    ],
    related: ['percent-off', 'tip', 'vat-calculator', 'percentage'],
    faqs: [
      { q: 'How do I calculate discount price?', a: 'Multiply original price by (1 − discount rate).' },
    ],
  },
  {
    slug: 'vat-calculator', pillar: 'money', prefix: 'money', ecosystem: 'Money', name: 'VAT Calculator',
    h1: 'VAT Calculator',
    metaTitle: 'VAT Calculator — Add or Remove VAT (UK 20%, 5%, Custom) | Calcoly',
    metaDesc: 'Add or remove VAT instantly. UK rates 20%, 5%, 0% or any custom rate — net, VAT and gross shown live. Free.',
    kw: ['vat calculator', 'add vat', 'remove vat', 'uk vat', 'net gross'],
    widget: { type: 'vat' },
    lead: 'Add VAT to a net price or strip VAT out of a gross price — supports standard 20% UK VAT, reduced 5%, or custom rates.',
    formula: 'Add VAT: gross = net × 1.20; Remove VAT: net = gross ÷ 1.20',
    examples: [
      'Add 20% VAT to £100 net = £120 gross (£20 VAT).',
      'Remove 20% VAT from £120 gross = £100 net (£20 VAT).'
    ],
    related: ['discount', 'tip', 'percentage'],
    faqs: [
      { q: 'How do I remove VAT from a total price?', a: 'Divide gross price by 1.20 (for 20% VAT). E.g. £120 / 1.20 = £100 net.' },
      { q: 'What is standard UK VAT?', a: 'Standard UK VAT is 20%.' },
    ],
  },

  /* ============================================================
     EVERYDAY & MATH UTILITIES
     ============================================================ */
  {
    slug: 'word-counter', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Everyday', name: 'Word Counter',
    h1: 'Word Counter',
    metaTitle: 'Word Counter — Count Words, Characters, Sentences | Calcoly',
    metaDesc: 'Count words, characters, sentences, paragraphs and reading time as you type. Free, browser-based.',
    kw: ['word counter', 'word count', 'character counter', 'letter counter'],
    widget: { type: 'wordcount' },
    lead: 'Paste or type text — words, characters, sentences, paragraphs, and reading time update live entirely in your browser.',
    formula: 'words = count of whitespace-separated tokens',
    examples: [
      'Count essay words, social media character limits, and reading duration.'
    ],
    related: ['percentage', 'days-between-dates'],
    faqs: [
      { q: 'How are words counted?', a: 'Any sequence of non-space characters counts as a word.' },
      { q: 'Is my text private?', a: 'Yes — counting is done 100% locally in your browser. Nothing is uploaded.' },
    ],
  },
  {
    slug: 'bmi', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Math', name: 'BMI Calculator',
    h1: 'BMI Calculator',
    metaTitle: 'BMI Calculator — Metric and Imperial Body Mass Index | Calcoly',
    metaDesc: 'Calculate Body Mass Index (BMI) in metric (kg/cm) or imperial (lbs/inches) units with WHO categories. Free.',
    kw: ['bmi calculator', 'body mass index', 'bmi calc', 'bmi chart'],
    widget: { type: 'bmi' },
    lead: 'Enter height and weight — metric or imperial — to see your Body Mass Index with official WHO categories.',
    formula: 'Metric: BMI = kg / (m²); Imperial: BMI = 703 × lbs / (inches²)',
    examples: [
      'Height 175 cm, Weight 70 kg = 22.86 BMI (Normal weight).',
      'Height 5′10″ (70 in), Weight 180 lbs = 25.82 BMI (Overweight).'
    ],
    related: ['kg-to-lbs', 'cm-to-feet', 'percentage'],
    faqs: [
      { q: 'What is the healthy BMI range?', a: 'WHO defines normal weight as BMI between 18.5 and 24.9.' },
      { q: 'Is BMI accurate for athletes?', a: 'BMI does not differentiate muscle from fat, so muscular individuals may score higher.' },
    ],
  },
  {
    slug: 'fraction', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Math', name: 'Fraction Calculator',
    h1: 'Fraction Calculator',
    metaTitle: 'Fraction Calculator — Add, Subtract, Multiply, Divide | Calcoly',
    metaDesc: 'Add, subtract, multiply and divide fractions with instant simplified fraction and decimal results. Free.',
    kw: ['fraction calculator', 'adding fractions', 'fraction simplifier'],
    widget: { type: 'fraction' },
    lead: 'Enter two fractions, choose operation (+, −, ×, ÷), and get reduced simplified fraction and decimal output.',
    formula: 'a/b ± c/d = (ad ± bc) / bd; simplified via greatest common divisor (GCD)',
    examples: [
      '1/3 + 1/4 = 7/12 (0.5833).',
      '3/4 ÷ 1/2 = 3/2 = 1 1/2 (1.5).'
    ],
    related: ['percentage', 'gpa'],
    faqs: [
      { q: 'How do you add fractions with different denominators?', a: 'Find common denominator, add numerators, then simplify.' },
    ],
  },
  {
    slug: 'gpa', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Student', name: 'GPA Calculator',
    h1: 'GPA Calculator',
    metaTitle: 'GPA Calculator — Weighted College & High School GPA (4.0 Scale) | Calcoly',
    metaDesc: 'Calculate weighted GPA on 4.0 scale. Add courses with letter grades and credits — instant results. Free.',
    kw: ['gpa calculator', 'grade point average', 'college gpa', 'weighted gpa'],
    widget: { type: 'gpa' },
    lead: 'Add your courses with letter grades and credit hours — weighted GPA updates live on the standard 4.0 scale.',
    formula: 'GPA = Total Grade Points / Total Credit Hours',
    examples: [
      'Grade A (4.0) in 3 credits + Grade B (3.0) in 4 credits = 3.43 GPA.'
    ],
    related: ['percentage', 'fraction'],
    faqs: [
      { q: 'How is GPA calculated on a 4.0 scale?', a: 'A=4, B=3, C=2, D=1, F=0 multiplied by course credit hours.' },
    ],
  },

  /* ============================================================
     FITNESS & HEALTH ECOSYSTEM
     ============================================================ */
  {
    slug: 'tdee', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Fitness & Health', name: 'TDEE Calculator',
    h1: 'TDEE & Calorie Calculator',
    metaTitle: 'TDEE Calculator — Total Daily Energy Expenditure | Calcoly',
    metaDesc: 'Calculate your Total Daily Energy Expenditure (TDEE), BMR, and target calorie intake for weight loss or muscle gain.',
    kw: ['tdee calculator', 'total daily energy expenditure', 'calorie deficit calculator', 'maintenance calories'],
    widget: { type: 'tdee' },
    lead: 'Calculate your daily maintenance calories, cutting calories for weight loss, and bulking calories based on activity level.',
    formula: 'Mifflin-St Jeor: BMR = (10 × kg) + (6.25 × cm) - (5 × age) + s; TDEE = BMR × Activity Factor',
    examples: [
      '30yr male, 175cm, 75kg, Moderate Activity = ~2,400 kcal TDEE (cutting at 1,900 kcal/day).'
    ],
    related: ['bmi', 'macros', 'water-intake'],
    faqs: [
      { q: 'What is TDEE?', a: 'TDEE stands for Total Daily Energy Expenditure — the total calories your body burns in a 24-hour period.' },
      { q: 'How many calories should I eat to lose weight?', a: 'Eating 500 calories below your TDEE results in approximately 1 lb of fat loss per week.' }
    ],
  },
  {
    slug: 'macros', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Fitness & Health', name: 'Macro Ratio Calculator',
    h1: 'Macro Ratio Calculator',
    metaTitle: 'Macro Ratio Calculator — Protein, Carbs, Fats Grams | Calcoly',
    metaDesc: 'Calculate daily protein, carbohydrate, and fat grams for weight loss, keto, muscle gain, or balanced diet.',
    kw: ['macro calculator', 'macro ratio calculator', 'protein carbs fat grams', 'keto macros'],
    widget: { type: 'macros' },
    lead: 'Calculate exact daily protein, carb, and fat grams based on calorie target and macro split goals.',
    formula: 'Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g',
    examples: [
      '2,000 kcal at 40/30/30 split = 200g Protein, 150g Carbs, 67g Fat.'
    ],
    related: ['tdee', 'bmi', 'water-intake'],
    faqs: [
      { q: 'What is the standard macro ratio for weight loss?', a: '40% Protein, 30% Carbohydrates, 30% Fats is a common high-protein ratio for fat loss.' }
    ],
  },
  {
    slug: 'water-intake', pillar: 'calculators', prefix: 'calculator', ecosystem: 'Fitness & Health', name: 'Water Intake Calculator',
    h1: 'Daily Water Intake Calculator',
    metaTitle: 'Water Intake Calculator — Daily Hydration Goal | Calcoly',
    metaDesc: 'Calculate your recommended daily water intake in liters, fluid ounces, and cups based on weight and exercise.',
    kw: ['water intake calculator', 'daily water goal', 'how much water to drink'],
    widget: { type: 'water_intake' },
    lead: 'Calculate your ideal daily water hydration goal in liters and fluid ounces based on body weight and workout duration.',
    formula: 'Water (L) = (weight_kg × 0.033) + (workout_minutes × 0.012)',
    examples: [
      '70kg body weight + 45 min workout = 2.85 Liters (96 fl oz) per day.'
    ],
    related: ['tdee', 'bmi', 'macros'],
    faqs: [
      { q: 'How much water should I drink per day?', a: 'A standard rule is ~35ml per kg of body weight, plus an additional 350-500ml for every 30 minutes of exercise.' }
    ],
  },

  /* ============================================================
     DIY & CONSTRUCTION ECOSYSTEM
     ============================================================ */
  {
    slug: 'paint-calculator', pillar: 'calculators', prefix: 'calculator', ecosystem: 'DIY & Construction', name: 'Paint Calculator',
    h1: 'Paint Quantity Calculator',
    metaTitle: 'Paint Quantity Calculator — Gallons & Liters Needed | Calcoly',
    metaDesc: 'Calculate gallons or liters of paint needed for room walls, excluding doors and windows. Free.',
    kw: ['paint calculator', 'how much paint do i need', 'gallons of paint calculator'],
    widget: { type: 'paint' },
    lead: 'Calculate exact gallons or liters of paint needed to cover room walls based on wall area, doors, and coats.',
    formula: 'Area = 2 × (Length + Width) × Height - Openings; Gallons = (Area × Coats) / 350 sq ft',
    examples: [
      '12ft × 15ft room with 8ft walls (432 sq ft) = ~1.2 Gallons for 1 coat or 2.5 Gallons for 2 coats.'
    ],
    related: ['tile-calculator', 'concrete-volume'],
    faqs: [
      { q: 'How many square feet does a gallon of paint cover?', a: 'One gallon of standard interior paint covers approximately 350 to 400 square feet.' }
    ],
  },
  {
    slug: 'tile-calculator', pillar: 'calculators', prefix: 'calculator', ecosystem: 'DIY & Construction', name: 'Tile Calculator',
    h1: 'Tile Quantity Calculator',
    metaTitle: 'Tile Quantity Calculator — Floor & Wall Tile Count | Calcoly',
    metaDesc: 'Calculate total tiles needed for floor or wall projects, including 10% waste factor and box estimates. Free.',
    kw: ['tile calculator', 'how many tiles do i need', 'flooring tile count'],
    widget: { type: 'tile' },
    lead: 'Enter room dimensions and tile size to calculate total tiles needed with standard 10% cut waste allowance.',
    formula: 'Tile Area = (Tile W × Tile H) / 144; Total Tiles = (Room Area / Tile Area) × 1.10',
    examples: [
      '10ft × 10ft room (100 sq ft) with 12"×12" tiles = 110 tiles (including 10% waste).'
    ],
    related: ['paint-calculator', 'concrete-volume'],
    faqs: [
      { q: 'Why add 10% extra for tile waste?', a: 'Cutting tiles for edges, corners, and broken pieces typically results in 10% material waste.' }
    ],
  },
  {
    slug: 'concrete-volume', pillar: 'calculators', prefix: 'calculator', ecosystem: 'DIY & Construction', name: 'Concrete Volume Calculator',
    h1: 'Concrete Volume Calculator',
    metaTitle: 'Concrete Volume Calculator — Cubic Yards & 80lb Bags | Calcoly',
    metaDesc: 'Calculate cubic yards, cubic feet, and 60lb/80lb premix concrete bags needed for slabs and footings.',
    kw: ['concrete volume calculator', 'cubic yards concrete', 'how many bags of concrete'],
    widget: { type: 'concrete' },
    lead: 'Calculate cubic yards and premix concrete bags (60lb/80lb) needed for driveway slabs, patios, and footings.',
    formula: 'Cubic Yards = (Length ft × Width ft × Thickness in/12) / 27; 80lb bags = Cubic Feet / 0.60',
    examples: [
      '10ft × 10ft patio slab at 4" thickness = 1.23 Cubic Yards (56 bags of 80lb premix concrete).'
    ],
    related: ['tile-calculator', 'paint-calculator'],
    faqs: [
      { q: 'How many 80lb bags of concrete make a cubic yard?', a: 'It takes 45 bags of 80lb premix concrete to equal 1 cubic yard.' }
    ],
  },

  /* ============================================================
     DIFFERENTIATED GLOBAL CONVERTERS & UTILITY ENGINES
     ============================================================ */
  {
    slug: 'oven-temp-gas-mark', pillar: 'baking', prefix: 'baking', ecosystem: 'Oven & Baking Math', name: 'Oven Temp & Gas Mark',
    h1: 'Oven Temperature & Gas Mark Converter',
    metaTitle: 'Oven Temperature & Gas Mark Converter — °C, °F & Gas Mark | Calcoly',
    metaDesc: 'Convert oven baking temperatures instantly between Celsius (°C), Fahrenheit (°F), Gas Mark, and Fan-Assisted (Convection) settings.',
    kw: ['oven temp converter', 'gas mark to c', 'gas mark to f', 'oven gas mark converter', 'gas mark 4 in celsius', 'gas mark 6 in fahrenheit'],
    widget: { type: 'oven_temp' },
    lead: 'Convert oven baking temperatures instantly between Celsius (°C), Fahrenheit (°F), Gas Mark, and Fan-Assisted (Convection) settings.',
    formula: 'Gas Mark = (°C - 121) / 14 (for °C ≥ 135°C)',
    examples: [
      'Gas Mark 4 = 350°F (180°C standard, 160°C fan).',
      'Gas Mark 6 = 400°F (200°C standard, 180°C fan).'
    ],
    related: ['cups-to-grams', 'pan-size-substitution', 'recipe-scaler'],
    faqs: [
      { q: 'What is Gas Mark 4 in Fahrenheit and Celsius?', a: 'Gas Mark 4 is 350°F (180°C standard oven / 160°C fan-forced oven).' },
      { q: 'How do I adjust baking temperature for a fan-assisted (convection) oven?', a: 'Reduce the standard recipe temperature by 20°C (25°F) for fan-forced ovens.' }
    ],
  },
  {
    slug: 'ingredient-density-converter', pillar: 'baking', prefix: 'baking', ecosystem: 'Ingredient & Kitchen Math', name: 'Density Weight Converter',
    h1: 'Ingredient Density Converter (Volume to Weight)',
    metaTitle: 'Density-Specific Volume to Weight Converter — Oils, Honey, Ghee | Calcoly',
    metaDesc: 'Convert liquid volume (ml, cups, tbsp) to exact weight (grams) for high-density ingredients like honey, olive oil, ghee, molasses, and maple syrup.',
    kw: ['density converter baking', 'ml to grams honey', 'ml to grams oil', 'ghee cups to grams', 'molasses volume to weight'],
    widget: { type: 'density_converter' },
    lead: 'Convert liquid and baking ingredient volume to exact grams based on true density (honey, olive oil, ghee, molasses, syrup, peanut butter).',
    formula: 'mass (g) = volume (ml) × density (g/ml)',
    examples: [
      '1 cup (240 ml) of Honey = 340 grams.',
      '1 cup (240 ml) of Olive Oil = 218 grams.',
      '1 cup (240 ml) of Ghee = 216 grams.'
    ],
    related: ['cups-to-grams', 'grams-to-cups', 'tbsp-to-cups'],
    faqs: [
      { q: 'Why do honey and oil have different weights per cup?', a: 'Honey has a high density of 1.42 g/ml, whereas vegetable oil has a lighter density of 0.91 g/ml.' }
    ],
  },
  {
    slug: 'yarn-weight-gauge', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Craft & Sewing', name: 'Yarn Weight & Gauge',
    h1: 'Yarn Weight & Gauge Converter',
    metaTitle: 'Yarn Weight & Gauge Converter — Knitting & Crochet Standards | Calcoly',
    metaDesc: 'Convert yarn weight categories (Lace, Fingering, DK, Worsted, Bulky) to stitches per 4 inches (10cm) and recommended needle/hook sizes.',
    kw: ['yarn weight converter', 'yarn gauge calculator', 'worsted to dk gauge', 'knitting gauge converter', 'crochet hook yarn category'],
    widget: { type: 'yarn_gauge' },
    lead: 'Convert standard yarn weight categories (0 Lace to 7 Jumbo) to stitch gauge per 4 inches (10 cm) and recommended needle/hook sizes.',
    formula: 'Stitch Gauge = Recommended stitches per 4 inches (10 cm)',
    examples: [
      'Worsted (#4 Medium) = 16–20 stitches per 4" using 4.5–5.5 mm needles.',
      'DK (#3 Light) = 21–24 stitches per 4" using 3.75–4.5 mm needles.'
    ],
    related: ['fabric-yardage-meters', 'paper-size-pixels-dpi'],
    faqs: [
      { q: 'What is the most common yarn weight for beginners?', a: 'Worsted weight (#4 Medium) is the most popular choice for beginners.' }
    ],
  },
  {
    slug: 'fabric-yardage-meters', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Craft & Sewing', name: 'Fabric Yardage → Meters',
    h1: 'Fabric Yardage to Meters Converter',
    metaTitle: 'Fabric Yardage to Meters Converter — Sewing Pattern Calculator | Calcoly',
    metaDesc: 'Convert fabric yards to meters for sewing and quilting patterns. Calculates total material required based on fabric bolt width.',
    kw: ['fabric yards to meters', 'yardage to meters converter', 'sewing fabric calculator', 'fabric yardage converter'],
    widget: { type: 'fabric_yardage' },
    lead: 'Convert fabric yardage to meters for garment and quilting patterns, accounting for standard 44-inch and 60-inch bolt widths.',
    formula: 'meters = yards × 0.9144',
    examples: [
      '2.5 yards of fabric = 2.29 meters.',
      '3.5 yards of 60" fabric = 3.20 meters.'
    ],
    related: ['yarn-weight-gauge', 'paper-size-pixels-dpi'],
    faqs: [
      { q: 'How many meters is 1 yard of fabric?', a: '1 yard equals exactly 0.9144 meters (approx. 91.4 cm).' }
    ],
  },
  {
    slug: 'paper-size-pixels-dpi', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Design & Display', name: 'Paper Size → Pixels / DPI',
    h1: 'Paper Size to Pixels & DPI Converter',
    metaTitle: 'Paper Size to Pixels & DPI Converter — A4, Letter, Poster | Calcoly',
    metaDesc: 'Convert standard paper sizes (A4, A3, Letter, Legal, Tabloid) to exact pixel dimensions for 72, 150, 300, and custom DPI print design.',
    kw: ['paper size to pixels', 'a4 size in pixels 300 dpi', 'letter size in pixels', 'dpi to pixels paper', 'print size pixel converter'],
    widget: { type: 'paper_dpi' },
    lead: 'Calculate exact image canvas dimensions in pixels for standard paper sizes (A4, A3, Letter, Legal) at any DPI target.',
    formula: 'pixels = (inches) × DPI',
    examples: [
      'A4 paper at 300 DPI = 2480 × 3508 pixels.',
      'US Letter at 300 DPI = 2550 × 3300 pixels.'
    ],
    related: ['screen-ppi-calculator', 'word-counter'],
    faqs: [
      { q: 'What DPI is best for high-quality print design?', a: '300 DPI (dots per inch) is the industry standard for crisp, high-resolution print products.' }
    ],
  },
  {
    slug: 'screen-ppi-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Design & Display', name: 'Screen PPI & Size',
    h1: 'Screen Resolution & PPI Calculator',
    metaTitle: 'Screen Resolution & PPI Calculator — Pixels Per Inch | Calcoly',
    metaDesc: 'Calculate screen pixel density (PPI), dot pitch, and physical display dimensions from resolution (width × height) and diagonal screen size.',
    kw: ['ppi calculator', 'pixels per inch calculator', 'screen density calculator', 'display ppi calculator', 'monitor ppi'],
    widget: { type: 'screen_ppi' },
    lead: 'Calculate screen pixel density (PPI), total megapixel count, and physical display width and height from screen resolution and diagonal size.',
    formula: 'PPI = √(width² + height²) / diagonal_inches',
    examples: [
      '27" 4K Monitor (3840×2160) = 163.18 PPI.',
      '15.6" Full HD Laptop (1920×1080) = 141.21 PPI.'
    ],
    related: ['paper-size-pixels-dpi', 'exposure-triangle'],
    faqs: [
      { q: 'What is a good PPI for a desktop computer monitor?', a: '110 to 160 PPI provides sharp text without requiring extreme display scaling.' }
    ],
  },
  {
    slug: 'awg-to-mm2', pillar: 'converters', prefix: 'converter', ecosystem: 'Electrical & Engineering', name: 'AWG → mm² Wire Gauge',
    h1: 'AWG Wire Gauge to mm² Converter',
    metaTitle: 'AWG Wire Gauge to mm² Converter — American Wire Gauge | Calcoly',
    metaDesc: 'Convert American Wire Gauge (AWG) to cross-sectional area in mm², diameter in mm and inches, and electrical resistance per 1000 ft.',
    kw: ['awg to mm2', 'wire gauge converter', 'american wire gauge to mm2', '12 awg to mm2', '10 awg to mm2'],
    widget: { type: 'awg_converter' },
    lead: 'Convert AWG (American Wire Gauge) sizes to cross-sectional area (mm²), diameter (mm/inches), and current-carrying ampacity guidelines.',
    formula: 'diameter (mm) = 0.127 × 92^((36 - AWG) / 39)',
    examples: [
      '12 AWG = 3.31 mm² (2.05 mm diameter).',
      '10 AWG = 5.26 mm² (2.59 mm diameter).'
    ],
    related: ['cm-to-inches', 'mm-to-inches'],
    faqs: [
      { q: 'What is 12 AWG in mm²?', a: '12 AWG equals 3.31 mm² cross-sectional area.' }
    ],
  },
  {
    slug: 'exposure-triangle', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Photography', name: 'Exposure Triangle',
    h1: 'Exposure Triangle Calculator',
    metaTitle: 'Exposure Triangle Calculator — Shutter, Aperture, ISO | Calcoly',
    metaDesc: 'Calculate equivalent camera exposure settings when changing Shutter Speed, Aperture (f-stop), or ISO for manual photography.',
    kw: ['exposure triangle calculator', 'aperture shutter iso calculator', 'equivalent exposure calculator', 'photography exposure calculator'],
    widget: { type: 'exposure_triangle' },
    lead: 'Calculate equivalent shutter speed, aperture (f-stop), or ISO settings when adjusting exposure stops in manual photography.',
    formula: 'EV = log2(f-stop² / shutter_sec) - log2(ISO / 100)',
    examples: [
      '1/125s @ f/8 ISO 100 = 1/250s @ f/5.6 ISO 100 (same EV 13).'
    ],
    related: ['screen-ppi-calculator', 'paper-size-pixels-dpi'],
    faqs: [
      { q: 'What is 1 stop of exposure in photography?', a: '1 stop means doubling or halving the amount of light reaching the camera sensor.' }
    ],
  },
  {
    slug: 'pan-size-substitution', pillar: 'baking', prefix: 'baking', ecosystem: 'Oven & Baking Math', name: 'Baking Pan Substitution',
    h1: 'Baking Pan Size & Time Substitution Calculator',
    metaTitle: 'Baking Pan Size & Time Substitution Calculator | Calcoly',
    metaDesc: 'Adjust cake and baking recipes when swapping pan sizes. Calculates area volume ratio, batter depth, and estimated baking time adjustments.',
    kw: ['baking pan converter', 'pan size substitution', 'cake pan size converter bake time', 'baking pan size calculator'],
    widget: { type: 'pan_substitution' },
    lead: 'Calculate volume differences and recommended baking time adjustments when swapping round, square, or rectangular baking pans.',
    formula: 'Volume Ratio = New Surface Area / Original Surface Area',
    examples: [
      'Swapping 9" round pan (63.6 sq in) to 8" square pan (64 sq in) = 1.01x ratio (same bake time!).',
      'Swapping 9" round pan to 8" round pan (50.3 sq in) = 0.79x area → increases bake time by ~10-15% due to thicker batter.'
    ],
    related: ['pan-volume-equivalence', 'recipe-scaler', 'oven-temp-gas-mark'],
    faqs: [
      { q: 'Can I bake a 9-inch cake recipe in an 8-inch pan?', a: 'Yes! The batter will be thicker, so lower the oven temp by 25°F (15°C) and add 10 to 15 minutes to the baking time.' }
    ],
  },
  {
    slug: 'firewood-cord-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Outdoor & DIY', name: 'Firewood Cord Calculator',
    h1: 'Firewood & Cordwood Volume Calculator',
    metaTitle: 'Firewood & Cordwood Volume Calculator — Cords, Face Cords | Calcoly',
    metaDesc: 'Calculate total cords, face cords, cubic feet, and cubic meters of stacked firewood from stack length, height, and log length.',
    kw: ['firewood cord calculator', 'cord of wood calculator', 'face cord to full cord', 'firewood volume calculator'],
    widget: { type: 'firewood_cord' },
    lead: 'Calculate exact full cords, face cords, cubic feet, and weight of stacked firewood based on stack dimensions.',
    formula: '1 Full Cord = 128 cubic feet of stacked wood (4ft × 4ft × 8ft)',
    examples: [
      'Stack of 8ft length × 4ft height with 16" logs = 1 Face Cord (0.33 Full Cords).'
    ],
    related: ['soil-mulch-calculator', 'paint-coverage-calculator'],
    faqs: [
      { q: 'How many face cords make a full cord?', a: 'If logs are 16 inches long, exactly 3 face cords equal 1 full cord.' }
    ],
  },
  {
    slug: 'aquarium-volume-stocking', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Home & Pets', name: 'Aquarium Stocking Calculator',
    h1: 'Aquarium Volume & Stocking Level Calculator',
    metaTitle: 'Aquarium Volume & Stocking Level Calculator — Gallons & Liters | Calcoly',
    metaDesc: 'Calculate fish tank volume in gallons and liters from tank dimensions, plus recommended fish stocking capacity guidelines.',
    kw: ['aquarium volume calculator', 'fish tank stocking calculator', 'aquarium gallon calculator', 'fish tank size calculator'],
    widget: { type: 'aquarium_stocking' },
    lead: 'Calculate aquarium water volume in US gallons and liters from tank dimensions, and estimate safe fish stocking capacity.',
    formula: 'volume (gallons) = (length × width × height in inches) / 231',
    examples: [
      '30" × 12" × 12" rectangular tank = 18.7 US Gallons (70.8 Liters).'
    ],
    related: ['soil-mulch-calculator', 'concrete-volume'],
    faqs: [
      { q: 'What is the 1 inch of fish per gallon rule?', a: 'A standard rule of thumb is 1 inch of fully grown adult fish per 1 gallon of water for small freshwater species.' }
    ],
  },
  {
    slug: 'soil-mulch-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Outdoor & DIY', name: 'Garden Soil & Mulch',
    h1: 'Garden Soil & Mulch Volume Calculator',
    metaTitle: 'Garden Soil & Mulch Calculator — Cubic Yards & Bags | Calcoly',
    metaDesc: 'Calculate cubic yards, cubic feet, and 2 cu ft / 3 cu ft bag counts of soil, mulch, or compost for garden beds in metric and imperial.',
    kw: ['mulch calculator', 'garden soil calculator', 'cubic yards soil calculator', 'how many bags of mulch do i need'],
    widget: { type: 'soil_mulch' },
    lead: 'Calculate cubic yards, cubic feet, and bag counts of garden soil or mulch needed for raised beds and landscaping.',
    formula: 'cubic yards = (length_ft × width_ft × (depth_inches / 12)) / 27',
    examples: [
      '10ft × 10ft garden bed at 3" mulch depth = 0.93 Cubic Yards (13.5 bags of 2 cu ft mulch).'
    ],
    related: ['paint-coverage-calculator', 'concrete-volume'],
    faqs: [
      { q: 'How many 2 cu ft bags of mulch make a cubic yard?', a: '13.5 bags of 2 cubic foot mulch equal 1 cubic yard.' }
    ],
  },
  {
    slug: 'paint-coverage-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Outdoor & DIY', name: 'Paint Coverage & Coats',
    h1: 'Paint Coverage & Texture Calculator',
    metaTitle: 'Paint Coverage & Texture Calculator — Cans & Gallons | Calcoly',
    metaDesc: 'Calculate gallon and liter paint requirements adjusted for surface texture (smooth, textured, masonry), coats, and doors/windows.',
    kw: ['paint coverage calculator', 'gallons of paint calculator', 'how much paint for textured wall', 'paint cans calculator'],
    widget: { type: 'paint_coverage' },
    lead: 'Calculate total paint gallons or liters needed for interior and exterior walls, accounting for surface texture absorption and coat count.',
    formula: 'Gallons = (Net Wall Area sq ft / Coverage Rate) × Coats',
    examples: [
      '500 sq ft room with textured walls (300 sq ft/gal coverage) @ 2 coats = 3.3 Gallons (4 1-gallon cans).'
    ],
    related: ['soil-mulch-calculator', 'tile-calculator'],
    faqs: [
      { q: 'How does wall texture affect paint coverage?', a: 'Rough or textured masonry surfaces absorb up to 25% more paint than smooth drywall.' }
    ],
  },
  {
    slug: 'step-up-compound-interest', pillar: 'money', prefix: 'money', ecosystem: 'Savings & Investment', name: 'Step-Up Compound Interest',
    h1: 'Compound Interest Calculator with Step-Up Contributions',
    metaTitle: 'Step-Up Compound Interest Calculator — Annual Contribution Increase | Calcoly',
    metaDesc: 'Calculate long-term investment growth with initial deposit, recurring monthly contributions, interest rate, and annual step-up contribution increases.',
    kw: ['step up compound interest calculator', 'compound interest annual increase', 'investment growth step up contribution', 'recurring investment calculator'],
    widget: { type: 'step_up_interest' },
    lead: 'Project future investment wealth when your monthly contributions increase annually by a percentage (step-up strategy).',
    formula: 'Future Value with annual contribution increase percentage step-up',
    examples: [
      '$5,000 initial + $500/mo @ 7% interest with 5% annual contribution step-up over 10 years = $121,480 total portfolio value.'
    ],
    related: ['discount', 'vat-calculator', 'tip'],
    faqs: [
      { q: 'What is a step-up contribution strategy?', a: 'A step-up strategy increases your monthly investment savings by a fixed percentage (e.g. 5% per year) to match salary raises.' }
    ],
  },
  {
    slug: 'pan-volume-equivalence', pillar: 'baking', prefix: 'baking', ecosystem: 'Oven & Baking Math', name: 'Pan Volume Equivalence',
    h1: 'Round, Square & Bundt Pan Volume Equivalence',
    metaTitle: 'Round vs Square vs Bundt Pan Volume Equivalence Calculator | Calcoly',
    metaDesc: 'Compare exact liquid cup volume capacity across 8-inch, 9-inch, 10-inch round, square, springform, pie, and bundt baking pans.',
    kw: ['bundt pan to round pan converter', '9 inch round to 8 inch square', 'baking pan volume equivalence', 'pan capacity in cups'],
    widget: { type: 'pan_equivalence' },
    lead: 'Compare liquid cup capacity across round, square, springform, pie, and bundt pans to swap baking pans without overflow.',
    formula: 'Round Vol = π × r² × h; Square Vol = w² × h; Bundt Vol = measured cup capacity',
    examples: [
      '9" × 2" Round Pan = 6.0 Cups capacity.',
      '8" × 8" × 2" Square Pan = 5.6 Cups capacity.',
      '10" 12-Cup Bundt Pan = 12.0 Cups capacity (equals two 8" round pans).'
    ],
    related: ['pan-size-substitution', 'cups-to-grams', 'recipe-scaler'],
    faqs: [
      { q: 'How many cups of batter fit in a 9-inch round cake pan?', a: 'A standard 9-inch round pan holds 6 cups of liquid, ideal for 3 to 4 cups of cake batter.' }
    ],
  },
  {
    slug: 'humidity-adjusted-hydration', pillar: 'baking', prefix: 'baking', ecosystem: 'Artisan Baking', name: 'Humidity-Adjusted Hydration',
    h1: 'Humidity-Adjusted Flour Hydration Calculator',
    metaTitle: 'Humidity-Adjusted Flour Hydration Calculator — Ambient Weather Bread Math | Calcoly',
    metaDesc: 'Adjust bread dough water weight based on ambient room humidity and flour moisture content to maintain consistent dough consistency.',
    kw: ['humidity sourdough calculator', 'flour hydration ambient humidity', 'bread water adjustment humidity', 'bakers hydration weather'],
    widget: { type: 'humidity_hydration' },
    lead: 'Adjust recipe water weight for high or low ambient room humidity so your sourdough dough hydration remains consistent.',
    formula: 'Water Adjustment (g) = Target Water - (Flour Weight × (Humidity % - 50%) × 0.0008)',
    examples: [
      '500g flour @ 75% target hydration: At 80% humidity, reduce water by ~12g (363g water) to compensate for moist flour.'
    ],
    related: ['sourdough-hydration', 'bakers-percentage-scaler', 'recipe-scaler'],
    faqs: [
      { q: 'Does high humidity affect bread flour hydration?', a: 'Yes! Flour absorbs ambient moisture in humid weather, so you should slightly decrease recipe water to avoid sticky dough.' }
    ],
  },
  {
    slug: 'sewing-seam-allowance', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Craft & Sewing', name: 'Seam Allowance & Grading',
    h1: 'Sewing Seam Allowance & Size Grading Calculator',
    metaTitle: 'Sewing Seam Allowance & Size Grading Calculator | Calcoly',
    metaDesc: 'Add or subtract seam allowances (5/8", 1/2", 3/8", 1cm, 1.5cm) and calculate pattern size grading increments for sewing.',
    kw: ['seam allowance calculator', 'sewing size grading calculator', 'pattern seam allowance converter'],
    widget: { type: 'sewing_allowance' },
    lead: 'Calculate total pattern cut dimensions by adding or removing standard seam allowances (5/8", 1/2", 1cm, 1.5cm) and scaling pattern sizes.',
    formula: 'Cut Dimension = Finished Measurement + (2 × Seam Allowance)',
    examples: ['34" bust measurement with 5/8" seam allowance (both sides) = 35.25" total pattern cut width.'],
    related: ['fabric-yardage-meters', 'yarn-weight-gauge'],
    faqs: [{ q: 'What is the standard commercial sewing seam allowance?', a: '5/8 inch (1.5 cm) is the standard seam allowance for most commercial home sewing patterns.' }]
  },
  {
    slug: '3d-printing-filament', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Tech & Maker', name: '3D Printing Filament Weight/Length',
    h1: '3D Printing Filament Weight to Length Calculator',
    metaTitle: '3D Printing Filament Weight to Length Calculator — PLA, ABS, PETG, TPU | Calcoly',
    metaDesc: 'Convert 3D printing filament spool weight (grams/kg) to length (meters) for PLA, ABS, PETG, TPU, and Nylon (1.75mm and 2.85mm).',
    kw: ['3d printing filament calculator', 'filament weight to length', 'pla weight to meters', '1kg pla length in meters'],
    widget: { type: 'filament_calc' },
    lead: 'Convert 3D printer filament weight (g/kg) to length (meters) based on material density (PLA, ABS, PETG, TPU) and diameter (1.75mm / 2.85mm).',
    formula: 'Length (m) = Weight (g) / (Density (g/cm³) × π × (Diameter_cm / 2)² × 100)',
    examples: ['1 kg spool of 1.75mm PLA (1.24 g/cm³) = ~335 meters of filament.'],
    related: ['paper-size-pixels-dpi', 'screen-ppi-calculator'],
    faqs: [{ q: 'How many meters of filament are in a 1 kg roll of 1.75mm PLA?', a: 'A standard 1 kg spool of 1.75mm PLA contains approximately 335 meters of filament.' }]
  },
  {
    slug: 'home-brew-abv', pillar: 'baking', prefix: 'baking', ecosystem: 'Kitchen & Fermentation', name: 'Homebrew ABV & Gravity',
    h1: 'Homebrew Specific Gravity to ABV Calculator',
    metaTitle: 'Homebrew Specific Gravity to ABV Calculator — Beer, Cider & Mead | Calcoly',
    metaDesc: 'Calculate Alcohol by Volume (ABV %), attenuation, and calories from Original Gravity (OG) and Final Gravity (FG) hydrometer readings.',
    kw: ['abv calculator', 'specific gravity to abv', 'homebrew abv calculator', 'beer og fg calculator'],
    widget: { type: 'brew_abv' },
    lead: 'Calculate Alcohol by Volume (ABV %) and apparent attenuation from Original Gravity (OG) and Final Gravity (FG) hydrometer readings.',
    formula: 'ABV % = (OG - FG) × 131.25',
    examples: ['OG 1.050 and FG 1.010 = 5.25% ABV (79.2% apparent attenuation).'],
    related: ['cold-brew-coffee-ratio', 'espresso-brew-ratio'],
    faqs: [{ q: 'What is a good starting original gravity (OG) for standard beer?', a: 'A standard ale typically starts with an OG between 1.045 and 1.055.' }]
  },
  {
    slug: 'crop-factor-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Photography', name: 'Camera Crop Factor',
    h1: 'Camera Crop Factor & Focal Length Equivalence Calculator',
    metaTitle: 'Camera Crop Factor & Focal Length Equivalence Calculator | Calcoly',
    metaDesc: 'Convert lens focal length and f-stop to 35mm full-frame equivalence for APS-C (1.5x/1.6x), Micro Four Thirds (2.0x), and Medium Format.',
    kw: ['crop factor calculator', 'apsc to full frame equivalent', 'micro four thirds equivalent focal length'],
    widget: { type: 'crop_factor' },
    lead: 'Calculate full-frame 35mm equivalent focal length and depth-of-field aperture (f-stop) for APS-C, Micro 4/3, and 1-inch camera sensors.',
    formula: 'Equivalent Focal Length = Lens Focal Length × Crop Factor',
    examples: ['50mm lens on APS-C (1.5x crop) = 75mm full-frame equivalent field of view.'],
    related: ['exposure-triangle', 'screen-ppi-calculator'],
    faqs: [{ q: 'What is the crop factor of Canon vs Sony/Nikon APS-C sensors?', a: 'Sony, Nikon, and Fuji APS-C sensors have a 1.5x crop factor, whereas Canon APS-C sensors have a 1.6x crop factor.' }]
  },
  {
    slug: 'running-pace-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Fitness & Sports', name: 'Running Pace & Splits',
    h1: 'Running Pace, Time & Distance Calculator',
    metaTitle: 'Running Pace & Split Calculator — min/km & min/mile | Calcoly',
    metaDesc: 'Calculate running pace per kilometer/mile, finish time for 5K, 10K, Half Marathon, and Full Marathon, plus split planning.',
    kw: ['running pace calculator', 'pace per km to pace per mile', '5k pace calculator', 'marathon finish time calculator'],
    widget: { type: 'running_pace' },
    lead: 'Calculate target running pace (min/km or min/mile), total race finish time, and kilometer/mile split targets for 5K, 10K, 21K, and 42K.',
    formula: 'Pace = Total Time / Total Distance',
    examples: ['Running 5K in 25 minutes = 5:00 min/km pace (8:02 min/mile pace).'],
    related: ['cycling-gear-ratio', 'tdee'],
    faqs: [{ q: 'What pace do I need to run a sub-20 minute 5K?', a: 'You need an average pace of 3:59 min/km (6:26 min/mile) to break 20 minutes in a 5K.' }]
  },
  {
    slug: 'cycling-gear-ratio', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Fitness & Sports', name: 'Cycling Gear Ratio & Speed',
    h1: 'Cycling Gear Ratio, Speed & Cadence Calculator',
    metaTitle: 'Cycling Gear Ratio & Speed/Cadence Calculator | Calcoly',
    metaDesc: 'Calculate bicycle gear ratio, gear inches, development (meters gain per pedal turn), and speed (km/h & mph) at target RPM cadence.',
    kw: ['cycling gear ratio calculator', 'gear inches calculator', 'bike cadence to speed calculator'],
    widget: { type: 'cycling_gear' },
    lead: 'Calculate bicycle gear ratio, gear inches, meters of development per pedal revolution, and road speed based on cadence (RPM) and tire size.',
    formula: 'Speed (km/h) = Cadence (RPM) × (Chainring / Cog) × Wheel Circumference (m) × 60 / 1000',
    examples: ['50T chainring / 11T cog @ 90 RPM cadence with 700c×25 tire = 45.4 km/h (28.2 mph).'],
    related: ['running-pace-calculator', 'tdee'],
    faqs: [{ q: 'What are gear inches in cycling?', a: 'Gear inches represent the equivalent wheel diameter in inches of a direct-drive penny-farthing bicycle.' }]
  },
  {
    slug: 'firewood-btu-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Outdoor & DIY', name: 'Firewood BTU & Heat Value',
    h1: 'Firewood BTU & Heating Value Comparison Calculator',
    metaTitle: 'Firewood BTU & Heating Value Comparison Calculator | Calcoly',
    metaDesc: 'Compare heat output (BTU per cord) and wood density across Oak, Maple, Birch, Pine, Hickory, and Ash firewood species.',
    kw: ['firewood btu calculator', 'wood heat value comparison', 'btu per cord oak vs pine'],
    widget: { type: 'firewood_btu' },
    lead: 'Compare total thermal heat output (Million BTUs per cord), dry density, and co-heating cost savings across popular firewood species.',
    formula: 'Total Heat (Million BTU) = Cords × Wood Species Heat Value per Cord',
    examples: ['1 cord of Seasoned White Oak = 25.7 Million BTU (equivalent to ~180 gallons of heating oil).'],
    related: ['firewood-cord-calculator', 'soil-mulch-calculator'],
    faqs: [{ q: 'Which firewood species has the highest BTU heat output?', a: 'Hickory, Black Locust, and White Oak yield the highest heat output (25-28 Million BTU per cord).' }]
  },
  {
    slug: 'solar-panel-calculator', pillar: 'money', prefix: 'money', ecosystem: 'Energy & Utilities', name: 'Solar Panel Size & Tariffs (India)',
    h1: 'Solar Panel System Size & Savings Calculator (India)',
    metaTitle: 'Solar Panel Size & Savings Calculator — India Electricity Tariffs | Calcoly',
    metaDesc: 'Calculate rooftop solar panel System Size (kW), daily kWh generation, monthly electricity bill savings, and payback period with Indian slab tariffs.',
    kw: ['solar panel calculator india', 'rooftop solar size calculator', 'solar system payback calculator india'],
    widget: { type: 'solar_calc' },
    lead: 'Calculate required rooftop solar system capacity (kW), daily solar energy generation (kWh), and monthly savings based on Indian electricity slab tariffs.',
    formula: 'Recommended Solar System (kW) = Monthly kWh Consumption / (30 days × 4.2 peak sun hours)',
    examples: ['Monthly bill of ₹3,000 (~350 units) requires a 3 kW solar plant yielding ~₹36,000 annual savings.'],
    related: ['ev-charging-cost-calculator', 'vat-calculator'],
    faqs: [{ q: 'How much area is required for a 3 kW rooftop solar system in India?', a: 'A 3 kW solar system requires approximately 250 to 300 square feet of shadow-free rooftop area.' }]
  },
  {
    slug: 'water-tank-refill-time', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Home & Utilities', name: 'Water Tank Refill Time',
    h1: 'Water Tank Refill Time & Flow Rate Calculator',
    metaTitle: 'Water Tank Refill Time & Flow Rate Calculator — Liters & Gallons | Calcoly',
    metaDesc: 'Calculate refill time, fill rate (L/min or GPM), and pump capacity required to fill overhead water tanks or reservoirs.',
    kw: ['water tank refill time calculator', 'tank fill rate calculator', 'pump capacity water tank'],
    widget: { type: 'water_tank' },
    lead: 'Calculate exact refill time in minutes and hours for overhead water tanks, sumps, and pools based on pump flow rate (LPM / GPM).',
    formula: 'Refill Time (minutes) = Tank Volume (Liters) / Flow Rate (Liters per Minute)',
    examples: ['1,000 Liter overhead tank refilling with a 25 LPM pump takes 40 minutes.'],
    related: ['aquarium-volume-stocking', 'soil-mulch-calculator'],
    faqs: [{ q: 'How do I measure the actual flow rate of my water pipe or pump?', a: 'Time how many seconds it takes to fill a standard 10-liter bucket, then divide 600 by the fill time in seconds to get LPM.' }]
  },
  {
    slug: 'ev-charging-cost-calculator', pillar: 'money', prefix: 'money', ecosystem: 'Energy & Utilities', name: 'EV Charging Time & Cost (India)',
    h1: 'EV Charging Time & Running Cost Calculator (India)',
    metaTitle: 'EV Charging Time & Running Cost Calculator — India Electricity | Calcoly',
    metaDesc: 'Calculate electric vehicle (EV) charging time, full charge cost (₹), and cost per kilometer for Tata Nexon EV, MG ZS EV, Ola S1, and custom battery sizes in India.',
    kw: ['ev charging cost calculator india', 'ev cost per km india', 'nexon ev charging time calculator'],
    widget: { type: 'ev_calc' },
    lead: 'Calculate electric vehicle (EV) full charging duration (home AC vs fast DC), total charge cost (₹), and running cost per km based on state electricity tariffs in India.',
    formula: 'Charge Cost (₹) = Battery Capacity (kWh) × Electricity Tariff (₹/kWh); Cost per km = Charge Cost / Driving Range',
    examples: ['Tata Nexon EV 40.5 kWh battery @ ₹8/unit tariff = ₹324 full charge cost (~₹0.92 per km running cost).'],
    related: ['solar-panel-calculator', 'discount'],
    faqs: [{ q: 'What is the average running cost per kilometer for an electric car in India?', a: 'EV running costs in India average ₹0.80 to ₹1.20 per km compared to ₹6 to ₹8 per km for petrol cars.' }]
  },
  {
    slug: 'guitar-string-tension', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Music & Audio', name: 'Guitar String Tension',
    h1: 'Guitar String Tension & Tuning Calculator',
    metaTitle: 'Guitar String Tension & Tuning Calculator — Electric, Acoustic, Bass | Calcoly',
    metaDesc: 'Calculate individual string tension (lbs & kg) and total neck load for electric, acoustic, and bass guitars in custom tunings and scale lengths.',
    kw: ['guitar string tension calculator', 'string tension lbs to kg', 'drop d string tension calculator'],
    widget: { type: 'guitar_tension' },
    lead: 'Calculate unit tension per string (lbs/kg) and total neck tension load for electric, acoustic, classical, and bass guitars in standard or alternate tunings.',
    formula: 'Tension (lbs) = (Unit Weight × (2 × Scale Length × Frequency)²) / 386.4',
    examples: ['Light gauge electric set (10-46) @ 25.5" scale length in E Standard = 108.4 lbs total neck tension.'],
    related: ['screen-ppi-calculator', 'paper-size-pixels-dpi'],
    faqs: [{ q: 'How does scale length affect guitar string tension?', a: 'Longer scale lengths (e.g. 25.5" Fender) require higher string tension than shorter scales (e.g. 24.75" Gibson) for the same pitch.' }]
  },
  {
    slug: 'aquarium-co2-bioload', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Home & Pets', name: 'Aquarium CO2 & Bioload',
    h1: 'Aquarium CO2 Concentration & Bioload Calculator',
    metaTitle: 'Aquarium CO2 Concentration & Bioload Calculator — pH & KH | Calcoly',
    metaDesc: 'Calculate dissolved CO2 concentration (ppm) in planted aquariums from pH and KH readings, plus biological filtration capacity.',
    kw: ['aquarium co2 calculator', 'ph kh co2 table calculator', 'planted tank co2 ppm calculator'],
    widget: { type: 'aquarium_co2' },
    lead: 'Calculate dissolved CO2 concentration (ppm) in planted aquariums from pH and Carbonate Hardness (dKH) to ensure optimal plant growth without harming fish.',
    formula: 'CO2 (ppm) = 3 × dKH × 10^(7.0 - pH)',
    examples: ['pH 6.8 and KH 4 dKH = 19.0 ppm dissolved CO2 (safe green zone for planted tanks).'],
    related: ['aquarium-volume-stocking', 'soil-mulch-calculator'],
    faqs: [{ q: 'What is the optimal CO2 level for a planted aquarium?', a: '30 ppm (parts per million) is considered the ideal target for lush plant growth without stressing fish.' }]
  },
  {
    slug: 'crypto-converter', pillar: 'money', prefix: 'money', ecosystem: 'Crypto & Currency', name: 'Crypto Converter',
    h1: 'Cryptocurrency Converter Calculator',
    metaTitle: 'Cryptocurrency Converter Calculator — BTC, ETH, SOL to USD, INR, EUR | Calcoly',
    metaDesc: 'Convert Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT, and top cryptocurrencies to USD, INR, EUR, GBP, and fiat currencies instantly.',
    kw: ['crypto converter calculator', 'bitcoin to usd', 'btc to inr', 'ethereum to usd', 'crypto currency converter', 'solana to usd', 'usdt to inr'],
    widget: { type: 'crypto_converter' },
    lead: 'Convert Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Tether (USDT), and top cryptocurrencies to USD, INR, EUR, GBP, and global fiat currencies instantly with real-time rates.',
    formula: 'Fiat Value = Crypto Quantity × Live Market Rate',
    examples: [
      '1 BTC = $77,737.21 USD (approx. ₹6,450,000 INR).',
      '1 ETH = $3,385.14 USD.',
      '100 USDT = ₹8,350 INR.'
    ],
    related: ['vat-calculator', 'discount', 'step-up-compound-interest'],
    faqs: [
      { q: 'How is the cryptocurrency conversion calculated?', a: 'Conversions use market exchange rates for top cryptocurrencies (BTC, ETH, SOL, USDT, XRP, BNB, DOGE) against major global fiat currencies.' },
      { q: 'Can I convert crypto to INR, EUR, or GBP directly?', a: 'Yes! Select your cryptocurrency and choose any fiat currency (USD, INR, EUR, GBP, CAD, AUD, PHP, IDR) to calculate the live conversion value.' }
    ]
  },

  /* ============================================================
     US/UK/CANADA CROSS-BORDER & CRAFT MICRO-NICHES
     ============================================================ */
  {
    slug: 'wpi-yarn-weight', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Craft & Sewing', name: 'WPI to Yarn Weight',
    h1: 'WPI (Wraps Per Inch) to Yarn Weight Calculator',
    metaTitle: 'WPI to Yarn Weight Category Calculator — Wraps Per Inch | Calcoly',
    metaDesc: 'Convert Wraps Per Inch (WPI) measurement to standard yarn weight categories (Lace, Fingering, Sport, DK, Worsted, Bulky).',
    kw: ['wpi to yarn weight', 'wraps per inch calculator', 'wpi yarn category', 'how to measure wpi yarn'],
    widget: { type: 'wpi_yarn' },
    lead: 'Convert Wraps Per Inch (WPI) ruler measurements to standard yarn weight categories, ply counts, and recommended needle sizes.',
    formula: 'WPI = Number of yarn wraps around a 1-inch ruler without overlapping',
    examples: ['12 WPI = Worsted / Aran Weight (#4 Medium).', '18 WPI = Sport Weight (#2 Fine).'],
    related: ['yarn-weight-gauge', 'knitting-needle-converter', 'crochet-hook-converter'],
    faqs: [{ q: 'How do I measure Wraps Per Inch (WPI)?', a: 'Wrap your mystery yarn around a standard ruler for 1 inch. Count the number of wraps without squishing or leaving gaps.' }]
  },
  {
    slug: 'knitting-needle-converter', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Craft & Sewing', name: 'Knitting Needle Sizes',
    h1: 'Knitting Needle Size Converter (US ↔ UK ↔ Metric mm)',
    metaTitle: 'Knitting Needle Size Converter — US, UK & Metric mm | Calcoly',
    metaDesc: 'Convert knitting needle sizes between US numbers (000 to 50), UK/Imperial numbers (14 to 000), and Metric millimeters (1.5mm to 25mm).',
    kw: ['knitting needle size converter', 'us to uk knitting needle size', 'knitting needle mm to us size'],
    widget: { type: 'knitting_needle' },
    lead: 'Convert knitting needle sizing instantly between US numbers, old UK/Imperial numbers, and metric millimeters (mm).',
    formula: 'Conversion map across US, UK, and Metric millimeter standards',
    examples: ['US 7 = UK 7 = 4.5 mm metric needle.', 'US 8 = UK 6 = 5.0 mm metric needle.'],
    related: ['yarn-weight-gauge', 'crochet-hook-converter', 'wpi-yarn-weight'],
    faqs: [{ q: 'Why are US and UK knitting needle numbers opposite?', a: 'In the US system, larger numbers mean thicker needles (e.g. US 15 is 10mm). In the old UK system, smaller numbers mean thicker needles (e.g. UK 000 is 10mm).' }]
  },
  {
    slug: 'crochet-hook-converter', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Craft & Sewing', name: 'Crochet Hook Sizes',
    h1: 'Crochet Hook Size Converter (US Letter/Number ↔ UK ↔ Metric mm)',
    metaTitle: 'Crochet Hook Size Converter — US, UK & Metric mm | Calcoly',
    metaDesc: 'Convert crochet hook sizes between US letter/number codes (B-1 to Q), UK numbers (14 to 000), and Metric millimeters (2.25mm to 16mm).',
    kw: ['crochet hook size converter', 'us to uk crochet hook size', 'crochet hook letter to mm'],
    widget: { type: 'crochet_hook' },
    lead: 'Convert crochet hook sizes between US letters (B-1 to Q), US numbers, traditional UK numbers, and metric millimeters.',
    formula: 'Conversion map across US letter/number codes, UK numbers, and Metric mm',
    examples: ['US H-8 (5.0 mm) = UK 6 hook.', 'US I-9 (5.5 mm) = UK 5 hook.'],
    related: ['knitting-needle-converter', 'yarn-weight-gauge', 'wpi-yarn-weight'],
    faqs: [{ q: 'What is a 5.0 mm crochet hook in US sizes?', a: 'A 5.0 mm crochet hook is designated as US H-8 (or US 8).' }]
  },
  {
    slug: 'homebrew-priming-sugar', pillar: 'baking', prefix: 'baking', ecosystem: 'Kitchen & Fermentation', name: 'Homebrew Priming Sugar',
    h1: 'Homebrew Priming Sugar Calculator for Bottle Carbonation',
    metaTitle: 'Homebrew Priming Sugar Calculator — Corn Sugar, Table Sugar, DME | Calcoly',
    metaDesc: 'Calculate exact weight of corn sugar (dextrose), table sugar (sucrose), or DME for bottle carbonation based on volumes of CO2.',
    kw: ['priming sugar calculator', 'bottle carbonation sugar calculator', 'corn sugar priming calculator'],
    widget: { type: 'priming_sugar' },
    lead: 'Calculate exact priming sugar weight (corn sugar, table sugar, honey, or DME) for bottle carbonation based on beer volume and target volumes of CO2.',
    formula: 'Priming Sugar (g) = (Target CO2 - Residual CO2) × Volume (Gal) × 15.1',
    examples: ['5 gallons of IPA @ 68°F targeting 2.4 volumes of CO2 requires 113g (4.0 oz) of corn sugar.'],
    related: ['home-brew-abv', 'cold-brew-coffee-ratio'],
    faqs: [{ q: 'How many volumes of CO2 are standard for American IPA or Ale?', a: '2.2 to 2.6 volumes of CO2 is standard for most American ales and IPAs.' }]
  },
  {
    slug: '3d-print-cost-calculator', pillar: 'everyday', prefix: 'everyday', ecosystem: 'Tech & Maker', name: '3D Print Cost Calculator',
    h1: '3D Printing Cost Per Print Calculator',
    metaTitle: '3D Printing Cost Per Print Calculator — Filament, Power & Machine Time | Calcoly',
    metaDesc: 'Calculate total cost per 3D print taking into account filament weight (g), spool price ($), printer wattage, electricity rate, and print hours.',
    kw: ['3d print cost calculator', 'cost per print 3d printer', 'filament cost calculator print'],
    widget: { type: 'print_cost' },
    lead: 'Calculate total material, electricity, and machine wear costs per 3D print to price custom 3D printing jobs accurately.',
    formula: 'Total Cost = (Filament Weight × Price per Gram) + (Printer kW × Print Hours × Electricity Rate) + Machine Markup',
    examples: ['150g PLA print taking 8 hours @ $20/kg spool & $0.15/kWh electricity = $3.36 total print cost.'],
    related: ['3d-printing-filament', 'paper-size-pixels-dpi'],
    faqs: [{ q: 'How much electricity does an FDM 3D printer use?', a: 'A standard FDM 3D printer uses between 100 to 250 Watts depending on heated bed temperature.' }]
  },
  {
    slug: 'us-uk-metric-cups', pillar: 'baking', prefix: 'baking', ecosystem: 'Ingredient & Kitchen Math', name: 'US vs UK vs Metric Cups',
    h1: 'US Cup ↔ UK Cup ↔ Metric Cup Converter by Ingredient',
    metaTitle: 'US Cup vs UK Cup vs Metric Cup Converter by Ingredient | Calcoly',
    metaDesc: 'Convert volume and grams between US Legal Cups (240ml), US Customary Cups (236.6ml), Metric Cups (250ml), and Imperial UK Cups (284ml).',
    kw: ['us cup to uk cup', 'us cup to metric cup', 'uk cup vs us cup flour grams'],
    widget: { type: 'cup_volume_conv' },
    lead: 'Convert volume and ingredient weight between US Customary Cups (236.6 ml), US Legal Cups (240 ml), Metric Cups (250 ml), and Imperial UK Cups (284.1 ml).',
    formula: '1 US Customary Cup = 236.59 ml | 1 Metric Cup = 250 ml | 1 UK Imperial Cup = 284.13 ml',
    examples: ['1 US Cup flour (120g) = 0.83 UK Imperial Cups (142g flour in a UK cup).'],
    related: ['cups-to-grams', 'grams-to-cups', 'ingredient-density-converter'],
    faqs: [{ q: 'Are US cups and UK/Australian cups the same size?', a: 'No! US cups are ~240 ml, Australian/Metric cups are 250 ml, and traditional UK Imperial cups are 284 ml.' }]
  },
  {
    slug: 'us-uk-gallons', pillar: 'converters', prefix: 'converter', ecosystem: 'US/UK Unit Cross-Border', name: 'US Gallon ↔ UK Gallon',
    h1: 'US Gallon ↔ UK (Imperial) Gallon Converter',
    metaTitle: 'US Gallon to UK Imperial Gallon Converter — US gal ↔ UK gal | Calcoly',
    metaDesc: 'Convert fluid volume between US Gallons (3.785 Liters) and UK Imperial Gallons (4.546 Liters) instantly.',
    kw: ['us gallon to uk gallon', 'us gal to imperial gal', 'uk gallon size in liters'],
    widget: { type: 'gallon_conv' },
    lead: 'Convert fluid volume between US Gallons (3.785 L) and UK Imperial Gallons (4.546 L) to eliminate cross-border recipe and fuel confusion.',
    formula: '1 UK Imperial Gallon = 1.20095 US Gallons (1 US Gallon = 0.83267 UK Gallons)',
    examples: ['10 US Gallons = 8.33 UK Imperial Gallons (37.85 Liters).', '10 UK Gallons = 12.01 US Gallons (45.46 Liters).'],
    related: ['fuel-economy-mpg-l100km', 'water-tank-refill-time'],
    faqs: [{ q: 'Why is a UK gallon bigger than a US gallon?', a: 'The UK Imperial gallon (4.546 L) was defined as 10 lbs of water at 62°F in 1824, whereas the US gallon (3.785 L) was based on the old English wine gallon of 231 cubic inches.' }]
  },
  {
    slug: 'psi-to-bar-kpa', pillar: 'converters', prefix: 'converter', ecosystem: 'US/UK Unit Cross-Border', name: 'PSI ↔ BAR ↔ kPa Pressure',
    h1: 'Tire Pressure Converter (PSI ↔ BAR ↔ kPa)',
    metaTitle: 'Tire Pressure Converter — PSI to BAR & kPa | Calcoly',
    metaDesc: 'Convert tire pressure between PSI (Pounds per Square Inch), BAR (European standard), and kPa (Kilopascals used in Canada).',
    kw: ['psi to bar', 'bar to psi tire pressure', 'psi to kpa converter'],
    widget: { type: 'pressure_conv' },
    lead: 'Convert tire pressure between US PSI (Pounds per Square Inch), UK/EU BAR, and Canadian kPa (Kilopascals).',
    formula: '1 BAR = 14.5038 PSI | 1 PSI = 6.89476 kPa',
    examples: ['32 PSI tire pressure = 2.21 BAR = 220.6 kPa.'],
    related: ['awg-to-mm2', 'cm-to-inches'],
    faqs: [{ q: 'What is 32 PSI in BAR for European cars?', a: '32 PSI equals 2.2 BAR.' }]
  },
  {
    slug: 'kids-clothing-size-converter', pillar: 'everyday', prefix: 'everyday', ecosystem: 'US/UK Unit Cross-Border', name: 'Kids Clothing Size (US/UK/CA)',
    h1: 'US ↔ UK ↔ Canada Kids & Toddler Clothing Size Converter',
    metaTitle: 'Kids & Toddler Clothing Size Converter — US, UK & Canada | Calcoly',
    metaDesc: 'Convert children\'s and toddler clothing sizes between US age tags (2T, 3T, 4T, 5, 6), UK sizes, European height in cm, and Canada sizing.',
    kw: ['us to uk kids clothing size', 'toddler size converter us to uk', 'kids clothes sizing us ca uk eu'],
    widget: { type: 'kids_clothing' },
    lead: 'Convert children and toddler clothing sizes across US (age-based 2T-6), UK, Canada, and European height standards (cm).',
    formula: 'Size mapping by age, height (cm), and weight (kg/lbs)',
    examples: ['US 3T (98 cm height) = UK 3-4 Years = EU Size 98 cm.'],
    related: ['building-floor-converter', 'word-counter'],
    faqs: [{ q: 'Are US and UK kids\' clothing sizes identical?', a: 'They are very close, but European/Canadian brands label by child height in cm (e.g., 104 cm = 4T), which is more precise.' }]
  },
  {
    slug: 'date-format-resolver', pillar: 'date', prefix: 'date', ecosystem: 'US/UK Unit Cross-Border', name: 'Date Format Resolver (US/UK)',
    h1: 'Date Format Resolver (MM/DD/YYYY ↔ DD/MM/YYYY)',
    metaTitle: 'Date Format Resolver — US (MM/DD/YYYY) vs UK/Canada (DD/MM/YYYY) | Calcoly',
    metaDesc: 'Resolve ambiguous date formats between US (MM/DD/YYYY), UK/International (DD/MM/YYYY), and ISO 8601 (YYYY-MM-DD) with ambiguity detection.',
    kw: ['date format converter us to uk', 'mm dd yyyy to dd mm yyyy', 'ambiguous date resolver'],
    widget: { type: 'date_resolver' },
    lead: 'Convert date formats between US (MM/DD/YYYY), UK/Canada (DD/MM/YYYY), and ISO standard (YYYY-MM-DD), with automatic ambiguous-date flagging.',
    formula: 'Date parsing with ambiguity warnings for days ≤ 12',
    examples: ['04/05/2024 in US format = April 5, 2024 | In UK format = May 4, 2024 (Ambiguous Flagged!).'],
    related: ['days-between-dates', 'age'],
    faqs: [{ q: 'Why is 03/04/2024 ambiguous?', a: 'Because it can mean March 4 in the US format (MM/DD/YYYY) or April 3 in the UK/international format (DD/MM/YYYY).' }]
  },
  {
    slug: 'building-floor-converter', pillar: 'everyday', prefix: 'everyday', ecosystem: 'US/UK Unit Cross-Border', name: 'Building Floor Converter (US/UK)',
    h1: 'Building Floor Numbering Converter (UK Ground Floor ↔ US 1st Floor)',
    metaTitle: 'Building Floor Numbering Converter — UK vs US & Europe | Calcoly',
    metaDesc: 'Convert elevator and building floor numbers between UK/European convention (Ground, 1st, 2nd) and US/Canada convention (1st, 2nd, 3rd).',
    kw: ['uk ground floor to us first floor', 'building floor numbering converter', 'uk vs us floor levels'],
    widget: { type: 'floor_conv' },
    lead: 'Convert floor numbers between UK/European convention (Ground Floor G = 0) and US/Canada convention (1st Floor = 1).',
    formula: 'US Floor = UK Floor + 1 (for floors above ground level)',
    examples: ['UK 3rd Floor = US 4th Floor.', 'UK Ground Floor (G) = US 1st Floor.'],
    related: ['kids-clothing-size-converter', 'date-format-resolver'],
    faqs: [{ q: 'What is the UK Ground Floor in the United States?', a: 'The UK Ground Floor is called the 1st Floor in the US and Canada.' }]
  },
  {
    slug: 'fuel-economy-mpg-l100km', pillar: 'converters', prefix: 'converter', ecosystem: 'US/UK Unit Cross-Border', name: 'Fuel Economy (US/UK MPG & L/100km)',
    h1: 'Fuel Economy Converter (US MPG ↔ UK MPG ↔ Canada L/100km)',
    metaTitle: 'Fuel Economy Converter — US MPG, UK MPG & Canada L/100km | Calcoly',
    metaDesc: 'Convert car fuel efficiency between US Miles Per Gallon, UK Imperial Miles Per Gallon, and Canadian/European Liters per 100km (L/100km).',
    kw: ['us mpg to uk mpg', 'mpg to l 100km', 'uk mpg vs us mpg calculator', 'canada l 100km to mpg'],
    widget: { type: 'fuel_economy' },
    lead: 'Convert fuel efficiency accurately between US MPG, UK Imperial MPG, and Canadian/European L/100km.',
    formula: 'UK MPG = US MPG × 1.20095 | L/100km = 235.215 / US MPG',
    examples: ['30 US MPG = 36.0 UK Imperial MPG = 7.84 L/100km in Canada.'],
    related: ['us-uk-gallons', 'ev-charging-cost-calculator'],
    faqs: [{ q: 'Why is UK MPG higher than US MPG for the same car?', a: 'Because a UK Imperial gallon is 20% larger than a US gallon (4.546 L vs 3.785 L), giving more miles per gallon.' }]
  }
];

/* Helper functions for taxonomy interlinking */
export function getInvertedTool(t) {
  if (!t.invertedSlug) return null;
  return tools.find(x => x.slug === t.invertedSlug) || null;
}

export function getClusterSiblings(t) {
  return tools.filter(x => x.ecosystem === t.ecosystem && x.slug !== t.slug);
}

export function getPopularTools(limit = 6) {
  const popSlugs = ['kg-to-lbs', 'cm-to-inches', 'percentage', 'cups-to-grams', 'celsius-to-fahrenheit', 'days-between-dates'];
  return popSlugs.map(s => tools.find(x => x.slug === s)).filter(Boolean).slice(0, limit);
}
