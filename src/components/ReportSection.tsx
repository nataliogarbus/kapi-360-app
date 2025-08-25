import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

// --- INTERFACES DE DATOS v6.0 (FINAL) ---
type PlanPaso = string;

type Plan = {
  titulo: string;
  pasos: PlanPaso[];
};

type Coordenada = {
  id: string;
  titulo: string;
  score: number;
  diagnostico: string;
  planDeAccion: Plan[];
};

type Pilar = {
  id: string;
  titulo: string;
  score: number;
  queEs: string;
  porQueImporta: string;
  coordenadas: Coordenada[];
};

type Reporte = {
  puntajeGeneral: number;
  pilares: Pilar[];
};

interface ReportSectionProps {
  report: Reporte | null;
  isLoading: boolean;
}

// --- PARSER v7.1 (Corrección final de Pasos) ---
const parseReport = (markdown: string): Reporte => {
  if (!markdown) {
    return { puntajeGeneral: 0, pilares: [] };
  }

  const getScore = (text: string | undefined) => text ? parseInt(text, 10) : 0;
  const getText = (match: RegExpMatchArray | null, index = 1) => match?.[index]?.trim() || '';

  const puntajeGeneralMatch = markdown.match(/\**Puntaje General:\**\s*(\d+)\/100/);
  const puntajeGeneral = getScore(puntajeGeneralMatch?.[1]);

  const pilares: Pilar[] = [];
  const pilarBlocks = markdown.split(/\n##\s/).slice(1);

  pilarBlocks.forEach((pilarBlock, pilarIndex) => {
    const pilarTituloMatch = pilarBlock.match(/(.*?)\(Puntaje:\s*(\d+)\/100\)/);
    const queEsMatch = pilarBlock.match(/\**Qué es:\**\s*([\s\S]*?)(?=\n\**Por qué importa:\**)/);
    const porQueImportaMatch = pilarBlock.match(/\**Por qué importa:\**\s*([\s\S]*?)(?=\n\**Coordenadas Clave:\**)/);

    const coordenadas: Coordenada[] = [];
    const coordSectionMatch = pilarBlock.match(/\**Coordenadas Clave:\**([\s\S]*)/);
    
    if (coordSectionMatch) {
      const coordBlocks = coordSectionMatch[1].split(/\n-\s(?=\*\*)/).filter(b => b.trim() !== '' && b.includes(':'));

      coordBlocks.forEach((coordBlock, coordIndex) => {
        const tituloMatch = coordBlock.match(/\**(.*?)\**:\s*(\d+)\/100/);
        if (!tituloMatch) return;

        const diagnosticoMatch = coordBlock.match(/\**Diagnóstico:\**\s*([\s\S]*?)(?=\n\s*-\s\**Plan de Acción:\**|$)/);
        const planDeAccionMatch = coordBlock.match(/\**Plan de Acción:\**\s*([\s\S]*)/);
        
        const planes: Plan[] = [];
        if (planDeAccionMatch) {
          const planItems = planDeAccionMatch[1].split(/\n\s{2,}-\s(?=\*\*)/).filter(p => p.trim());
          planItems.forEach(planItem => {
            const planTitleMatch = planItem.match(/\**(.*?)\**:/);
            if (planTitleMatch) {
              const titulo = planTitleMatch[1].trim();
              // CORRECCIÓN FINAL: Usar el ancla `^` con el flag `m` para buscar al inicio de cada línea.
              const pasos = Array.from(planItem.matchAll(/^\s{4,}-\s(.*?)$/gm)).map(match => match[1].trim());
              planes.push({ titulo, pasos });
            }
          });
        }

        coordenadas.push({
          id: `pilar-${pilarIndex}-coordenada-${coordIndex}`,
          titulo: getText(tituloMatch, 1),
          score: getScore(tituloMatch?.[2]),
          diagnostico: getText(diagnosticoMatch),
          planDeAccion: planes,
        });
      });
    }

    pilares.push({
      id: `pilar-${pilarIndex}`,
      titulo: getText(pilarTituloMatch, 1),
      score: getScore(pilarTituloMatch?.[2]),
      queEs: getText(queEsMatch),
      porQueImporta: getText(porQueImportaMatch),
      coordenadas,
    });
  });

  return { puntajeGeneral, pilares };
};


// --- COMPONENTES DE UI v6.2 (CON SAFETY CHECKS) ---

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full mb-2 w-72 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg">
      {text}
    </div>
  </div>
);

const PlanAccordion: React.FC<{ plan: Plan }> = ({ plan }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-slate-900/70 rounded-md mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 hover:bg-slate-800/60 transition-colors">
        <span className="font-bold text-white">{plan.titulo}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} className="text-slate-400" /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside p-4 pl-6 text-slate-300 text-sm space-y-2">
              {plan.pasos && plan.pasos.map((paso, i) => <li key={i}>{paso}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CoordenadaCard: React.FC<{ coordenada: Coordenada }> = ({ coordenada }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-white">{coordenada.titulo}</h4>
        <span className="text-2xl font-bold text-cyan-400">{coordenada.score}/100</span>
      </div>
      <div className="space-y-4 text-slate-300">
        {coordenada.diagnostico && <div className="bg-sky-900/30 p-3 rounded-md">
          <p className="font-semibold text-slate-200 mb-1">Diagnóstico</p>
          <p className="text-sm">{coordenada.diagnostico}</p>
        </div>}
        
        {coordenada.planDeAccion && coordenada.planDeAccion.length > 0 ? (
          <div>
            <p className="font-semibold text-slate-200 mt-4 mb-2">Plan de Acción Sugerido</p>
            {coordenada.planDeAccion.map((plan, i) => <PlanAccordion key={i} plan={plan} />)}
          </div>
        ) : (
            <div className="mt-4 p-3 bg-amber-900/30 rounded-md text-amber-300 text-sm">
                <p className="font-semibold">Plan de Acción no disponible</p>
                <p>La IA no pudo generar un plan de acción para esta coordenada.</p>
            </div>
        )}
      </div>
    </div>
  );
};

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
              <h4 className="text-lg font-bold text-white mb-3">Coordenadas Clave</h4>
              {pilar.coordenadas && pilar.coordenadas.map((coord, i) => (
                <CoordenadaCard key={coord.id || `coord-${i}`} coordenada={coord} />
              ))}
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

      {reporteData.pilares && reporteData.pilares.map((pilar, i) => (
        <PilarAccordion key={pilar.id || `pilar-${i}`} pilar={pilar} />
      ))}

    </section>
  );
};

export default ReportSection;
