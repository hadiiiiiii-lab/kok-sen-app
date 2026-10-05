// Native Sensor, Sound & Haptic Engine for Kok Sen Mobile React Native Experience

// Web Audio API Synthesizer for instant native tactile sounds
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export type SoundType = 'tap' | 'scan' | 'order' | 'notification' | 'pop';

export function playNativeSound(type: SoundType = 'tap') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'scan') {
      // Crisp barcode/QR scanner beep
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.setValueAtTime(1800, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'order') {
      // Harmonious pleasant chime
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.15); // G5
      gain2.gain.setValueAtTime(0.1, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.start(now);
      osc.stop(now + 0.35);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.45);
    } else if (type === 'notification') {
      // iOS style notification tri-tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(900, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Ignore audio errors gracefully
  }
}

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export function triggerHaptic(type: HapticType = 'light') {
  if (typeof window === 'undefined') return;
  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      switch (type) {
        case 'light':
          navigator.vibrate(8);
          break;
        case 'medium':
          navigator.vibrate(18);
          break;
        case 'heavy':
          navigator.vibrate([25, 20, 25]);
          break;
        case 'success':
          navigator.vibrate([12, 40, 18]);
          break;
        case 'warning':
          navigator.vibrate([20, 60, 20]);
          break;
        case 'error':
          navigator.vibrate([30, 40, 30, 40, 30]);
          break;
      }
    }
  } catch {
    // Ignore vibration failure
  }
}
