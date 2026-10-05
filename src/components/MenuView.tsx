import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  Plus,
  Minus,
  Flame,
  UtensilsCrossed,
  Sparkles,
  Fish,
  Salad,
  Soup,
  Coffee,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { DISHES, MENU_SECTIONS, RESTAURANT_INFO } from '../data/dishes';
import { Dish, MenuCategory } from '../types';
import { DishDetailModal } from './DishDetailModal';

interface MenuViewProps {
  cart: { [dishId: number]: number };
  onUpdateQty: (dishId: number, delta: number) => void;
  tableNumber: string;
  onTableNumberChange: (table: string) => void;
  onAddToCartWithOptions?: (dish: Dish, size?: 'S' | 'M' | 'L', notes?: string) => void;
}

const POPULAR_SEARCH_CHIPS = [
  'Big Prawn',
  'Yong Tau Foo',
  'Har Cheong Gai',
  'Hor Fun',
  'Pork Ribs',
  'Barley',
];

export const MenuView: React.FC<MenuViewProps> = ({
  cart,
  onUpdateQty,
  tableNumber,
  onTableNumberChange,
  onAddToCartWithOptions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [allergenExclusion, setAllergenExclusion] = useState<string>('all');
  const [isEditingTable, setIsEditingTable] = useState(false);
  const [tempTable, setTempTable] = useState(tableNumber);
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null);

  // Total matching dishes across the entire menu regardless of active category
  const totalMatchesAllCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return DISHES.length;
    return DISHES.filter(
      (dish) =>
        dish.name.toLowerCase().includes(q) ||
        dish.chineseName.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        (dish.badge && dish.badge.toLowerCase().includes(q)) ||
        (dish.allergens && dish.allergens.some((a) => a.toLowerCase().includes(q)))
    ).length;
  }, [searchQuery]);

  // Filter dishes by search, category, and allergen exclusion
  const filteredDishes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DISHES.filter((dish) => {
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.chineseName.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        (dish.badge && dish.badge.toLowerCase().includes(q)) ||
        (dish.allergens && dish.allergens.some((a) => a.toLowerCase().includes(q)));

      const matchesCat =
        selectedCategory === 'all' ||
        dish.category === selectedCategory ||
        dish.secondaryCategory === selectedCategory;

      const matchesAllergen =
        allergenExclusion === 'all' ||
        (allergenExclusion === 'None'
          ? dish.allergens && dish.allergens.some((a) => a.startsWith('None'))
          : !dish.allergens || !dish.allergens.includes(allergenExclusion));

      return matchesSearch && matchesCat && matchesAllergen;
    });
  }, [selectedCategory, searchQuery, allergenExclusion]);

  // Group dishes by section
  const sectionsToRender = useMemo(() => {
    if (selectedCategory !== 'all') {
      const targetSection = MENU_SECTIONS.find((s) => s.id === selectedCategory);
      if (!targetSection) return [];
      const dishes = filteredDishes;
      return dishes.length > 0 ? [{ ...targetSection, dishes }] : [];
    }

    return MENU_SECTIONS.map((section) => {
      const dishes = filteredDishes.filter(
        (dish) =>
          dish.category === section.id ||
          (section.id !== 'signatures' && dish.secondaryCategory === section.id)
      );
      return { ...section, dishes };
    }).filter((section) => section.dishes.length > 0);
  }, [selectedCategory, filteredDishes]);

  const handleDishModalAdd = (dish: Dish, size?: 'S' | 'M' | 'L', notes?: string) => {
    if (onAddToCartWithOptions) {
      onAddToCartWithOptions(dish, size, notes);
    } else {
      onUpdateQty(dish.id, 1);
    }
  };

  const getSectionIcon = (id: MenuCategory) => {
    switch (id) {
      case 'signatures':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'seafood':
        return <Fish className="w-4 h-4 text-blue-500" />;
      case 'meat':
        return <Flame className="w-4 h-4 text-rose-500" />;
      case 'noodles':
        return <UtensilsCrossed className="w-4 h-4 text-amber-600" />;
      case 'vegetables':
        return <Salad className="w-4 h-4 text-emerald-500" />;
      case 'soups':
        return <Soup className="w-4 h-4 text-orange-500" />;
      case 'drinks':
        return <Coffee className="w-4 h-4 text-teal-600" />;
      default:
        return <UtensilsCrossed className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <section className="max-w-md mx-auto space-y-3 pb-8 animate-in fade-in duration-200">
      {/* Real-time Search Header */}
      <div className="px-4 pt-1 space-y-2">
        <div className="relative flex items-center">
          <label htmlFor="menu-search-input" className="sr-only">
            Search menu dishes
          </label>
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name, Chinese characters, wok-hei..."
            autoComplete="off"
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-[13.5px] focus:border-[#C61E28] focus:ring-2 focus:ring-[#C61E28]/20 focus:outline-none transition-all shadow-xs"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <SlidersHorizontal className="absolute right-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          )}
        </div>

        {/* Real-time Search Match Banner or Popular Quick Search Chips */}
        {searchQuery.trim() ? (
          <div className="flex items-center justify-between text-[11.5px] bg-red-50/80 border border-red-100 rounded-lg px-2.5 py-1 text-red-900 animate-in fade-in duration-150">
            <span className="font-medium">
              Found <strong>{filteredDishes.length}</strong>{' '}
              {filteredDishes.length === 1 ? 'dish' : 'dishes'} for "
              <span className="font-semibold text-[#C61E28]">{searchQuery}</span>"
              {selectedCategory !== 'all' && (
                <span className="text-red-700"> in this category</span>
              )}
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C61E28] font-bold hover:underline ml-2 cursor-pointer"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
              Popular:
            </span>
            {POPULAR_SEARCH_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setSearchQuery(chip)}
                className="text-[11px] bg-white border border-gray-200 hover:border-[#C61E28]/40 hover:text-[#C61E28] text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Category cross-match notice: if 0 items in current category but available in other categories */}
        {searchQuery.trim() &&
          selectedCategory !== 'all' &&
          filteredDishes.length === 0 &&
          totalMatchesAllCategories > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[12px] flex items-center justify-between text-amber-900">
              <span>
                Found <strong>{totalMatchesAllCategories}</strong> matches in other categories.
              </span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>
          )}
      </div>

      {/* Horizontal Category Navigation Tabs */}
      <div className="overflow-x-auto no-scrollbar px-4 pb-1 flex gap-2 pt-0.5">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-[12.5px] whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#C61E28] text-white font-bold shadow-xs'
              : 'bg-white border border-gray-200 text-gray-700 hover:text-[#C61E28] font-medium'
          }`}
        >
          All Sections ({DISHES.length})
        </button>

        {MENU_SECTIONS.map((section) => {
          const isActive = selectedCategory === section.id;
          const count = DISHES.filter(
            (d) => d.category === section.id || d.secondaryCategory === section.id
          ).length;

          return (
            <button
              key={section.id}
              onClick={() => setSelectedCategory(section.id)}
              className={`px-3 py-1.5 rounded-lg text-[12.5px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#C61E28] text-white font-bold shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:text-[#C61E28] font-medium'
              }`}
            >
              {getSectionIcon(section.id)}
              <span>{section.name}</span>
              <span
                className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Table Indicator Banner */}
      <div className="px-4">
        <div className="bg-white border border-gray-200/80 rounded-lg p-2.5 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C61E28] animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                {isEditingTable ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onTableNumberChange(tempTable.trim() || '04');
                      setIsEditingTable(false);
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="text-[13px] font-bold text-gray-900">Table:</span>
                    <input
                      type="text"
                      value={tempTable}
                      onChange={(e) => setTempTable(e.target.value)}
                      className="w-16 px-1.5 py-0.5 border border-red-300 rounded text-[13px] font-bold"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="text-[11px] bg-[#C61E28] text-white px-2 py-0.5 rounded font-bold"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-gray-900">
                      Dine-In Table {tableNumber}
                    </span>
                    <button
                      onClick={() => {
                        setTempTable(tableNumber);
                        setIsEditingTable(true);
                      }}
                      className="text-[10px] text-gray-400 hover:text-[#C61E28] underline cursor-pointer"
                    >
                      change
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-gray-500 block">
                4 Keong Saik Rd • WhatsApp: {RESTAURANT_INFO.whatsappNumber}
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-red-100 text-[#C61E28] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Zichar Express
          </span>
        </div>
      </div>

      {/* Allergen Safety Filter Bar */}
      <div className="px-4">
        <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-2.5 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-amber-950 font-bold text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span>Allergen Safety Filter (过敏原筛选):</span>
            </div>
            {allergenExclusion !== 'all' && (
              <button
                onClick={() => setAllergenExclusion('all')}
                className="text-[10.5px] text-[#C61E28] font-bold hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'All Dishes' },
              { id: 'Shellfish', label: 'No Shellfish' },
              { id: 'Gluten', label: 'No Gluten' },
              { id: 'Egg', label: 'No Egg' },
              { id: 'Soy', label: 'No Soy' },
              { id: 'Fish', label: 'No Fish' },
              { id: 'None', label: 'Allergen-Free Only' },
            ].map((f) => {
              const active = allergenExclusion === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setAllergenExclusion(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-800 text-white font-bold shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-300'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Sections Container */}
      <div className="px-4 space-y-6">
        {sectionsToRender.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <UtensilsCrossed className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-600 font-semibold text-[14px]">
              No dishes found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-[12px] text-[#C61E28] font-bold hover:underline"
            >
              Reset to all menu sections
            </button>
          </div>
        ) : (
          sectionsToRender.map((section) => (
            <div key={section.id} className="space-y-3" id={`section-${section.id}`}>
              {/* Section Header Card */}
              <div className="bg-gradient-to-r from-stone-100 via-stone-50 to-white p-3 rounded-xl border border-stone-200/90 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 shadow-xs flex items-center justify-center">
                    {getSectionIcon(section.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-epilogue text-[16px] font-bold text-gray-900 leading-none">
                        {section.name}
                      </h3>
                      <span className="text-[12px] font-medium text-gray-500">
                        {section.chineseName}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{section.description}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-white text-gray-700 px-2 py-0.5 rounded-full border border-stone-200 shrink-0">
                  {section.dishes.length} items
                </span>
              </div>

              {/* Section Dishes List */}
              <div className="space-y-2.5">
                {section.dishes.map((dish) => {
                  const currentQty = cart[dish.id] || 0;
                  return (
                    <article
                      key={dish.id}
                      className="bg-white rounded-xl p-3 border border-gray-200/90 shadow-xs hover:border-[#C61E28]/40 transition-colors flex gap-3 relative cursor-pointer"
                      onClick={() => setSelectedDishForModal(dish)}
                    >
                      {/* Dish Photo */}
                      <div className="w-[88px] h-[88px] shrink-0 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {dish.badge && (
                          <span className="absolute top-1 left-1 bg-white/95 text-[#C61E28] text-[9px] px-1.5 py-0.5 rounded border border-[#C61E28]/20 uppercase tracking-wider font-bold shadow-xs">
                            {dish.badge}
                          </span>
                        )}
                      </div>

                      {/* Dish Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <div>
                              <h4 className="font-epilogue text-[14.5px] text-gray-900 font-bold leading-tight">
                                {dish.name}
                              </h4>
                              <span className="text-[12px] text-gray-500 font-medium">
                                {dish.chineseName}
                              </span>
                            </div>
                            <span className="font-epilogue text-[15px] text-[#C61E28] font-extrabold whitespace-nowrap ml-2">
                              S${dish.price.toFixed(2)}
                            </span>
                          </div>

                          <p className="text-[12px] text-gray-500 mt-1 line-clamp-2 leading-tight">
                            {dish.description}
                          </p>

                          {/* Allergen Information */}
                          {dish.allergens && dish.allergens.length > 0 && (
                            <div className="mt-1.5 flex items-center gap-1 flex-wrap text-[10px]">
                              <span className="font-semibold text-gray-400">Allergens:</span>
                              {dish.allergens.map((allergen) => {
                                const isNone = allergen.startsWith('None');
                                return (
                                  <span
                                    key={allergen}
                                    className={`inline-flex items-center px-1.5 py-0.2 rounded font-medium ${
                                      isNone
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-amber-50 text-amber-900 border border-amber-200/80'
                                    }`}
                                  >
                                    {allergen}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Footer with Portion & Stepper */}
                        <div
                          className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-[11px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                            {dish.isSpicy && <Flame className="w-3 h-3 text-red-500" />}
                            {dish.portion}
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center bg-gray-50 rounded border border-gray-200 h-8">
                            <button
                              onClick={() => onUpdateQty(dish.id, -1)}
                              disabled={currentQty === 0}
                              aria-label={`Decrease ${dish.name} quantity`}
                              className={`w-8 h-8 flex items-center justify-center transition-colors active:scale-90 cursor-pointer ${
                                currentQty === 0
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-600 hover:text-[#C61E28]'
                              }`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <span className="text-[13px] font-bold text-gray-900 w-6 text-center select-none">
                              {currentQty}
                            </span>

                            <button
                              onClick={() => onUpdateQty(dish.id, 1)}
                              aria-label={`Increase ${dish.name} quantity`}
                              className={`w-8 h-8 flex items-center justify-center rounded-r transition-colors active:scale-90 shadow-xs cursor-pointer ${
                                currentQty > 0
                                  ? 'bg-[#C61E28] text-white hover:bg-red-700'
                                  : 'bg-red-100 text-[#C61E28] hover:bg-[#C61E28] hover:text-white'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5 font-bold" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dish Customizer / Detail Modal */}
      <DishDetailModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={handleDishModalAdd}
        currentQty={selectedDishForModal ? cart[selectedDishForModal.id] || 0 : 0}
      />
    </section>
  );
};
