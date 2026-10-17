const lv = 'https://us.louisvuitton.com';
const img = (code) => `${lv}/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--${code}_PM2_Front%20view.jpg`;

export const merchImageQuery = '?wid=1800&hei=1800&fit=constrain&qlt=95';

export const merch = [
  { href: `${lv}/eng-us/products/neverfull-mm-monogram-nvprod5350101v/M46975`, original: img('M46975'),
    alt: 'Monogram large tote bag', label: 'Monogram', title: { mn: 'Монограмм', en: 'Monogram' } },
  { href: `${lv}/eng-us/products/neverfull-mm-damier-ebene-nvprod5350103v/N40599`, original: img('N40599'),
    alt: 'Damier Ébène large tote bag', label: 'Damier Ébène', title: { mn: 'Бор шатрын хээ', en: 'Damier Ébène' } },
  { href: `${lv}/eng-us/products/neverfull-mm-damier-azur-nvprod5350102v/N40604`, original: img('N40604'),
    alt: 'Damier Azur large tote bag', label: 'Damier Azur', title: { mn: 'Цайвар шатрын хээ', en: 'Damier Azur' } },
];

// Cart dialog-д ашиглагдах бүтээгдэхүүний нэрс ба тэмдэг
export const cartProducts = [
  { mn: 'Өдөр тутмын кодтой цамц', en: 'Everyday Code Tee', emblem: '✧' },
  { mn: 'Санаагаа багтаах даавуун цүнх', en: 'Ideas Inside Tote', emblem: '♧' },
  { mn: 'Шидэт наалтын багц', en: 'Little Magic Sticker Pack', emblem: '✦' },
];
