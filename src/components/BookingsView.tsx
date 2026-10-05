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
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/dishes';
import { getSingaporeTodayDateISO, formatSingaporeTime, formatSingaporeDate } from '../utils/singaporeTime';

export const BookingsView: React.FC = () => {
  const [reservationName, setReservationName] = useState('');
  const [partySize, setPartySize] = useState('2');
  const todaySGT = getSingaporeTodayDateISO();
  const [date, setDate] = useState(() => todaySGT);
  const [time, setTime] = useState('18:30');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppBooking = () => {
    const text = `Hello Kok Sen Restaurant, I would like to reserve a table:
• Name: ${reservationName || 'Guest'}
• Party Size: ${partySize} pax
• Date: ${date}
• Seating Time: ${time} SGT (Singapore Time)
• Request Time: ${formatSingaporeDate()} ${formatSingaporeTime()}
${notes ? `• Remarks: ${notes}` : ''}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encoded}`, '_blank');
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
              Fast confirmation via Kok Sen concierge
            </span>
          </div>
        </div>

        <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
          We welcome reservations for lunch and dinner seatings. Walk-ins are also accommodated on a
          first-come, first-served basis.
        </p>

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
          {/* WhatsApp Reservation Button */}
          <button
            onClick={handleWhatsAppBooking}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            Book via WhatsApp ({RESTAURANT_INFO.whatsappNumber})
          </button>
        </div>
      </div>

      {/* Venue Location & Transit Information */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Navigation className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-epilogue text-[16px] font-bold text-gray-900">
                Restaurant Location
              </h3>
              <span className="text-[12px] text-gray-500">4 Keong Saik Road, Chinatown</span>
            </div>
          </div>
          <span className="text-[11px] bg-red-50 text-[#C61E28] font-bold px-2 py-0.5 rounded">
            Outram / Chinatown
          </span>
        </div>

        <div className="border-t border-gray-100 pt-2 text-[13px] space-y-2.5 text-gray-700">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-900 block">Kok Sen Restaurant (國成菜館)</span>
              <span>4 Keong Saik Road, Singapore 089110</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Train className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-900 block">By MRT</span>
              <span className="text-gray-600">
                Alight at <strong>Outram Park MRT (EW16/NE3/TE17)</strong> Exit 4 (~4 min walk) or{' '}
                <strong>Chinatown MRT (DT19/NE4)</strong> Exit A (~6 min walk).
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Car className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-900 block">Parking</span>
              <span className="text-gray-600">
                Street parallel parking along Keong Saik Rd / Bukit Pasoh Rd, or parking at The Pinnacle@Duxton.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="https://share.google/vPnZggbiOsjT21hKp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            Open in Google Maps
          </a>
        </div>
      </div>

      {/* Dining & Seating Policies */}
      <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 text-[12.5px] space-y-2 text-gray-600">
        <div className="font-bold text-gray-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-600" />
          Important Dining Notes
        </div>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            All reservation slots and confirmations operate on <strong>Singapore Time (SGT, UTC+8)</strong>.
          </li>
          <li>
            Reserved tables will be held for <strong>15 minutes</strong> before being released to
            waiting guests.
          </li>
          <li>
            For weekend dinners, pre-booking at least 1 day in advance via WhatsApp is highly
            recommended.
          </li>
          <li>No pork lard used in select dishes upon request. Inform staff during order.</li>
        </ul>
      </div>
    </section>
  );
};
