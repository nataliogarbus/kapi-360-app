import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Target, Users, Zap, ChevronsRight } from 'lucide-react';

// --- INTERFACES DE DATOS v7.2 ---
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

// --- COMPONENTES DE UI v10.0 (Diseño Compuesto) ---

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg pointer-events-none">
      {text}
    </div>
  </div>
);

const getPathColor = (score: number) => {
  if (score < 40) return '#f87171'; // red-400
  if (score < 70) return '#facc15'; // yellow-400
  return '#22d3ee'; // cyan-400
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = { x: x + radius * Math.cos(startAngle), y: y + radius * Math.sin(startAngle) };
  const end = { x: x + radius * Math.cos(endAngle), y: y + radius * Math.sin(endAngle) };
  const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

const CompositeScoreGauge: React.FC<{ pilares: Pilar[], puntajeGeneral: number }> = ({ pilares, puntajeGeneral }) => {
  const radius = 50;
  const totalScore = pilares.reduce((sum, p) => sum + p.score, 0);
  let startAngle = -Math.PI / 2;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle className="text-slate-700" strokeWidth="12" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
        {
          pilares.map(pilar => {
            const angle = (pilar.score / totalScore) * 2 * Math.PI;
            const endAngle = startAngle + angle;
            const pathData = describeArc(60, 60, radius, startAngle, endAngle);
            const currentAngle = startAngle;
            startAngle = endAngle;

            return (
              <Tooltip key={pilar.id} text={`${pilar.titulo}: ${pilar.score}`}>
                <motion.path
                  d={pathData}
                  stroke={getPathColor(pilar.score)}
                  strokeWidth="12"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </Tooltip>
            );
          })
        }
        <text x="50%" y="50%" dy=".3em" textAnchor="middle" className="text-4xl font-bold text-white">{puntajeGeneral}</text>
      </svg>
    </div>
  );
};

const GeneralActionPlan: React.FC<{ pilares: Pilar[], onSeeDetails: () => void }> = ({ pilares, onSeeDetails }) => {
  const getActionSteps = (actionType: keyof PlanDeAccion) => {
    return pilares
      .map(pilar => ({
        step: pilar.planDeAccion[actionType]?.[0],
        pilar: pilar.titulo
      }))
      .filter(item => item.step);
  }

  return (
    <div className="w-full max-w-4xl mt-12">
      <h3 className="text-2xl font-bold text-white text-center mb-6">Plan de Acción General</h3>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4"><Target className="text-cyan-400 mr-3" size={20}/><h4 className="font-bold text-lg text-white">Lo Hago Yo</h4></div>
          <ul className="space-y-3 text-slate-300 text-sm">{getActionSteps('loHagoYo').map((item, i) => <li key={i} className="flex"><ChevronsRight size={16} className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" /><span><strong>{item.pilar}:</strong> {item.step}</span></li>)}</ul>
        </div>
        <div>
          <div className="flex items-center mb-4"><Users className="text-cyan-400 mr-3" size={20}/><h4 className="font-bold text-lg text-white">Lo Hace Kapi con mi Equipo</h4></div>
          <ul className="space-y-3 text-slate-300 text-sm">{getActionSteps('loHaceKapiConMiEquipo').map((item, i) => <li key={i} className="flex"><ChevronsRight size={16} className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" /><span><strong>{item.pilar}:</strong> {item.step}</span></li>)}</ul>
        </div>
        <div>
          <div className="flex items-center mb-4"><Zap className="text-cyan-400 mr-3" size={20}/><h4 className="font-bold text-lg text-white">Lo Hace Kapi</h4></div>
          <ul className="space-y-3 text-slate-300 text-sm">{getActionSteps('loHaceKapi').map((item, i) => <li key={i} className="flex"><ChevronsRight size={16} className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" /><span><strong>{item.pilar}:</strong> {item.step}</span></li>)}</ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <button onClick={onSeeDetails} className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors flex items-center justify-center mx-auto">
          Ver Planes Detallados <ChevronsRight size={20} className="ml-1" />
        </button>
      </div>
    </div>
  )
}

const DetailedActionPlans: React.FC<{ pilares: Pilar[], onGoBack: () => void }> = ({ pilares, onGoBack }) => (
  <div className="w-full max-w-4xl mt-12">
     <button onClick={onGoBack} className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors mb-6">← Volver al Resumen</button>
     {pilares.map(pilar => (
        <div key={pilar.id} className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{pilar.titulo}</h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center mb-3"><Target className="text-cyan-400 mr-3" size={20}/><h4 className="font-bold text-lg text-white">Lo Hago Yo</h4></div>
            <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm mb-4">{pilar.planDeAccion.loHagoYo.map((step, i) => <li key={i}>{step}</li>)}</ul>
            <div className="flex items-center mb-3"><Users className="text-cyan-400 mr-3" size={20}/><h4 className="font-bold text-lg text-white">Lo Hace Kapi con mi Equipo</h4></div>
            <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm mb-4">{pilar.planDeAccion.loHaceKapiConMiEquipo.map((step, i) => <li key={i}>{step}</li>)}</ul>
            <div className="flex items-center mb-3"><Zap className="text-cyan-400 mr-3" size={20}/><h4 className="font-bold text-lg text-white">Lo Hace Kapi</h4></div>
            <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm">{pilar.planDeAccion.loHaceKapi.map((step, i) => <li key={i}>{step}</li>)}</ul>
          </div>
        </div>
     ))}
  </div>
)

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  const [view, setView] = useState('summary'); // 'summary' or 'details'

  if (isLoading) {
    return (
      <section className="mt-10 w-full max-w-4xl mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-48 bg-slate-800 rounded-full mx-auto w-48 mb-8"></div>
          <div className="h-32 bg-slate-800 rounded-xl"></div>
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
      <CompositeScoreGauge pilares={report.pilares} puntajeGeneral={report.puntajeGeneral} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'summary' ? (
            <GeneralActionPlan pilares={report.pilares} onSeeDetails={() => setView('details')} />
          ) : (
            <DetailedActionPlans pilares={report.pilares} onGoBack={() => setView('summary')} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ReportSection;