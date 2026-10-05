import React from 'react';
import { Receipt, ChevronUp } from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface StickyOrderBarProps {
  itemCount: number;
  totalPrice: number;
  onOpenCart: () => void;
  isVisible: boolean;
}

export const StickyOrderBar: React.FC<StickyOrderBarProps> = ({
  itemCount,
  totalPrice,
  onOpenCart,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="sticky bottom-16 inset-x-0 w-full z-30 px-3 pb-2 transition-transform duration-200 pointer-events-none mt-auto">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => {
            triggerHaptic('medium');
            playNativeSound('tap');
            onOpenCart();
          }}
          className="w-full bg-[#C61E28] hover:bg-red-800 text-white px-4 py-3 rounded-xl shadow-xl active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer border border-red-400/20"
        >
          <div className="flex items-center gap-2">
            <Receipt className="w-4.5 h-4.5 font-bold" />
            <span className="text-[13.5px] font-extrabold tracking-wide font-epilogue">
              {itemCount > 0
                ? `${itemCount} item${itemCount === 1 ? '' : 's'} • S$${totalPrice.toFixed(2)}`
                : 'Cart empty • S$0.00'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[12px] uppercase tracking-wider font-bold">Review Order</span>
            <ChevronUp className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
};
