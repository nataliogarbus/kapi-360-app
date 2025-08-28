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
        if (!response.ok) {
            // If the server fails, we go to error state and stop.
            setSubmissionStatus('error');
            return;
        }
    } catch (error) {
        console.error("Error al registrar el lead:", error);
        setSubmissionStatus('error');
        return; // Stop execution if lead registration fails
    }

    // If lead registration is successful, move to generating state
    setSubmissionStatus('generating');

    const reportElement = document.getElementById('report-section-to-download');
    if (!reportElement) {
        console.error("Elemento del informe no encontrado");
        setSubmissionStatus('error');
        return;
    }

    try {
        const canvas = await html2canvas(reportElement, { scale: 2, backgroundColor: '#1a1a1a', useCORS: true });
        const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const aspectRatio = canvasWidth / canvasHeight;
        const pdfHeight = pdfWidth / aspectRatio;

        const logoImg = new Image();
        logoImg.src = '/logo-kapi-verde.svg';
        
        // Use a promise to handle image loading
        await new Promise<void>(resolve => {
            logoImg.onload = () => {
                pdf.addImage(logoImg, 'SVG', 20, 20, 80, 20);
                pdf.addImage(canvas, 'PNG', 0, 60, pdfWidth, pdfHeight);
                pdf.save(`Informe_Kapi360_${new Date().toISOString().split('T')[0]}.pdf`);
                setSubmissionStatus('idle');
                setIsModalOpen(false);
                resolve();
            };
            logoImg.onerror = () => {
                console.error("No se pudo cargar el logo para el PDF.");
                // Still try to generate the PDF without the logo
                pdf.addImage(canvas, 'PNG', 0, 60, pdfWidth, pdfHeight);
                pdf.save(`Informe_Kapi360_${new Date().toISOString().split('T')[0]}.pdf`);
                setSubmissionStatus('idle');
                setIsModalOpen(false);
                resolve();
            }
        });
    } catch (pdfError) {
        console.error("Error al generar el PDF:", pdfError);
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