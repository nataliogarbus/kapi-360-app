import React, { useState } from 'react';
import { REPORT_STRUCTURE } from '@/app/report-structure';

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
        <div className="flex justify-center items-center mb-4 bg-gray-900/60 border border-slate-700 rounded-full p-1 backdrop-blur-sm">
          {Object.keys(modeDescriptions).map(key => (
            <div key={key}>
              <input type="radio" name="analysis_mode" id={`mode-${key}`} value={key} className="hidden peer" checked={mode === key} onChange={() => handleModeChange(key)} disabled={isLoading} />
              <label htmlFor={`mode-${key}`} className="px-4 py-2 text-sm font-semibold rounded-full cursor-pointer transition-colors duration-300 text-gray-300 hover:bg-slate-700/50 peer-checked:bg-cyan-500 peer-checked:text-white peer-checked:shadow-lg capitalize">{key}</label>
            </div>
          ))}
        </div>
        <div className="text-center text-gray-400 text-sm mb-6 min-h-[40px]"><p>{modeDescriptions[mode]}</p></div>
        
        {(mode === 'auto' || mode === 'custom') && (
          <div className="flex flex-col sm:flex-row items-center bg-white/5 border border-white/20 rounded-lg p-2 gap-2 shadow-lg">
             <div className="relative flex-grow w-full">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
               <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-transparent text-white text-lg placeholder-gray-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-0 border-0" placeholder="Ingresa tu URL de sitio web" required disabled={isLoading} />
             </div>
             <button type="submit" className="w-full sm:w-auto bg-green-400 text-black font-bold uppercase px-8 py-3 rounded-md hover:bg-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading || !url}>Generar Plan</button>
           </div>
        )}

        {mode === 'custom' && (
          <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {customOptions.map(option => (
              <div key={option.id}>
                <input 
                  type="checkbox" 
                  id={option.id} 
                  name="enfoques" 
                  value={option.value} 
                  className="hidden peer" 
                  disabled={isLoading} 
                  onChange={() => handleCheckboxChange(option.value)}
                  checked={selectedPillars.includes(option.value)}
                />
                <label htmlFor={option.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center text-center cursor-pointer h-full hover:border-cyan-400 peer-checked:border-green-400 peer-checked:ring-2 peer-checked:ring-green-400/50 transition-all duration-300">
                  <div className="text-cyan-400 mb-2">{getIconForTitle(option.title)}</div>
                  <span className="font-semibold text-white text-sm">{option.title}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {mode === 'manual' && (
          <div className="flex flex-col gap-4">
            <textarea value={context} onChange={(e) => setContext(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={5} placeholder="Describe tu problema o el área que más te preocupa..." required disabled={isLoading}></textarea>
            <button type="submit" className="w-full bg-green-400 text-black font-bold uppercase px-8 py-3 rounded-md hover:bg-green-500 transition-all disabled:opacity-50" disabled={isLoading || !context}>Generar Plan</button>
          </div>
        )}

        {mode === 'consulta' && (
          <div className="flex flex-col gap-4">
            <textarea value={context} onChange={(e) => setContext(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" rows={5} placeholder="Escribe aquí tu consulta para nuestro equipo..." required disabled={isLoading}></textarea>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" placeholder="Tu nombre" className="flex-grow bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" disabled={isLoading} />
              <input type="email" placeholder="Tu email de contacto" className="flex-grow bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" required disabled={isLoading} />
            </div>
            <button type="submit" className="w-full bg-green-400 text-black font-bold uppercase px-8 py-3 rounded-md hover:bg-green-500 transition-all disabled:opacity-50" disabled={isLoading || !context}>Enviar Consulta</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default KapiDiagnosticForm;