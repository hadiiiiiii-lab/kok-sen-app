import React, { useState, useEffect } from 'react';
import {
  Award,
  Utensils,
  Calendar,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Receipt,
  Bike,
  Search,
  QrCode,
  Smartphone,
} from 'lucide-react';
import { DISHES, RESTAURANT_INFO } from '../data/dishes';
import { ActiveTab, Dish } from '../types';
import { getSingaporeRestaurantStatus } from '../utils/singaporeTime';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';
import { PWAInstallButton } from './PWAInstallButton';

interface HomeViewProps {
  onTabChange: (tab: ActiveTab) => void;
  onAddToCart: (dish: Dish) => void;
  onOpenChat?: (prompt?: string) => void;
  onOpenQRScanner?: () => void;
  onOpenReactNativeExport?: () => void;
  onOpenDeployMobile?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onTabChange,
  onAddToCart,
  onOpenChat,
  onOpenQRScanner,
  onOpenReactNativeExport,
  onOpenDeployMobile,
}) => {
  const signatureDishes = DISHES.filter((d) => d.badge);
  const [sgtStatus, setSgtStatus] = useState(() => getSingaporeRestaurantStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setSgtStatus(getSingaporeRestaurantStatus());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-md mx-auto px-4 py-3 space-y-4 animate-in fade-in duration-200">
      {/* Live Kitchen & Queue Status Banner in Singapore Time */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            {sgtStatus.isOpen ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-epilogue text-[13px] font-bold text-gray-900">
                {sgtStatus.statusText}
              </span>
              <span
                className={`text-[10.5px] px-1.5 py-0.5 rounded font-semibold ${
                  sgtStatus.isOpen
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-800'
                }`}
              >
                {sgtStatus.badgeText}
              </span>
            </div>
            <p className="text-[12px] text-gray-500 mt-0.5">
              {sgtStatus.subText} • SGT Time
            </p>
          </div>
        </div>
        <div className="text-right shrink-0 pl-2">
          <span className="text-[12px] font-mono font-bold text-gray-800 block">
            {sgtStatus.currentTimeSGT}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
            Singapore (UTC+8)
          </span>
        </div>
      </div>

      {/* Hero Legacy Heritage Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-900 to-[#500a0f] text-white p-5 shadow-md border border-neutral-800">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 opacity-15 rounded-full bg-[#C61E28] blur-xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300 mb-3">
            <Award className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            Singapore Michelin Bib Gourmand 2016–2024
          </div>

          <h2 className="font-epilogue text-[23px] leading-snug font-extrabold tracking-tight">
            Heritage Cantonese Zi Char <br />
            <span className="text-red-300">Wok-Hei Craft Since 1970s</span>
          </h2>

          <p className="text-[13px] text-gray-200 mt-2 leading-relaxed">
            3rd Generation Wok Masters. Famous for our Big Prawn Hor Fun, Claypot Braised
            Delights, and legendary Cantonese zi char at 4 Keong Saik Road.
          </p>

          <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap gap-2">
            <button
              onClick={() => onTabChange('menu')}
              className="flex-1 bg-[#C61E28] hover:bg-red-700 text-white text-[13px] font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              Explore Menu
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=Hi%20Kok%20Sen`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-semibold py-2.5 px-3.5 rounded-xl border border-white/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Quick Action 4-Grid */}
      <div className="grid grid-cols-4 gap-2.5 pt-1">
        <button
          onClick={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onTabChange('menu');
          }}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs hover:border-[#C61E28]/40 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#C61E28] flex items-center justify-center mb-1.5">
            <Utensils className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
            Menu
          </span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onTabChange('delivery');
          }}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#C61E28]/30 shadow-xs hover:border-[#C61E28] active:scale-95 transition-all cursor-pointer relative"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
            <Bike className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
            Delivery
          </span>
          <span className="absolute -top-1 -right-1 bg-[#C61E28] text-white text-[9px] font-bold px-1 rounded-full shadow-xs">
            Hub
          </span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onTabChange('bookings');
          }}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs hover:border-[#C61E28]/40 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5">
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
            Bookings
          </span>
        </button>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=Hi%20Kok%20Sen,%20I%20would%20like%20to%20inquire%20about%20takeaway%20ordering.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs hover:border-[#C61E28]/40 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
            <MessageCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
            WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Native Experience Strip: Table QR, React Native Core & Deploy to Phone */}
      <div className="grid grid-cols-3 gap-2">
        {onOpenQRScanner && (
          <button
            onClick={() => {
              triggerHaptic('medium');
              playNativeSound('tap');
              onOpenQRScanner();
            }}
            className="flex flex-col items-start justify-between p-2.5 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xs hover:from-neutral-800 hover:to-neutral-700 active:scale-95 transition-all text-left cursor-pointer border border-neutral-700/60"
          >
            <div className="w-7 h-7 rounded-lg bg-red-600/30 text-red-400 flex items-center justify-center shrink-0 mb-1">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-neutral-100 leading-tight">
                Table QR
              </div>
              <p className="text-[9px] text-neutral-400">Scan Camera</p>
            </div>
          </button>
        )}

        {onOpenReactNativeExport && (
          <button
            onClick={() => {
              triggerHaptic('medium');
              playNativeSound('pop');
              onOpenReactNativeExport();
            }}
            className="flex flex-col items-start justify-between p-2.5 rounded-xl bg-white border border-gray-200/90 hover:border-red-300 text-gray-900 shadow-xs active:scale-95 transition-all text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-red-50 text-[#C61E28] flex items-center justify-center shrink-0 mb-1">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-900 leading-tight flex items-center gap-1">
                Expo Code
              </div>
              <p className="text-[9px] text-gray-500">React Native</p>
            </div>
          </button>
        )}

        {onOpenDeployMobile && (
          <button
            onClick={() => {
              triggerHaptic('medium');
              playNativeSound('pop');
              onOpenDeployMobile();
            }}
            className="flex flex-col items-start justify-between p-2.5 rounded-xl bg-gradient-to-br from-emerald-950 to-neutral-900 border border-emerald-600/30 text-white shadow-xs hover:border-emerald-500 active:scale-95 transition-all text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mb-1">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-emerald-300 leading-tight flex items-center gap-1">
                To Phone
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[9px] text-emerald-400/80">iOS & Android</p>
            </div>
          </button>
        )}
      </div>

      {/* PWA In-App Install Banner if eligible */}
      <PWAInstallButton variant="banner" />

      {/* Keong Saik Delivery & Takeaway Feature Banner */}
      <div
        onClick={() => onTabChange('delivery')}
        className="bg-gradient-to-r from-stone-900 to-[#8B1017] text-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer transition-all hover:shadow-md group"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#C61E28] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Islandwide Delivery
            </span>
            <span className="text-amber-300 text-[11px] font-medium">4 Keong Saik Rd (089112)</span>
          </div>
          <h4 className="font-epilogue text-[14px] font-bold group-hover:text-amber-200 transition-colors">
            Wok-Hei Takeaway & Distance-Based Delivery
          </h4>
          <p className="text-[11.5px] text-gray-300 leading-snug">
            Zone 1 (0–5km) S$5 • Zone 2 (5–12km) S$9 • Zone 3 (12–25km) S$14. Free delivery waivers available!
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C61E28] transition-colors ml-2">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Quick Access: Order History & 1-Tap Re-ordering */}
      <div
        onClick={() => onTabChange('history')}
        className="bg-white hover:bg-stone-50 border border-gray-200/90 rounded-xl p-3 shadow-2xs flex items-center justify-between cursor-pointer transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Receipt className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-epilogue text-[13px] font-bold text-gray-900 group-hover:text-[#C61E28] transition-colors">
                Order History & Past Receipts
              </span>
              <span className="text-[10px] bg-red-50 text-[#C61E28] font-bold px-1.5 py-0.2 rounded">
                Order Again
              </span>
            </div>
            <p className="text-[11.5px] text-gray-500">
              Browse past dining receipts & re-add favorites in 1 tap
            </p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C61E28] group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>

      {/* Gemini AI Culinary Concierge Card with Maps & Search Grounding */}
      {onOpenChat && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-red-50/50 rounded-2xl p-4 border border-amber-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B1017] to-[#C61E28] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h4 className="font-epilogue text-[14px] font-bold text-gray-900 flex items-center gap-1.5">
                  Kok Sen AI Culinary Concierge
                </h4>
                <span className="text-[11px] text-gray-500 block">
                  Grounding via Google Maps & Search (Gemini 3.5 Flash)
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenChat()}
              className="text-xs font-bold text-[#C61E28] bg-white px-2.5 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition-colors shadow-2xs cursor-pointer"
            >
              Open Chat
            </button>
          </div>

          <p className="text-[11.5px] text-gray-600 leading-relaxed">
            Get instant transit directions from Outram/Maxwell MRT, latest Michelin Guide citations, delivery fee estimates, and tailored dish recommendations.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <button
              onClick={() =>
                onOpenChat('Where is Kok Sen located and how do I walk from Outram Park or Maxwell MRT?')
              }
              className="text-[10.5px] px-2 py-1 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>MRT Walking Directions</span>
            </button>

            <button
              onClick={() =>
                onOpenChat('What did the latest Michelin Bib Gourmand review say about Big Prawn Hor Fun?')
              }
              className="text-[10.5px] px-2 py-1 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-800 rounded-lg border border-gray-200 hover:border-blue-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3 h-3 text-blue-600" />
              <span>Michelin Accolades</span>
            </button>

            <button
              onClick={() =>
                onOpenChat('Recommend a balanced dinner for 4 people with seafood, meat, and greens.')
              }
              className="text-[10.5px] px-2 py-1 bg-white hover:bg-amber-50 text-gray-700 hover:text-amber-800 rounded-lg border border-gray-200 hover:border-amber-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Utensils className="w-3 h-3 text-amber-600" />
              <span>Feast for 4</span>
            </button>
          </div>
        </div>
      )}

      {/* Section: Legendary Kok Sen Signatures Carousel */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="font-epilogue text-[17px] font-bold text-gray-900">
              Legendary Signatures
            </h3>
            <p className="text-[12px] text-gray-500">
              Unmatched charred wok-hei and rich claypot gravies
            </p>
          </div>
          <button
            onClick={() => onTabChange('menu')}
            className="text-xs font-bold text-[#C61E28] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              className="w-[240px] shrink-0 bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between hover:border-[#C61E28]/30 transition-all"
            >
              <div className="h-32 w-full relative bg-gray-100">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {dish.badge && (
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#C61E28] font-bold text-[10px] px-2 py-0.5 rounded border border-[#C61E28]/30 uppercase">
                    {dish.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-[15px] text-gray-900 leading-tight">
                    {dish.name}
                  </h4>
                  <span className="font-bold text-[15px] text-[#C61E28] ml-2 shrink-0">
                    S${dish.price.toFixed(2)}
                  </span>
                </div>
                <span className="text-[12px] text-gray-500 block">{dish.chineseName}</span>
                <p className="text-[12px] text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
                {/* Allergen Information */}
                {dish.allergens && dish.allergens.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-1 flex-wrap text-[10px]">
                    <span className="text-gray-400 font-semibold">Allergens:</span>
                    {dish.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className={`px-1.5 py-0.2 rounded font-medium ${
                          allergen.startsWith('None')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-900 border border-amber-200/80'
                        }`}
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => {
                    onAddToCart(dish);
                    onTabChange('menu');
                  }}
                  className="mt-2.5 w-full py-1.5 bg-red-50 text-[#C61E28] hover:bg-[#C61E28] hover:text-white rounded-lg text-[12px] font-bold transition-colors cursor-pointer active:scale-95"
                >
                  Order in Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Michelin Guide Singapore Inspector's Review Card */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-3.5 border border-red-200/80 shadow-xs flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#C61E28] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
        <div className="text-[13px]">
          <div className="flex items-center gap-1.5 font-bold text-[#C61E28]">
            <Sparkles className="w-4 h-4 text-[#C61E28]" />
            <span>Michelin Guide Singapore Inspector's Review</span>
          </div>
          <p className="text-gray-700 mt-1 leading-relaxed text-[12.5px]">
            "{RESTAURANT_INFO.michelinReview}"
          </p>
        </div>
      </div>

      {/* Operational Info & Direct Call Banner */}
      <div className="bg-white rounded-xl p-3.5 border border-gray-200/90 shadow-xs space-y-2 text-[13px]">
        <div className="flex items-center justify-between text-gray-800">
          <span className="font-bold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-500" />
            {RESTAURANT_INFO.address}
          </span>
          <span className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
            MRT Exit I
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-500" />
            {RESTAURANT_INFO.hours}
          </span>
        </div>
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=Hi%20Kok%20Sen,%20I%20would%20like%20to%20inquire.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-2 py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg flex items-center justify-center gap-2 font-bold text-[13px] active:scale-95 transition-all shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-white stroke-none" />
          WhatsApp Kok Sen ({RESTAURANT_INFO.whatsappNumber})
        </a>
      </div>
    </section>
  );
};
