/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactForm from '@/components/ContactForm';

const KopruchProposalContent = () => {
  const searchParams = useSearchParams();
  const isPdfView = searchParams.get('view') === 'pdf';

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urlToPrint: window.location.href }),
      });
      if (!response.ok) throw new Error('Error al generar el PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "propuesta-kopruch.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('No se pudo descargar el PDF.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  useEffect(() => {
    if (isPdfView) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    const sections = document.querySelectorAll('.section-fade-in');
    sections.forEach(section => { observer.observe(section); });
    return () => { sections.forEach(section => { observer.unobserve(section); }); };
  }, [isPdfView]);

  return (
    <div className={`bg-gray-50 text-gray-800 antialiased ${isPdfView ? 'pdf-view' : ''}`}>
        <main className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-20">
            
            <section className="text-center mb-24 section-fade-in">
                <div className="flex justify-center items-center mb-6">
                    <img src="https://i.imgur.com/MMqotBi.png" alt="Logo Kopruch" className="h-24" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-kopruch-green tracking-tight">Proyecto Visión Kopruch</h1>
                <h2 className="text-xl md:text-2xl mt-4 text-gray-600">La Evolución a un Sistema de Soluciones Integrales.</h2>
                <p className="mt-6 text-sm font-semibold tracking-widest text-gray-400 uppercase">3 Pilares de Producto • 1 Integrador de Soluciones • Motor de Crecimiento Inteligente</p>
                <p className="mt-10 max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">Hoy sentamos las bases de la Visión 2026 de Kopruch con el lanzamiento de su nueva arquitectura de marca 3+1: un ecosistema que combina tres pilares de productos de alta especialización con una potente división de soluciones integrales por industria, todo potenciado por un motor de crecimiento y datos de última generación.</p>
                {!isPdfView && <button onClick={handleDownloadPdf} disabled={isDownloadingPdf} className="mt-8 inline-block bg-gray-700 text-white font-bold text-sm px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition-all disabled:bg-gray-400">{isDownloadingPdf ? 'Generando PDF...' : 'Descargar Propuesta en PDF'}</button>}
            </section>

            <section className="mb-24 section-fade-in"><div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200"><h2 className="text-3xl font-bold text-center mb-2">El Desafío: Unificar para Crecer</h2><p className="text-center text-gray-600 mb-8">El crecimiento sostenible requiere una visión 360° del negocio. Identificamos oportunidades clave para transformar los desafíos actuales en ventajas competitivas:</p><div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"><div className="bg-gray-50 p-6 rounded-lg"><p className="font-semibold text-lg">Dejar atrás los datos descentralizados.</p></div><div className="bg-gray-50 p-6 rounded-lg"><p className="font-semibold text-lg">Obtener visibilidad total sobre el ROI.</p></div><div className="bg-gray-50 p-6 rounded-lg"><p className="font-semibold text-lg">Evolucionar de producto a solución experta.</p></div></div></div></section>

            <section className="mb-24 section-fade-in"><h2 className="text-4xl font-bold text-center">Nuestra Estrategia: El Modelo 3+1</h2><div className="mt-12"><h3 className="text-2xl font-semibold text-center text-gray-700">PASO 1: Los Pilares de la Excelencia Técnica</h3><p className="text-center text-gray-500 mt-2">Tres divisiones de producto, líderes en su categoría.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"><div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-sub-climacontrol"><h4 className="font-bold text-xl text-sub-climacontrol">Kopruch CLIMACONTROL™</h4><p className="mt-2 text-sm"><strong>Promesa:</strong> Protección Climática Garantizada.</p><p className="mt-2 text-gray-600">Creamos microclimas optimizados para proteger cultivos de alto valor contra eventos extremos, asegurando la rentabilidad de cada cosecha.</p></div><div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-sub-biosecure"><h4 className="font-bold text-xl text-sub-biosecure">Kopruch BIOSECURE™</h4><p className="mt-2 text-sm"><strong>Promesa:</strong> Barrera Biológica Activa.</p><p className="mt-2 text-gray-600">El escudo biológico de alta precisión. Aislamos los cultivos de plagas, reduciendo la necesidad de pesticidas para un producto final más limpio.</p></div><div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-sub-infraprotect"><h4 className="font-bold text-xl text-sub-infraprotect">Kopruch INFRAPROTECT™</h4><p className="mt-2 text-sm"><strong>Promesa:</strong> Contención Perimetral Profesional.</p><p className="mt-2 text-gray-600">Soluciones para la seguridad y eficiencia en grandes proyectos, garantizando operaciones ordenadas, seguras y profesionales.</p></div></div></div><div className="mt-16"><h3 className="text-2xl font-semibold text-center text-gray-700">PASO 2: PROSYSTEM™, El Integrador de Soluciones</h3><p className="text-center text-gray-500 mt-2">La ingeniería de Kopruch aplicada a su negocio.</p><div className="mt-8 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200"><div className="text-center"><h4 className="font-bold text-3xl text-sub-prosystem">Kopruch PROSYSTEM™</h4><p className="mt-4 max-w-2xl mx-auto text-gray-600">PROSYSTEM™ es nuestra nueva división de soluciones integrales. Ya no es una categoría de producto, sino la marca que representa nuestra capacidad de combinar tecnologías de los tres pilares para resolver los desafíos específicos de cada industria, entregando un sistema a medida que garantiza el máximo rendimiento.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"><div className="bg-gray-50 p-6 rounded-lg"><p className="font-bold text-sub-prosystem">Ejemplo: PROSYSTEM™ Viticultura</p><p className="mt-2 text-sm text-gray-600">Un sistema que combina la <span className="font-semibold">Malla Antigranizo (CLIMACONTROL™)</span> con la <span className="font-semibold">Malla Anti-Pájaros (BIOSECURE™)</span> para una protección 360° del viñedo.</p></div><div className="bg-gray-50 p-6 rounded-lg"><p className="font-bold text-sub-prosystem">Ejemplo: PROSYSTEM™ Construcción</p><p className="mt-2 text-sm text-gray-600">Una solución que integra la <span className="font-semibold">Lona de Cerco</span> con <span className="font-semibold">Redes de Seguridad (INFRAPROTECT™)</span> para una obra segura y profesional de principio a fin.</p></div></div></div></div></section>

            <section className="my-24 section-fade-in"><h2 className="text-4xl font-bold text-center mb-4">La Tecnología que lo Hace Posible</h2><p className="text-center text-gray-600 mb-12">El "Kopruch Growth Engine, powered by Kapi": un sistema de cuatro fases que automatiza el ciclo de vida del cliente.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="bg-white rounded-xl shadow-md p-8"><span className="text-2xl font-bold text-kopruch-green">1</span><h4 className="font-bold text-xl mt-2">Captación Estratégica</h4><p className="mt-2 text-gray-600">Atraemos a cada tipo de cliente con campañas que comunican el valor de la submarca específica para su necesidad.</p></div><div className="bg-white rounded-xl shadow-md p-8"><span className="text-2xl font-bold text-kopruch-green">2</span><h4 className="font-bold text-xl mt-2">Gestión y Embudo</h4><p className="mt-2 text-gray-600">Los leads entran al Hub y se guían por un embudo de ventas claro y consistente para todo el equipo.</p></div><div className="bg-white rounded-xl shadow-md p-8"><span className="text-2xl font-bold text-kopruch-green">3</span><h4 className="font-bold text-xl mt-2">Supervisión Inteligente</h4><p className="mt-2 text-gray-600">El Dashboard permite supervisar el embudo en tiempo real para tomar decisiones basadas en datos.</p></div><div className="bg-white rounded-xl shadow-md p-8"><span className="text-2xl font-bold text-kopruch-green">4</span><h4 className="font-bold text-xl mt-2">Remarketing de Precisión</h4><p className="mt-2 text-gray-600">Basado en los datos del Hub, se crean audiencias para campañas de re-enganche y maximizar el ROI.</p></div></div></section>

            <section className="my-24 section-fade-in"><h2 className="text-4xl font-bold text-center mb-4">La Estrategia en Acción: Comunicación de Precisión</h2><p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Esta claridad estratégica nos permite crear mensajes de alta precisión para cada pilar y cada solución PROSYSTEM™. Así se traduce en contenido de alto impacto para redes sociales.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-sub-infraprotect"><p className="font-semibold text-sm text-gray-500">Ejemplo para LinkedIn (INFRAPROTECT™)</p><p className="mt-4 text-gray-700">"¿Su obra cumple con las normativas de seguridad? Una correcta contención no es un gasto, es una inversión en eficiencia. Conozca cómo INFRAPROTECT™ garantiza un perímetro seguro y profesional. #SeguridadEnObra"</p></div><div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-sub-biosecure"><p className="font-semibold text-sm text-gray-500">Ejemplo para Instagram (BIOSECURE™)</p><p className="mt-4 text-gray-700">"Menos pesticidas, más calidad. Nuestras barreras BIOSECURE™ crean un escudo físico contra plagas, garantizando una cosecha más limpia y certificable. ¡La agricultura del futuro es hoy! #AgriculturaSostenible"</p></div><div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-sub-climacontrol"><p className="font-semibold text-sm text-gray-500">Ejemplo para Facebook Ads (CLIMACONTROL™)</p><p className="mt-4 text-gray-700">"Una helada puede costarle el 100% de su cosecha. Protegerla cuesta mucho menos. Nuestras mallas anti-helada son la herramienta definitiva para asegurar la rentabilidad de cada hectárea. #Agro #ROI"</p></div><div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-sub-prosystem"><p className="font-semibold text-sm text-gray-500">Ejemplo para Facebook (PROSYSTEM™)</p><p className="mt-4 text-gray-700">"Caso de Éxito: Aumentamos el bienestar animal y la productividad. La correcta gestión del estrés calórico es clave. Con las cortinas de viento PROSYSTEM™ mejoramos la salud y el rendimiento del ganado. #Ganadería"</p></div></div></section>

            <section className="my-24 section-fade-in"><div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200"><h2 className="text-3xl font-bold text-center mb-8">Hoja de Ruta Propuesta</h2><div className="relative"><div className="absolute left-1/2 h-full w-0.5 bg-gray-200" style={{ transform: 'translateX(-50%)' }}></div><div className="space-y-12"><div className="flex items-center"><div className="w-1/2 pr-8 text-right"><p className="font-bold text-lg text-kopruch-green">Q4 2025</p><p className="text-gray-600">Fundación y Configuración</p></div><div className="w-10 h-10 bg-kopruch-green rounded-full z-10 flex items-center justify-center text-white font-bold">1</div><div className="w-1/2 pl-8"><p className="text-gray-600">Kick-off del proyecto, implementación y configuración de la plataforma base.</p></div></div><div className="flex items-center"><div className="w-1/2 pr-8 text-right"><p className="font-bold text-lg text-kopruch-green">Q1 2026</p><p className="text-gray-600">Lanzamiento y Activación</p></div><div className="w-10 h-10 bg-kopruch-green rounded-full z-10 flex items-center justify-center text-white font-bold">2</div><div className="w-1/2 pl-8"><p className="text-gray-600">Onboarding del equipo de ventas y activación de las primeras campañas de captación.</p></div></div><div className="flex items-center"><div className="w-1/2 pr-8 text-right"><p className="font-bold text-lg text-kopruch-green">Q2 2026</p><p className="text-gray-600">Optimización y Análisis</p></div><div className="w-10 h-10 bg-kopruch-green rounded-full z-10 flex items-center justify-center text-white font-bold">3</div><div className="w-1/2 pl-8"><p className="text-gray-600">Primera fase de optimización basada en datos y análisis de resultados iniciales.</p></div></div></div></div></div></section>

            <section className="text-center mt-24 section-fade-in"><h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">El plan está definido.</h2><p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">Hemos presentado la estrategia, la arquitectura 3+1 y la hoja de ruta. Solo necesitamos su aprobación para comenzar a construir el futuro de Kopruch.</p>{!isPdfView && <button onClick={() => setIsModalOpen(true)} className="mt-10 inline-block bg-kopruch-green text-white font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">Agendar Reunión de Implementación</button>}<p className="mt-16 text-sm text-gray-500">Presentado el 26 de septiembre de 2025</p><p className="mt-4 text-sm text-gray-500">Un proyecto diseñado e implementado por</p><p className="mt-2 text-2xl font-bold tracking-widest text-gray-800">KΛPI</p></section>
        </main>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative border border-gray-700">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-3xl font-bold">&times;</button>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Contactar para Implementación</h3>
                    <Suspense fallback={<div>Cargando formulario...</div>}>
                        <ContactForm />
                    </Suspense>
                </div>
            </div>
        )}
    </div>
  );
}

const KopruchProposalPage = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <KopruchProposalContent />
  </Suspense>
);

export default KopruchProposalPage;
