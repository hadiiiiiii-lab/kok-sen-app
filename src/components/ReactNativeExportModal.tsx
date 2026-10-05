import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Download, Code, Layers, Sparkles } from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface ReactNativeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeExportModal: React.FC<ReactNativeExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'app' | 'navigation' | 'package' | 'instructions'>('app');

  if (!isOpen) return null;

  const appTsxCode = `// Kok Sen Restaurant - Standalone React Native App
// Compatible with Expo SDK 52 / React Native 0.76+

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import BookingsScreen from './src/screens/BookingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [tableNumber, setTableNumber] = useState('04');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F7" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#C61E28',
            tabBarInactiveTintColor: '#6B7280',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopColor: '#E5E7EB',
              height: Platform.OS === 'ios' ? 84 : 64,
              paddingBottom: Platform.OS === 'ios' ? 24 : 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Menu"
            component={MenuScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="moped" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="receipt-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Bookings"
            component={BookingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
});
`;

  const packageJsonCode = `{
  "name": "kok-sen-restaurant-native",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "react-native-safe-area-context": "^5.0.0",
    "react-native-screens": "^4.4.0",
    "@expo/vector-icons": "^14.0.0",
    "expo-camera": "~16.0.0",
    "expo-haptics": "~14.0.0",
    "firebase": "^11.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.0",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}`;

  const instructionsCode = `# Quick Start with Expo & React Native

1. Initialize project with Expo:
   npx create-expo-app kok-sen-mobile --template blank-typescript
   cd kok-sen-mobile

2. Install Mobile Navigation & Icons:
   npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-safe-area-context react-native-screens @expo/vector-icons expo-haptics expo-camera

3. Run on physical device or simulator:
   npx expo start

4. Scan QR code in Expo Go app (iOS App Store / Android Google Play Store) to run natively!
`;

  const currentCode =
    activeTab === 'app'
      ? appTsxCode
      : activeTab === 'package'
      ? packageJsonCode
      : instructionsCode;

  const handleCopy = (text: string, label: string) => {
    triggerHaptic('success');
    playNativeSound('tap');
    navigator.clipboard.writeText(text);
    setCopiedFile(label);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C61E28] flex items-center justify-center text-white shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-neutral-100">React Native / Expo Architecture</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Deploy
                </span>
              </div>
              <p className="text-xs text-neutral-400">Mobile app conversion source code & native navigation</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center px-4 border-b border-neutral-800 bg-neutral-950/60 overflow-x-auto no-scrollbar gap-2 py-2">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('app');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'app'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            App.tsx (React Native)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('package');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'package'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            package.json (Expo)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('instructions');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'instructions'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            CLI / Expo Go Guide
          </button>
        </div>

        {/* Code Content */}
        <div className="relative flex-1 p-4 bg-neutral-950 overflow-auto font-mono text-xs text-neutral-300 max-h-[50vh]">
          <button
            onClick={() => handleCopy(currentCode, activeTab)}
            className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition border border-neutral-700 shadow-md"
          >
            {copiedFile === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
          <pre className="whitespace-pre">{currentCode}</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Powered by <strong className="text-neutral-200">React Native Web & Expo Architecture</strong>
          </div>
          <button
            onClick={() => handleCopy(currentCode, activeTab)}
            className="px-4 py-2 rounded-xl bg-[#C61E28] hover:bg-[#A00016] text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-md cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            Copy Current File
          </button>
        </div>
      </div>
    </div>
  );
};
