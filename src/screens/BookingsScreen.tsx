import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Calendar, Users, Clock, MessageSquare, CheckCircle2, Award } from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

export const BookingsScreen: React.FC = () => {
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState('Today, Dinner');
  const [time, setTime] = useState('7:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    if (!name || !phone) return;
    triggerHaptic('success');
    playNativeSound('order');
    setBooked(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
        <View style={styles.michelinBadge}>
          <Award size={12} color="#FBBF24" />
          <Text style={styles.michelinText}>Table Reservations</Text>
        </View>
        <Text style={styles.headerTitle}>Dine at Kok Sen 國成菜館</Text>
        <Text style={styles.headerSubtitle}>
          Reserve your table at 4 Keong Saik Road. Heritage dining hall with central air conditioning.
        </Text>
      </View>

      {booked ? (
        <View style={styles.successCard}>
          <CheckCircle2 size={44} color="#059669" />
          <Text style={styles.successTitle}>Reservation Requested!</Text>
          <Text style={styles.successDesc}>
            Table for {guests} guests on {date} at {time} reserved under {name} ({phone}).
          </Text>
          <Text style={styles.successSub}>
            Kok Sen staff will send an SMS confirmation to your mobile number.
          </Text>
          <TouchableOpacity
            style={styles.newBookingBtn}
            onPress={() => {
              setBooked(false);
              setName('');
              setPhone('');
            }}
          >
            <Text style={styles.newBookingBtnText}>Make Another Booking</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formCard}>
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

          {/* Time Slots */}
          <Text style={styles.fieldLabel}>Dinner Time Slot:</Text>
          <View style={styles.timePills}>
            {['5:30 PM', '6:30 PM', '7:00 PM', '8:00 PM', '8:30 PM'].map((t) => (
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
            placeholder="e.g. High chair needed, celebrating birthday, less spicy..."
            placeholderTextColor="#9CA3AF"
            value={requests}
            onChangeText={setRequests}
            multiline
          />

          <TouchableOpacity
            style={[styles.submitButton, (!name || !phone) && styles.submitButtonDisabled]}
            onPress={handleBooking}
            activeOpacity={0.8}
            disabled={!name || !phone}
          >
            <Text style={styles.submitButtonText}>Confirm Table Booking</Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fieldLabel: {
    fontSize: 11.5,
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  timePillActive: {
    backgroundColor: '#C61E28',
  },
  timePillText: {
    fontSize: 11,
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
    height: 40,
    fontSize: 12,
    color: '#111827',
  },
  textArea: {
    height: 60,
    paddingTop: 8,
  },
  submitButton: {
    backgroundColor: '#C61E28',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successTitle: {
    fontSize: 16,
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
  newBookingBtn: {
    backgroundColor: '#C61E28',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },
  newBookingBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
