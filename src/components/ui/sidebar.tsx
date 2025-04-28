import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  BarChart3,
  Calendar as CalendarIcon,
  CircleDollarSign,
  Home,
  LogOut,
  Menu,
  Package2,
  Settings,
  ShoppingCart,
  UserCircle,
  X,
  Calculator,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();
  
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavigate = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };
  
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Inventory",
      icon: <Package2 className="h-5 w-5" />,
      href: "/inventory",
    },
    {
      title: "POS",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/pos",
    },
    {
      title: "Accounting",
      icon: <Calculator className="h-5 w-5" />,
      href: "/accounting",
    },
    {
      title: "Calendar",
      icon: <CalendarIcon className="h-5 w-5" />,
      href: "/calendar",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "#",
    },
  ];
  
  const userSection = [
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
    {
      title: "Profile",
      icon: <UserCircle className="h-5 w-5" />,
      href: "#",
    },
  ];
  
  const renderMobileSidebar = () => (
    <div className="lg:hidden flex items-center justify-between p-4 border-b">
      <div className="font-semibold text-xl flex items-center gap-2 text-primary">
        <CircleDollarSign className="h-6 w-6" />
        PillPulse
      </div>
      <Button variant="ghost" size="icon" onClick={handleToggleSidebar}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
  
  const sidebarContent = (
    <>
      <div className="p-4">
        <div className="font-semibold text-xl flex items-center gap-2 text-primary mb-8">
          <CircleDollarSign className="h-6 w-6" />
          PillPulse
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.title} 
              to={item.href}
              onClick={handleNavigate}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Additional sidebar content could go here */}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <div className="space-y-1">
          {userSection.map((item) => (
            <NavLink 
              key={item.title} 
              to={item.href}
              onClick={handleNavigate}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
          <div 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <ThemeToggle />
          <div className="text-xs text-muted-foreground">v1.0.0</div>
        </div>
      </div>
    </>
  );
  
  if (isMobile) {
    return (
      <>
        {renderMobileSidebar()}
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={handleToggleSidebar}>
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
            <div className="fixed inset-y-0 left-0 z-40 w-64 bg-sidebar-background border-r shadow-lg">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }
  
  return (
    <div className={cn("hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-40 lg:w-64 bg-sidebar-background border-r", className)} {...props}>
      {sidebarContent}
    </div>
  );
}
