// Singapore Geography & Delivery Engine for Kok Sen Restaurant
// Location Analysis: 4 Keong Saik Road, Singapore 089112 (Chinatown / Outram Park / Tanjong Pagar)

export interface RestaurantLocationAnalysis {
  address: string;
  postalCode: string;
  district: string;
  planningArea: string;
  lat: number;
  lng: number;
  landmarks: string[];
  mrtStations: { name: string; lines: string[]; walkMinutes: number }[];
  deliveryRadiusKm: number;
  curbsidePickupNote: string;
  expresswayAccess: string[];
}

export const KOK_SEN_LOCATION: RestaurantLocationAnalysis = {
  address: '4 Keong Saik Road, Singapore 089112',
  postalCode: '089112',
  district: 'District 02 (Chinatown / Tanjong Pagar / Outram)',
  planningArea: 'Outram / Chinatown Conservation Area',
  lat: 1.2804,
  lng: 103.8420,
  landmarks: [
    'Historic Keong Saik Road Shophouse Conservation Area',
    'Chinatown Heritage Precinct',
    'Tanjong Pagar CBD Fringe',
    'Duxton Hill & Bukit Pasoh Culinary Belt',
  ],
  mrtStations: [
    { name: 'Outram Park MRT', lines: ['East-West', 'North-East', 'Thomson-East Coast'], walkMinutes: 4 },
    { name: 'Maxwell MRT', lines: ['Thomson-East Coast'], walkMinutes: 5 },
    { name: 'Chinatown MRT', lines: ['North-East', 'Downtown'], walkMinutes: 7 },
  ],
  deliveryRadiusKm: 26,
  curbsidePickupNote: 'One-way vehicular access along Keong Saik Rd with dedicated curbside handover for self-pickup orders.',
  expresswayAccess: ['AYE (Ayer Rajah Expressway) via Keppel Rd', 'CTE (Central Expressway) via Chin Swee Rd'],
};

export interface DeliveryZoneRule {
  zoneId: 'zone_1' | 'zone_2' | 'zone_3';
  name: string;
  label: string;
  distanceRangeKm: [number, number];
  baseFee: number;
  freeDeliveryThreshold: number;
  estimatedMinutes: [number, number];
  coverageSummary: string;
  accentColor: string;
}

export const DELIVERY_ZONES: Record<string, DeliveryZoneRule> = {
  zone_1: {
    zoneId: 'zone_1',
    name: 'Zone 1: Central & Downtown',
    label: 'Central Corridor (0 – 5 km)',
    distanceRangeKm: [0, 5],
    baseFee: 5.0,
    freeDeliveryThreshold: 60.0,
    estimatedMinutes: [30, 45],
    coverageSummary: 'Keong Saik, Chinatown, Tanjong Pagar, Raffles Place, Marina Bay, River Valley, Tiong Bahru, Orchard, Havelock',
    accentColor: '#16a34a',
  },
  zone_2: {
    zoneId: 'zone_2',
    name: 'Zone 2: City Fringe & Mid-Range',
    label: 'Mid Ring (5 – 12 km)',
    distanceRangeKm: [5.1, 12],
    baseFee: 9.0,
    freeDeliveryThreshold: 85.0,
    estimatedMinutes: [45, 60],
    coverageSummary: 'Queenstown, Redhill, Toa Payoh, Novena, Kallang, Marine Parade, Geylang, Bukit Merah, Serangoon, Pasir Panjang',
    accentColor: '#d97706',
  },
  zone_3: {
    zoneId: 'zone_3',
    name: 'Zone 3: Outer Regions & Islandwide',
    label: 'Outer Islandwide (12 – 25 km)',
    distanceRangeKm: [12.1, 25],
    baseFee: 14.0,
    freeDeliveryThreshold: 120.0,
    estimatedMinutes: [60, 75],
    coverageSummary: 'Jurong East/West, Clementi, Tampines, Bedok, Pasir Ris, Ang Mo Kio, Bishan, Woodlands, Sengkang, Punggol, Yishun',
    accentColor: '#dc2626',
  },
};

// Singapore Postal Sector Map (first 2 digits of 6-digit postal code)
interface PostalSectorInfo {
  district: string;
  area: string;
  approxDistanceKm: number;
  zone: 'zone_1' | 'zone_2' | 'zone_3';
}

