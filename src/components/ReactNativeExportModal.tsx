import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Download, Code, Layers, Sparkles, Terminal } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'app' | 'index' | 'package' | 'instructions'>('app');

  if (!isOpen) return null;

  const appTsxCode = `// Kok Sen Restaurant - Pure React Native CLI Application
// Zero Expo dependencies - runs directly via react-native run-android / react-native run-ios

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

// React Native CLI Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { DeliveryScreen } from './src/screens/DeliveryScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { BookingsScreen } from './src/screens/BookingsScreen';
import { NativeHeader } from './src/components/native/NativeHeader';
import { NativeTabBar } from './src/components/native/NativeTabBar';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState({});
  const [tableNumber, setTableNumber] = useState('04');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NativeHeader
        cartCount={Object.values(cart).reduce((a, b) => a + b, 0)}
        onOpenCart={() => {}}
        onOpenChat={() => {}}
        onOpenQRScanner={() => {}}
        onOpenAuth={() => {}}
        onLogoPress={() => setActiveTab('home')}
        tableNumber={tableNumber}
        isLoggedIn={false}
      />
      <View style={styles.screenContainer}>
        {activeTab === 'home' && <HomeScreen onTabChange={setActiveTab} onAddToCart={() => {}} onOpenQRScanner={() => {}} onOpenChat={() => {}} />}
        {activeTab === 'menu' && <MenuScreen cart={cart} onUpdateQty={() => {}} tableNumber={tableNumber} onTableNumberChange={setTableNumber} onOpenQRScanner={() => {}} />}
        {activeTab === 'delivery' && <DeliveryScreen onOpenCart={() => {}} cartCount={0} />}
        {activeTab === 'history' && <OrdersScreen orders={[]} onOrderAgain={() => {}} onTabChange={setActiveTab} onOpenCart={() => {}} />}
        {activeTab === 'bookings' && <BookingsScreen />}
      </View>
      <NativeTabBar activeTab={activeTab} onTabChange={setActiveTab} orderCount={0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
});
`;

  const indexJsCode = `/**
 * React Native CLI Entry Point (index.js)
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
`;

  const packageJsonCode = `{
  "name": "KokSenRestaurant",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "18.3.1",
    "react-native": "0.76.5",
    "lucide-react": "^0.546.0",
    "firebase": "^11.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@babel/runtime": "^7.25.0",
    "@react-native/babel-preset": "0.76.5",
    "@react-native/eslint-config": "0.76.5",
    "@react-native/metro-config": "0.76.5",
    "@react-native/typescript-config": "0.76.5",
    "@types/react": "^18.3.12",
    "@types/react-test-renderer": "^18.3.0",
    "babel-jest": "^29.6.3",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "prettier": "2.8.8",
    "react-test-renderer": "18.3.1",
    "typescript": "5.0.4"
  },
  "engines": {
    "node": ">=18"
  }
}`;

  const cliInstructions = `# React Native CLI Setup & Execution Guide (No Expo)

1. Initialize React Native CLI project:
   npx @react-native-community/cli init KokSenRestaurant

2. Navigate into project directory:
   cd KokSenRestaurant

3. Copy this app's src/ directory and index.js into your project.

4. Run on Android Device / Emulator:
   npx react-native run-android

5. Run on iOS Simulator / iPhone (macOS):
   cd ios && pod install && cd ..
   npx react-native run-ios

6. Build Release APK (Android):
   cd android && ./gradlew assembleRelease
   APK will be generated at: android/app/build/outputs/apk/release/app-release.apk
`;

  const currentCode =
    activeTab === 'app'
      ? appTsxCode
      : activeTab === 'index'
      ? indexJsCode
      : activeTab === 'package'
      ? packageJsonCode
      : cliInstructions;

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
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-neutral-100">Pure React Native CLI Architecture</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CLI Native • Zero Expo
                </span>
              </div>
              <p className="text-xs text-neutral-400">Complete source code for react-native run-android / run-ios</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'app'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            App.tsx (CLI)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('index');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'index'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            index.js
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('package');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'package'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            package.json (CLI)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('instructions');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'instructions'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            CLI Run Commands
          </button>
        </div>

        {/* Code Content */}
        <div className="relative flex-1 p-4 bg-neutral-950 overflow-auto font-mono text-xs text-neutral-300 max-h-[50vh]">
          <button
            onClick={() => handleCopy(currentCode, activeTab)}
            className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition border border-neutral-700 shadow-md cursor-pointer"
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
            Target: <strong className="text-neutral-200">React Native CLI (Android & iOS)</strong>
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
