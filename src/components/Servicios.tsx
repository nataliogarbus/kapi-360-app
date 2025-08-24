import React from 'react';

const Servicios = () => {
  return (
    <section id="servicios" className="py-20 sm:py-32 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Nuestra Expertise</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Convertimos datos en ventajas competitivas</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Consultoría IA & Big Data</h3>
            <p className="mt-2 text-base text-gray-400">Implementamos soluciones de inteligencia artificial para optimizar procesos, predecir tendencias y personalizar la experiencia del cliente.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Business Intelligence</h3>
            <p className="mt-2 text-base text-gray-400">Transformamos tus datos crudos en dashboards interactivos y reportes claros que facilitan la toma de decisiones estratégicas.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Ventaja Competitiva</h3>
            <p className="mt-2 text-base text-gray-400">Analizamos tu mercado y tus competidores para identificar oportunidades únicas y crear estrategias basadas en datos que te diferencien.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;