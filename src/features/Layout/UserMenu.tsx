import React, { useState, useEffect, useRef } from "react";
import { LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/features/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface UserMenuProps {

  user: {
    name: string;
    role: string;
    initials: string;
  };
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleMenuClick = () => {
    setIsOpen(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef}>
      <Button
        variant="ghost"
        className="flex justify-start px-2 py-1.5 w-full"
        onClick={handleMenuClick}
      >
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start text-left">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.role}</span>
        </div>
      </Button>

      <div
        className={cn(
          "absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="py-1">
          <li className="px-4 py-2 text-sm font-bold text-gray-700">{user.name}</li>
          <li className="border-t border-gray-100"></li>
          <li
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </li>
          <li
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};
