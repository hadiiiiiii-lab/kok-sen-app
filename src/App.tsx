import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NativeHeader } from './components/native/NativeHeader';
import { NativeTabBar } from './components/native/NativeTabBar';
import { HomeScreen } from './screens/HomeScreen';
import { MenuScreen } from './screens/MenuScreen';
import { DeliveryScreen } from './screens/DeliveryScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { BookingsScreen } from './screens/BookingsScreen';
import { CartModal } from './screens/CartModal';
import { AuthModal } from './screens/AuthModal';
import { QRTableScannerModal } from './components/QRTableScannerModal';
import { DeployMobileModal } from './components/DeployMobileModal';
import { ReactNativeExportModal } from './components/ReactNativeExportModal';
import { GeminiChatModal } from './components/GeminiChatModal';
import { GeminiChatFloatingButton } from './components/GeminiChatFloatingButton';
import { NativePushNotification, PushNotificationPayload } from './components/NativePushNotification';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { ActiveTab, Dish, PlacedOrder, DiningMode, DeliveryDetails, TakeawayDetails } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { db } from './firebase';
import { doc, setDoc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { DISHES } from './data/dishes';
import { getInitialPastOrders } from './data/pastOrders';
import { playNativeSound, triggerHaptic } from './utils/nativeSensors';

function AppContent() {
  const { currentUser, userProfile } = useAuth();

  // Cart state: dishId -> quantity
  const [cart, setCart] = useState<{ [dishId: number]: number }>(() => {
    try {
      const saved = localStorage.getItem('koksen_cart_v3');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isDeployMobileOpen, setIsDeployMobileOpen] = useState(false);
  const [isReactNativeExportOpen, setIsReactNativeExportOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('04');
  const [activeNotification, setActiveNotification] = useState<PushNotificationPayload | null>(null);

  // Past Orders history
  const [pastOrders, setPastOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('koksen_orders_history_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((o: any) => ({
            ...o,
            createdAt: new Date(o.createdAt),
          }));
        }
      }
    } catch {
      // Fallback
    }
    return getInitialPastOrders();
  });

  // Active Order for Dynamic Island / Notification
  const activeOrder = useMemo(() => {
    return pastOrders.find(
      (o) => o.status === 'received' || o.status === 'preparing' || o.status === 'ready'
    );
  }, [pastOrders]);

  // Sync to Firestore
  useEffect(() => {
    if (!currentUser) return;
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const remoteOrders: PlacedOrder[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          remoteOrders.push({
            orderId: data.orderId || `#KS-${d.id.slice(0, 4)}`,
            userId: data.userId,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            orderType: data.orderType || 'dine_in',
            tableNumber: data.tableNumber || '04',
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
            status: data.status || 'received',
            items: data.items || [],
            subtotal: data.subtotal || data.totalPrice || 0,
            deliveryFee: data.deliveryFee || 0,
            totalPrice: data.totalPrice || 0,
            estimatedMinutes: data.estimatedMinutes || 20,
            deliveryDetails: data.deliveryAddress
              ? {
                  address: data.deliveryAddress,
                  postalCode: data.postalCode || '',
                  distanceKm: data.distanceKm || 0,
                  deliveryZone: data.deliveryZone || '',
                  deliveryFee: data.deliveryFee || 0,
                  isFreeDelivery: Boolean(data.deliveryFee === 0),
                  recipientName: data.customerName || '',
                  recipientPhone: data.customerPhone || '',
                  specialInstructions: data.specialInstructions || '',
                }
              : undefined,
            takeawayDetails: data.pickupTime
              ? {
                  pickupTimeSlot: data.pickupTime,
                  pickupName: data.customerName || '',
                  pickupPhone: data.customerPhone || '',
                  needCutlery: true,
                }
              : undefined,
          });
        });

        if (remoteOrders.length > 0) {
          setPastOrders((prev) => {
            const combined = [...remoteOrders];
            for (const p of prev) {
              if (!combined.some((r) => r.orderId === p.orderId)) {
                combined.push(p);
              }
            }
            return combined.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          });
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore listener error:', err);
    }
  }, [currentUser]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('koksen_cart_v3', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('koksen_orders_history_v3', JSON.stringify(pastOrders));
    } catch {}
  }, [pastOrders]);

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return Object.entries(cart).reduce((sum, [dishIdStr, qty]) => {
      const dish = DISHES.find((d) => d.id === Number(dishIdStr));
      return sum + (dish ? dish.price * qty : 0);
    }, 0);
  }, [cart]);

  const handleUpdateQty = (dishId: number, delta: number) => {
    triggerHaptic('light');
    playNativeSound('tap');
    setCart((prev) => {
      const current = prev[dishId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[dishId];
        return copy;
      }
      return { ...prev, [dishId]: next };
    });
  };

  const handleAddToCart = (dish: Dish) => {
    triggerHaptic('medium');
    playNativeSound('tap');
    handleUpdateQty(dish.id, 1);
  };

  const handlePlaceOrder = async (
    items: { dish: Dish; qty: number }[],
    table: string,
    total: number,
    orderType: DiningMode,
    deliveryDetails?: DeliveryDetails,
    takeawayDetails?: TakeawayDetails
  ) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `KS-${randomSuffix}`;
    const subtotal = items.reduce((acc, it) => acc + it.dish.price * it.qty, 0);

    const newOrder: PlacedOrder = {
      orderId,
      userId: currentUser?.uid,
      customerName:
        deliveryDetails?.recipientName ||
        takeawayDetails?.pickupName ||
        userProfile?.displayName ||
        'Kok Sen Diner',
      customerPhone:
        deliveryDetails?.recipientPhone ||
        takeawayDetails?.pickupPhone ||
        userProfile?.phone ||
        '+65 9123 4567',
      orderType,
      tableNumber: orderType === 'dine_in' ? (table || tableNumber || '04') : undefined,
      createdAt: new Date(),
      status: 'received',
      subtotal,
      deliveryFee: deliveryDetails?.deliveryFee || 0,
      totalPrice: total,
      estimatedMinutes: orderType === 'delivery' ? 45 : orderType === 'takeaway' ? 25 : 15,
      deliveryDetails,
      takeawayDetails,
      items: items.map((it) => ({
        dish: it.dish,
        quantity: it.qty,
        selectedSize: 'S',
        itemPrice: it.dish.price,
      })),
    };

    // Save to Firestore
    try {
      const docId = orderId.replace(/[^a-zA-Z0-9_-]/g, '');
      await setDoc(doc(db, 'orders', docId), {
        orderId: newOrder.orderId,
        userId: currentUser?.uid || 'guest',
        customerName: newOrder.customerName,
        customerPhone: newOrder.customerPhone,
        orderType: newOrder.orderType,
        tableNumber: newOrder.tableNumber || '',
        subtotal: newOrder.subtotal,
        deliveryFee: newOrder.deliveryFee || 0,
        totalPrice: newOrder.totalPrice,
        status: 'received',
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Firestore write warning:', e);
    }

    setCart({});
    setPastOrders((prev) => [newOrder, ...prev.filter((o) => o.orderId !== newOrder.orderId)]);

    playNativeSound('order');
    triggerHaptic('success');

    setActiveNotification({
      id: Date.now().toString(),
      title: `Order #${orderId} Confirmed!`,
      body:
        orderType === 'delivery'
          ? `Dispatched for delivery to ${deliveryDetails?.postalCode || 'your address'}. Est: 45m.`
          : orderType === 'takeaway'
          ? `Self-pickup scheduled for ${takeawayDetails?.pickupTimeSlot || '25 mins'}.`
          : `Wok chef is firing dishes for Table ${newOrder.tableNumber}.`,
      time: 'Just now',
    });

    setIsCartOpen(false);
    setActiveTab('history');
  };

  const handleTableScanned = (scannedTable: string) => {
    setTableNumber(scannedTable);
    setActiveNotification({
      id: Date.now().toString(),
      title: 'Table Connected!',
      body: `Table ${scannedTable} verified via camera QR scan.`,
      time: 'Just now',
    });
  };

  return (
    <MobileDeviceFrame
      activeOrder={activeOrder}
      onOpenOrder={() => setActiveTab('history')}
      onOpenQRScanner={() => setIsQRScannerOpen(true)}
      onOpenReactNativeExport={() => setIsReactNativeExportOpen(true)}
      onOpenDeployMobile={() => setIsDeployMobileOpen(true)}
      tableNumber={tableNumber}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        {/* Native Push Notification Toast */}
        <NativePushNotification
          notification={activeNotification}
          onDismiss={() => setActiveNotification(null)}
        />

        {/* Native App Header */}
        <NativeHeader
          cartCount={totalItems}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenQRScanner={() => setIsQRScannerOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogoPress={() => setActiveTab('home')}
          tableNumber={tableNumber}
          isLoggedIn={!!currentUser}
          username={userProfile?.username}
        />

        {/* Screens View Container */}
        <View style={styles.screenContainer}>
          {activeTab === 'home' && (
            <HomeScreen
              onTabChange={setActiveTab}
              onAddToCart={handleAddToCart}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
              onOpenChat={() => setIsChatOpen(true)}
            />
          )}

          {activeTab === 'menu' && (
            <MenuScreen
              cart={cart}
              onUpdateQty={handleUpdateQty}
              tableNumber={tableNumber}
              onTableNumberChange={setTableNumber}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
            />
          )}

          {activeTab === 'delivery' && (
            <DeliveryScreen
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={totalItems}
            />
          )}

          {(activeTab === 'history' || activeTab === 'status') && (
            <OrdersScreen
              orders={pastOrders}
              onOrderAgain={(order) => {
                setCart((prev) => {
                  const updated = { ...prev };
                  for (const it of order.items) {
                    updated[it.dish.id] = (updated[it.dish.id] || 0) + it.quantity;
                  }
                  return updated;
                });
              }}
              onTabChange={setActiveTab}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {activeTab === 'bookings' && <BookingsScreen />}
        </View>

        {/* Floating AI Concierge Button */}
        <GeminiChatFloatingButton onClick={() => setIsChatOpen(true)} />

        {/* Native Bottom Tab Navigation */}
        <NativeTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orderCount={pastOrders.length}
          hasActiveOrder={!!activeOrder}
        />

        {/* Modals */}
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          tableNumber={tableNumber}
          onPlaceOrder={handlePlaceOrder}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />

        <QRTableScannerModal
          isOpen={isQRScannerOpen}
          onClose={() => setIsQRScannerOpen(false)}
          onTableScanned={handleTableScanned}
          currentTable={tableNumber}
        />

        <GeminiChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        <ReactNativeExportModal
          isOpen={isReactNativeExportOpen}
          onClose={() => setIsReactNativeExportOpen(false)}
        />

        <DeployMobileModal
          isOpen={isDeployMobileOpen}
          onClose={() => setIsDeployMobileOpen(false)}
        />
      </SafeAreaView>
    </MobileDeviceFrame>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
});

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
