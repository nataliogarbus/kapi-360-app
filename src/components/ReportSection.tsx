import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Target, Users, Zap } from 'lucide-react';

// --- INTERFACES DE DATOS v7.1 ---
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

// --- COMPONENTES DE UI v9.0 (Estilo PageSpeed) ---

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg pointer-events-none">
      {text}
    </div>
  </div>
);

const ScoreGauge: React.FC<{ score: number; marks?: CoordenadaClave[]; size?: number }> = ({ score, marks = [], size = 120 }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 40) return '#f87171'; // red-400
    if (s < 70) return '#facc15'; // yellow-400
    return '#22d3ee'; // cyan-400
  };

  const mainColor = getColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle className="text-slate-700" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
        
        {/* Foreground circle */}
        <motion.circle
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeLinecap="round"
          stroke={mainColor}
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Marks for sub-scores */}
        {marks.map((mark, i) => {
          const markAngle = (mark.score / 100) * 360 - 90;
          const markX = 60 + radius * Math.cos(markAngle * Math.PI / 180);
          const markY = 60 + radius * Math.sin(markAngle * Math.PI / 180);
          return (
            <Tooltip key={i} text={`${mark.titulo}: ${mark.score}`}>
              <circle cx={markX} cy={markY} r="5" fill={getColor(mark.score)} className="cursor-pointer" />
            </Tooltip>
          );
        })}

        {/* Text in the middle */}
        <text x="50%" y="50%" dy=".3em" textAnchor="middle" className="text-3xl font-bold" fill={mainColor}>
          {score}
        </text>
      </svg>
    </div>
  );
};

const AccionAccordion: React.FC<{ titulo: string; pasos: string[]; icon: React.ReactNode }> = ({ titulo, pasos, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!pasos || pasos.length === 0) return null;

  return (
    <div className="bg-slate-900/70 rounded-md mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 hover:bg-slate-800/60 transition-colors">
        <div className="flex items-center">
            {icon}
            <span className="font-bold text-white ml-3">{titulo}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} className="text-slate-400" /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <ul className="list-disc list-inside p-4 pl-6 text-slate-300 text-sm space-y-2">
              {pasos.map((paso, i) => <li key={i}>{paso}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PilarPlanDeAccion: React.FC<{ plan: PlanDeAccion }> = ({ plan }) => (
    <div className="mt-6">
        <h4 className="text-lg font-bold text-white mb-4">Plan de Acción</h4>
        <AccionAccordion titulo="Lo Hago Yo" pasos={plan.loHagoYo} icon={<Target className="text-cyan-400" />} />
        <AccionAccordion titulo="Lo Hace Kapi con mi Equipo" pasos={plan.loHaceKapiConMiEquipo} icon={<Users className="text-cyan-400" />} />
        <AccionAccordion titulo="Lo Hace Kapi" pasos={plan.loHaceKapi} icon={<Zap className="text-cyan-400" />} />
    </div>
);

const PilarAccordion: React.FC<{ pilar: Pilar }> = ({ pilar }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-slate-800 rounded-xl mb-6 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full p-5 flex justify-between items-center text-left">
        <div className="flex-1">
            <h3 className="text-2xl font-bold text-white flex items-center">
              {pilar.titulo}
              <Tooltip text={pilar.porQueImporta}><HelpCircle size={16} className="text-gray-400 cursor-pointer ml-2" /></Tooltip>
            </h3>
            <p className="text-slate-400 text-sm mt-1">{pilar.queEs}</p>
        </div>
        <div className="ml-4">
            <ScoreGauge score={pilar.score} marks={pilar.coordenadasClave} size={100} />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="ml-4 p-2 rounded-full hover:bg-slate-700">
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={28} className="text-white" /></motion.div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-slate-800">
              {pilar.planDeAccion && <PilarPlanDeAccion plan={pilar.planDeAccion} />}
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
          <div className="h-24 bg-slate-800 rounded-xl mb-4"></div>
          <div className="h-48 bg-slate-800 rounded-xl mb-4"></div>
          <div className="h-48 bg-slate-800 rounded-xl mb-4"></div>
        </div>
      </section>
    );
  }

  if (!report || !report.pilares || report.pilares.length === 0) {
    return null;
  }

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">Informe Estratégico</h2>
        <p className="text-slate-400 mb-6">Puntaje General de Madurez Digital</p>
        <ScoreGauge score={report.puntajeGeneral} size={160} />
      </div>

      {report.pilares.map((pilar) => (
        <PilarAccordion key={pilar.id} pilar={pilar} />
      ))}

    </section>
  );
};

export default ReportSection;
