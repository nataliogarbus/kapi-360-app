import React from 'react';

const NewsletterSection = () => {
  return (
    <section id="newsletter" className="py-20 sm:py-32">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Inteligencia de Negocios Directo a tu Bandeja de Entrada</h2>
        <p className="mt-4 text-lg text-gray-300">Suscríbete a nuestro newsletter y recibe análisis, tendencias y estrategias de datos e IA que puedes aplicar en tu empresa.</p>
        <form className="mt-8 flex flex-col sm:flex-row gap-2">
          <input type="email" placeholder="Tu email de trabajo" required className="w-full flex-grow bg-gray-800/50 border-2 border-gray-600 text-white px-5 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition duration-300" />
          <button type="submit" className="w-full sm:w-auto bg-[#00DD82] text-black font-bold text-base uppercase py-3 px-8 rounded-lg hover:bg-green-400 transition-colors">Suscribirme</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
