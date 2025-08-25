import React, { useState } from 'react';
import { REPORT_STRUCTURE } from '@/app/report-structure'; // Importamos la estructura

// ... (iconos sin cambios)
const SeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>;
const UxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M7 12h10M7 7h10M7 17h5"/></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
const DefaultIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;

const getIconForTitle = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('mercado')) return <SeoIcon />;
  if (lowerTitle.includes('plataforma')) return <UxIcon />;
  if (lowerTitle.includes('contenido')) return <ConversionIcon />;
  if (lowerTitle.includes('crecimiento')) return <DefaultIcon />;
  return <DefaultIcon />;
};

// AHORA LAS OPCIONES VIENEN DE LA ESTRUCTURA CENTRAL
const customOptions = REPORT_STRUCTURE.pilares.map(pilar => ({ id: pilar.id, value: pilar.titulo, title: pilar.titulo }));

const modeDescriptions: { [key: string]: string } = {
  auto: 'Analizaremos tu sitio web a través de los 4 pilares clave para darte un panorama completo.',
  custom: 'Elige uno o más pilares para un análisis enfocado en las áreas que más te interesan.',
  manual: 'Describe un problema o desafío específico que tengas, y la IA generará un plan de acción para resolverlo.',
  consulta: 'Envíanos tu inquietud directamente. Un estratega de nuestro equipo se pondrá en contacto contigo.',
};

interface DiagnosticFormProps {
  onSubmit: (url: string, mode: string, context?: string) => void;
  isLoading: boolean;
  onModeChange: (mode: string) => void;
}

const KapiDiagnosticForm: React.FC<DiagnosticFormProps> = ({ onSubmit, isLoading, onModeChange }) => {
  const [mode, setMode] = useState('auto');
  const [url, setUrl] = useState('');
  const [context, setContext] = useState('');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    onModeChange(newMode);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedPillars(prev => 
        prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    );
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submissionContext = mode === 'custom' ? selectedPillars.join(', ') : context;
    onSubmit(url, mode, submissionContext);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <form id="diagnosticoForm" noValidate onSubmit={handleFormSubmit}>
        {/* ... (resto del JSX sin cambios) */}
      </form>
    </div>
  );
};

export default KapiDiagnosticForm;
