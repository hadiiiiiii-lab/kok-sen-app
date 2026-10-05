import { Dish, MenuSectionInfo } from '../types';
import bittergourdSoupImg from '../assets/images/bittergourd_soup_1790162126049.jpg';
import barleyWaterImg from '../assets/images/barley_water_1790162144739.jpg';
import sambalSotongImg from '../assets/images/sambal_sotong_1790313577009.jpg';
import eggsCrispyNoodlesImg from '../assets/images/eggs_crispy_noodles_1790314394242.jpg';
import roastPorkKailanImg from '../assets/images/roast_pork_kailan_1790314403984.jpg';
import porkRibKingImg from '../assets/images/pork_rib_king_1790314579291.jpg';
import steamedPorkPattyImg from '../assets/images/steamed_pork_patty_1790314596615.jpg';
import cerealPrawnsImg from '../assets/images/cereal_prawns_1790314763712.jpg';
import bittergourdFishImg from '../assets/images/bittergourd_fish_1790314749051.jpg';
import sambalPetaiPrawnsImg from '../assets/images/sambal_petai_prawns_1790314780030.jpg';
import kungPaoFrogImg from '../assets/images/kung_pao_frog_1790314811939.jpg';
import slicedFishHorFunImg from '../assets/images/sliced_fish_hor_fun_1790314735370.jpg';
import dryBeefHorFunImg from '../assets/images/dry_beef_horfun_1790314844611.jpg';
import thaiFriedRiceImg from '../assets/images/thai_fried_rice_1790314858175.jpg';
import seafoodMuiFanImg from '../assets/images/seafood_mui_fan_1790314829094.jpg';
import frenchBeansShrimpImg from '../assets/images/french_beans_shrimp_1790314876531.jpg';
import seafoodTomYamImg from '../assets/images/seafood_tom_yam_1790314798797.jpg';
import saltedVegSoupImg from '../assets/images/salted_veg_soup_1790314892952.jpg';

export const MENU_SECTIONS: MenuSectionInfo[] = [
  {
    id: 'signatures',
    name: 'Legendary Signatures',
    chineseName: '招牌推荐',
    iconName: 'Sparkles',
    description: 'Award-winning heritage recipes perfected over 3 generations since 1970s',
  },
  {
    id: 'seafood',
    name: 'Prawn & Seafood',
    chineseName: '鲜活海鲜',
    iconName: 'Fish',
    description: 'Fresh giant prawns, squid, and sea catches tossed in high wok heat',
  },
  {
    id: 'meat',
    name: 'Poultry & Meat',
    chineseName: '肉类风味',
    iconName: 'Flame',
    description: 'Famous prawn paste chicken, caramelized pork ribs & sizzling beef',
  },
  {
    id: 'noodles',
    name: 'Rice & Noodles',
    chineseName: '饭面主食',
    iconName: 'UtensilsCrossed',
    description: 'Signature charred wok-hei hor fun, crispy noodles and fried rice',
  },
  {
    id: 'vegetables',
    name: 'Vegetables, Eggs & Tofu',
    chineseName: '时蔬蛋品豆腐',
    iconName: 'Salad',
    description: 'Crispy cai poh omelettes, sizzling claypots, handmade stuffed tofu, and sambal greens',
  },
  {
    id: 'soups',
    name: 'Heritage Soups',
    chineseName: '滋补靓汤',
    iconName: 'Soup',
    description: 'Double-boiled broths and comforting claypot soups',
  },
  {
    id: 'drinks',
    name: 'Beverages & Herbal',
    chineseName: '特调饮品',
    iconName: 'Coffee',
    description: 'Fresh homemade barley, calamansi lime with sour plum, and Chinese teas',
  },
];

