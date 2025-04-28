import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Login } from "@/components/auth/login";
import { Index } from "@/components/index";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Calendar from "./pages/Calendar";
import POS from "./pages/POS";
import Settings from "./pages/Settings";
import Accounting from "./pages/Accounting";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="pillpulse-theme">
      <Toaster />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
