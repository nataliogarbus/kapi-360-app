import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

// --- INTERFACES DE DATOS ALINEADAS CON PROMPT V2.2 ---
type PlanDeAccion = {
  loHagoYo: string[];
  loHaceKapiConMiEquipo: string[];
  loHaceKapi: string[];
};

type Coordenada = {
  titulo: string;
  score: number;
  planDeAccion: PlanDeAccion;
};

type Pilar = {
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
  report: string;
  isLoading: boolean;
}

// --- PARSER COMPLETAMENTE REESCRITO PARA V2.2 ---
const parseReport = (markdown: string): Reporte => {
  if (!markdown) {
    return { puntajeGeneral: 0, pilares: [] };
  }

  const getScore = (text: string | undefined) => text ? parseInt(text, 10) : 0;

  const puntajeGeneralMatch = markdown.match(/\*\*Puntaje General:\*\* (\d+)\/100/);
  const puntajeGeneral = getScore(puntajeGeneralMatch?.[1]);

  const pilaresText = markdown.split('## ').slice(1);
  const pilares: Pilar[] = pilaresText.map(pilarText => {
    const tituloMatch = pilarText.match(/(.*?)\(Puntaje: (\d+)\/100\)/);
    const queEsMatch = pilarText.match(/\*\*Qué es:\*\* ([^\n]+)/);
    const porQueImportaMatch = pilarText.match(/\*\*Por qué importa:\*\* ([^\n]+)/);

    const coordenadasBlockMatch = pilarText.match(/\*\*Coordenadas Clave:\*\*([\s\S]*?)\*\*Plan de Acción:\*\*/);
    const planDeAccionBlockMatch = pilarText.match(/\*\*Plan de Acción:\*([\s\S]*)/);

    const coordenadas: Coordenada[] = [];
    if (coordenadasBlockMatch?.[1]) {
      const coordenadasText = coordenadasBlockMatch[1].trim().split('- ').filter(Boolean);
      coordenadasText.forEach(coordText => {
        const match = coordText.match(/\*\*(.*?):\*\* (\d+)\/100/);
        if (match) {
          coordenadas.push({ 
            titulo: match[1].trim(), 
            score: getScore(match[2]),
            // El plan de acción se extrae a nivel de pilar, no de coordenada
            planDeAccion: { loHagoYo: [], loHaceKapiConMiEquipo: [], loHaceKapi: [] }
          });
        }
      });
    }
    
    const planDeAccion: PlanDeAccion = { loHagoYo: [], loHaceKapiConMiEquipo: [], loHaceKapi: [] };
    if (planDeAccionBlockMatch?.[1]) {
        const planText = planDeAccionBlockMatch[1];
        const loHagoYoMatch = planText.match(/- \*\*Lo Hago Yo:\*([\s\S]*?)(?=- \*\*Lo Hace Kapi|$)/);
        if(loHagoYoMatch) {
            planDeAccion.loHagoYo = loHagoYoMatch[1].trim().split('\n\s*- ').filter(Boolean).map(s => s.trim());
        }

        const loHaceKapiConMiEquipoMatch = planText.match(/- \*\*Lo Hace Kapi con mi Equipo:\*([\s\S]*?)(?=- \*\*Lo Hace Kapi|$)/);
        if(loHaceKapiConMiEquipoMatch) {
            planDeAccion.loHaceKapiConMiEquipo = loHaceKapiConMiEquipoMatch[1].trim().split('\n\s*- ').filter(Boolean).map(s => s.trim());
        }

        const loHaceKapiMatch = planText.match(/- \*\*Lo Hace Kapi:\*([\s\S]*)/);
        if(loHaceKapiMatch) {
            planDeAccion.loHaceKapi = loHaceKapiMatch[1].trim().split('\n\s*- ').filter(Boolean).map(s => s.trim());
        }
    }

    // Asignar el plan de acción completo a cada coordenada (según la nueva estructura)
    coordenadas.forEach(c => c.planDeAccion = planDeAccion);

    return {
      titulo: tituloMatch?.[1]?.trim() || '',
      score: getScore(tituloMatch?.[2]),
      queEs: queEsMatch?.[1]?.trim() || '',
      porQueImporta: porQueImportaMatch?.[1]?.trim() || '',
      coordenadas,
    };
  });

  return { puntajeGeneral, pilares };
};


// --- COMPONENTES DE UI AJUSTADOS PARA V2.2 ---

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group">
    <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
    <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      {text}
    </div>
  </div>
);

const PlanDeAccionAcordion: React.FC<{ plan: PlanDeAccion }> = ({ plan }) => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const renderSection = (title: string, items: string[]) => {
        if (items.length === 0) return null;
        const isOpen = openSection === title;
        return (
            <div className="mb-2">
                <button onClick={() => toggleSection(title)} className="w-full text-left font-semibold text-white flex justify-between items-center p-2 bg-gray-700 rounded-t-md">
                    {title}
                    <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-gray-800 p-3 rounded-b-md"
                        >
                            <ul className="list-disc list-inside text-sm">
                                {items.map((item, index) => <li key={index} className="mb-1">{item}</li>)}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="mt-4">
            <h5 className="font-bold text-md text-white mb-2">Planes de Acción Sugeridos:</h5>
            {renderSection('Lo Hago Yo', plan.loHagoYo)}
            {renderSection('Lo Hace Kapi con mi Equipo', plan.loHaceKapiConMiEquipo)}
            {renderSection('Lo Hace Kapi', plan.loHaceKapi)}
        </div>
    );
};

const CoordenadaCard: React.FC<{ coordenada: Coordenada }> = ({ coordenada }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg text-white">{coordenada.titulo}</h4>
        <span className="font-bold text-xl text-green-400">{coordenada.score}/100</span>
      </div>
      {/* El plan de acción ahora es un acordeón dentro de la tarjeta de coordenada */}
      <PlanDeAccionAcordion plan={coordenada.planDeAccion} />
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
        <h3 className="text-xl font-bold text-white">{pilar.titulo}</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-bold text-white mb-2">Qué es</h4>
                      <p className="text-gray-300 text-sm">{pilar.queEs}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-bold text-white mb-2">Por qué importa</h4>
                      <p className="text-gray-300 text-sm">{pilar.porQueImporta}</p>
                  </div>
              </div>
              <h4 className="font-bold text-white mb-3 text-lg">Coordenadas Clave</h4>
              {pilar.coordenadas.map((coord, i) => <CoordenadaCard key={i} coordenada={coord} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL AJUSTADO ---
const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {
    const reporteData = useMemo(() => {
    const parsedData = parseReport(report);
    console.log("--- PARSED REPORT DATA ---", parsedData);
    return parsedData;
  }, [report]);

  if (isLoading) {
    return (
        <section id="report-section" className="mt-10 w-full max-w-4xl mx-auto px-4 text-center">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold mb-2 text-white">Generando tu Informe...</h2>
                <p className="text-lg text-gray-400">La IA está analizando tu sitio. Esto puede tardar unos segundos.</p>
            </div>
            <div className="animate-pulse">
                <div className="h-24 bg-gray-800 rounded-xl mb-4"></div>
                <div className="h-16 bg-gray-800 rounded-xl mb-4"></div>
                <div className="h-16 bg-gray-800 rounded-xl mb-4"></div>
                <div className="h-16 bg-gray-800 rounded-xl mb-4"></div>
            </div>
        </section>
    );
  }

  if (!report) return null;

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