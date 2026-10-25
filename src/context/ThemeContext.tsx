import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { WeatherMood } from "../lib/weather";
export type Theme = "light" | "dark" | "system";
interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  activeWeatherMood: WeatherMood;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const key = "portfolio-theme-v2";
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, update] = useState<Theme>(() => {
    try {
      const value = localStorage.getItem(key);
      if (value === "light" || value === "dark" || value === "system")
        return value;
    } catch {
      /* Storage is optional. */
    }
    return "light";
  });
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const resolvedTheme =
    theme === "system" ? (systemDark ? "dark" : "light") : theme;
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const change = () => setSystemDark(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.body.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);
  const setTheme = (value: Theme) => {
    update(value);
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Keep the current session usable. */
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme: () =>
          setTheme(resolvedTheme === "dark" ? "light" : "dark"),
        activeWeatherMood: "sunny",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider is required");
  return value;
}
