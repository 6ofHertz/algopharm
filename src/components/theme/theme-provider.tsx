
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
      root.style.setProperty("--ring", "224, 76%, 48%");
    } else {
      // Reset to default light theme
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
    }
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
