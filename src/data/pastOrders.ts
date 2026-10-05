import { PlacedOrder } from '../types';

// Order history begins empty and only records orders when a guest actually places an order
export const getInitialPastOrders = (): PlacedOrder[] => {
  return [];
};

