import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme-v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const transitionInProgress = useRef(false);
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme;
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        return saved;
      }
    }
    return 'dark';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        body.classList.add('dark');
        setResolvedTheme('dark');
      } else {
        root.classList.remove('dark');
        body.classList.remove('dark');
        setResolvedTheme('light');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme === 'dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    if (transitionInProgress.current) return;

    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    const applyNextTheme = () => {
      root.classList.toggle('dark', nextTheme === 'dark');
      document.body.classList.toggle('dark', nextTheme === 'dark');
      setThemeState(nextTheme);
      setResolvedTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyNextTheme();
      return;
    }

    const startViewTransition = document.startViewTransition?.bind(document);

    if (!startViewTransition) {
      root.classList.add('theme-transition-fallback');
      // Make sure the transition rules are active before the theme colors change.
      void root.offsetWidth;
      applyNextTheme();
      window.setTimeout(() => root.classList.remove('theme-transition-fallback'), 750);
      return;
    }

    root.dataset.themeTransition = 'active';
    transitionInProgress.current = true;

    const transition = startViewTransition(() => {
      flushSync(applyNextTheme);
    });

    void transition.finished.finally(() => {
      delete root.dataset.themeTransition;
      transitionInProgress.current = false;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
