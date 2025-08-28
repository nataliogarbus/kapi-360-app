import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Target, Users, Zap } from 'lucide-react';

// --- INTERFACES DE DATOS v7.4 ---
type CoordenadaClave = {
  titulo: string;
  score: number;
};

type PlanDeAccion = {
  loHagoYo: string[];
  loHaceKapiConMiEquipo: string[];
  loHaceKapi: string[];
};

type Pilar = {
  id: string;
  titulo: string;
  score: number;
  queEs: string;
  porQueImporta: string;
  coordenadasClave: CoordenadaClave[];
  planDeAccion: PlanDeAccion;
};

type Reporte = {
  puntajeGeneral: number;
  pilares: Pilar[];
};

interface ReportSectionProps {
  report: Reporte | null;
  isLoading: boolean;
}

// --- COMPONENTES DE UI v12.0 (Diseño Final Pulido v2) ---

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg pointer-events-none">
      {text}
    </div>
  </div>
);

const getPathColor = (score: number) => {
  if (score < 40) return '#f87171'; // text-red-400
  if (score < 70) return '#facc15'; // text-yellow-400
  return '#22d3ee'; // text-cyan-400
};

const ScoreGauge: React.FC<{ score: number; size?: number }> = ({ score, size = 160 }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getPathColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
        <circle className="text-slate-700" strokeWidth="12" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
        <motion.circle
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
      </div>
    </div>
  );
};

const AccionAccordion: React.FC<{ titulo: string; pasos: string[]; icon: React.ReactNode; isInitiallyOpen?: boolean; }> = ({ titulo, pasos, icon, isInitiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  if (!pasos || pasos.length === 0) return null;

  return (
    <div className="bg-slate-900/70 rounded-lg mb-4 border border-slate-700/50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 hover:bg-slate-800/60 transition-colors">
        <div className="flex items-center">
            {icon}
            <span className="font-bold text-white ml-3 text-lg">{titulo}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={24} className="text-slate-400" /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-4 border-t border-slate-800">
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
                {pasos.map((paso, i) => <li key={i}>{paso}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <section className="mt-10 w-full max-w-4xl mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-40 bg-slate-800 rounded-full mx-auto w-40 mb-8"></div>
          <div className="h-10 bg-slate-800 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-48 bg-slate-800 rounded-lg mt-8"></div>
        </div>
      </section>
    );
  }

  if (!report || !report.pilares || report.pilares.length === 0) {
    return null;
  }

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white text-center">Informe Estratégico</h2>
      <p className="text-slate-400 mb-6 text-center">Puntaje General de Madurez Digital</p>
      <ScoreGauge score={report.puntajeGeneral} />
      <p className="text-center text-slate-400 mt-6 max-w-2xl">
        Este es el resumen de tu presencia digital. Cada color en la rueda representa un pilar clave de tu negocio. Pasa el cursor sobre ellos para ver su puntaje y expande el plan de acción para descubrir los siguientes pasos.
      </p>
      
      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-2xl font-bold text-white text-center mb-6">Plan de Acción Recomendado</h3>
        <AccionAccordion 
          titulo="Lo Hace Kapi"
          pasos={report.pilares.flatMap(p => p.planDeAccion.loHaceKapi)}
          icon={<Zap className="text-cyan-400" />}
          isInitiallyOpen={true}
        />
        <AccionAccordion 
          titulo="Lo Hace Kapi con mi Equipo"
          pasos={report.pilares.flatMap(p => p.planDeAccion.loHaceKapiConMiEquipo)}
          icon={<Users className="text-cyan-400" />}
        />
        <AccionAccordion 
          titulo="Lo Hago Yo"
          pasos={report.pilares.flatMap(p => p.planDeAccion.loHagoYo)}
          icon={<Target className="text-cyan-400" />}
        />
      </div>
    </section>
  );
};

export default ReportSection;