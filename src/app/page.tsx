'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiagnosticForm from "@/components/DiagnosticForm";
import ReportSection from "@/components/ReportSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ComoFunciona from "@/components/ComoFunciona";
import Servicios from "@/components/Servicios";
import CasosExito from "@/components/CasosExito";
import NewsletterSection from "@/components/NewsletterSection";
import ContactForm from "@/components/ContactForm";

// Un componente simple para el estado de carga
const LoadingState = () => (
  <div className="text-center my-10">
    <p className="text-white text-xl mb-4">Nuestros agentes IA están analizando la información. Esto puede tardar hasta 90 segundos.</p>
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any | null>(null);

  // Actualizado para aceptar el `context` del formulario
  const handleDiagnose = async (url: string, mode: string, context?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, mode, context }), // Pasamos el contexto a la API
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error del servidor');
      }

      setReport(result.analysis);

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al generar el informe. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <Header />

      {report && !isLoading ? (
        // VISTA DE REPORTE ("Mesa de Estrategia")
        <ReportSection report={report} />
      ) : (
        // VISTA DE LOBBY (Formulario y contenido de la página)
        <>
          <HeroSection />

          {isLoading ? (
            <LoadingState />
          ) : (
            <DiagnosticForm onSubmit={handleDiagnose} isLoading={isLoading} />
          )}

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
