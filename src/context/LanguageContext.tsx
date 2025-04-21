"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'de',
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState('de');

  useEffect(() => {
    const userLanguage = navigator.language.split('-')[0];
    if (userLanguage === 'en' || userLanguage === 'de') {
      setLocaleState(userLanguage);
    }
  }, []);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    // Dispatch custom event to notify all components
    const event = new CustomEvent('languageChange', { detail: { locale: newLocale } });
    window.dispatchEvent(event);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}; 