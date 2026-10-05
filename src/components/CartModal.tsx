import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Bike,
  UtensilsCrossed,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  User,
  Phone,
  Info,
} from 'lucide-react';
import { DISHES, RESTAURANT_INFO } from '../data/dishes';
import { Dish, DiningMode, DeliveryDetails, TakeawayDetails } from '../types';
import { formatSingaporeDate, formatSingaporeTime } from '../utils/singaporeTime';
import { calculateDelivery, getAvailableTakeawaySlots } from '../utils/deliveryEngine';
import { useAuth } from '../context/AuthContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [dishId: number]: number };
  onUpdateQty: (dishId: number, delta: number) => void;
  tableNumber: string;
  onPlaceOrder?: (
    items: { dish: Dish; qty: number; subtotal: number }[],
    table: string,
    total: number,
    orderType: DiningMode,
    deliveryDetails?: DeliveryDetails,
    takeawayDetails?: TakeawayDetails
  ) => void;
  onOpenAuth?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  tableNumber,
  onPlaceOrder,
  onOpenAuth,
}) => {
  const { userProfile, currentUser } = useAuth();

  const [diningMode, setDiningMode] = useState<DiningMode>('dine_in');

  // Delivery Form State
  const [recipientName, setRecipientName] = useState(userProfile?.displayName || '');
  const [recipientPhone, setRecipientPhone] = useState(userProfile?.phone || '');
  const [postalCode, setPostalCode] = useState(userProfile?.defaultPostalCode || '089112');
  const [unitAddress, setUnitAddress] = useState(userProfile?.defaultAddress || '');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Takeaway Form State
  const [pickupTimeSlot, setPickupTimeSlot] = useState('ASAP (~20 - 25 mins)');
  const [packSauceSeparately, setPackSauceSeparately] = useState(true);
  const [needCutlery, setNeedCutlery] = useState(false);

  // Sync profile when opened or changed
  useEffect(() => {
    if (userProfile) {
      if (!recipientName) setRecipientName(userProfile.displayName || '');
      if (!recipientPhone && userProfile.phone) setRecipientPhone(userProfile.phone);
      if (!unitAddress && userProfile.defaultAddress) setUnitAddress(userProfile.defaultAddress);
      if (userProfile.defaultPostalCode) setPostalCode(userProfile.defaultPostalCode);
    }
  }, [userProfile]);

  if (!isOpen) return null;

  // Calculate cart items
  const cartItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([dishIdStr, qty]) => {
      const dish = DISHES.find((d) => d.id === Number(dishIdStr))!;
      return { dish, qty, subtotal: dish.price * qty };
    });

  const foodSubtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Delivery calculations
  const deliveryCalc = calculateDelivery(postalCode, foodSubtotal);
  const deliveryFee = diningMode === 'delivery' ? deliveryCalc.deliveryFee : 0;
  const finalTotal = foodSubtotal + deliveryFee;

  const takeawaySlots = getAvailableTakeawaySlots();

  const handleConfirmAndTrack = () => {
    if (!onPlaceOrder || cartItems.length === 0) return;

    let deliveryDetails: DeliveryDetails | undefined;
    let takeawayDetails: TakeawayDetails | undefined;

    if (diningMode === 'delivery') {
      deliveryDetails = {
        recipientName: recipientName.trim() || 'Kok Sen Diner',
        recipientPhone: recipientPhone.trim() || '+65 9727 2533',
        address: unitAddress.trim() || 'Singapore',
        postalCode: deliveryCalc.postalCode,
        unitNumber: '',
        distanceKm: deliveryCalc.distanceKm,
        deliveryZone: deliveryCalc.zone.name,
        deliveryFee: deliveryCalc.deliveryFee,
        isFreeDelivery: deliveryCalc.isFreeDelivery,
        specialInstructions: deliveryNotes.trim() || undefined,
      };
    } else if (diningMode === 'takeaway') {
      takeawayDetails = {
        pickupName: recipientName.trim() || 'Kok Sen Diner',
        pickupPhone: recipientPhone.trim() || '+65 9727 2533',
        pickupTimeSlot,
        packSeparately: packSauceSeparately,
        needCutlery,
      };
    }

    onPlaceOrder(
      cartItems,
      tableNumber,
      finalTotal,
      diningMode,
      deliveryDetails,
      takeawayDetails
    );
    onClose();
  };

  const handleWhatsAppOrder = () => {
    let modeText = '';
    if (diningMode === 'dine_in') {
      modeText = `[DINE-IN ORDER • TABLE ${tableNumber}]`;
    } else if (diningMode === 'takeaway') {
      modeText = `[TAKEAWAY / SELF-PICKUP @ 4 Keong Saik Rd]\nPickup Time: ${pickupTimeSlot}\nCustomer: ${recipientName || 'Diner'} (${recipientPhone || 'N/A'})\nGravy Separately: ${packSauceSeparately ? 'Yes' : 'No'} | Cutlery: ${needCutlery ? 'Yes' : 'No'}`;
    } else {
      modeText = `[ISLANDWIDE DELIVERY ORDER]\nRecipient: ${recipientName || 'Diner'} (${recipientPhone || 'N/A'})\nAddress: ${unitAddress} (S${postalCode})\nZone: ${deliveryCalc.zone.name} (~${deliveryCalc.distanceKm} km)\nDelivery Fee: ${deliveryCalc.isFreeDelivery ? 'FREE (Waiver)' : `S$${deliveryCalc.deliveryFee.toFixed(2)}`}`;
    }

    let message = `Hello Kok Sen Restaurant,\nI would like to place this order:\n\n${modeText}\n\n`;
    cartItems.forEach((item) => {
      const allergenNote = item.dish.allergens?.filter((a) => !a.startsWith('None')).join(', ');
      message += `• ${item.qty}x ${item.dish.name} ${item.dish.chineseName} — S$${item.subtotal.toFixed(2)}${allergenNote ? ` [Allergens: ${allergenNote}]` : ''}\n`;
    });

    message += `\nFood Subtotal: S$${foodSubtotal.toFixed(2)}`;
    if (diningMode === 'delivery') {
      message += `\nDelivery Fee: S$${deliveryFee.toFixed(2)}`;
    }
    message += `\nFinal Total: S$${finalTotal.toFixed(2)}`;

    const sgtTimestamp = `${formatSingaporeDate()} ${formatSingaporeTime()}`;
    message += `\nOrder Sent: ${sgtTimestamp} (Singapore Time)`;
    message += `\nHub: 4 Keong Saik Rd | WhatsApp: ${RESTAURANT_INFO.whatsappNumber}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encoded}`, '_blank');

    handleConfirmAndTrack();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto bg-white rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-epilogue text-[17px] font-bold text-gray-900">
              Your Order & Dining Mode
            </h3>
            <span className="text-[11.5px] text-gray-500">
              Kok Sen Restaurant • 4 Keong Saik Road
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dining Mode Selector Bar */}
        <div className="px-4 pt-3 pb-2 bg-gray-50/80 border-b border-gray-200/70">
          <div className="flex bg-white rounded-xl p-1 border border-gray-200 shadow-xs">
            <button
              onClick={() => setDiningMode('dine_in')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                diningMode === 'dine_in'
                  ? 'bg-[#C61E28] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Dine-In</span>
            </button>

            <button
              onClick={() => setDiningMode('takeaway')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                diningMode === 'takeaway'
                  ? 'bg-[#C61E28] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Takeaway</span>
            </button>

            <button
              onClick={() => setDiningMode('delivery')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                diningMode === 'delivery'
                  ? 'bg-[#C61E28] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Mode-Specific Information Banner */}
          {diningMode === 'dine_in' && (
            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 flex items-center justify-between text-xs">
              <span className="text-gray-700 font-medium">
                Dine-In Table: <strong className="text-gray-900 font-epilogue">Table {tableNumber}</strong>
              </span>
              <span className="text-[10px] bg-[#C61E28] text-white px-2 py-0.5 rounded font-bold">
                Table QR Order
              </span>
            </div>
          )}

          {diningMode === 'takeaway' && (
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C61E28]" />
                  Self-Pickup at 4 Keong Saik Road
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  Zero Delivery Fee
                </span>
              </div>

              {/* Time slot picker */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Pickup Time Slot (Today)
                </label>
                <select
                  value={pickupTimeSlot}
                  onChange={(e) => setPickupTimeSlot(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#C61E28]"
                >
                  {takeawaySlots.map((s) => (
                    <option key={s.id} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Takeaway preferences */}
              <div className="flex items-center justify-between pt-1 text-[11.5px]">
                <label className="flex items-center gap-1.5 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={packSauceSeparately}
                    onChange={(e) => setPackSauceSeparately(e.target.checked)}
                    className="accent-[#C61E28] rounded"
                  />
                  <span>Pack hor fun gravy separately (Retain Wok Hei)</span>
                </label>
              </div>
            </div>
          )}

          {diningMode === 'delivery' && (
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-[#C61E28]" />
                  Islandwide Delivery from 4 Keong Saik Rd
                </span>
                {!currentUser && onOpenAuth && (
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="text-[10.5px] text-[#C61E28] font-bold hover:underline cursor-pointer"
                  >
                    Sign In to Auto-Fill
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Alex Tan"
                    className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#C61E28]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+65 9123 4567"
                    className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#C61E28]"
                  />
                </div>
              </div>

              {/* Postal Code & Address */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="089112"
                      className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono font-bold focus:ring-1 focus:ring-[#C61E28]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">
                      Street / Unit Number
                    </label>
                    <input
                      type="text"
                      value={unitAddress}
                      onChange={(e) => setUnitAddress(e.target.value)}
                      placeholder="Blk 3 #12-304"
                      className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#C61E28]"
                    />
                  </div>
                </div>

                {/* Delivery Zone calculation output */}
                <div className="p-2 bg-white rounded-lg border border-gray-200 text-[11px] space-y-1">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-gray-800">
                      {deliveryCalc.zone.name} (~{deliveryCalc.distanceKm} km)
                    </span>
                    <span className="text-[#C61E28] font-bold">
                      {deliveryCalc.isFreeDelivery ? 'FREE Delivery' : `S$${deliveryCalc.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="text-gray-500 text-[10.5px]">
                    {deliveryCalc.area} • ETA {deliveryCalc.estimatedMinutesRange[0]}–{deliveryCalc.estimatedMinutesRange[1]} mins
                  </div>
                  {!deliveryCalc.isFreeDelivery && (
                    <div className="text-emerald-700 font-medium text-[10.5px]">
                      Add S${deliveryCalc.amountNeededForFreeDelivery.toFixed(2)} more for FREE delivery waiver!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Itemized Cart List */}
          <div className="divide-y divide-gray-100">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-1">
              Ordered Dishes ({cartItems.length})
            </div>
            {cartItems.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-[13px] space-y-2">
                <ShoppingBag className="w-8 h-8 mx-auto text-gray-300" />
                <p>Your order is empty.</p>
                <p className="text-[12px] text-gray-500">Tap [+] on any dish to add.</p>
              </div>
            ) : (
              cartItems.map(({ dish, qty, subtotal }) => (
                <div
                  key={dish.id}
                  className="flex items-center justify-between py-2.5 text-[13px]"
                >
                  <div className="flex-1 pr-2">
                    <span className="font-bold text-gray-900 block leading-tight">
                      {dish.name}{' '}
                      <span className="font-normal text-gray-500 text-[12px]">
                        {dish.chineseName}
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap text-[11.5px] text-gray-500">
                      <span>S${dish.price.toFixed(2)} each</span>
                      {dish.allergens &&
                        dish.allergens.length > 0 &&
                        !dish.allergens.includes('None') && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/70 font-medium">
                            {dish.allergens.join(', ')}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-100 rounded border border-gray-200 h-7">
                      <button
                        onClick={() => onUpdateQty(dish.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-700 active:scale-90 transition-colors cursor-pointer"
                        aria-label={`Decrease ${dish.name} quantity`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center font-bold text-[12px]">{qty}</span>
                      <button
                        onClick={() => onUpdateQty(dish.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-700 active:scale-90 transition-colors cursor-pointer"
                        aria-label={`Increase ${dish.name} quantity`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900 w-16 text-right font-epilogue">
                      S${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal Footer / Order Confirmation CTAs */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
          {/* Subtotal & Delivery Fee Breakdown */}
          <div className="space-y-1 text-xs text-gray-600 px-1">
            <div className="flex justify-between">
              <span>Food Subtotal</span>
              <span className="font-medium font-epilogue">S${foodSubtotal.toFixed(2)}</span>
            </div>
            {diningMode === 'delivery' && (
              <div className="flex justify-between">
                <span>Delivery Fee (~{deliveryCalc.distanceKm} km)</span>
                <span className="font-medium font-epilogue text-[#C61E28]">
                  {deliveryCalc.isFreeDelivery ? 'FREE' : `S$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center text-gray-900 font-bold text-[16px] pt-1 border-t border-gray-200">
              <span>Total Amount</span>
              <span className="text-[#C61E28] text-[19px] font-epilogue font-bold">
                S${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Order directly in-app with Firestore Sync */}
          <button
            onClick={handleConfirmAndTrack}
            disabled={cartItems.length === 0}
            className={`w-full py-3 px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              cartItems.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#C61E28] hover:bg-red-800 text-white active:scale-98'
            }`}
          >
            <ShoppingBag className="w-4 h-4 font-bold" />
            {diningMode === 'dine_in'
              ? 'Send Dine-In Order to Kitchen'
              : diningMode === 'takeaway'
              ? 'Confirm Takeaway & Self-Pickup'
              : 'Confirm & Dispatch Delivery'}
          </button>

          {/* Send via WhatsApp */}
          <button
            onClick={handleWhatsAppOrder}
            disabled={cartItems.length === 0}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              cartItems.length === 0
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-[#25D366] text-emerald-700 hover:bg-emerald-50 active:scale-98'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            Send Order via WhatsApp Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
