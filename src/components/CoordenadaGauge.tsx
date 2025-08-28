import React from 'react';
import { CoordenadaClave } from '@/app/types';
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

// Datos de las explicaciones (solución rápida para MVP)
const coordenadaExplicaciones: { [key: string]: string } = {
  "Análisis de Competencia": "Evaluamos la fuerza y estrategia de tus competidores directos en el entorno digital.",
  "Público Objetivo": "Analizamos si tu mensaje y tu plataforma están correctamente dirigidos a tu cliente ideal.",
  "Propuesta de Valor": "Revisamos la claridad y el atractivo de tu oferta principal frente a la competencia.",
  "Posicionamiento de Marca": "Medimos la percepción y visibilidad de tu marca en el mercado digital.",
  "Rendimiento Web (Core Web Vitals)": "Analizamos la velocidad de carga y la estabilidad visual de tu sitio, factores clave para Google.",
  "Experiencia de Usuario (UX/UI)": "Evaluamos lo fácil e intuitivo que es para un usuario navegar y encontrar lo que busca en tu web.",
  "Accesibilidad (WCAG)": "Revisamos si tu web puede ser utilizada por personas con distintas capacidades, ampliando tu alcance.",
  "Seguridad del Frontend (HTTPS)": "Verificamos que tu sitio sea seguro para los usuarios, un factor de confianza y posicionamiento.",
  "Calidad del Contenido": "Analizamos si tu contenido responde a las necesidades de tu audiencia y demuestra tu experiencia.",
  "Estrategia de Redes Sociales": "Evaluamos si estás utilizando las plataformas sociales adecuadas para llegar a tu público y cumplir tus objetivos.",
  "SEO de Contenidos (Palabras Clave)": "Revisamos si tu contenido está optimizado para que los motores de búsqueda lo encuentren.",
  "Email Marketing y Automatización": "Analizamos cómo utilizas el email para nutrir a tus prospectos y fidelizar a tus clientes.",
  "Estrategia de Captación (Funnels)": "Evaluamos tus embudos de venta y cómo conviertes visitantes en clientes.",
  "Uso de Analítica y Datos": "Revisamos si estás midiendo tus acciones de marketing para tomar decisiones informadas.",
  "Integración de IA para Eficiencia": "Analizamos si estás usando herramientas de IA para automatizar tareas y mejorar tu productividad.",
  "Personalización de la Experiencia": "Evaluamos si estás utilizando los datos para ofrecer experiencias personalizadas a tus usuarios."
};

const getPathColor = (score: number) => {
  if (score < 40) return '#f87171'; // red-400
  if (score < 70) return '#facc15'; // yellow-400
  return '#22d3ee'; // cyan-400
};

const CoordenadaGauge: React.FC<{ coordenada: CoordenadaClave }> = ({ coordenada }) => {
  const color = getPathColor(coordenada.score);
  const explicacion = coordenadaExplicaciones[coordenada.titulo] || "Explicación no disponible.";

  return (
    <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg">
      <div className="flex items-center">
        <span className="text-slate-300 text-sm font-medium">{coordenada.titulo}</span>
        <Info 
          className="w-4 h-4 text-slate-500 ml-2 cursor-pointer"
          data-tooltip-id="coordenada-tooltip"
          data-tooltip-content={explicacion}
        />
      </div>
      <div className="flex items-center">
        <span className="font-bold text-lg mr-3" style={{ color }}>
          {coordenada.score}
        </span>
        <div className="w-16 h-2 bg-slate-700 rounded-full">
          <div 
            className="h-2 rounded-full"
            style={{ width: `${coordenada.score}%`, backgroundColor: color, transition: 'width 1.5s ease-out' }}
          ></div>
        </div>
      </div>
      <Tooltip id="coordenada-tooltip" className="max-w-xs" />
    </div>
  );
};

export default CoordenadaGauge;