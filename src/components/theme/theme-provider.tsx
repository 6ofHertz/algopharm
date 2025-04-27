
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    
    // Apply custom CSS variables for the olive green dark theme
    if (theme === "dark") {
      root.style.setProperty("--background", "221, 31%, 14%");
      root.style.setProperty("--foreground", "210, 40%, 98%");
      root.style.setProperty("--card", "221, 39%, 11%");
      root.style.setProperty("--card-foreground", "210, 40%, 98%");
      root.style.setProperty("--popover", "221, 39%, 11%");
      root.style.setProperty("--popover-foreground", "210, 40%, 98%");
      root.style.setProperty("--primary", "272, 76%, 53%");
      root.style.setProperty("--primary-foreground", "210, 40%, 98%");
      root.style.setProperty("--secondary", "217, 19%, 27%");
      root.style.setProperty("--secondary-foreground", "210, 40%, 98%");
      root.style.setProperty("--muted", "217, 19%, 27%");
      root.style.setProperty("--muted-foreground", "215, 20%, 65%");
      root.style.setProperty("--accent", "84, 60%, 30%");  // Olive green accent
      root.style.setProperty("--accent-foreground", "210, 40%, 98%");
      root.style.setProperty("--destructive", "0, 62.8%, 30.6%");
      root.style.setProperty("--destructive-foreground", "210, 40%, 98%");
      root.style.setProperty("--border", "217, 19%, 27%");
      root.style.setProperty("--input", "217, 19%, 27%");
      root.style.setProperty("--ring", "84, 60%, 30%");
      
      // Add custom pill colors for dark theme
      root.style.setProperty("--pill-50", "84, 60%, 95%");
      root.style.setProperty("--pill-100", "84, 60%, 90%");
      root.style.setProperty("--pill-200", "84, 60%, 80%");
      root.style.setProperty("--pill-300", "84, 60%, 70%");
      root.style.setProperty("--pill-400", "84, 60%, 60%");
      root.style.setProperty("--pill-500", "84, 60%, 50%");
      root.style.setProperty("--pill-600", "84, 60%, 40%");
      root.style.setProperty("--pill-700", "84, 60%, 30%");
      root.style.setProperty("--pill-800", "84, 60%, 20%");
      root.style.setProperty("--pill-900", "84, 60%, 10%");
      
      // Add golden hover effect variables
      root.style.setProperty("--gold-glow", "rgba(218,165,32,0.5)");
      
      // Add CSS animation for page transitions
      const styleSheet = document.createElement('style');
      styleSheet.id = 'page-animations';
      styleSheet.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .page-transition {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .card-transition {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .pill-gradient {
          background: linear-gradient(135deg, hsl(84, 60%, 30%), hsl(84, 60%, 40%));
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 12px var(--gold-glow);
          transition: box-shadow 0.3s ease;
        }
      `;
      document.head.appendChild(styleSheet);
      
    } else {
      // Light theme with olive green accents
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--card");
      root.style.removeProperty("--card-foreground");
      root.style.removeProperty("--popover");
      root.style.removeProperty("--popover-foreground");
      root.style.removeProperty("--primary");
      root.style.removeProperty("--primary-foreground");
      root.style.removeProperty("--secondary");
      root.style.removeProperty("--secondary-foreground");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--muted-foreground");
      root.style.removeProperty("--accent");
      root.style.removeProperty("--accent-foreground");
      root.style.removeProperty("--destructive");
      root.style.removeProperty("--destructive-foreground");
      root.style.removeProperty("--border");
      root.style.removeProperty("--input");
      root.style.removeProperty("--ring");
      
      // Add custom pill colors for light theme
      root.style.setProperty("--pill-50", "84, 60%, 97%");
      root.style.setProperty("--pill-100", "84, 60%, 92%");
      root.style.setProperty("--pill-200", "84, 60%, 85%");
      root.style.setProperty("--pill-300", "84, 60%, 75%");
      root.style.setProperty("--pill-400", "84, 60%, 65%");
      root.style.setProperty("--pill-500", "84, 60%, 55%");
      root.style.setProperty("--pill-600", "84, 60%, 45%");
      root.style.setProperty("--pill-700", "84, 60%, 35%");
      root.style.setProperty("--pill-800", "84, 60%, 25%");
      root.style.setProperty("--pill-900", "84, 60%, 15%");
      
      // Add golden hover effect variables
      root.style.setProperty("--gold-glow", "rgba(139,92,246,0.5)");
      
      // Add CSS animation for page transitions
      const styleSheet = document.createElement('style');
      styleSheet.id = 'page-animations';
      styleSheet.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .page-transition {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .card-transition {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .pill-gradient {
          background: linear-gradient(135deg, hsl(84, 60%, 40%), hsl(84, 60%, 50%));
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 12px var(--gold-glow);
          transition: box-shadow 0.3s ease;
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Cleanup function to remove style element when component unmounts
    return () => {
      const styleElement = document.getElementById('page-animations');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
