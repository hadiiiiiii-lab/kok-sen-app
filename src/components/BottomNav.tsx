import React from 'react';
import { Home, Utensils, Calendar, Receipt, Bike } from 'lucide-react';
import { ActiveTab } from '../types';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  orderCount?: number;
  hasActiveOrder?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  orderCount = 0,
  hasActiveOrder = false,
}) => {
  const isOrdersActive = activeTab === 'history' || activeTab === 'status';

  const handleTabClick = (tab: ActiveTab) => {
    triggerHaptic('light');
    playNativeSound('tap');
    onTabChange(tab);
  };

  return (
    <nav className="sticky bottom-0 left-0 w-full z-40 flex justify-around items-center h-15 px-1 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="max-w-md w-full mx-auto flex justify-around items-center">
        {/* Tab 1: Home */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'home' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Home tab"
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span
            className={`text-[10px] mt-0.5 ${
              activeTab === 'home' ? 'font-bold text-[#C61E28]' : 'font-medium'
            }`}
          >
            Home
          </span>
          <span
            className={`w-4 h-0.5 rounded-full mt-0.5 transition-all ${
              activeTab === 'home' ? 'bg-[#C61E28]' : 'bg-transparent'
            }`}
          />
        </button>

        {/* Tab 2: Menu */}
        <button
          onClick={() => handleTabClick('menu')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'menu' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Menu tab"
        >
          <Utensils
            className={`w-5 h-5 ${activeTab === 'menu' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10px] mt-0.5 ${
              activeTab === 'menu' ? 'font-bold text-[#C61E28]' : 'font-medium'
            }`}
          >
            Menu
          </span>
          <span
            className={`w-4 h-0.5 rounded-full mt-0.5 transition-all ${
              activeTab === 'menu' ? 'bg-[#C61E28]' : 'bg-transparent'
            }`}
          />
        </button>

        {/* Tab 3: Delivery & Takeaway */}
        <button
          onClick={() => handleTabClick('delivery')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'delivery' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Delivery tab"
        >
          <Bike
            className={`w-5 h-5 ${activeTab === 'delivery' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10px] mt-0.5 ${
              activeTab === 'delivery' ? 'font-bold text-[#C61E28]' : 'font-medium'
            }`}
          >
            Delivery
          </span>
          <span
            className={`w-4 h-0.5 rounded-full mt-0.5 transition-all ${
              activeTab === 'delivery' ? 'bg-[#C61E28]' : 'bg-transparent'
            }`}
          />
        </button>

        {/* Tab 4: Orders */}
        <button
          onClick={() => handleTabClick('history')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-95 cursor-pointer relative ${
            isOrdersActive ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Orders tab"
        >
          <div className="relative">
            <Receipt
              className={`w-5 h-5 ${isOrdersActive ? 'stroke-[2.5]' : 'stroke-2'}`}
            />
            {hasActiveOrder && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            )}
            {orderCount > 0 && !hasActiveOrder && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#C61E28] text-white text-[8px] font-bold flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] mt-0.5 ${
              isOrdersActive ? 'font-bold text-[#C61E28]' : 'font-medium'
            }`}
          >
            Orders
          </span>
          <span
            className={`w-4 h-0.5 rounded-full mt-0.5 transition-all ${
              isOrdersActive ? 'bg-[#C61E28]' : 'bg-transparent'
            }`}
          />
        </button>

        {/* Tab 5: Bookings */}
        <button
          onClick={() => handleTabClick('bookings')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'bookings' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Bookings tab"
        >
          <Calendar
            className={`w-5 h-5 ${activeTab === 'bookings' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10px] mt-0.5 ${
              activeTab === 'bookings' ? 'font-bold text-[#C61E28]' : 'font-medium'
            }`}
          >
            Bookings
          </span>
          <span
            className={`w-4 h-0.5 rounded-full mt-0.5 transition-all ${
              activeTab === 'bookings' ? 'bg-[#C61E28]' : 'bg-transparent'
            }`}
          />
        </button>
      </div>
    </nav>
  );
};
