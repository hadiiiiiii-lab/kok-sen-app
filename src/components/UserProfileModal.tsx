import React, { useState } from 'react';
import { X, User, Phone, MapPin, Award, LogOut, Check, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToOrders?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateToOrders,
}) => {
  const { userProfile, logout, updateUserPreferences } = useAuth();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [address, setAddress] = useState(userProfile?.defaultAddress || '');
  const [postalCode, setPostalCode] = useState(userProfile?.defaultPostalCode || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !userProfile) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateUserPreferences({
        displayName: displayName.trim(),
        phone: phone.trim(),
        defaultAddress: address.trim(),
        defaultPostalCode: postalCode.trim(),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F2937] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C61E28] flex items-center justify-center text-white font-bold text-lg border-2 border-white/20">
              {userProfile.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'K'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-epilogue text-lg font-bold text-white">
                  {userProfile.displayName}
                </h2>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                  Heritage Diner
                </span>
              </div>
              <p className="text-gray-300 text-xs mt-0.5">@{userProfile.username}</p>
            </div>
          </div>
        </div>

        {/* Perk Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 p-3 flex items-center gap-2.5 text-xs text-amber-900">
          <Award className="w-4 h-4 text-[#C61E28] shrink-0" />
          <div>
            <span className="font-bold text-gray-900">Takeaway & Islandwide Delivery Member:</span>{' '}
            Enjoy saved addresses, live order sync, and direct WhatsApp concierge.
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+65 9123 4567"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Default Delivery Address (Singapore)
            </label>
            <div className="space-y-2">
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street / Unit Number (e.g. 10 Tanjong Pagar #05-02)"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                />
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  maxLength={6}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="6-Digit Postal Code (e.g. 089112)"
                  className="w-40 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                />
                <span className="text-[11px] text-gray-500">
                  Used for instant delivery distance calculation.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 px-4 bg-[#C61E28] hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" /> Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Preferences
                </>
              )}
            </button>
          </div>

          {onNavigateToOrders && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToOrders();
              }}
              className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
            >
              View My Order History & Active Dispatches
            </button>
          )}

          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
