
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  // You might want to define a specific type for allowedRoles if you have strict role checking
  // allowedRoles?: string[]; // Example if roles are strings
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  // allowedRoles, // Commented out as per instruction to simplify
  redirectTo = "/login"
}) => {
  // Using a placeholder for authentication check.
  // You should replace this with your actual authentication status from useAuth.
  const { user } = useAuth(); // Assuming useAuth provides the current user object
  const isAuthenticated = !!user; // Simple check if user object exists

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // The instruction specifically asked for a placeholder check for authentication.
  // Role-based access control logic is removed as per the specific instruction for *this* code generation.
  // You will need to add role-based checks here if required for specific routes.

  return <Outlet />;
};
