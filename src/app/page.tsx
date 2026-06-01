'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { partnersData, activitiesData, translations } from '@/translations';
import { CountryFlag } from '@/components/CountryFlag';

interface GalleryItem {
  id: string;
  src: string;
  category: 'poland' | 'turkiye' | 'romania';
}

const galleryItems: GalleryItem[] = [
  { id: 'g-local-1', src: '/performance.png', category: 'poland' },
  { id: 'g-local-2', src: '/performance.png', category: 'turkiye' },
  { id: 'g-local-3', src: '/performance.png', category: 'turkiye' },
  { id: 'g-local-4', src: '/performance.png', category: 'romania' },
  // Workshops (Poland Mobility)
  ...[
    'photo-1511192336575-5a79af67a629',
    'photo-1511671782779-c97d3d27a1d4',
    'photo-1465847899084-d164df4dedc6',
    'photo-1507838153414-b4b713384a76',
    'photo-1501386761578-eac5c94b800a',
    'photo-1516280440614-37939bbacd6a',
    'photo-1520523839897-bd0b52f945a0',
    'photo-1526218626217-dc65a29bb444',
    'photo-1453733190148-c44698c26588',
    'photo-1544787219-7f47ccb76574',
    'photo-1484876065684-b683cf17d276',
    'photo-1514525253161-7a46d19cd819',
    'photo-1510915361894-db8b60106cb1',
    'photo-1508700115892-45ecd05ae2ad',
    'photo-1470225620780-dba8ba36b745',
    'photo-1459749411175-04bf5292ceea'
  ].map((id, index) => ({
    id: `g-workshop-${index}`,
    src: '/performance.png',
    category: 'poland' as const
  })),
  // Studios (Türkiye Mobility)
  ...[
    'photo-1598488035139-bdbb2231ce04',
    'photo-1559734885-30d10b7e5e2b',
    'photo-1483412033650-1015ddeb83d1',
    'photo-1516223725307-6f76b9ec8742',
    'photo-1519751138087-5bf79df62d5b',
    'photo-1525201548942-d8c8cd027ad7',
    'photo-1478737270239-2f02b77fc618',
    'photo-1508214751196-bcfd4ca60f91',
    'photo-1524368535928-5b5e00ddc76b',
    'photo-1516062423079-7ca13cca775f',
    'photo-1487180142328-0c4e37023af5',
    'photo-1506157786151-b8491531f063',
    'photo-1518609878373-06d740f60d8b',
    'photo-1498038432885-c6f3f1b912ee',
    'photo-1461749280684-dccba630e2f6',
    'photo-1517245386807-bb43f82c33c4',
    'photo-1518911710364-17ec553bde9d'
  ].map((id, index) => ({
    id: `g-studio-${index}`,
    src: '/performance.png',
    category: 'turkiye' as const
  })),
  // Music Production & Performance (Romania Mobility)
  ...[
    'photo-1598653222000-6b7b7a552625',
    'photo-1533174072545-7a4b6ad7a6c3',
    'photo-1504280390367-361c6d9f38f4',
    'photo-1514320291840-2e0a9bf2a9ae',
    'photo-1493225457124-a3eb161ffa5f',
    'photo-1482440308425-276ad0f28b19',
    'photo-1508214751196-bcfd4ca60f91',
    'photo-1519751138087-5bf79df62d5b',
    'photo-1525201548942-d8c8cd027ad7',
    'photo-1487180142328-0c4e37023af5',
    'photo-1506157786151-b8491531f063',
    'photo-1461749280684-dccba630e2f6',
    'photo-1517245386807-bb43f82c33c4',
    'photo-1518911710364-17ec553bde9d',
    'photo-1598488035139-bdbb2231ce04',
    'photo-1559734885-30d10b7e5e2b',
    'photo-1483412033650-1015ddeb83d1',
    'photo-1516223725307-6f76b9ec8742'
  ].map((id, index) => ({
    id: `g-music-${index}`,
    src: '/performance.png',
    category: 'romania' as const
  }))
];

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 800 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export default function Home() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const partners = useMemo(() => partnersData[language] || partnersData['en'], [language]);
  const activities = useMemo(() => activitiesData[language] || activitiesData['en'], [language]);

  // Partition mobilities vs local activities
  const mobilities = useMemo(() => activities.filter((act) => act.id !== 'act-local'), [activities]);
  const localActivity = useMemo(() => activities.find((act) => act.id === 'act-local'), [activities]);

  const filteredGallery = useMemo(() => galleryItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  ), [activeCategory]);

  // Throttled resize listener to adjust visible items count in carousel dynamically
  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    const throttledResize = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          updateVisibleCount();
          throttleTimeout = null;
        }, 100);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  // Reset index when filter category changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsTransitioning(false);
  }, [activeCategory]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    if (currentIndex === 0) {
      // Instantly jump to the cloned end (no transition), then animate backwards
      setIsTransitioning(false);
      setCurrentIndex(filteredGallery.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(filteredGallery.length - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, filteredGallery.length, isTransitioning]);

  const handleTransitionEnd = useCallback(() => {
    // If we scrolled past the last real item (into the clones), snap back silently
    if (currentIndex >= filteredGallery.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else {
      setIsTransitioning(false);
    }
  }, [currentIndex, filteredGallery.length]);

  // Auto scroll every 3 seconds
  useEffect(() => {
    if (filteredGallery.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredGallery.length, handleNext]);

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const getCountryCode = (country: string) => {
    const c = country.toLowerCase();
    if (c.includes('portugal') || c.includes('portekiz') || c.includes('portugalia')) return 'pt';
    if (c.includes('türk') || c.includes('turc') || c.includes('turkey')) return 'tr';
    if (c.includes('poland') || c.includes('polonya') || c.includes('polska')) return 'pl';
    if (c.includes('romania') || c.includes('romanya') || c.includes('românia')) return 'ro';
    return 'eu';
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-transparent py-20 lg:py-32 border-b border-border-fog">
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#040101" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-block rounded-full bg-pale-peach px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ember-orange mb-6">
                {t.hero.tagline}
              </span>

              <h1 className="font-geist text-display sm:text-display-lg lg:text-display-xl font-bold tracking-tight text-midnight-charcoal mb-6 leading-tight">
                <span className="text-ember-orange">{t.hero.titleAccent}</span>{' '}
                {t.hero.titleMain}
              </h1>

              <p className="text-body-lg sm:text-subheading text-muted-ash mb-10 max-w-xl font-geist leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#activities"
                  onClick={(e) => handleScrollTo(e, 'activities')}
                  className="flex justify-center items-center h-12 bg-ember-orange text-canvas-white text-sm font-semibold rounded-[4px] px-10 hover:bg-opacity-95 transition-all duration-200 active:scale-[0.98] shadow-subtle text-center whitespace-nowrap"
                >
                  {t.hero.ctaPrimary}
                </a>
                <a
                  href="#partners"
                  onClick={(e) => handleScrollTo(e, 'partners')}
                  className="flex justify-center items-center h-12 border border-ember-orange bg-canvas-white text-ember-orange text-sm font-semibold rounded-[4px] px-10 hover:bg-pale-peach/10 transition-all duration-200 active:scale-[0.98] text-center whitespace-nowrap"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-2xl border border-border-fog bg-canvas-white p-8 shadow-subtle flex flex-col justify-between overflow-hidden group hover:border-ember-orange/30 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span className="text-[10px] text-muted-ash font-medium ml-2 font-mono">dmfm-studio.app</span>
                </div>

                <div className="flex-1 flex items-end justify-center gap-2 h-48 py-8 px-4">
                  {[24, 48, 64, 32, 56, 80, 40, 72, 50, 60, 20, 36, 68, 44, 28].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-full bg-ember-orange/30 transform origin-bottom transition-all duration-300 group-hover:bg-ember-orange"
                      style={{
                        height: `${h}%`,
                        animation: `bounce-slow 1.2s ease-in-out infinite`,
                        animationDelay: `${i * 0.08}s`
                      }}
                    ></div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border-fog pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-pale-peach flex items-center justify-center text-ember-orange font-bold">
                      ♫
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-midnight-charcoal font-geist leading-tight">Digital Harmony</span>
                      <span className="text-[10px] text-muted-ash font-geist">Local & Migrant Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / DETAILS SECTION (UNIFIED WITH TARGET GROUPS) */}
      <section id="about" className="py-28 border-b border-border-fog bg-transparent scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {/* Main Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeIn">
            <span className="text-xs font-bold text-ember-orange uppercase tracking-wider mb-2 block font-geist">
              {language === 'tr' ? 'Projeye Genel Bakış' : 'Project Overview'}
            </span>
            <h2 className="font-geist text-heading-lg font-bold text-midnight-charcoal mb-4">
              {language === 'tr' ? 'Proje Hakkında' : 'About the Project'}
            </h2>
            <p className="text-body-lg text-muted-ash font-geist leading-relaxed">
              {language === 'tr'
                ? 'Müziğin evrensel gücü ve dijital ses teknolojileriyle göçmen öğrencileri bir araya getiren Erasmus+ projemizin amaçları, hedeflenen sonuçları ve doğrudan katkı sağladığı kitleler.'
                : 'The key objectives, expected learning outcomes, and direct beneficiary groups of our Erasmus+ initiative connecting migrant and local students through music.'}
            </p>
          </div>

          {/* Unified 2x2 Grid of Cards under "Proje Hakkında" */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Card 1: Objectives & Stats */}
            <div className="flex flex-col rounded-lg border border-border-fog bg-canvas-white p-5 sm:p-8 md:p-10 shadow-subtle hover-scale">
              <span className="text-xs font-bold text-ember-orange uppercase tracking-wider mb-2 font-geist">
                {language === 'tr' ? 'Detaylı Anlatım' : 'In-depth Overview'}
              </span>
              <h3 className="font-geist text-heading font-bold text-midnight-charcoal mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-ember-orange rounded-full"></span>
                {t.project.objectivesTitle}
              </h3>
              <p className="text-body-lg text-midnight-charcoal font-geist leading-relaxed mb-8 flex-1">
                {t.project.objectivesText}
              </p>
              
              {/* Dynamic stats count-up */}
              <div className="w-full border-t border-border-fog pt-6 flex flex-wrap gap-4 mt-auto">
                <div className="flex flex-col gap-1 border-r border-border-fog pr-8">
                  <span className="text-2xl font-bold text-ember-orange">
                    <CountUp end={4} />
                  </span>
                  <span className="text-xs text-muted-ash font-medium uppercase font-geist">
                    {language === 'tr' ? 'Ortak Ülke' : 'Partner Countries'}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-r border-border-fog pr-8 pl-4">
                  <span className="text-2xl font-bold text-ember-orange">
                    <CountUp end={5} />
                  </span>
                  <span className="text-xs text-muted-ash font-medium uppercase font-geist">
                    {language === 'tr' ? 'Kurum / STK' : 'Organizations'}
                  </span>
                </div>
                <div className="flex flex-col gap-1 pl-4">
                  <span className="text-2xl font-bold text-ember-orange">
                    <CountUp end={3} />
                  </span>
                  <span className="text-xs text-muted-ash font-medium uppercase font-geist">
                    {language === 'tr' ? 'Hareketlilik' : 'Mobilities'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Expected Results */}
            <div className="flex flex-col rounded-lg border border-border-fog bg-canvas-white p-5 sm:p-8 md:p-10 shadow-subtle hover-scale">
              <h3 className="font-geist text-heading font-bold text-midnight-charcoal mb-6">
                {t.project.resultsTitle}
              </h3>
              <p className="text-body text-muted-ash font-geist leading-relaxed mb-6">
                {t.project.resultsText}
              </p>
              <ul className="flex flex-col gap-4 flex-1">
                {t.project.expectedResultsList.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-orange/10 text-ember-orange text-xs mt-0.5 font-bold">
                      ✓
                    </span>
                    <span className="text-sm text-midnight-charcoal font-medium font-geist">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Primary Target Group */}
            <div className="flex flex-col rounded-lg border border-border-fog bg-canvas-white p-5 sm:p-8 md:p-10 shadow-subtle hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-ember-orange text-canvas-white shadow-subtle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M4.5 6.375a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM7.875 6.375a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM11.25 6.375a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM4.5 9.75a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM7.875 9.75a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM11.25 9.75a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM4.5 13.125a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM7.875 13.125a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM11.25 13.125a.9.9 0 0 1 .9-.9h.75a.9.9 0 0 1 .9.9v.75a.9.9 0 0 1-.9.9h-.75a.9.9 0 0 1-.9-.9v-.75ZM15 4.875a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v14.25c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375V4.875ZM18.75 4.875a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v14.25c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375V4.875ZM22.5 4.875a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v14.25c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375V4.875ZM2.25 18.75a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-geist text-subheading font-bold text-midnight-charcoal">
                    {t.targetGroups.primaryTitle}
                  </h4>
                  <p className="text-xs text-muted-ash font-medium font-geist mt-0.5">
                    {t.targetGroups.primaryDesc}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4 border-t border-border-fog pt-6">
                {t.targetGroups.primaryItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-orange text-canvas-white text-xs font-semibold">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-midnight-charcoal font-geist pt-0.5 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Secondary Target Group */}
            <div className="flex flex-col rounded-lg border border-border-fog bg-canvas-white p-5 sm:p-8 md:p-10 shadow-subtle hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-midnight-charcoal text-canvas-white shadow-subtle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18 1.5a2.25 2.25 0 0 1 2.25 2.25v16.5A2.25 2.25 0 0 1 18 22.5H6a2.25 2.25 0 0 1-2.25-2.25V3.75A2.25 2.25 0 0 1 6 1.5h12Zm-3 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-geist text-subheading font-bold text-midnight-charcoal">
                    {t.targetGroups.secondaryTitle}
                  </h4>
                  <p className="text-xs text-muted-ash font-medium font-geist mt-0.5">
                    {t.targetGroups.secondaryDesc}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4 border-t border-border-fog pt-6">
                {t.targetGroups.secondaryItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border-fog text-midnight-charcoal text-xs font-semibold">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-midnight-charcoal font-geist pt-0.5 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNERS SECTION */}
      <section id="partners" className="py-28 border-b border-border-fog bg-transparent">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-ember-orange uppercase tracking-wider mb-2 block font-geist">
              {language === 'tr' ? 'Katılımcı Kurumlar' : 'Partner Network'}
            </span>
            <h2 className="font-geist text-heading-lg font-bold text-midnight-charcoal mb-4">
              {t.partnersSection.title}
            </h2>
            <p className="text-body-lg text-muted-ash font-geist">
              {t.partnersSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {partners.map((partner) => {
              const isCoordinator = partner.id === '1';
              const countryCode = getCountryCode(partner.country);

              return (
                <div
                  key={partner.id}
                  className="flex flex-col h-full rounded-lg border border-border-fog bg-canvas-white p-6 shadow-subtle hover-scale"
                >
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center justify-between w-full">
                      <CountryFlag code={countryCode} width={36} height={24} />
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isCoordinator ? 'bg-ember-orange text-canvas-white' : 'bg-pale-peach text-ember-orange'
                      }`}>
                        {isCoordinator ? t.partnersSection.roles.coordinator : t.partnersSection.roles.partner}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-muted-ash font-geist uppercase leading-none">
                        {partner.country}
                      </span>
                      <span className="text-[10px] text-muted-ash font-medium font-geist mt-1">
                        {partner.city}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-8">
                      <h3 className="font-geist text-subheading font-bold text-midnight-charcoal mb-3 leading-snug">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-muted-ash font-geist leading-relaxed">
                        {partner.type}
                      </p>
                    </div>

                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-ember-orange hover:text-opacity-80 transition-colors group mt-auto font-geist self-start"
                    >
                      <span>{t.partnersSection.visitWebsite}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 0 1 .75-.75h10.63l-3-3a.75.75 0 1 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06l3-3H3.75A.75.75 0 0 1 3 10Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ACTIVITIES & TIMELINE SECTION */}
      <section id="activities" className="py-28 border-b border-border-fog bg-transparent">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-ember-orange uppercase tracking-wider mb-2 block font-geist">
              {language === 'tr' ? 'Hareketlilik Takvimi' : 'Mobility & Training Log'}
            </span>
            <h2 className="font-geist text-heading-lg font-bold text-midnight-charcoal mb-4">
              {t.activitiesSection.title}
            </h2>
            <p className="text-body-lg text-muted-ash font-geist">
              {t.activitiesSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <h3 className="font-geist text-heading-sm font-bold text-midnight-charcoal mb-10 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-ember-orange rounded-full"></span>
                {t.activitiesSection.educationalTitle}
              </h3>

              <div className="relative border-l border-border-fog pl-6 ml-4 space-y-12">
                {mobilities.map((act) => (
                  <div key={act.id} className="relative animate-fadeIn">
                    <span className="absolute -left-[32px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ember-orange bg-canvas-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember-orange"></span>
                    </span>

                    <div className="rounded-lg border border-border-fog bg-canvas-white p-5 sm:p-6 md:p-8 shadow-subtle hover:border-ember-orange/20 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-bold font-geist text-ember-orange uppercase tracking-wider bg-pale-peach px-2.5 py-1 rounded-full">
                          {act.location}
                        </span>
                        <span className="text-xs text-muted-ash font-medium font-geist">
                          {act.type}
                        </span>
                      </div>

                      <h4 className="font-geist text-subheading font-bold text-midnight-charcoal mb-3">
                        {act.title}
                      </h4>
                      <p className="text-sm text-muted-ash font-geist leading-relaxed mb-6">
                        {act.description}
                      </p>

                      <div className="border-t border-border-fog pt-4">
                        <span className="text-xs font-bold text-midnight-charcoal uppercase tracking-wider block mb-3 font-geist">
                          {language === 'tr' ? 'Faaliyet Çıktıları / Öğrenimleri' : 'Activity Outputs / Learnings'}
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {act.outputs.map((out, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-orange/10 text-ember-orange text-xs mt-0.5 font-bold">
                                ✓
                              </span>
                              <span className="text-xs text-midnight-charcoal font-medium font-geist leading-relaxed">
                                {out}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-[90px]">
                <h3 className="font-geist text-heading-sm font-bold text-midnight-charcoal mb-10 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-midnight-charcoal rounded-full"></span>
                  {t.activitiesSection.localTitle}
                </h3>

                {localActivity && (
                  <div className="rounded-lg border border-border-fog bg-canvas-white p-5 sm:p-6 md:p-8 shadow-subtle">
                    <span className="text-xs font-bold font-geist text-muted-ash uppercase tracking-wider mb-2 block">
                      {localActivity.location}
                    </span>
                    <h4 className="font-geist text-subheading font-bold text-midnight-charcoal mb-4">
                      {localActivity.title}
                    </h4>
                    <p className="text-xs text-muted-ash font-geist leading-relaxed mb-6">
                      {localActivity.description}
                    </p>

                    <div className="flex flex-col gap-4 border-t border-border-fog pt-6">
                      {localActivity.outputs.map((out, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded bg-ember-orange/10 text-ember-orange text-[10px] mt-0.5 font-bold shadow-sm">
                            ✓
                          </span>
                          <span className="text-xs text-midnight-charcoal font-geist leading-relaxed">
                            {out}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PHOTO GALLERY SECTION */}
      <section id="gallery" className="py-28 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-ember-orange uppercase tracking-wider mb-2 block font-geist">
              {language === 'tr' ? 'Görsel Galeri' : 'Photo Records'}
            </span>
            <h2 className="font-geist text-heading-lg font-bold text-midnight-charcoal mb-4">
              {t.gallerySection.title}
            </h2>
            <p className="text-body-lg text-muted-ash font-geist">
              {t.gallerySection.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {Object.entries({
              all: t.gallerySection.categories.all,
              poland: t.gallerySection.categories.poland,
              turkiye: t.gallerySection.categories.turkiye,
              romania: t.gallerySection.categories.romania
            }).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`rounded-[4px] px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-ember-orange text-canvas-white shadow-subtle'
                    : 'bg-canvas-white border border-border-fog text-midnight-charcoal hover:bg-pale-peach/10'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="relative group/slider px-4">
            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border-fog bg-canvas-white/85 text-midnight-charcoal hover:bg-canvas-white shadow-subtle hover-scale transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100"
              aria-label="Previous image"
            >
              ◀
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border-fog bg-canvas-white/85 text-midnight-charcoal hover:bg-canvas-white shadow-subtle hover-scale transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100"
              aria-label="Next image"
            >
              ▶
            </button>

            {/* Carousel track wrapper */}
            <div className="overflow-hidden w-full py-4">
              <div
                className="flex"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  transition: isTransitioning
                    ? 'transform 700ms cubic-bezier(0.45, 0, 0.15, 1)'
                    : 'none',
                  willChange: 'transform',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {(filteredGallery.length > 0 ? [
                  ...filteredGallery,
                  ...filteredGallery.slice(0, visibleCount)
                ] : []).map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => setLightboxIndex(idx % filteredGallery.length)}
                    className="px-2 flex-shrink-0"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border-fog bg-canvas-white shadow-subtle hover-scale cursor-pointer">
                      <Image
                        src={item.src}
                        alt="Gallery Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-midnight-charcoal/0 group-hover:bg-midnight-charcoal/10 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {lightboxIndex !== null && (() => {
            const item = filteredGallery[lightboxIndex];

            return (
              <div
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-charcoal/95 p-4 sm:p-10 select-none animate-fadeIn cursor-zoom-out"
              >
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-canvas-white/20 bg-midnight-charcoal text-canvas-white hover:bg-canvas-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="Close lightbox"
                >
                  ✕
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-canvas-white/20 bg-midnight-charcoal/50 text-canvas-white hover:bg-canvas-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  ◀
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-canvas-white/20 bg-midnight-charcoal/50 text-canvas-white hover:bg-canvas-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  ▶
                </button>

                <div
                  key={item.id}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full aspect-[4/3] rounded overflow-hidden border border-canvas-white/10 cursor-default animate-fadeIn"
                >
                  <Image
                    src={item.src}
                    alt="Gallery Image"
                    fill
                    sizes="100vw"
                    className="object-contain bg-midnight-charcoal"
                  />
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 max-w-4xl w-full text-center text-canvas-white px-4 cursor-default"
                >
                  <span className="inline-block mt-3 text-[10px] text-ember-orange border border-ember-orange/30 px-2 py-0.5 rounded-full font-bold uppercase font-geist">
                    {lightboxIndex + 1} / {filteredGallery.length}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
