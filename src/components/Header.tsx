'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';
import { CountryFlag } from './CountryFlag';

const languagesList: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' }
];

export const Header: React.FC = () => {
  const { language, t, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = React.useMemo(() => [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'partners', label: t.nav.partners },
    { id: 'activities', label: t.nav.activities },
    { id: 'gallery', label: t.nav.gallery }
  ], [t]);

  // Stable scroll helper
  const handleScrollTo = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header (16px * 4 = 64px, plus some padding)
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  }, []);

  const sectionDimensionsRef = React.useRef<Record<string, { top: number; height: number }>>({});

  // Scroll spy to highlight active menu item using cached layout values
  useEffect(() => {
    const updateDimensions = () => {
      const dims: Record<string, { top: number; height: number }> = {};
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          dims[item.id] = {
            top: el.offsetTop,
            height: el.offsetHeight
          };
        }
      }
      sectionDimensionsRef.current = dims;
    };

    // Calculate dimensions initially and on resize/load
    updateDimensions();
    
    // Add small delay to ensure page rendering is complete and heights are stable
    const timer = setTimeout(updateDimensions, 300);

    window.addEventListener('resize', updateDimensions);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for trigger line
      const dims = sectionDimensionsRef.current;

      for (const item of navItems) {
        const dim = dims[item.id];
        if (dim) {
          if (scrollPosition >= dim.top && scrollPosition < dim.top + dim.height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial run
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [language, navItems]);

  const currentLangInfo = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <header className="premium-header">
      <div className="mx-auto flex max-w-7xl py-4 items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleScrollTo(e as any, 'home')} className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-ember-orange text-canvas-white shadow-subtle group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M19.952 1.351a.75.75 0 0 1 .28.598v16.301a3.75 3.75 0 1 1-3-3.666V5.418L8.25 7.643v11.608a3.75 3.75 0 1 1-3-3.666V4.148a.75.75 0 0 1 .582-.731l13.5-3a.75.75 0 0 1 .62.134Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-geist font-bold text-sm tracking-tight text-midnight-charcoal uppercase">DMFM</span>
            <span className="text-[10px] text-muted-ash font-medium leading-none">Erasmus+ Project</span>
          </div>
        </a>

        {/* Desktop Navigation with Smooth Scroll */}
        <nav className="hidden md:flex items-center gap-[24px] lg:gap-[36px]">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`font-geist text-xs lg:text-sm font-medium transition-colors hover:text-ember-orange cursor-pointer ${
                activeSection === item.id ? 'text-ember-orange font-semibold' : 'text-midnight-charcoal'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 h-9 px-3 rounded-full border border-border-fog bg-canvas-white hover:bg-pale-peach/10 transition-all duration-200 active:scale-95 text-xs font-semibold text-midnight-charcoal shadow-sm cursor-pointer"
              title="Select Language"
            >
              <CountryFlag code={currentLangInfo.code} width={18} height={12} />
              <span className="hidden sm:inline">{currentLangInfo.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 text-muted-ash transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {langDropdownOpen && (
              <>
                {/* Backdrop to close when clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-[150px] rounded-lg border border-border-fog bg-canvas-white p-1.5 shadow-lg z-50 animate-fadeIn">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 rounded text-xs font-medium text-left transition-colors cursor-pointer ${
                        language === lang.code
                          ? 'bg-pale-peach/30 text-ember-orange font-semibold'
                          : 'text-midnight-charcoal hover:bg-pale-peach/10'
                      }`}
                    >
                      <CountryFlag code={lang.code} width={18} height={12} />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-[32px] w-[32px] items-center justify-center rounded border border-border-fog text-midnight-charcoal transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-fog bg-canvas-white px-6 py-4 shadow-subtle animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`font-geist text-sm font-medium ${
                  activeSection === item.id ? 'text-ember-orange font-semibold' : 'text-midnight-charcoal'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
