import React, { useMemo } from 'react';

// --- Interfaz Mínima ---
interface ReportSectionProps {
  report: string;
  isLoading: boolean;
}

// --- Componente Estable (Muestra en Crudo) ---
const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {

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

  if (!report) {
    return null;
  }

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Informe Generado</h2>
        <pre className="bg-black text-white p-4 rounded-md whitespace-pre-wrap break-words text-sm font-mono">
          <code>
            {report}
          </code>
        </pre>
      </div>
    </section>
  );
};

export default ReportSection;
