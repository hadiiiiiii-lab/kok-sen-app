import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Receipt,
  Clock,
  CheckCircle2,
  Flame,
  RotateCcw,
  Bike,
  ShoppingBag,
  Utensils,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { PlacedOrder, ActiveTab } from '../types';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface OrdersScreenProps {
  orders: PlacedOrder[];
  onOrderAgain: (order: PlacedOrder) => void;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCart: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onOrderAgain,
  onTabChange,
  onOpenCart,
}) => {
  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Receipt size={36} color="#9CA3AF" />
        </View>
        <Text style={styles.emptyTitle}>No Orders Yet</Text>
        <Text style={styles.emptySubtitle}>
          Order delicious Zi Char for dine-in, takeaway, or islandwide delivery.
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => onTabChange('menu')}
          activeOpacity={0.8}
        >
          <Text style={styles.browseButtonText}>Explore Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.screenTitle}>Your Orders & History</Text>
      <Text style={styles.screenSubtitle}>
        Live status and past receipts from Kok Sen Restaurant
      </Text>

      {orders.map((order) => {
        const isLive =
          order.status === 'received' ||
          order.status === 'preparing' ||
          order.status === 'ready';

        return (
          <View key={order.orderId} style={[styles.orderCard, isLive && styles.orderCardLive]}>
            {/* Header */}
            <View style={styles.orderHeader}>
              <View>
                <View style={styles.orderIdRow}>
                  <Text style={styles.orderId}>{order.orderId}</Text>
                  <View
                    style={[
                      styles.modeBadge,
                      {
                        backgroundColor:
                          order.orderType === 'delivery'
                            ? '#ECFDF5'
                            : order.orderType === 'takeaway'
                            ? '#FFFBEB'
                            : '#FEF2F2',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modeBadgeText,
                        {
                          color:
                            order.orderType === 'delivery'
                              ? '#059669'
                              : order.orderType === 'takeaway'
                              ? '#B45309'
                              : '#C61E28',
                        },
                      ]}
                    >
                      {order.orderType === 'delivery'
                        ? 'Delivery'
                        : order.orderType === 'takeaway'
                        ? 'Takeaway'
                        : `Table ${order.tableNumber || '04'}`}
                    </Text>
                  </View>
                </View>
                <Text style={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              {/* Status Badge */}
              <View style={[styles.statusBadge, isLive ? styles.statusBadgeActive : styles.statusBadgeDone]}>
                {isLive && <Flame size={12} color="#C61E28" />}
                <Text style={[styles.statusText, isLive ? styles.statusTextActive : styles.statusTextDone]}>
                  {order.status === 'received'
                    ? 'Order Received'
                    : order.status === 'preparing'
                    ? 'Wok Cooking'
                    : order.status === 'ready'
                    ? 'Dishes Ready'
                    : 'Served / Delivered'}
                </Text>
              </View>
            </View>

            {/* Live Progress Bar if active */}
            {isLive && (
              <View style={styles.liveProgressBox}>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width:
                          order.status === 'received'
                            ? '33%'
                            : order.status === 'preparing'
                            ? '66%'
                            : '100%',
                      },
                    ]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabel}>1. Received</Text>
                  <Text style={styles.progressLabel}>2. Firing Wok</Text>
                  <Text style={styles.progressLabel}>3. Ready</Text>
                </View>
              </View>
            )}

            {/* Delivery address or takeaway slot */}
            {order.deliveryDetails && (
              <View style={styles.detailRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.detailText} numberOfLines={1}>
                  Delivering to: {order.deliveryDetails.address} ({order.deliveryDetails.postalCode})
                </Text>
              </View>
            )}

            {order.takeawayDetails && (
              <View style={styles.detailRow}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.detailText}>
                  Pickup Time Slot: {order.takeawayDetails.pickupTimeSlot} at 4 Keong Saik Rd
                </Text>
              </View>
            )}

            {/* Items list */}
            <View style={styles.itemsBox}>
              {order.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.itemName}>
                    {item.quantity}x {item.dish.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    S${(item.itemPrice * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}

              {order.deliveryFee ? (
                <View style={styles.itemRow}>
                  <Text style={styles.feeLabel}>Delivery Fee</Text>
                  <Text style={styles.feeValue}>S${order.deliveryFee.toFixed(2)}</Text>
                </View>
              ) : null}

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Paid</Text>
                <Text style={styles.totalValue}>S${order.totalPrice.toFixed(2)}</Text>
              </View>
            </View>

            {/* Action footer */}
            <View style={styles.orderFooter}>
              <TouchableOpacity
                style={styles.reorderBtn}
                onPress={() => {
                  triggerHaptic('medium');
                  playNativeSound('tap');
                  onOrderAgain(order);
                  onOpenCart();
                }}
                activeOpacity={0.7}
              >
                <RotateCcw size={13} color="#C61E28" />
                <Text style={styles.reorderBtnText}>Order Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  contentContainer: {
    padding: 14,
    paddingBottom: 40,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FAF9F7',
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#C61E28',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },
  screenSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderCardLive: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFFAFA',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  modeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  modeBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  orderDate: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  statusBadgeActive: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  statusBadgeDone: {
    backgroundColor: '#ECFDF5',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTextActive: {
    color: '#C61E28',
  },
  statusTextDone: {
    color: '#059669',
  },
  liveProgressBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#C61E28',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6B7280',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 10.5,
    color: '#4B5563',
    flex: 1,
  },
  itemsBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 8,
    marginVertical: 6,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  itemName: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
  },
  itemPrice: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  feeLabel: {
    fontSize: 10.5,
    color: '#6B7280',
  },
  feeValue: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#374151',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 6,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
  },
  totalValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#C61E28',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 4,
  },
  reorderBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C61E28',
  },
});
