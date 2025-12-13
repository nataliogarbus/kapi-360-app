'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Rocket, Code, Briefcase, ArrowRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const Servicios = () => {
  const { language } = useLanguage();
  // @ts-ignore
  const t = translations[language].servicesSection;
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const pillars = [
    {
      title: t.pillars.growth.title,
      description: t.pillars.growth.description,
      icon: Rocket,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500',
      id: 'growth',
      items: [
        {
          label: t.pillars.growth.items.viaPublica.label,
          href: '/soluciones/via-publica',
          desc: t.pillars.growth.items.viaPublica.desc
        },
        {
          label: t.pillars.growth.items.influencers.label,
          href: '/soluciones/influencers',
          desc: t.pillars.growth.items.influencers.desc
        },
        {
          label: t.pillars.growth.items.socialMedia.label,
          href: '/soluciones/social-media',
          desc: t.pillars.growth.items.socialMedia.desc
        },
        {
          label: t.pillars.growth.items.medios.label,
          href: '/soluciones/medios',
          desc: t.pillars.growth.items.medios.desc
        }
      ],
      link: '/soluciones/via-publica'
    },
    {
      title: t.pillars.tech.title,
      description: t.pillars.tech.description,
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      id: 'tech',
      items: [
        {
          label: t.pillars.tech.items.web.label,
          href: '/soluciones/web',
          desc: t.pillars.tech.items.web.desc
        },
        {
          label: t.pillars.tech.items.ecommerce.label,
          href: '/soluciones/ecommerce',
          desc: t.pillars.tech.items.ecommerce.desc
        },
        {
          label: t.pillars.tech.items.apps.label,
          href: '/soluciones/apps',
          desc: t.pillars.tech.items.apps.desc
        },
        {
          label: t.pillars.tech.items.medida.label,
          href: '/soluciones/medida',
          desc: t.pillars.tech.items.medida.desc
        }
      ],
      link: '/soluciones/web'
    },
    {
      title: t.pillars.strategy.title,
      description: t.pillars.strategy.description,
      icon: Briefcase,
      color: 'text-[#00DD82]',
      bgColor: 'bg-[#00DD82]',
      id: 'strategy',
      items: [
        {
          label: t.pillars.strategy.items.seo.label,
          href: '/soluciones/seo-ux',
          desc: t.pillars.strategy.items.seo.desc
        },
        {
          label: t.pillars.strategy.items.creatividad.label,
          href: '/soluciones/creatividad',
          desc: t.pillars.strategy.items.creatividad.desc
        },
        {
          label: t.pillars.strategy.items.ventas.label,
          href: '/soluciones/ventas',
          desc: t.pillars.strategy.items.ventas.desc
        },
        {
          label: t.pillars.strategy.items.prospeccion.label,
          href: '/soluciones/prospeccion',
          desc: t.pillars.strategy.items.prospeccion.desc
        }
      ],
      link: '/soluciones/prospeccion'
    }
  ];

  return (
    <section id="servicios" className="py-24 sm:py-32 w-full relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00DD82]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-[#00DD82] tracking-widest uppercase mb-4">{t.subtitle}</h2>
          <p className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DD82] to-blue-500">{t.titleHighlight}</span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl flex flex-col group hover:border-gray-700 transition-colors">
              <div className="mb-6 bg-gray-900 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <pillar.icon className={`w-7 h-7 ${pillar.color}`} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm h-12">
                {pillar.description}
              </p>

              <div className="space-y-2 mb-8 flex-grow">
                {pillar.items.map((item, idx) => {
                  const itemId = `${pillar.id}-${idx}`;
                  const isOpen = openAccordion === itemId;

                  return (
                    <div key={idx} className="border-b border-gray-800/50 last:border-0 pb-2">
                      <button
                        onClick={() => toggleAccordion(itemId)}
                        className="w-full flex items-center justify-between py-2 text-left group/item focus:outline-none"
                      >
                        <div className="flex items-center">
                          <span className={`w-1.5 h-1.5 rounded-full mr-3 ${pillar.bgColor} group-hover/item:scale-125 transition-transform`}></span>
                          <span className="text-gray-300 font-medium text-sm group-hover/item:text-white transition-colors">{item.label}</span>
                        </div>
                        {isOpen ? <Minus size={14} className="text-gray-500" /> : <Plus size={14} className="text-gray-500" />}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pl-5 pr-2 py-2 mb-2">
                              <p className="text-gray-500 text-xs mb-3 leading-relaxed">
                                {item.desc}
                              </p>
                              <Link href={item.href} className={`text-xs font-bold uppercase tracking-wider flex items-center ${pillar.color} hover:underline`}>
                                {t.viewDetail} <ArrowRight size={12} className="ml-1" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <Link href={pillar.link} className="flex items-center text-white font-bold text-sm tracking-wide group-hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-800">
                {t.explorePilar} <ArrowRight className={`ml-2 w-4 h-4 ${pillar.color}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;
