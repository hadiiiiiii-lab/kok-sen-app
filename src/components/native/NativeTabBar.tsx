import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Utensils, Bike, Receipt, Calendar } from 'lucide-react';
import { ActiveTab } from '../../types';
import { playNativeSound, triggerHaptic } from '../../utils/nativeSensors';

interface NativeTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  orderCount?: number;
  hasActiveOrder?: boolean;
}

export const NativeTabBar: React.FC<NativeTabBarProps> = ({
  activeTab,
  onTabChange,
  orderCount = 0,
  hasActiveOrder = false,
}) => {
  const isOrdersActive = activeTab === 'history' || activeTab === 'status';

  const handleTabPress = (tab: ActiveTab) => {
    triggerHaptic('light');
    playNativeSound('tap');
    onTabChange(tab);
  };

  return (
    <View style={styles.tabBar}>
      {/* Tab 1: Home */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('home')}
        activeOpacity={0.7}
      >
        <Home
          size={20}
          color={activeTab === 'home' ? '#C61E28' : '#6B7280'}
          strokeWidth={activeTab === 'home' ? 2.5 : 2}
        />
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>
          Home
        </Text>
        <View style={[styles.activeIndicator, activeTab === 'home' && styles.activeIndicatorActive]} />
      </TouchableOpacity>

      {/* Tab 2: Menu */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('menu')}
        activeOpacity={0.7}
      >
        <Utensils
          size={20}
          color={activeTab === 'menu' ? '#C61E28' : '#6B7280'}
          strokeWidth={activeTab === 'menu' ? 2.5 : 2}
        />
        <Text style={[styles.tabLabel, activeTab === 'menu' && styles.tabLabelActive]}>
          Menu
        </Text>
        <View style={[styles.activeIndicator, activeTab === 'menu' && styles.activeIndicatorActive]} />
      </TouchableOpacity>

      {/* Tab 3: Delivery */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('delivery')}
        activeOpacity={0.7}
      >
        <Bike
          size={20}
          color={activeTab === 'delivery' ? '#C61E28' : '#6B7280'}
          strokeWidth={activeTab === 'delivery' ? 2.5 : 2}
        />
        <Text style={[styles.tabLabel, activeTab === 'delivery' && styles.tabLabelActive]}>
          Delivery
        </Text>
        <View style={[styles.activeIndicator, activeTab === 'delivery' && styles.activeIndicatorActive]} />
      </TouchableOpacity>

      {/* Tab 4: Orders */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('history')}
        activeOpacity={0.7}
      >
        <View style={styles.badgeWrapper}>
          <Receipt
            size={20}
            color={isOrdersActive ? '#C61E28' : '#6B7280'}
            strokeWidth={isOrdersActive ? 2.5 : 2}
          />
          {hasActiveOrder && <View style={styles.activeDot} />}
          {orderCount > 0 && !hasActiveOrder && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{orderCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.tabLabel, isOrdersActive && styles.tabLabelActive]}>
          Orders
        </Text>
        <View style={[styles.activeIndicator, isOrdersActive && styles.activeIndicatorActive]} />
      </TouchableOpacity>

      {/* Tab 5: Bookings */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress('bookings')}
        activeOpacity={0.7}
      >
        <Calendar
          size={20}
          color={activeTab === 'bookings' ? '#C61E28' : '#6B7280'}
          strokeWidth={activeTab === 'bookings' ? 2.5 : 2}
        />
        <Text style={[styles.tabLabel, activeTab === 'bookings' && styles.tabLabelActive]}>
          Bookings
        </Text>
        <View style={[styles.activeIndicator, activeTab === 'bookings' && styles.activeIndicatorActive]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#C61E28',
    fontWeight: '700',
  },
  activeIndicator: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  activeIndicatorActive: {
    backgroundColor: '#C61E28',
  },
  badgeWrapper: {
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  countBadge: {
    position: 'absolute',
    top: -3,
    right: -6,
    backgroundColor: '#C61E28',
    borderRadius: 6,
    minWidth: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
});
