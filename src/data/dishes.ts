import { Dish, MenuSectionInfo } from '../types';

export const MENU_SECTIONS: MenuSectionInfo[] = [
  {
    "id": "SIGNATURE",
    "name": "SIGNATURE",
    "chineseName": "招牌推荐",
    "iconName": "Sparkles",
    "description": "Michelin Bib Gourmand award-winning heritage specialties perfected since 1970s"
  },
  {
    "id": "SEAFOOD",
    "name": "SEAFOOD",
    "chineseName": "海鲜风味",
    "iconName": "Fish",
    "description": "Braised sea cucumbers, fresh squid & high-heat wok ocean delicacies"
  },
  {
    "id": "PRAWN",
    "name": "PRAWN",
    "chineseName": "鲜虾佳肴",
    "iconName": "Fish",
    "description": "Yam rings, cereal butter prawns, sambal prawn balls & live wok-tossed prawns"
  },
  {
    "id": "FROGS",
    "name": "FROGS",
    "chineseName": "鲜美田鸡",
    "iconName": "Flame",
    "description": "Spring onion ginger, deep-fried crispy & black bean claypot frog legs"
  },
  {
    "id": "PORK",
    "name": "PORK",
    "chineseName": "经典猪肉",
    "iconName": "Flame",
    "description": "Sweet & sour pork, bittergourd pork ribs king & caramelized pork chops"
  },
  {
    "id": "FISH",
    "name": "FISH",
    "chineseName": "鲜鱼美馔",
    "iconName": "Fish",
    "description": "Hong Kong steamed fish tail, black bean fish head & crispy fish fillets"
  },
  {
    "id": "BEEF",
    "name": "BEEF",
    "chineseName": "火候牛肉",
    "iconName": "Flame",
    "description": "Tender wok-seared beef with kai lan, black bean sauce, ginger & black pepper"
  },
  {
    "id": "CHICKEN",
    "name": "CHICKEN",
    "chineseName": "家传鸡肉",
    "iconName": "Flame",
    "description": "Iconic prawn paste chicken (Har Cheong Gai), claypot chicken & golden dragon chicken"
  },
  {
    "id": "RICE",
    "name": "RICE",
    "chineseName": "经典炒饭",
    "iconName": "UtensilsCrossed",
    "description": "Wok-hei fried rice, sweet & sour pork rice, roasted pork mui fan & rice plates"
  },
  {
    "id": "NOODLE",
    "name": "NOODLE",
    "chineseName": "招牌面类",
    "iconName": "UtensilsCrossed",
    "description": "Big prawns hor fun, crispy noodles, bee hoon soup & braised yee mee"
  },
  {
    "id": "SOUP",
    "name": "SOUP",
    "chineseName": "滋补靓汤",
    "iconName": "Soup",
    "description": "Comforting bittergourd soup, sliced fish soup, tom yam & mixed salted vegetable soup"
  },
  {
    "id": "TOFU",
    "name": "TOFU",
    "chineseName": "手工豆腐",
    "iconName": "Sparkles",
    "description": "Signature claypot yong tau foo, homemade minced pork tofu & braised bean curd"
  },
  {
    "id": "EGGS",
    "name": "EGGS",
    "chineseName": "香煎蛋品",
    "iconName": "Sparkles",
    "description": "Fu Rong omelette, prawns omelette, preserved radish (cai poh) & minced meat omelettes"
  },
  {
    "id": "VEGETABLE",
    "name": "VEGETABLE",
    "chineseName": "清爽时蔬",
    "iconName": "Salad",
    "description": "Crisp kai lan with garlic, sambal kangkong, romaine lettuce & four heavenly kings"
  }
];

