import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const {
    loginWithUsernameOrEmail,
    registerWithUsername,
    loginWithGoogle,
    authError,
    clearAuthError,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Sign In state
  const [loginIdentity, setLoginIdentity] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPostal, setRegPostal] = useState('');
  const [regAddress, setRegAddress] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTabSwitch = (newMode: 'signin' | 'register') => {
    setMode(newMode);
    setLocalError(null);
    clearAuthError();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    if (!loginIdentity.trim() || !loginPassword) {
      setLocalError('Please enter both your username/email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithUsernameOrEmail(loginIdentity, loginPassword);
      onClose();
    } catch (err: any) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    const cleanUser = regUsername.trim().replace(/[^a-zA-Z0-9_]/g, '');
    if (cleanUser.length < 3) {
      setLocalError('Username must be at least 3 characters (alphanumeric and underscores only).');
      return;
    }
    if (regPassword.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerWithUsername(
        cleanUser,
        regPassword,
        regDisplayName.trim() || cleanUser,
        regPhone.trim(),
        regEmail.trim() || undefined,
        regAddress.trim() || undefined,
        regPostal.trim() || undefined
      );
      onClose();
    } catch (err: any) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    clearAuthError();
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAddress = () => {
    setRegPostal('089112');
    setRegAddress('Blk 3 Cantonment Close, #12-304');
    setRegDisplayName('Alex Tan');
    setRegPhone('+65 9123 4567');
  };

  const activeError = localError || authError;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1017] to-[#C61E28] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-white/20 uppercase text-amber-200 border border-white/20">
              Heritage Diner Account
            </span>
          </div>
          <h2 className="font-epilogue text-xl font-bold">
            {mode === 'signin' ? 'Welcome Back to Kok Sen' : 'Join Kok Sen Diners'}
          </h2>
          <p className="text-white/80 text-xs mt-1">
            {mode === 'signin'
              ? 'Sign in to access your delivery addresses, past orders, and takeaway perks.'
              : 'Create your account to order takeaway, track islandwide delivery, and save preferences.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2 mt-4 bg-black/20 p-1 rounded-xl">
            <button
              onClick={() => handleTabSwitch('signin')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signin' ? 'bg-white text-gray-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1">{activeError}</div>
            </div>
          )}

          {mode === 'signin' ? (
            /* Sign In Form */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentity}
                    onChange={(e) => setLoginIdentity(e.target.value)}
                    placeholder="e.g. diner_alex or alex@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#C61E28] hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer mt-2"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In to Account'}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="e.g. alex_tan88"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                  />
                </div>
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  3-32 characters, letters, numbers & underscores only
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regDisplayName}
                    onChange={(e) => setRegDisplayName(e.target.value)}
                    placeholder="e.g. Alex Tan"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+65 9123 4567"
                      className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Delivery Address Defaults */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C61E28]" />
                    Delivery Address (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={fillDemoAddress}
                    className="text-[11px] text-[#C61E28] hover:underline font-medium cursor-pointer"
                  >
                    Fill Singapore Demo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="col-span-1">
                    <input
                      type="text"
                      maxLength={6}
                      value={regPostal}
                      onChange={(e) => setRegPostal(e.target.value)}
                      placeholder="Postal (e.g. 089112)"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C61E28]"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="Street / Unit (e.g. Blk 3 #12-304)"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C61E28]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Optional for receipts (or @koksen.local is used)"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#C61E28] hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer mt-2"
              >
                {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>
          )}

          {/* Social Sign-In Divider */}
          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-2 text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
              Or
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-2 px-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};
