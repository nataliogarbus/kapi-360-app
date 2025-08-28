import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';
import { ReportSectionProps } from '@/app/types';
import { ScoreGauge } from './ScoreGauge';
import PilarCard from './PilarCard';

const ActionPlanCard: React.FC<{ titulo: string; pasos: string[]; icon: React.ReactNode }> = ({ titulo, pasos, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-full">
    <div className="flex items-center mb-4">
      {icon}
      <h4 className="font-bold text-lg text-white ml-3">{titulo}</h4>
    </div>
    <ul className="space-y-2 text-slate-300 text-sm">
      {pasos.length > 0 ? (
        pasos.map((paso, i) => <li key={i} className="flex items-start"><span className="text-cyan-400 mr-2 mt-1">-</span>{paso}</li>)
      ) : (
        <li className="text-slate-500">No hay acciones sugeridas en esta categoría.</li>
      )}
    </ul>
  </div>
);

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <section className="mt-10 w-full max-w-5xl mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-48 bg-slate-800 rounded-full mx-auto w-48 mb-8"></div>
          <div className="h-10 bg-slate-800 rounded-lg w-3/4 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 gap-4 mb-12">
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-xl w-full"></div>
          </div>
          <div className="h-64 bg-slate-800 rounded-xl"></div>
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
      <ScoreGauge score={report.puntajeGeneral} size="large" />
      
      <p className="text-center text-slate-400 mt-8 max-w-2xl">
        Este es el resumen de tu presencia digital. El puntaje general se compone de cuatro pilares clave. Haz clic en cada uno para expandir y ver el detalle.
      </p>

      <div className="w-full flex flex-col items-center gap-4 my-12">
        {report.pilares.map(pilar => (
          <PilarCard key={pilar.id} pilar={pilar} />
        ))}
      </div>

      <h3 className="text-2xl font-bold text-white text-center mb-6">Plan de Acción Recomendado</h3>
      <div className="w-full grid md:grid-cols-3 gap-6">
        <ActionPlanCard 
          titulo="Lo Hace Kapi"
          pasos={report.pilares.flatMap(p => p.planDeAccion.loHaceKapi)}
          icon={<Zap className="text-cyan-400" />}
        />
        <ActionPlanCard 
          titulo="Lo Hace Kapi con mi Equipo"
          pasos={report.pilares.flatMap(p => p.planDeAccion.loHaceKapiConMiEquipo)}
          icon={<Users className="text-cyan-400" />}
        />
        <ActionPlanCard 
          titulo="Lo Hago Yo"
          pasos={report.pilares.flatMap(p => p.planDeAccion.loHagoYo)}
          icon={<Target className="text-cyan-400" />}
        />
      </div>
    </motion.section>
  );
};

export default ReportSection;
