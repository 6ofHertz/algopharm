
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Login } from "@/components/auth/Login";
import { Index } from "@/components/Index";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Calendar from "./pages/Calendar";
import POS from "./pages/POS";
import Settings from "./pages/Settings";
import Accounting from "./pages/Accounting";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { LoginForm } from "@/components/auth/LoginForm";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="algopharm-theme">
      <AuthProvider>
        <Toaster />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected dashboard routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Cashier specific routes */}
                <Route element={<ProtectedRoute allowedRoles={["cashier", "admin", "pharmacist"]} />}>
                  <Route path="/pos" element={<POS />} />
                </Route>
                
                {/* Pharmacist specific routes */}
                <Route element={<ProtectedRoute allowedRoles={["pharmacist", "admin"]} />}>
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/calendar" element={<Calendar />} />
                </Route>
                
                {/* Admin specific routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
