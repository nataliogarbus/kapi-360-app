'use client';
import React from 'react';

const faqData = [
  {
    question: '¿Kapi es una herramienta de IA o una agencia de marketing?',
    answer: 'Somos un socio estratégico de marketing especializado en PYMES industriales. Usamos la IA como herramienta interna para ser más eficientes, pero lo que usted recibe es una estrategia y ejecución profesional enfocada en sus resultados de negocio.'
  },
  {
    question: '¿Este servicio es para emprendedores que recién empiezan?',
    answer: 'Nuestro enfoque está diseñado para PYMES con una trayectoria establecida que buscan profesionalizar su marketing para escalar al siguiente nivel. Si su empresa ya tiene un recorrido y busca un socio para crecer de forma sostenible, estamos para ayudarle.'
  },
  {
    question: '¿Cómo mido el retorno de mi inversión?',
    answer: 'Le proporcionamos reportes periódicos claros, enfocados en las métricas que le importan: el número de consultas de calidad, cómo se traducen en presupuestos y el impacto final en sus ventas. Transparencia total sobre su ROI.'
  }
];

const Faq = () => {
  return (
    <section id="faq" className="w-full max-w-3xl mx-auto mt-16 mb-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <details key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 group">
            <summary className="flex justify-between items-center font-medium cursor-pointer text-white list-none">
              <h3 className="text-lg font-medium">{item.question}</h3>
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
