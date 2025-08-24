
import React, { useState } from 'react';

// Las interfaces no cambian, pero ahora los datos vendrán de las props
interface QuadrantData {
  title: string;
  score: number;
  bgColor: string;
  queEs: string;
  porQueImporta: string;
  coordenadas: string[];
}

interface QuadrantProps extends QuadrantData {
  onClick: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface MapaCentralProps {
  onQuadrantClick: (data: Omit<QuadrantData, 'score' | 'bgColor' | 'coordenadas'>) => void;
  quadrantsData: QuadrantData[]; // Recibimos los datos como prop
}

const Quadrant: React.FC<QuadrantProps> = ({ title, score, bgColor, onClick, isHovered, onMouseEnter, onMouseLeave, coordenadas }) => {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${bgColor} text-white transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden`}
    >
      <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-lg font-bold text-center">{title}</h3>
        <p className="text-4xl font-light mt-2 text-center">{score}</p>
      </div>
      <div className={`absolute inset-0 bg-black bg-opacity-70 p-4 flex flex-col justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h4 className="text-md font-bold mb-2 text-center">Coordenadas Clave</h4>
        <ul className="text-sm list-disc list-inside space-y-1">
          {coordenadas.map(coord => <li key={coord}>{coord}</li>)}
        </ul>
      </div>
    </div>
  );
};

// El componente ahora es más "tonto", solo recibe datos y funciones
const MapaCentral: React.FC<MapaCentralProps> = ({ onQuadrantClick, quadrantsData }) => {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Mapa de Crecimiento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrantsData.map((quad) => (
          <Quadrant 
            key={quad.title} 
            {...quad} 
            onClick={() => onQuadrantClick(quad)} 
            isHovered={hoveredQuadrant === quad.title}
            onMouseEnter={() => setHoveredQuadrant(quad.title)}
            onMouseLeave={() => setHoveredQuadrant(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default MapaCentral;
