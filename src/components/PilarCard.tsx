import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Pilar } from '@/app/types';
import CoordenadaGauge from './CoordenadaGauge';
import { ScoreGauge } from './ScoreGauge';

interface PilarCardProps {
  pilar: Pilar;
}

const PilarCard: React.FC<PilarCardProps> = ({ pilar }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el acordeón
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-700/50">
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PilarCard;
