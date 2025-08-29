import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="flex-grow flex items-center p-4 mt-36 text-white text-center min-h-[80vh]">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-shadow-custom">
          <span className="mr-4">MENOS COMPLEJIDAD,</span><span className="text-[#00DD82]">MÁS VENTAS</span>
        </h1>
        <p className="mt-10 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Nos convertimos en el departamento de marketing que su industria necesita. Delegue con confianza y vea cómo su inversión se traduce en clientes.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#contact" className="bg-[#00DD82] text-black font-bold uppercase px-8 py-4 rounded-md hover:bg-green-400 transition-all duration-300 text-lg shadow-lg w-full sm:w-auto">
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
