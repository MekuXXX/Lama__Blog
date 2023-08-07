'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

export type ThemeContextType = {
  mode: 'light' | 'dark';
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const toggle = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  const themeContextValue: ThemeContextType = {
    mode,
    toggle,
  };
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
