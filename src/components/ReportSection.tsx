import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Target, Users, Zap } from 'lucide-react';

// --- INTERFACES DE DATOS v7.0 (v2.2) ---
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

// --- COMPONENTES DE UI v8.0 (v2.2) ---

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full mb-2 w-72 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg">
      {text}
    </div>
  </div>
);

const CoordenadaClaveGauge: React.FC<{ coordenada: CoordenadaClave }> = ({ coordenada }) => {
  const score = coordenada.score;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 40) return 'text-red-400';
    if (score < 70) return 'text-yellow-400';
    return 'text-cyan-400';
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            className="text-slate-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          {/* Foreground circle */}
          <motion.circle
            className={getColor()}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Text in the middle */}
          <text
            className={`text-3xl font-bold ${getColor()}`}
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
          >
            {score}
          </text>
        </svg>
      </div>
      <p className="text-slate-300 text-sm font-medium mt-3 h-10 flex items-center text-center">{coordenada.titulo}</p>
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
        <h4 className="text-lg font-bold text-white mb-4">Plan de Acción Unificado</h4>
        <AccionAccordion titulo="Lo Hago Yo" pasos={plan.loHagoYo} icon={<Target className="text-cyan-400" />} />
        <AccionAccordion titulo="Lo Hace Kapi con mi Equipo" pasos={plan.loHaceKapiConMiEquipo} icon={<Users className="text-cyan-400" />} />
        <AccionAccordion titulo="Lo Hace Kapi" pasos={plan.loHaceKapi} icon={<Zap className="text-cyan-400" />} />
    </div>
);

const PilarAccordion: React.FC<{ pilar: Pilar }> = ({ pilar }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-2 border-slate-800 rounded-xl mb-6 bg-slate-900/50 backdrop-blur-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-5 hover:bg-slate-800/60 transition-colors flex justify-between items-center text-left"
      >
        <h3 className="text-2xl font-bold text-white flex items-center">
          {pilar.titulo}
          {pilar.porQueImporta && <Tooltip text={pilar.porQueImporta}><HelpCircle size={16} className="text-gray-400 cursor-pointer ml-2" /></Tooltip>}
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-white">{pilar.score}/100</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={28} className="text-white" /></motion.div>
        </div>
      </button>
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
              {pilar.queEs && <div className="bg-gray-800/70 p-4 rounded-lg mb-6">
                <p className="font-semibold text-slate-200 mb-1">¿Qué es?</p>
                <p className="text-slate-300 text-sm">{pilar.queEs}</p>
              </div>}
              
              <h4 className="text-lg font-bold text-white mb-4">Coordenadas Clave</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {pilar.coordenadasClave && pilar.coordenadasClave.map((coord, i) => (
                  <CoordenadaClaveGauge key={i} coordenada={coord} />
                ))}
              </div>

              {pilar.planDeAccion && <PilarPlanDeAccion plan={pilar.planDeAccion} />}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  const reporteData = report;

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

  if (!reporteData || !reporteData.pilares || reporteData.pilares.length === 0) {
    return null;
  }

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">Informe Estratégico Avanzado</h2>
        <div className="mt-6 inline-block bg-slate-800 border border-slate-700 p-4 rounded-xl">
          <span className="text-base font-semibold text-slate-400 tracking-wider">Puntaje General de Madurez Digital</span>
          <span className="text-7xl font-black text-white block">{reporteData.puntajeGeneral}</span>
        </div>
      </div>

      {/* GUARDA DE SEGURIDAD */}
      {reporteData.pilares && reporteData.pilares.map((pilar, i) => (
        <PilarAccordion key={pilar.id || `pilar-${i}`} pilar={pilar} />
      ))}

    </section>
  );
};

export default ReportSection;