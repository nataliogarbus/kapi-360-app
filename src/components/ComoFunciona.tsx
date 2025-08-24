import React from 'react';

const ComoFunciona = () => {
  return (
    <section id="como-funciona" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Nuestro Proceso</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Tu Estrategia en 3 Pasos Simples</p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-3 text-center relative">
          {/* Step 1 */}
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">1</div>
            <h3 className="text-xl font-bold text-white">Ingresa tu URL</h3>
            <p className="mt-2 text-base text-gray-400">Introduce la dirección de tu sitio web para iniciar el análisis automático y confidencial.</p>
          </div>
          {/* Step 2 */}
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">2</div>
            <h3 className="text-xl font-bold text-white">Recibe tu Informe IA</h3>
            <p className="mt-2 text-base text-gray-400">Nuestra IA analiza +50 variables y genera tu informe ejecutivo en segundos.</p>
          </div>
          {/* Step 3 */}
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">3</div>
            <h3 className="text-xl font-bold text-white">Define tu Plan de Acción</h3>
            <p className="mt-2 text-base text-gray-400">Utiliza los datos para tomar decisiones y agenda una consultoría para potenciar tus resultados.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
