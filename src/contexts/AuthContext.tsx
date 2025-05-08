
import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "cashier" | "pharmacist" | "admin";

interface Shift {
  user: User;
  startTime: Date;
  endTime: Date | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId: string;
}

interface AuthContextType extends ShiftContextType{
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}
interface ShiftContextType {
  currentShift: Shift | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const useShift = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useShift must be used within an AuthProvider");
  }
  return {
    currentShift: context.currentShift,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // In a real app, this would come from a backend API/localStorage
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  const startShift = (user: User) => {
    setCurrentShift({ user, startTime: new Date(), endTime: null });
  };
  const endShift = () => {
    setCurrentShift((prev) => (prev ? { ...prev, endTime: new Date() } : null));
  };
  const [user, setUser] = useState<User | null>(null);

  // Mock users for demo purposes
  const mockUsers = {
    "cashier@algopharm.com": {
      id: "usr_001",
      name: "John Doe",
      email: "cashier@algopharm.com",
      role: "cashier" as UserRole,
      employeeId: "CSH-001",
    },
    "pharmacist@algopharm.com": {
      id: "usr_002",
      name: "Dr. Sarah Johnson",
      email: "pharmacist@algopharm.com",
      role: "pharmacist" as UserRole,
      employeeId: "PHR-001",
    },
    "admin@algopharm.com": {
      id: "usr_003",
      name: "Alex Smith",
      email: "admin@algopharm.com",
      role: "admin" as UserRole,
      employeeId: "ADM-001",
    },
  };

  const login = async (email: string, password: string) => {
    // This would normally validate against a backend API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const mockUser = mockUsers[email as keyof typeof mockUsers];
        if (mockUser && password === "password") {
          setUser(mockUser);
          localStorage.setItem('loginTime', Date.now().toString());
          startShift(mockUser);
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
      
    });
  };

  const logout = () => {
    localStorage.removeItem('loginTime');
    setUser(null);
  };

  const hasRole = (roleCheck: UserRole | UserRole[]) => {
    if (!user) return false;
    
    if (Array.isArray(roleCheck)) {
      return roleCheck.includes(user.role);
    }
    
    return user.role === roleCheck;
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        currentShift,
        
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
