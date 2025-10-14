import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CasosExito = () => {
  return (
    <section id="casos-exito" className="py-20 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Resultados, no promesas</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Casos de Éxito en la Industria</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {/* Abugar Case Study Card */}
          <Link href="/casos-de-exito/abugar" className="bg-gray-800/50 rounded-2xl p-8 flex flex-col hover:bg-gray-700/50 transition-colors duration-300 border border-transparent hover:border-cyan-500">
            <div className="flex-grow">
              <p className="text-xl font-medium text-white flex-grow">“Encontramos un equipo con el que pudimos crecer en consultas y ventas. Logramos redefinir la identidad y alcanzar nuestros objetivos.”</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <Image src="/images/casos-exito/Abugar/paola-urrego.png" alt="Paola Urrego" width={56} height={56} className="rounded-full mr-4" />
                <div>
                  <p className="text-lg font-bold text-white">Paola Urrego</p>
                  <p className="text-base text-gray-400">Gerente de Marketing, Abugar</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#00DD82] mt-4">Ver caso de éxito →</p>
            </div>
          </Link>

          <Link href="/casos-de-exito/emama" className="bg-gray-800/50 rounded-2xl p-8 flex flex-col hover:bg-gray-700/50 transition-colors duration-300 border border-transparent hover:border-cyan-500">
            <div className="flex-grow">
              <p className="text-xl font-medium text-white flex-grow">“La experiencia y capacidad de gestión del equipo fue clave. Logramos 8 mil seguidores en Instagram en dos meses, superando todas las expectativas.”</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <Image src="/images/casos-exito/emama/cecilia.png" alt="Cecilia Chakass" width={56} height={56} className="rounded-full mr-4" />
                <div>
                  <p className="text-lg font-bold text-white">Cecilia Chakass</p>
                  <p className="text-base text-gray-400">Gerente General, Emama</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#00DD82] mt-4">Ver caso de éxito →</p>
            </div>
          </Link>

          <Link href="/casos-de-exito/lavazulada" className="bg-gray-800/50 rounded-2xl p-8 flex flex-col hover:bg-gray-700/50 transition-colors duration-300 border border-transparent hover:border-cyan-500">
            <div className="flex-grow">
              <p className="text-xl font-medium text-white flex-grow">“Trabajar con Brandi fue clave para lograr nuestro objetivo de posicionar a esta nueva agrupación de Vélez Sarfield como una alternativa política y de servicio para el club y los socios.”</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <Image src="/images/casos-exito/lavazulada/gonzalo-review.png" alt="Gonzalo Reinoso" width={56} height={56} className="rounded-full mr-4" />
                <div>
                  <p className="text-lg font-bold text-white">Gonzalo Reinoso</p>
                  <p className="text-base text-gray-400">Responsable de Marketing, La V Azulada</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#00DD82] mt-4">Ver caso de éxito →</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasosExito;
