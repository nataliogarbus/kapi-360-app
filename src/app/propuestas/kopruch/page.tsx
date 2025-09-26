/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import KapiDiagnosticForm from '@/components/KapiDiagnosticForm';
import ReportSection from '@/components/ReportSection';
import { Reporte } from '@/app/types';

// Mock Data para la simulación
const mockReport: Reporte = {
  puntajeGeneral: 82,
  pilares: [
    {
      id: 'mercado',
      titulo: 'Mercado y Competencia',
      score: 75,
      queEs: 'Análisis del posicionamiento de Kopruch frente a sus competidores directos e indirectos en el sector agroindustrial y de construcción.',
      porQueImporta: 'Entender el panorama competitivo permite identificar oportunidades de diferenciación y anticipar movimientos del mercado.',
      coordenadasClave: [
        { titulo: 'Cuota de Mercado Digital', score: 68 },
        { titulo: 'Análisis de Precios', score: 72 },
        { titulo: 'Diferenciación de Producto', score: 85 },
        { titulo: 'Presencia en Redes (Sector)', score: 70 },
      ],
      planDeAccion: {
        loHagoYo: ['Revisar informes de la competencia trimestralmente.', 'Capacitar al equipo de ventas con los nuevos diferenciadores.'],
        loHaceKapiConMiEquipo: ['Crear un dashboard de seguimiento de menciones de marca vs. competidores.', 'Realizar un estudio de mercado anual para identificar nuevas tendencias.'],
        loHaceKapi: ['Implementar un sistema de alerta temprana para movimientos de la competencia.', 'Generar informes de inteligencia competitiva automatizados.'],
      },
    },
    {
      id: 'plataforma',
      titulo: 'Plataforma y UX',
      score: 88,
      queEs: 'Evaluación de la experiencia de usuario, la arquitectura de la información y la facilidad de uso del sitio web actual de Kopruch.',
      porQueImporta: 'Un sitio web intuitivo y rápido convierte visitantes en clientes. Es la principal carta de presentación digital de la empresa.',
      coordenadasClave: [
        { titulo: 'Velocidad de Carga (WPO)', score: 92 },
        { titulo: 'Navegación Intuitiva', score: 85 },
        { titulo: 'Adaptabilidad Móvil', score: 95 },
        { titulo: 'Claridad del Catálogo', score: 80 },
      ],
      planDeAccion: {
        loHagoYo: ['Actualizar las imágenes de productos según el nuevo catálogo.', 'Revisar y corregir errores 404 mensualmente.'],
        loHaceKapiConMiEquipo: ['Rediseñar las fichas de producto para incluir casos de uso.', 'Implementar un mapa de calor para analizar el comportamiento del usuario.'],
        loHaceKapi: ['Optimizar el rendimiento del servidor para reducir el tiempo de carga en 500ms.', 'Realizar test A/B en los llamados a la acción principales.'],
      },
    },
  ],
};

