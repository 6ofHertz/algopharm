
import React, { useState, useEffect, type ComponentType } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/features/UI/sidebar";
import { Barcode, Calendar, LayoutDashboard, Search, Settings, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/features/UI/avatar";
import { Button } from "@/features/UI/button";
import { Separator } from "@/features/UI/separator";
import { UserMenu } from "@/features/Layout/UserMenu";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/features/Theme/theme-toggle";
import { Badge } from "@/features/UI/badge";
import { cn } from "@/features/lib/utils";
import { useIsMobile } from "@/features/hooks/use-mobile";
import { AnalogClock } from "@/features/Layout/AnalogClock";


const DashboardLayout = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();
  const [user, setUser] = useState({
    name: "Dr. Sarah Johnson",
    role: "Pharmacist",
    initials: "SJ",
    id: "PHR-001",
  });

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

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
              <div className="pill-gradient p-1.5 rounded-md mr-2" >
                
                <Barcode className="h-5 w-5 text-white"  />
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
                      "w-full justify-start mb-1 transition-all duration-300 hover:bg-pill-200 hover:text-pill-700 dark:hover:bg-pill-900 dark:hover:text-pill-300",
                      activeItem === item.id
                        ? "bg-pill-200 text-pill-700 dark:bg-pill-900 dark:text-pill-300"
                        : "",
                      "hover:shadow-[0_0_8px_rgba(218,165,32,0.3)]"
                    )}
                    onClick={() => handleNavigation(item.path,item.id)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Separator className="my-4"/>
            <div className="px-3 pb-4">
              <UserMenu user={user} />
            </div>
          </div>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger/>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {navigation.find((item) => item.id === activeItem)?.name || "AlgoPharm"}
              </h1>
            </div>
            <div className="flex items-center gap-3 mr-4">
              <div className="flex items-center border rounded-full px-3 py-1 bg-card text-sm" >
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-xs font-medium">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="icon" onClick={handleSearch}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-2" >{user.id}</span>
                    <Badge variant="outline" className="h-5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {user.role}
                    </Badge>
                  </div>
                </div>
                <Avatar>
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
           <div className="absolute bottom-4 left-4">
            <AnalogClock username={user.name}/>
          </div> 
        </div>
      </div>
    </SidebarProvider>
  );
};
export default DashboardLayout;

export default DashboardLayout;
