
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
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Mock users for demo purposes 
  const [mockUsers, setMockUsers] = useState({
    "cashier@apothekepro.com": {
      id: "usr_001",
      name: "John Doe",
      email: "cashier@apothekepro.com",
      role: "cashier" as UserRole,
      employeeId: "CSH-001",
      password: "password123"
    },
    "pharma@apothekepro.com": {
      id: "usr_002",
      name: "Dr. Sarah Johnson",
      email: "pharma@apothekepro.com",
      role: "pharmacist" as UserRole,
      employeeId: "PHR-001",
      password: "password123"
    },
    "admin@apothekepro.com": {
      id: "usr_003",
      name: "Alex Smith",
      email: "admin@apothekepro.com",
      role: "admin" as UserRole,
      employeeId: "ADM-001",
      password: "password123"
    },
  });

  const login = async (email: string, password: string) => {
    // This would normally validate against a backend API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const mockUser = mockUsers[email as keyof typeof mockUsers];
        if (mockUser && mockUser.password === password) {
          const userData = { ...mockUser };
          delete userData.password;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[email as keyof typeof mockUsers]) {
          reject(new Error("Email already exists"));
          return;
        }

        // Generate a unique ID and employee ID based on role
        const id = `usr_${Math.floor(1000 + Math.random() * 9000)}`;
        const rolePrefix = role === 'cashier' ? 'CSH' : role === 'pharmacist' ? 'PHR' : 'ADM';
        const employeeId = `${rolePrefix}-${Math.floor(100 + Math.random() * 900)}`;
        
        const newUser = {
          id,
          name,
          email,
          role,
          employeeId,
          password
        };
        
        // Add user to mock database
        setMockUsers(prev => ({
          ...prev,
          [email]: newUser
        }));
        
        // Log in the new user
        const userData = { ...newUser };
        delete userData.password;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
        register,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
