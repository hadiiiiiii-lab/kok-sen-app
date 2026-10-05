import React from 'react';
import { Sparkles, Bot, MessageCircleQuestion } from 'lucide-react';

interface GeminiChatFloatingButtonProps {
  onClick: () => void;
}

export const GeminiChatFloatingButton: React.FC<GeminiChatFloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 sm:right-[max(1rem,calc(50vw-224px+16px))] z-40 bg-gradient-to-r from-[#8B1017] to-[#C61E28] hover:from-[#7A0D13] hover:to-[#A81820] text-white py-2 px-3 sm:px-3.5 rounded-full shadow-xl hover:shadow-2xl flex items-center gap-1.5 transition-all duration-200 active:scale-95 border border-white/30 cursor-pointer group"
      aria-label="Ask Kok Sen AI Culinary Concierge"
      title="Ask Kok Sen AI (Gemini + Google Maps & Search)"
    >
      <div className="relative">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
      </div>
      <span className="font-epilogue text-[11.5px] font-bold tracking-tight">
        Ask AI
      </span>
      <span className="text-[9.5px] bg-white/20 px-1 py-0.2 rounded font-semibold text-amber-200 hidden sm:inline">
        Maps & Search
      </span>
    </button>
  );
};
