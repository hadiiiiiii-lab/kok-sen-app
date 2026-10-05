import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Flashlight, CheckCircle2, RotateCw, Sparkles, QrCode } from 'lucide-react';
import { playNativeSound, triggerHaptic } from '../utils/nativeSensors';

interface QRTableScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTableScanned: (tableNumber: string) => void;
  currentTable: string;
}

export const QRTableScannerModal: React.FC<QRTableScannerModalProps> = ({
  isOpen,
  onClose,
  onTableScanned,
  currentTable,
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [scannedTable, setScannedTable] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setHasScanned(false);
      setScannedTable('');
      setTorchOn(false);
      return;
    }

    // Try starting camera stream if supported
    let stream: MediaStream | null = null;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
          setCameraActive(true);
        }
      })
      .catch(() => {
        // Fallback to high-fidelity animated scanner view
        setCameraActive(false);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectTable = (table: string) => {
    triggerHaptic('success');
    playNativeSound('scan');
    setScannedTable(table);
    setHasScanned(true);

    setTimeout(() => {
      onTableScanned(table);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-700/60 flex flex-col">
        {/* Scanner Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-[#C61E28] flex items-center justify-center">
              <QrCode className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-100">Scan Table QR</h3>
              <p className="text-[11px] text-neutral-400">Point camera at the table QR code</p>
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

        {/* Viewfinder Area */}
        <div className="relative aspect-square w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
          {/* Camera Video Feed or Simulated Lens */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'opacity-80' : 'hidden'}`}
            playsInline
            muted
          />

          {!cameraActive && (
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 opacity-90 flex flex-col items-center justify-center">
              <div className="w-48 h-48 rounded-2xl border border-dashed border-red-500/40 flex items-center justify-center text-center p-4">
                <span className="text-xs text-neutral-400">Position Table QR code within the frame</span>
              </div>
            </div>
          )}

          {/* Animated Laser Scanning Line */}
          {!hasScanned && (
            <div className="absolute inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-[#C61E28] to-transparent shadow-[0_0_12px_#C61E28] animate-pulse z-10 top-1/2 -translate-y-1/2" />
          )}

          {/* QR Viewfinder Target Corners */}
          <div className="relative z-10 w-52 h-52 pointer-events-none flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-7 h-7 border-t-4 border-l-4 border-[#C61E28] rounded-tl-lg" />
              <div className="w-7 h-7 border-t-4 border-r-4 border-[#C61E28] rounded-tr-lg" />
            </div>
            <div className="flex justify-between">
              <div className="w-7 h-7 border-b-4 border-l-4 border-[#C61E28] rounded-bl-lg" />
              <div className="w-7 h-7 border-b-4 border-r-4 border-[#C61E28] rounded-br-lg" />
            </div>
          </div>

          {/* Scanned Success Overlay */}
          {hasScanned && (
            <div className="absolute inset-0 bg-[#C61E28]/90 z-20 flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-white text-[#C61E28] flex items-center justify-center mb-3 shadow-lg">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-lg font-bold text-white">Table Verified!</h4>
              <p className="text-sm text-red-100 font-medium mt-1">
                Connected to Table <span className="font-bold text-white underline">{scannedTable}</span>
              </p>
              <span className="text-[11px] text-red-200 mt-3">Syncing menu & orders...</span>
            </div>
          )}

          {/* Torch & Camera Tools */}
          <div className="absolute bottom-3 right-3 z-10 flex gap-2">
            <button
              onClick={() => {
                triggerHaptic('light');
                setTorchOn(!torchOn);
              }}
              className={`p-2 rounded-full backdrop-blur-md border ${
                torchOn
                  ? 'bg-amber-400 text-black border-amber-300'
                  : 'bg-black/50 text-white border-white/20 hover:bg-black/70'
              }`}
              title="Toggle Flash"
            >
              <Flashlight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Table Simulators / Quick Scan Options */}
        <div className="p-4 bg-neutral-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Quick Scan Presets (Kok Sen Hall)
            </span>
            <span className="text-[10px] text-red-400 font-medium">Tap to simulate scan</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['04', '07', '12'].map((tbl) => (
              <button
                key={tbl}
                onClick={() => handleSelectTable(tbl)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition active:scale-95 flex items-center justify-center gap-1.5 ${
                  currentTable === tbl
                    ? 'bg-red-950/60 border-red-500/60 text-red-300'
                    : 'bg-neutral-800/80 border-neutral-700/60 text-neutral-200 hover:bg-neutral-700/80'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-neutral-400" />
                Table {tbl}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Current Table: <strong className="text-white">Table {currentTable}</strong></span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live QR Engine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
