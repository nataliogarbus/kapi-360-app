'use client';

import React from 'react';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const ComoFunciona = () => {
  const { language } = useLanguage();
  // @ts-ignore
  const t = translations[language].howItWorks;
  return (
    <section id="como-funciona" className="py-20 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">{t.subtitle}</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{t.title}</p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-3 text-center relative">
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">1</div>
            <h3 className="text-xl font-bold text-white">{t.steps.step1.title}</h3>
            <p className="mt-2 text-base text-gray-400">{t.steps.step1.description}</p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">2</div>
            <h3 className="text-xl font-bold text-white">{t.steps.step2.title}</h3>
            <p className="mt-2 text-base text-gray-400">{t.steps.step2.description}</p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">3</div>
            <h3 className="text-xl font-bold text-white">{t.steps.step3.title}</h3>
            <p className="mt-2 text-base text-gray-400">{t.steps.step3.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;