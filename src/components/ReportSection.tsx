import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckSquare, Square } from 'lucide-react';

// --- INTERFACES DE DATOS v3 (TODO SELECCIONABLE) ---
type Solucion = {
  id: string;
  texto: string;
  prefijo: string;
};

type Coordenada = {
  id: string;
  titulo: string;
  score: number;
  diagnostico: string;
  impacto: string;
  soluciones: Solucion[];
};

type Pilar = {
  id: string;
  titulo: string;
  score: number;
  benchmark: string;
  coordenadas: Coordenada[];
};

type Reporte = {
  puntajeGeneral: number;
  pilares: Pilar[];
};

interface ReportSectionProps {
  report: string;
  isLoading: boolean;
}

// --- PARSER v6 (FINAL) ---
const parseReport = (markdown: string): Reporte => {
  if (!markdown) {
    return { puntajeGeneral: 0, pilares: [] };
  }

  const getScore = (text: string | undefined) => text ? parseInt(text, 10) : 0;
  const getText = (match: RegExpMatchArray | null, index = 1) => match?.[index]?.trim() || '';

  const puntajeGeneralMatch = markdown.match(/\*\*Puntaje General de Madurez Digital:\*\*\s*(\d+)\/100/);
  const puntajeGeneral = getScore(puntajeGeneralMatch?.[1]);

  const pilaresText = markdown.split(/\n---\n/);
  const pilares: Pilar[] = pilaresText
    .map((pilarText, pilarIndex) => {
      if (!pilarText.includes('## ')) return null;

      const tituloMatch = pilarText.match(/##\s*(.*?)\(Puntaje:\s*(\d+)\/100\)/);
      const benchmarkMatch = pilarText.match(/\*\s*\*Benchmark del Sector:\*\*\s*(.*)/);
      
      const coordenadas: Coordenada[] = [];
      const coordenadasText = pilarText.split('### ').slice(1);

      coordenadasText.forEach((coordText, coordIndex) => {
        const coordTituloMatch = coordText.match(/\*\*Coordenada:\s*(.*?)\((\d+)\/100\)\*\*/);
        const diagnosticoMatch = coordText.match(/\*\s*\*Diagnóstico:\*\*\s*([\s\S]*?)(?=\n\s*\*)/);
        const impactoMatch = coordText.match(/\*\s*\*Impacto en el Negocio:\*\*\s*(.*)/);
        
        const soluciones: Solucion[] = [];
        const planDeAccionMatch = coordText.match(/\*\s*\*Plan de Acción:\*\*\s*([\s\S]*)/);
        if (planDeAccionMatch) {
          const planText = planDeAccionMatch[1];
          const solucionMatches = Array.from(planText.matchAll(/\*\s*\[ \]\s*\*\*(.*?):\*\*\s*([\s\S]*?)(?=\n\s*\*|$)/g));
          
          solucionMatches.forEach((match, solIndex) => {
            soluciones.push({
              id: `solucion-${pilarIndex}-${coordIndex}-${solIndex}`,
              prefijo: getText(match, 1),
              texto: getText(match, 2),
            });
          });
        }

        coordenadas.push({
          id: `coordenada-${pilarIndex}-${coordIndex}`,
          titulo: getText(coordTituloMatch, 1),
          score: getScore(coordTituloMatch?.[2]),
          diagnostico: getText(diagnosticoMatch),
          impacto: getText(impactoMatch),
          soluciones,
        });
      });

      return {
        id: `pilar-${pilarIndex}`,
        titulo: getText(tituloMatch, 1),
        score: getScore(tituloMatch?.[2]),
        benchmark: getText(benchmarkMatch),
        coordenadas,
      };
    })
    .filter((p): p is Pilar => p !== null && p.titulo !== '');

  return { puntajeGeneral, pilares };
};


// --- COMPONENTES DE UI FINALES ---

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group inline-block ml-2">
    <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
    <div className="absolute bottom-full mb-2 w-72 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg">
      {text}
    </div>
  </div>
);

const SolucionItem: React.FC<{ 
  solucion: Solucion;
  onToggle: (solucionId: string, texto: string) => void;
  isSelected: boolean;
}> = ({ solucion, onToggle, isSelected }) => {
  const textoCompleto = `${solucion.prefijo}: ${solucion.texto}`;
  return (
    <div>
      <h5 className="font-bold text-white">{solucion.prefijo}:</h5>
      <div 
        className="flex items-start space-x-3 mt-2 p-3 bg-sky-900/50 rounded-lg cursor-pointer hover:bg-sky-900/80 transition-colors"
        onClick={() => onToggle(solucion.id, textoCompleto)}
      >
        {isSelected ? <CheckSquare className="text-cyan-400 h-5 w-5 mt-1 flex-shrink-0" /> : <Square className="text-slate-500 h-5 w-5 mt-1 flex-shrink-0" />}
        <p className="text-sm text-slate-200">{solucion.texto}</p>
      </div>
    </div>
  );
};

