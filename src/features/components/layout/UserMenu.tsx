// src/components/layout/UserMenu.tsx
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/ui/dropdown-menu'; // Updated path
import { useAuth } from '@/features/Auth/AuthContext'; // Updated path
// Note: Assuming pharmacyName is not standard and may need adjustment based on its location
// Assuming Settings component is in features/Dashboard
import { pharmacyName } from '@/features/Dashboard/Settings'; // Updated path (assuming)
import { useNavigate } from 'react-router-dom';


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