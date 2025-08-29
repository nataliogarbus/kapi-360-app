'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import KapiDiagnosticForm from "@/components/KapiDiagnosticForm";
import ReportSection from "@/components/ReportSection";
import Footer from "@/components/Footer";
import { Reporte } from '@/app/types';
import { mergeWithStructure } from '@/lib/report-merger';

const LoadingState = () => ( <div className="text-center my-10"> <p className="text-white text-xl mb-4">Nuestros agentes IA están analizando la información...</p> <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div> </div> );

export default function DiagnosticoPage() {
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
      <div className="w-full max-w-4xl mx-auto text-center mt-24 py-12">
        { !report && (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Diagnóstico Digital 360° con IA</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Obtenga un primer análisis automatizado de su presencia online. Nuestra IA revisará más de 50 variables de su sitio web y el de sus competidores para darle un informe ejecutivo instantáneo. Este es el punto de partida que usamos en nuestras consultorías estratégicas.</p>
          </>
        )}
      </div>

      {report && !isLoading ? (
        <ReportSection report={report} isLoading={isLoading} />
      ) : (
        <>
          {isLoading ? <LoadingState /> : <KapiDiagnosticForm onSubmit={handleDiagnose} isLoading={isLoading} onModeChange={setCurrentMode} />}
          {error && (
            <div className="mt-6 w-full max-w-3xl">
              <div className="p-4 text-red-400 bg-red-900/20 border border-red-600 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </main>
  );
}
