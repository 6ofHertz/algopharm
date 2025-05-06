tsx
// src/components/Settings.tsx
import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1>Settings Component</h1>
    </div>
  );
};
export default Settings;
```

```
tsx
// src/components/layout/UserMenu.tsx
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { pharmacyName } from '@/components/Settings';

interface UserMenuProps {
  username: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ username }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      const id = setTimeout(() => {
        setIsMenuOpen(false);
      }, 3000);
      setTimeoutId(id);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger onClick={handleMenuToggle}>
        <div className="p-2 rounded-md cursor-pointer">
          {username}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 animate-in fade-in-50">
        <DropdownMenuLabel className="text-center font-bold">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
```

```
tsx
// src/App.tsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Login from '@/components/auth/Login';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import POS from '@/pages/POS';
import Accounting from './pages/Accounting';
import Inventory from './pages/Inventory';
import Calendar from './pages/Calendar';
import SettingsPage from './pages/Settings';
import AskAI from './pages/AskAI';
import Settings from './components/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { checkLoginStatus } = useAuth();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Index />} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/pos" element={<ProtectedRoute><POS /></ProtectedRoute>} />
      <Route path="/accounting" element={<ProtectedRoute><Accounting /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/askai" element={<ProtectedRoute><AskAI /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
```

```
tsx
// src/pages/Settings.tsx
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SettingsComponent from '@/components/Settings';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <SettingsComponent />
    </DashboardLayout>
  );
};

export default SettingsPage;