const KopruchProposalContent = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isPdfView = view === 'pdf';

  const [simulationStarted, setSimulationStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleStartSimulation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSimulationStarted(true);
    }, 1500);
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urlToPrint: window.location.href }),
      });

      if (!response.ok) {
        throw new Error('Error al generar el PDF');
      }

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
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.section-fade-in');
    sections.forEach(section => { observer.observe(section); });

    return () => { sections.forEach(section => { observer.unobserve(section); }); };
  }, [isPdfView]);

  const StaticTechSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-8">
            <span className="text-2xl font-bold text-kopruch-green">1</span>
            <h4 className="font-bold text-xl mt-2">Captación Estratégica</h4>
            <p className="mt-2 text-gray-600">Atraemos a cada tipo de cliente con campañas que comunican el valor de la submarca específica para su necesidad.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8">
            <span className="text-2xl font-bold text-kopruch-green">2</span>
            <h4 className="font-bold text-xl mt-2">Gestión y Embudo</h4>
            <p className="mt-2 text-gray-600">Los leads entran al Hub y se guían por un embudo de ventas claro y consistente para todo el equipo.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8">
            <span className="text-2xl font-bold text-kopruch-green">3</span>
            <h4 className="font-bold text-xl mt-2">Supervisión Inteligente</h4>
            <p className="mt-2 text-gray-600">El Dashboard permite supervisar el embudo en tiempo real para tomar decisiones basadas en datos.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8">
            <span className="text-2xl font-bold text-kopruch-green">4</span>
            <h4 className="font-bold text-xl mt-2">Remarketing de Precisión</h4>
            <p className="mt-2 text-gray-600">Basado en los datos del Hub, se crean audiencias para campañas de re-enganche y maximizar el ROI.</p>
        </div>
    </div>
  );

  return (
    <div className={`bg-gray-50 text-gray-800 antialiased ${isPdfView ? 'pdf-view' : ''}`}>
        <main className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-20">
            
            {/* SECCIÓN 0: CABECERA */}
            <section className="text-center mb-24 section-fade-in">
                <div className="flex justify-center items-center mb-6 text-kopruch-green">
                    <svg className="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    <span className="text-4xl font-bold tracking-wider">KOPRUCH</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-kopruch-green tracking-tight">Proyecto Visión Kopruch</h1>
                <h2 className="text-xl md:text-2xl mt-4 text-gray-600">La Evolución a un Sistema de Soluciones Integrales.</h2>
                <p className="mt-6 text-sm font-semibold tracking-widest text-gray-400 uppercase">3 Pilares de Producto • 1 Integrador de Soluciones • Motor de Crecimiento Inteligente</p>
                {!isPdfView && (
                    <button onClick={handleDownloadPdf} disabled={isDownloadingPdf} className="mt-8 inline-block bg-gray-700 text-white font-bold text-sm px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition-all disabled:bg-gray-400">
                        {isDownloadingPdf ? 'Generando PDF...' : 'Descargar Propuesta en PDF'}
                    </button>
                )}
            </section>

            {/* SECCIÓN 1: EL DESAFÍO */}
            <section className="mb-24 section-fade-in">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
                    <h2 className="text-3xl font-bold text-center mb-2">El Desafío: Unificar para Crecer</h2>
                    <p className="text-center text-gray-600 mb-8">El crecimiento sostenible requiere una visión 360° del negocio. Identificamos oportunidades clave para transformar los desafíos actuales en ventajas competitivas:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-gray-50 p-6 rounded-lg"><p className="font-semibold text-lg">Dejar atrás los datos descentralizados.</p></div>
                        <div className="bg-gray-50 p-6 rounded-lg"><p className="font-semibold text-lg">Obtener visibilidad total sobre el ROI.</p></div>
                        <div className="bg-gray-50 p-6 rounded-lg"><p className="font-semibold text-lg">Evolucionar de producto a solución experta.</p></div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 2: NUESTRA ESTRATEGIA 3+1 */}
            <section className="mb-24 section-fade-in">
                <h2 className="text-4xl font-bold text-center">Nuestra Estrategia: El Modelo 3+1</h2>
                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-center text-gray-700">PASO 1: Los Pilares de la Excelencia Técnica</h3>
                    <p className="text-center text-gray-500 mt-2">Tres divisiones de producto, líderes en su categoría.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-sub-climacontrol"><h4 className="font-bold text-xl text-sub-climacontrol">Kopruch CLIMACONTROL™</h4><p className="mt-2 text-sm"><strong>Promesa:</strong> Protección Climática Garantizada.</p><p className="mt-2 text-gray-600">Creamos microclimas optimizados para proteger cultivos de alto valor contra eventos extremos, asegurando la rentabilidad de cada cosecha.</p></div>
                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-sub-biosecure"><h4 className="font-bold text-xl text-sub-biosecure">Kopruch BIOSECURE™</h4><p className="mt-2 text-sm"><strong>Promesa:</strong> Barrera Biológica Activa.</p><p className="mt-2 text-gray-600">El escudo biológico de alta precisión. Aislamos los cultivos de plagas, reduciendo la necesidad de pesticidas para un producto final más limpio.</p></div>
                        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-sub-infraprotect"><h4 className="font-bold text-xl text-sub-infraprotect">Kopruch INFRAPROTECT™</h4><p className="mt-2 text-sm"><strong>Promesa:</strong> Contención Perimetral Profesional.</p><p className="mt-2 text-gray-600">Soluciones para la seguridad y eficiencia en grandes proyectos, garantizando operaciones ordenadas, seguras y profesionales.</p></div>
                    </div>
                </div>
                <div className="mt-16">
                    <h3 className="text-2xl font-semibold text-center text-gray-700">PASO 2: PROSYSTEM™, El Integrador de Soluciones</h3>
                    <p className="text-center text-gray-500 mt-2">La ingeniería de Kopruch aplicada a su negocio.</p>
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
                        <div className="text-center"><h4 className="font-bold text-3xl text-sub-prosystem">Kopruch PROSYSTEM™</h4><p className="mt-4 max-w-2xl mx-auto text-gray-600">PROSYSTEM™ es nuestra nueva división de soluciones integrales...</p></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-gray-50 p-6 rounded-lg"><p className="font-bold text-sub-prosystem">Ejemplo: PROSYSTEM™ Viticultura</p><p className="mt-2 text-sm text-gray-600">Un sistema que combina la <span className="font-semibold">Malla Antigranizo (CLIMACONTROL™)</span> con la <span className="font-semibold">Malla Anti-Pájaros (BIOSECURE™)</span> para una protección 360° del viñedo.</p></div>
                            <div className="bg-gray-50 p-6 rounded-lg"><p className="font-bold text-sub-prosystem">Ejemplo: PROSYSTEM™ Construcción</p><p className="mt-2 text-sm text-gray-600">Una solución que integra la <span className="font-semibold">Lona de Cerco</span> con <span className="font-semibold">Redes de Seguridad (INFRAPROTECT™)</span> para una obra segura y profesional de principio a fin.</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: LA TECNOLOGÍA */}
            <section className="my-24 section-fade-in">
                <h2 className="text-4xl font-bold text-center mb-4">La Tecnología que lo Hace Posible</h2>
                <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">El "Kopruch Growth Engine, powered by Kapi": un sistema que automatiza el ciclo de vida del cliente. <br/>{!isPdfView && <strong>Haga clic en "Iniciar Simulación" para verlo en acción.</strong>}</p>
                <div className="w-full max-w-4xl mx-auto">
                    {isPdfView ? <StaticTechSection /> : (
                        !simulationStarted ? (
                            <div className="w-full flex flex-col items-center">
                                {isLoading ? (
                                    <div className="text-center my-10 py-10"><p className="text-gray-800 text-xl mb-4">Preparando simulación...</p><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kopruch-green mx-auto"></div></div>
                                ) : (
                                    <KapiDiagnosticForm onSubmit={handleStartSimulation} isLoading={isLoading} onModeChange={() => {}} submitButtonText="Iniciar Simulación" showUrlInput={false} />
                                )}
                            </div>
                        ) : (
                            <ReportSection report={mockReport} isLoading={false} />
                        )
                    )}
                </div>
            </section>

            {/* SECCIÓN 4: ESTRATEGIA EN ACCIÓN */}
            <section className="my-24 section-fade-in">...</section>

            {/* SECCIÓN 5: HOJA DE RUTA Y CIERRE */}
            <section className="my-24 section-fade-in">...</section>

            {/* SECCIÓN 6: CIERRE FINAL */}
            <section className="text-center mt-24 section-fade-in">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">El plan está definido.</h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">Hemos presentado la estrategia, la arquitectura 3+1 y la hoja de ruta...</p>
                {!isPdfView && (
                    <a href="#contact" className="mt-10 inline-block bg-kopruch-green text-white font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                        Agendar Reunión de Implementación
                    </a>
                )}
                <p className="mt-16 text-sm text-gray-500">Presentado el 26 de septiembre de 2025</p>
                <p className="mt-4 text-sm text-gray-500">Un proyecto diseñado e implementado por</p>
                <p className="mt-2 text-2xl font-bold tracking-widest text-gray-800">KΛPI</p>
            </section>
        </main>
    </div>
  );
}

const KopruchProposalPage = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <KopruchProposalContent />
  </Suspense>
);

export default KopruchProposalPage;
