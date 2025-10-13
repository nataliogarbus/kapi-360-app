'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react'; // <--- 1. Importar useState
import ContactForm from '@/components/ContactForm';
import { CaseStudyData } from '@/app/types';

interface CaseStudyPageProps {
  caseData: CaseStudyData;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ caseData }) => {
  const { hero, client, challenge, solution, results, testimonial, services, videos, images, basePath } = caseData;
  
  // 2. Añadir estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-black text-white">
      {/* ... (código del hero y contenido sin cambios) ... */}

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {hero.videoUrl ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full z-0"
            src={hero.videoUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video background"
          ></iframe>
        ) : null}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-shadow-lg">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-shadow-md">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#solucion" className="inline-block bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-400 transition-colors duration-300">
                Descubre la Solución
            </a>
            <a href="#galeria-videos" className="inline-block border-2 border-cyan-500 text-cyan-500 font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-500 hover:text-black transition-colors duration-300">
                Mirá lo que hicimos
            </a>
          </div>
        </div>
      </div>

      {/* Contenido Narrativo */}
      <div className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-16">

          {/* ... (secciones de cliente, desafio, solucion, etc. sin cambios) ... */}
          <section className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl mb-4">{client.name}</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {client.description}
            </p>
            <div className="mt-8 border-t border-gray-700 pt-8">
                <h3 className="text-2xl font-bold tracking-tight text-cyan-400 mb-4">{challenge.title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {challenge.description}
                </p>
            </div>
          </section>

          <section id="solucion">
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-8">{solution.title}</h2>
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <ul className="space-y-4 text-lg text-gray-300">
                  {solution.points.map((point, index) => (
                    <li key={index} className="flex items-start"><span className="text-cyan-400 mr-3 text-2xl">✓</span><div>{point}</div></li>
                  ))}
                </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">{results.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {results.metrics.map((metric, index) => (
                <div key={index} className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                  <p className="text-5xl font-extrabold text-white">{metric.value}</p>
                  <p className="mt-2 text-lg text-gray-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="my-20">
            <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <Image
                    src={`${basePath}/${testimonial.image}`}
                    alt={testimonial.author}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto shadow-lg border-4 border-cyan-400"
                  />
                </div>
                <div className="max-w-2xl">
                  <blockquote className="text-xl italic text-gray-200">
                    {testimonial.text}
                  </blockquote>
                  <cite className="mt-6 block font-semibold text-cyan-400">
                    {testimonial.author}
                    <span className="mt-1 block text-sm text-gray-400">{testimonial.role}</span>
                  </cite>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-8">Servicios Aplicados</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 py-2 px-4 rounded-full text-lg">{service}</span>
              ))}
            </div>
          </section>

          <Suspense fallback={<div className="text-center p-8">Cargando formulario...</div>}>
            <ContactForm />
          </Suspense>

          {videos && videos.length > 0 && (
            <section id="galeria-videos">
              <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">Galería de Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <div key={video.src} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                    <video src={`${basePath}/videos/${video.src}`} autoPlay loop muted playsInline className="w-full h-auto" />
                    <p className="p-4 text-center text-gray-300">{video.title}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. Galería de Imágenes Modificada */}
          {images && images.length > 0 && (
            <section className="mt-20">
              <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">Galería de Imágenes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.filter(image => image.src !== testimonial.image).map((image) => (
                      <div 
                        key={image.src} 
                        className="rounded-lg overflow-hidden shadow-lg group aspect-square cursor-pointer" 
                        onClick={() => setSelectedImage(image.src)} // <-- Evento onClick
                      >
                          <Image 
                              src={`${basePath}/${image.src}`}
                              alt={image.alt}
                              width={500}
                              height={400}
                              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                      </div>
                  ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* 4. Código del Lightbox/Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-6 text-white text-5xl font-bold z-50"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          
          {/* Contenedor de la imagen para evitar que el clic en la imagen cierre el modal */}
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`${basePath}/${selectedImage}`}
              alt="Imagen ampliada"
              width={1920} // Ancho grande para buena resolución
              height={1080} // Alto grande para buena resolución
              className="object-contain w-auto h-auto max-w-full max-h-[90vh]"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CaseStudyPage;