import React, { useState, useEffect } from 'react';
import { Clock, Timer, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { OrderStatusStage } from '../types';

interface OrderElapsedTimeProps {
  createdAt: Date | string | number;
  status: OrderStatusStage;
  estimatedMinutes?: number;
}

export const OrderElapsedTime: React.FC<OrderElapsedTimeProps> = ({
  createdAt,
  status,
  estimatedMinutes = 12,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    // Update every second for live accurate tracking
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createdDate = new Date(createdAt);
  const diffMs = Math.max(0, currentTime.getTime() - createdDate.getTime());
  const elapsedSeconds = Math.floor(diffMs / 1000);
  const elapsedMinutes = Math.floor(diffMs / (1000 * 60));
  const remainingMinutes = Math.max(0, estimatedMinutes - elapsedMinutes);
  const isCompleted = status === 'served';

  const formatElapsed = () => {
    if (elapsedSeconds < 60) {
      return `${Math.max(1, elapsedSeconds)}s`;
    }
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes}m ${elapsedSeconds % 60}s`;
    }
    const hours = Math.floor(elapsedMinutes / 60);
    const mins = elapsedMinutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getPaceStatus = () => {
    if (isCompleted) {
      return {
        label: 'Delivered Hot',
        subtext: `Total prep & serve time: ${formatElapsed()}`,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'Served',
      };
    }
    if (elapsedMinutes < estimatedMinutes) {
      return {
        label: 'On Schedule',
        subtext: `~${remainingMinutes} min${remainingMinutes === 1 ? '' : 's'} remaining`,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'Cooking Normal',
      };
    }
    return {
      label: 'Finishing Touches',
      subtext: 'Plating at kitchen pass',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badge: 'Almost Ready',
    };
  };

  const pace = getPaceStatus();

  return (
    <div
      id="order-elapsed-timer"
      className="bg-gradient-to-r from-stone-50 via-white to-stone-50 rounded-xl p-3 border border-stone-200/90 shadow-2xs"
    >
      <div className="flex items-center justify-between">
        {/* Left: Timer info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#C61E28] shrink-0 relative">
            <Timer className="w-4 h-4" />
            {!isCompleted && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C61E28]" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Time Elapsed
              </span>
              <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={elapsedMinutes}
                initial={{ opacity: 0.6, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-epilogue text-[17px] font-extrabold text-gray-900 tracking-tight"
              >
                {formatElapsed()}
              </motion.span>
              <span className="text-[11.5px] text-gray-500">
                since received at{' '}
                {createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Pace Status Badge */}
        <div className="text-right shrink-0">
          <span
            className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${pace.color}`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : (
              <Flame className="w-3 h-3 text-[#C61E28]" />
            )}
            {pace.label}
          </span>
          <span className="block text-[11px] text-gray-500 mt-0.5">
            {pace.subtext}
          </span>
        </div>
      </div>
    </div>
  );
};
