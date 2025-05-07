
import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "cashier" | "pharmacist" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, this would come from a backend API/localStorage
  const [user, setUser] = useState<User | null>(null);

  // Mock users for demo purposes - updated to match the Login component emails
  const mockUsers = {
    "cashier@apothekepro.com": {
      id: "usr_001",
      name: "John Doe",
      email: "cashier@apothekepro.com",
      role: "cashier" as UserRole,
      employeeId: "CSH-001",
    },
    "pharma@apothekepro.com": {
      id: "usr_002",
      name: "Dr. Sarah Johnson",
      email: "pharma@apothekepro.com",
      role: "pharmacist" as UserRole,
      employeeId: "PHR-001",
    },
    "admin@apothekepro.com": {
      id: "usr_003",
      name: "Alex Smith",
      email: "admin@apothekepro.com",
      role: "admin" as UserRole,
      employeeId: "ADM-001",
    },
  };

  const login = async (email: string, password: string) => {
    // This would normally validate against a backend API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const mockUser = mockUsers[email as keyof typeof mockUsers];
        if (mockUser && password === "password123") {
          setUser(mockUser);
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  };

  const logout = () => {
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
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
