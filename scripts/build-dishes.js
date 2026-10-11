import fs from 'fs';
import path from 'path';

const menuRaw = fs.readFileSync('./menu.json', 'utf8');
const menu = JSON.parse(menuRaw);

const categoryMeta = {
  SIGNATURE: {
    name: 'SIGNATURE',
    chineseName: '招牌推荐',
    iconName: 'Sparkles',
    description: 'Michelin Bib Gourmand award-winning heritage specialties perfected since 1970s',
  },
  SEAFOOD: {
    name: 'SEAFOOD',
    chineseName: '海鲜风味',
    iconName: 'Fish',
    description: 'Braised sea cucumbers, fresh squid & high-heat wok ocean delicacies',
  },
  PRAWN: {
    name: 'PRAWN',
    chineseName: '鲜虾佳肴',
    iconName: 'Fish',
    description: 'Yam rings, cereal butter prawns, sambal prawn balls & live wok-tossed prawns',
  },
  FROGS: {
    name: 'FROGS',
    chineseName: '鲜美田鸡',
    iconName: 'Flame',
    description: 'Spring onion ginger, deep-fried crispy & black bean claypot frog legs',
  },
  PORK: {
    name: 'PORK',
    chineseName: '经典猪肉',
    iconName: 'Flame',
    description: 'Sweet & sour pork, bittergourd pork ribs king & caramelized pork chops',
  },
  FISH: {
    name: 'FISH',
    chineseName: '鲜鱼美馔',
    iconName: 'Fish',
    description: 'Hong Kong steamed fish tail, black bean fish head & crispy fish fillets',
  },
  BEEF: {
    name: 'BEEF',
    chineseName: '火候牛肉',
    iconName: 'Flame',
    description: 'Tender wok-seared beef with kai lan, black bean sauce, ginger & black pepper',
  },
  CHICKEN: {
    name: 'CHICKEN',
    chineseName: '家传鸡肉',
    iconName: 'Flame',
    description: 'Iconic prawn paste chicken (Har Cheong Gai), claypot chicken & golden dragon chicken',
  },
  RICE: {
    name: 'RICE',
    chineseName: '经典炒饭',
    iconName: 'UtensilsCrossed',
    description: 'Wok-hei fried rice, sweet & sour pork rice, roasted pork mui fan & rice plates',
  },
  NOODLE: {
    name: 'NOODLE',
    chineseName: '招牌面类',
    iconName: 'UtensilsCrossed',
    description: 'Big prawns hor fun, crispy noodles, bee hoon soup & braised yee mee',
  },
  SOUP: {
    name: 'SOUP',
    chineseName: '滋补靓汤',
    iconName: 'Soup',
    description: 'Comforting bittergourd soup, sliced fish soup, tom yam & mixed salted vegetable soup',
  },
  TOFU: {
    name: 'TOFU',
    chineseName: '手工豆腐',
    iconName: 'Sparkles',
    description: 'Signature claypot yong tau foo, homemade minced pork tofu & braised bean curd',
  },
  EGGS: {
    name: 'EGGS',
    chineseName: '香煎蛋品',
    iconName: 'Sparkles',
    description: 'Fu Rong omelette, prawns omelette, preserved radish (cai poh) & minced meat omelettes',
  },
  VEGETABLE: {
    name: 'VEGETABLE',
    chineseName: '清爽时蔬',
    iconName: 'Salad',
    description: 'Crisp kai lan with garlic, sambal kangkong, romaine lettuce & four heavenly kings',
  },
};

const menuSections = menu.categories.map((c) => {
  const meta = categoryMeta[c.name] || {
    name: c.name,
    chineseName: c.name,
    iconName: 'UtensilsCrossed',
    description: `${c.name} specialties from Kok Sen Restaurant`,
  };
  return {
    id: c.name,
    name: meta.name,
    chineseName: meta.chineseName,
    iconName: meta.iconName,
    description: meta.description,
  };
});

let id = 1;
const dishes = [];

