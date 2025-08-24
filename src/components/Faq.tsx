'use client';
import React from 'react';

const faqData = [
  {
    question: '¿Qué es exactamente el Diagnóstico Kapi 360?',
    answer: 'Es una herramienta de IA que analiza tu presencia online (tu web, SEO, contenido) y la de tus competidores para darte un plan de acción claro y enfocado en resultados de negocio, no solo en métricas técnicas.'
  },
  {
    question: '¿Este informe tiene algún costo?',
    answer: 'El informe automático y personalizado inicial es completamente gratuito. Es nuestra forma de demostrarte el valor que podemos aportar. Si decides que quieres implementar las mejoras con nosotros, ofrecemos servicios especializados.'
  },
  {
    question: '¿Qué tan rápido puedo ver los resultados?',
    answer: 'El informe se genera en aproximadamente 90 segundos. Una vez que lo tengas, las acciones recomendadas tienen un impacto que varía según la complejidad, pero muchas de las mejoras de "fruta madura" pueden dar resultados visibles en pocas semanas.'
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Totalmente. Solo analizamos la información pública de tu sitio web y la de tus competidores. Los datos de contacto que nos proporcionas para informes personalizados se tratan con estricta confidencialidad y no se comparten.'
  }
];

const Faq = () => {
  return (
    <section className="w-full max-w-3xl mx-auto mt-16 mb-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <details key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 group">
            <summary className="flex justify-between items-center font-medium cursor-pointer text-white list-none">
              <span>{item.question}</span>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-300 mt-3">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
