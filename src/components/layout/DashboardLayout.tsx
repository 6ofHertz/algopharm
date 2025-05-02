
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Barcode, Calendar, LayoutDashboard, LogOut, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserMenu } from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");
  const isMobile = useIsMobile();
  const [user, setUser] = useState({
    name: "Dr. Sarah Johnson",
    role: "Pharmacist",
    initials: "SJ",
    id: "PHR-001",
  });

  const navigation = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "inventory",
      name: "Inventory",
      icon: Search,
      path: "/inventory",
    },
    {
      id: "pos",
      name: "Point of Sale",
      icon: Barcode,
      path: "/pos",
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: Calendar,
      path: "/calendar",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      path: "/settings",
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

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r">
          <div className="pt-6 pb-2">
            <div className="flex items-center px-4">
              <div className="pill-gradient p-1.5 rounded-md mr-2">
                <Barcode className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-pill-500">AlgoPharm</h1>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            <div className="space-y-1">
              <div className="px-3 py-2">
                {navigation.map((item) => (
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
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Separator className="my-4" />
            <div className="px-3 pb-4">
              <UserMenu user={user} />
            </div>
          </div>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {navigation.find((item) => item.id === activeItem)?.name || "AlgoPharm"}
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
    </SidebarProvider>
  );
};

export default DashboardLayout;
