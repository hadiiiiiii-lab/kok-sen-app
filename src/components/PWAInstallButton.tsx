import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    triggerHaptic('medium');
    playNativeSound('tap');
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  if (!isInstallable && !isIOS) {
    return null;
  }

  if (variant === 'banner') {
    return (
      <>
        <div className="bg-gradient-to-r from-neutral-900 to-red-950 border border-red-500/30 rounded-2xl p-3.5 shadow-md flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C61E28] flex items-center justify-center text-white shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-neutral-100">Install Kok Sen Mobile App</h5>
              <p className="text-[11px] text-neutral-300">Fast 1-tap ordering directly on your phone home screen</p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-[#C61E28] hover:bg-[#A00016] text-white text-xs font-bold transition active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Install
          </button>
        </div>

        {/* iOS Guide Popup */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-neutral-900 text-white p-5 shadow-2xl border border-neutral-700 animate-in zoom-in-95">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-neutral-100">Install on iPhone / iPad</h4>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-xs text-neutral-300">
                <p>1. Tap the <strong>Share button</strong> (square with arrow up) in the Safari toolbar.</p>
                <p>2. Scroll down and tap <strong>"Add to Home Screen"</strong>.</p>
                <p>3. Tap <strong>Add</strong> in the top right corner.</p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-[#C61E28] py-2 text-xs font-bold text-white transition active:scale-95"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-[11px] font-bold transition active:scale-95 cursor-pointer"
        title="Install Kok Sen on Mobile"
      >
        <Download className="w-3.5 h-3.5 text-red-400" />
        <span className="hidden xs:inline">Install</span> App
      </button>

      {/* iOS Guide Popup */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-900 text-white p-5 shadow-2xl border border-neutral-700 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-neutral-100">Install on iPhone / iPad</h4>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-neutral-300">
              <p>1. Tap the <strong>Share button</strong> in Safari toolbar.</p>
              <p>2. Scroll down and tap <strong>"Add to Home Screen"</strong>.</p>
              <p>3. Tap <strong>Add</strong> in the top right corner.</p>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-xl bg-[#C61E28] py-2 text-xs font-bold text-white transition active:scale-95"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
