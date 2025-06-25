
import React, { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// Create sidebar context
type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Sidebar Provider
interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar components
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { isOpen } = useSidebar();
  return (
    <div
      className={cn(
        "h-screen bg-sidebar-background text-sidebar-foreground transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, children, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      className={cn("p-2 rounded-md hover:bg-accent", className)}
      onClick={toggleSidebar}
      {...props}
    >
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      )}
    </button>
  );
}
