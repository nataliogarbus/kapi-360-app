import React from 'react';
import Image from 'next/image';

const CasosExito = () => {
  return (
    <section id="casos-exito" className="py-20 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00DD82] tracking-wider uppercase">Resultados, no promesas</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Casos de Éxito en la Industria</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div className="bg-gray-800/50 rounded-2xl p-8 flex flex-col">
            <div className="flex-grow">
              <Image src="https://placehold.co/150x50/1A1A1A/FFFFFF?text=MetalurgicaFADEP" alt="Logo Metalúrgica FADEP S.A." className="h-8 mb-6 w-auto" width={150} height={50} />
              <p className="text-xl font-medium text-white">«Antes, el marketing era un dolor de cabeza que manejábamos &apos;a pulmón&apos;. Kapi nos ordenó la casa, modernizó la web y ahora las consultas de calidad llegan todas las semanas. Pudimos delegar y enfocarnos en la producción.»</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Carlos Fernández, Socio Gerente, Metalúrgica FADEP S.A.</p>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-8 flex flex-col">
            <div className="flex-grow">
              <Image src="https://placehold.co/150x50/1A1A1A/FFFFFF?text=AlimentosDelSur" alt="Logo Alimentos del Sur" className="h-8 mb-6 w-auto" width={150} height={50} />
              <p className="text-xl font-medium text-white">«Necesitábamos una imagen más profesional para competir en el mercado. El equipo de Kapi entendió perfectamente nuestra industria y nuestros productos. El resultado es más presencia y, sobre todo, más ventas.»</p>
            </div>
            <div className="mt-8">
              <p className="text-lg font-bold text-white">Laura B., Directora, Alimentos del Sur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasosExito;
