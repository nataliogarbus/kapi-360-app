'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import DiagnosticForm from "@/components/KapiDiagnosticForm";
import ReportSection from "@/components/ReportSection";
import { REPORT_STRUCTURE } from '@/app/report-structure';
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ComoFunciona from "@/components/ComoFunciona";
import Servicios from "@/components/Servicios";
import CasosExito from "@/components/CasosExito";
import NewsletterSection from "@/components/NewsletterSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";

interface Reporte {
  puntajeGeneral: number;
  pilares: any[];
}

// --- FUNCIÓN DE FUSIÓN Y VALIDACIÓN (CORREGIDA SEGÚN ANÁLISIS) ---
const mergeWithStructure = (aiResponse: any): Reporte => {
  // Si la respuesta de la IA es inválida o no tiene pilares, devolvemos una estructura por defecto.
  if (!aiResponse || !Array.isArray(aiResponse.pilares)) {
    console.warn("Respuesta de la IA inválida o sin pilares. Usando estructura por defecto.");
    return {
        puntajeGeneral: 0,
        pilares: REPORT_STRUCTURE.pilares.map(pilarTemplate => ({
            ...pilarTemplate,
            score: 0,
            queEs: "Información no disponible.",
            porQueImporta: "Información no disponible.",
            coordenadas: pilarTemplate.coordenadas.map(coordTemplate => ({
                ...coordTemplate,
                score: 0,
                diagnostico: "Análisis no disponible.",
                planDeAccion: [],
            }))
        }))
    };
  }

  const finalReport: Reporte = {
    puntajeGeneral: aiResponse.puntajeGeneral || 0,
    pilares: REPORT_STRUCTURE.pilares.map(pilarTemplate => {
      const aiPilar = aiResponse.pilares.find((p: any) => p.id === pilarTemplate.id || p.titulo === pilarTemplate.titulo);

      // Fusión explícita y segura para el pilar
      const pilarResult = {
        ...pilarTemplate,
        score: 0,
        queEs: "Información no proporcionada.",
        porQueImporta: "Información no proporcionada.",
        ...aiPilar, // El pilar de la IA sobreescribe los defaults si existe
        coordenadas: pilarTemplate.coordenadas.map(coordTemplate => {
          const aiCoordenada = aiPilar?.coordenadas?.find((c: any) => c.id === coordTemplate.id || c.titulo === coordTemplate.titulo);
          
          // Patrón de fusión corregido para la coordenada
          return {
            ...coordTemplate,
            score: 0,
            diagnostico: "Análisis no disponible.",
            planDeAccion: [],
            ...aiCoordenada, // La coordenada de la IA sobreescribe los defaults si existe
          };
        })
      };
      return pilarResult;
    })
  };

  // El filtro redundante ha sido eliminado.

  return finalReport;
}

const LoadingState = () => ( <div className="text-center my-10"> <p className="text-white text-xl mb-4">Nuestros agentes IA están analizando la información...</p> <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div> </div> );

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Reporte | null>(null);
  const [currentMode, setCurrentMode] = useState('auto');

  useEffect(() => {
    setReport(null);
  }, [currentMode]);

  const handleDiagnose = async (url: string, mode: string, context?: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, mode, context }),
      });

      const result = await response.json();

      if (!response.ok) { throw new Error(result.error || 'Error del servidor'); }

      const finalReportObject = mergeWithStructure(result.analysis);
      setReport(finalReportObject);

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al generar el informe.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <Header />
      {report && !isLoading ? (
        <ReportSection report={report} isLoading={isLoading} />
      ) : (
        <>
          <HeroSection />
          {isLoading ? <LoadingState /> : <DiagnosticForm onSubmit={handleDiagnose} isLoading={isLoading} onModeChange={setCurrentMode} />}
          {error && (
            <div className="mt-6 w-full max-w-3xl">
              <div className="p-4 text-red-400 bg-red-900/20 border border-red-600 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}
          <ComoFunciona />
          <Servicios />
          <CasosExito />
          <Faq />
          <NewsletterSection />
          <ContactForm />
        </>
      )}
      <Footer />
    </main>
  );
}