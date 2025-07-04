import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
// Corrected UserRole definition and moved to be exported
export type UserRole = "cashier" | "pharmacist" | "admin" | "manager";
interface AuthContextType {
  user: User | null; // Replace 'any' with your actual user type
  login: (userData: any) => Promise<void>; // Replace 'any' with your login data type
  logout: () => void;
  register: (...args: any[]) => Promise<void>;
}

// Define a User interface with role
interface User {
  id: string | number;
  role: string;
}

// Create the context with initial default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps { 
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { 
  const [user, setUser] = useState<User | null>(null); // Replace 'any' with your actual user type

  const login = async (userData: any) => { // Replace 'any' with your login data type
    console.log('Attempting to log in with:', userData);
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Assuming userData contains username and password
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('jwt_token', data.access_token); // Store the JWT token
      setUser(data.user); // Assuming API returns user data including role
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show an error message to the user)
    }
  };

  // Placeholder logout function - replace with your actual logout logic
  const logout = () => { 
    localStorage.removeItem('jwt_token'); // Remove the JWT token
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Generate a simple unique employee ID (you might want a more robust method)
        const employee_id = Date.now().toString(); 

        const { data: insertData, error: insertError } = await supabase.from('users').insert([
          { id: data.user.id, name, role, employee_id },
        ]);
        
        if (insertError) {
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Re-throw the error to be caught by the component
    }
  };

  // Load user from storage on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // In a real app, you would validate the token with your backend
      // and fetch user data based on the token to ensure it's valid
      // For now, a basic placeholder assuming token presence means user is logged in
      // and you might have cached user data or can derive it from the token.
      // Example: Fetch user data based on token (replace with your actual API call)
      // const fetchUserData = async () => {
      //   try {
      //     const response = await fetch('/api/user', { // Hypothetical user endpoint
      //       headers: { 'Authorization': `Bearer ${token}` }
      //     });
      //     const userData = await response.json();
      //     setUser(userData);
      //   } catch (error) {
      //     console.error('Failed to fetch user data on app load:', error);
      //   }
      // };
      // fetchUserData();
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
