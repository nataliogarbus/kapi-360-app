import React from 'react';

interface RutaOptimaCardProps {
  icon: React.ReactNode; // Permitir pasar un componente de ícono
  title: string;
  score: number;
}

const RutaOptimaCard: React.FC<RutaOptimaCardProps> = ({ icon, title, score }) => {
  // Determinar el color del puntaje basado en su valor
  const getScoreColor = (value: number) => {
    if (value >= 75) return 'text-green-400';
    if (value >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex flex-col items-center text-center hover:border-cyan-400 transition-colors duration-300">
      <div className="text-cyan-400 mb-3">
        {icon}
      </div>
      <h4 className="font-semibold text-white text-lg mb-2">{title}</h4>
      <p className={`font-bold text-2xl ${getScoreColor(score)}`}>
        {score}<span className="text-sm text-slate-400">/100</span>
      </p>
    </div>
  );
};

export default RutaOptimaCard;
