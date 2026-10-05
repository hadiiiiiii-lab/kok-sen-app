import React from 'react';
import { Home, Utensils, Calendar, Receipt, Bike } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const isOrdersActive = activeTab === 'history' || activeTab === 'status';

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-1 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="max-w-md w-full mx-auto flex justify-around items-center">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-colors active:scale-95 cursor-pointer ${
            activeTab === 'home' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Home tab"
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span
            className={`text-[10.5px] mt-0.5 ${
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
          onClick={() => onTabChange('menu')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-colors active:scale-95 cursor-pointer ${
            activeTab === 'menu' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Menu tab"
        >
          <Utensils
            className={`w-5 h-5 ${activeTab === 'menu' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10.5px] mt-0.5 ${
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
          onClick={() => onTabChange('delivery')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-colors active:scale-95 cursor-pointer ${
            activeTab === 'delivery' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Delivery tab"
        >
          <Bike
            className={`w-5 h-5 ${activeTab === 'delivery' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10.5px] mt-0.5 ${
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
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-colors active:scale-95 cursor-pointer relative ${
            isOrdersActive ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Orders tab"
        >
          <Receipt
            className={`w-5 h-5 ${isOrdersActive ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10.5px] mt-0.5 ${
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
          onClick={() => onTabChange('bookings')}
          className={`flex flex-col items-center justify-center py-1 flex-1 transition-colors active:scale-95 cursor-pointer ${
            activeTab === 'bookings' ? 'text-[#C61E28]' : 'text-gray-500 hover:text-[#C61E28]'
          }`}
          aria-label="Bookings tab"
        >
          <Calendar
            className={`w-5 h-5 ${activeTab === 'bookings' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span
            className={`text-[10.5px] mt-0.5 ${
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