const CoordenadaCard: React.FC<{ 
  coordenada: Coordenada;
  onSolucionToggle: (solucionId: string, texto: string) => void;
  selectedSoluciones: { [key: string]: string };
}> = ({ coordenada, onSolucionToggle, selectedSoluciones }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 mb-6">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-xl font-bold text-white">{coordenada.titulo}</h4>
        <span className="text-2xl font-bold text-cyan-400">{coordenada.score}/100</span>
      </div>
      
      <div className="space-y-4 text-slate-300">
        {coordenada.diagnostico && <div>
          <p className="font-semibold text-slate-200 mb-1">Diagnóstico</p>
          <p>{coordenada.diagnostico}</p>
        </div>}
        {coordenada.impacto && <div>
          <p className="font-semibold text-slate-200 mb-1">Impacto en el Negocio</p>
          <p>{coordenada.impacto}</p>
        </div>}
        
        {coordenada.soluciones.length > 0 && <div>
          <p className="font-semibold text-slate-200 mb-1">Plan de Acción</p>
          <div className="bg-slate-900/70 p-4 rounded-md space-y-3">
            {coordenada.soluciones.map(sol => (
              <SolucionItem 
                key={sol.id} 
                solucion={sol} 
                onToggle={onSolucionToggle} 
                isSelected={!!selectedSoluciones[sol.id]}
              />
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
};

const PilarAccordion: React.FC<{ 
  pilar: Pilar;
  onSolucionToggle: (solucionId: string, texto: string) => void;
  selectedSoluciones: { [key: string]: string };
}> = ({ pilar, onSolucionToggle, selectedSoluciones }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-2 border-slate-800 rounded-xl mb-6 bg-slate-900/50 backdrop-blur-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-5 hover:bg-slate-800/60 transition-colors flex justify-between items-center"
      >
        <h3 className="text-2xl font-bold text-white flex items-center">{pilar.titulo} <Tooltip text="Explicación del pilar..." /></h3>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-white">{pilar.score}/100</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={28} className="text-white" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="p-5 border-t border-slate-800">
              <div className="bg-slate-800/70 p-4 rounded-lg mb-6">
                <p className="font-semibold text-slate-200 mb-1">Benchmark del Sector</p>
                <p className="text-slate-300 text-sm">{pilar.benchmark}</p>
              </div>
              {pilar.coordenadas.map((coord) => (
                <CoordenadaCard 
                  key={coord.id} 
                  coordenada={coord} 
                  onSolucionToggle={onSolucionToggle} 
                  selectedSoluciones={selectedSoluciones} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
  const [selectedSoluciones, setSelectedSoluciones] = useState<{ [key: string]: string }>({});

  const reporteData = useMemo(() => parseReport(report), [report]);

  const handleSolucionToggle = (solucionId: string, texto: string) => {
    setSelectedSoluciones(prev => {
      const newSelected = { ...prev };
      if (newSelected[solucionId]) {
        delete newSelected[solucionId];
      } else {
        newSelected[solucionId] = texto;
      }
      return newSelected;
    });
  };

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

  if (!report) return null;

  const solucionesSeleccionadas = Object.values(selectedSoluciones);

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white">Informe Estratégico Avanzado</h2>
        <div className="mt-6 inline-block bg-slate-800 border border-slate-700 p-4 rounded-xl">
          <span className="text-base font-semibold text-slate-400 tracking-wider">Puntaje General de Madurez Digital</span>
          <span className="text-7xl font-black text-white block">{reporteData.puntajeGeneral}</span>
        </div>
      </div>

      {reporteData.pilares.map((pilar) => (
        <PilarAccordion 
          key={pilar.id} 
          pilar={pilar} 
          onSolucionToggle={handleSolucionToggle} 
          selectedSoluciones={selectedSoluciones} 
        />
      ))}

      {solucionesSeleccionadas.length > 0 && (
        <div className="mt-12 p-6 bg-slate-800 border-2 border-cyan-500 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">Resumen de Soluciones Seleccionadas</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-200">
            {solucionesSeleccionadas.map((solucion, i) => (
              <li key={i}>{solucion}</li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Contactar para Implementar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportSection;
