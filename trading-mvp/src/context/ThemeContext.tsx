"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Versuche, den Darkmode-Status aus dem lokalen Speicher zu laden
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Code nur auf dem Client ausführen
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // Wenn ein gespeicherter Wert vorhanden ist, verwende ihn
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } 
    // Sonst prüfe die Systemeinstellungen
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('darkMode', darkMode.toString());
      
      // HTML-Element direkt manipulieren für Tailwind
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, isInitialized]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}