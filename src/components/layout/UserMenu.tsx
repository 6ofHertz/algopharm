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
// import { pharmacyName } from '@/components/Settings'; // Commented out as it's likely not a named export from Settings.tsx

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