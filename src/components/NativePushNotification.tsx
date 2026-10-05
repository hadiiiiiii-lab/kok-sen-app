import React, { useEffect } from 'react';
import { Sparkles, Utensils, X, Bell } from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

export interface PushNotificationPayload {
  id: string;
  title: string;
  body: string;
  time?: string;
  icon?: string;
  onPress?: () => void;
}

interface NativePushNotificationProps {
  notification: PushNotificationPayload | null;
  onDismiss: () => void;
  platform?: 'ios' | 'android';
}

export const NativePushNotification: React.FC<NativePushNotificationProps> = ({
  notification,
  onDismiss,
  platform = 'ios',
}) => {
  useEffect(() => {
    if (notification) {
      playNativeSound('notification');
      triggerHaptic('medium');

      const timer = setTimeout(() => {
        onDismiss();
      }, 5500);

      return () => clearTimeout(timer);
    }
  }, [notification, onDismiss]);

  if (!notification) return null;

  return (
    <div
      onClick={() => {
        triggerHaptic('light');
        if (notification.onPress) {
          notification.onPress();
        }
        onDismiss();
      }}
      className={`absolute top-12 inset-x-3 z-50 transition-all duration-300 transform cursor-pointer ${
        platform === 'ios'
          ? 'bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl text-white'
          : 'bg-[#2A2B2E] border border-neutral-700 rounded-xl p-3 shadow-xl text-neutral-100'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#C61E28] flex items-center justify-center shrink-0 shadow-md">
          <Utensils className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-tight text-red-300">
              Kok Sen Restaurant
            </span>
            <span className="text-[10px] text-neutral-400">
              {notification.time || 'now'}
            </span>
          </div>
          <h5 className="text-xs font-bold text-white truncate mt-0.5">
            {notification.title}
          </h5>
          <p className="text-[11.5px] text-neutral-300 leading-snug line-clamp-2 mt-0.5">
            {notification.body}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-neutral-400 hover:text-white p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
