'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from "@/components/Header";
import KapiDiagnosticForm from "@/components/KapiDiagnosticForm";
import ReportSection from "@/components/ReportSection";
import Footer from "@/components/Footer";
import { Reporte } from '@/app/types';
import { mergeWithStructure } from '@/lib/report-merger';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import ReportPillarsPreview from '@/components/ReportPillarsPreview';
import { ShieldCheck } from 'lucide-react';
import FeaturedPosts from '@/components/FeaturedPosts';
import ContactForm from '@/components/ContactForm';

const LoadingState = () => ( <div className="text-center my-20 py-20"> <p className="text-white text-xl mb-4">Nuestros agentes IA están analizando la información...</p> <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div> </div> );

export default function DiagnosticoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Reporte | null>(null);
  const [currentMode, setCurrentMode] = useState('auto');
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    setReport(null);
  }, [currentMode]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setFeaturedPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

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
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Obtenga un primer análisis automatizado de su presencia online. Nuestra IA revisará más de 100 variables de su sitio web y el de sus competidores para darle un informe ejecutivo instantáneo.</p>
          </>
        )}
      </div>

      {report && !isLoading ? (
        <ReportSection report={report} isLoading={isLoading} />
      ) : (
        <div className="w-full flex flex-col items-center">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="w-full flex flex-col items-center">
              
              <KapiDiagnosticForm onSubmit={handleDiagnose} isLoading={isLoading} onModeChange={setCurrentMode} />
              
              <div className="flex items-center text-gray-400 mt-8">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                <span>Tecnología Confiable. Respetamos su privacidad.</span>
              </div>

              <HowItWorksSteps />
              <ReportPillarsPreview />
              {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}
              <Suspense fallback={<div>Cargando formulario...</div>}>
                <ContactForm />
              </Suspense>

            </div>
          )}

          {error && (
            <div className="mt-6 w-full max-w-3xl">
              <div className="p-4 text-red-400 bg-red-900/20 border border-red-600 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  );
}
