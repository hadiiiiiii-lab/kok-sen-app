import React, { useState } from 'react';
import {
  CalendarDays,
  MessageCircle,
  Navigation,
  Train,
  Car,
  MapPin,
  Info,
  Clock,
  ExternalLink,
  ShoppingBag,
  Store,
  CheckCircle2,
} from 'lucide-react';
import { OUTLETS, RESTAURANT_INFO, ORDER_WEB_LINK } from '../data/dishes';
import { getSingaporeTodayDateISO, formatSingaporeTime, formatSingaporeDate } from '../utils/singaporeTime';
import { openWhatsApp, openOrderWebLink } from '../utils/linkingHelper';

export const BookingsView: React.FC = () => {
  const [selectedOutletId, setSelectedOutletId] = useState<'keong_saik' | 'city_square_mall'>(
    'keong_saik'
  );
  const [reservationName, setReservationName] = useState('');
  const [partySize, setPartySize] = useState('2');
  const todaySGT = getSingaporeTodayDateISO();
  const [date, setDate] = useState(() => todaySGT);
  const [time, setTime] = useState('18:30');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentOutlet = OUTLETS.find((o) => o.id === selectedOutletId) || OUTLETS[0];

  const handleWhatsAppBooking = () => {
    const text = `Hello Kok Sen Restaurant (${currentOutlet.name}), I would like to reserve a table:
• Outlet: ${currentOutlet.name} (${currentOutlet.chineseName})
• Contact WhatsApp: ${currentOutlet.phone}
• Name: ${reservationName || 'Guest'}
• Party Size: ${partySize} pax
• Date: ${date}
• Seating Time: ${time} SGT (Singapore Time)
• Request Time: ${formatSingaporeDate()} ${formatSingaporeTime()}
${notes ? `• Remarks: ${notes}` : ''}`;

    openWhatsApp(currentOutlet.whatsappClean, text);
    setIsSubmitted(true);
  };

  return (
    <section className="max-w-md mx-auto px-4 py-3 space-y-4 animate-in fade-in duration-200">
      {/* Reservation Header Card */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#C61E28] flex items-center justify-center">
            <CalendarDays className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="font-epilogue text-[17px] font-bold text-gray-900">
              Table Reservations
            </h2>
            <span className="text-[12px] text-gray-500">
              Direct confirmation via Mainline WhatsApp
            </span>
          </div>
        </div>

        <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
          We welcome reservations for lunch and dinner seatings. Select your preferred outlet to
          connect directly to our mainline WhatsApp.
        </p>

        {/* Outlet Switcher */}
        <div className="mb-3 space-y-1.5">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
            Select Dining Outlet
          </label>
          <div className="grid grid-cols-2 gap-2">
            {OUTLETS.map((outlet, idx) => {
              const isSelected = selectedOutletId === outlet.id;
              return (
                <button
                  key={outlet.id}
                  onClick={() => setSelectedOutletId(outlet.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#059669] bg-emerald-50/70 ring-1 ring-[#059669]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Outlet {idx + 1}
                    </span>
                    {isSelected && <span className="text-[10px] text-emerald-700 font-bold">Active</span>}
                  </div>
                  <div className="text-[12px] font-bold text-gray-900 truncate">
                    {outlet.name}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <MessageCircle className="w-3 h-3" />
                    {outlet.phone}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Online Order Web Link Banner */}
        <div className="mb-3 p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border border-red-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C61E28] text-white flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-900">Online Ordering Available</div>
              <div className="text-[11px] text-gray-600">Takeaway & islandwide delivery</div>
            </div>
          </div>
          <button
            onClick={openOrderWebLink}
            className="px-2.5 py-1.5 bg-[#C61E28] hover:bg-red-800 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <span>Order Link</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Booking Form */}
        <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 mb-3 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={reservationName}
                onChange={(e) => setReservationName(e.target.value)}
                placeholder="e.g. Wei Ming"
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#C61E28]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Guests (Pax)
              </label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#C61E28]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Person' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Date (SGT)
              </label>
              <input
                type="date"
                min={todaySGT}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#C61E28]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Seating Time (SGT)
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#C61E28]"
              >
                <optgroup label="Lunch (SGT)">
                  <option value="11:30">11:30 AM SGT</option>
                  <option value="12:15">12:15 PM SGT</option>
                  <option value="13:00">1:00 PM SGT</option>
                  <option value="13:45">1:45 PM SGT</option>
                </optgroup>
                <optgroup label="Dinner (SGT)">
                  <option value="17:30">5:30 PM SGT</option>
                  <option value="18:30">6:30 PM SGT</option>
                  <option value="19:30">7:30 PM SGT</option>
                  <option value="20:30">8:30 PM SGT</option>
                  <option value="21:15">9:15 PM SGT</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1">
              Dietary or Seating Request
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Baby chair, no pork lard"
              className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-900 focus:outline-none focus:border-[#C61E28]"
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* Main WhatsApp Reservation Button */}
          <button
            onClick={handleWhatsAppBooking}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            Book {currentOutlet.name} via WhatsApp ({currentOutlet.phone})
          </button>

          {/* Direct WhatsApp Links for both outlets */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() =>
                openWhatsApp(
                  '6597272533',
                  'Hello Keong Saik Outlet (97272533), I would like to inquire about reservation.'
                )
              }
              className="py-2 px-2.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Keong Saik (97272533)</span>
            </button>
            <button
              onClick={() =>
                openWhatsApp(
                  '6596244244',
                  'Hello City Square Mall Outlet (96244244), I would like to inquire about reservation.'
                )
              }
              className="py-2 px-2.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>City Square (96244244)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Outlet Location & Transit Information */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Navigation className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-epilogue text-[16px] font-bold text-gray-900">
                {currentOutlet.name}
              </h3>
              <span className="text-[12px] text-gray-500">{currentOutlet.chineseName}</span>
            </div>
          </div>
          <span className="text-[11px] bg-red-50 text-[#C61E28] font-bold px-2 py-0.5 rounded">
            {currentOutlet.id === 'keong_saik' ? 'Heritage Mainline' : 'Mall Outlet'}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-2 text-[13px] space-y-2.5 text-gray-700">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-900 block">{currentOutlet.name}</span>
              <span>{currentOutlet.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Train className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-900 block">By MRT</span>
              <span className="text-gray-600">{currentOutlet.mrt}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-900 block">Operating Hours</span>
              <span className="text-gray-600">{currentOutlet.hours}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={
              currentOutlet.id === 'keong_saik'
                ? 'https://share.google/vPnZggbiOsjT21hKp'
                : 'https://maps.google.com/?q=City+Square+Mall+Singapore'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            Open {currentOutlet.name} in Google Maps
          </a>
        </div>
      </div>

      {/* Dining & Seating Policies */}
      <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 text-[12.5px] space-y-2 text-gray-600">
        <div className="font-bold text-gray-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-600" />
          Important Dining & Reservation Notes
        </div>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <strong>1) Keong Saik Outlet</strong>: Mainline WhatsApp <strong>9727 2533</strong>.
          </li>
          <li>
            <strong>2) City Square Mall Outlet</strong>: Mainline WhatsApp <strong>9624 4244</strong>.
          </li>
          <li>
            For online orders (takeaway & islandwide delivery), access our official web link at{' '}
            <strong className="text-[#C61E28]">koksen.oddle.me/en_SG</strong>.
          </li>
          <li>
            All reservation slots and confirmations operate on <strong>Singapore Time (SGT, UTC+8)</strong>.
          </li>
          <li>
            Reserved tables will be held for <strong>15 minutes</strong> before being released to
            waiting guests.
          </li>
        </ul>
      </div>
    </section>
  );
};
