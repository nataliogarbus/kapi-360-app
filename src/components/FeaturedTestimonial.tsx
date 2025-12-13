'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const FeaturedTestimonial = () => {
  const { language } = useLanguage();
  // @ts-ignore
  const t = translations[language].featuredTestimonial;
  // @ts-ignore
  const tCase = translations[language].casosExito.cases.emama;

  return (
    <section className="py-20 sm:py-32 w-full bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">{t.title}</h2>
        <div className="mt-8">
          <div className="relative max-w-2xl mx-auto">
            <Image
              src="/images/casos-exito/emama/cecilia.png"
              alt="Cecilia Chakass"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4 shadow-lg border-4 border-cyan-400"
            />
            <blockquote className="text-2xl font-medium text-white">
              {tCase.quote}
            </blockquote>
            <cite className="mt-6 block font-semibold text-cyan-400">
              Cecilia Chakass
              <span className="mt-1 block text-sm text-gray-400">{tCase.role}</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonial;
