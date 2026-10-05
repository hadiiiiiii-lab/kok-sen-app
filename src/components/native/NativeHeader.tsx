import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { ShoppingBag, Sparkles, QrCode, LogIn } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/dishes';
import { playNativeSound, triggerHaptic } from '../../utils/nativeSensors';

interface NativeHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenQRScanner: () => void;
  onOpenAuth: () => void;
  onLogoPress: () => void;
  tableNumber: string;
  isLoggedIn: boolean;
  username?: string;
}

export const NativeHeader: React.FC<NativeHeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenChat,
  onOpenQRScanner,
  onOpenAuth,
  onLogoPress,
  tableNumber,
  isLoggedIn,
  username,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Brand & Logo */}
      <TouchableOpacity
        style={styles.brandRow}
        onPress={() => {
          triggerHaptic('light');
          playNativeSound('tap');
          onLogoPress();
        }}
        activeOpacity={0.8}
      >
        <View style={styles.logoCircle}>
          <Image
            source={{ uri: RESTAURANT_INFO.logoUrl }}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.brandTextCol}>
          <View style={styles.titleRow}>
            <Text style={styles.brandTitle}>Kok Sen </Text>
            <Text style={styles.brandChinese}>國成菜館</Text>
          </View>
          <View style={styles.badgeRow}>
            <View style={styles.pulseDot} />
            <Text style={styles.badgeText}>MICHELIN BIB GOURMAND</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Right Controls */}
      <View style={styles.actionsRow}>
        {/* Table QR Button */}
        <TouchableOpacity
          style={styles.tableButton}
          onPress={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onOpenQRScanner();
          }}
          activeOpacity={0.7}
        >
          <QrCode size={14} color="#C61E28" />
          <Text style={styles.tableText}>T-{tableNumber}</Text>
        </TouchableOpacity>

        {/* Gemini AI Concierge Button */}
        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => {
            triggerHaptic('medium');
            playNativeSound('pop');
            onOpenChat();
          }}
          activeOpacity={0.7}
        >
          <Sparkles size={16} color="#C61E28" />
        </TouchableOpacity>

        {/* User Account / Login */}
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => {
            triggerHaptic('light');
            onOpenAuth();
          }}
          activeOpacity={0.7}
        >
          {isLoggedIn ? (
            <View style={styles.userAvatar}>
              <Text style={styles.userInitial}>
                {username ? username.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
          ) : (
            <LogIn size={15} color="#C61E28" />
          )}
        </TouchableOpacity>

        {/* Cart Button */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            triggerHaptic('medium');
            playNativeSound('tap');
            onOpenCart();
          }}
          activeOpacity={0.7}
        >
          <ShoppingBag size={20} color="#1F2937" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(198, 30, 40, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  brandChinese: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  pulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#C61E28',
    marginRight: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#C61E28',
    letterSpacing: 0.5,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 3,
  },
  tableText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C61E28',
  },
  aiButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#C61E28',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cartButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#C61E28',
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
});
