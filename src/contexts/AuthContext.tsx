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

// Define the structure of the user object used within the application
// This combines Firebase auth properties with additional user details
interface AppUser {
  id: string; // Corresponds to the document ID in Firestore or a unique identifier
  uid: string;
  email: string | null;
  name: string; // User's full name
  employeeId: string; // Employee ID or similar identifier
  active: boolean; // Whether the user account is active
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
        // TODO: Fetch full AppUser data from backend/database based on firebaseUser.uid
        // This data should include id, name, employeeId, active, and role
        const fullUserData: AppUser = { // Placeholder, replace with actual fetched data
          id: firebaseUser.uid, // Using UID as placeholder ID
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: "Loading User...", // Placeholder
          employeeId: "N/A", // Placeholder
          active: true, // Placeholder
        };
        setUser(fullUserData);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After successful sign-in, onAuthStateChanged will trigger and update user state
      // If you need to fetch additional user data *immediately* after login
      // (before onAuthStateChanged might fully update), you could add fetching logic here as well.
      // Example:
      // const firebaseUser = auth.currentUser;
      // if (firebaseUser) {
      //   // TODO: Fetch full AppUser data from backend/database based on firebaseUser.uid
      //   // setUser(fetchedFullUserData);
      // }
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
      // TODO: Save name, role, and other user details to backend/database (e.g., Firestore, PostgreSQL)
      // Then fetch the complete AppUser object with the newly created details.
      const registeredUser: AppUser = { // Placeholder, replace with actual created/fetched data
        id: newUser.uid, // Using UID as placeholder ID
        uid: newUser.uid,
        email: newUser.email,
        name: name, // Use the name provided during registration
        employeeId: "Generating...", // Placeholder or generated ID
        active: true, // New users are typically active
        role: role, // Use the role provided during registration
      };
      setUser(registeredUser);
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
