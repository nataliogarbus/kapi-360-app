import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BarChart2, Laptop, Megaphone, BrainCircuit, Zap, Users, Target } from 'lucide-react';
import { Pilar } from '@/app/types';
import CoordenadaGauge from './CoordenadaGauge';
import { ScoreGauge } from './ScoreGauge';

interface PilarCardProps {
  pilar: Pilar;
}

const pilarIcons: { [key: string]: React.ElementType } = {
  "Mercado y Competencia": BarChart2,
  "Plataforma y UX": Laptop,
  "Contenido y Redes": Megaphone,
  "Crecimiento e IA": BrainCircuit,
};

const ActionPlanItem: React.FC<{ titulo: string; pasos: string[]; icon: React.ElementType }> = ({ titulo, pasos, icon: Icon }) => (
  <div>
    <div className="flex items-center mb-3">
      <Icon className="w-5 h-5 text-cyan-400 mr-3" />
      <h5 className="font-semibold text-white">{titulo}</h5>
    </div>
    <ul className="space-y-2 text-slate-400 text-sm pl-4">
      {pasos.length > 0 ? (
        pasos.map((paso, i) => <li key={i} className="flex items-start"><span className="text-cyan-400 mr-2 mt-1">-</span>{paso}</li>)
      ) : (
        <li className="italic text-slate-500">No hay pasos definidos.</li>
      )}
    </ul>
  </div>
);

const PilarCard: React.FC<PilarCardProps> = ({ pilar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = pilarIcons[pilar.titulo] || BarChart2;

  const cardVariants = {
    closed: { backgroundColor: 'rgba(30, 41, 59, 0.5)' },
    open: { backgroundColor: 'rgba(51, 65, 85, 0.7)' },
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0, marginTop: 0 },
    expanded: { height: 'auto', opacity: 1, marginTop: '1.5rem' },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.3 }}
      className="border border-slate-700 rounded-xl p-6 w-full cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div layout className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon className="w-8 h-8 text-cyan-400 mr-4" />
          <ScoreGauge score={pilar.score} size="small" />
          <h3 className="text-xl font-bold text-white ml-6">{pilar.titulo}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-slate-400" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-700/50">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Qué es</h4>
                <p className="text-slate-300 text-sm">{pilar.queEs}</p>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Por qué importa</h4>
                <p className="text-slate-300 text-sm">{pilar.porQueImporta}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h4 className="font-semibold text-cyan-400 mb-4">Coordenadas Clave</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {pilar.coordenadasClave.map((coordenada) => (
                  <CoordenadaGauge key={coordenada.titulo} coordenada={coordenada} />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h4 className="font-semibold text-cyan-400 mb-4">Plan de Acción Específico</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionPlanItem titulo="Lo Hago Yo" pasos={pilar.planDeAccion.loHagoYo} icon={Target} />
                <ActionPlanItem titulo="Lo Hace Kapi con mi Equipo" pasos={pilar.planDeAccion.loHaceKapiConMiEquipo} icon={Users} />
                <ActionPlanItem titulo="Lo Hace Kapi" pasos={pilar.planDeAccion.loHaceKapi} icon={Zap} />
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PilarCard;
