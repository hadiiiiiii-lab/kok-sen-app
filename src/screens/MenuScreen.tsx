import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Search, Flame, Plus, Minus, QrCode, Sparkles } from 'lucide-react';
import { DISHES, MENU_CATEGORIES } from '../data/dishes';
import { MenuCategory, Dish } from '../types';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface MenuScreenProps {
  cart: { [dishId: number]: number };
  onUpdateQty: (dishId: number, delta: number) => void;
  tableNumber: string;
  onTableNumberChange: (table: string) => void;
  onOpenQRScanner: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  cart,
  onUpdateQty,
  tableNumber,
  onTableNumberChange,
  onOpenQRScanner,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchCat =
        selectedCategory === 'all' ||
        dish.category === selectedCategory ||
        dish.secondaryCategory === selectedCategory;
      const matchQuery =
        !searchQuery ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.chineseName.includes(searchQuery);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Table Selector & Search Strip */}
      <View style={styles.topStrip}>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Dining Table:</Text>
          <View style={styles.tablePills}>
            {['04', '07', '12', '16'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tablePill, tableNumber === t && styles.tablePillActive]}
                onPress={() => {
                  triggerHaptic('light');
                  onTableNumberChange(t);
                }}
              >
                <Text style={[styles.tablePillText, tableNumber === t && styles.tablePillTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => {
              triggerHaptic('light');
              onOpenQRScanner();
            }}
          >
            <QrCode size={14} color="#C61E28" />
            <Text style={styles.qrButtonText}>Scan</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={15} color="#9CA3AF" />
          <TextInput
            placeholder="Search Big Prawn Hor Fun, Claypot Tofu..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Horizontal Category Pill Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        <TouchableOpacity
          style={[styles.catPill, selectedCategory === 'all' && styles.catPillActive]}
          onPress={() => {
            triggerHaptic('light');
            setSelectedCategory('all');
          }}
        >
          <Text style={[styles.catPillText, selectedCategory === 'all' && styles.catPillTextActive]}>
            All Dishes
          </Text>
        </TouchableOpacity>

        {MENU_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.catPill, selectedCategory === cat.id && styles.catPillActive]}
            onPress={() => {
              triggerHaptic('light');
              setSelectedCategory(cat.id);
            }}
          >
            <Text style={[styles.catPillText, selectedCategory === cat.id && styles.catPillTextActive]}>
              {cat.name} {cat.chineseName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dishes List */}
      <ScrollView contentContainerStyle={styles.dishListContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Showing {filteredDishes.length} dish{filteredDishes.length === 1 ? '' : 'es'}
          </Text>
        </View>

        {filteredDishes.map((dish) => {
          const qty = cart[dish.id] || 0;
          return (
            <View key={dish.id} style={styles.dishCard}>
              <Image source={{ uri: dish.image }} style={styles.dishImage} />
              <View style={styles.dishDetails}>
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

                  {qty > 0 ? (
                    <View style={styles.qtyControls}>
                      <TouchableOpacity
                        style={styles.qtyMinus}
                        onPress={() => onUpdateQty(dish.id, -1)}
                        activeOpacity={0.7}
                      >
                        <Minus size={12} color="#C61E28" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyPlus}
                        onPress={() => onUpdateQty(dish.id, 1)}
                        activeOpacity={0.7}
                      >
                        <Plus size={12} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => onUpdateQty(dish.id, 1)}
                      activeOpacity={0.7}
                    >
                      <Plus size={14} color="#FFFFFF" />
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  topStrip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    marginRight: 6,
  },
  tablePills: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  tablePill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  tablePillActive: {
    backgroundColor: '#C61E28',
  },
  tablePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4B5563',
  },
  tablePillTextActive: {
    color: '#FFFFFF',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 2,
  },
  qrButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#C61E28',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 34,
  },
  searchInput: {
    flex: 1,
    fontSize: 11.5,
    color: '#111827',
    marginLeft: 6,
    paddingVertical: 0,
  },
  categoryScroll: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    backgroundColor: '#FAF9F7',
  },
  catPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  catPillActive: {
    backgroundColor: '#C61E28',
    borderColor: '#C61E28',
  },
  catPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  catPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dishListContainer: {
    padding: 12,
    paddingBottom: 40,
    gap: 10,
  },
  countRow: {
    marginBottom: 2,
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
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
  dishDetails: {
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
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qtyMinus: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
    paddingHorizontal: 8,
  },
  qtyPlus: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#C61E28',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
