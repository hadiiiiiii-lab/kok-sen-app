import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Wifi,
  Battery,
  Flame,
  Clock,
  Sparkles,
  ChevronDown,
  QrCode,
  Code2,
  Maximize2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PlacedOrder } from '../types';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

export type DeviceMode = 'iphone' | 'pixel' | 'fullscreen';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  activeOrder?: PlacedOrder;
  onOpenOrder?: (order: PlacedOrder) => void;
  onOpenQRScanner?: () => void;
  onOpenReactNativeExport?: () => void;
  tableNumber: string;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  activeOrder,
  onOpenOrder,
  onOpenQRScanner,
  onOpenReactNativeExport,
  tableNumber,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('iphone');
  const [currentTime, setCurrentTime] = useState('9:41');
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12-hour or 24-hour style
      const formatted = `${hours % 12 || 12}:${minutes}`;
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleIslandClick = () => {
    triggerHaptic('medium');
    playNativeSound('pop');
    setIsDynamicIslandExpanded(!isDynamicIslandExpanded);
  };

  return (
    <div className="min-h-screen bg-[#121214] flex flex-col items-center justify-start p-0 sm:py-6 selection:bg-[#C61E28] selection:text-white">
      {/* Top Floating Mobile Toolbar / Control Bar */}
      <div className="sticky top-0 z-50 w-full max-w-xl mx-auto px-3 py-2 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between text-neutral-300 shadow-lg sm:rounded-2xl sm:my-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-800 text-xs font-bold text-neutral-100 border border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden xs:inline">React Native</span> Mobile
          </div>

          {/* Device Mode Switcher */}
          <div className="flex bg-neutral-950 p-0.5 rounded-xl border border-neutral-800 text-xs">
            <button
              onClick={() => {
                triggerHaptic('light');
                playNativeSound('tap');
                setDeviceMode('iphone');
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                deviceMode === 'iphone'
                  ? 'bg-[#C61E28] text-white shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="iPhone 16 Pro with Dynamic Island"
            >
              iPhone
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                playNativeSound('tap');
                setDeviceMode('pixel');
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                deviceMode === 'pixel'
                  ? 'bg-[#C61E28] text-white shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Android Pixel with Camera Punch Hole"
            >
              Pixel
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                playNativeSound('tap');
                setDeviceMode('fullscreen');
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                deviceMode === 'fullscreen'
                  ? 'bg-[#C61E28] text-white shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Fluid Fullscreen Mobile Viewport"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Tools: Table QR + React Native Exporter */}
        <div className="flex items-center gap-1.5">
          {onOpenQRScanner && (
            <button
              onClick={() => {
                triggerHaptic('light');
                playNativeSound('tap');
                onOpenQRScanner();
              }}
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition border border-neutral-700 shadow-sm cursor-pointer"
              title="Scan Table QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Table</span> {tableNumber}
            </button>
          )}

          {onOpenReactNativeExport && (
            <button
              onClick={() => {
                triggerHaptic('light');
                playNativeSound('tap');
                onOpenReactNativeExport();
              }}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-600 to-[#C61E28] hover:from-red-700 hover:to-[#A00016] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="View & Export React Native Code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">React Native</span> Code
            </button>
          )}
        </div>
      </div>

      {/* Mobile Shell / Device Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          deviceMode === 'fullscreen'
            ? 'max-w-md min-h-screen bg-[#FAF9F7]'
            : deviceMode === 'iphone'
            ? 'max-w-[420px] rounded-[48px] bg-black p-3 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_12px_#27272a,0_0_0_14px_#3f3f46] relative my-1 sm:my-3'
            : 'max-w-[420px] rounded-[44px] bg-black p-2.5 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_10px_#18181b,0_0_0_12px_#27272a] relative my-1 sm:my-3'
        }`}
      >
        {/* Device Screen Frame */}
        <div
          className={`w-full flex-1 flex flex-col relative overflow-hidden bg-[#FAF9F7] ${
            deviceMode === 'fullscreen'
              ? 'rounded-none min-h-screen'
              : deviceMode === 'iphone'
              ? 'rounded-[38px] min-h-[844px] max-h-[890px] overflow-y-auto no-scrollbar'
              : 'rounded-[34px] min-h-[844px] max-h-[890px] overflow-y-auto no-scrollbar'
          }`}
        >
          {/* iOS / Android Native Status Bar */}
          {deviceMode !== 'fullscreen' && (
            <div className="sticky top-0 z-50 w-full bg-[#FAF9F7]/95 backdrop-blur-md pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-gray-900 select-none">
              {/* Left: Clock */}
              <div className="w-16 font-bold tracking-tight text-[13px]">{currentTime}</div>

              {/* Center: Dynamic Island or Punch Hole */}
              <div className="flex-1 flex justify-center">
                {deviceMode === 'iphone' ? (
                  <div
                    onClick={handleIslandClick}
                    role="button"
                    tabIndex={0}
                    className={`bg-black text-white rounded-full transition-all duration-300 cursor-pointer flex items-center justify-between shadow-md ${
                      isDynamicIslandExpanded
                        ? 'w-72 h-14 px-3 py-1.5 rounded-3xl'
                        : activeOrder
                        ? 'w-36 h-7 px-2.5'
                        : 'w-24 h-6 px-2'
                    }`}
                  >
                    {isDynamicIslandExpanded ? (
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#C61E28] flex items-center justify-center text-white">
                            <Flame className="w-4 h-4 animate-bounce" />
                          </div>
                          <div className="text-left">
                            <div className="text-[11px] font-bold text-white leading-none">
                              {activeOrder ? `Order #${activeOrder.orderId}` : 'Kok Sen Kitchen'}
                            </div>
                            <div className="text-[9.5px] text-emerald-400 font-medium mt-0.5">
                              {activeOrder?.status === 'received'
                                ? 'Order Received • Wok Prep'
                                : activeOrder?.status === 'preparing'
                                ? 'Chef Firing Dishes'
                                : 'Live Activity Active'}
                            </div>
                          </div>
                        </div>

                        {activeOrder && onOpenOrder && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerHaptic('light');
                              onOpenOrder(activeOrder);
                              setIsDynamicIslandExpanded(false);
                            }}
                            className="px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[10px] font-bold text-white"
                          >
                            View
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                        </div>
                        {activeOrder ? (
                          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                            <Flame className="w-3 h-3 text-[#C61E28] animate-pulse" />
                            <span>Wok Fired</span>
                          </div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-neutral-900" />
                        )}
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                      </>
                    )}
                  </div>
                ) : (
                  /* Android Camera Punch Hole */
                  <div className="w-4 h-4 rounded-full bg-black ring-2 ring-neutral-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  </div>
                )}
              </div>

              {/* Right: Cellular, WiFi, Battery */}
              <div className="w-16 flex items-center justify-end gap-1.5 text-gray-800">
                <span className="text-[10px] font-bold">5G</span>
                <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[9px] font-bold">98%</span>
                  <Battery className="w-3.5 h-3.5 stroke-[2.5] text-emerald-600 fill-emerald-600" />
                </div>
              </div>
            </div>
          )}

          {/* Main App Content Viewport */}
          <div className="flex-1 flex flex-col w-full relative">
            {children}
          </div>

          {/* Native Home Indicator Bar (iOS & Android) */}
          {deviceMode !== 'fullscreen' && (
            <div className="sticky bottom-0 z-50 w-full py-1.5 flex justify-center bg-white/80 backdrop-blur-md pointer-events-none">
              <div
                className={`rounded-full bg-gray-900 transition-all ${
                  deviceMode === 'iphone' ? 'w-32 h-1' : 'w-24 h-1'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
