import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { X, Plus, Minus, Utensils, Bike, ShoppingBag, Clock, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { DISHES, RESTAURANT_INFO } from '../data/dishes';
import { DiningMode, DeliveryDetails, TakeawayDetails, Dish } from '../types';
import { calculateDeliveryFee } from '../utils/deliveryEngine';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [dishId: number]: number };
  onUpdateQty: (dishId: number, delta: number) => void;
  tableNumber: string;
  onPlaceOrder: (
    items: { dish: Dish; qty: number }[],
    table: string,
    total: number,
    orderType: DiningMode,
    deliveryDetails?: DeliveryDetails,
    takeawayDetails?: TakeawayDetails
  ) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  tableNumber,
  onPlaceOrder,
}) => {
  const [mode, setMode] = useState<DiningMode>('dine_in');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('089112');
  const [pickupSlot, setPickupSlot] = useState('In 20 mins');

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => ({
      dish: DISHES.find((d) => d.id === Number(id))!,
      qty,
    }))
    .filter((e) => e.dish && e.qty > 0);

  const subtotal = cartEntries.reduce((sum, it) => sum + it.dish.price * it.qty, 0);

  const deliveryCalc = mode === 'delivery' ? calculateDeliveryFee(postalCode, subtotal) : null;
  const deliveryFee = deliveryCalc ? deliveryCalc.fee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cartEntries.length === 0) return;

    let deliveryDetails: DeliveryDetails | undefined;
    if (mode === 'delivery') {
      deliveryDetails = {
        recipientName: recipientName || 'Kok Sen Diner',
        recipientPhone: recipientPhone || '+65 9123 4567',
        address: address || '4 Keong Saik Road',
        postalCode: postalCode || '089112',
        distanceKm: deliveryCalc?.distanceKm || 3.5,
        deliveryZone: deliveryCalc?.zone || 'Zone 1',
        deliveryFee,
        isFreeDelivery: deliveryFee === 0,
      };
    }

    let takeawayDetails: TakeawayDetails | undefined;
    if (mode === 'takeaway') {
      takeawayDetails = {
        pickupName: recipientName || 'Kok Sen Diner',
        pickupPhone: recipientPhone || '+65 9123 4567',
        pickupTimeSlot: pickupSlot,
        needCutlery: true,
      };
    }

    onPlaceOrder(cartEntries, tableNumber, grandTotal, mode, deliveryDetails, takeawayDetails);
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Review Order & Dining Mode</Text>
              <Text style={styles.headerSub}>Kok Sen Restaurant 國成菜館</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            {/* Dining Mode Selector */}
            <View style={styles.modeTabs}>
              <TouchableOpacity
                style={[styles.modeTab, mode === 'dine_in' && styles.modeTabActive]}
                onPress={() => {
                  triggerHaptic('light');
                  setMode('dine_in');
                }}
              >
                <Utensils size={14} color={mode === 'dine_in' ? '#FFFFFF' : '#4B5563'} />
                <Text style={[styles.modeTabText, mode === 'dine_in' && styles.modeTabTextActive]}>
                  Dine-In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modeTab, mode === 'takeaway' && styles.modeTabActive]}
                onPress={() => {
                  triggerHaptic('light');
                  setMode('takeaway');
                }}
              >
                <ShoppingBag size={14} color={mode === 'takeaway' ? '#FFFFFF' : '#4B5563'} />
                <Text style={[styles.modeTabText, mode === 'takeaway' && styles.modeTabTextActive]}>
                  Takeaway
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modeTab, mode === 'delivery' && styles.modeTabActive]}
                onPress={() => {
                  triggerHaptic('light');
                  setMode('delivery');
                }}
              >
                <Bike size={14} color={mode === 'delivery' ? '#FFFFFF' : '#4B5563'} />
                <Text style={[styles.modeTabText, mode === 'delivery' && styles.modeTabTextActive]}>
                  Delivery
                </Text>
              </TouchableOpacity>
            </View>

            {/* Mode Specific Inputs */}
            {mode === 'dine_in' && (
              <View style={styles.noticeBox}>
                <Text style={styles.noticeTitle}>Table {tableNumber} (Kok Sen Hall)</Text>
                <Text style={styles.noticeText}>
                  Your dishes will be served directly to Table {tableNumber} fresh from charcoal woks.
                </Text>
              </View>
            )}

            {mode === 'takeaway' && (
              <View style={styles.formSection}>
                <Text style={styles.inputLabel}>Pickup Contact Name:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Alex Tan"
                  placeholderTextColor="#9CA3AF"
                  value={recipientName}
                  onChangeText={setRecipientName}
                />
                <Text style={styles.inputLabel}>Pickup Slot:</Text>
                <View style={styles.slotRow}>
                  {['In 20 mins', 'In 35 mins', 'In 50 mins'].map((slot) => (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.slotPill, pickupSlot === slot && styles.slotPillActive]}
                      onPress={() => setPickupSlot(slot)}
                    >
                      <Text style={[styles.slotPillText, pickupSlot === slot && styles.slotPillTextActive]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {mode === 'delivery' && (
              <View style={styles.formSection}>
                <Text style={styles.inputLabel}>Recipient Name & Mobile:</Text>
                <View style={styles.rowInputs}>
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    placeholder="Name"
                    placeholderTextColor="#9CA3AF"
                    value={recipientName}
                    onChangeText={setRecipientName}
                  />
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    placeholder="Mobile (+65)"
                    placeholderTextColor="#9CA3AF"
                    value={recipientPhone}
                    onChangeText={setRecipientPhone}
                    keyboardType="phone-pad"
                  />
                </View>

                <Text style={styles.inputLabel}>Delivery Street Address:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Street and building name..."
                  placeholderTextColor="#9CA3AF"
                  value={address}
                  onChangeText={setAddress}
                />

                <Text style={styles.inputLabel}>Singapore Postal Code:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 089112"
                  placeholderTextColor="#9CA3AF"
                  value={postalCode}
                  onChangeText={setPostalCode}
                  keyboardType="numeric"
                  maxLength={6}
                />
              </View>
            )}

            {/* Cart Items List */}
            <Text style={styles.itemsHeader}>Order Items ({cartEntries.length})</Text>
            {cartEntries.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is currently empty.</Text>
            ) : (
              <View style={styles.itemsList}>
                {cartEntries.map(({ dish, qty }) => (
                  <View key={dish.id} style={styles.itemRow}>
                    <View style={styles.itemLeft}>
                      <Text style={styles.itemName}>{dish.name}</Text>
                      <Text style={styles.itemPrice}>S${dish.price.toFixed(2)} each</Text>
                    </View>
                    <View style={styles.qtyControlRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => onUpdateQty(dish.id, -1)}
                      >
                        <Minus size={12} color="#C61E28" />
                      </TouchableOpacity>
                      <Text style={styles.qtyVal}>{qty}</Text>
                      <TouchableOpacity
                        style={[styles.qtyBtn, styles.qtyBtnPlus]}
                        onPress={() => onUpdateQty(dish.id, 1)}
                      >
                        <Plus size={12} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Subtotal & Delivery Summary */}
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>S${subtotal.toFixed(2)}</Text>
              </View>
              {mode === 'delivery' && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee ({deliveryCalc?.zone || 'Zone 1'})</Text>
                  <Text style={styles.summaryValue}>
                    {deliveryFee === 0 ? 'FREE' : `S$${deliveryFee.toFixed(2)}`}
                  </Text>
                </View>
              )}
              <View style={[styles.summaryRow, styles.grandTotalRow]}>
                <Text style={styles.grandTotalLabel}>Total Amount</Text>
                <Text style={styles.grandTotalValue}>S${grandTotal.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.placeOrderBtn, cartEntries.length === 0 && styles.placeOrderBtnDisabled]}
              onPress={handleCheckout}
              disabled={cartEntries.length === 0}
              activeOpacity={0.8}
            >
              <Text style={styles.placeOrderBtnText}>
                Confirm Order • S${grandTotal.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  headerSub: {
    fontSize: 11,
    color: '#6B7280',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  scrollBody: {
    padding: 16,
    gap: 12,
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 3,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 5,
  },
  modeTabActive: {
    backgroundColor: '#C61E28',
  },
  modeTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
  },
  noticeBox: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  noticeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C61E28',
  },
  noticeText: {
    fontSize: 10.5,
    color: '#4B5563',
    marginTop: 2,
  },
  formSection: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  inputLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#374151',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
    fontSize: 11.5,
    color: '#111827',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  slotRow: {
    flexDirection: 'row',
    gap: 6,
  },
  slotPill: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  slotPillActive: {
    backgroundColor: '#C61E28',
    borderColor: '#C61E28',
  },
  slotPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4B5563',
  },
  slotPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  itemsHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  emptyCartText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  itemsList: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  itemPrice: {
    fontSize: 10.5,
    color: '#6B7280',
  },
  qtyControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnPlus: {
    backgroundColor: '#C61E28',
  },
  qtyVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
    minWidth: 18,
    textAlign: 'center',
  },
  summaryBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 4,
    marginTop: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#4B5563',
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 6,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  grandTotalValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#C61E28',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  placeOrderBtn: {
    backgroundColor: '#C61E28',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  placeOrderBtnDisabled: {
    backgroundColor: '#D1D5DB',
  },
  placeOrderBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