export const DISHES: Dish[] = [
  {
    "id": 1,
    "sourceItemId": "8a81976e75fe1fb70175fe71049d3ac5",
    "name": "Big Prawns Hor Fun | 大虾滑蛋河粉",
    "englishName": "Big Prawns Hor Fun",
    "chineseName": "大虾滑蛋河粉",
    "price": 26.5,
    "image": "https://ucarecdn.com/9a0263ba-c404-4e16-9348-23d7859c3842/",
    "category": "SIGNATURE",
    "badge": "Signature #1",
    "portion": "Small (小）",
    "description": "Small (小）: S$26.50 • Medium (中）: S$52.70 • Large (大）: S$79.40",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小）",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium (中）",
        "price": 52.7
      },
      {
        "size": "L",
        "label": "Large (大）",
        "price": 79.4
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg",
      "Gluten"
    ]
  },
  {
    "id": 2,
    "sourceItemId": "8a81975075fc84cf0175fe6f2e6a6032",
    "name": "Claypot Yong Tau Foo | 巧手三宝煲",
    "englishName": "Claypot Yong Tau Foo",
    "chineseName": "巧手三宝煲",
    "price": 23.8,
    "image": "https://ucarecdn.com/c8bbfc23-e348-411b-bfd5-fd7b8dba4363/",
    "category": "SIGNATURE",
    "badge": "Signature #2",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 3,
    "sourceItemId": "8a818e057cfaffc7017cfb28721a118b",
    "name": "Golden Dragon Chicken | 脆皮金龙鸡",
    "englishName": "Golden Dragon Chicken",
    "chineseName": "脆皮金龙鸡",
    "price": 46.4,
    "image": "https://ucarecdn.com/d985976a-5134-4f8b-bcfc-22a2055a0bfe/",
    "category": "SIGNATURE",
    "badge": "Signature #3",
    "portion": "",
    "description": "Authentic Kok Sen signature specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 46.4
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 4,
    "sourceItemId": "8a81976e75fe1fb70175fe733a3c3c8c",
    "name": "Prawn Paste Chicken | 虾酱鸡",
    "englishName": "Prawn Paste Chicken",
    "chineseName": "虾酱鸡",
    "price": 20,
    "image": "https://ucarecdn.com/d5709a32-eb33-4e52-8579-0f611d0dd94a/",
    "category": "SIGNATURE",
    "badge": "Signature #4",
    "portion": "Small(小)",
    "description": "Small(小): S$20.00 • Medium(中): S$29.90 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 20
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 29.9
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 5,
    "sourceItemId": "8a818cf975fd11d50175fe72a5de592b",
    "name": "Kai Lan Stir Fried with Roasted Pork | 芥兰炒烧肉",
    "englishName": "Kai Lan Stir Fried with Roasted Pork",
    "chineseName": "芥兰炒烧肉",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/KaiLanStirFriedwithRoastedPorkce6496.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #5",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 6,
    "sourceItemId": "8a81912080ac3df20180ac6767ed0c7a",
    "name": "Prawn Roll | 虾枣",
    "englishName": "Prawn Roll",
    "chineseName": "虾枣",
    "price": 17.3,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/PrawnRolldb589a.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #6",
    "portion": "Small(小)",
    "description": "Small(小): S$17.30 • Medium(中): S$25.40 • Large(大): S$34.50",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 17.3
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 25.4
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 34.5
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 7,
    "sourceItemId": "8a81926575fd09ec0175fe720eda749c",
    "name": "Bittergourd Pork Ribs with Black Bean Sauce | 苦瓜豉汁闷排骨",
    "englishName": "Bittergourd Pork Ribs with Black Bean Sauce",
    "chineseName": "苦瓜豉汁闷排骨",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BittergourdPorkRibswithBlackBeanSauce223406.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #7",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 8,
    "sourceItemId": "8a81926575fd09ec0175fe73eefb759c",
    "name": "Stir Fried Beef with Spring Onion | 姜葱炒牛肉",
    "englishName": "Stir Fried Beef with Spring Onion",
    "chineseName": "姜葱炒牛肉",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/StirFriedBeefwithSpringOnion355f6b.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #8",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 9,
    "sourceItemId": "8a81975075fc84cf0175fe7375c46252",
    "name": "Black Bean/Dry Beef Hor Fun | 豉汁/干炒牛肉河",
    "englishName": "Black Bean/Dry Beef Hor Fun",
    "chineseName": "豉汁/干炒牛肉河",
    "price": 12.2,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BlackBeanDryBeefHorFun02af52.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #9",
    "portion": "Small",
    "description": "Small: S$12.20 • Medium: S$24.20 • Large: S$36.50",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small",
        "price": 12.2
      },
      {
        "size": "M",
        "label": "Medium",
        "price": 24.2
      },
      {
        "size": "L",
        "label": "Large",
        "price": 36.5
      }
    ],
    "allergens": [
      "Soy",
      "Gluten"
    ]
  },
  {
    "id": 10,
    "sourceItemId": "8a81975075fc84cf0175fe74612762d2",
    "name": "Black Bean Sauce with Fish Head / Sliced Fish | 豉汁炒鱼头 / 鱼片",
    "englishName": "Black Bean Sauce with Fish Head / Sliced Fish",
    "chineseName": "豉汁炒鱼头 / 鱼片",
    "price": 20,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BlackBeanSaucewithFishHead8e2087.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #10",
    "portion": "Small(小)",
    "description": "Small(小): S$20.00 • Medium(中): S$29.90 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 20
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 29.9
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Fish",
      "Soy"
    ]
  },
  {
    "id": 11,
    "sourceItemId": "8a818dac7ad65dab017ad72cd2497d6e",
    "name": "Curry Fish Head | 咖喱鱼头",
    "englishName": "Curry Fish Head",
    "chineseName": "咖喱鱼头",
    "price": 57.3,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/CurryFishHeadf4244f.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #11",
    "portion": "",
    "description": "Authentic Kok Sen signature specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 57.3
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 12,
    "sourceItemId": "8a818dac7ad65dab017ad72de1b97de9",
    "name": "Curry Fish Tail | 咖喱鱼尾",
    "englishName": "Curry Fish Tail",
    "chineseName": "咖喱鱼尾",
    "price": 111.9,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/CurryFishTail69103c.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #12",
    "portion": "",
    "description": "Authentic Kok Sen signature specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 111.9
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 13,
    "sourceItemId": "8a81901d7f696f3b017f69c271351b61",
    "name": "Black Bean Sauce with Fish Meat | 豉汁炒鱼鸡",
    "englishName": "Black Bean Sauce with Fish Meat",
    "chineseName": "豉汁炒鱼鸡",
    "price": 26.5,
    "image": "https://ucarecdn.com/4311acd0-5dd0-4db6-92ce-05ee9eefb898/",
    "category": "SIGNATURE",
    "badge": "Signature #13",
    "portion": "Small(小)",
    "description": "Small(小): S$26.50 • Medium(中): S$39.70 • Large(大): S$52.70",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 39.7
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 52.7
      }
    ],
    "allergens": [
      "Fish",
      "Soy"
    ]
  },
  {
    "id": 14,
    "sourceItemId": "8a818d6c7fe1dcba017fe3416a261e84",
    "name": "Deep Fried Fish Meat with Light Sauce | 炸鱼肉",
    "englishName": "Deep Fried Fish Meat with Light Sauce",
    "chineseName": "炸鱼肉",
    "price": 38.1,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/DeepFriedFishMeatwithLightSauceab67c8.jpg",
    "category": "SIGNATURE",
    "badge": "Signature #14",
    "portion": "Small(小)",
    "description": "Small(小): S$38.10 • Medium(中): S$58.00 • Large(大): S$76.90",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 38.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 58
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 76.9
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 15,
    "sourceItemId": "8a81930b826ed0b3018271dd047b2972",
    "name": "Salted Egg Prawn Ball | 咸蛋黄虾球",
    "englishName": "Salted Egg Prawn Ball",
    "chineseName": "咸蛋黄虾球",
    "price": 30.5,
    "image": "https://ucarecdn.com/30566e74-6b83-4eca-9953-19190ae48d8f/-/crop/2557x2554/1136,1022/-/preview/",
    "category": "SIGNATURE",
    "badge": "Signature #15",
    "portion": "Small(小)",
    "description": "Small(小): S$30.50 • Medium(中): S$46.40 • Large(大): S$60.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 30.5
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 46.4
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 60.6
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg"
    ]
  },
  {
    "id": 16,
    "sourceItemId": "8a81930b826ed0b3018271e01dde2ae2",
    "name": "Salted Egg Squid | 咸蛋黄苏东",
    "englishName": "Salted Egg Squid",
    "chineseName": "咸蛋黄苏东",
    "price": 23.8,
    "image": "",
    "category": "SIGNATURE",
    "badge": "Signature #16",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large (大): S$47.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg"
    ]
  },
  {
    "id": 17,
    "sourceItemId": "8a8191e075943aac0175963c98544631",
    "name": "Sea Cucumber Braised Mushrooms | 冬菇海参煲",
    "englishName": "Sea Cucumber Braised Mushrooms",
    "chineseName": "冬菇海参煲",
    "price": 42.1,
    "image": "https://ucarecdn.com/79c3f608-e52f-4ffd-8d4e-f81553ea28cf/",
    "category": "SEAFOOD",
    "portion": "Small(小)",
    "description": "Small(小): S$42.10 • Large(大): S$84.00",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 42.1
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 84
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 18,
    "sourceItemId": "8a8191e075943aac0175964092c249b1",
    "name": "Roasted Pork Braised Sea Cucumber | 红烧海参煲",
    "englishName": "Roasted Pork Braised Sea Cucumber",
    "chineseName": "红烧海参煲",
    "price": 42.1,
    "image": "",
    "category": "SEAFOOD",
    "portion": "Small(小)",
    "description": "Small(小): S$42.10 • Large(大): S$84.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 42.1
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 84
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 19,
    "sourceItemId": "8a818ecb75957f1501759643b96d3da2",
    "name": "Sambal Squid | 叁巴苏冬",
    "englishName": "Sambal Squid",
    "chineseName": "叁巴苏冬",
    "price": 19.9,
    "image": "https://ucarecdn.com/4ccfc850-b749-47c2-9299-c5fa555901e3/",
    "category": "SEAFOOD",
    "portion": "Small(小)",
    "description": "Small(小): S$19.90 • Medium(中): S$30.60 • Large(大): S$39.70",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 20,
    "sourceItemId": "8a818e3280ab5e2b0180ac66b1386ba7",
    "name": "Prawn Roll | 虾枣",
    "englishName": "Prawn Roll",
    "chineseName": "虾枣",
    "price": 17.3,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/PrawnRoll1fc1b0.jpg",
    "category": "SEAFOOD",
    "portion": "Small(小)",
    "description": "Small(小): S$17.30 • Medium(中): S$25.40 • Large(大): S$34.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 17.3
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 25.4
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 34.5
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 21,
    "sourceItemId": "8a818ccf8270fece018271e99d6a136f",
    "name": "Salted Egg Squid | 咸蛋黄苏东",
    "englishName": "Salted Egg Squid",
    "chineseName": "咸蛋黄苏东",
    "price": 23.8,
    "image": "",
    "category": "SEAFOOD",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg"
    ]
  },
  {
    "id": 22,
    "sourceItemId": "8a818ec27e8ae888017e8b872069405d",
    "name": "Yam Ring | 芋头圈",
    "englishName": "Yam Ring",
    "chineseName": "芋头圈",
    "price": 37.8,
    "image": "https://ucarecdn.com/ae5e3756-b4d0-4285-b1ab-1fab276a383d/",
    "category": "PRAWN",
    "portion": "",
    "description": "Authentic Kok Sen prawn specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 37.8
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 23,
    "sourceItemId": "8a818ec27e8ae888017e8b8720734062",
    "name": "Cereal Butter Prawns | 麦片鲜虾",
    "englishName": "Cereal Butter Prawns",
    "chineseName": "麦片鲜虾",
    "price": 29.1,
    "image": "https://ucarecdn.com/738ac104-4e4e-423a-b4f3-99fbc4cde42c/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 24,
    "sourceItemId": "8a818ec27e8ae888017e8b8720534055",
    "name": "Sambal Stir Fried with Prawns Balls | 叁巴炒虾球",
    "englishName": "Sambal Stir Fried with Prawns Balls",
    "chineseName": "叁巴炒虾球",
    "price": 29.1,
    "image": "https://ucarecdn.com/83374fba-30ed-462b-9af6-a44bfe5ded90/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 25,
    "sourceItemId": "8a818ec27e8ae888017e8b87205e405a",
    "name": "Salt & Pepper Prawns | 椒盐鲜虾",
    "englishName": "Salt & Pepper Prawns",
    "chineseName": "椒盐鲜虾",
    "price": 29.1,
    "image": "https://ucarecdn.com/2f7ad766-0456-4cb0-adf7-de445b42689d/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 26,
    "sourceItemId": "8a818ec27e8ae888017e8b87207e4067",
    "name": "Sweet & Sour Prawns Balls | 酸甜虾球",
    "englishName": "Sweet & Sour Prawns Balls",
    "chineseName": "酸甜虾球",
    "price": 29.1,
    "image": "https://ucarecdn.com/bb34232e-8b9c-49c3-9972-bb00e0ca8d67/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 27,
    "sourceItemId": "8a818ec27e8ae888017e8b87203e404c",
    "name": "Broccoli Stir Fried with Prawns Balls | 西兰花炒虾球",
    "englishName": "Broccoli Stir Fried with Prawns Balls",
    "chineseName": "西兰花炒虾球",
    "price": 29.1,
    "image": "https://ucarecdn.com/1f6b5431-4a71-44a2-8e19-78f481bf8975/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 28,
    "sourceItemId": "8a818ec27e8ae888017e8b8720494050",
    "name": "Stir Fried Light Sauce with Big Prawn | 干煎大虾碌",
    "englishName": "Stir Fried Light Sauce with Big Prawn",
    "chineseName": "干煎大虾碌",
    "price": 48.3,
    "image": "https://ucarecdn.com/d9b30666-0e8a-4190-84c4-54b87af7b8ea/",
    "category": "PRAWN",
    "portion": "",
    "description": "Authentic Kok Sen prawn specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 48.3
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 29,
    "sourceItemId": "8a818c30827059fd018271e4ed2c6275",
    "name": "Salted Egg Prawn Ball | 咸蛋黄虾球",
    "englishName": "Salted Egg Prawn Ball",
    "chineseName": "咸蛋黄虾球",
    "price": 30.3,
    "image": "https://ucarecdn.com/4eee6f36-63bf-42b2-93d6-dddc82b0c0d3/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$30.30 • Medium(中): S$45.60 • Large(大): S$60.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 30.3
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 45.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 60.6
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg"
    ]
  },
  {
    "id": 30,
    "sourceItemId": "8aa602999badb6dc019bb2eff81e6a0e",
    "name": "Spring Onion ( Medium Size )Prawn | 姜葱炒明虾",
    "englishName": "Spring Onion ( Medium Size )Prawn",
    "chineseName": "姜葱炒明虾",
    "price": 29,
    "image": "https://ucarecdn.com/28cc2416-f83a-4eb1-a3c2-fe9392371c4c/",
    "category": "PRAWN",
    "portion": "Small(小)",
    "description": "Small(小): S$29.00 • Medium(中): S$43.60 • Large(大): S$57.90",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 57.9
      }
    ],
    "allergens": [
      "Shellfish",
      "Gluten"
    ]
  },
  {
    "id": 31,
    "sourceItemId": "8a818ec27e8ae888017e8b86c18f4024",
    "name": "Stir Fried Frogs With Spring Onion | 姜葱炒田鸡",
    "englishName": "Stir Fried Frogs With Spring Onion",
    "chineseName": "姜葱炒田鸡",
    "price": 29.1,
    "image": "https://ucarecdn.com/bad55b76-1fdb-462f-8ef0-2f20160a3726/",
    "category": "FROGS",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 32,
    "sourceItemId": "8a818ec27e8ae888017e8b86c1994027",
    "name": "Deep Fried Frogs With Ginger | 姜片炸田鸡",
    "englishName": "Deep Fried Frogs With Ginger",
    "chineseName": "姜片炸田鸡",
    "price": 29.1,
    "image": "https://ucarecdn.com/6b5158e4-c948-44e0-8510-9c8c8f0076f6/",
    "category": "FROGS",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 33,
    "sourceItemId": "8a818ec27e8ae888017e8b86c1a3402a",
    "name": "Black Bean Stir Fried With Frogs | 豉汁炒田鸡",
    "englishName": "Black Bean Stir Fried With Frogs",
    "chineseName": "豉汁炒田鸡",
    "price": 29.1,
    "image": "",
    "category": "FROGS",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 34,
    "sourceItemId": "8a818ec27e8ae888017e8b86c1ad402d",
    "name": "‘Kung Pao’ Frogs With Fried With Dried Chilli | 宫宝田鸡",
    "englishName": "‘Kung Pao’ Frogs With Fried With Dried Chilli",
    "chineseName": "宫宝田鸡",
    "price": 29.1,
    "image": "https://ucarecdn.com/e5502007-f1cc-456a-a610-27677717cb27/",
    "category": "FROGS",
    "portion": "Small(小)",
    "description": "Small(小): S$29.10 • Medium(中): S$43.60 • Large(大): S$58.00",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 29.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 43.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 58
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 35,
    "sourceItemId": "8a8191e075943aac0175968194007d05",
    "name": "Sweet & Sour Pork | 咕酪肉",
    "englishName": "Sweet & Sour Pork",
    "chineseName": "咕酪肉",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/SweetSourPorkf92992.jpg",
    "category": "PORK",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.50",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.5
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 36,
    "sourceItemId": "8a8191bf75957f8f0175968264d101a4",
    "name": "Bittergourd Pork Ribs with Black Bean Sauce | 苦瓜豉汁闷排骨",
    "englishName": "Bittergourd Pork Ribs with Black Bean Sauce",
    "chineseName": "苦瓜豉汁闷排骨",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BittergourdPorkRibswithBlackBeanSauce58d7bc.jpg",
    "category": "PORK",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 37,
    "sourceItemId": "8a8195a675955ebc01759682ebe46d38",
    "name": "Sweet & Sour Pork Chop | 酸甜排骨王",
    "englishName": "Sweet & Sour Pork Chop",
    "chineseName": "酸甜排骨王",
    "price": 23.8,
    "image": "https://ucarecdn.com/cd1c95b1-fb8e-493f-89b8-ddd76e734478/",
    "category": "PORK",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 38,
    "sourceItemId": "8a818cec75957f0f0175968411f662f6",
    "name": "Kai Lan Stir Fried with Roasted Pork | 芥兰炒烧肉",
    "englishName": "Kai Lan Stir Fried with Roasted Pork",
    "chineseName": "芥兰炒烧肉",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/KaiLanStirFriedwithRoastedPork6ffbe3.jpg",
    "category": "PORK",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 39,
    "sourceItemId": "8a8191bf75957f8f0175968492160338",
    "name": "Salted Fish Steam Minced Pork | 咸鱼蒸肉碎",
    "englishName": "Salted Fish Steam Minced Pork",
    "chineseName": "咸鱼蒸肉碎",
    "price": 20,
    "image": "https://ucarecdn.com/c0e32736-51b6-49d4-be1c-c3aaa04d8125/",
    "category": "PORK",
    "portion": "Small(小）",
    "description": "Small(小）: S$20.00 • Medium(中）: S$30.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小）",
        "price": 20
      },
      {
        "size": "M",
        "label": "Medium(中）",
        "price": 30.6
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 40,
    "sourceItemId": "8a8195a675955ebc01759684f9d46e68",
    "name": "Fried Crispy Roast Pork with Black Sauce | 香爆烧肉",
    "englishName": "Fried Crispy Roast Pork with Black Sauce",
    "chineseName": "香爆烧肉",
    "price": 23.8,
    "image": "https://ucarecdn.com/3f008506-20b7-4dfa-8c4b-4acbd0bb65f5/-/preview/",
    "category": "PORK",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 41,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6a0430e",
    "name": "Deep Fried Fish Meat with Light Sauce | 炸鱼肉",
    "englishName": "Deep Fried Fish Meat with Light Sauce",
    "chineseName": "炸鱼肉",
    "price": 38.1,
    "image": "https://ucarecdn.com/4e40c3e4-6700-4b68-820f-8b1be25c590f/",
    "category": "FISH",
    "portion": "Small(小·)",
    "description": "Small(小·): S$38.10 • Medium(中): S$58.00 • Large(大): S$76.90",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小·)",
        "price": 38.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 58
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 76.9
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 42,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6ab4311",
    "name": "HK Style Steam Fish Tail | 港 / 潮式蒸鱼尾",
    "englishName": "HK Style Steam Fish Tail",
    "chineseName": "港 / 潮式蒸鱼尾",
    "price": 111.9,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/HKStyleSteamFishTail0e7b94.jpg",
    "category": "FISH",
    "portion": "",
    "description": "Authentic Kok Sen fish specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 111.9
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 43,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6de431f",
    "name": "Black Bean Sauce with Fish Head | 豉汁炒鱼头",
    "englishName": "Black Bean Sauce with Fish Head",
    "chineseName": "豉汁炒鱼头",
    "price": 19.9,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BlackBeanSaucewithFishHead8d5031.jpg",
    "category": "FISH",
    "portion": "Small(小)",
    "description": "Small(小): S$19.90 • Medium(中): S$30.60 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Fish",
      "Soy"
    ]
  },
  {
    "id": 44,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6e94324",
    "name": "Stir Fried Kai Lan with Sliced Fish | 芥兰炒鱼片",
    "englishName": "Stir Fried Kai Lan with Sliced Fish",
    "chineseName": "芥兰炒鱼片",
    "price": 19.9,
    "image": "https://ucarecdn.com/5cb26cb2-c786-435b-b162-8029a69f493e/",
    "category": "FISH",
    "portion": "Small(小)",
    "description": "Small(小): S$19.90 • Medium(中): S$30.60 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 45,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6f54329",
    "name": "Stir Fried Fish Meat with Sambal Kaffir Leaves | 甘香炒鱼肉",
    "englishName": "Stir Fried Fish Meat with Sambal Kaffir Leaves",
    "chineseName": "甘香炒鱼肉",
    "price": 26.5,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/StirFriedFishMeatwithSambalKaffirLeaves465189.jpg",
    "category": "FISH",
    "portion": "Small(小)",
    "description": "Small(小): S$26.50 • Medium(中): S$39.70 • Large(大): S$52.70",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 39.7
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 52.7
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 46,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6b74314",
    "name": "HK Style Steam Fish Head | 港/潮式蒸鱼头",
    "englishName": "HK Style Steam Fish Head",
    "chineseName": "港/潮式蒸鱼头",
    "price": 57.3,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/HKStyleSteamFishHead49db04.jpg",
    "category": "FISH",
    "portion": "",
    "description": "Authentic Kok Sen fish specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 57.3
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 47,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6c34317",
    "name": "Curry Fish Head | 咖喱鱼头",
    "englishName": "Curry Fish Head",
    "chineseName": "咖喱鱼头",
    "price": 57.3,
    "image": "https://ucarecdn.com/a4a4600e-b87b-4709-b83c-865dbf5e1bed/",
    "category": "FISH",
    "portion": "",
    "description": "Authentic Kok Sen fish specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 57.3
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 48,
    "sourceItemId": "8a81904d7e8adf08017e8b87e6d1431a",
    "name": "Curry Fish Tail | 咖喱鱼尾",
    "englishName": "Curry Fish Tail",
    "chineseName": "咖喱鱼尾",
    "price": 111.9,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/CurryFishTail779820.jpg",
    "category": "FISH",
    "portion": "",
    "description": "Authentic Kok Sen fish specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 111.9
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 49,
    "sourceItemId": "8a8193c97f68392e017f69c5ffca18b0",
    "name": "Black Bean Sauce with Fish Meat | 豉汁炒鱼鸡",
    "englishName": "Black Bean Sauce with Fish Meat",
    "chineseName": "豉汁炒鱼鸡",
    "price": 26.5,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BlackBeanSaucewithFishMeat7cc4df.jpg",
    "category": "FISH",
    "portion": "Small(小)",
    "description": "Small(小): S$26.50 • Medium(中): S$39.70 • Large(大): S$52.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 39.7
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 52.7
      }
    ],
    "allergens": [
      "Fish",
      "Soy"
    ]
  },
  {
    "id": 50,
    "sourceItemId": "8a818e8f811f749201811fc84f6118c9",
    "name": "Sweet & Sour Sliced Fish | 酸甜鱼片",
    "englishName": "Sweet & Sour Sliced Fish",
    "chineseName": "酸甜鱼片",
    "price": 19.9,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/SweetSourSlicedFish0045f7.jpg",
    "category": "FISH",
    "portion": "Small(小)",
    "description": "Small(小): S$19.90 • Medium(中): S$30.60 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 51,
    "sourceItemId": "8aa602999badb6dc019bb3111ddf5141",
    "name": "Stir-fry Spring Onion with Sliced Fish | 姜葱炒鱼片",
    "englishName": "Stir-fry Spring Onion with Sliced Fish",
    "chineseName": "姜葱炒鱼片",
    "price": 19.9,
    "image": "https://ucarecdn.com/86eeb9fc-809b-462a-95a0-86d0f17e1bde/",
    "category": "FISH",
    "portion": "Small (小)",
    "description": "Small (小): S$19.90 • Medium (中): S$30.60 • Large (大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium (中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Fish",
      "Gluten"
    ]
  },
  {
    "id": 52,
    "sourceItemId": "8aa600049d93a5cc019d94cdfcc37892",
    "name": "Deep Fried \"Yu Gai\"| 香脆炸鱼鸡",
    "englishName": "Deep Fried \"Yu Gai\"",
    "chineseName": "香脆炸鱼鸡",
    "price": 26.5,
    "image": "https://ucarecdn.com/2f4ef959-ca9e-4daa-96bd-38438ecded85/",
    "category": "FISH",
    "portion": "Small(小）",
    "description": "Small(小）: S$26.50 • Medium(中）: S$39.70 • Large(大）: S$52.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小）",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium(中）",
        "price": 39.7
      },
      {
        "size": "L",
        "label": "Large(大）",
        "price": 52.7
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 53,
    "sourceItemId": "8a81904d7e8adf08017e8b88f8aa43ee",
    "name": "Kai Lan Stir Fried with Beef | 芥兰炒牛肉",
    "englishName": "Kai Lan Stir Fried with Beef",
    "chineseName": "芥兰炒牛肉",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/KaiLanStirFriedwithBeefc23c11.jpg",
    "category": "BEEF",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 54,
    "sourceItemId": "8a81904d7e8adf08017e8b88f87e43e9",
    "name": "Black Bean Stir Fried with Beef | 豉汁炒牛肉",
    "englishName": "Black Bean Stir Fried with Beef",
    "chineseName": "豉汁炒牛肉",
    "price": 23.8,
    "image": "",
    "category": "BEEF",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 55,
    "sourceItemId": "8a81904d7e8adf08017e8b88f82543e4",
    "name": "Black Pepper Beef | 黑椒炒牛肉",
    "englishName": "Black Pepper Beef",
    "chineseName": "黑椒炒牛肉",
    "price": 23.8,
    "image": "https://ucarecdn.com/0fc8d9e9-d8a8-4c9e-a914-57c347c7a873/",
    "category": "BEEF",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 56,
    "sourceItemId": "8a81904d7e8adf08017e8b88f8e243f3",
    "name": "Stir Fried Beef with Spring Onion | 姜葱炒牛肉",
    "englishName": "Stir Fried Beef with Spring Onion",
    "chineseName": "姜葱炒牛肉",
    "price": 23.8,
    "image": "https://ucarecdn.com/9844d195-87a8-4b53-ae4f-d86ec1aee2d1/",
    "category": "BEEF",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中): S$35.80 • Large(大): S$47.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.6
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 57,
    "sourceItemId": "8a8191bf75957f8f01759672dd807519",
    "name": "Prawn Paste Chicken | 虾酱鸡",
    "englishName": "Prawn Paste Chicken",
    "chineseName": "虾酱鸡",
    "price": 20,
    "image": "https://ucarecdn.com/d5709a32-eb33-4e52-8579-0f611d0dd94a/",
    "category": "CHICKEN",
    "portion": "Small(小)",
    "description": "Small(小): S$20.00 • Medium(中): S$29.90 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 20
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 29.9
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 58,
    "sourceItemId": "8a818ecb75957f150175967371005a20",
    "name": "Claypot Thai Style Chicken | 甘香鸡",
    "englishName": "Claypot Thai Style Chicken",
    "chineseName": "甘香鸡",
    "price": 20,
    "image": "https://ucarecdn.com/b1b4fd30-06e7-42c4-b3ee-8213479357fc/",
    "category": "CHICKEN",
    "portion": "Small(小)",
    "description": "Small(小): S$20.00 • Medium(中): S$29.90 • Large(大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 20
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 29.9
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 59,
    "sourceItemId": "8a8191e075943aac01759673ff247361",
    "name": "Golden Dragon Chicken | 脆皮金龙鸡",
    "englishName": "Golden Dragon Chicken",
    "chineseName": "脆皮金龙鸡",
    "price": 46.4,
    "image": "https://ucarecdn.com/d985976a-5134-4f8b-bcfc-22a2055a0bfe/",
    "category": "CHICKEN",
    "portion": "",
    "description": "Authentic Kok Sen chicken specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 46.4
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 60,
    "sourceItemId": "8a818ecb75957f150175967470e75aa9",
    "name": "Crispy Roasted Chicken | 脆皮烧鸡",
    "englishName": "Crispy Roasted Chicken",
    "chineseName": "脆皮烧鸡",
    "price": 31.6,
    "image": "https://ucarecdn.com/9641d9fe-6966-4cca-8c3c-b4de212e4754/",
    "category": "CHICKEN",
    "portion": "Half(半只)",
    "description": "Half(半只): S$31.60 • One Whole(一只): S$63.20",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Half(半只)",
        "price": 31.6
      },
      {
        "size": "M",
        "label": "One Whole(一只)",
        "price": 63.2
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 61,
    "sourceItemId": "8aa602999badb6dc019bb307807135cd",
    "name": "Cereal Chicken | 麦片鸡丁",
    "englishName": "Cereal Chicken",
    "chineseName": "麦片鸡丁",
    "price": 19.9,
    "image": "",
    "category": "CHICKEN",
    "portion": "Small (小)",
    "description": "Small (小): S$19.90 • Medium (中): S$30.60 • Large (大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium (中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 62,
    "sourceItemId": "8aa602449badb70c019bb30a77fd10a5",
    "name": "Kung Bao Chicken | 宫保鸡丁",
    "englishName": "Kung Bao Chicken",
    "chineseName": "宫保鸡丁",
    "price": 19.9,
    "image": "https://ucarecdn.com/06a0300d-e8d2-4ef2-b2df-54b7ac11f808/",
    "category": "CHICKEN",
    "portion": "Small (小)",
    "description": "Small (小): S$19.90 • Medium (中): S$30.60 • Large (大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium (中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 63,
    "sourceItemId": "8aa602449badb70c019bb30b95ae13da",
    "name": "Sweet & Sour Chicken | 咕噜鸡丁",
    "englishName": "Sweet & Sour Chicken",
    "chineseName": "咕噜鸡丁",
    "price": 19.9,
    "image": "",
    "category": "CHICKEN",
    "portion": "Small (小)",
    "description": "Small (小): S$19.90 • Medium (中): S$30.60 • Large (大): S$39.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小)",
        "price": 19.9
      },
      {
        "size": "M",
        "label": "Medium (中)",
        "price": 30.6
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 39.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 64,
    "sourceItemId": "8a8195a675955ebc0175965c6a5c5778",
    "name": "Sweet & Sour Pork Rice | 酸甜咕酪肉饭",
    "englishName": "Sweet & Sour Pork Rice",
    "chineseName": "酸甜咕酪肉饭",
    "price": 10.8,
    "image": "https://ucarecdn.com/1e5ef048-fade-4b10-9361-93bca6420023/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 10.8
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 65,
    "sourceItemId": "8a8191e075943aac0175965ca25a61de",
    "name": "Roasted Pork Tofu Rice | 烧肉豆腐饭",
    "englishName": "Roasted Pork Tofu Rice",
    "chineseName": "烧肉豆腐饭",
    "price": 12.2,
    "image": "https://ucarecdn.com/c50d367a-bb71-45f8-ac9b-9f16cb01395f/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.2
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 66,
    "sourceItemId": "8a8191bf75957f8f0175965cd95a64e4",
    "name": "Thai Style Fried Rice | 泰式炒饭",
    "englishName": "Thai Style Fried Rice",
    "chineseName": "泰式炒饭",
    "price": 12.2,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/ThaiStyleFriedRice92d71d.jpg",
    "category": "RICE",
    "portion": "Small(小)",
    "description": "Small(小): S$12.20 • Medium(中): S$24.20 • Large(大): S$36.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 36.5
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 67,
    "sourceItemId": "8a8191e075943aac0175965d3c0f624a",
    "name": "Kai Lan Roasted Pork Rice | 芥兰烧肉饭",
    "englishName": "Kai Lan Roasted Pork Rice",
    "chineseName": "芥兰烧肉饭",
    "price": 12.8,
    "image": "https://ucarecdn.com/cec740f2-2b72-448a-b5dd-4a959fefddee/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.8
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 68,
    "sourceItemId": "8a8191e075943aac0175965d81bc6271",
    "name": "'Yang Zhuo’ Fried Rice | 杨州炒饭",
    "englishName": "'Yang Zhuo’ Fried Rice",
    "chineseName": "杨州炒饭",
    "price": 10.2,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/YangZhuoFriedRice330dd5.jpg",
    "category": "RICE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.20 • Medium(中): S$20.00 • Large(大): S$30.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 69,
    "sourceItemId": "8a8193cd75b465310175b645d3006ede",
    "name": "'Salted Fish’ Fried Rice | 咸鱼炒饭",
    "englishName": "'Salted Fish’ Fried Rice",
    "chineseName": "咸鱼炒饭",
    "price": 10.8,
    "image": "https://ucarecdn.com/64524cce-2653-48d8-b633-44ee4a6908df/",
    "category": "RICE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.80 • Medium(中): S$21.50 • Large(大): S$33.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 21.5
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 33
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 70,
    "sourceItemId": "8a818cec75957f0f0175965e38cb4de5",
    "name": "Kai Lan Sliced Fish/Beef Rice | 芥兰鱼片/牛肉饭",
    "englishName": "Kai Lan Sliced Fish/Beef Rice",
    "chineseName": "芥兰鱼片/牛肉饭",
    "price": 12.2,
    "image": "https://ucarecdn.com/e34e4fc8-5b4c-4f1c-bb3e-623dbc74c649/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.2
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 71,
    "sourceItemId": "8a8191bf75957f8f0175966057bb6741",
    "name": "Seafoods & Pork Braised Rice | 什锦滑蛋绘饭",
    "englishName": "Seafoods & Pork Braised Rice",
    "chineseName": "什锦滑蛋绘饭",
    "price": 10.2,
    "image": "https://ucarecdn.com/44a71aeb-5bf5-4a57-8a62-57fe44d1ddc5/",
    "category": "RICE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.20 • Medium(中): S$20.30 • Large(大): S$30.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.3
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.7
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 72,
    "sourceItemId": "8a818ecb75957f1501759660cc164f89",
    "name": "Seafoods Fried Rice | 海鲜炒饭",
    "englishName": "Seafoods Fried Rice",
    "chineseName": "海鲜炒饭",
    "price": 10.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/SeafoodsFriedRicecba8aa.jpg",
    "category": "RICE",
    "portion": "Small",
    "description": "Small: S$10.80 • Medium(中): S$21.50 • Large(大): S$32.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small",
        "price": 10.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 21.5
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 32.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 73,
    "sourceItemId": "8a818ecb75957f15017596615fba4fd0",
    "name": "Black Bean Sliced Fish Rice | 豉汁鱼片饭",
    "englishName": "Black Bean Sliced Fish Rice",
    "chineseName": "豉汁鱼片饭",
    "price": 12.2,
    "image": "https://ucarecdn.com/eef4976b-16c5-408f-82b8-09e32fdac516/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.2
      }
    ],
    "allergens": [
      "Fish",
      "Soy"
    ]
  },
  {
    "id": 74,
    "sourceItemId": "8a818ecb75957f15017596619c795012",
    "name": "Seafoods & Pork Soup Rice | 上汤什锦饭",
    "englishName": "Seafoods & Pork Soup Rice",
    "chineseName": "上汤什锦饭",
    "price": 12.2,
    "image": "https://ucarecdn.com/06ee20bc-2196-4ebc-92ed-3851b13bdb61/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.2
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 75,
    "sourceItemId": "8a8195a675955ebc01759661d0d15a70",
    "name": "Beef Fried Rice | 牛肉炒饭",
    "englishName": "Beef Fried Rice",
    "chineseName": "牛肉炒饭",
    "price": 12.2,
    "image": "https://ucarecdn.com/12eb2df2-41f3-443d-92e0-d8bbfbe1c11b/",
    "category": "RICE",
    "portion": "Small(小)",
    "description": "Small(小): S$12.20 • Medium(中): S$24.20 • Large(大): S$36.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 36.5
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 76,
    "sourceItemId": "8a8191ed80f150550180f213ff522e1b",
    "name": "Black Bean Sauce Roasted Pork Rice | 香爆烧肉饭",
    "englishName": "Black Bean Sauce Roasted Pork Rice",
    "chineseName": "香爆烧肉饭",
    "price": 12.2,
    "image": "https://ucarecdn.com/eaad0a1f-19fa-4722-9cae-6bf2db23493b/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.2
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 77,
    "sourceItemId": "8aa602079badb3f4019bb16962e03438",
    "name": "Spring Onion Sliced Beef Rice | 姜葱牛肉饭",
    "englishName": "Spring Onion Sliced Beef Rice",
    "chineseName": "姜葱牛肉饭",
    "price": 12.09,
    "image": "https://ucarecdn.com/5e91ea4e-d23f-4cdc-9057-50851f592acd/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.09
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 78,
    "sourceItemId": "8aa602079badb3f4019bb169b13234d6",
    "name": "Spring Onion Sliced Fish Rice | 姜葱鱼片饭",
    "englishName": "Spring Onion Sliced Fish Rice",
    "chineseName": "姜葱鱼片饭",
    "price": 12.09,
    "image": "https://ucarecdn.com/c7d34324-fe95-448d-b42a-8035b7973c97/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 12.09
      }
    ],
    "allergens": [
      "Fish",
      "Gluten"
    ]
  },
  {
    "id": 79,
    "sourceItemId": "8aa602079badb3f4019bb16ab80d3697",
    "name": "Spring Onion Sliced Pork Rice | 姜葱猪肉饭",
    "englishName": "Spring Onion Sliced Pork Rice",
    "chineseName": "姜葱猪肉饭",
    "price": 11.44,
    "image": "https://ucarecdn.com/3645f4e3-a645-4564-98ee-4e899f892078/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 11.44
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 80,
    "sourceItemId": "8a818c6376b492600176ba36308d1f0e",
    "name": "Rice/白米饭",
    "englishName": "Rice",
    "chineseName": "白米饭",
    "price": 2,
    "image": "https://ucarecdn.com/3e730c75-90a8-49f5-ad78-8f0be36ad85f/",
    "category": "RICE",
    "portion": "",
    "description": "Authentic Kok Sen rice specialty prepared with traditional Cantonese high-heat wok craft.",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "",
        "price": 2
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 81,
    "sourceItemId": "8a818ef27e8ae90f017e8b8addeb426d",
    "name": "Big Prawns Hor Fun | 大虾滑蛋河粉",
    "englishName": "Big Prawns Hor Fun",
    "chineseName": "大虾滑蛋河粉",
    "price": 26.5,
    "image": "https://ucarecdn.com/9a0263ba-c404-4e16-9348-23d7859c3842/",
    "category": "NOODLE",
    "portion": "Small ( 小）",
    "description": "Small ( 小）: S$26.50 • Medium (中）: S$52.70 • Large ( 大）: S$79.40",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small ( 小）",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium (中）",
        "price": 52.7
      },
      {
        "size": "L",
        "label": "Large ( 大）",
        "price": 79.4
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg",
      "Gluten"
    ]
  },
  {
    "id": 82,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade4f4299",
    "name": "Big Prawns Crispy Noodle | 大虾滑蛋生面",
    "englishName": "Big Prawns Crispy Noodle",
    "chineseName": "大虾滑蛋生面",
    "price": 26.5,
    "image": "https://ucarecdn.com/f34de575-832a-45be-b13a-ac079445c60a/",
    "category": "NOODLE",
    "portion": "Small (小）",
    "description": "Small (小）: S$26.50 • Medium ( 中）: S$52.70 • Large (大）: S$79.40",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小）",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium ( 中）",
        "price": 52.7
      },
      {
        "size": "L",
        "label": "Large (大）",
        "price": 79.4
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg",
      "Gluten"
    ]
  },
  {
    "id": 83,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade12427c",
    "name": "Big Prawns Bee Hoon Soup | 大虾粗米粉汤",
    "englishName": "Big Prawns Bee Hoon Soup",
    "chineseName": "大虾粗米粉汤",
    "price": 26.5,
    "image": "https://ucarecdn.com/119e29f0-48f0-4069-b199-1dff8325d009/",
    "category": "NOODLE",
    "portion": "Small (小）",
    "description": "Small (小）: S$26.50 • Medium ( 中）: S$52.70 • Large (大）: S$79.40",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小）",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium ( 中）",
        "price": 52.7
      },
      {
        "size": "L",
        "label": "Large (大）",
        "price": 79.4
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 84,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade5b429d",
    "name": "Black Bean Fish Meat Braised Bee Hoon/Hor Fun | 豉汁鱼鸡闷米粉/河粉-",
    "englishName": "Black Bean Fish Meat Braised Bee Hoon/Hor Fun",
    "chineseName": "豉汁鱼鸡闷米粉/河粉-",
    "price": 26.7,
    "image": "https://ucarecdn.com/3f0ec630-dfb6-4857-b515-ac2e5add5621/",
    "category": "NOODLE",
    "portion": "Medium(中)",
    "description": "Medium(中): S$26.70 • Large(大): S$40.30",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 26.7
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 40.3
      }
    ],
    "allergens": [
      "Fish",
      "Soy",
      "Gluten"
    ]
  },
  {
    "id": 85,
    "sourceItemId": "8a818ef27e8ae90f017e8b8addf74272",
    "name": "Crispy Noodle Surface With Shrimp Omelette | 黄布虾球生面",
    "englishName": "Crispy Noodle Surface With Shrimp Omelette",
    "chineseName": "黄布虾球生面",
    "price": 18.6,
    "image": "https://ucarecdn.com/0e60a8c7-e703-465e-b0e3-e7c3ea016c85/",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$18.60 • Medium(中): S$37.00 • Large(大): S$56.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 18.6
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 37
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 56
      }
    ],
    "allergens": [
      "Shellfish",
      "Gluten"
    ]
  },
  {
    "id": 86,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade054277",
    "name": "Sliced Fish Hor Fun With Bean Sprout | 生捞河粉",
    "englishName": "Sliced Fish Hor Fun With Bean Sprout",
    "chineseName": "生捞河粉",
    "price": 11.2,
    "image": "https://ucarecdn.com/92d9f541-3833-452f-b38d-bfab3bb7c469/",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$11.20 • Medium(中): S$22.80 • Large(大): S$34.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 11.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 22.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 34.5
      }
    ],
    "allergens": [
      "Fish",
      "Soy",
      "Gluten"
    ]
  },
  {
    "id": 87,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade414294",
    "name": "Black Bean/Dry Beef Hor Fun | 豉汁/干炒牛肉河",
    "englishName": "Black Bean/Dry Beef Hor Fun",
    "chineseName": "豉汁/干炒牛肉河",
    "price": 12.1,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BlackBeanDryBeefHorFunbe3c97.jpg",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$12.10 • Medium(中): S$24.10 • Large(大): S$36.40",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24.1
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 36.4
      }
    ],
    "allergens": [
      "Soy",
      "Gluten"
    ]
  },
  {
    "id": 88,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade1d4282",
    "name": "Seafood & Pork Hor Fun / Bee Hoon | 滑蛋 什锦河粉 /米粉",
    "englishName": "Seafood & Pork Hor Fun / Bee Hoon",
    "chineseName": "滑蛋 什锦河粉 /米粉",
    "price": 10.2,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/SeafoodPorkHorFunBeeHoon520cf2.jpg",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.20 • Medium(中): S$20.20 • Large(大): S$30.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.6
      }
    ],
    "allergens": [
      "Egg",
      "Gluten"
    ]
  },
  {
    "id": 89,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade284288",
    "name": "Fish Meat Bee Hoon Soup | 鱼鸡粗米粉汤",
    "englishName": "Fish Meat Bee Hoon Soup",
    "chineseName": "鱼鸡粗米粉汤",
    "price": 13.4,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/FishMeatBeeHoonSoupe5dd06.jpg",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$27.30 • Large(大): S$40.30",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 27.3
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 40.3
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 90,
    "sourceItemId": "8a818ef27e8ae90f017e8b8ade35428e",
    "name": "Stir Fried Dry Bee Hoon/ HK Noodle | 新州米粉 /香港面",
    "englishName": "Stir Fried Dry Bee Hoon/ HK Noodle",
    "chineseName": "新州米粉 /香港面",
    "price": 10.2,
    "image": "https://ucarecdn.com/54c74a9a-d35f-4688-b4c8-de5780c0d485/",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.20 • Medium(中): S$20.20 • Large(大): S$30.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.6
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 91,
    "sourceItemId": "8a8190d67f9012a2017f917b9b831cf1",
    "name": "Fish Head/Sliced Fish Bee Hoon Soup | 鱼头/鱼片粗米粉汤",
    "englishName": "Fish Head/Sliced Fish Bee Hoon Soup",
    "chineseName": "鱼头/鱼片粗米粉汤",
    "price": 10.8,
    "image": "https://ucarecdn.com/73a46c50-ef7a-41eb-9b0c-d082d9d3c19e/",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.80 • Medium(中): S$22.10 • Large(大): S$32.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 22.1
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 32.5
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 92,
    "sourceItemId": "8a818f5580fd9048018100a9412e4a32",
    "name": "Black Bean Sliced Fish Bee Hoon/Hor Fun | 鼓汁鱼片米粉/河粉",
    "englishName": "Black Bean Sliced Fish Bee Hoon/Hor Fun",
    "chineseName": "鼓汁鱼片米粉/河粉",
    "price": 11.5,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BlackBeanSlicedFishHorFunb7fc4d.jpg",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$11.50 • Medium(中): S$22.80 • Large(大): S$33.20",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 11.5
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 22.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 33.2
      }
    ],
    "allergens": [
      "Fish",
      "Soy",
      "Gluten"
    ]
  },
  {
    "id": 93,
    "sourceItemId": "8a818fef812be98e01812f208ff43be0",
    "name": "Seafood & Pork Crispy Noodle |滑蛋 什锦生面",
    "englishName": "Seafood & Pork Crispy Noodle",
    "chineseName": "滑蛋 什锦生面",
    "price": 10.8,
    "image": "https://ucarecdn.com/410a6eb0-8feb-4a48-8cc2-a0629c5159c7/",
    "category": "NOODLE",
    "portion": "Small(小)",
    "description": "Small(小): S$10.80 • Medium(中): S$21.50 • Large(大): S$32.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 21.5
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 32.5
      }
    ],
    "allergens": [
      "Egg",
      "Gluten"
    ]
  },
  {
    "id": 94,
    "sourceItemId": "8aa602449badb70c019bb15e571a1a32",
    "name": "Moonlight Hor Fun | 月光河粉",
    "englishName": "Moonlight Hor Fun",
    "chineseName": "月光河粉",
    "price": 11.44,
    "image": "https://ucarecdn.com/da2e980d-1904-4294-b028-6dcef5729dc3/",
    "category": "NOODLE",
    "portion": "Small (小)",
    "description": "Small (小): S$11.44 • Medium (中): S$22.75 • Large (大): S$34.45",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小)",
        "price": 11.44
      },
      {
        "size": "M",
        "label": "Medium (中)",
        "price": 22.75
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 34.45
      }
    ],
    "allergens": [
      "Gluten"
    ]
  },
  {
    "id": 95,
    "sourceItemId": "8aa602c79bb4adb4019bb52bd98a49b3",
    "name": "Black Bean Assorted Seafood & Pork Bee Hoon/Hor Fun | 豉汁什锦米粉/河粉",
    "englishName": "Black Bean Assorted Seafood & Pork Bee Hoon/Hor Fun",
    "chineseName": "豉汁什锦米粉/河粉",
    "price": 10.2,
    "image": "https://ucarecdn.com/373af7d7-b07e-4bca-9a18-d7c89e07e0cb/",
    "category": "NOODLE",
    "portion": "Small (小)",
    "description": "Small (小): S$10.20 • Medium (中): S$20.20 • Large (大): S$30.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium (中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large (大)",
        "price": 30.6
      }
    ],
    "allergens": [
      "Soy",
      "Gluten"
    ]
  },
  {
    "id": 96,
    "sourceItemId": "8a818cec75957f0f0175965339b84778",
    "name": "Bittergourd Soup With Seafoods & Pork | 什锦凉瓜汤",
    "englishName": "Bittergourd Soup With Seafoods & Pork",
    "chineseName": "什锦凉瓜汤",
    "price": 10.3,
    "image": "https://ucarecdn.com/bdd8e959-071e-4ebc-99c4-b7cf3a91e253/",
    "category": "SOUP",
    "portion": "Small(小)",
    "description": "Small(小): S$10.30 • Medium(中): S$20.90 • Large(大): S$30.70",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.3
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.9
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 97,
    "sourceItemId": "8a818d1b7f697370017f69e6a05f25fc",
    "name": "Fish Meat Soup | 鱼鸡汤",
    "englishName": "Fish Meat Soup",
    "chineseName": "鱼鸡汤",
    "price": 13.4,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/FishMeatSoupf39820.jpg",
    "category": "SOUP",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$27.30 • Large(大): S$40.30",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 27.3
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 40.3
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 98,
    "sourceItemId": "8a8191bf75957f8f017596541c915e62",
    "name": "Sliced Fish/Fish Head Soup | 鱼片/鱼头汤",
    "englishName": "Sliced Fish/Fish Head Soup",
    "chineseName": "鱼片/鱼头汤",
    "price": 10.8,
    "image": "https://ucarecdn.com/0af1da77-be52-48c0-a0c6-473252052d77/-/preview/",
    "category": "SOUP",
    "portion": "Small(小)",
    "description": "Small(小): S$10.80 • Medium(中): S$22.10 • Large(大): S$32.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.8
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 22.1
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 32.5
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 99,
    "sourceItemId": "8a818ecb75957f1501759655f0e34953",
    "name": "Salted Vegetable Tofu Soup | 什锦咸菜豆腐汤",
    "englishName": "Salted Vegetable Tofu Soup",
    "chineseName": "什锦咸菜豆腐汤",
    "price": 10.2,
    "image": "https://ucarecdn.com/84806e8a-f626-436d-bfac-e6309f9ce637/",
    "category": "SOUP",
    "portion": "Small(小)",
    "description": "Small(小): S$10.20 • Medium(中): S$20.80 • Large(大): S$30.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.6
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 100,
    "sourceItemId": "8a8191e075943aac0175965672485d3b",
    "name": "Big Prawns Soup | 大虾汤",
    "englishName": "Big Prawns Soup",
    "chineseName": "大虾汤",
    "price": 26.5,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BigPrawnsSoup53a82a.jpg",
    "category": "SOUP",
    "portion": "Small (小）",
    "description": "Small (小）: S$26.50 • Medium (中）: S$52.70 • Large (大）: S$79.40",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small (小）",
        "price": 26.5
      },
      {
        "size": "M",
        "label": "Medium (中）",
        "price": 52.7
      },
      {
        "size": "L",
        "label": "Large (大）",
        "price": 79.4
      }
    ],
    "allergens": [
      "Shellfish"
    ]
  },
  {
    "id": 101,
    "sourceItemId": "8a8191ed80f150550180f1e1991b2205",
    "name": "Spinach Soup | 苋菜汤",
    "englishName": "Spinach Soup",
    "chineseName": "苋菜汤",
    "price": 10.2,
    "image": "https://ucarecdn.com/2bdaf5ae-3032-4e66-aa88-b741c92c32c6/",
    "category": "SOUP",
    "portion": "Small(小)",
    "description": "Small(小): S$10.20 • Medium(中): S$20.80 • Large(大): S$30.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 10.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 30.6
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 102,
    "sourceItemId": "8aa602c59e7116f7019e723ce4882d1f",
    "name": "Fish Maw Soup | 鱼鳔羹",
    "englishName": "Fish Maw Soup",
    "chineseName": "鱼鳔羹",
    "price": 89.7,
    "image": "https://ucarecdn.com/88e2d587-c891-4ac9-8b1a-51f24ca9464e/",
    "category": "SOUP",
    "portion": "Medium (中）",
    "description": "Medium (中）: S$89.70 • Large (大）: S$115.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "M",
        "label": "Medium (中）",
        "price": 89.7
      },
      {
        "size": "L",
        "label": "Large (大）",
        "price": 115.7
      }
    ],
    "allergens": [
      "Fish"
    ]
  },
  {
    "id": 103,
    "sourceItemId": "8a81904d7e8adf08017e8b8c232d45ed",
    "name": "Claypot Yong Tau Foo | 巧手三宝煲",
    "englishName": "Claypot Yong Tau Foo",
    "chineseName": "巧手三宝煲",
    "price": 23.8,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/ClaypotYongTauFoo47e8cd.jpg",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$23.80 • Medium(中）: S$35.80 • Large(大): S$47.50",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 23.8
      },
      {
        "size": "M",
        "label": "Medium(中）",
        "price": 35.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 47.5
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 104,
    "sourceItemId": "8a81904d7e8adf08017e8b8c231945e3",
    "name": "Homemade Tofu with Minced Pork | 家乡豆腐",
    "englishName": "Homemade Tofu with Minced Pork",
    "chineseName": "家乡豆腐",
    "price": 16.1,
    "image": "https://ucarecdn.com/43356430-e76a-4966-a427-71c6a80f131c/",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$16.10 • Large(大): S$31.90",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 16.1
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 31.9
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 105,
    "sourceItemId": "8a81904d7e8adf08017e8b8c22f845d7",
    "name": "Braised Tofu with Roast Pork | 红烧豆腐",
    "englishName": "Braised Tofu with Roast Pork",
    "chineseName": "红烧豆腐",
    "price": 16.1,
    "image": "https://ucarecdn.com/365e48fb-b05a-47e3-a6b7-2bf5f9071e77/",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$16.10 • Medium(中): S$24.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 16.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 106,
    "sourceItemId": "8a81904d7e8adf08017e8b8c232345e8",
    "name": "Prawns Balls Braised Tofu | 虾球豆腐",
    "englishName": "Prawns Balls Braised Tofu",
    "chineseName": "虾球豆腐",
    "price": 25.2,
    "image": "",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$25.20 • Medium(中): S$37.80 • Large(大): S$50.20",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 25.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 37.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 50.2
      }
    ],
    "allergens": [
      "Shellfish",
      "Soy"
    ]
  },
  {
    "id": 107,
    "sourceItemId": "8a81904d7e8adf08017e8b8c230245db",
    "name": "Braised Tofu with Sea Cucumber | 豆腐海参煲",
    "englishName": "Braised Tofu with Sea Cucumber",
    "chineseName": "豆腐海参煲",
    "price": 42,
    "image": "",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$42.00 • Large(大): S$84.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 42
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 84
      }
    ],
    "allergens": [
      "Shellfish",
      "Soy"
    ]
  },
  {
    "id": 108,
    "sourceItemId": "8a81904d7e8adf08017e8b8c230f45df",
    "name": "Hotplate Tofu | 铁板豆腐",
    "englishName": "Hotplate Tofu",
    "chineseName": "铁板豆腐",
    "price": 16.1,
    "image": "https://ucarecdn.com/15e2335e-2cf8-4b7a-a408-be0f4bffc7e2/",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$16.10 • Medium(中): S$24.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 16.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 109,
    "sourceItemId": "8a818fca8118b24701811a7b646a160f",
    "name": "Golden Beancurds | 黄金豆腐",
    "englishName": "Golden Beancurds",
    "chineseName": "黄金豆腐",
    "price": 14.9,
    "image": "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/GoldenBeancurds198556.jpg",
    "category": "TOFU",
    "portion": "Small(小)",
    "description": "Small(小): S$14.90 • Large(大): S$29.30",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 14.9
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 29.3
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 110,
    "sourceItemId": "8a818cec75957f0f0175964792554014",
    "name": "Fu Rong Omelette | 芙蓉煎蛋",
    "englishName": "Fu Rong Omelette",
    "chineseName": "芙蓉煎蛋",
    "price": 12.2,
    "image": "https://ucarecdn.com/b91c1ce7-1c3a-439c-ab7b-25d69ccad47e/",
    "category": "EGGS",
    "portion": "Small(小)",
    "description": "Small(小): S$12.20 • Medium(中): S$17.60",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.2
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 17.6
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 111,
    "sourceItemId": "8a8191e075943aac01759648bda25205",
    "name": "Prawns Omelette | 虾仁煎蛋",
    "englishName": "Prawns Omelette",
    "chineseName": "虾仁煎蛋",
    "price": 16,
    "image": "https://ucarecdn.com/b5a57347-e1a9-422d-ad6e-fad331cb2c23/",
    "category": "EGGS",
    "portion": "Small(小)",
    "description": "Small(小): S$16.00 • Medium(中): S$24.10",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 16
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24.1
      }
    ],
    "allergens": [
      "Shellfish",
      "Egg"
    ]
  },
  {
    "id": 112,
    "sourceItemId": "8a8191bf75957f8f017596492fc0558e",
    "name": "Minced Pork Omelette | 肉碎煎蛋",
    "englishName": "Minced Pork Omelette",
    "chineseName": "肉碎煎蛋",
    "price": 12.1,
    "image": "https://ucarecdn.com/111addfa-fcea-4a32-a89b-2955b930f428/",
    "category": "EGGS",
    "portion": "Small(小)",
    "description": "Small(小): S$12.10 • Medium(中): S$17.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 17.6
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 113,
    "sourceItemId": "8a818ecb75957f15017596498bbf4229",
    "name": "Combination Of 3 Steam Eggs | 三王蒸蛋",
    "englishName": "Combination Of 3 Steam Eggs",
    "chineseName": "三王蒸蛋",
    "price": 12.1,
    "image": "https://ucarecdn.com/4e9e5645-13f8-4564-a66b-e05f4b8c539c/",
    "category": "EGGS",
    "portion": "Small(小)",
    "description": "Small(小): S$12.10 • Medium(中): S$17.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 17.6
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 114,
    "sourceItemId": "8a8192b77932a888017933623f404a04",
    "name": "Minced Pork Steam Eggs | 蒸肉碎蛋",
    "englishName": "Minced Pork Steam Eggs",
    "chineseName": "蒸肉碎蛋",
    "price": 12.1,
    "image": "https://ucarecdn.com/ba7cd454-0ef0-4a7d-8728-7fcc07d50594/",
    "category": "EGGS",
    "portion": "Small(小)",
    "description": "Small(小): S$12.10 • Medium(中): S$17.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 17.6
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 115,
    "sourceItemId": "8a8197ae82767d96018276ec7b1f3e5c",
    "name": "Preserved Radish Omelette | 菜脯蛋",
    "englishName": "Preserved Radish Omelette",
    "chineseName": "菜脯蛋",
    "price": 12.1,
    "image": "https://ucarecdn.com/98e382f8-97b1-4751-b480-56c7be093569/",
    "category": "EGGS",
    "portion": "Small(小)",
    "description": "Small(小): S$12.10 • Medium(中): S$17.60",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 12.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 17.6
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 116,
    "sourceItemId": "8a818cec75957f0f0175964c871d4418",
    "name": "Stir Fried Kai Lan With Garlic | 蒜茸炒芥兰",
    "englishName": "Stir Fried Kai Lan With Garlic",
    "chineseName": "蒜茸炒芥兰",
    "price": 13.4,
    "image": "https://ucarecdn.com/6dbef44e-a954-4170-a8fc-075ad66788e0/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$20.30 • Large(大): S$26.80",
    "isSpicy": false,
    "isPopular": true,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.3
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 26.8
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 117,
    "sourceItemId": "8a8191e075943aac0175964cf84b55bb",
    "name": "Boiled Chinese Lettuce With Light Sauces | 白灼生菜",
    "englishName": "Boiled Chinese Lettuce With Light Sauces",
    "chineseName": "白灼生菜",
    "price": 13.4,
    "image": "",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$20.20 • Large(大): S$26.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 26.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 118,
    "sourceItemId": "8a8191e075943aac0175964e73dd570e",
    "name": "Romaine Lettuce Stir Fried Fermented Beancurd | 腐乳炒麦菜",
    "englishName": "Romaine Lettuce Stir Fried Fermented Beancurd",
    "chineseName": "腐乳炒麦菜",
    "price": 13.4,
    "image": "https://ucarecdn.com/9e5e5561-6866-4ec5-b495-7cfff32e7ac9/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$20.20 • Large(大): S$26.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 26.7
      }
    ],
    "allergens": [
      "Soy"
    ]
  },
  {
    "id": 119,
    "sourceItemId": "8a818cec75957f0f0175964f28f6454d",
    "name": "Stir Fried Broccoli With Oyster Sauce | 西兰花炒蚝油",
    "englishName": "Stir Fried Broccoli With Oyster Sauce",
    "chineseName": "西兰花炒蚝油",
    "price": 14.7,
    "image": "https://ucarecdn.com/063040fb-454f-46a0-bdb1-7810310ed27c/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$14.70 • Medium(中): S$22.80 • Large(大): S$29.10",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 14.7
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 22.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 29.1
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 120,
    "sourceItemId": "8a8191e075943aac0175964f98ac57e6",
    "name": "Bean Sprout Stir Fried With Salted Fish | 银芽炒咸鱼",
    "englishName": "Bean Sprout Stir Fried With Salted Fish",
    "chineseName": "银芽炒咸鱼",
    "price": 17.3,
    "image": "https://ucarecdn.com/7ba462a8-cb8d-4a17-8bd2-e7559238db3f/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$17.30 • Medium(中): S$26.70 • Large(大): S$34.50",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 17.3
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 26.7
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 34.5
      }
    ],
    "allergens": [
      "Fish",
      "Soy"
    ]
  },
  {
    "id": 121,
    "sourceItemId": "8a8191e075943aac0175965078f9589a",
    "name": "Claypot Brinjal With Minced Pork | 肉碎茄子煲",
    "englishName": "Claypot Brinjal With Minced Pork",
    "chineseName": "肉碎茄子煲",
    "price": 16.1,
    "image": "https://ucarecdn.com/250ee69a-bed3-44ef-8baf-29fee8714b40/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$16.10 • Medium(中): S$24.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 16.1
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 24
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 122,
    "sourceItemId": "8a818cdd8118bb8c018118e4114a0409",
    "name": "Stir Fried Small Cabbage With Garlic | 蒜茸炒小白菜",
    "englishName": "Stir Fried Small Cabbage With Garlic",
    "chineseName": "蒜茸炒小白菜",
    "price": 13.4,
    "image": "https://ucarecdn.com/29c1096a-3ded-4813-83b6-49a5a999f4ae/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$20.20 • Large(大): S$26.70",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 26.7
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 123,
    "sourceItemId": "8a8191e075943aac01759650c65d58f0",
    "name": "Celery Stir Fried With Garlic | 蒜茸炒西芹",
    "englishName": "Celery Stir Fried With Garlic",
    "chineseName": "蒜茸炒西芹",
    "price": 14.7,
    "image": "",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$14.70 • Medium(中): S$22.80 • Large(大): S$29.10",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 14.7
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 22.8
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 29.1
      }
    ],
    "allergens": [
      "None"
    ]
  },
  {
    "id": 124,
    "sourceItemId": "8a818fca8118b24701811a724dc611e1",
    "name": "Poached Chinese Spinach | 金银蛋苋菜",
    "englishName": "Poached Chinese Spinach",
    "chineseName": "金银蛋苋菜",
    "price": 18.6,
    "image": "https://ucarecdn.com/9d59fe45-c76a-4bee-ab0d-2c038d2404ca/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$18.60 • Medium(中): S$28.00",
    "isSpicy": false,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 18.6
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 28
      }
    ],
    "allergens": [
      "Egg"
    ]
  },
  {
    "id": 125,
    "sourceItemId": "8a818e8f811f749201811fa44ec809a3",
    "name": "Stir Fried Kangkong With Sambal | 马来风光",
    "englishName": "Stir Fried Kangkong With Sambal",
    "chineseName": "马来风光",
    "price": 13.4,
    "image": "https://ucarecdn.com/93417926-cc22-4f66-8316-72f4543393a0/",
    "category": "VEGETABLE",
    "portion": "Small(小)",
    "description": "Small(小): S$13.40 • Medium(中): S$20.20 • Large(大): S$26.70",
    "isSpicy": true,
    "spicyLevel": 2,
    "isPopular": false,
    "portionOptions": [
      {
        "size": "S",
        "label": "Small(小)",
        "price": 13.4
      },
      {
        "size": "M",
        "label": "Medium(中)",
        "price": 20.2
      },
      {
        "size": "L",
        "label": "Large(大)",
        "price": 26.7
      }
    ],
    "allergens": [
      "None"
    ]
  }
];

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
