import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Reporte } from '@/app/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PillarsDonutChartProps {
  report: Reporte;
}

const PillarsDonutChart: React.FC<PillarsDonutChartProps> = ({ report }) => {
  const data = {
    labels: report.pilares.map(p => p.titulo),
    datasets: [
      {
        label: 'Puntaje del Pilar',
        data: report.pilares.map(p => p.score),
        backgroundColor: [
          'rgba(34, 211, 238, 0.7)', // cyan-400
          'rgba(250, 204, 21, 0.7)',  // yellow-400
          'rgba(248, 113, 113, 0.7)', // red-400
          'rgba(163, 230, 53, 0.7)',  // lime-400
        ],
        borderColor: [
          '#1a1a1a',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="relative w-64 h-64">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-5xl font-bold text-white">{report.puntajeGeneral}</span>
        <span className="text-sm text-slate-400">Puntaje General</span>
      </div>
    </div>
  );
};

export default PillarsDonutChart;
