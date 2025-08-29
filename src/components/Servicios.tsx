import React from 'react';

const Servicios = () => {
  return (
    <section id="servicios" className="py-20 sm:py-32 bg-gray-900/50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Nuestra Expertise</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Soluciones Integrales para Profesionalizar su Empresa</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Diseño Web y Desarrollo</h3>
            <p className="mt-2 text-base text-gray-400">Creamos sitios web que reflejan la calidad de sus productos y convierten visitantes en clientes.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Gestión de Publicidad Digital</h3>
            <p className="mt-2 text-base text-gray-400">Invertimos su presupuesto de forma inteligente en Google Ads y Redes Sociales para generar consultas de calidad.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Marketing de Contenidos</h3>
            <p className="mt-2 text-base text-gray-400">Posicionamos su marca como un referente en la industria, generando confianza y atrayendo clientes a largo plazo.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl card-hover-effect">
            <h3 className="text-xl font-bold text-white">Lanzamiento de Nuevas Marcas y Proyectos</h3>
            <p className="mt-2 text-base text-gray-400">Ideal para empresas consolidadas que buscan lanzar una nueva marca. Nos convertimos en su equipo de lanzamiento integral, asumiendo la gestión completa para garantizar una entrada al mercado profesional y planificada.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
