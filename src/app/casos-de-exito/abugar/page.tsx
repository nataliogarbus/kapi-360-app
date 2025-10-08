import Image from 'next/image';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { videos, images, basePath } from '@/lib/data/abugar-data';

export const metadata: Metadata = {
  title: 'Caso de Éxito: Abugar | Kapi',
  description: 'Análisis del rediseño de marca y estrategia digital para Abugar, una fábrica de sillones líder en Argentina, con un enfoque en video y contenido visual.',
};

const CasoExitoAbugar = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section con Video */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          src={`${basePath}/videos/Sucursal Nordelta.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-shadow-lg">
            De Fábrica de Sillones a Marca de Diseño Aspiracional
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-shadow-md">
            Una transformación digital y de branding que redefinió su lugar en el mercado del mobiliario.
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

          {/* Sección Cliente y Desafío */}
          <section className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl mb-4">El Cliente</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong>ABUGAR</strong> es una fábrica de sillones y muebles con 7 sucursales y envíos a todo el país. Aunque eran líderes en el mercado, su identidad digital no reflejaba la alta calidad y el diseño de su línea "tech".
            </p>
            <div className="mt-8 border-t border-gray-700 pt-8">
                <h3 className="text-2xl font-bold tracking-tight text-cyan-400 mb-4">El Desafío</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                Consolidar una identidad de marca premium, optimizar su presencia online y usar el poder del video para conectar con una nueva audiencia, asegurando un rendimiento web de alta velocidad.
                </p>
            </div>
          </section>

          {/* Solución */}
          <section id="solucion">
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-8">La Solución Estratégica</h2>
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <ul className="space-y-4 text-lg text-gray-300">
                    <li className="flex items-start"><span className="text-cyan-400 mr-3 text-2xl">✓</span><div><strong>Branding y Video:</strong> Rediseño de identidad y producción de contenido audiovisual para campañas con influencers y redes (YouTube, TikTok, TV).</div></li>
                    <li className="flex items-start"><span className="text-cyan-400 mr-3 text-2xl">✓</span><div><strong>Desarrollo Web de Alta Gama:</strong> Creación de un nuevo sitio web con mantenimiento evolutivo y hosting en la nube para performance superior.</div></li>
                    <li className="flex items-start"><span className="text-cyan-400 mr-3 text-2xl">✓</span><div><strong>Marketing Digital 360:</strong> Gestión integral de redes sociales y campañas de performance en Google Ads.</div></li>
                </ul>
            </div>
          </section>

          {/* Resultados Clave */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">Resultados Clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <p className="text-5xl font-extrabold text-white">+120%</p>
                <p className="mt-2 text-lg text-gray-300">en Consultas Calificadas</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <p className="text-5xl font-extrabold text-white">Top 3</p>
                <p className="mt-2 text-lg text-gray-300">en Google para "Sillones de Diseño"</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <p className="text-5xl font-extrabold text-white">-50%</p>
                <p className="mt-2 text-lg text-gray-300">en Tiempo de Carga Web</p>
              </div>
            </div>
          </section>

          {/* Testimonio */}
          <section className="my-20">
            <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <Image
                    src={`${basePath}/paola-urrego.png`}
                    alt="Paola Urrego"
                    width={120}
                    height={120}
                    className="rounded-full mx-auto shadow-lg border-4 border-cyan-400"
                  />
                </div>
                <div className="max-w-2xl">
                  <blockquote className="text-xl italic text-gray-200">
                    “Encontramos un equipo con el que pudimos crecer en consultas y ventas. Logramos redefinir la identidad y alcanzar nuestros objetivos.”
                  </blockquote>
                  <cite className="mt-6 block font-semibold text-cyan-400">
                    Paola Urrego
                    <span className="mt-1 block text-sm text-gray-400">Gerente de Marketing, Abugar</span>
                  </cite>
                </div>
              </div>
            </div>
          </section>

          {/* Servicios Aplicados */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-8">Servicios Aplicados</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-gray-800 text-gray-300 py-2 px-4 rounded-full text-lg">Branding y Video</span>
              <span className="bg-gray-800 text-gray-300 py-2 px-4 rounded-full text-lg">Desarrollo Web de Alta Gama</span>
              <span className="bg-gray-800 text-gray-300 py-2 px-4 rounded-full text-lg">Marketing Digital 360</span>
            </div>
          </section>

          <ContactForm />

          {/* Galería de Videos */}
          <section id="galeria-videos">
            <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">Galería de Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video, index) => (
                <div 
                  key={video.src} 
                  className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${index === 0 ? 'md:col-span-2' : ''}`}>
                  <video src={`${basePath}/videos/${video.src}`} controls className="w-full h-auto" />
                  <p className="p-4 text-center text-gray-300">{video.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Galería de Imágenes */}
          <section className="mt-20">
             <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">Galería de Imágenes</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.filter(image => image.src !== 'paola-urrego.png').map((image, index) => (
                    <div key={image.src} className={`
                        ${index === 0 || index === 6 ? 'md:col-span-2' : ''}
                        ${index === 3 ? 'md:row-span-2' : ''}
                        rounded-lg overflow-hidden shadow-lg group
                    `}>
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

        </div>
      </div>
    </div>
  );
};

export default CasoExitoAbugar;