import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Barcode, 
  Calendar, 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Settings, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { FactGenerator } from "@/components/common/FactGenerator";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasRole } = useAuth();
  const [activeItem, setActiveItem] = useState("");
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Update active item when location changes
  useEffect(() => {
    const path = location.pathname.split('/')[1]; // Get the first part of the path
    setActiveItem(path || 'dashboard');
  }, [location]);

  const navigation = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      roles: ["cashier", "pharmacist", "admin"]
    },
    {
      id: "inventory",
      name: "Inventory",
      icon: Search,
      path: "/inventory",
      roles: ["pharmacist", "admin"]
    },
    {
      id: "pos",
      name: "Point of Sale",
      icon: Barcode,
      path: "/pos",
      roles: ["cashier", "pharmacist", "admin"]
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: Calendar,
      path: "/calendar",
      roles: ["pharmacist", "admin"]
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      path: "/settings",
      roles: ["admin"]
    },
  ];

  const handleNavigation = (path: string, id: string) => {
    setActiveItem(id);
    navigate(path);
  };

  const handleSearch = () => {
    console.log("Search functionality to be implemented");
    // In real application, this would open a search modal
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => {
    return hasRole(item.roles as any);
  });

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
        {/* Top banner with fact */}
        <FactGenerator />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className={cn(
            "h-full bg-background border-r transition-all duration-300 flex flex-col",
            sidebarOpen ? "w-64" : "w-16"
          )}>
            {/* Logo section */}
            <div className="pt-6 pb-2 px-4">
              <div className="flex items-center">
                <div className="pill-gradient p-1.5 rounded-md mr-2">
                  <Barcode className="h-5 w-5 text-white" />
                </div>
                {sidebarOpen && <h1 className="text-xl font-bold text-pill-500">APOTHEKE Pro</h1>}
              </div>
            </div>
            
            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="space-y-1">
                <div className="px-3 py-2">
                  {filteredNavigation.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeItem === item.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start mb-1 transition-all duration-300",
                        activeItem === item.id 
                          ? "bg-pill-200 text-pill-700 dark:bg-pill-900 dark:text-pill-300" 
                          : "",
                        "hover:shadow-[0_0_8px_rgba(218,165,32,0.3)]"
                      )}
                      onClick={() => handleNavigation(item.path, item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                      {sidebarOpen && <span className="ml-2">{item.name}</span>}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* User section */}
            <div>
              <Separator className="my-4" />
              <div className="px-3 pb-4">
                {sidebarOpen ? (
                  <UserMenu user={{
                    name: user?.name || user?.email?.split('@')[0] || "User",
                    role: user?.role || "guest",
                    initials: (user?.name || user?.email)?.split(' ').map(n => n[0]).join('') || "U"
                  }} />
                ) : (
                  <Button variant="ghost" className="w-full flex justify-center" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-5 w-5" />
                  </Button>
                )}
                
                {/* Logout button */}
                {sidebarOpen ? (
                  <Button 
                    variant="destructive" 
                    className="mt-2 w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                ) : (
                  <Button 
                    variant="destructive" 
                    className="mt-2 w-full flex justify-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-lg font-semibold">
                  {filteredNavigation.find((item) => item.id === activeItem)?.name || "APOTHEKE Pro"}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button variant="outline" size="icon" onClick={handleSearch}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
