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

const LoadingState = () => (
  <div className="text-center my-10">
    <p className="text-white text-xl">Analizando...</p>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any | null>(null);

  const handleDiagnose = async (url: string, mode: string, context?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, mode, context }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Error del servidor');
      console.log("--- RAW API RESPONSE ---", result.analysis);
      setReport(result.analysis);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <Header />

      <h1 className="text-2xl font-bold my-4">Página de Depuración</h1>
      <p className="mb-4">Si ves esto y el formulario de abajo, la base está funcionando.</p>

      {/* Forzando el formulario para la depuración */}
      {isLoading ? <LoadingState /> : <DiagnosticForm onSubmit={handleDiagnose} isLoading={isLoading} />}
      
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {/* El resto de los componentes están desactivados temporalmente 
      <HeroSection />
      <ComoFunciona />
      <Servicios />
      <CasosExito />
      <Faq />
      <NewsletterSection />
      <ContactForm />
      */} 

      {/* La sección de reporte solo se mostrará si hay un reporte */}
      {report && !isLoading && <ReportSection report={report} isLoading={isLoading} />}

      <Footer />
    </main>
  );
}