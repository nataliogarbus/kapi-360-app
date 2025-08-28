'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import DiagnosticForm from "@/components/KapiDiagnosticForm";
import ReportSection from "@/components/ReportSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ComoFunciona from "@/components/ComoFunciona";
import Servicios from "@/components/Servicios";
import CasosExito from "@/components/CasosExito";
import NewsletterSection from "@/components/NewsletterSection";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { Reporte } from '@/app/types';
import { mergeWithStructure } from '@/lib/report-merger';

const LoadingState = () => ( <div className="text-center my-10"> <p className="text-white text-xl mb-4">Nuestros agentes IA están analizando la información...</p> <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div> </div> );

export default function Home() {
  console.log("--- RENDERING [Home Page] ---");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Reporte | null>(null);
  const [currentMode, setCurrentMode] = useState('auto');

  useEffect(() => {
    setReport(null);
  }, [currentMode]);

  const handleDiagnose = async (url: string, mode: string, context: string | undefined, recaptchaToken: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, mode, context, recaptchaToken }),
      });

      const result = await response.json();

      if (!response.ok) { throw new Error(result.error || 'Error del servidor'); }

      const finalReportObject = mergeWithStructure(result.analysis);
      
      // --- PUNTO DE CONTROL PARA DEBUG ---
      console.log("DEBUG: Objeto de informe final antes de renderizar:", finalReportObject);

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