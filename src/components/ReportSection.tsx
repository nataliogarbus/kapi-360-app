import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

// --- NUEVAS INTERFACES DE DATOS (v2.2) ---
type Solucion = {
  texto: string;
  seleccionada: boolean;
};

type PlanDeAccion = {
  loHagoYo: string[];
  loHaceKapi: Solucion[];
};

type Coordenada = {
  titulo: string;
  score: number;
  tooltip: string;
  diagnostico: string;
  planDeAccion: PlanDeAccion;
  impacto: string;
};

type Pilar = {
  titulo: string;
  score: number;
  tooltip: string;
  benchmark: string;
  coordenadas: Coordenada[];
  contratarTodas: boolean;
};

type Reporte = {
  puntajeGeneral: number;
  tooltipGeneral: string;
  pilares: Pilar[];
  resumenSoluciones: string[];
};

interface ReportSectionProps {
  report: string;
}

// --- NUEVO PARSER (v2.2) ---
const parseReport = (markdown: string): Reporte => {
  if (!markdown) {
    return {
      puntajeGeneral: 0,
      tooltipGeneral: '',
      pilares: [],
      resumenSoluciones: [],
    };
  }

  const getScore = (text: string | undefined) => text ? parseInt(text, 10) : 0;

  const sections = markdown.split(/\n---\n/);
  const header = sections.shift() || '';

  const generalScoreMatch = header.match(/\$\*\*Puntaje General de Madurez Digital:\*\* \[(\d+)\]\/100 \`\(\?\)\`/);
  const puntajeGeneral = getScore(generalScoreMatch?.[1]);
  // En una implementación futura, el tooltip se extraería también.
  const tooltipGeneral = "Este es el puntaje general de madurez digital de tu empresa.";

  const pilares: Pilar[] = sections.map(pilarText => {
    const pilarTitleMatch = pilarText.match(/## (.*?)\(Puntaje: \[(\d+)\]\/100\) \`\(\?\)\`/);
    const pilarTitle = pilarTitleMatch?.[1]?.trim() || 'Pilar no encontrado';
    const pilarScore = getScore(pilarTitleMatch?.[2]);

    const benchmarkMatch = pilarText.match(/\* \*Benchmark del Sector:\* (.*)/);
    const benchmark = benchmarkMatch?.[1]?.trim() || '';

    const coordenadasText = pilarText.split(/### \*\*Coordenada:/).slice(1);
    const coordenadas: Coordenada[] = coordenadasText.map(coordText => {
      const coordTitleMatch = coordText.match(/(.*?)\( \[\.\.\.\]\/100\) \`\(\?\)\`/);
      const coordTitle = coordTitleMatch?.[1]?.trim() || 'Coordenada no encontrada';
      
      // Se asume que el puntaje vendrá en el texto, por ahora se usa un mock.
      const coordScore = Math.floor(Math.random() * 30) + 65;

      const diagnosticoMatch = coordText.match(/\* \*Diagnóstico:\* (.*)/);
      const diagnostico = diagnosticoMatch?.[1]?.trim() || '';

      const impactoMatch = coordText.match(/\* \*Impacto en el Negocio:\* (.*)/);
      const impacto = impactoMatch?.[1]?.trim() || '';

      const planAccionMatch = coordText.match(/\* \*Plan de Acción:\*([\s\S]*?)(\n\* \*Impacto en el Negocio:\*|$)/);
      const planAccionText = planAccionMatch?.[1] || '';

      const loHagoYoMatch = planAccionText.match(/\* \*Lo Hago Yo:\*([\s\S]*?)(?=\* \*Lo Hace Kapi:\*|$)/);
      const loHagoYo = loHagoYoMatch ? loHagoYoMatch[1].split(/\n\s*\*/).map(s => s.trim()).filter(Boolean) : [];

      const loHaceKapiMatch = planAccionText.match(/\* \*Lo Hace Kapi:\*([\s\S]*)/);
      const loHaceKapi: Solucion[] = loHaceKapiMatch ? loHaceKapiMatch[1].split(/\n\s*\*/).map(s => ({
        texto: s.replace(/\s*\[ \] \*\*Solución:\* /,'').trim(),
        seleccionada: false
      })).filter(s => s.texto) : [];

      return {
        titulo: coordTitle,
        score: coordScore,
        tooltip: `Tooltip para ${coordTitle}`,
        diagnostico,
        planDeAccion: { loHagoYo, loHaceKapi },
        impacto,
      };
    });

    return {
      titulo: pilarTitle,
      score: pilarScore,
      tooltip: `Tooltip para ${pilarTitle}`,
      benchmark,
      coordenadas,
      contratarTodas: false,
    };
  });

  return {
    puntajeGeneral,
    tooltipGeneral,
    pilares,
    resumenSoluciones: [], // Lógica a implementar
  };
};

// --- NUEVOS COMPONENTES DE UI (v2.2) ---

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group">
    <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
    <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      {text}
    </div>
  </div>
);

const CoordenadaCard: React.FC<{ coordenada: Coordenada }> = ({ coordenada }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg text-white flex items-center gap-2">{coordenada.titulo} <Tooltip text={coordenada.tooltip} /></h4>
        <span className="font-bold text-xl text-green-400">{coordenada.score}/100</span>
      </div>
      <p className="text-sm text-gray-300 mb-3"><strong className="text-white">Diagnóstico:</strong> {coordenada.diagnostico}</p>
      <div className="text-sm text-gray-300 mb-3">
        <strong className="text-white">Plan de Acción:</strong>
        <ul className="list-disc list-inside pl-2 mt-1">
          {coordenada.planDeAccion.loHagoYo.map((paso, i) => <li key={i}>{paso}</li>)}
        </ul>
        <div className="mt-2 bg-gray-700/50 p-3 rounded">
          {coordenada.planDeAccion.loHaceKapi.map((solucion, i) => (
             <label key={i} className="flex items-start cursor-pointer">
              <input type="checkbox" className="mt-1 mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <ReactMarkdown components={{ p: ({node, ...props}) => <p className="text-sm text-white" {...props} /> }}>{solucion.texto}</ReactMarkdown>
            </label>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-300"><strong className="text-white">Impacto en el Negocio:</strong> {coordenada.impacto}</p>
    </div>
  );
};

const PilarAccordion: React.FC<{ pilar: Pilar }> = ({ pilar }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-xl mb-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-5 bg-gray-800 hover:bg-gray-700 transition-colors flex justify-between items-center"
      >
        <div className="flex items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">{pilar.titulo} <Tooltip text={pilar.tooltip} /></h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-white">{pilar.score}/100</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={24} className="text-white" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-gray-900/50"
          >
            <div className="p-5">
              <p className="text-gray-300 text-sm mb-4">{pilar.benchmark}</p>
              {pilar.coordenadas.map((coord, i) => <CoordenadaCard key={i} coordenada={coord} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (v2.2) ---
const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  // OJO: Usando datos MOCK por ahora. El parser real es complejo.
  const reporteData = useMemo(() => parseReport(report), [report]);

  return (
    <section id="report-section" className="mt-10 w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-2 text-white">Informe Estratégico Avanzado</h2>
        <p className="text-lg text-gray-400">Un análisis 360° de tu presencia digital.</p>
        <div className="mt-6 inline-block bg-gray-800 p-4 rounded-xl">
            <span className="text-base font-semibold text-gray-400 tracking-wider">Puntaje General de Madurez Digital</span>
            <span className="text-7xl font-black text-white block">{reporteData.puntajeGeneral}</span>
        </div>
      </div>

      {reporteData.pilares.map((pilar, i) => (
        <PilarAccordion key={i} pilar={pilar} />
      ))}

      <div className="mt-10 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors mr-4">Ver Resumen y Contratar</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Enviar por Correo</button>
      </div>
    </section>
  );
};

export default ReportSection;
