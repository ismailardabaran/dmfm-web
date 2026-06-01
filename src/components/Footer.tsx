'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border-fog bg-canvas-white py-12 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-ember-orange text-canvas-white shadow-subtle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M19.952 1.351a.75.75 0 0 1 .28.598v16.301a3.75 3.75 0 1 1-3-3.666V5.418L8.25 7.643v11.608a3.75 3.75 0 1 1-3-3.666V4.148a.75.75 0 0 1 .582-.731l13.5-3a.75.75 0 0 1 .62.134Z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-geist font-bold text-sm text-midnight-charcoal">Digital Music For Migrants</span>
            </div>
            <p className="text-xs text-muted-ash max-w-xs font-geist">
              A collaborative Erasmus+ project focusing on music education and social integration of migrant students.
            </p>
          </div>

          {/* EU Co-funding Info & Logo */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-center border-l-0 md:border-l border-border-fog pl-0 md:pl-8">
            <Image
              src="/erasmus-logo-new.png"
              alt="Erasmus+ Logo"
              width={162}
              height={44}
              priority={false}
              className="flex-shrink-0 object-contain rounded-sm"
            />
            <p className="text-[11px] text-muted-ash leading-relaxed font-geist">
              {t.footer.euDisclaimer}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border-fog pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-ash font-geist">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-xs text-muted-ash font-geist">
            <span className="hover:text-ember-orange transition-colors cursor-default">Portugal</span>
            <span className="hover:text-ember-orange transition-colors cursor-default">Türkiye</span>
            <span className="hover:text-ember-orange transition-colors cursor-default">Poland</span>
            <span className="hover:text-ember-orange transition-colors cursor-default">Romania</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
