import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReportSectionProps } from '@/app/types';
import PillarsDonutChart from './PillarsDonutChart';
import PilarCard from './PilarCard';
import DownloadModal from './DownloadModal';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

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
      if (!response.ok) throw new Error('El servidor de correo falló.');
    } catch (error) {
      console.error("Error al registrar el lead:", error);
      setSubmissionStatus('error');
      return;
    }

    setSubmissionStatus('generating');
    // Select the wrapper div, not the motion section
    const reportElement = document.getElementById('report-content-wrapper');
    if (!reportElement) {
      console.error("Elemento del informe no encontrado para generar el PDF.");
      setSubmissionStatus('error');
      return;
    }

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        backgroundColor: '#1a1a1a',
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = imgWidth / pdfWidth;
      const scaledHeight = imgHeight / ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      // Add subsequent pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - scaledHeight; // Move the image up
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Informe_Kapi360_${new Date().toISOString().split('T')[0]}.pdf`);

      setSubmissionStatus('idle');
      setIsModalOpen(false);
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
        className="mt-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center bg-[#1a1a1a] text-white p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div id="report-content-wrapper" className="w-full flex flex-col items-center bg-[#1a1a1a] p-4">
          <Image src="/logo-kapi-verde.svg" alt="Kapi Logo" className="w-32 mb-8" width={128} height={32} />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white text-center">Informe Estratégico</h2>
          <p className="text-slate-400 mb-6 text-center">Puntaje General de Madurez Digital</p>
          <div className="my-8">
            <PillarsDonutChart report={report} />
          </div>

          <p className="text-center text-slate-400 mt-8 max-w-2xl">
            Este es el resumen de tu presencia digital. El puntaje general se compone de cuatro pilares clave. Haz clic en cada uno para expandir y ver el detalle.
          </p>

          <div className="w-full flex flex-col items-center gap-4 my-12">
            {report.pilares.map(pilar => (
              <div key={pilar.titulo} className="w-full">
                <PilarCard pilar={pilar} />
              </div>
            ))}
          </div>
        </div>

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