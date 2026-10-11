import { Linking } from 'react-native';
import { ORDER_WEB_LINK } from '../data/dishes';

/**
 * Safely opens an external URL across React Native CLI, Expo, and Web runtime.
 */
export const openExternalUrl = (url: string): void => {
  try {
    if (typeof window !== 'undefined' && window.open) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(url);
        }
      })
      .catch(() => {
        // Fallback direct open
        Linking.openURL(url);
      });
  } catch (err) {
    console.error('Failed to open external url:', url, err);
  }
};

/**
 * Links a customer directly to WhatsApp for a given phone number and prefilled message.
 */
export const openWhatsApp = (cleanPhone: string, text?: string): void => {
  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  const url = `https://wa.me/${cleanPhone}${encodedText}`;
  openExternalUrl(url);
};

/**
 * Links customer directly to Kok Sen official ordering web platform (Oddle).
 */
export const openOrderWebLink = (): void => {
  openExternalUrl(ORDER_WEB_LINK);
};
