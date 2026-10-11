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
  Calendar,
  Users,
  Clock,
  MessageSquare,
  CheckCircle2,
  Award,
  MapPin,
  ExternalLink,
  ShoppingBag,
  Store,
  PhoneCall,
} from 'lucide-react';
import { OUTLETS, RESTAURANT_INFO, ORDER_WEB_LINK } from '../data/dishes';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';
import { openWhatsApp, openOrderWebLink } from '../utils/linkingHelper';
import { formatSingaporeDate, formatSingaporeTime } from '../utils/singaporeTime';

export const BookingsScreen: React.FC = () => {
  const [selectedOutletId, setSelectedOutletId] = useState<'keong_saik' | 'city_square_mall'>(
    'keong_saik'
  );
  const [guests, setGuests] = useState('4');
  const [dateOption, setDateOption] = useState('Today, Dinner');
  const [time, setTime] = useState('7:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [booked, setBooked] = useState(false);

  const currentOutlet =
    OUTLETS.find((o) => o.id === selectedOutletId) || OUTLETS[0];

  const handleWhatsAppReservation = () => {
    triggerHaptic('success');
    playNativeSound('order');

    const message = `Hello Kok Sen Restaurant (${currentOutlet.name}),
I would like to make a table reservation:
• Outlet: ${currentOutlet.name} (${currentOutlet.chineseName})
• Phone / WhatsApp: ${currentOutlet.phone}
• Diner Name: ${name || 'Guest'}
• Mobile Contact: ${phone || 'N/A'}
• Guests: ${guests} Pax
• Date: ${dateOption}
• Seating Time: ${time} SGT
• Request Time: ${formatSingaporeDate()} ${formatSingaporeTime()}
${requests ? `• Special Requests: ${requests}` : ''}

Looking forward to dining with you!`;

    openWhatsApp(currentOutlet.whatsappClean, message);
    setBooked(true);
  };

  const handleDirectWhatsAppChat = (outletId: 'keong_saik' | 'city_square_mall') => {
    triggerHaptic('medium');
    playNativeSound('tap');
    const targetOutlet = OUTLETS.find((o) => o.id === outletId) || OUTLETS[0];
    const text = `Hello Kok Sen Restaurant (${targetOutlet.name}), I would like to inquire about reservation / dining at ${targetOutlet.phone}.`;
    openWhatsApp(targetOutlet.whatsappClean, text);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Banner */}
      <View style={styles.headerCard}>
        <View style={styles.michelinBadge}>
          <Award size={12} color="#FBBF24" />
          <Text style={styles.michelinText}>Table Reservations • Mainline WhatsApp</Text>
        </View>
        <Text style={styles.headerTitle}>Dine at Kok Sen 國成菜馆</Text>
        <Text style={styles.headerSubtitle}>
          Reserve your table via our official mainline WhatsApp. Choose your preferred outlet below.
        </Text>

        {/* Quick Outlet Badges */}
        <View style={styles.outletBadgeRow}>
          <View style={styles.badgeItem}>
            <Text style={styles.badgeDot}>•</Text>
            <Text style={styles.badgeText}>Keong Saik: 97272533</Text>
          </View>
          <View style={styles.badgeItem}>
            <Text style={styles.badgeDot}>•</Text>
            <Text style={styles.badgeText}>City Square Mall: 96244244</Text>
          </View>
        </View>
      </View>

      {/* Online Order Web Link Banner */}
      <TouchableOpacity
        style={styles.orderBanner}
        onPress={() => {
          triggerHaptic('medium');
          playNativeSound('pop');
          openOrderWebLink();
        }}
        activeOpacity={0.85}
      >
        <View style={styles.orderBannerLeft}>
          <View style={styles.orderBannerIcon}>
            <ShoppingBag size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.orderBannerTitle}>Want to Order Online?</Text>
            <Text style={styles.orderBannerSub}>
              Tap here to order delivery & takeaway on our official web link
            </Text>
            <Text style={styles.orderBannerUrl}>koksen.oddle.me/en_SG</Text>
          </View>
        </View>
        <ExternalLink size={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Outlet Selection */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeaderTitle}>Select Restaurant Outlet:</Text>
        <Text style={styles.sectionHeaderSub}>
          Table reservations are linked directly to each outlet's mainline WhatsApp.
        </Text>

        <View style={styles.outletSelectGrid}>
          {/* Keong Saik Outlet */}
          <TouchableOpacity
            style={[
              styles.outletSelectCard,
              selectedOutletId === 'keong_saik' && styles.outletSelectCardActive,
            ]}
            onPress={() => {
              triggerHaptic('light');
              setSelectedOutletId('keong_saik');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.outletCardTop}>
              <View style={styles.outletNumPill}>
                <Text style={styles.outletNumText}>1</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.outletCardName}>Keong Saik Outlet</Text>
                <Text style={styles.outletCardSub}>恭锡路总店 (Heritage Hall)</Text>
              </View>
              {selectedOutletId === 'keong_saik' && (
                <View style={styles.activeCheck}>
                  <Text style={styles.activeCheckText}>SELECTED</Text>
                </View>
              )}
            </View>
            <View style={styles.outletCardDetails}>
              <View style={styles.detailRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.detailText}>4 Keong Saik Road (089110)</Text>
              </View>
              <View style={styles.detailRow}>
                <MessageSquare size={12} color="#059669" />
                <Text style={[styles.detailText, styles.detailHighlightGreen]}>
                  WhatsApp: 97272533
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* City Square Mall Outlet */}
          <TouchableOpacity
            style={[
              styles.outletSelectCard,
              selectedOutletId === 'city_square_mall' && styles.outletSelectCardActive,
            ]}
            onPress={() => {
              triggerHaptic('light');
              setSelectedOutletId('city_square_mall');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.outletCardTop}>
              <View style={styles.outletNumPill}>
                <Text style={styles.outletNumText}>2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.outletCardName}>City Square Mall Outlet</Text>
                <Text style={styles.outletCardSub}>城市广场分店</Text>
              </View>
              {selectedOutletId === 'city_square_mall' && (
                <View style={styles.activeCheck}>
                  <Text style={styles.activeCheckText}>SELECTED</Text>
                </View>
              )}
            </View>
            <View style={styles.outletCardDetails}>
              <View style={styles.detailRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.detailText}>City Square Mall, 180 Kitchener Rd</Text>
              </View>
              <View style={styles.detailRow}>
                <MessageSquare size={12} color="#059669" />
                <Text style={[styles.detailText, styles.detailHighlightGreen]}>
                  WhatsApp: 96244244
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Direct WhatsApp Buttons */}
        <View style={styles.quickWhatsAppRow}>
          <TouchableOpacity
            style={styles.quickWABtn}
            onPress={() => handleDirectWhatsAppChat('keong_saik')}
            activeOpacity={0.8}
          >
            <MessageSquare size={13} color="#FFFFFF" />
            <Text style={styles.quickWABtnText}>Chat Keong Saik (97272533)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickWABtn}
            onPress={() => handleDirectWhatsAppChat('city_square_mall')}
            activeOpacity={0.8}
          >
            <MessageSquare size={13} color="#FFFFFF" />
            <Text style={styles.quickWABtnText}>Chat City Sq (96244244)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reservation Form */}
      {booked ? (
        <View style={styles.successCard}>
          <CheckCircle2 size={44} color="#059669" />
          <Text style={styles.successTitle}>WhatsApp Reservation Launched!</Text>
          <Text style={styles.successDesc}>
            Table request for {guests} Pax at {currentOutlet.name} ({currentOutlet.phone}) opened in
            WhatsApp.
          </Text>
          <Text style={styles.successSub}>
            Please hit Send in WhatsApp to finalize your booking with our host!
          </Text>
          <View style={styles.successBtnRow}>
            <TouchableOpacity
              style={styles.reopenWABtn}
              onPress={handleWhatsAppReservation}
              activeOpacity={0.8}
            >
              <MessageSquare size={14} color="#FFFFFF" />
              <Text style={styles.reopenWABtnText}>Re-open WhatsApp Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newBookingBtn}
              onPress={() => {
                setBooked(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.newBookingBtnText}>Edit Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.formCardTitle}>
            Reserve at {currentOutlet.name} • WhatsApp {currentOutlet.phone}
          </Text>

          {/* Party Size */}
          <Text style={styles.fieldLabel}>Party Size (Diners):</Text>
          <View style={styles.guestPills}>
            {['2', '4', '6', '8', '10+'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.guestPill, guests === g && styles.guestPillActive]}
                onPress={() => {
                  triggerHaptic('light');
                  setGuests(g);
                }}
              >
                <Text style={[styles.guestPillText, guests === g && styles.guestPillTextActive]}>
                  {g} Pax
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Options */}
          <Text style={styles.fieldLabel}>Dining Date:</Text>
          <View style={styles.timePills}>
            {['Today, Dinner', 'Today, Lunch', 'Tomorrow, Lunch', 'Tomorrow, Dinner', 'This Weekend'].map(
              (d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.timePill, dateOption === d && styles.timePillActive]}
                  onPress={() => {
                    triggerHaptic('light');
                    setDateOption(d);
                  }}
                >
                  <Text style={[styles.timePillText, dateOption === d && styles.timePillTextActive]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Time Slots */}
          <Text style={styles.fieldLabel}>Seating Time Slot (SGT):</Text>
          <View style={styles.timePills}>
            {['12:00 PM', '1:00 PM', '5:30 PM', '6:30 PM', '7:00 PM', '8:00 PM', '8:30 PM'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.timePill, time === t && styles.timePillActive]}
                onPress={() => {
                  triggerHaptic('light');
                  setTime(t);
                }}
              >
                <Text style={[styles.timePillText, time === t && styles.timePillTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Guest Details */}
          <Text style={styles.fieldLabel}>Your Full Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Tan Wei Ming"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.fieldLabel}>Singapore Mobile Phone (+65):</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9123 4567"
            placeholderTextColor="#9CA3AF"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.fieldLabel}>Special Requests / Dietary:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. High chair needed, celebrating birthday, less oil / no pork lard..."
            placeholderTextColor="#9CA3AF"
            value={requests}
            onChangeText={setRequests}
            multiline
          />

          {/* WhatsApp Submit Action */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleWhatsAppReservation}
            activeOpacity={0.85}
          >
            <MessageSquare size={18} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>
              Reserve via WhatsApp • {currentOutlet.phone}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Outlet Information Cards */}
      <View style={styles.outletsInfoSection}>
        <Text style={styles.infoSectionTitle}>Kok Sen Outlets & Hours</Text>

        {OUTLETS.map((outlet, idx) => (
          <View key={outlet.id} style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <View style={styles.infoBadge}>
                <Text style={styles.infoBadgeText}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoOutletTitle}>{outlet.name}</Text>
                <Text style={styles.infoOutletSub}>{outlet.chineseName}</Text>
              </View>
              <TouchableOpacity
                style={styles.infoChatBtn}
                onPress={() => handleDirectWhatsAppChat(outlet.id as any)}
              >
                <MessageSquare size={12} color="#059669" />
                <Text style={styles.infoChatBtnText}>{outlet.phone}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.infoAddress}>{outlet.address}</Text>
            <Text style={styles.infoMrt}>MRT: {outlet.mrt}</Text>
            <Text style={styles.infoHours}>Hours: {outlet.hours}</Text>
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
    gap: 12,
  },
  headerCard: {
    backgroundColor: '#1E1E24',
    borderRadius: 14,
    padding: 16,
  },
  michelinBadge: {
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
    fontSize: 9.5,
    fontWeight: '800',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#9CA3AF',
    marginTop: 3,
    lineHeight: 16,
  },
  outletBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeDot: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '900',
  },
  badgeText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '700',
  },
  orderBanner: {
    backgroundColor: '#C61E28',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#C61E28',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  orderBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  orderBannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBannerTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  orderBannerSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 10.5,
    marginTop: 1,
  },
  orderBannerUrl: {
    color: '#FDE047',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  sectionHeaderSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 10,
  },
  outletSelectGrid: {
    gap: 8,
  },
  outletSelectCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    padding: 12,
  },
  outletSelectCardActive: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  outletCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  outletNumPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E1E24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outletNumText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  outletCardName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  outletCardSub: {
    fontSize: 10.5,
    color: '#6B7280',
  },
  activeCheck: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeCheckText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  outletCardDetails: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 11,
    color: '#4B5563',
  },
  detailHighlightGreen: {
    color: '#059669',
    fontWeight: '800',
  },
  quickWhatsAppRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  quickWABtn: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  quickWABtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formCardTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    marginTop: 8,
    marginBottom: 4,
  },
  guestPills: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  guestPill: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  guestPillActive: {
    backgroundColor: '#C61E28',
  },
  guestPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
  },
  guestPillTextActive: {
    color: '#FFFFFF',
  },
  timePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  timePill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  timePillActive: {
    backgroundColor: '#C61E28',
  },
  timePillText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#4B5563',
  },
  timePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 38,
    fontSize: 12,
    color: '#111827',
  },
  textArea: {
    height: 56,
    paddingTop: 8,
  },
  submitButton: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    shadowColor: '#25D366',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#065F46',
    marginTop: 10,
  },
  successDesc: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
  successSub: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  successBtnRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  reopenWABtn: {
    flex: 1,
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  reopenWABtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
  },
  newBookingBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  newBookingBtnText: {
    color: '#374151',
    fontSize: 11.5,
    fontWeight: '700',
  },
  outletsInfoSection: {
    gap: 8,
  },
  infoSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 3,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  infoBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#C61E28',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  infoOutletTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111827',
  },
  infoOutletSub: {
    fontSize: 10,
    color: '#6B7280',
  },
  infoChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  infoChatBtnText: {
    color: '#059669',
    fontSize: 10.5,
    fontWeight: '800',
  },
  infoAddress: {
    fontSize: 11,
    color: '#4B5563',
  },
  infoMrt: {
    fontSize: 10.5,
    color: '#6B7280',
  },
  infoHours: {
    fontSize: 10.5,
    color: '#6B7280',
  },
});
