
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { ThemeProvider } from "@/features/Theme/theme-provider";
import Login from "@/features/Auth/Login";
import DashboardLayout from "@/features/Layout/DashboardLayout";
import { AuthProvider } from "@/features/Auth/AuthContext";
import { ProtectedRoute } from "@/features/Auth/ProtectedRoute";

import Dashboard from "@/features/Dashboard/Dashboard";
import Inventory from "@/features/Inventory/Inventory";
import Calendar from "@/features/Calendar/Calendar";
import POS from "@/features/POS/POS";
import Settings from "@/features/Dashboard/Settings";
import Accounting from "@/features/Accounting/pages/Accounting";
import NotFound from "@/features/NotFound/NotFound";
import AskAI from "@/features/AskAI/AskAI";
import Index from "@/features/Index/Index";

function App() {
 return (
    <ThemeProvider defaultTheme="light" storageKey="algopharm-theme">
      <AuthProvider>
        <Toaster />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Protected dashboard routes */}
            <Route element={<ProtectedRoute />}>
 <Route element={<DashboardLayout />}>
 <Route path="/ai" element={<AskAI />} />
 <Route path="/dashboard" element={<Dashboard />} />
 <Route path="/settings" element={<Settings />} />
 {/* Cashier specific routes */}
 <Route path="/pos" element={<POS />} />
 {/* Pharmacist specific routes */}
 <Route path="/inventory" element={<Inventory />} />
 <Route path="/calendar" element={<Calendar />} />
 {/* Admin specific routes */}
 <Route path="/accounting" element={<Accounting />} />
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
