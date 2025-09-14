import { createContext, useContext } from 'react';

const ThemeProviderContext = createContext({
  theme: 'dark',
  setTheme: () => null,
});

export function ThemeProvider({ children, ...props }) {
  // Always enforce dark mode
  const theme = 'dark';

  // Apply dark class to <html> root
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
  }

  const value = { theme, setTheme: () => {} };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
