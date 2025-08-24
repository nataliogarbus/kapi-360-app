'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValuePath from './ValuePath';

const words = ["Visión", "Control", "Gestión", "Clientes", "Ingresos", "Éxitos", "Ventas", "POTENCIA"];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Cambia la palabra cada 3 segundos

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex-grow flex items-center p-4 mt-24 text-white text-center">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-shadow-custom flex justify-center items-center h-24">
          <span className="mr-4">Más</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]} // La key es crucial para que AnimatePresence detecte el cambio
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="text-[#00DD82] inline-block"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </h1>
        {/* Replaced the paragraph with ValuePath component */}
        <ValuePath />
      </div>
    </section>
  );
};

export default HeroSection;