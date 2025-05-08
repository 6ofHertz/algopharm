import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/UI/dropdown-menu'; // Corrected path
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/features/UI/alert-dialog';
import { useAuth } from '@/features/Auth/AuthContext'; // Corrected path
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface UserMenuProps {
 username: string;
  user: {
    name: string;
    role: string;
    initials: string;
    id: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ username }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { user, logout } = useAuth(); // Get user from useAuth
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
        <div className="p-2 rounded-md cursor-pointer"> {/* Use username prop */}
 {username}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 animate-in fade-in-50"> {/* Add animate-in classes */}
        <DropdownMenuLabel className="text-center font-bold">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
        <AlertDialog>
 <AlertDialogTrigger asChild>
 <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setShowLogoutDialog(true)}>
 Logout
 </DropdownMenuItem>
 </AlertDialogTrigger>
 <AlertDialogContent>
 <AlertDialogHeader>
 <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
 <AlertDialogDescription>
 Are you sure you want to log out?
 </AlertDialogDescription>
 </AlertDialogHeader>
 <AlertDialogFooter>
 <AlertDialogCancel onClick={() => setShowLogoutDialog(false)}>Cancel</AlertDialogCancel>
 <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
 </AlertDialogFooter>
 </AlertDialogContent>
 </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;