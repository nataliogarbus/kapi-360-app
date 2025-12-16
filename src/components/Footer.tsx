'use client';

import React from 'react';
import Link from 'next/link';

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const Footer = () => {
  const { language } = useLanguage();
  // @ts-ignore
  const t = translations[language].footer;
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    soluciones: [
      { name: t.links.media, href: '/soluciones/medios' },
      { name: t.links.viaPublica, href: '/soluciones/via-publica' },
      { name: t.links.web, href: '/soluciones/web' },
      { name: t.links.marketing, href: '/soluciones/prospeccion' },
      { name: t.links.seo, href: '/soluciones/seo-ux' },
      { name: t.links.ecommerce, href: '/soluciones/ecommerce' },
    ],
    agencia: [
      { name: t.links.about, href: '/#agencia' },
      { name: t.links.cases, href: '/#casos' },
      { name: t.links.method, href: '/#metodo' },
      { name: t.links.contact, href: '/#contacto' },
    ],
    recursos: [
      { name: t.links.blog, href: '/blog' },
      { name: t.links.diagnostic, href: '/diagnostico' },
      { name: t.links.calculator, href: '/#roi' },
      { name: t.links.investmentCalculator, href: '/#inversion' },
    ],
    legal: [
      { name: t.links.privacy, href: '/politica-privacidad' },
      { name: t.links.terms, href: '/terminos' },
    ]
  };

  return (
    <footer className="w-full bg-[#111] border-t border-gray-800 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Contact */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-white tracking-tighter">KAPI<span className="text-[#00DD82]">.</span></span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex flex-col gap-3 text-sm mb-6">
              <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="hover:text-[#00DD82] transition-colors flex items-center gap-2">
                📧 {CONTACT_INFO.EMAIL}
              </a>
              <a href={CONTACT_INFO.WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#00DD82] transition-colors flex items-center gap-2">
                📱 {CONTACT_INFO.PHONE_DISPLAY}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                <Instagram size={20} />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <Facebook size={20} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                <Twitter size={20} />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t.sections.solutions}</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.soluciones.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#00DD82] transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t.sections.agency}</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.agencia.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#00DD82] transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-bold mt-8 mb-4 uppercase text-sm tracking-wider">{t.sections.legal}</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#00DD82] transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t.sections.resources}</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#00DD82] transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 select-none" title="Trabajamos Globalmente">
              <span className="text-2xl grayscale hover:grayscale-0 transition-all cursor-help">{CONTACT_INFO.FLAGS}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {currentYear} Kapi. {t.rights}</p>
          <p className="mt-2 md:mt-0">{t.powered}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;