export const DISHES: Dish[] = [
  // ================= SIGNATURES =================
  {
    id: 1,
    name: 'Big Prawn Hor Fun',
    chineseName: '大虾河粉',
    price: 20.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWY0xeqr7WAKYAd5i0KEvbj9wdwLQICfw7PqYnWMXhwWIANAM1RiaGY04bUKrNWZ_x91i0hOplvj7e4hMb3ZYqgwb13NF37-SxGFkdXqv8-ZHAoIw_pYMsC8fFH5V1G6jFgq4hohr51IMBh01pEbSII5X7XGwJaKjP7fk0O-m4L8Yus8ixQADPPoUAHXP1MCobmdalFV2ynZxEazQxqjBkbpxzehScnrNCESe3v6aiyRNgI2H4eHKw',
    category: 'signatures',
    secondaryCategory: 'noodles',
    badge: 'Signature #1',
    portion: 'Regular (1-2 pax)',
    description:
      'Colossal freshwater prawns over charred smoky hor fun noodles in fiery egg broth.',
    isSpicy: true,
    spicyLevel: 2,
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 20.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 38.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 56.0 },
    ],
    allergens: ['Shellfish', 'Soy', 'Egg', 'Gluten'],
  },
  {
    id: 2,
    name: 'Claypot Yong Tau Foo',
    chineseName: '砂煲酿豆腐',
    price: 18.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7oYZBA21fxShf3SnGMxhC070iFGQL9-bSyGBAw3lkuiDh-VlweVPElv5dqc9N489u7qQw_hWKHHz1dAArWsVmnL2rsbX31uqeO7X-d187qVbfxji2GGnJAUpLkum5LtbF5paE-_kDVbFj-LifH7H4IbPfLJzRdwne7tU6POyjjK2K_WPH7z5O-YZYaWYV1Hq1p-U9vouEPWYRcIv3hmAMdvG1Ww4FOomrSqZHHpktFF2REpARAjtd',
    category: 'signatures',
    secondaryCategory: 'vegetables',
    badge: 'Heritage Star',
    portion: 'Regular (1-2 pax)',
    description:
      'Handmade stuffed fish & squid paste rolls in sizzling earthen claypot braise.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 18.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 26.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 34.0 },
    ],
    allergens: ['Fish', 'Shellfish', 'Soy', 'Gluten'],
  },
  {
    id: 3,
    name: 'Claypot Pork Liver',
    chineseName: '砂煲猪肝',
    price: 16.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBz7AATscYY-bbpm-QwTXMVNqbdtdqzRrTZMrPXRLvpo0pq3WF2zjDVW_Jgn8ZcaTbX2OPsZx0tniVmS66ysihQQgUrBRVApUODh6fI1flfAHfC7HqPDGKZiIr0z1KGrbxIEfVkOsGE_4MBH4ENjihoxu1xIODKkaouX3IEtMDD1Ywei4smr7Xh2SOD_1aUCJVUC9Zh4deVNq8hRxvjYru0RdyBzYoj_jazaSEPYaacFgWlCpTLWKij',
    category: 'signatures',
    secondaryCategory: 'meat',
    badge: 'Fan Favourite',
    portion: 'Regular',
    description:
      'Ultra tender caramelized slices with aged ginger and spring scallions.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small', price: 16.0 },
      { size: 'M', label: 'Medium', price: 24.0 },
      { size: 'L', label: 'Large', price: 32.0 },
    ],
    allergens: ['Soy', 'Gluten', 'Sesame'],
  },
  {
    id: 7,
    name: 'Big Prawn Bee Hoon Soup',
    chineseName: '大虾米粉汤',
    price: 20.0,
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    category: 'signatures',
    secondaryCategory: 'noodles',
    badge: 'Must Try',
    portion: 'Regular (1-2 pax)',
    description:
      'Rich umami-packed seafood broth infused with whole giant freshwater prawns and silky thick bee hoon.',
    isPopular: true,
    allergens: ['Shellfish', 'Soy'],
  },
  {
    id: 8,
    name: 'Claypot Braised Fish Head with Bittergourd',
    chineseName: '苦瓜焖鱼头煲',
    price: 24.0,
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    category: 'signatures',
    secondaryCategory: 'seafood',
    badge: 'Chef Special',
    portion: 'Regular (2-3 pax)',
    description:
      'Deep-fried fish head chunks braised in earthen pot with tender bittergourd and aromatic salted black beans.',
    isPopular: true,
    allergens: ['Fish', 'Soy', 'Gluten'],
  },

  // ================= SEAFOOD =================
  {
    id: 9,
    name: 'Cereal Butter Prawns',
    chineseName: '麦片虾',
    price: 22.0,
    image: cerealPrawnsImg,
    category: 'seafood',
    badge: 'Top Seller',
    portion: '8 Pieces',
    description:
      'Succulent whole prawns coated in fragrant buttery toasted Nestum cereal with chili padi and curry leaves.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (8 pcs)', price: 22.0 },
      { size: 'M', label: 'Medium (12 pcs)', price: 32.0 },
      { size: 'L', label: 'Large (16 pcs)', price: 42.0 },
    ],
    allergens: ['Shellfish', 'Dairy', 'Gluten', 'Egg'],
  },
  {
    id: 10,
    name: 'Salted Egg Prawn Balls',
    chineseName: '咸蛋虾球',
    price: 24.0,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    category: 'seafood',
    badge: 'Rich & Creamy',
    portion: 'Regular',
    description:
      'Plump de-shelled prawn balls wok-glazed in velvety golden salted egg yolk reduction.',
    isPopular: true,
    allergens: ['Shellfish', 'Egg', 'Dairy', 'Gluten'],
  },
  {
    id: 11,
    name: 'Curry Fish Head',
    chineseName: '砂煲咖喱鱼头',
    price: 28.0,
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    category: 'seafood',
    badge: 'House Specialty',
    portion: 'Claypot (3-4 pax)',
    description:
      'Simmering spicy Nanyang curry with tender sea bass head, eggplant, ladyfingers, and tofu puffs.',
    isSpicy: true,
    spicyLevel: 2,
    isPopular: true,
    allergens: ['Fish', 'Dairy', 'Soy', 'Gluten'],
  },
  {
    id: 12,
    name: 'Sambal Sotong (Squid)',
    chineseName: '参巴苏东',
    price: 18.0,
    image: sambalSotongImg,
    category: 'seafood',
    badge: 'Spicy Favorite',
    portion: 'Regular',
    description:
      'Tender ring squids flash-fried in smoky wok heat with aromatic spicy dried shrimp sambal paste and onions.',
    isSpicy: true,
    spicyLevel: 2,
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 18.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 27.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 36.0 },
    ],
    allergens: ['Mollusc', 'Shellfish', 'Soy'],
  },
  {
    id: 13,
    name: 'Deep Fried Baby Squid',
    chineseName: '酥炸苏东仔',
    price: 16.0,
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    category: 'seafood',
    portion: 'Crispy Snack',
    description:
      'Ultra crispy golden baby squids coated in sweet honey glaze with toasted white sesame.',
    allergens: ['Mollusc', 'Gluten', 'Sesame', 'Soy'],
  },
  {
    id: 32,
    name: 'Handmade Crispy Prawn Roll',
    chineseName: '传统手工炸虾枣',
    price: 14.0,
    image:
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&auto=format&fit=crop&q=80',
    category: 'seafood',
    secondaryCategory: 'signatures',
    badge: 'Heritage Favorite',
    portion: '8 Pieces',
    description:
      'Traditional deep-fried beancurd skin rolls packed with fresh minced prawns, pork, and water chestnuts. Served with sweet plum dip.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (8 pcs)', price: 14.0 },
      { size: 'M', label: 'Medium (12 pcs)', price: 21.0 },
      { size: 'L', label: 'Large (16 pcs)', price: 28.0 },
    ],
    allergens: ['Shellfish', 'Fish', 'Soy', 'Gluten', 'Egg'],
  },
  {
    id: 37,
    name: 'Bittergourd Sliced Fish in Black Bean Sauce',
    chineseName: '豉汁苦瓜炒鱼片',
    price: 18.0,
    image: bittergourdFishImg,
    category: 'seafood',
    portion: 'Regular (2-3 pax)',
    description:
      'Tender deboned white fish slices wok-braised with sliced bittergourd in Kok Sen’s savory fermented black bean garlic sauce.',
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 18.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 26.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 34.0 },
    ],
    allergens: ['Fish', 'Soy', 'Gluten'],
  },
  {
    id: 40,
    name: 'Sambal Petai with Prawns',
    chineseName: '臭豆参巴炒大虾',
    price: 22.0,
    image: sambalPetaiPrawnsImg,
    category: 'seafood',
    badge: 'Spicy Classic',
    portion: 'Regular (2-3 pax)',
    description:
      'Whole sea prawns and crunchy pungent stink beans (petai) tossed over ferocious wok heat in house belacan chili sambal.',
    isSpicy: true,
    spicyLevel: 2,
    isPopular: true,
    allergens: ['Shellfish', 'Soy'],
  },

  // ================= POULTRY & MEAT =================
  {
    id: 4,
    name: 'Prawn Paste Chicken Wings',
    chineseName: '虾酱鸡 (Har Cheong Gai)',
    price: 14.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtDon7tbI1qK5h-tmC7AxxCBcOz1z45OkCXuHaELrjOIy-4Tvekk-O7D-6pGB5N0wAzapEUjjObVpCeUXbBmV_rwRkKqRzneMOBBkz-lH9dMF6k2XsH3TLWzE1CQb8xLo6Nz4Ckz68qVfejARM_9XTPRiT-pWAbPd20x6vLjrI9leQtfNmUJmFhwvb8zjYTxvqTvwLrqzKkFR47lwD3SheZiqJuDMFpNgNsFYTRJhpdPYjDp3nk5jd',
    category: 'meat',
    badge: 'Must Order',
    portion: '6 Pieces',
    description:
      'Crispy golden deep-fried wings infused with fragrant fermented shrimp paste and calamansi lime.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (6 pcs)', price: 14.0 },
      { size: 'M', label: 'Medium (9 pcs)', price: 21.0 },
      { size: 'L', label: 'Large (12 pcs)', price: 28.0 },
    ],
    allergens: ['Shellfish', 'Gluten', 'Egg'],
  },
  {
    id: 14,
    name: 'Bittergourd Pork Ribs in Black Bean Sauce',
    chineseName: '豉汁苦瓜排骨',
    price: 16.0,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    category: 'meat',
    badge: 'Classic Heritage',
    portion: 'Regular',
    description:
      'Tender braised pork ribs caramelized in fermented black beans with crisp bittergourd slices.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small', price: 16.0 },
      { size: 'M', label: 'Medium', price: 24.0 },
      { size: 'L', label: 'Large', price: 32.0 },
    ],
    allergens: ['Soy', 'Gluten'],
  },
  {
    id: 15,
    name: 'Sweet & Sour Pork',
    chineseName: '菠萝咕噜肉',
    price: 15.0,
    image:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80',
    category: 'meat',
    portion: 'Regular',
    description:
      'Crispy battered pork collar tossed with juicy pineapple, bell peppers in tangy plum hawthorn glaze.',
    allergens: ['Gluten', 'Egg', 'Soy'],
  },
  {
    id: 16,
    name: 'Spring Onion & Ginger Sliced Beef',
    chineseName: '姜葱炒牛肉',
    price: 16.0,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    category: 'meat',
    portion: 'Regular',
    description:
      'Tender marinated beef slices wok-seared with fragrant young ginger, garlic, and scallions.',
    allergens: ['Soy', 'Gluten', 'Sesame'],
  },
  {
    id: 17,
    name: 'Kung Pao Frog with Dried Chilli',
    chineseName: '宫保田鸡煲',
    price: 22.0,
    image: kungPaoFrogImg,
    category: 'meat',
    badge: 'Spicy Claypot',
    portion: 'Claypot (2-3 frogs)',
    description:
      'Sizzling frog legs braised in dark sweet soy gravy with toasted dried chillies and spring onions.',
    isSpicy: true,
    spicyLevel: 2,
    allergens: ['Soy', 'Gluten'],
  },
  {
    id: 36,
    name: 'Sweet & Sour Pork Rib King (Pai Gu Wang)',
    chineseName: '酸甜京都排骨王',
    price: 16.0,
    image: porkRibKingImg,
    category: 'meat',
    badge: 'Heritage Favorite',
    portion: 'Regular',
    description:
      'Tender prime boneless pork ribs seared crisp and tossed in Kok Sen’s savory-sweet tangy tomato, hawthorn, and plum reduction with sesame seeds.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small', price: 16.0 },
      { size: 'M', label: 'Medium', price: 24.0 },
      { size: 'L', label: 'Large', price: 32.0 },
    ],
    allergens: ['Soy', 'Gluten', 'Sesame'],
  },
  {
    id: 44,
    name: 'Steamed Minced Pork with Salted Fish',
    chineseName: '梅香咸鱼蒸肉饼',
    price: 15.0,
    image: steamedPorkPattyImg,
    category: 'meat',
    badge: 'Heritage Classic',
    portion: 'Regular (2-3 pax)',
    description:
      'Traditional Cantonese hand-minced pork patty steamed with pungent fragrant Mui Heong salted fish, julienned ginger, and superior soy sauce.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small', price: 15.0 },
      { size: 'M', label: 'Medium', price: 22.0 },
      { size: 'L', label: 'Large', price: 30.0 },
    ],
    allergens: ['Fish', 'Soy'],
  },

  // ================= RICE & NOODLES =================
  {
    id: 5,
    name: 'Black Pepper Beef Hor Fun',
    chineseName: '黑椒牛肉河粉',
    price: 16.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPk-wg3EYYFz1Wah2rcrE2s_vzn_RP2AzmBM52N7PtPchRC5-xdhjvuRxmJWKERkqMFgi-i3c3iOKMvq2_N1domY85YTAK4ZtW730O8yUoRH0Ni6IMOLY9u60U_2ank-pK7tqb0q0JDJiZtgkTJ9B7Seu3BD4keOAl6RdXj4yW_Q0JVxD8_r3exJ8tY-O4OotycTXknUnBFNFndzFIqFOLEmBdV9Fuacj8CzLP2kCbj5DS0RQ9TugD',
    category: 'noodles',
    portion: 'Regular',
    description:
      'Smoky wok-charred flat rice noodles with juicy tender beef slices in savory crushed pepper reduction.',
    isSpicy: true,
    spicyLevel: 1,
    isPopular: true,
    allergens: ['Soy', 'Gluten'],
  },
  {
    id: 18,
    name: 'Big Prawn Crispy Noodles',
    chineseName: '大虾生面',
    price: 20.0,
    image:
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    category: 'noodles',
    badge: 'Michelin Starred Fav',
    portion: 'Regular (1-2 pax)',
    description:
      'Golden crunchy fried egg noodles soaked in thick fiery prawn gravy with fresh tiger prawns.',
    isSpicy: true,
    spicyLevel: 2,
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 20.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 38.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 56.0 },
    ],
    allergens: ['Shellfish', 'Egg', 'Gluten', 'Soy'],
  },
  {
    id: 42,
    name: 'Black Bean Beef Hor Fun',
    chineseName: '豉汁牛肉河粉',
    price: 16.0,
    image:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    category: 'noodles',
    badge: 'Wok-Hei Classic',
    portion: 'Regular (1-2 pax)',
    description:
      'Smoky wok-charred flat rice noodles bathed in fragrant fermented black bean garlic gravy with tender sliced beef and capsicum.',
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 16.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 24.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 32.0 },
    ],
    allergens: ['Soy', 'Gluten'],
  },
  {
    id: 43,
    name: 'Signature Eggs Crispy Noodles (Seafood & Pork)',
    chineseName: '招牌滑蛋什锦生面',
    price: 14.0,
    image: eggsCrispyNoodlesImg,
    category: 'noodles',
    badge: 'Michelin Highlight',
    portion: 'Regular (1-2 pax)',
    description:
      'Golden crispy fried egg noodles drenched in a rich egg flower gravy loaded with fresh tiger prawns, tender sliced pork, squid, and green choy sum.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 14.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 28.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 42.0 },
    ],
    allergens: ['Egg', 'Shellfish', 'Mollusc', 'Gluten', 'Soy'],
  },
  {
    id: 19,
    name: 'Yang Zhou Fried Rice',
    chineseName: '扬州炒饭',
    price: 11.0,
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
    category: 'noodles',
    portion: 'Regular (1-2 pax)',
    description:
      'Classic wok-tossed jasmine rice with diced roast pork (char siew), fresh prawns, eggs, and spring onions.',
    allergens: ['Shellfish', 'Egg', 'Soy', 'Gluten'],
  },
  {
    id: 20,
    name: 'Sliced Fish Hor Fun with Bean Sprouts',
    chineseName: '三芽鱼片河粉',
    price: 14.0,
    image: slicedFishHorFunImg,
    category: 'noodles',
    portion: 'Regular',
    description:
      'Silky smooth rice noodles topped with fresh succulent fish slices in egg white gravy.',
    allergens: ['Fish', 'Soy', 'Gluten'],
  },
  {
    id: 21,
    name: 'Seafood Sambal Fried Rice',
    chineseName: '海鲜参巴炒饭',
    price: 13.0,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
    category: 'noodles',
    portion: 'Regular',
    description:
      'Fiery wok-fried rice with squid rings, prawns, egg ribbons, and Kok Sen house sambal belacan.',
    isSpicy: true,
    spicyLevel: 2,
    allergens: ['Shellfish', 'Mollusc', 'Egg', 'Soy'],
  },
  {
    id: 35,
    name: 'Dry-Fried Beef Hor Fun (Gon Chow Ngau Ho)',
    chineseName: '镬气干炒牛河',
    price: 16.0,
    image: dryBeefHorFunImg,
    category: 'noodles',
    badge: 'Wok-Hei Master',
    portion: 'Regular (1-2 pax)',
    description:
      'The supreme test of wok heat. Charred flat rice noodles dry-fried without pooled gravy, seared with marinated tender beef slices, beansprouts, and yellow chives.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small (1-2 pax)', price: 16.0 },
      { size: 'M', label: 'Medium (3-4 pax)', price: 24.0 },
      { size: 'L', label: 'Large (5-6 pax)', price: 32.0 },
    ],
    allergens: ['Soy', 'Gluten'],
  },
  {
    id: 38,
    name: 'Thai Style Seafood Fried Rice',
    chineseName: '泰式海鲜炒饭',
    price: 12.0,
    image: thaiFriedRiceImg,
    category: 'noodles',
    portion: 'Regular (1-2 pax)',
    description:
      'Zesty wok-fried jasmine rice tossed with fresh prawns, diced chicken, chili paste, and aromatic kaffir lime leaves.',
    isSpicy: true,
    spicyLevel: 1,
    allergens: ['Shellfish', 'Mollusc', 'Egg', 'Soy'],
  },
  {
    id: 39,
    name: 'Seafood & Pork Braised Mui Fan',
    chineseName: '什锦滑蛋烩饭',
    price: 12.0,
    image: seafoodMuiFanImg,
    category: 'noodles',
    portion: 'Regular (1-2 pax)',
    description:
      'Silky comforting Cantonese egg gravy with fresh prawns, tender sliced pork, squid, and greens ladled over hot jasmine rice.',
    allergens: ['Shellfish', 'Fish', 'Mollusc', 'Egg', 'Soy', 'Gluten'],
  },
  {
    id: 47,
    name: 'Fragrant Steamed Jasmine White Rice',
    chineseName: '香浓丝苗白饭',
    price: 1.0,
    image:
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop&q=80',
    category: 'noodles',
    portion: 'Per Bowl',
    description:
      'Hot fluffy steamed premium jasmine rice, the essential companion for all Kok Sen savory gravies and claypot dishes.',
    allergens: ['None'],
  },

  // ================= VEGETABLES & TOFU =================
  {
    id: 6,
    name: 'Sambal Kang Kong',
    chineseName: '参巴空心菜',
    price: 12.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBX7WhpwiOQh22sWZ1fA2G74JQvkMHxNveIDJWGmxkQvk72GHRo2fYXbKhsWAMe9NE8NkmpAD_YQal-p8PgxUq1XvQGYuMey57kM6JQMOD5D9lKFEVL74C1J3sXJloNVkUmILF5sEqx6o5vwvOacdOH1uEZ2uZcUD7KmfISFcecCo6EelMJ9Tk4HgXaaZ62nKgIlFSLKFfRblyqpPkYGlmvKuJb9nKwEhNtspS-ym3yduEO9rrMj0rS',
    category: 'vegetables',
    portion: 'Spicy Medium',
    description:
      "Crisp water spinach wok-tossed with Kok Sen's aromatic house-made belacan chili sambal.",
    isSpicy: true,
    spicyLevel: 2,
    isPopular: true,
    allergens: ['Shellfish', 'Soy'],
  },
  {
    id: 22,
    name: 'Poached Chinese Spinach with Trio of Eggs',
    chineseName: '三蛋苋菜',
    price: 14.0,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    category: 'vegetables',
    badge: 'Popular Veg',
    portion: 'Regular',
    description:
      'Tender amaranth greens in superior chicken broth with salted egg, century egg, and fresh egg ribbons.',
    isPopular: true,
    allergens: ['Egg', 'Soy'],
  },
  {
    id: 23,
    name: 'Garlic Stir-Fried Baby Kailan',
    chineseName: '蒜蓉炒小芥兰',
    price: 12.0,
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    category: 'vegetables',
    portion: 'Regular',
    description:
      'Crunchy baby kailan greens tossed with sizzling minced garlic in light savory soy.',
    allergens: ['Soy'],
  },
  {
    id: 24,
    name: 'Hotplate Sizzling Tofu',
    chineseName: '铁板豆腐',
    price: 15.0,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    category: 'vegetables',
    portion: 'Sizzling Plate',
    description:
      'Egg tofu served sizzling over an omelette base with minced pork, fresh mushrooms, and scallions.',
    allergens: ['Egg', 'Soy', 'Gluten', 'Shellfish'],
  },
  {
    id: 33,
    name: 'Preserved Radish Cai Poh Omelette',
    chineseName: '经典潮州菜脯煎蛋',
    price: 12.0,
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    category: 'vegetables',
    badge: 'Must Order',
    portion: 'Regular (2-3 pax)',
    description:
      'Thick, golden, fluffy wok-fried egg omelette packed with crunchy sweet-savory preserved radish (cai poh) and aromatic spring onions.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small', price: 12.0 },
      { size: 'M', label: 'Medium', price: 18.0 },
      { size: 'L', label: 'Large', price: 24.0 },
    ],
    allergens: ['Egg', 'Soy'],
  },
  {
    id: 34,
    name: 'Fu Rong Omelette (Egg Foo Young)',
    chineseName: '招牌芙蓉煎蛋',
    price: 12.0,
    image:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    category: 'vegetables',
    portion: 'Regular (2-3 pax)',
    description:
      'Fluffy Cantonese-style omelette filled with tender char siew, fresh prawns, sliced onions, and crunchy beansprouts.',
    portionOptions: [
      { size: 'S', label: 'Small', price: 12.0 },
      { size: 'M', label: 'Medium', price: 18.0 },
      { size: 'L', label: 'Large', price: 24.0 },
    ],
    allergens: ['Egg', 'Shellfish', 'Soy'],
  },
  {
    id: 41,
    name: 'French Beans with Dried Shrimp & Minced Pork',
    chineseName: '虾米肉碎四季豆',
    price: 13.0,
    image: frenchBeansShrimpImg,
    category: 'vegetables',
    portion: 'Regular',
    description:
      'Tender-crisp string beans blistered in a hot wok with savory toasted dried shrimp, seasoned minced pork, and chili slices.',
    allergens: ['Shellfish', 'Soy', 'Gluten'],
  },
  {
    id: 45,
    name: 'Kai Lan Stir-Fried with Roasted Pork (Siew Yuk)',
    chineseName: '脆皮烧肉炒芥兰',
    price: 15.0,
    image: roastPorkKailanImg,
    category: 'vegetables',
    badge: 'Popular Veg',
    portion: 'Regular (2-3 pax)',
    description:
      'Crisp Hong Kong baby kailan wok-tossed on high fire with golden crackling-skin roasted pork belly cubes and minced garlic.',
    isPopular: true,
    portionOptions: [
      { size: 'S', label: 'Small', price: 15.0 },
      { size: 'M', label: 'Medium', price: 22.0 },
      { size: 'L', label: 'Large', price: 30.0 },
    ],
    allergens: ['Soy', 'Gluten'],
  },

  // ================= SOUPS =================
  {
    id: 25,
    name: 'Sliced Fish with Tofu Soup',
    chineseName: '鱼片豆腐白菜汤',
    price: 12.0,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    category: 'soups',
    portion: 'Claypot Bowl',
    description:
      'Clear comforting broth with fresh sea bass slices, silken tofu, tomatoes, salted vegetables, and ginger.',
    isPopular: true,
    allergens: ['Fish', 'Soy'],
  },
  {
    id: 26,
    name: 'Bittergourd Pork Rib Soup',
    chineseName: '苦瓜排骨滋补汤',
    price: 13.0,
    image: bittergourdSoupImg,
    category: 'soups',
    portion: 'Bowl',
    description:
      'Double-boiled cooling soup with tender pork ribs, fresh bittergourd, and soya beans.',
    allergens: ['Soy'],
  },
  {
    id: 27,
    name: 'Seafood Tom Yam Claypot Soup',
    chineseName: '海鲜东炎汤',
    price: 16.0,
    image: seafoodTomYamImg,
    category: 'soups',
    portion: 'Claypot (2-3 pax)',
    description:
      'Spicy, sour, and tangy lemongrass broth packed with tiger prawns, squid, sliced fish, and mushrooms.',
    isSpicy: true,
    spicyLevel: 2,
    allergens: ['Shellfish', 'Fish', 'Mollusc', 'Soy'],
  },
  {
    id: 46,
    name: 'Teochew Salted Vegetable Tofu Soup',
    chineseName: '潮州咸菜豆腐汤',
    price: 12.0,
    image: saltedVegSoupImg,
    category: 'soups',
    portion: 'Claypot Bowl',
    description:
      'Comforting, appetizing sour and savory clear broth with preserved mustard greens, silky tofu, sliced pork, tomatoes, and ginger.',
    portionOptions: [
      { size: 'S', label: 'Small', price: 12.0 },
      { size: 'M', label: 'Medium', price: 18.0 },
      { size: 'L', label: 'Large', price: 24.0 },
    ],
    allergens: ['Soy'],
  },

  // ================= BEVERAGES & HERBAL =================
  {
    id: 28,
    name: 'Homemade Barley Water (Iced / Warm)',
    chineseName: '自制薏米水 (冷/热)',
    price: 2.8,
    image: barleyWaterImg,
    category: 'drinks',
    portion: 'Glass',
    description:
      'Daily freshly brewed pearl barley with candied winter melon. Refreshing and cooling.',
    allergens: ['Gluten (Barley)'],
  },
  {
    id: 29,
    name: 'Calamansi Lime Juice with Sour Plum',
    chineseName: '话梅酸柑水',
    price: 3.2,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    category: 'drinks',
    badge: 'Popular',
    portion: 'Iced Glass',
    description:
      'Freshly squeezed local calamansi limes with savory sour plum. The perfect palate cleanser after rich zi char.',
    isPopular: true,
    allergens: ['None'],
  },
  {
    id: 30,
    name: 'Herbal Luo Han Guo (Monk Fruit Tea)',
    chineseName: '罗汉果凉茶',
    price: 2.8,
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    category: 'drinks',
    portion: 'Iced Glass',
    description:
      'Slow-boiled monk fruit with dried longan and chrysanthemum to soothe the throat.',
    allergens: ['None'],
  },
  {
    id: 31,
    name: 'Chinese Tea (Tie Guan Yin / Pu-Erh)',
    chineseName: '精选中国茶 (铁观音/普洱)',
    price: 2.0,
    image:
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    category: 'drinks',
    portion: 'Per Pot',
    description:
      'Traditional fragrant Chinese tea served in a porcelain tea pot with refills.',
    allergens: ['None'],
  },
];

