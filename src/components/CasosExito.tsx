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
              <Image src="/images/casos-exito/Abugar/abugar-logo.png" alt="Logo Abugar" className="h-10 mb-6 w-auto" width={140} height={40} />
              <p className="text-xl font-medium text-white">“Encontramos un equipo con el que pudimos crecer en consultas y ventas. Logramos redefinir la identidad y alcanzar nuestros objetivos.”</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Paola Urrego</p>
              <p className="text-base text-gray-400">Gerente de Marketing, Abugar</p>
              <p className="text-sm font-semibold text-[#00DD82] mt-4">Ver caso de éxito →</p>
            </div>
          </Link>

          <Link href="/casos-de-exito/emama" className="bg-gray-800/50 rounded-2xl p-8 flex flex-col hover:bg-gray-700/50 transition-colors duration-300 border border-transparent hover:border-cyan-500">
            <div className="flex-grow">
              <Image src="/images/casos-exito/emama/emama-logo.png" alt="Logo Emama" className="h-10 mb-6 w-auto" width={140} height={40} />
              <p className="text-xl font-medium text-white">“La experiencia y capacidad de gestión del equipo fue clave. Logramos 8 mil seguidores en Instagram en dos meses, superando todas las expectativas.”</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Cecilia Chakass</p>
              <p className="text-base text-gray-400">Gerente General, Emama</p>
              <p className="text-sm font-semibold text-[#00DD82] mt-4">Ver caso de éxito →</p>
            </div>
          </Link>

          <div className="bg-gray-800/50 rounded-2xl p-8 flex flex-col">
            <div className="flex-grow">
              <Image src="https://placehold.co/150x50/1A1A1A/FFFFFF?text=MetalurgicaFADEP" alt="Logo Metalúrgica FADEP S.A." className="h-8 mb-6 w-auto" width={150} height={50} />
              <p className="text-xl font-medium text-white">«Antes, el marketing era un dolor de cabeza que manejábamos &apos;a pulmón&apos;. Kapi nos ordenó la casa, modernizó la web y ahora las consultas de calidad llegan todas las semanas. Pudimos delegar y enfocarnos en la producción.»</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Carlos Fernández, Socio Gerente, Metalúrgica FADEP S.A.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasosExito;
