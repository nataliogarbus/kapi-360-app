import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Definimos el tipo para los datos del desglose
interface BreakdownItem {
  title: string;
  score: number;
}

interface StrategicCompassProps {
  score: number; // Valor numérico de 0 a 100
  // Hacemos el desglose opcional para no romper la implementación existente
  breakdown?: BreakdownItem[]; 
}

const StrategicCompass: React.FC<StrategicCompassProps> = ({ score, breakdown = [] }) => {
  const [isHovered, setIsHovered] = useState(false);

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#00DD82', '#374151'],
        borderColor: ['#00DD82', '#374151'],
        borderWidth: 1,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Doughnut data={data} options={options} />

      {/* Tooltip personalizado que aparece al hacer hover */}
      {isHovered && breakdown.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-3 rounded-lg shadow-xl border border-gray-700">
            <h4 className="text-sm font-bold mb-2 text-center">Desglose</h4>
            <ul className="text-xs space-y-1">
              {breakdown.map(item => (
                <li key={item.title} className="flex justify-between">
                  <span className="mr-4">{item.title}</span>
                  <span className="font-semibold">{item.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicCompass;
