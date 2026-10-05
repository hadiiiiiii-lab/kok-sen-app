import React, { useState } from 'react';
import {
  X,
  Smartphone,
  QrCode,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface DeployMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl?: string;
}

export const DeployMobileModal: React.FC<DeployMobileModalProps> = ({
  isOpen,
  onClose,
  appUrl = 'https://ais-pre-wasyhlhqda5uuvminuphml-275544518693.asia-southeast1.run.app',
}) => {
  const [activeTab, setActiveTab] = useState<'pwa' | 'expogo' | 'apk'>('pwa');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    triggerHaptic('success');
    playNativeSound('tap');
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopySnippet = (code: string, id: string) => {
    triggerHaptic('success');
    playNativeSound('tap');
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // QR code encoded as an image via quick QR service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&color=121214&bgcolor=ffffff&data=${encodeURIComponent(
    appUrl
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C61E28] text-white flex items-center justify-center shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-neutral-100">Deploy to Actual Mobile Phone</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready
                </span>
              </div>
              <p className="text-xs text-neutral-400">Run on physical iPhone & Android devices</p>
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

        {/* Navigation Tabs */}
        <div className="flex items-center px-4 border-b border-neutral-800 bg-neutral-950/60 overflow-x-auto no-scrollbar gap-2 py-2">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('pwa');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'pwa'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            1. Instant Install (PWA)
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('expogo');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'expogo'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            2. Run in Expo Go
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('apk');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'apk'
                ? 'bg-[#C61E28] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            3. Build Standalone APK / iOS
          </button>
        </div>

        {/* Tab 1: Instant PWA Install via QR */}
        {activeTab === 'pwa' && (
          <div className="p-4 overflow-y-auto space-y-4 max-h-[65vh]">
            {/* Live QR Code Box */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="p-2 bg-white rounded-xl shadow-lg shrink-0">
                <img
                  src={qrCodeUrl}
                  alt="Scan to open on mobile"
                  className="w-36 h-36 object-contain"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Mobile URL
                </div>
                <h4 className="font-bold text-sm text-neutral-100">
                  Scan QR with your Phone Camera
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Open your iPhone or Android camera app and point it at the QR code to launch Kok Sen directly.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition border border-neutral-700 cursor-pointer"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">URL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#C61E28] hover:bg-[#A00016] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Live
                  </a>
                </div>
              </div>
            </div>

            {/* Step-by-step install guide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* iPhone Guide */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-xs font-bold">
                    Apple iPhone (iOS Safari)
                  </span>
                </div>
                <ol className="text-xs text-neutral-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the URL in <strong>Safari</strong>.</li>
                  <li>Tap the <strong>Share button</strong> (square with arrow up at the bottom).</li>
                  <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                  <li>Tap <strong>Add</strong> in the top right.</li>
                </ol>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Installed with icon, offline cache, and zero address bar!
                </div>
              </div>

              {/* Android Guide */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    Android (Chrome)
                  </span>
                </div>
                <ol className="text-xs text-neutral-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the URL in <strong>Chrome</strong>.</li>
                  <li>Tap the <strong>"Install App"</strong> banner or the <strong>3 dots (⋮)</strong> menu.</li>
                  <li>Tap <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</li>
                  <li>Tap <strong>Install</strong> to confirm.</li>
                </ol>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Appears in your app drawer alongside native apps!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Run in Expo Go */}
        {activeTab === 'expogo' && (
          <div className="p-4 overflow-y-auto space-y-3.5 max-h-[65vh] text-xs">
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
              <strong className="font-bold">Expo Go:</strong> Run the complete React Native project on your physical phone in 60 seconds without Mac Xcode or Android Studio!
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-neutral-200">Step 1: Install Expo Go App on your Phone</div>
              <p className="text-neutral-400">
                Download <strong>Expo Go</strong> free from the Apple App Store (iOS) or Google Play Store (Android).
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-200">Step 2: Create React Native Project on your computer</span>
                <button
                  onClick={() =>
                    handleCopySnippet(
                      'npx create-expo-app kok-sen-mobile --template blank-typescript\ncd kok-sen-mobile\nnpx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-safe-area-context react-native-screens @expo/vector-icons expo-camera expo-haptics',
                      'cli1'
                    )
                  }
                  className="text-neutral-400 hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  {copiedCode === 'cli1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy command
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`npx create-expo-app kok-sen-mobile --template blank-typescript
cd kok-sen-mobile
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-safe-area-context react-native-screens @expo/vector-icons expo-camera expo-haptics`}
              </pre>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-200">Step 3: Launch Native Dev Server</span>
                <button
                  onClick={() => handleCopySnippet('npx expo start', 'cli2')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  {copiedCode === 'cli2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy command
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`npx expo start`}
              </pre>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-neutral-200">Step 4: Scan the Terminal QR Code</div>
              <p className="text-neutral-400">
                • <strong>iPhone</strong>: Open Camera app and tap the prompt to open in Expo Go.<br />
                • <strong>Android</strong>: Open Expo Go and tap "Scan QR code".
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Build Standalone APK / iOS */}
        {activeTab === 'apk' && (
          <div className="p-4 overflow-y-auto space-y-3.5 max-h-[65vh] text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
              <strong className="font-bold">EAS Build (Expo Application Services):</strong> Builds standalone installable binaries in the cloud. No native compilers required on your machine!
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-200">1. Install EAS CLI & Log In</span>
                <button
                  onClick={() => handleCopySnippet('npm install -g eas-cli && eas login', 'cli3')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  {copiedCode === 'cli3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`npm install -g eas-cli
eas login`}
              </pre>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-200">2. Generate Direct Downloadable Android APK</span>
                <button
                  onClick={() => handleCopySnippet('eas build -p android --profile preview', 'cli4')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  {copiedCode === 'cli4' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`eas build -p android --profile preview`}
              </pre>
              <p className="text-[11px] text-neutral-400">
                EAS will compile and output a direct download link for the <code className="text-white font-mono">.apk</code> file. You can install it on any Android phone directly!
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-200">3. Build iOS for TestFlight / Apple App Store</span>
                <button
                  onClick={() => handleCopySnippet('eas build -p ios', 'cli5')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  {copiedCode === 'cli5' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`eas build -p ios`}
              </pre>
              <p className="text-[11px] text-neutral-400">
                Uploads directly to Apple TestFlight so you and your team can install it on iPhones via TestFlight.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Current Target: <strong className="text-neutral-200">iOS & Android Mobile</strong>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
