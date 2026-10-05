import React from 'react';
import { Receipt, ChevronUp } from 'lucide-react';

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
    <div className="fixed bottom-16 left-0 w-full z-40 px-4 pb-2 transition-transform duration-200 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full bg-[#C61E28] hover:bg-red-800 text-white px-4 py-3.5 rounded-xl shadow-xl active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 font-bold" />
            <span className="text-[14px] font-extrabold tracking-wide font-epilogue">
              {itemCount > 0
                ? `${itemCount} item${itemCount === 1 ? '' : 's'} | S$${totalPrice.toFixed(2)}`
                : 'Cart empty | S$0.00'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[13px] uppercase tracking-wider font-bold">Review Order</span>
            <ChevronUp className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
};