const POSTAL_SECTOR_MAP: Record<string, PostalSectorInfo> = {
  // District 01: Raffles Place, Cecil, Marina, People's Park
  '01': { district: 'D01', area: 'Raffles Place / Cecil', approxDistanceKm: 2.1, zone: 'zone_1' },
  '02': { district: 'D01', area: 'Anson / Tanjong Pagar', approxDistanceKm: 1.2, zone: 'zone_1' },
  '03': { district: 'D01', area: 'Queen Street / ArmStreet', approxDistanceKm: 2.8, zone: 'zone_1' },
  '04': { district: 'D01', area: 'Telok Ayer / Chinatown', approxDistanceKm: 1.0, zone: 'zone_1' },
  '05': { district: 'D01', area: 'Chinatown / Upper Cross St', approxDistanceKm: 0.6, zone: 'zone_1' },
  '06': { district: 'D01', area: 'Shenton Way / Marina Bay', approxDistanceKm: 2.0, zone: 'zone_1' },

  // District 02: Anson, Tanjong Pagar, Keong Saik, Cantonment
  '07': { district: 'D02', area: 'Anson / Tanjong Pagar', approxDistanceKm: 0.8, zone: 'zone_1' },
  '08': { district: 'D02', area: 'Keong Saik / Neil Rd / Outram', approxDistanceKm: 0.2, zone: 'zone_1' },

  // District 03: Queenstown, Tiong Bahru
  '14': { district: 'D03', area: 'Bukit Merah / Alexandra', approxDistanceKm: 3.5, zone: 'zone_1' },
  '15': { district: 'D03', area: 'Tiong Bahru / Redhill', approxDistanceKm: 2.2, zone: 'zone_1' },
  '16': { district: 'D03', area: 'Tiong Bahru / Havelock', approxDistanceKm: 1.6, zone: 'zone_1' },

  // District 04: Telok Blangah, Harbourfront, Sentosa
  '09': { district: 'D04', area: 'Telok Blangah / Harbourfront', approxDistanceKm: 3.8, zone: 'zone_1' },
  '10': { district: 'D04', area: 'Keppel / Sentosa Cove', approxDistanceKm: 4.5, zone: 'zone_1' },

  // District 05: Pasir Panjang, Clementi, West Coast
  '11': { district: 'D05', area: 'Pasir Panjang / Buona Vista', approxDistanceKm: 7.2, zone: 'zone_2' },
  '12': { district: 'D05', area: 'Clementi / West Coast', approxDistanceKm: 9.8, zone: 'zone_2' },
  '13': { district: 'D05', area: 'National University of SG / Haw Par', approxDistanceKm: 8.5, zone: 'zone_2' },

  // District 06: City Hall, Clarke Quay
  '17': { district: 'D06', area: 'City Hall / Clarke Quay / Fort Canning', approxDistanceKm: 2.0, zone: 'zone_1' },

  // District 07: Bugis, Rochor, Middle Road
  '18': { district: 'D07', area: 'Middle Road / Golden Mile', approxDistanceKm: 3.2, zone: 'zone_1' },
  '19': { district: 'D07', area: 'Beach Road / Bugis', approxDistanceKm: 3.0, zone: 'zone_1' },

  // District 08: Farrer Park, Serangoon Rd, Little India
  '20': { district: 'D08', area: 'Little India / Serangoon Rd', approxDistanceKm: 4.2, zone: 'zone_1' },
  '21': { district: 'D08', area: 'Farrer Park / Kitchener Rd', approxDistanceKm: 4.5, zone: 'zone_1' },

  // District 09: Orchard, Cairnhill, River Valley
  '22': { district: 'D09', area: 'Orchard / Cairnhill', approxDistanceKm: 3.2, zone: 'zone_1' },
  '23': { district: 'D09', area: 'River Valley / Killiney', approxDistanceKm: 2.3, zone: 'zone_1' },

  // District 10: Bukit Timah, Holland, Tanglin
  '24': { district: 'D10', area: 'Tanglin / Napier / Ardmore', approxDistanceKm: 4.8, zone: 'zone_1' },
  '25': { district: 'D10', area: 'Bukit Timah / Holland Road', approxDistanceKm: 6.5, zone: 'zone_2' },
  '26': { district: 'D10', area: 'Holland Village / Sixth Ave', approxDistanceKm: 7.4, zone: 'zone_2' },
  '27': { district: 'D10', area: 'Coronation / King Albert Park', approxDistanceKm: 8.8, zone: 'zone_2' },

  // District 11: Newton, Novena, Dunearn
  '28': { district: 'D11', area: 'Newton / Dunearn Rd', approxDistanceKm: 5.2, zone: 'zone_2' },
  '29': { district: 'D11', area: 'Novena / Thomson Rd', approxDistanceKm: 5.8, zone: 'zone_2' },
  '30': { district: 'D11', area: 'Chancery / Balmoral', approxDistanceKm: 5.5, zone: 'zone_2' },

  // District 12: Balestier, Toa Payoh, Serangoon
  '31': { district: 'D12', area: 'Balestier / Toa Payoh', approxDistanceKm: 6.8, zone: 'zone_2' },
  '32': { district: 'D12', area: 'Toa Payoh Central / Lorong', approxDistanceKm: 7.5, zone: 'zone_2' },
  '33': { district: 'D12', area: 'St. Michael / Whampoa', approxDistanceKm: 6.2, zone: 'zone_2' },

  // District 13: Macpherson, Braddell
  '34': { district: 'D13', area: 'Macpherson / Potong Pasir', approxDistanceKm: 7.8, zone: 'zone_2' },
  '35': { district: 'D13', area: 'Aljunied / Sennett Estate', approxDistanceKm: 7.2, zone: 'zone_2' },
  '36': { district: 'D13', area: 'Braddell Heights / Joo Seng', approxDistanceKm: 8.2, zone: 'zone_2' },
  '37': { district: 'D13', area: 'Bidadari / Mount Vernon', approxDistanceKm: 8.9, zone: 'zone_2' },

  // District 14: Geylang, Eunos, Paya Lebar
  '38': { district: 'D14', area: 'Geylang / Guillemard', approxDistanceKm: 6.0, zone: 'zone_2' },
  '39': { district: 'D14', area: 'Paya Lebar / Sims Ave', approxDistanceKm: 7.4, zone: 'zone_2' },
  '40': { district: 'D14', area: 'Eunos / Kembangan', approxDistanceKm: 8.8, zone: 'zone_2' },
  '41': { district: 'D14', area: 'Ubi / Kaki Bukit', approxDistanceKm: 9.5, zone: 'zone_2' },

  // District 15: Katong, Joo Chiat, Marine Parade, Tanjong Rhu
  '42': { district: 'D15', area: 'Tanjong Rhu / Meyer Rd', approxDistanceKm: 5.8, zone: 'zone_2' },
  '43': { district: 'D15', area: 'Katong / Amber Rd', approxDistanceKm: 7.5, zone: 'zone_2' },
  '44': { district: 'D15', area: 'Joo Chiat / East Coast Rd', approxDistanceKm: 8.4, zone: 'zone_2' },
  '45': { district: 'D15', area: 'Marine Parade / Telok Kurau', approxDistanceKm: 9.8, zone: 'zone_2' },

  // District 16: Bedok, Upper East Coast
  '46': { district: 'D16', area: 'Bedok South / Bayshore', approxDistanceKm: 11.2, zone: 'zone_2' },
  '47': { district: 'D16', area: 'Bedok Central / Reservoir', approxDistanceKm: 12.8, zone: 'zone_3' },
  '48': { district: 'D16', area: 'Upper East Coast / Eastwood', approxDistanceKm: 13.5, zone: 'zone_3' },

  // District 17: Changi, Loyang
  '49': { district: 'D17', area: 'Loyang / Changi Village', approxDistanceKm: 18.5, zone: 'zone_3' },
  '50': { district: 'D17', area: 'Flora / Changi North', approxDistanceKm: 17.2, zone: 'zone_3' },

  // District 18: Tampines, Pasir Ris
  '51': { district: 'D18', area: 'Pasir Ris Town / Elias', approxDistanceKm: 17.8, zone: 'zone_3' },
  '52': { district: 'D18', area: 'Tampines Town / Simei', approxDistanceKm: 15.6, zone: 'zone_3' },

  // District 19: Serangoon Garden, Hougang, Punggol
  '53': { district: 'D19', area: 'Serangoon Central / Kovan', approxDistanceKm: 10.5, zone: 'zone_2' },
  '54': { district: 'D19', area: 'Hougang / Buangkok', approxDistanceKm: 12.8, zone: 'zone_3' },
  '55': { district: 'D19', area: 'Serangoon Garden / Yio Chu Kang', approxDistanceKm: 11.5, zone: 'zone_2' },
  '82': { district: 'D19', area: 'Punggol Waterway / Northshore', approxDistanceKm: 16.8, zone: 'zone_3' },

  // District 20: Bishan, Ang Mo Kio
  '56': { district: 'D20', area: 'Bishan / Marymount', approxDistanceKm: 8.8, zone: 'zone_2' },
  '57': { district: 'D20', area: 'Ang Mo Kio / Kebun Baru', approxDistanceKm: 11.2, zone: 'zone_2' },

  // District 21: Upper Bukit Timah, Clementi Park
  '58': { district: 'D21', area: 'Upper Bukit Timah / Beauty World', approxDistanceKm: 11.8, zone: 'zone_2' },
  '59': { district: 'D21', area: 'Clementi Park / Ulu Pandan', approxDistanceKm: 9.6, zone: 'zone_2' },

  // District 22: Jurong
  '60': { district: 'D22', area: 'Jurong East / IMM / Westgate', approxDistanceKm: 14.5, zone: 'zone_3' },
  '61': { district: 'D22', area: 'Jurong West / Lakeside', approxDistanceKm: 16.8, zone: 'zone_3' },
  '62': { district: 'D22', area: 'Boon Lay / Pioneer', approxDistanceKm: 18.5, zone: 'zone_3' },
  '63': { district: 'D22', area: 'Jurong Island / Tuas', approxDistanceKm: 22.0, zone: 'zone_3' },
  '64': { district: 'D22', area: 'Nanyang / NTU Area', approxDistanceKm: 20.5, zone: 'zone_3' },

  // District 23: Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang
  '65': { district: 'D23', area: 'Hillview / Bukit Batok', approxDistanceKm: 13.8, zone: 'zone_3' },
  '66': { district: 'D23', area: 'Dairy Farm / Cashew', approxDistanceKm: 14.5, zone: 'zone_3' },
  '67': { district: 'D23', area: 'Bukit Panjang / Senja', approxDistanceKm: 15.8, zone: 'zone_3' },
  '68': { district: 'D23', area: 'Choa Chu Kang / Yew Tee', approxDistanceKm: 17.5, zone: 'zone_3' },

  // District 24: Lim Chu Kang, Tengah
  '69': { district: 'D24', area: 'Tengah New Town', approxDistanceKm: 17.2, zone: 'zone_3' },
  '70': { district: 'D24', area: 'Lim Chu Kang / Sungei Gedong', approxDistanceKm: 23.5, zone: 'zone_3' },
  '71': { district: 'D24', area: 'Neo Tiew / Farmway', approxDistanceKm: 24.0, zone: 'zone_3' },

  // District 25: Kranji, Woodlands
  '72': { district: 'D25', area: 'Kranji / Mandai', approxDistanceKm: 21.0, zone: 'zone_3' },
  '73': { district: 'D25', area: 'Woodlands / Marsiling', approxDistanceKm: 22.5, zone: 'zone_3' },

  // District 26: Upper Thomson, Springleaf
  '77': { district: 'D26', area: 'Upper Thomson / Springleaf', approxDistanceKm: 14.8, zone: 'zone_3' },
  '78': { district: 'D26', area: 'Mandai / Lentor', approxDistanceKm: 15.5, zone: 'zone_3' },

  // District 27: Yishun, Sembawang
  '75': { district: 'D27', area: 'Sembawang / Canberra', approxDistanceKm: 20.8, zone: 'zone_3' },
  '76': { district: 'D27', area: 'Yishun / Khatib', approxDistanceKm: 18.2, zone: 'zone_3' },

  // District 28: Seletar
  '79': { district: 'D28', area: 'Seletar Hills / Aerospace', approxDistanceKm: 16.5, zone: 'zone_3' },
  '80': { district: 'D28', area: 'Sengkang West / Jalan Kayu', approxDistanceKm: 15.2, zone: 'zone_3' },
};

