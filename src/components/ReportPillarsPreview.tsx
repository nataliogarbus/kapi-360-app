import React from 'react';
import { Users, Laptop, Megaphone, BarChart2 } from 'lucide-react';

const pillars = [
  {
    icon: <Users className="h-8 w-8 text-cyan-400" />,
    name: 'Mercado y Competencia',
  },
  {
    icon: <Laptop className="h-8 w-8 text-cyan-400" />,
    name: 'Plataforma y UX',
  },
  {
    icon: <Megaphone className="h-8 w-8 text-cyan-400" />,
    name: 'Contenido y Autoridad',
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-cyan-400" />,
    name: 'Crecimiento y Adquisición',
  },
];

const ReportPillarsPreview = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">¿Qué Analizamos?</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Nuestro diagnóstico IA evalúa su negocio a través de 4 pilares fundamentales para el éxito digital.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
        {pillars.map((pillar) => (
          <div key={pillar.name} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center h-full">
            <div className="mb-4">{pillar.icon}</div>
            <h3 className="text-md font-semibold text-white">{pillar.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportPillarsPreview;
