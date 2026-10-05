import React from 'react';
import { Sparkles } from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface GeminiChatFloatingButtonProps {
  onClick: () => void;
}

export const GeminiChatFloatingButton: React.FC<GeminiChatFloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        triggerHaptic('medium');
        playNativeSound('pop');
        onClick();
      }}
      className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-[#8B1017] to-[#C61E28] hover:from-[#7A0D13] hover:to-[#A81820] text-white py-2 px-3 rounded-full shadow-xl hover:shadow-2xl flex items-center gap-1.5 transition-all duration-200 active:scale-95 border border-white/30 cursor-pointer group"
      aria-label="Ask Kok Sen AI Culinary Concierge"
      title="Ask Kok Sen AI (Gemini + Google Maps & Search)"
    >
      <div className="relative">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
      </div>
      <span className="font-epilogue text-[11px] font-bold tracking-tight">
        Ask AI
      </span>
      <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded font-semibold text-amber-200">
        Concierge
      </span>
    </button>
  );
};
