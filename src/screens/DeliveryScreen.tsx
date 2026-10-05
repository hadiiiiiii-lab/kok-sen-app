import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Bike,
  ShoppingBag,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { calculateDeliveryFee } from '../utils/deliveryEngine';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface DeliveryScreenProps {
  onOpenCart: () => void;
  cartCount: number;
}

export const DeliveryScreen: React.FC<DeliveryScreenProps> = ({
  onOpenCart,
  cartCount,
}) => {
  const [postalInput, setPostalInput] = useState('089112');
  const [deliveryResult, setDeliveryResult] = useState(() =>
    calculateDeliveryFee('089112', 50)
  );

  const handleLookup = () => {
    triggerHaptic('light');
    playNativeSound('tap');
    const result = calculateDeliveryFee(postalInput, 60);
    setDeliveryResult(result);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Location Badge */}
      <View style={styles.headerCard}>
        <View style={styles.badgeRow}>
          <Text style={styles.badgeText}>CENTRAL KITCHEN</Text>
          <Text style={styles.badgeSub}>Chinatown / Outram Park</Text>
        </View>
        <Text style={styles.headerTitle}>Kok Sen Restaurant 國成菜館</Text>
        <Text style={styles.headerAddress}>4 Keong Saik Road, Singapore 089112</Text>
      </View>

      {/* Postal Code Calculator Box */}
      <View style={styles.calcCard}>
        <Text style={styles.calcTitle}>Check Delivery Fee & Zone</Text>
        <Text style={styles.calcSubtitle}>
          Enter any 6-digit Singapore postal code to calculate exact distance and fee.
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.postalInput}
            placeholder="e.g. 238864 (Orchard)"
            placeholderTextColor="#9CA3AF"
            value={postalInput}
            onChangeText={setPostalInput}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.lookupBtn}
            onPress={handleLookup}
            activeOpacity={0.7}
          >
            <Search size={15} color="#FFFFFF" />
            <Text style={styles.lookupBtnText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Calculation Result */}
        {deliveryResult && (
          <View style={styles.resultBox}>
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.districtName}>{deliveryResult.districtName}</Text>
                <Text style={styles.distanceText}>
                  {deliveryResult.distanceKm} km from 4 Keong Saik Road
                </Text>
              </View>
              <View style={styles.zoneBadge}>
                <Text style={styles.zoneBadgeText}>{deliveryResult.zone}</Text>
              </View>
            </View>

            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Delivery Fee:</Text>
              <Text style={styles.feeValue}>
                {deliveryResult.fee === 0 ? 'FREE' : `S$${deliveryResult.fee.toFixed(2)}`}
              </Text>
            </View>

            <View style={styles.etaRow}>
              <Clock size={12} color="#059669" />
              <Text style={styles.etaText}>
                Estimated Arrival: {deliveryResult.estimatedMinutes} mins (hot packed in thermal box)
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Delivery Zones Table */}
      <View style={styles.zonesCard}>
        <Text style={styles.zonesCardTitle}>Islandwide Delivery Fee Tiers</Text>

        <View style={styles.zoneTier}>
          <View style={styles.zoneTierLeft}>
            <Text style={styles.tierName}>Zone 1: Downtown & Fringe</Text>
            <Text style={styles.tierRange}>0 – 5 km • Chinatown, Tanjong Pagar, CBD, Tiong Bahru</Text>
          </View>
          <View style={styles.tierRight}>
            <Text style={styles.tierFee}>S$5.00</Text>
            <Text style={styles.tierFree}>Free over $50</Text>
          </View>
        </View>

        <View style={styles.zoneTier}>
          <View style={styles.zoneTierLeft}>
            <Text style={styles.tierName}>Zone 2: Mid-Range Metro</Text>
            <Text style={styles.tierRange}>5 – 12 km • Queenstown, Novena, Marine Parade, Bishan</Text>
          </View>
          <View style={styles.tierRight}>
            <Text style={styles.tierFee}>S$9.00</Text>
            <Text style={styles.tierFree}>Free over $85</Text>
          </View>
        </View>

        <View style={styles.zoneTier}>
          <View style={styles.zoneTierLeft}>
            <Text style={styles.tierName}>Zone 3: Outer Regions</Text>
            <Text style={styles.tierRange}>12 – 25 km • Jurong, Woodlands, Tampines, Punggol</Text>
          </View>
          <View style={styles.tierRight}>
            <Text style={styles.tierFee}>S$14.00</Text>
            <Text style={styles.tierFree}>Free over $120</Text>
          </View>
        </View>
      </View>

      {/* Takeaway / Self-Pickup Notice */}
      <View style={styles.takeawayCard}>
        <View style={styles.takeawayHeader}>
          <ShoppingBag size={16} color="#C61E28" />
          <Text style={styles.takeawayTitle}>Self-Pickup / Takeaway Counter</Text>
        </View>
        <Text style={styles.takeawayDesc}>
          Pick up directly at 4 Keong Saik Road. Ready in 20-25 mins from ordering. 0% service charge or delivery fee.
        </Text>
        <TouchableOpacity
          style={styles.orderTakeawayBtn}
          onPress={onOpenCart}
          activeOpacity={0.7}
        >
          <Text style={styles.orderTakeawayBtnText}>
            Review Cart ({cartCount} item{cartCount === 1 ? '' : 's'})
          </Text>
          <ArrowRight size={14} color="#FFFFFF" />
        </TouchableOpacity>
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
    gap: 12,
  },
  headerCard: {
    backgroundColor: '#1E1E24',
    borderRadius: 14,
    padding: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  badgeText: {
    backgroundColor: '#C61E28',
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeSub: {
    color: '#FCD34D',
    fontSize: 10,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  headerAddress: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  calcCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  calcTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  calcSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  postalInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 12,
    color: '#111827',
  },
  lookupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C61E28',
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 4,
  },
  lookupBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  resultBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  districtName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  distanceText: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 1,
  },
  zoneBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  zoneBadgeText: {
    color: '#C61E28',
    fontSize: 10,
    fontWeight: '800',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  feeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  feeValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#C61E28',
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  etaText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  zonesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  zonesCardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  zoneTier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  zoneTierLeft: {
    flex: 1,
    paddingRight: 8,
  },
  tierName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1F2937',
  },
  tierRange: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  tierRight: {
    alignItems: 'flex-end',
  },
  tierFee: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#C61E28',
  },
  tierFree: {
    fontSize: 9.5,
    color: '#059669',
    fontWeight: '600',
  },
  takeawayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  takeawayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  takeawayTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  takeawayDesc: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 15,
    marginBottom: 10,
  },
  orderTakeawayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C61E28',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  orderTakeawayBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
