"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

// Force English only
const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Always use English
  const [locale] = useState('en');

  // No-op function that keeps the locale as English
  const setLocale = () => {
    // Do nothing - English is forced
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}; 