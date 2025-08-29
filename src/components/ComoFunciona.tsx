import React from 'react';

const ComoFunciona = () => {
  return (
    <section id="como-funciona" className="py-20 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Nuestro Proceso</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Un Proceso Claro con Resultados Visibles</p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-3 text-center relative">
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">1</div>
            <h3 className="text-xl font-bold text-white">Diagnóstico y Estrategia</h3>
            <p className="mt-2 text-base text-gray-400">Analizamos a fondo su negocio, su mercado y sus competidores para crear un plan de acción realista y enfocado en sus objetivos.</p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">2</div>
            <h3 className="text-xl font-bold text-white">Implementación Profesional</h3>
            <p className="mt-2 text-base text-gray-400">Nuestro equipo se encarga de todo: desde la modernización de su web hasta la gestión de campañas publicitarias que atraen clientes.</p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-black text-[#00DD82] mb-4">3</div>
            <h3 className="text-xl font-bold text-white">Medición y Optimización</h3>
            <p className="mt-2 text-base text-gray-400">Le entregamos reportes claros que muestran el retorno de su inversión (ROI). Nos enfocamos en las métricas que le importan: consultas, presupuestos y ventas.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;