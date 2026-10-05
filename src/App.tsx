import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { BookingsView } from './components/BookingsView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { DeliveryAnalysisView } from './components/DeliveryAnalysisView';
import { StickyOrderBar } from './components/StickyOrderBar';
import { BottomNav } from './components/BottomNav';
import { CartModal } from './components/CartModal';
import { DISHES } from './data/dishes';
import { getInitialPastOrders } from './data/pastOrders';
import { ActiveTab, Dish, PlacedOrder, DiningMode, DeliveryDetails, TakeawayDetails } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { db } from './firebase';
import { doc, setDoc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { AuthModal } from './components/AuthModal';
import { GeminiChatModal } from './components/GeminiChatModal';
import { GeminiChatFloatingButton } from './components/GeminiChatFloatingButton';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { QRTableScannerModal } from './components/QRTableScannerModal';
import { ReactNativeExportModal } from './components/ReactNativeExportModal';
import { DeployMobileModal } from './components/DeployMobileModal';
import { NativePushNotification, PushNotificationPayload } from './components/NativePushNotification';
import { playNativeSound, triggerHaptic } from './utils/nativeSensors';

function AppContent() {
  const { currentUser, userProfile } = useAuth();

  // Cart state: begins empty unless items are actively added by the user
  const [cart, setCart] = useState<{ [dishId: number]: number }>(() => {
    try {
      const saved = localStorage.getItem('koksen_cart_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [tableNumber, setTableNumber] = useState('04');

  // Mobile Native Features State
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isReactNativeExportOpen, setIsReactNativeExportOpen] = useState(false);
  const [isDeployMobileOpen, setIsDeployMobileOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<PushNotificationPayload | null>(null);

  // Past Orders history
  const [pastOrders, setPastOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('koksen_orders_history_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((o: any) => ({
            ...o,
            createdAt: new Date(o.createdAt),
            review: o.review
              ? { ...o.review, submittedAt: new Date(o.review.submittedAt) }
              : undefined,
          }));
        }
      }
    } catch {
      // Fallback
    }
    return getInitialPastOrders();
  });

  // Active Order for Dynamic Island Live Activity
  const activeOrder = useMemo(() => {
    return pastOrders.find((o) => o.status === 'received' || o.status === 'preparing' || o.status === 'ready');
  }, [pastOrders]);

  // Listen to Firestore orders when user is logged in
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
      console.warn('Firestore orders sync listener not active:', err);
    }
  }, [currentUser]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('koksen_cart_v2', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Persist pastOrders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('koksen_orders_history_v2', JSON.stringify(pastOrders));
    } catch {
      // Ignore
    }
  }, [pastOrders]);

  // Total count of items in cart
  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  // Total price of items in cart
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

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place order handler
  const handlePlaceOrder = async (
    items: { dish: Dish; qty: number }[],
    table: string,
    total: number,
    orderType: DiningMode = 'dine_in',
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
        currentUser?.displayName ||
        'Kok Sen Guest',
      customerPhone:
        deliveryDetails?.recipientPhone ||
        takeawayDetails?.pickupPhone ||
        userProfile?.phone ||
        '',
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
        notes: it.dish.isSpicy ? 'Medium spicy' : undefined,
      })),
    };

    // 1. Sync to Firebase Firestore
    try {
      const docId = orderId.replace(/[^a-zA-Z0-9_-]/g, '');
      await setDoc(doc(db, 'orders', docId), {
        orderId: newOrder.orderId,
        userId: currentUser?.uid || 'guest',
        customerName: newOrder.customerName,
        customerPhone: newOrder.customerPhone,
        orderType: newOrder.orderType,
        tableNumber: newOrder.tableNumber || '',
        deliveryAddress: deliveryDetails?.address || '',
        postalCode: deliveryDetails?.postalCode || '',
        distanceKm: deliveryDetails?.distanceKm || 0,
        deliveryZone: deliveryDetails?.deliveryZone || '',
        deliveryFee: deliveryDetails?.deliveryFee || 0,
        pickupTime: takeawayDetails?.pickupTimeSlot || '',
        subtotal: newOrder.subtotal,
        totalPrice: newOrder.totalPrice,
        status: 'received',
        estimatedMinutes: newOrder.estimatedMinutes,
        specialInstructions: deliveryDetails?.specialInstructions || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Could not save order directly to Firestore:', err);
    }

    // 2. Clear cart
    setCart({});

    // 3. Register in local Orders list
    setPastOrders((prev) => [newOrder, ...prev.filter((o) => o.orderId !== newOrder.orderId)]);

    // 4. Native Sound, Haptic & Push Notification
    playNativeSound('order');
    triggerHaptic('success');

    setActiveNotification({
      id: Date.now().toString(),
      title: `Order #${orderId} Confirmed!`,
      body:
        orderType === 'delivery'
          ? `Dispatched for delivery to ${deliveryDetails?.postalCode || 'your address'}. Est: 45m.`
          : orderType === 'takeaway'
          ? `Kitchen is preparing your pickup for ${takeawayDetails?.pickupTimeSlot || 'soon'}. Est: 25m.`
          : `Wok chef is firing your dishes for Table ${newOrder.tableNumber}. Est: 15m.`,
      time: 'Just now',
      onPress: () => {
        setActiveTab('history');
      },
    });

    // 5. Close cart modal & navigate to Orders view
    setIsCartOpen(false);
    setActiveTab('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-order handler
  const handleOrderAgain = (pastOrder: PlacedOrder) => {
    triggerHaptic('medium');
    playNativeSound('tap');
    setCart((prev) => {
      const updated = { ...prev };
      for (const item of pastOrder.items) {
        updated[item.dish.id] = (updated[item.dish.id] || 0) + item.quantity;
      }
      return updated;
    });
  };

  const handleOpenChat = (prompt?: string) => {
    setChatInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  const handleTableScanned = (scannedTable: string) => {
    setTableNumber(scannedTable);
    setActiveNotification({
      id: Date.now().toString(),
      title: 'Table Connected!',
      body: `Table ${scannedTable} verified. Orders and service requests will be delivered here.`,
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
      <div className="flex-1 flex flex-col bg-[#FAF9F7] text-[#1F2937] relative min-h-full">
        {/* Native Push Notification Toast */}
        <NativePushNotification
          notification={activeNotification}
          onDismiss={() => setActiveNotification(null)}
        />

        {/* Top Header */}
        <Header
          cartCount={totalItems}
          onOpenCart={() => setIsCartOpen(true)}
          onTabChange={handleTabChange}
          onOpenChat={() => handleOpenChat()}
          onOpenQRScanner={() => setIsQRScannerOpen(true)}
          onOpenDeployMobile={() => setIsDeployMobileOpen(true)}
          tableNumber={tableNumber}
        />

        {/* Main View Container */}
        <main className="w-full flex-1 pb-20">
          {activeTab === 'home' && (
            <HomeView
              onTabChange={handleTabChange}
              onAddToCart={handleAddToCart}
              onOpenChat={handleOpenChat}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
              onOpenReactNativeExport={() => setIsReactNativeExportOpen(true)}
              onOpenDeployMobile={() => setIsDeployMobileOpen(true)}
            />
          )}
          {activeTab === 'menu' && (
            <MenuView
              cart={cart}
              onUpdateQty={handleUpdateQty}
              tableNumber={tableNumber}
              onTableNumberChange={setTableNumber}
            />
          )}
          {activeTab === 'delivery' && (
            <DeliveryAnalysisView
              onTabChange={handleTabChange}
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={totalItems}
            />
          )}
          {(activeTab === 'history' || activeTab === 'status') && (
            <OrderHistoryView
              pastOrders={pastOrders}
              onOrderAgain={handleOrderAgain}
              onTabChange={handleTabChange}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}
          {activeTab === 'bookings' && <BookingsView />}
        </main>

        {/* Floating Gemini AI Concierge Trigger Button */}
        <GeminiChatFloatingButton onClick={() => handleOpenChat()} />

        {/* Sticky Order Bar */}
        <StickyOrderBar
          itemCount={totalItems}
          totalPrice={totalPrice}
          onOpenCart={() => setIsCartOpen(true)}
          isVisible={totalItems > 0}
        />

        {/* Cart & Order Review Modal */}
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          tableNumber={tableNumber}
          onPlaceOrder={handlePlaceOrder}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Global Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        {/* Gemini Chatbot Modal */}
        <GeminiChatModal
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setChatInitialPrompt(undefined);
          }}
          initialPrompt={chatInitialPrompt}
        />

        {/* Table QR Scanner Modal */}
        <QRTableScannerModal
          isOpen={isQRScannerOpen}
          onClose={() => setIsQRScannerOpen(false)}
          onTableScanned={handleTableScanned}
          currentTable={tableNumber}
        />

        {/* React Native & Expo Code Exporter Modal */}
        <ReactNativeExportModal
          isOpen={isReactNativeExportOpen}
          onClose={() => setIsReactNativeExportOpen(false)}
        />

        {/* Deploy to Actual Mobile Phone Modal */}
        <DeployMobileModal
          isOpen={isDeployMobileOpen}
          onClose={() => setIsDeployMobileOpen(false)}
        />

        {/* Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          orderCount={pastOrders.length}
          hasActiveOrder={!!activeOrder}
        />
      </div>
    </MobileDeviceFrame>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
