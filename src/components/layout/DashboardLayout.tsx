
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Barcode, Calendar, LayoutDashboard, LogOut, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserMenu } from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme/theme-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [user, setUser] = useState({
    name: "Dr. Sarah Johnson",
    role: "Pharmacist",
    initials: "SJ",
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

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="pt-6 pb-2">
            <div className="flex items-center px-4">
              <div className="pill-gradient p-1.5 rounded-md mr-2">
                <Barcode className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-pill-500">PillPulse</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="px-3 py-2">
                {navigation.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeItem === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start mb-1 ${
                      activeItem === item.id ? "bg-pill-200 text-pill-700 dark:bg-pill-900 dark:text-pill-300" : ""
                    }`}
                    onClick={() => handleNavigation(item.path, item.id)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-4" />
            <div className="px-3 pb-4">
              <UserMenu user={user} />
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {navigation.find((item) => item.id === activeItem)?.name || "PillPulse"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
