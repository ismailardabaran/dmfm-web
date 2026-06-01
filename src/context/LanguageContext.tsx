'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translation, translations } from '../translations';

interface LanguageContextProps {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('dmfm_lang') as Language;
    if (savedLang && ['en', 'tr', 'pl', 'pt', 'ro'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dmfm_lang', lang);
    }
  };

  const value = {
    language,
    t: translations[language],
    setLanguage
  };

  // Prevent hydration mismatch: render a blank or basic structure until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', t: translations['en'], setLanguage }}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
