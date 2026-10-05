import React, { useState } from 'react';
import {
  RotateCcw,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Utensils,
  Star,
  Receipt,
  Sparkles,
  Check,
  Bike,
  MapPin,
  Package,
} from 'lucide-react';
import { PlacedOrder, ActiveTab, OrderStatusStage } from '../types';
import { formatOrderTimestampSGT } from '../utils/singaporeTime';

interface OrderHistoryViewProps {
  pastOrders: PlacedOrder[];
  onOrderAgain: (order: PlacedOrder) => void;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCart: () => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  pastOrders,
  onOrderAgain,
  onTabChange,
  onOpenCart,
}) => {
  const [lastReorderedId, setLastReorderedId] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<{
    orderId: string;
    itemCount: number;
    totalAdded: number;
  } | null>(null);

  const handleReorderClick = (order: PlacedOrder) => {
    onOrderAgain(order);
    setLastReorderedId(order.orderId);

    const totalQty = order.items.reduce((sum, it) => sum + it.quantity, 0);
    setSuccessBanner({
      orderId: order.orderId,
      itemCount: totalQty,
      totalAdded: order.totalPrice,
    });

    setTimeout(() => {
      setLastReorderedId((prev) => (prev === order.orderId ? null : prev));
    }, 2500);
  };

  const formatDate = (dateInput: Date | string) => {
    return formatOrderTimestampSGT(dateInput);
  };

  const getStatusBadge = (order: PlacedOrder) => {
    const isDelivery = order.orderType === 'delivery';
    const isTakeaway = order.orderType === 'takeaway';

    switch (order.status) {
      case 'received':
        return {
          label: isDelivery ? 'Dispatched to Kitchen' : isTakeaway ? 'Takeaway Logged' : 'Order Placed',
          color: 'text-blue-700 bg-blue-50 border-blue-200/80',
          icon: Clock,
        };
      case 'preparing':
        return {
          label: 'Wok Fired / Cooking',
          color: 'text-amber-800 bg-amber-50 border-amber-200/80',
          icon: Utensils,
        };
      case 'ready':
        return {
          label: isDelivery
            ? 'Out for Delivery 🛵'
            : isTakeaway
            ? 'Ready for Pickup 🛍️'
            : 'Ready to Serve ✨',
          color: 'text-purple-700 bg-purple-50 border-purple-200/80',
          icon: isDelivery ? Bike : isTakeaway ? Package : Utensils,
        };
      case 'served':
      default:
        return {
          label: isDelivery ? 'Delivered' : isTakeaway ? 'Collected' : 'Served & Paid',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
          icon: CheckCircle2,
        };
    }
  };

  return (
    <section className="max-w-md mx-auto px-4 py-3 space-y-4 animate-in fade-in duration-200 pb-16">
      {/* Floating Success Notification Banner after 'Order Again' is clicked */}
      {successBanner && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 shadow-sm text-emerald-900 flex items-center justify-between gap-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-[13px] leading-tight truncate">
                Items from {successBanner.orderId} added!
              </p>
              <p className="text-[11.5px] text-emerald-700">
                {successBanner.itemCount} dishes added to your active cart.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCart}
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-[12px] font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            View Cart
          </button>
        </div>
      )}

      {/* Page Title & Intro */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <h2 className="font-epilogue text-[20px] font-extrabold text-gray-900 leading-tight">
            Your Orders & Receipts
          </h2>
          <p className="text-[12.5px] text-gray-500 mt-0.5">
            Dine-in, Keong Saik takeaway & islandwide delivery records
          </p>
        </div>
        {pastOrders.length > 0 && (
          <span className="text-[11px] font-semibold text-gray-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
            {pastOrders.length} {pastOrders.length === 1 ? 'order' : 'orders'}
          </span>
        )}
      </div>

      {/* Empty State */}
      {pastOrders.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#C61E28] mx-auto flex items-center justify-center">
            <Receipt className="w-7 h-7" />
          </div>
          <h3 className="font-epilogue text-[16px] font-bold text-gray-900">
            No Past Orders Yet
          </h3>
          <p className="text-[12.5px] text-gray-500 max-w-xs mx-auto">
            Your completed dine-in, Keong Saik takeaway, or islandwide delivery orders will appear here for tracking and quick 1-tap re-ordering.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <button
              onClick={() => onTabChange('menu')}
              className="py-2.5 px-5 bg-[#C61E28] hover:bg-red-800 text-white rounded-xl text-[13px] font-bold transition-all shadow-xs cursor-pointer"
            >
              Browse Menu & Order
            </button>
            <button
              onClick={() => onTabChange('delivery')}
              className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-[13px] font-bold transition-all cursor-pointer"
            >
              Explore Delivery Zones
            </button>
          </div>
        </div>
      ) : (
        /* List of Past Order Cards */
        <div className="space-y-4">
          {pastOrders.map((order) => {
            const isJustReordered = lastReorderedId === order.orderId;
            const totalItemCount = order.items.reduce((acc, it) => acc + it.quantity, 0);
            const statusBadge = getStatusBadge(order);
            const BadgeIcon = statusBadge.icon;

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-3.5 hover:border-gray-300 transition-all"
              >
                {/* Past Order Header */}
                <div className="flex items-start justify-between border-b border-gray-100 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[13px] font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                        {order.orderId}
                      </span>
                      <span className="text-[11.5px] font-semibold text-gray-700">
                        {order.orderType === 'dine_in' && `Table ${order.tableNumber || '04'} • Dine-In`}
                        {order.orderType === 'takeaway' && 'Takeaway • 4 Keong Saik Rd'}
                        {order.orderType === 'delivery' && `Delivery • ${order.deliveryDetails?.deliveryZone || 'Islandwide'}`}
                      </span>
                    </div>

                    <span className="text-[11.5px] text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 border ${statusBadge.color}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      {statusBadge.label}
                    </span>
                    <span className="block font-epilogue text-[15px] font-extrabold text-gray-900 mt-1">
                      S${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery or Takeaway Specific Detail Strip */}
                {order.orderType === 'delivery' && order.deliveryDetails && (
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                      <MapPin className="w-3.5 h-3.5 text-[#C61E28]" />
                      <span>{order.deliveryDetails.address} (S{order.deliveryDetails.postalCode})</span>
                    </div>
                    <div className="text-[11px] text-gray-500 flex justify-between">
                      <span>Distance: ~{order.deliveryDetails.distanceKm} km from Keong Saik</span>
                      <span>Delivery Fee: {order.deliveryDetails.isFreeDelivery ? 'FREE' : `S$${order.deliveryDetails.deliveryFee.toFixed(2)}`}</span>
                    </div>
                  </div>
                )}

                {order.orderType === 'takeaway' && order.takeawayDetails && (
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Pickup Slot: {order.takeawayDetails.pickupTimeSlot}</span>
                      <span className="text-emerald-700 font-bold">Counter Pickup</span>
                    </div>
                    <div className="text-[11px] text-amber-800/80">
                      Collection at 4 Keong Saik Road • Contact: {order.takeawayDetails.pickupPhone}
                    </div>
                  </div>
                )}

                {/* Ordered Items List */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-bold text-[13px] text-gray-900 truncate">
                            {item.quantity}x {item.dish.name}
                          </h4>
                          <span className="text-[12px] font-semibold text-gray-800 shrink-0 ml-2">
                            S${(item.itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500 block truncate">
                          {item.dish.chineseName}
                          {item.selectedSize ? ` • Size ${item.selectedSize}` : ''}
                        </span>
                        {item.notes && (
                          <span className="text-[10.5px] text-red-700 bg-red-50/80 px-1.5 py-0.2 rounded mt-0.5 inline-block truncate max-w-full">
                            {item.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Past Review Summary snippet */}
                {order.review && (
                  <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 text-[11.5px] text-amber-900 space-y-1">
                    <div className="flex items-center gap-1 font-bold">
                      <div className="flex">
                        {[...Array(order.review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                          />
                        ))}
                      </div>
                      <span>Your Review ({order.review.rating}.0)</span>
                    </div>
                    {order.review.comment && (
                      <p className="text-gray-600 italic">"{order.review.comment}"</p>
                    )}
                  </div>
                )}

                {/* Footer Action: 1-Tap Order Again Button */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <span className="text-[11.5px] text-gray-500">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} • S$
                    {order.totalPrice.toFixed(2)}
                  </span>

                  <button
                    id={`order-again-${order.orderId.replace(/[^a-zA-Z0-9]/g, '')}`}
                    onClick={() => handleReorderClick(order)}
                    className={`py-2 px-4 rounded-xl text-[12.5px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                      isJustReordered
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : 'bg-[#C61E28] hover:bg-red-800 text-white'
                    }`}
                  >
                    {isJustReordered ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Re-added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Order Again</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