menu.categories.forEach((cat) => {
  cat.items.forEach((item, itemIdx) => {
    const minPrice = item.variants && item.variants.length > 0 ? item.variants[0].price_sgd : 15.0;
    const photoUrl = item.photos && item.photos.length > 0 ? item.photos[0].source_url : '';

    // Portion options
    const portionOptions = item.variants
      ? item.variants.map((v, vIdx) => {
          let size = 'S';
          const vLower = (v.name || '').toLowerCase();
          if (vLower.includes('medium') || v.name.includes('中') || vIdx === 1) size = 'M';
          if (vLower.includes('large') || v.name.includes('大') || vIdx === 2) size = 'L';
          return {
            size,
            label: v.name,
            price: v.price_sgd,
          };
        })
      : [];

    // Allergens based on dish keywords
    const allergens = [];
    const textToCheck = (item.name + ' ' + (item.english_name || '') + ' ' + (item.chinese_name || '')).toLowerCase();
    if (
      textToCheck.includes('prawn') ||
      textToCheck.includes('shrimp') ||
      textToCheck.includes('虾') ||
      textToCheck.includes('squid') ||
      textToCheck.includes('sotong') ||
      textToCheck.includes('苏东') ||
      textToCheck.includes('sea cucumber') ||
      textToCheck.includes('海参')
    ) {
      allergens.push('Shellfish');
    }
    if (textToCheck.includes('fish') || textToCheck.includes('鱼')) {
      allergens.push('Fish');
    }
    if (textToCheck.includes('egg') || textToCheck.includes('蛋') || textToCheck.includes('fu rong')) {
      allergens.push('Egg');
    }
    if (
      textToCheck.includes('tofu') ||
      textToCheck.includes('tau foo') ||
      textToCheck.includes('bean') ||
      textToCheck.includes('豆腐') ||
      textToCheck.includes('豆')
    ) {
      allergens.push('Soy');
    }
    if (
      textToCheck.includes('hor fun') ||
      textToCheck.includes('noodle') ||
      textToCheck.includes('mee') ||
      textToCheck.includes('面') ||
      textToCheck.includes('河粉') ||
      textToCheck.includes('ring')
    ) {
      allergens.push('Gluten');
    }
    if (allergens.length === 0) {
      allergens.push('None');
    }

    // Spice check
    const isSpicy =
      textToCheck.includes('sambal') ||
      textToCheck.includes('叁巴') ||
      textToCheck.includes('chilli') ||
      textToCheck.includes('chili') ||
      textToCheck.includes('辣') ||
      textToCheck.includes('black pepper') ||
      textToCheck.includes('黑椒') ||
      textToCheck.includes('curry') ||
      textToCheck.includes('咖喱');

    let badge = undefined;
    if (cat.name === 'SIGNATURE') {
      badge = `Signature #${itemIdx + 1}`;
    }

    dishes.push({
      id: id++,
      sourceItemId: item.source_item_id,
      name: item.name,
      englishName: item.english_name || item.name,
      chineseName: item.chinese_name || '',
      price: minPrice,
      image: photoUrl,
      category: cat.name,
      badge,
      portion: item.variants && item.variants.length > 0 ? item.variants[0].name : 'Standard',
      description:
        item.variants && item.variants.length > 1
          ? item.variants.map((v) => `${v.name}: S$${v.price_sgd.toFixed(2)}`).join(' • ')
          : `Authentic Kok Sen ${cat.name.toLowerCase()} specialty prepared with traditional Cantonese high-heat wok craft.`,
      isSpicy,
      spicyLevel: isSpicy ? 2 : undefined,
      isPopular: cat.name === 'SIGNATURE' || itemIdx === 0,
      portionOptions,
      allergens,
    });
  });
});

