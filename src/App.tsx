
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from 'sonner';

// Import components
import DashboardLayout from '@/components/layout/DashboardLayout';
import Login from '@/features/Auth/Login';
import Dashboard from '@/features/Dashboard';
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
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
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
