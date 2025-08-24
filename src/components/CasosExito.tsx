import React from 'react';

const CasosExito = () => {
  return (
    <section id="casos-exito" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Resultados, no promesas</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Casos de Éxito</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div className="bg-gray-800/50 rounded-2xl p-8 flex flex-col">
            <div className="flex-grow">
              <img src="https://placehold.co/150x50/1A1A1A/FFFFFF?text=TechSolutions" alt="Logo TechSolutions" className="h-8 mb-6" />
              <p className="text-xl font-medium text-white">«Kapi no es una agencia, es un socio estratégico. Su enfoque en datos nos dio la claridad que necesitábamos para duplicar nuestro crecimiento.»</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Juana Pérez, CEO</p>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold mt-2 inline-block">Ver caso completo &rarr;</a>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-8 flex flex-col">
            <div className="flex-grow">
              <img src="https://placehold.co/150x50/1A1A1A/FFFFFF?text=InnovaCorp" alt="Logo InnovaCorp" className="h-8 mb-6" />
              <p className="text-xl font-medium text-white">«El dashboard de Business Intelligence que desarrollaron para nosotros se convirtió en el centro de nuestras reuniones directivas. Decisiones más rápidas y acertadas.»</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Marcos González, Director de Operaciones</p>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold mt-2 inline-block">Ver caso completo &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasosExito;