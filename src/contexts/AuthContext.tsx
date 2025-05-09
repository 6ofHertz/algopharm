import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase-config";

// Types
export type UserRole = "cashier" | "pharmacist" | "admin";

interface AppUser {
  uid: string;
  email: string | null;
  role?: UserRole; // Extend later with custom claims or Firestore
}

interface Shift {
  user: AppUser;
  startTime: Date;
  endTime: Date | null;
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  currentShift: Shift | null;
  startShift: (user: AppUser) => void;
  endShift: () => void;
}

// Auth setup
const auth = getAuth(app);
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hooks
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const useShift = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useShift must be used within an AuthProvider");
  return {
    currentShift: context.currentShift,
    startShift: context.startShift,
    endShift: context.endShift,
  };
};

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Extend this to fetch user role from Firestore if needed
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCred.user;
      // TODO: Save name and role to Firestore or use custom claims
      setUser({ uid: newUser.uid, email: newUser.email, role });
    } catch (error: any) {
      console.error("Register error:", error.message);
      throw new Error(error.message);
    }
  };

  const hasRole = (roleCheck: UserRole | UserRole[]) => {
    if (!user || !user.role) return false;
    if (Array.isArray(roleCheck)) return roleCheck.includes(user.role);
    return user.role === roleCheck;
  };

  const startShift = (user: AppUser) => {
    setCurrentShift({ user, startTime: new Date(), endTime: null });
  };

  const endShift = () => {
    setCurrentShift((prev) =>
      prev ? { ...prev, endTime: new Date() } : null
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        hasRole,
        currentShift,
        startShift,
        endShift,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
