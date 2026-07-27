import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useLocalStorage<Theme>('portfolio-theme', 'dark');

  return [theme, setTheme];
}