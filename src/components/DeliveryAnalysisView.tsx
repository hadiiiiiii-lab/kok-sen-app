import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Bike,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Train,
  Car,
  ChevronRight,
  Search,
  ExternalLink,
} from 'lucide-react';
import {
  KOK_SEN_LOCATION,
  DELIVERY_ZONES,
  calculateDelivery,
  getAvailableTakeawaySlots,
} from '../utils/deliveryEngine';
import { RESTAURANT_INFO } from '../data/dishes';
import { ActiveTab } from '../types';

interface DeliveryAnalysisViewProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const DeliveryAnalysisView: React.FC<DeliveryAnalysisViewProps> = ({
  onTabChange,
  onOpenCart,
  cartCount = 0,
}) => {
  const [postalInput, setPostalInput] = useState('089112');
  const [sampleSubtotal, setSampleSubtotal] = useState(65);
  const [selectedServiceMode, setSelectedServiceMode] = useState<'delivery' | 'takeaway'>('delivery');

  const deliveryCalc = calculateDelivery(postalInput, sampleSubtotal);
  const takeawaySlots = getAvailableTakeawaySlots();

  const samplePresets = [
    { label: 'Keong Saik / D02', code: '089112' },
    { label: 'Marina Bay / D01', code: '018981' },
    { label: 'Orchard / D09', code: '238801' },
    { label: 'Toa Payoh / D12', code: '310190' },
    { label: 'Tampines / D18', code: '520101' },
    { label: 'Jurong East / D22', code: '609601' },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 space-y-5 animate-in fade-in duration-200">
      {/* Top Banner: Restaurant Location Context */}
      <div className="bg-gradient-to-br from-[#8B1017] via-[#A81820] to-[#C61E28] text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold text-amber-200 tracking-wider uppercase backdrop-blur-xs mb-2.5 border border-white/20">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Keong Saik Logistics & Dispatch Analysis
          </div>

          <h1 className="font-epilogue text-2xl font-bold tracking-tight text-white">
            Islandwide Delivery & Takeaway System
          </h1>

          <p className="text-white/85 text-xs mt-1.5 leading-relaxed">
            Strategically dispatched from <span className="font-bold text-white">4 Keong Saik Road</span> in Singapore's historic Chinatown / Outram precinct, ensuring piping hot wok-hei across all Singapore districts.
          </p>

          <div className="mt-4 pt-3.5 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="text-white/70 text-[10.5px] block font-medium">Dispatch Hub</span>
              <span className="font-bold text-white text-[12.5px] block truncate">
                4 Keong Saik Rd (089112)
              </span>
              <span className="text-amber-200 text-[10px]">District 02 • Outram Hub</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="text-white/70 text-[10.5px] block font-medium">Coverage Radius</span>
              <span className="font-bold text-white text-[12.5px] block">
                Up to 26 km Islandwide
              </span>
              <span className="text-amber-200 text-[10px]">All 82 Singapore Sectors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Mode Selector */}
      <div className="bg-white rounded-2xl p-1.5 border border-gray-200/80 shadow-xs flex gap-1">
        <button
          onClick={() => setSelectedServiceMode('delivery')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            selectedServiceMode === 'delivery'
              ? 'bg-[#C61E28] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Bike className="w-4 h-4" />
          <span>Islandwide Delivery</span>
        </button>
        <button
          onClick={() => setSelectedServiceMode('takeaway')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            selectedServiceMode === 'takeaway'
              ? 'bg-[#C61E28] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Self-Pickup / Takeaway</span>
        </button>
      </div>

      {/* SECTION 1: Delivery Mode Calculator */}
      {selectedServiceMode === 'delivery' ? (
        <div className="space-y-4">
          {/* Postal Code Distance Calculator Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-epilogue text-sm font-bold text-gray-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#C61E28]" />
                Live Distance & Delivery Fee Calculator
              </h2>
              <span className="text-[11px] text-gray-500 font-medium">From 089112</span>
            </div>

            <p className="text-xs text-gray-600">
              Enter any 6-digit Singapore postal code to calculate exact radial distance from 4 Keong Saik Road, assigned delivery zone, and free delivery qualification.
            </p>

            {/* Input Box */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  maxLength={6}
                  value={postalInput}
                  onChange={(e) => setPostalInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Postal Code"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28] font-mono tracking-wider font-semibold"
                />
              </div>
            </div>

            {/* Sample Preset Chips */}
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Quick Test Addresses:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.code}
                    onClick={() => setPostalInput(preset.code)}
                    className={`text-[11px] px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                      postalInput === preset.code
                        ? 'bg-red-50 border-[#C61E28] text-[#C61E28] font-bold'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="mt-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: deliveryCalc.zone.accentColor }}
                    />
                    <span className="font-bold text-gray-900 text-xs">
                      {deliveryCalc.zone.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 block mt-0.5 font-medium">
                    {deliveryCalc.area} ({deliveryCalc.district})
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-epilogue text-base font-bold text-[#C61E28]">
                    {deliveryCalc.isFreeDelivery ? 'FREE' : `S$${deliveryCalc.deliveryFee.toFixed(2)}`}
                  </span>
                  <span className="text-[10.5px] text-gray-500 block">
                    ~{deliveryCalc.distanceKm} km away
                  </span>
                </div>
              </div>

              {/* Delivery ETA & Wok-Hei Guarantee */}
              <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  Estimated Arrival: {deliveryCalc.estimatedMinutesRange[0]}–{deliveryCalc.estimatedMinutesRange[1]} mins
                </span>
                <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Thermal Insulated
                </span>
              </div>

              {/* Free Delivery Threshold Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-500">
                    Free Delivery on orders above S${deliveryCalc.zone.freeDeliveryThreshold}:
                  </span>
                  <span className="font-bold text-gray-800">
                    {deliveryCalc.isFreeDelivery
                      ? 'Qualified for FREE Delivery!'
                      : `Add S$${deliveryCalc.amountNeededForFreeDelivery.toFixed(2)} more`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (sampleSubtotal / deliveryCalc.zone.freeDeliveryThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Zones Breakdown */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
            <h2 className="font-epilogue text-sm font-bold text-gray-900">
              Kok Sen Islandwide Dispatch Zones
            </h2>

            <div className="space-y-2">
              {Object.values(DELIVERY_ZONES).map((z) => (
                <div
                  key={z.zoneId}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    deliveryCalc.zone.zoneId === z.zoneId
                      ? 'bg-red-50/50 border-[#C61E28]/40 shadow-xs'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: z.accentColor }}
                      />
                      {z.name}
                    </span>
                    <span className="font-bold font-epilogue text-[#C61E28]">
                      S${z.baseFee.toFixed(2)} (Free &gt; S${z.freeDeliveryThreshold})
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-tight">
                    {z.coverageSummary}
                  </p>
                  <div className="flex justify-between items-center text-[10.5px] text-gray-500 mt-1.5 pt-1.5 border-t border-gray-100">
                    <span>ETA: {z.estimatedMinutes[0]}–{z.estimatedMinutes[1]} mins</span>
                    <span className="font-medium text-gray-700">{z.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* SECTION 2: Takeaway / Self-Pickup Mode */
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-epilogue text-sm font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C61E28]" />
                Self-Pickup at 4 Keong Saik Road
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                0% Delivery Fee
              </span>
            </div>

            <p className="text-xs text-gray-600">
              Pick up directly at our historic shophouse counter. Wok-fired right before your arrival so your Big Prawn Hor Fun and Claypot Yong Tau Foo are fresh and sizzling.
            </p>

            {/* Highlights of Pickup */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                <span className="font-bold text-gray-900 block text-[11.5px]">Prep Time</span>
                <span className="text-gray-600 text-[11px]">~20 - 25 mins</span>
                <span className="text-[10px] text-amber-800 block mt-0.5">Wok hei cooked on demand</span>
              </div>
              <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200/60">
                <span className="font-bold text-gray-900 block text-[11.5px]">Curbside Handover</span>
                <span className="text-gray-600 text-[11px]">Keong Saik One-Way</span>
                <span className="text-[10px] text-emerald-800 block mt-0.5">Quick car/grab pickup</span>
              </div>
            </div>

            {/* Available Pickup Slots */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-gray-800 block">
                Select Pickup Window (Today):
              </span>
              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {takeawaySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-2 rounded-xl border text-xs flex items-center justify-between ${
                      slot.isAvailable
                        ? 'bg-gray-50 border-gray-200 text-gray-800'
                        : 'bg-gray-100/60 border-gray-200 text-gray-400 opacity-60'
                    }`}
                  >
                    <span className="font-medium text-[11.5px] truncate">{slot.label}</span>
                    {slot.isAvailable && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transit & Curbside Collection Guide */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
            <h2 className="font-epilogue text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Train className="w-4 h-4 text-[#C61E28]" />
              Pickup Location & Transit Details
            </h2>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-900 block">Nearest MRT Stations</span>
                <ul className="mt-1 space-y-1 text-gray-600 text-[11px]">
                  <li>• <span className="font-semibold text-gray-800">Outram Park MRT</span> (EW/NE/TE Lines) — 4 mins walk (300m)</li>
                  <li>• <span className="font-semibold text-gray-800">Maxwell MRT</span> (TE Line) — 5 mins walk (350m)</li>
                  <li>• <span className="font-semibold text-gray-800">Chinatown MRT</span> (NE/DT Lines) — 7 mins walk (500m)</li>
                </ul>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-900 block flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-gray-600" />
                  Vehicular & Grab Handover
                </span>
                <p className="mt-1 text-gray-600 text-[11px] leading-relaxed">
                  Turn onto Keong Saik Road from Neil Road. Stop briefly at 4 Keong Saik Road for curbside staff handover without finding parking.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Packaging & Wok Hei Preservation Notice */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 space-y-2 text-xs text-amber-900">
        <div className="flex items-center gap-1.5 font-bold text-amber-950">
          <Flame className="w-4 h-4 text-[#C61E28]" />
          Heritage Wok Hei Packaging Standard
        </div>
        <p className="text-[11.5px] leading-relaxed text-amber-900/90">
          Every takeaway and delivery order uses heavy-duty, food-grade thermal containers. Signatures like <strong>Big Prawn Hor Fun</strong> and <strong>Claypot Yong Tau Foo</strong> have sauces packed separately upon request to prevent noodle sogginess and preserve smoky wok aroma.
        </p>
      </div>

      {/* Bottom CTA to browse menu and order */}
      <div className="pt-2">
        <button
          onClick={() => onTabChange('menu')}
          className="w-full py-3.5 px-4 bg-[#C61E28] hover:bg-red-800 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Menu & Order Now</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>

        {cartCount > 0 && onOpenCart && (
          <button
            onClick={onOpenCart}
            className="w-full mt-2 py-2 text-xs text-center text-gray-600 hover:text-gray-900 font-semibold cursor-pointer"
          >
            You have {cartCount} items in cart • View Order Summary
          </button>
        )}
      </div>
    </div>
  );
};
