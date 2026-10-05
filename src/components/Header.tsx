import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, User, LogIn, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/dishes';
import { ActiveTab } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { UserProfileModal } from './UserProfileModal';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onTabChange: (tab: ActiveTab) => void;
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onTabChange,
  onOpenChat,
}) => {
  const { currentUser, userProfile } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      {/* Sticky Top App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center w-full px-4 h-16 max-w-md mx-auto">
          {/* Logo & Brand Name */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => onTabChange('home')}
            role="button"
            tabIndex={0}
          >
            <div className="w-10 h-10 rounded-full border border-[#C61E28]/25 p-0.5 shadow-sm bg-white overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt="Kok Sen Restaurant Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-epilogue text-[17px] text-gray-900 tracking-tight font-bold leading-none">
                  Kok Sen <span className="text-sm font-medium text-gray-700">國成菜館</span>
                </h1>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C61E28] animate-pulse" />
                <span className="text-[10px] text-[#C61E28] tracking-wider uppercase font-bold">
                  Michelin Bib Gourmand
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact, User Auth & Cart Actions */}
          <div className="flex items-center gap-1">
            {/* Gemini AI Concierge Button */}
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-amber-800 active:scale-95 cursor-pointer border border-amber-200/70"
                title="Ask Kok Sen AI (Gemini + Maps & Search Grounding)"
                aria-label="Ask Kok Sen AI"
              >
                <Sparkles className="w-[17px] h-[17px] text-[#C61E28]" />
              </button>
            )}

            {/* User Account / Login Button */}
            {currentUser && userProfile ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-1.5 py-1 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 text-xs font-semibold cursor-pointer active:scale-95"
                title={`Logged in as ${userProfile.displayName}`}
              >
                <div className="w-5 h-5 rounded-full bg-[#C61E28] text-white flex items-center justify-center text-[10px] font-bold">
                  {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[70px] truncate text-[11px]">
                  @{userProfile.username}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="py-1 px-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                title="Sign In / Register"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C61E28]" />
                <span className="hidden xs:inline sm:inline">Sign In</span>
              </button>
            )}

            {/* WhatsApp Hotline */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 transition-colors text-[#25D366] active:scale-95"
              title={`WhatsApp Kok Sen (${RESTAURANT_INFO.whatsappNumber})`}
              aria-label="WhatsApp Kok Sen"
            >
              <MessageCircle className="w-[19px] h-[19px]" />
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-800 active:scale-95 cursor-pointer"
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-[20px] h-[20px]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#C61E28] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigateToOrders={() => onTabChange('history')}
      />
    </>
  );
};
