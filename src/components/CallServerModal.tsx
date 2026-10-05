import React, { useState } from 'react';
import {
  Bell,
  Droplets,
  Utensils,
  Scroll,
  CheckCircle2,
  X,
  Send,
  Sparkles,
  Receipt,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface AssistanceRequest {
  id: string;
  tableNumber: string;
  types: string[];
  note?: string;
  timestamp: Date;
  status: 'pending' | 'acknowledged';
}

interface CallServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  onSubmitRequest: (request: AssistanceRequest) => void;
}

const PRESET_OPTIONS = [
  {
    id: 'water',
    label: 'Water Refill',
    chinese: '加水',
    icon: Droplets,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'Fresh iced or warm water refills for table',
  },
  {
    id: 'napkins',
    label: 'Napkins & Wet Wipes',
    chinese: '餐巾纸 / 湿巾',
    icon: Scroll,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    description: 'Extra paper napkins or refreshing wet tissues',
  },
  {
    id: 'utensils',
    label: 'Utensils & Bowls',
    chinese: '餐具 / 小碗',
    icon: Utensils,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Extra chopsticks, soup spoons, forks or sharing bowls',
  },
  {
    id: 'condiments',
    label: 'Chili & Condiments',
    chinese: '辣椒 / 酱油',
    icon: Sparkles,
    color: 'text-red-700 bg-red-50 border-red-200',
    description: 'Fresh sliced red chili, sambal belacan or light soy sauce',
  },
  {
    id: 'bill',
    label: 'Request Bill',
    chinese: '结账 / 买单',
    icon: Receipt,
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    description: 'Prepare printed receipt for Table payment',
  },
  {
    id: 'general',
    label: 'Speak to Staff',
    chinese: '呼叫服务员',
    icon: HelpCircle,
    color: 'text-gray-700 bg-gray-50 border-gray-200',
    description: 'Other dining queries or assistance',
  },
];

export const CallServerModal: React.FC<CallServerModalProps> = ({
  isOpen,
  onClose,
  tableNumber,
  onSubmitRequest,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['water']);
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleOption = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTypes.length === 0) return;

    setIsSubmitting(true);

    const labels = selectedTypes.map(
      (id) => PRESET_OPTIONS.find((opt) => opt.id === id)?.label || id
    );

    const newRequest: AssistanceRequest = {
      id: `req-${Date.now()}`,
      tableNumber,
      types: labels,
      note: customNote.trim() ? customNote.trim() : undefined,
      timestamp: new Date(),
      status: 'pending',
    };

    setTimeout(() => {
      onSubmitRequest(newRequest);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C61E28] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-epilogue text-[17px] font-bold text-gray-900 leading-tight">
                  Call Server
                </h3>
                <p className="text-[12px] text-gray-500">
                  Request assistance for <span className="font-bold text-gray-900">Table {tableNumber}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wider mb-2">
              What can we help you with?
            </label>

            {/* Grid of Preset Assistance Types */}
            <div className="grid grid-cols-2 gap-2">
              {PRESET_OPTIONS.map((opt) => {
                const isSelected = selectedTypes.includes(opt.id);
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleOption(opt.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C61E28] bg-red-50/50 shadow-xs ring-2 ring-[#C61E28]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${opt.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected
                            ? 'bg-[#C61E28] border-[#C61E28] text-white font-bold'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </div>
                    <span className="font-bold text-[13px] text-gray-900 leading-tight">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-gray-500">{opt.chinese}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Note Textarea */}
          <div className="space-y-1.5">
            <label className="block text-[12px] font-semibold text-gray-700">
              Specific Instructions (Optional)
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. 2 extra bowls, warm water instead of iced, etc."
              className="w-full text-[13px] px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-[#C61E28]/30 focus:border-[#C61E28] bg-stone-50"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-[13px] hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedTypes.length === 0 || isSubmitting}
              className="flex-2 py-2.5 rounded-xl bg-[#C61E28] hover:bg-red-800 disabled:opacity-50 text-white font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              {isSubmitting ? (
                <span>Dispatching...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Call Server for Table {tableNumber}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
