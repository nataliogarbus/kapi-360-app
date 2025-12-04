'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  // Updated word list
  const dynamicWords = [
    'Resultados',
    'Ventas',
    'Clientes',
    'Ingresos',
    'Gestión',
    'Éxitos',
    'POTENCIA',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  return (
    <section className="flex-grow flex items-center p-4 mt-36 text-white text-center min-h-[80vh]">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-shadow-custom h-24 sm:h-32 md:h-40 flex items-center justify-center gap-x-4">
          <span>Más</span>
          <div className="inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} // Cubic bezier for impact
                className="text-[#00DD82] inline-block"
              >
                {dynamicWords[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
        <p className="mt-10 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Nos convertimos en el departamento de marketing que su industria necesita. Delegue con confianza y vea cómo su inversión se traduce en clientes.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="https://wa.me/5491140753480" target="_blank" rel="noopener noreferrer" className="bg-[#00DD82] text-black font-bold uppercase px-8 py-4 rounded-md hover:bg-green-400 transition-all duration-300 text-lg shadow-lg w-full sm:w-auto">
            SOLICITAR CONSULTORÍA
          </Link>
          <Link href="/diagnostico" className="bg-transparent border-2 border-gray-600 text-gray-300 font-bold uppercase px-8 py-4 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 text-lg w-full sm:w-auto">
            PROBAR DIAGNÓSTICO IA
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
