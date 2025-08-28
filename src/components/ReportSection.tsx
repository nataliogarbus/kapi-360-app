import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReportSectionProps } from '@/app/types';
import PillarsDonutChart from './PillarsDonutChart';
import PilarCard from './PilarCard';
import DownloadModal from './DownloadModal';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// ... (variants sin cambios)

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'generating' | 'error'>('idle');

  const handleConfirmDownload = async (email: string, subscribe: boolean) => {
    setSubmissionStatus('submitting');
    try {
      console.log("Paso 1: Registrando el lead...");
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          newsletter: subscribe, 
          name: `Lead de Informe PDF (${email})`, 
          message: 'Solicitud de descarga de informe PDF.' 
        }),
      });
      if (!response.ok) throw new Error('El servidor de correo falló.');
      console.log("Paso 1.1: Lead registrado con éxito.");
    } catch (error) {
      console.error("Error al registrar el lead:", error);
      setSubmissionStatus('error');
      return;
    }

    setSubmissionStatus('generating');
    console.log("Paso 2: Iniciando generación de PDF.");

    const reportElement = document.getElementById('report-section-to-download');
    if (!reportElement) {
      console.error("Elemento del informe no encontrado para generar el PDF.");
      setSubmissionStatus('error');
      return;
    }

    try {
      console.log("Paso 2.1: Generando canvas con html2canvas...");
      const canvas = await html2canvas(reportElement, { scale: 2, backgroundColor: '#1a1a1a', useCORS: true });
      console.log("Paso 2.2: Canvas generado con éxito.");

      const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const addContentAndSave = (logoImage: HTMLImageElement | null) => {
        if (logoImage) {
          console.log("Añadiendo logo al PDF.");
          pdf.addImage(logoImage, 'SVG', 20, 20, 80, 20);
        }
        pdf.addImage(canvas, 'PNG', 0, 60, pdfWidth, pdfHeight);
        pdf.save(`Informe_Kapi360_${new Date().toISOString().split('T')[0]}.pdf`);
        console.log("Paso 3: PDF guardado.");
        setSubmissionStatus('idle');
        setIsModalOpen(false);
      };

      const logoImg = new Image();
      logoImg.crossOrigin = "Anonymous";
      logoImg.src = '/logo-kapi-verde.svg';

      const imageLoadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        logoImg.onload = () => {
          console.log("Logo cargado exitosamente (onload).");
          resolve(logoImg);
        };
        logoImg.onerror = () => {
          console.error("Error al cargar el logo (onerror).");
          reject(new Error('Error de carga de imagen'));
        };
      });

      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => {
          console.warn("Timeout de 10s para cargar el logo. Se generará el PDF sin él.");
          resolve(null);
        }, 10000); // 10 segundos de timeout
      });

      const loadedImage = await Promise.race([imageLoadPromise, timeoutPromise]);
      addContentAndSave(loadedImage);

    } catch (pdfError) {
      console.error("Error durante la generación del PDF:", pdfError);
      setSubmissionStatus('error');
    }
  };

  // ... (código de loading sin cambios)

  if (!report) return null;

  return (
    <>
      <motion.section 
        id="report-section-to-download"
        className="mt-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center bg-[#1a1a1a] text-white"
        // ... (animaciones sin cambios)
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white text-center">Informe Estratégico</h2>
        <p className="text-slate-400 mb-6 text-center">Puntaje General de Madurez Digital</p>
        <div className="my-8">
          <PillarsDonutChart report={report} />
        </div>
        
        <p className="text-center text-slate-400 mt-8 max-w-2xl">
          Este es el resumen de tu presencia digital. El puntaje general se compone de cuatro pilares clave. Haz clic en cada uno para expandir y ver el detalle.
        </p>

        <motion.div 
          className="w-full flex flex-col items-center gap-4 my-12"
          // ... (animaciones sin cambios)
        >
          {report.pilares.map(pilar => (
            <motion.div key={pilar.id} /* ... */ className="w-full">
              <PilarCard pilar={pilar} />
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full my-10 print-hide">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-sm mx-auto bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors duration-300 text-lg"
          >
            <Download className="w-6 h-6 mr-3" />
            Descargar Informe en PDF
          </button>
        </div>

      </motion.section>

      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDownload} 
        status={submissionStatus}
      />
    </>
  );
};

export default ReportSection;