export const RESTAURANT_INFO = {
  name: 'Kok Sen Restaurant',
  chineseName: '國成菜館',
  accolade: 'Michelin Bib Gourmand 2016–2024',
  tagline: 'Heritage Cantonese Zi Char',
  subtitle: 'Wok-Hei Craft Since 1970s',
  description:
    '3rd Generation Wok Masters. Famous for our Big Prawn Hor Fun, Claypot Yong Tau Foo, and legendary Cantonese zi char at 4 Keong Saik Road.',
  whatsappNumber: '+65 9727 2533',
  whatsappClean: '6597272533',
  address: '4 Keong Saik Road, Singapore 089110',
  googleMapsUrl: 'https://share.google/vPnZggbiOsjT21hKp',
  mrt: 'Outram Park MRT (EW16/NE3/TE17 Exit 4) & Chinatown MRT (DT19/NE4 Exit A)',
  hours: 'Lunch: 12:00 PM - 2:15 PM | Dinner: 5:00 PM - 9:15 PM (Closed Mondays)',
  payment: 'Cash & PayNow only',
  logoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDUPrzDRkOHBSNQV1NNhear46-NVWoCix2dnzmxHNW2a9hqrULz1UAZqk0RbjbvtyPi2YEz6fZ2YZJAAzq_W8SlT-G6aD3_2pClu1XrLCRKVBXdiU6JgID8C4vdgsXYWFrxjz42kE17WvWwjTF9pGkOG94TSkmpBqdSx25VXWnExSyBXWfWuSVQ5YDrp-9uXWJYxAOUJxilc1RGS54zfybFaXfgUI2-aM5ajNwbM4iXr7ZycxuWLMrwH2JePq3qmh8eYg',
  michelinReview:
    'Unfussy, robust, and packing undeniable wok heat. Kok Sen\'s Big Prawn Hor Fun, Claypot Yong Tau Foo, and signature spicy prawn gravy define the epitome of Singapore zi char excellence.',
};
