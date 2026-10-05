import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Utensils,
  Bike,
  Calendar,
  MessageCircle,
  QrCode,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Clock,
  Plus,
} from 'lucide-react';
import { DISHES, RESTAURANT_INFO } from '../data/dishes';
import { ActiveTab, Dish } from '../types';
import { getSingaporeRestaurantStatus } from '../utils/singaporeTime';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface HomeScreenProps {
  onTabChange: (tab: ActiveTab) => void;
  onAddToCart: (dish: Dish) => void;
  onOpenQRScanner: () => void;
  onOpenChat: () => void;
  onSelectDish?: (dish: Dish) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onTabChange,
  onAddToCart,
  onOpenQRScanner,
  onOpenChat,
  onSelectDish,
}) => {
  const sgtStatus = getSingaporeRestaurantStatus();
  const signatureDishes = DISHES.filter((d) => d.badge || d.isPopular);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Live Kitchen Status Banner */}
      <View style={styles.statusCard}>
        <View style={styles.statusLeft}>
          <View style={styles.statusDotWrapper}>
            <View style={[styles.statusDot, { backgroundColor: sgtStatus.isOpen ? '#10B981' : '#EF4444' }]} />
          </View>
          <View>
            <Text style={styles.statusTitle}>
              {sgtStatus.isOpen ? 'Kitchen Open • Wok Firing Live' : 'Kitchen Closed'}
            </Text>
            <Text style={styles.statusSubtitle}>{sgtStatus.subText}</Text>
          </View>
        </View>
        <Text style={styles.sgtTimeBadge}>{sgtStatus.currentTimeSGT} SGT</Text>
      </View>

      {/* Hero Heritage Card */}
      <View style={styles.heroCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <View style={styles.michelinPill}>
            <Award size={12} color="#FBBF24" />
            <Text style={styles.michelinText}>Michelin Bib Gourmand 2016-2024</Text>
          </View>
          <Text style={styles.heroTitle}>Heritage Zi Char Since 1968</Text>
          <Text style={styles.heroSubtitle}>
            Traditional Cantonese charcoal wok flavours on Keong Saik Road.
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.heroButtonPrimary}
              onPress={() => {
                triggerHaptic('medium');
                playNativeSound('tap');
                onTabChange('menu');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.heroButtonPrimaryText}>Order Dishes</Text>
              <ArrowRight size={14} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroButtonSecondary}
              onPress={() => {
                triggerHaptic('light');
                playNativeSound('tap');
                onOpenQRScanner();
              }}
              activeOpacity={0.8}
            >
              <QrCode size={14} color="#FFFFFF" />
              <Text style={styles.heroButtonSecondaryText}>Scan Table</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Action 4-Grid */}
      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={styles.quickItem}
          onPress={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onTabChange('menu');
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: '#FEF2F2' }]}>
            <Utensils size={20} color="#C61E28" />
          </View>
          <Text style={styles.quickLabel}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickItem}
          onPress={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onTabChange('delivery');
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: '#ECFDF5' }]}>
            <Bike size={20} color="#059669" />
          </View>
          <Text style={styles.quickLabel}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickItem}
          onPress={() => {
            triggerHaptic('light');
            playNativeSound('tap');
            onTabChange('bookings');
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: '#FFFBEB' }]}>
            <Calendar size={20} color="#B45309" />
          </View>
          <Text style={styles.quickLabel}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickItem}
          onPress={() => {
            triggerHaptic('medium');
            playNativeSound('pop');
            onOpenChat();
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: '#FDF2F8' }]}>
            <Sparkles size={20} color="#DB2777" />
          </View>
          <Text style={styles.quickLabel}>Ask AI</Text>
        </TouchableOpacity>
      </View>

      {/* Islandwide Delivery Banner */}
      <TouchableOpacity
        style={styles.deliveryBanner}
        onPress={() => {
          triggerHaptic('light');
          onTabChange('delivery');
        }}
        activeOpacity={0.8}
      >
        <View style={styles.deliveryBannerContent}>
          <View style={styles.deliveryBadgeRow}>
            <Text style={styles.deliveryBadge}>ISLANDWIDE DELIVERY</Text>
            <Text style={styles.deliveryAddress}>4 Keong Saik Rd</Text>
          </View>
          <Text style={styles.deliveryTitle}>Wok-Hei Takeaway & Distance Zones</Text>
          <Text style={styles.deliveryDesc}>
            Zone 1 (0–5km) S$5 • Zone 2 (5–12km) S$9 • Zone 3 (12–25km) S$14. Free delivery waivers available.
          </Text>
        </View>
        <ArrowRight size={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Signature Dishes Carousel / List */}
      <View style={styles.sectionHeaderRow}>
        <View>
          <Text style={styles.sectionTitle}>Must-Try Signature Dishes</Text>
          <Text style={styles.sectionSubtitle}>Michelin recommended claypot & wok specialities</Text>
        </View>
        <TouchableOpacity onPress={() => onTabChange('menu')}>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dishList}>
        {signatureDishes.slice(0, 6).map((dish) => (
          <View key={dish.id} style={styles.dishCard}>
            <Image source={{ uri: dish.image }} style={styles.dishImage} />
            <View style={styles.dishInfo}>
              <View style={styles.dishBadgeRow}>
                {dish.badge && <Text style={styles.dishBadge}>{dish.badge}</Text>}
                {dish.isSpicy && (
                  <View style={styles.spicyBadge}>
                    <Flame size={10} color="#EF4444" />
                    <Text style={styles.spicyText}>Spicy</Text>
                  </View>
                )}
              </View>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishChinese}>{dish.chineseName}</Text>
              <Text style={styles.dishDesc} numberOfLines={2}>
                {dish.description}
              </Text>
              <View style={styles.dishBottomRow}>
                <Text style={styles.dishPrice}>S${dish.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => onAddToCart(dish)}
                  activeOpacity={0.7}
                >
                  <Plus size={14} color="#FFFFFF" />
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  contentContainer: {
    padding: 14,
    paddingBottom: 40,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDotWrapper: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  statusSubtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  sgtTimeBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  heroCard: {
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
    justifyContent: 'flex-end',
    padding: 14,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  heroContent: {
    position: 'relative',
  },
  michelinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(198, 30, 40, 0.9)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 6,
    gap: 4,
  },
  michelinText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  heroSubtitle: {
    fontSize: 11.5,
    color: '#E5E7EB',
    marginBottom: 10,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  heroButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C61E28',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  heroButtonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  heroButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  heroButtonSecondaryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  quickItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1917',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#44403C',
  },
  deliveryBannerContent: {
    flex: 1,
    paddingRight: 10,
  },
  deliveryBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  deliveryBadge: {
    backgroundColor: '#C61E28',
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  deliveryAddress: {
    color: '#FCD34D',
    fontSize: 10,
    fontWeight: '600',
  },
  deliveryTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  deliveryDesc: {
    color: '#D1D5DB',
    fontSize: 10.5,
    lineHeight: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#6B7280',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C61E28',
  },
  dishList: {
    gap: 10,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dishImage: {
    width: 86,
    height: 86,
    borderRadius: 10,
    marginRight: 10,
  },
  dishInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dishBadgeRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 2,
  },
  dishBadge: {
    backgroundColor: '#FEF2F2',
    color: '#C61E28',
    fontSize: 9,
    fontWeight: '700',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  spicyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 4,
    borderRadius: 4,
    gap: 2,
  },
  spicyText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '700',
  },
  dishName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111827',
  },
  dishChinese: {
    fontSize: 11,
    color: '#4B5563',
    marginBottom: 2,
  },
  dishDesc: {
    fontSize: 10.5,
    color: '#6B7280',
    lineHeight: 14,
  },
  dishBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dishPrice: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#C61E28',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C61E28',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
