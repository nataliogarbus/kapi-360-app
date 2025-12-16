'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Rocket, Code, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothLink from './SmoothLink';
import { CONTACT_INFO } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

// --- STATIC CONFIGURATION ---


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  const t = translations[language].header;
  // @ts-ignore - Temporary ignore until typings are fully consolidated
  const tm = translations[language].megaMenu;
  const isDistriland = pathname ? pathname.includes('/propuestas/distriland') : false;

  const PILLARS_DATA = [
    {
      title: tm.growth,
      icon: Rocket,
      color: 'text-pink-500',
      links: [
        { href: '/soluciones/via-publica', text: tm.links.viaPublica },
        { href: '/soluciones/influencers', text: tm.links.influencers },
        { href: '/soluciones/social-media', text: tm.links.socialMedia },
        { href: '/soluciones/medios', text: tm.links.medios },
      ]
    },
    {
      title: tm.tech,
      icon: Code,
      color: 'text-blue-500',
      links: [
        { href: '/soluciones/web', text: tm.links.web },
        { href: '/soluciones/ecommerce', text: tm.links.ecommerce },
        { href: '/soluciones/apps', text: tm.links.apps },
        { href: '/soluciones/medida', text: tm.links.medida },
      ]
    },
    {
      title: tm.strategy,
      icon: Briefcase,
      color: 'text-[#00DD82]',
      links: [
        { href: '/soluciones/seo-ux', text: tm.links.seo },
        { href: '/soluciones/creatividad', text: tm.links.creatividad },
        { href: '/soluciones/ventas', text: tm.links.ventas },
        { href: '/soluciones/prospeccion', text: tm.links.prospeccion },
      ]
    }
  ];

  const navLinks = [
    { href: '/#servicios', text: t.services },
    { href: '/#como-funciona', text: t.howItWorks },
    { href: '/#casos-exito', text: t.successStories },
    { href: '/blog', text: t.blog },
    { href: '/#faq', text: t.faq },
  ];

  const waLink = "https://wa.me/" + CONTACT_INFO.WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hola Kapi, vi sus soluciones 360 y me gustaria armar un plan a medida.");

  const headerClass = isDistriland ? "w-full absolute left-0 z-50 top-24" : "w-full absolute left-0 z-50 top-6";

  return (
    <header className={headerClass}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">

        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
          <div className="relative w-[300px] h-[95px]">
            <Image
              src="/logo-kapi-verde.svg"
              alt="Logo de Kapi"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5 whitespace-nowrap">

          {/* MEGA MENU TRIGGER */}
          <div
            className="relative group"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-300 font-medium py-4">
              <span>Alcance 360°</span>
              <ChevronDown size={16} className={`transform transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSolutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-[900px] bg-[#111] border border-gray-800 rounded-xl shadow-2xl mt-0 overflow-hidden"
                >
                  <div className="grid grid-cols-3 divide-x divide-gray-800">
                    {PILLARS_DATA.map((pillar, idx) => (
                      <div key={idx} className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <pillar.icon size={20} className={pillar.color} />
                          <h3 className="text-white font-bold text-sm uppercase tracking-wide">{pillar.title}</h3>
                        </div>
                        <div className="space-y-1">
                          {pillar.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                            >
                              {link.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0a0a0a] border-t border-gray-800 px-6 py-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-white font-medium">{tm.ctaTitle}</p>
                      <p className="text-xs text-gray-500">{tm.ctaText}</p>
                    </div>
                    <Link
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00DD82] text-black text-xs font-bold px-4 py-2 rounded hover:bg-green-400 transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      {tm.ctaButton} <span>→</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => {
            // Filter: Hide "Servicios", "Cómo Trabajamos", "FAQ" on desktop
            // Show only "Casos de Éxito" and "Blog"
            const shouldShowOnDesktop = link.href.includes('casos-exito') || link.href.includes('blog');

            return link.href.startsWith('/#') ? (
              <SmoothLink
                key={link.href}
                href={link.href}
                className={`${shouldShowOnDesktop ? 'hidden lg:block' : 'hidden'} text-gray-300 hover:text-white transition-colors duration-300`}
              >
                {link.text}
              </SmoothLink>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${shouldShowOnDesktop ? 'hidden lg:block' : 'hidden'} text-gray-300 hover:text-white transition-colors duration-300`}
              >
                {link.text}
              </Link>
            );
          })}

          <Link href="/diagnostico" className="hidden lg:block text-[#00DD82] hover:text-white transition-colors font-medium">
            {t.diagnostic}
          </Link>

          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-gray-300 tracking-wider hover:text-white transition-colors focus:outline-none"
          >
            {language === 'es' ? 'ES | EN' : 'EN | ES'}
          </button>

          <div className="flex items-center gap-3">
            <Link href="/agendar" className="text-white hover:text-[#00DD82] transition-colors font-medium border border-white/20 px-4 py-2 rounded-lg hover:border-[#00DD82]">
              {t.schedule}
            </Link>

            <Link href={CONTACT_INFO.WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-[#00DD82] text-black font-bold py-2 px-5 rounded-lg hover:bg-green-400 transition-colors duration-300">
              {t.contact}
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">{t.menuOpen}</span>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content WITH ACCORDION */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full h-[calc(100vh-80px)] bg-[#0a0a0a] backdrop-blur-md shadow-lg border-b border-gray-800 overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">

              {/* Mega Menu Accordion Mobile */}
              <div className="space-y-6 border-b border-gray-800 pb-6">
                <p className="text-[#00DD82] font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                  Alcance 360° <Rocket size={14} />
                </p>

                {PILLARS_DATA.map((pillar, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className={`font-bold text-sm uppercase tracking-wide ${pillar.color} ml-2 flex items-center gap-2`}>
                      {pillar.title}
                    </h3>
                    <div className="border-l-2 border-gray-800 ml-3 pl-4 space-y-3">
                      {pillar.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block text-gray-300 hover:text-white text-base"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <SmoothLink key={link.href} href={link.href} className="text-gray-200 hover:text-white text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </SmoothLink>
                ) : (
                  <Link key={link.href} href={link.href} className="text-gray-200 hover:text-white text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </Link>
                )
              ))}

              <Link href="/diagnostico" className="text-[#00DD82] font-bold text-lg" onClick={() => setIsMenuOpen(false)}>
                {t.diagnostic}
              </Link>

              <div className="pt-4 flex items-center justify-between border-t border-gray-800 mt-4 pb-12">
                <button
                  onClick={toggleLanguage}
                  className="text-lg font-medium text-gray-300 tracking-wider"
                >
                  {language === 'es' ? 'ES | EN' : 'EN | ES'}
                </button>

                <Link href="/agendar" className="text-[#00DD82] font-bold text-lg" onClick={() => setIsMenuOpen(false)}>
                  {t.schedule}
                </Link>

                <Link href={CONTACT_INFO.WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-[#00DD82] text-black font-bold py-2 px-6 rounded-lg hover:bg-green-400 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                  {t.contact}
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;