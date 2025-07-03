
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from 'sonner';

// Import components
import DashboardLayout from '@/components/layout/DashboardLayout';
import Landing from '@/features/Landing/Landing';
import GetStarted from '@/features/Onboarding/GetStarted';
import SmartLogin from '@/features/Auth/SmartLogin';
import Dashboard from '@/features/Dashboard';
import FunctionalDashboard from '@/features/Dashboard/FunctionalDashboard';
import POS from '@/features/POS';
import Inventory from '@/features/Inventory';
import Accounting from '@/features/Accounting';
import Settings from '@/features/Settings';
import { ProtectedRoute } from '@/features/Auth/ProtectedRoute';

import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/login" element={<SmartLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/management" element={<FunctionalDashboard />} />
                  <Route path="/pos" element={<POS />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