const tsCode = `import { Dish, MenuSectionInfo } from '../types';

export const MENU_SECTIONS: MenuSectionInfo[] = ${JSON.stringify(menuSections, null, 2)};

export const DISHES: Dish[] = ${JSON.stringify(dishes, null, 2)};

export const ORDER_WEB_LINK = 'https://koksen.oddle.me/en_SG';

export interface OutletInfo {
  id: string;
  name: string;
  chineseName: string;
  phone: string;
  phoneFormatted: string;
  whatsappClean: string;
  address: string;
  mrt: string;
  hours: string;
  isMainline: boolean;
}

export const OUTLETS: OutletInfo[] = [
  {
    id: 'keong_saik',
    name: 'Keong Saik Outlet',
    chineseName: '恭锡路总店',
    phone: '97272533',
    phoneFormatted: '+65 9727 2533',
    whatsappClean: '6597272533',
    address: '4 Keong Saik Road, Singapore 089110',
    mrt: 'Outram Park MRT (EW16/NE3/TE17 Exit 4) & Chinatown MRT (DT19/NE4 Exit A)',
    hours: 'Lunch: 12:00 PM - 2:15 PM | Dinner: 5:00 PM - 9:15 PM (Closed Mondays)',
    isMainline: true,
  },
  {
    id: 'city_square_mall',
    name: 'City Square Mall Outlet',
    chineseName: '城市广场分店',
    phone: '96244244',
    phoneFormatted: '+65 9624 4244',
    whatsappClean: '6596244244',
    address: 'City Square Mall, 180 Kitchener Rd, #02-K1/K2/K3, Singapore 208539',
    mrt: 'Farrer Park MRT (NE8 Exit I)',
    hours: 'Daily: 11:30 AM - 9:30 PM (Daily)',
    isMainline: false,
  },
];

export const RESTAURANT_INFO = {
  name: 'Kok Sen Restaurant',
  chineseName: '國成菜館',
  accolade: 'Michelin Bib Gourmand 2016–2026',
  tagline: 'Heritage Cantonese Zi Char',
  subtitle: 'Wok-Hei Craft Since 1970s',
  description:
    '3rd Generation Wok Masters. Famous for our Big Prawn Hor Fun, Claypot Yong Tau Foo, and legendary Cantonese zi char at 4 Keong Saik Road.',
  orderWebLink: ORDER_WEB_LINK,
  outlets: OUTLETS,
  whatsappNumber: '+65 9727 2533',
  whatsappClean: '6597272533',
  keongSaikWhatsapp: '6597272533',
  citySquareMallWhatsapp: '6596244244',
  address: '4 Keong Saik Road, Singapore 089110',
  googleMapsUrl: 'https://share.google/vPnZggbiOsjT21hKp',
  mrt: 'Outram Park MRT (EW16/NE3/TE17 Exit 4) & Chinatown MRT (DT19/NE4 Exit A)',
  hours: 'Lunch: 12:00 PM - 2:15 PM | Dinner: 5:00 PM - 9:15 PM (Closed Mondays)',
  payment: 'Cash & PayNow only',
  logoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDUPrzDRkOHBSNQV1NNhear46-NVWoCix2dnzmxHNW2a9hqrULz1UAZqk0RbjbvtyPi2YEz6fZ2YZJAAzq_W8SlT-G6aD3_2pClu1XrLCRKVBXdiU6JgID8C4vdgsXYWFrxjz42kE17WvWwjTF9pGkOG94TSkmpBqdSx25VXWnExSyBXWfWuSVQ5YDrp-9uXWJYxAOUJxilc1RGS54zfybFaXfgUI2-aM5ajNwbM4iXr7ZycxuWLMrwH2JePq3qmh8eYg',
  michelinReview:
    "Unfussy, robust, and packing undeniable wok heat. Kok Sen's Big Prawn Hor Fun, Claypot Yong Tau Foo, and signature spicy prawn gravy define the epitome of Singapore zi char excellence.",
};

export const MENU_CATEGORIES = MENU_SECTIONS;
`;

fs.writeFileSync('./src/data/dishes.ts', tsCode, 'utf8');
console.log('Successfully updated src/data/dishes.ts with', dishes.length, 'dishes across', menuSections.length, 'categories!');
