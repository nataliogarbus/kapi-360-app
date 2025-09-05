import React from 'react';
import { CoordenadaClave } from '@/app/types';
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

// Definiciones completas y finales para las coordenadas preestablecidas
const coordenadaExplicaciones: { [key: string]: string } = {
  // Mercado y Competencia
  "Penetración de Mercado": "Mide tu visibilidad y cuota de participación actual frente a tus competidores directos.",
  "Diferenciación Competitiva": "Evalúa qué tan única y atractiva es tu propuesta de valor comparada con la de otras opciones en el mercado.",
  "Análisis de Precios y Ofertas": "Compara tus precios, descuentos y condiciones comerciales con los de la competencia para medir tu atractivo.",
  "Reputación Online y Reseñas": "Mide la percepción pública de tu marca a través de comentarios, reseñas y valoraciones de usuarios.",

  // Plataforma y UX
  "Rendimiento Web (Core Web Vitals)": "Analiza la velocidad de carga, interactividad y estabilidad visual de tu página, factores clave para Google y la experiencia de usuario.",
  "Experiencia de Usuario (UX/UI)": "Evalúa la facilidad, intuición y agrado con que los usuarios pueden navegar e interactuar con tu sitio web.",
  "Accesibilidad (WCAG)": "Comprueba si tu web es usable por personas con diversas capacidades (visuales, auditivas, motoras), ampliando tu audiencia potencial.",
  "Seguridad del Frontend (HTTPS)": "Verifica que la conexión a tu sitio sea segura (use candado HTTPS) para proteger los datos de tus usuarios y generar confianza.",

  // Contenido y Autoridad
  "Estrategia de Contenidos y SEO": "Mide si tu contenido está bien posicionado en buscadores y si responde a las preguntas que tus clientes se hacen.",
  "Engagement en Redes Sociales": "Evalúa el nivel de interacción (likes, comentarios, compartidos) que tu marca genera en plataformas sociales.",
  "Calidad y Relevancia del Contenido": "Analiza si la información que publicas es valiosa, útil y de alta calidad para tu público objetivo.",
  "Autoridad de Dominio (Backlinks)": "Mide la popularidad y confianza de tu web en base a la cantidad y calidad de enlaces que recibe desde otras páginas.",

  // Crecimiento y Adquisición
  "Generación de Leads": "Evalúa tu capacidad para capturar datos de contacto de potenciales clientes a través de formularios, suscripciones, etc.",
  "Análisis de Datos y Funnels": "Mide si estás utilizando herramientas de analítica para entender el comportamiento de tus usuarios y optimizar tus embudos de venta.",
  "Estrategia de Email Marketing": "Analiza cómo usas el correo electrónico para comunicarte, nutrir prospectos y fidelizar clientes existentes.",
  "Uso de Publicidad Paga (SEM)": "Evalúa si estás invirtiendo en publicidad online (Google Ads, Social Ads) y el retorno de dicha inversión."
};

const CoordenadaGauge: React.FC<{ coordenada: CoordenadaClave }> = ({ coordenada }) => {
  const color = '#0057FF'; // kapi-azul-electrico
  const explicacion = coordenadaExplicaciones[coordenada.titulo] || "Esta es una coordenada personalizada generada por la IA.";

  return (
    <div className="flex items-center justify-between bg-kapi-negro-suave p-3 rounded-lg">
      <div className="flex items-center">
        <span className="text-kapi-gris-claro text-sm font-medium">{coordenada.titulo}</span>
        <Info 
          className="w-4 h-4 text-kapi-gris-medio ml-2 cursor-pointer"
          data-tooltip-id="coordenada-tooltip"
          data-tooltip-content={explicacion}
        />
      </div>
      <div className="flex items-center">
        <span className="font-bold text-lg mr-3 text-kapi-gris-claro">
          {coordenada.score}
        </span>
        <div className="w-16 h-2 bg-kapi-gris-oscuro rounded-full">
          <div 
            className="h-2 rounded-full"
            style={{ width: `${coordenada.score}%`, backgroundColor: color, transition: 'width 1.5s ease-out' }}
          ></div>
        </div>
      </div>
      <Tooltip id="coordenada-tooltip" className="max-w-xs z-50" />
    </div>
  );
};

export default CoordenadaGauge;
