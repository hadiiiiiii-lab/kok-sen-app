import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  phone?: string;
  defaultAddress?: string;
  defaultPostalCode?: string;
  role: 'customer' | 'admin';
  createdAt?: string;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  loginWithUsernameOrEmail: (identity: string, pass: string) => Promise<void>;
  registerWithUsername: (
    username: string,
    pass: string,
    displayName: string,
    phone?: string,
    email?: string,
    defaultAddress?: string,
    defaultPostalCode?: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserPreferences: (prefs: Partial<UserProfile>) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to convert plain username into internal Firebase Auth email if no '@' provided
function formatAuthEmail(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (trimmed.includes('@')) {
    return trimmed;
  }
  // Remove non-alphanumeric/underscore chars for email compatibility
  const sanitized = trimmed.replace(/[^a-z0-9_]/g, '');
  return `${sanitized || 'user'}@koksen.local`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem('koksen_cached_profile');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = () => setAuthError(null);

  // Sync profile to localStorage for instant UI responsiveness
  useEffect(() => {
    if (userProfile) {
      try {
        localStorage.setItem('koksen_cached_profile', JSON.stringify(userProfile));
      } catch {}
    } else {
      localStorage.removeItem('koksen_cached_profile');
    }
  }, [userProfile]);

  // Fetch Firestore user doc
  const fetchUserProfile = async (user: FirebaseUser): Promise<UserProfile> => {
    const userRef = doc(db, 'users', user.uid);
    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        const profile: UserProfile = {
          uid: user.uid,
          username: data.username || (user.email ? user.email.split('@')[0] : 'diner'),
          displayName: data.displayName || user.displayName || 'Kok Sen Diner',
          email: data.email || user.email || '',
          phone: data.phone || '',
          defaultAddress: data.defaultAddress || '',
          defaultPostalCode: data.defaultPostalCode || '',
          role: data.role || 'customer',
          createdAt: data.createdAt || new Date().toISOString(),
        };
        setUserProfile(profile);
        return profile;
      } else {
        // Create initial profile in Firestore
        const defaultUsername = (user.email ? user.email.split('@')[0] : `diner_${user.uid.slice(0, 5)}`).replace(/[^a-zA-Z0-9_]/g, '_');
        const newProfile: UserProfile = {
          uid: user.uid,
          username: defaultUsername,
          displayName: user.displayName || defaultUsername,
          email: user.email || '',
          phone: '',
          defaultAddress: '',
          defaultPostalCode: '',
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.warn('Could not read user profile from Firestore:', err);
      // Fallback in-memory profile
      const fallback: UserProfile = {
        uid: user.uid,
        username: (user.email ? user.email.split('@')[0] : 'diner').replace(/[^a-zA-Z0-9_]/g, '_'),
        displayName: user.displayName || 'Kok Sen Diner',
        email: user.email || '',
        role: 'customer',
      };
      setUserProfile(fallback);
      return fallback;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          await fetchUserProfile(user);
        } catch {}
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithUsernameOrEmail = async (identity: string, pass: string) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const email = formatAuthEmail(identity);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await fetchUserProfile(cred.user);
    } catch (err: any) {
      console.error('Login error:', err);
      let message = 'Unable to sign in. Please verify your username and password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        message = 'Account not found or password incorrect. Please check your credentials.';
      } else if (err.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message =
          'Email/Password sign-in provider is not enabled in Firebase Console yet. Please use Google Login or enable Email/Password in your Firebase Console Authentication tab.';
      }
      setAuthError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithUsername = async (
    username: string,
    pass: string,
    displayName: string,
    phone?: string,
    email?: string,
    defaultAddress?: string,
    defaultPostalCode?: string
  ) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const cleanedUsername = username.trim().replace(/[^a-zA-Z0-9_]/g, '');
      if (cleanedUsername.length < 3) {
        throw new Error('Username must be at least 3 characters and contain only letters, numbers, or underscores.');
      }
      const authEmail = email && email.includes('@') ? email.trim() : `${cleanedUsername.toLowerCase()}@koksen.local`;

      const cred = await createUserWithEmailAndPassword(auth, authEmail, pass);
      await updateProfile(cred.user, {
        displayName: displayName.trim() || cleanedUsername,
      });

      const profileData: UserProfile = {
        uid: cred.user.uid,
        username: cleanedUsername,
        displayName: displayName.trim() || cleanedUsername,
        email: authEmail,
        phone: phone?.trim() || '',
        defaultAddress: defaultAddress?.trim() || '',
        defaultPostalCode: defaultPostalCode?.trim() || '',
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'users', cred.user.uid), profileData);
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `users/${cred.user.uid}`);
      }

      setUserProfile(profileData);
    } catch (err: any) {
      console.error('Registration error:', err);
      let message = err.message || 'Unable to complete registration.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'This username or email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message =
          'Email/Password sign-in is not enabled in Firebase Console yet. Please enable Email/Password under Authentication in Firebase Console or use Google Sign-In.';
      }
      setAuthError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      await fetchUserProfile(cred.user);
    } catch (err: any) {
      console.error('Google Sign-In error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Google sign-in was not completed.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const updateUserPreferences = async (prefs: Partial<UserProfile>) => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, prefs);
      setUserProfile((prev) => (prev ? { ...prev, ...prefs } : null));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isLoading,
        loginWithUsernameOrEmail,
        registerWithUsername,
        loginWithGoogle,
        logout,
        updateUserPreferences,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
