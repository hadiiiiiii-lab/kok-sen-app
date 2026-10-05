import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Sparkles, Check, ShieldAlert } from 'lucide-react';
import { Dish } from '../types';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, size?: 'S' | 'M' | 'L', notes?: string) => void;
  currentQty: number;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  currentQty,
}) => {
  if (!dish) return null;

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('S');
  const [spicePreference, setSpicePreference] = useState<'normal' | 'less' | 'extra'>('normal');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState('');

  // Determine current price based on size
  const activePrice =
    dish.portionOptions && dish.portionOptions.length > 0
      ? dish.portionOptions.find((p) => p.size === selectedSize)?.price || dish.price
      : dish.price;

  const dietaryOptions = ['No Coriander', 'No Pork Lard', 'Sauce On Side', 'Less Oil'];

  const toggleDietary = (option: string) => {
    setSelectedDietary((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleConfirm = () => {
    const combinedNotes = [
      spicePreference !== 'normal' ? `${spicePreference} spicy` : '',
      ...selectedDietary,
      customNote.trim(),
    ]
      .filter(Boolean)
      .join(', ');

    onAddToCart(dish, selectedSize, combinedNotes);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto bg-white rounded-t-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Close Button */}
        <div className="relative h-48 w-full bg-gray-100 shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
          {dish.badge && (
            <span className="absolute top-3 left-3 bg-[#C61E28] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {dish.badge}
            </span>
          )}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="font-epilogue text-[20px] font-bold leading-tight drop-shadow-sm">
              {dish.name}
            </h3>
            <span className="text-[13px] text-gray-200 font-medium drop-shadow-sm">
              {dish.chineseName}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Description & Price */}
          <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
            <p className="text-[13px] text-gray-600 leading-relaxed max-w-[70%]">
              {dish.description}
            </p>
            <span className="font-epilogue text-[20px] font-extrabold text-[#C61E28]">
              S${activePrice.toFixed(2)}
            </span>
          </div>

          {/* Allergen Information */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-950 font-bold text-[12px]">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Allergen Information (过敏原说明)</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-700">
                {dish.allergens && dish.allergens.length > 0 && !dish.allergens.includes('None')
                  ? `${dish.allergens.length} Declared`
                  : 'Allergen-Free'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {dish.allergens && dish.allergens.length > 0 ? (
                dish.allergens.map((allergen) => {
                  const isNone = allergen.startsWith('None');
                  return (
                    <span
                      key={allergen}
                      className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                        isNone
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white text-amber-900 border border-amber-300 shadow-2xs'
                      }`}
                    >
                      {allergen}
                    </span>
                  );
                })
              ) : (
                <span className="text-[11px] text-gray-500">None declared</span>
              )}
            </div>
            <p className="text-[10.5px] text-amber-800/85 leading-tight">
              Food prepared in an open wok kitchen where allergens may be present. Alert staff of severe allergies.
            </p>
          </div>

          {/* Portion Sizing Selection (If available) */}
          {dish.portionOptions && dish.portionOptions.length > 0 && (
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2">
                Select Portion Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {dish.portionOptions.map((opt) => {
                  const isSelected = selectedSize === opt.size;
                  return (
                    <button
                      key={opt.size}
                      type="button"
                      onClick={() => setSelectedSize(opt.size)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C61E28] bg-red-50 text-[#C61E28] font-bold shadow-xs'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[13px] block">{opt.label}</span>
                      <span className="text-[12px] font-bold block mt-0.5">
                        S${opt.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spiciness Level Preference */}
          {dish.isSpicy && (
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                Spiciness Adjustment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['less', 'normal', 'extra'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpicePreference(lvl)}
                    className={`py-2 px-3 rounded-lg text-[12px] capitalize font-semibold border transition-all cursor-pointer ${
                      spicePreference === lvl
                        ? 'border-[#C61E28] bg-red-50 text-[#C61E28]'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    {lvl === 'less' ? 'Mild Spicy' : lvl === 'normal' ? 'Regular' : 'Extra Spicy 🔥'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Dietary Requests */}
          <div>
            <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2">
              Dietary Preferences
            </label>
            <div className="flex flex-wrap gap-1.5">
              {dietaryOptions.map((opt) => {
                const checked = selectedDietary.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleDietary(opt)}
                    className={`px-3 py-1.5 rounded-lg text-[11.5px] font-medium border flex items-center gap-1 transition-all cursor-pointer ${
                      checked
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3 text-white" />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Kitchen Note */}
          <div>
            <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1">
              Special Instructions for Wok Master
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Extra burnt wok-hei, separate gravy..."
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-900 focus:outline-none focus:border-[#C61E28]"
            />
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-[#C61E28] hover:bg-red-800 text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 font-bold" />
            Add to Order • S${activePrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};
