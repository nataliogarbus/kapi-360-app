'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Sparkles, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const galleryItems = [
  {
    src: '/images/propuestas/vicuna/navidad-living.jpg',
    alt: 'Sala de estar elegantemente decorada para Navidad',
    title: 'Salones que Abrazan',
    description: 'Creamos el ambiente perfecto para que tus invitados se sientan como en casa.',
  },
  {
    src: '/images/propuestas/vicuna/navidad-mesa.jpg',
    alt: 'Mesa de comedor preparada para una cena navideña',
    title: 'Mesas para Celebrar',
    description: 'Diseñamos tu mesa para que cada cena sea un recuerdo inolvidable.',
  },
  {
    src: '/images/propuestas/vicuna/navidad-rincon.jpg',
    alt: 'Rincón acogedor con árbol de Navidad y regalos',
    title: 'Rincones con Magia',
    description: 'Cada detalle cuenta. Transformamos cualquier espacio en un rincón especial.',
  },
];

const steps = [
  {
    icon: <Sparkles className="h-10 w-10 text-amber-400" />,
    title: '1. Consulta de Diseño',
    description: 'Nos reunimos contigo para entender tu estilo, tus espacios y la atmósfera que quieres crear para estas fiestas.',
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-amber-400" />,
    title: '2. Propuesta a Medida',
    description: 'Recibes un concepto de diseño personalizado, seleccionando los mejores elementos que se adaptan a tu hogar.',
  },
  {
    icon: <Star className="h-10 w-10 text-amber-400" />,
    title: '3. Instalación Mágica',
    description: 'Nuestro equipo se encarga de todo. Dejamos tu casa lista para que solo te preocupes por disfrutar y recibir a los tuyos.',
  },
];

const testimonials = [
  {
    quote: "La decoración superó todas mis expectativas. Mis invitados quedaron fascinados y yo pude disfrutar de la noche sin estrés. ¡El mejor regalo de Navidad!",
    author: "Sofía L.",
    location: "Nordelta"
  },
  {
    quote: "Profesionalismo y buen gusto en cada detalle. Casa Vicuña entendió perfectamente lo que quería y lo hizo realidad. Repetiré sin dudarlo.",
    author: "Martín G.",
    location: "Barrio Parque"
  }
];


const CasaVicuñaPage = () => {
  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4">
        <Image
          src="/images/propuestas/vicuna/navidad-hero.jpg"
          alt="Hogar decorado para Navidad con una gran chimenea"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-30"
          priority
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow-lg leading-tight">
            Recibe la Magia de las Fiestas en un Hogar de Ensueño
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200 text-shadow-md">
            Servicio de decoración de temporada por Casa Vicuña. Diseñamos y preparamos tu hogar para que estas fiestas solo te dediques a disfrutar.
          </p>
          <a href="https://wa.me/5491140753480" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-400 transition-colors duration-300">
            Solicitar una Consulta
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 sm:py-28 bg-slate-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-400 sm:text-4xl mb-4">Tu Hogar, Tu Refugio Festivo</h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Sabemos que tu tiempo es valioso. Deja en manos de nuestros expertos la creación de una atmósfera navideña única y sofisticada. Nos encargamos de cada detalle, desde el concepto hasta la instalación final, para que tu casa brille con estilo propio y tú puedas relajarte.
          </p>
        </div>
      </section>

      {/* Gallery Section (The "Catalog") */}
      <section id="galeria" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Inspírate con Nuestros Diseños</h2>
            <p className="mt-4 text-lg text-slate-400">Estilos que transforman espacios y crean momentos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div key={item.src} className="group relative overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-200 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Un Proceso Sencillo para un Resultado Mágico</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step) => (
            <div key={step.title} className="bg-slate-800/50 p-8 rounded-lg border border-slate-700">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-400">Clientes que ya Viven la Magia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900/50 p-8 rounded-lg">
                <blockquote className="text-lg text-slate-200 italic border-l-4 border-amber-500 pl-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <cite className="mt-6 block text-right font-semibold text-white">
                  {testimonial.author}
                  <span className="block text-sm text-slate-400">{testimonial.location}</span>
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contacto" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">¿Lista para Transformar tu Hogar?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Completa el formulario y agendemos una consulta sin compromiso. Las plazas para la temporada son limitadas.
            </p>
          </div>
          {/* 
              Aquí reutilizamos el ContactForm que ya tienes en tu proyecto.
              Podrías querer modificarlo o pasarle props para cambiar el webhook 
              o el texto del título si fuera necesario.
            */}
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} Casa Vicuña. Todos los derechos reservados.</p>
        <p className="text-sm">Una propuesta de Kapi para la temporada de fiestas.</p>
      </footer>
    </div>
  );
};

export default CasaVicuñaPage;