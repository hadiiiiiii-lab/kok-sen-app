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
import { doc, setDoc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { AuthModal } from './components/AuthModal';
import { GeminiChatModal } from './components/GeminiChatModal';
import { GeminiChatFloatingButton } from './components/GeminiChatFloatingButton';

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
            estimatedMinutes: data.estimatedMinutes || 25,
            deliveryDetails: data.deliveryAddress
              ? {
                  recipientName: data.customerName || 'Diner',
                  recipientPhone: data.customerPhone || '',
                  address: data.deliveryAddress,
                  postalCode: data.postalCode || '',
                  distanceKm: data.distanceKm || 0,
                  deliveryZone: data.deliveryZone || 'Zone 1',
                  deliveryFee: data.deliveryFee || 0,
                  isFreeDelivery: data.deliveryFee === 0,
                }
              : undefined,
            takeawayDetails: data.pickupTime
              ? {
                  pickupName: data.customerName || 'Diner',
                  pickupPhone: data.customerPhone || '',
                  pickupTimeSlot: data.pickupTime,
                }
              : undefined,
          });
        });

        if (remoteOrders.length > 0) {
          setPastOrders((prev) => {
            const remoteMap = new Map(remoteOrders.map((o) => [o.orderId, o]));
            const combined = [...remoteOrders];
            prev.forEach((local) => {
              if (!remoteMap.has(local.orderId)) {
                combined.push(local);
              }
            });
            // Sort newest first
            return combined.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          });
        }
      }, (error) => {
        console.warn('Firestore snapshot notice:', error.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Could not attach Firestore listener:', e);
    }
  }, [currentUser]);

  // Persist cart changes
  useEffect(() => {
    try {
      localStorage.setItem('koksen_cart_v2', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Persist order history changes
  useEffect(() => {
    try {
      localStorage.setItem('koksen_orders_history_v2', JSON.stringify(pastOrders));
    } catch {}
  }, [pastOrders]);

  // Calculate cart counts and totals
  const { totalItems, totalPrice } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const [dishIdStr, qty] of Object.entries(cart)) {
      const dish = DISHES.find((d) => d.id === Number(dishIdStr));
      if (dish && qty > 0) {
        count += qty;
        sum += dish.price * qty;
      }
    }
    return { totalItems: count, totalPrice: sum };
  }, [cart]);

  const handleUpdateQty = (dishId: number, delta: number) => {
    setCart((prev) => {
      const current = prev[dishId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [dishId]: next };
    });
  };

  const handleAddToCart = (dish: Dish) => {
    handleUpdateQty(dish.id, 1);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place order handler
  const handlePlaceOrder = async (
    items: { dish: Dish; qty: number; subtotal: number }[],
    table: string,
    total: number,
    orderType: DiningMode = 'dine_in',
    deliveryDetails?: DeliveryDetails,
    takeawayDetails?: TakeawayDetails
  ) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderPrefix = orderType === 'delivery' ? 'DL' : orderType === 'takeaway' ? 'TK' : 'KS';
    const orderId = `#${orderPrefix}-${randomSuffix}`;
    const subtotal = items.reduce((sum, it) => sum + it.subtotal, 0);

    const newOrder: PlacedOrder = {
      orderId,
      userId: currentUser?.uid || 'guest',
      customerName:
        deliveryDetails?.recipientName ||
        takeawayDetails?.pickupName ||
        userProfile?.displayName ||
        'Kok Sen Diner',
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

    // 4. Close cart modal & navigate to Orders view
    setIsCartOpen(false);
    setActiveTab('history');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-order handler
  const handleOrderAgain = (pastOrder: PlacedOrder) => {
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

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1F2937] pb-36 selection:bg-[#C61E28] selection:text-white relative">
      {/* Top Header */}
      <Header
        cartCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onTabChange={handleTabChange}
        onOpenChat={() => handleOpenChat()}
      />

      {/* Main View Container */}
      <main className="w-full">
        {activeTab === 'home' && (
          <HomeView
            onTabChange={handleTabChange}
            onAddToCart={handleAddToCart}
            onOpenChat={handleOpenChat}
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

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