export interface DeliveryCalculationResult {
  isValidPostal: boolean;
  postalCode: string;
  district: string;
  area: string;
  distanceKm: number;
  zone: DeliveryZoneRule;
  deliveryFee: number;
  isFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;
  estimatedMinutesRange: [number, number];
  notes: string;
}

export function calculateDelivery(
  postalCodeInput: string,
  foodSubtotal: number
): DeliveryCalculationResult {
  const cleaned = postalCodeInput.trim().replace(/\D/g, '');
  const isValidPostal = cleaned.length === 6;

  if (!isValidPostal) {
    // Default fallback based on closest zone (Zone 1)
    const defaultZone = DELIVERY_ZONES.zone_1;
    const isFree = foodSubtotal >= defaultZone.freeDeliveryThreshold;
    return {
      isValidPostal: false,
      postalCode: cleaned,
      district: 'Singapore',
      area: 'Islandwide Singapore',
      distanceKm: 3.5,
      zone: defaultZone,
      deliveryFee: isFree ? 0 : defaultZone.baseFee,
      isFreeDelivery: isFree,
      amountNeededForFreeDelivery: Math.max(0, defaultZone.freeDeliveryThreshold - foodSubtotal),
      estimatedMinutesRange: defaultZone.estimatedMinutes,
      notes: 'Please enter a valid 6-digit Singapore postal code to calculate exact distance from 4 Keong Saik Road.',
    };
  }

  const sector = cleaned.slice(0, 2);
  const matched = POSTAL_SECTOR_MAP[sector];

  let distanceKm = 4.0;
  let zoneRule = DELIVERY_ZONES.zone_1;
  let district = 'Central Singapore';
  let area = 'Singapore Urban Hub';

  if (matched) {
    distanceKm = matched.approxDistanceKm;
    zoneRule = DELIVERY_ZONES[matched.zone] || DELIVERY_ZONES.zone_1;
    district = matched.district;
    area = matched.area;
  } else {
    // Interpolate based on sector number
    const sectorNum = parseInt(sector, 10);
    if (sectorNum <= 24) {
      distanceKm = 3.5;
      zoneRule = DELIVERY_ZONES.zone_1;
      district = 'Central / CBD Fringe';
      area = 'Central Singapore Corridor';
    } else if (sectorNum <= 50) {
      distanceKm = 8.5;
      zoneRule = DELIVERY_ZONES.zone_2;
      district = 'City Fringe';
      area = 'Mid-Singapore Ring';
    } else {
      distanceKm = 16.5;
      zoneRule = DELIVERY_ZONES.zone_3;
      district = 'Outer Region';
      area = 'Outer Islandwide Singapore';
    }
  }

  const isFreeDelivery = foodSubtotal >= zoneRule.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : zoneRule.baseFee;
  const amountNeeded = Math.max(0, zoneRule.freeDeliveryThreshold - foodSubtotal);

  return {
    isValidPostal: true,
    postalCode: cleaned,
    district,
    area,
    distanceKm,
    zone: zoneRule,
    deliveryFee,
    isFreeDelivery,
    amountNeededForFreeDelivery: amountNeeded,
    estimatedMinutesRange: zoneRule.estimatedMinutes,
    notes: `Calculated from 4 Keong Saik Rd (089112) via direct arterial route (~${distanceKm} km). Wok-fired fresh and dispatched in insulated thermal carriers.`,
  };
}

