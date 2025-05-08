import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null; // Replace 'any' with your actual user type
  login: (userData: any) => Promise<void>; // Replace 'any' with your login data type
  logout: () => void;
}

// Define a User interface
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
    <AuthContext.Provider value={{ user, login, logout }}>
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
