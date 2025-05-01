
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CashierDashboard } from "./CashierDashboard";
import { PharmacistDashboard } from "./PharmacistDashboard";
import { AdminDashboard } from "./AdminDashboard";

export const RoleDashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  switch (user.role) {
    case "cashier":
      return <CashierDashboard />;
    case "pharmacist":
      return <PharmacistDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Unknown role</div>;
  }
};