export interface TakeawaySlot {
  id: string;
  label: string;
  timeString: string;
  isAvailable: boolean;
}

export function getAvailableTakeawaySlots(): TakeawaySlot[] {
  const slots: TakeawaySlot[] = [
    { id: 'asap', label: 'ASAP (~20 - 25 mins)', timeString: 'Immediately upon order', isAvailable: true },
  ];

  // Generate today's remaining lunch or dinner slots
  const now = new Date();
  const currentHour = now.getHours();

  // Lunch window: 11:30 to 14:30
  // Dinner window: 17:30 to 21:30
  const candidateTimes = [
    { h: 12, m: 0, label: '12:00 PM (Lunch)' },
    { h: 12, m: 30, label: '12:30 PM (Lunch)' },
    { h: 13, m: 0, label: '1:00 PM (Lunch)' },
    { h: 13, m: 30, label: '1:30 PM (Lunch)' },
    { h: 14, m: 0, label: '2:00 PM (Lunch)' },
    { h: 17, m: 30, label: '5:30 PM (Dinner)' },
    { h: 18, m: 0, label: '6:00 PM (Dinner)' },
    { h: 18, m: 30, label: '6:30 PM (Dinner)' },
    { h: 19, m: 0, label: '7:00 PM (Dinner)' },
    { h: 19, m: 30, label: '7:30 PM (Dinner)' },
    { h: 20, m: 0, label: '8:00 PM (Dinner)' },
    { h: 20, m: 30, label: '8:30 PM (Dinner)' },
    { h: 21, m: 0, label: '9:00 PM (Dinner)' },
  ];

  candidateTimes.forEach((slot, idx) => {
    // If future or tomorrow
    const isFuture = slot.h > currentHour || (slot.h === currentHour && slot.m > now.getMinutes() + 15);
    slots.push({
      id: `slot_${idx}`,
      label: slot.label,
      timeString: slot.label,
      isAvailable: isFuture,
    });
  });

  return slots;
}

export function calculateDeliveryFee(postalCode: string, subtotal: number = 0) {
  const res = calculateDelivery(postalCode, subtotal);
  return {
    fee: res.deliveryFee,
    distanceKm: res.distanceKm,
    districtName: res.area || res.district,
    zone: res.zone.name,
    estimatedMinutes: res.estimatedMinutesRange[1],
  };
}
