import React from 'react';
import { CoordenadaClave } from '@/app/types';

const getPathColor = (score: number) => {
  if (score < 40) return '#f87171'; // red-400
  if (score < 70) return '#facc15'; // yellow-400
  return '#22d3ee'; // cyan-400
};

const CoordenadaGauge: React.FC<{ coordenada: CoordenadaClave }> = ({ coordenada }) => {
  const color = getPathColor(coordenada.score);

  return (
    <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg">
      <span className="text-slate-300 text-sm font-medium">{coordenada.titulo}</span>
      <div className="flex items-center">
        <span className="font-bold text-lg mr-3" style={{ color }}>
          {coordenada.score}
        </span>
        <div className="w-16 h-2 bg-slate-700 rounded-full">
          <div 
            className="h-2 rounded-full"
            style={{ width: `${coordenada.score}%`, backgroundColor: color, transition: 'width 1.5s ease-out' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CoordenadaGauge;
