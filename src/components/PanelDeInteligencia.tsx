
import React from 'react';

// Definimos una interfaz para los datos que mostrará el panel
interface QuadrantData {
  title: string;
  // Estos campos se llenarán con el contenido real del análisis más adelante
  queEs: string;
  porQueImporta: string;
}

interface PanelDeInteligenciaProps {
  isOpen: boolean;
  onClose: () => void;
  quadrant: QuadrantData | null;
}

const PanelDeInteligencia: React.FC<PanelDeInteligenciaProps> = ({ isOpen, onClose, quadrant }) => {
  // Clases de transición para la animación de entrada/salida
  const panelClasses = `
    fixed top-0 right-0 h-full w-full md:w-1/3 bg-gray-900 bg-opacity-95 backdrop-blur-sm 
    text-white p-8 shadow-2xl transform transition-transform duration-500 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `;

  if (!quadrant) return null; // No renderizar si no hay datos

  return (
    <div className={panelClasses} style={{ zIndex: 50 }}>
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors text-2xl"
      >
        &times; {/* Un ícono de cierre simple y elegante */}
      </button>
      
      <div className="h-full overflow-y-auto pr-4">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">{quadrant.title}</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-white">¿Qué es esto?</h3>
          <p className="text-gray-300">{quadrant.queEs || 'Análisis detallado sobre este pilar estratégico.'}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-white">¿Por qué es importante?</h3>
          <p className="text-gray-300">{quadrant.porQueImporta || 'El impacto directo de este pilar en los KPIs y el crecimiento de tu negocio.'}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Rutas de Solución</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors">Lo Hago Yo (DIY)</button>
            <button className="w-full p-3 text-left bg-gray-800 hover:bg-green-600 rounded-lg transition-colors">Lo Hace Kapi con mi Equipo</button>
            <button className="w-full p-3 text-left bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors ring-2 ring-purple-400">Lo Hace Kapi (Recomendado)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelDeInteligencia;
