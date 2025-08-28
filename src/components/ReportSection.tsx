import React from 'react';
import { motion } from 'framer-motion';
import { ReportSectionProps } from '@/app/types';
import PillarsDonutChart from './PillarsDonutChart';
import PilarCard from './PilarCard';

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
  console.log("--- RENDERING [ReportSection] ---");
  if (isLoading) {
    return (
      <section className="mt-10 w-full max-w-5xl mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-64 w-64 bg-slate-800 rounded-full mx-auto mb-8"></div>
          <div className="h-10 bg-slate-800 rounded-lg w-3/4 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 gap-4 mb-12">
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!report || !report.pilares || report.pilares.length === 0) {
    return null;
  }

  return (
    <motion.section 
      id="report-section" 
      className="mt-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
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
  );
};

export default ReportSection;
