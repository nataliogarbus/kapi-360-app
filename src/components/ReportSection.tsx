import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReportSectionProps } from '@/app/types';
import PillarsDonutChart from './PillarsDonutChart';
import PilarCard from './PilarCard';
import DownloadModal from './DownloadModal';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleConfirmDownload = async (email: string, subscribe: boolean) => {
    setIsGeneratingPdf(true);

    // 1. Capturar el lead
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          newsletter: subscribe,
          name: `Lead de Informe PDF (${email})`,
          message: 'Solicitud de descarga de informe PDF.'
        }),
      });
    } catch (error) {
      console.error("Error al registrar el lead:", error);
      // Opcional: mostrar un error al usuario, pero continuar con la descarga
    }

    // 2. Generar el PDF
    const reportElement = document.getElementById('report-section-to-download');
    if (reportElement) {
      try {
        const canvas = await html2canvas(reportElement, { 
          scale: 2, 
          backgroundColor: '#1a1a1a',
          useCORS: true,
        });
        
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'px',
          format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        const pdfAspectRatio = pdfWidth / pdfHeight;

        let finalCanvasWidth, finalCanvasHeight;

        if (canvasAspectRatio > pdfAspectRatio) {
            finalCanvasWidth = pdfWidth;
            finalCanvasHeight = pdfWidth / canvasAspectRatio;
        } else {
            finalCanvasHeight = pdfHeight;
            finalCanvasWidth = pdfHeight * canvasAspectRatio;
        }

        const logoImg = new Image();
        logoImg.src = '/logo-kapi-verde.svg';
        logoImg.onload = () => {
          pdf.addImage(logoImg, 'SVG', 20, 20, 80, 20); // Ajusta posición y tamaño
          pdf.addImage(canvas, 'PNG', 0, 60, finalCanvasWidth, finalCanvasHeight);
          pdf.save(`Informe_Kapi360_${new Date().toISOString().split('T')[0]}.pdf`);
          setIsGeneratingPdf(false);
          setIsModalOpen(false);
        };
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.");
        setIsGeneratingPdf(false);
      }
    } else {
        alert("No se pudo encontrar el contenido del informe para generar el PDF.");
        setIsGeneratingPdf(false);
    }
  };

  if (isLoading) {
    // ... (código de loading sin cambios)
  }

  if (!report || !report.pilares || report.pilares.length === 0) {
    return null;
  }

  return (
    <>
      <motion.section 
        id="report-section-to-download"
        className="mt-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center bg-[#1a1a1a] text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Contenido del informe sin cambios... */}
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white text-center">Informe Estratégico</h2>
        <p className="text-slate-400 mb-6 text-center">Puntaje General de Madurez Digital</p>
        <div className="my-8">
          <PillarsDonutChart report={report} />
        </div>
        
        <div className="w-full my-10 print-hide"> {/* Ocultar en impresión */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-sm mx-auto bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors duration-300 text-lg"
          >
            <Download className="w-6 h-6 mr-3" />
            Descargar Informe en PDF
          </button>
        </div>

        <p className="text-center text-slate-400 mt-8 max-w-2xl">
          Este es el resumen de tu presencia digital. El puntaje general se compone de cuatro pilares clave. Haz clic en cada uno para expandir y ver el detalle.
        </p>

        <motion.div 
          className="w-full flex flex-col items-center gap-4 my-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {report.pilares.map(pilar => (
            <motion.div key={pilar.id} variants={itemVariants} className="w-full">
              <PilarCard pilar={pilar} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDownload} 
      />
    </>
  );
};

export default ReportSection;
