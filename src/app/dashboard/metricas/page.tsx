'use client';

import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Define the structure of a single report row
interface ReportRow {
  metrics: {
    clicks: string;
    impressions: string;
    cost_micros: string;
    conversions: string;
    ctr: string;
  };
  segments: {
    date: string;
  };
}

// The simplified fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch metrics');
  }

  return response.json();
};

export default function MetricasPage() {
  const { data, error, isLoading } = useSWR<ReportRow[]>('/api/google-ads/metrics', fetcher);

  if (isLoading) {
    return <MetricsSkeleton />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-400">Error al cargar las métricas: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-kapi-gris-medio">No se encontraron datos de métricas para el período seleccionado.</div>;
  }

  // Prepare data for the chart
  const chartLabels = data.map(row => row.segments.date);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Clics',
        data: data.map(row => parseInt(row.metrics.clicks, 10)),
        borderColor: '#818cf8',
        backgroundColor: '#818cf8',
        yAxisID: 'y',
      },
      {
        label: 'Impresiones',
        data: data.map(row => parseInt(row.metrics.impressions, 10)),
        borderColor: '#f87171',
        backgroundColor: '#f87171',
        yAxisID: 'y1',
      },
       {
        label: 'Conversiones',
        data: data.map(row => parseFloat(row.metrics.conversions)),
        borderColor: '#34d399',
        backgroundColor: '#34d399',
        yAxisID: 'y',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Rendimiento de los últimos 30 días' },
    },
    scales: {
      y: { type: 'linear' as const, display: true, position: 'left' as const },
      y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false } },
    },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-kapi-gris-claro">Métricas de la Cuenta</h1>
      
      {/* Chart Section */}
      <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg border border-gray-700">
        <Line options={chartOptions} data={chartData} />
      </div>

      {/* Table Section */}
      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Fecha</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Clics</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Impresiones</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Costo</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Conversiones</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">CTR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-900">
            {data.map((row) => (
              <tr key={row.segments.date}>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{row.segments.date}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{row.metrics.clicks}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{row.metrics.impressions}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">${(parseInt(row.metrics.cost_micros, 10) / 1000000).toFixed(2)}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{parseFloat(row.metrics.conversions).toFixed(2)}</td>
                <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{(parseFloat(row.metrics.ctr) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/3"></div>
      <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
        <div className="h-64 bg-gray-800 rounded"></div>
      </div>
      <div className="bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="h-12 bg-gray-800 rounded-t-lg"></div>
        <div className="space-y-2 p-4">
          <div className="h-8 bg-gray-800 rounded"></div>
          <div className="h-8 bg-gray-800 rounded"></div>
          <div className="h-8 bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}
