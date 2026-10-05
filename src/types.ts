export type MenuCategory =
  | 'all'
  | 'signatures'
  | 'seafood'
  | 'meat'
  | 'noodles'
  | 'vegetables'
  | 'soups'
  | 'drinks';

export interface MenuSectionInfo {
  id: MenuCategory;
  name: string;
  chineseName: string;
  iconName: string;
  description: string;
}

export interface Dish {
  id: number;
  name: string;
  chineseName: string;
  price: number;
  image: string;
  category: MenuCategory;
  secondaryCategory?: MenuCategory;
  badge?: string;
  portion: string;
  description: string;
  isSpicy?: boolean;
  spicyLevel?: number;
  isPopular?: boolean;
  portionOptions?: { size: 'S' | 'M' | 'L'; label: string; price: number }[];
  allergens: string[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
  notes?: string;
}

export type OrderStatusStage = 'received' | 'preparing' | 'ready' | 'served';

export interface OrderItemDetail {
  dish: Dish;
  quantity: number;
  selectedSize?: 'S' | 'M' | 'L';
  itemPrice: number;
  notes?: string;
  station?: string;
}

export interface OrderReview {
  rating: number;
  favoriteDishId?: number;
  tags: string[];
  comment: string;
  submittedAt: Date;
}

export type DiningMode = 'dine_in' | 'takeaway' | 'delivery';

export interface DeliveryDetails {
  recipientName: string;
  recipientPhone: string;
  address: string;
  postalCode: string;
  unitNumber?: string;
  distanceKm: number;
  deliveryZone: string;
  deliveryFee: number;
  isFreeDelivery: boolean;
  specialInstructions?: string;
}

export interface TakeawayDetails {
  pickupName: string;
  pickupPhone: string;
  pickupTimeSlot: string;
  packSeparately?: boolean;
  needCutlery?: boolean;
}

export interface PlacedOrder {
  orderId: string;
  userId?: string;
  customerName?: string;
  customerPhone?: string;
  orderType: DiningMode;
  tableNumber?: string;
  createdAt: Date;
  status: OrderStatusStage;
  items: OrderItemDetail[];
  subtotal: number;
  deliveryFee?: number;
  totalPrice: number;
  estimatedMinutes: number;
  deliveryDetails?: DeliveryDetails;
  takeawayDetails?: TakeawayDetails;
  review?: OrderReview;
}

export type ActiveTab = 'home' | 'menu' | 'delivery' | 'status' | 'history' | 'bookings' | 'profile';

