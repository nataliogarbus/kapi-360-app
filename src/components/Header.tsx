'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothLink from './SmoothLink';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#servicios', text: 'Servicios' },
    { href: '/#como-funciona', text: 'Cómo Trabajamos' },
    { href: '/#casos-exito', text: 'Casos de Éxito' },
    { href: '/blog', text: 'Blog' },
    { href: '/#faq', text: 'FAQ' },
    { href: '/diagnostico', text: 'Diagnóstico IA' },
  ];

  const contactLink = { href: '/#contact', text: 'Contacto' };

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2" onClick={() => isMenuOpen && setIsMenuOpen(false)}>
            <Image 
              src="/logo-kapi-verde.svg" 
              alt="Logo de Kapi"
              width={150} 
              height={42}
              priority
            />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <SmoothLink key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">
                  {link.text}
                </SmoothLink>
              ) : (
                <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">
                  {link.text}
                </Link>
              )
            ))}
            <SmoothLink href={contactLink.href} className="bg-white/10 text-white py-2 px-5 rounded-lg hover:bg-white/20 transition-colors duration-300">
              {contactLink.text}
            </SmoothLink>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Abrir menú principal</span>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-sm shadow-lg"
          >
            <div className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <SmoothLink key={link.href} href={link.href} className="text-gray-200 hover:text-white text-lg" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </SmoothLink>
                ) : (
                  <Link key={link.href} href={link.href} className="text-gray-200 hover:text-white text-lg" onClick={() => setIsMenuOpen(false)}>
                    {link.text}
                  </Link>
                )
              ))}
              <SmoothLink href={contactLink.href} className="bg-cyan-500 text-white py-3 px-8 rounded-lg hover:bg-cyan-600 transition-colors duration-300 text-lg" onClick={() => setIsMenuOpen(false)}>
                {contactLink.text}
              </SmoothLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;