import React from 'react';

// --- Interfaz Mínima ---
interface ReportSectionProps {
  report: string;
  isLoading: boolean;
}

// --- Componente de Depuración (para ver la respuesta cruda de la API) ---
const ReportSection: React.FC<ReportSectionProps> = ({ report, isLoading }) => {

  if (isLoading) {
    return (
      <section className="mt-10 w-full max-w-4xl mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-24 bg-slate-800 rounded-xl mb-4"></div>
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
      <div className="bg-slate-900 border-2 border-dashed border-yellow-500 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Modo de Depuración Activo</h2>
        <p className="text-slate-300 mb-4">
          La respuesta de la API no es un JSON válido. Por favor, copia todo el texto que aparece en el recuadro de abajo y pégamelo en el chat para poder corregir el backend.
        </p>
        <pre className="bg-black text-white p-4 rounded-md whitespace-pre-wrap break-words text-xs font-mono">
          <code>
            {report}
          </code>
        </pre>
      </div>
    </section>
  );
};

export default ReportSection;
