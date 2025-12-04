import React from 'react';
import { ScanLine, FileText, Award } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: <ScanLine className="h-10 w-10 text-cyan-400" />,
    title: '1. Ingrese su URL',
    description: 'Simplemente coloque la dirección de su sitio web en el campo de análisis para iniciar el proceso.',
  },
  {
    icon: <FileText className="h-10 w-10 text-cyan-400" />,
    title: '2. Análisis IA',
    description: 'Nuestros agentes de IA analizan más de 100 variables de su plataforma, contenido y mercado en tiempo real.',
  },
  {
    icon: <Award className="h-10 w-10 text-cyan-400" />,
    title: '3. Reciba su Informe',
    description: 'Obtenga un puntaje y un informe detallado. El siguiente paso es una consultoría estratégica para analizar los resultados.',
    cta: (
      <Link href="https://wa.me/5491140753480" target="_blank" rel="noopener noreferrer">
        <span className="mt-4 inline-block bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors duration-300 text-sm">
          Agendar Consultoría
        </span>
      </Link>
    )
  },
];

const HowItWorksSteps = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center text-white mb-12">¿Cómo Funciona?</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
            {step.cta && <div className="mt-auto pt-4">{step.cta}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSteps;
