// Estructura del Reporte de IA (v2.2)
export interface CoordenadaClave {
  titulo: string;
  score: number;
}

export interface Pilar {
  titulo: string;
  score: number;
  queEs: string;
  porQueImporta: string;
  coordenadasClave: CoordenadaClave[];
  planDeAccion: {
    loHagoYo: string[];
    loHaceKapiConMiEquipo: string[];
    loHaceKapi: string[];
  };
}

export interface Reporte {
  puntajeGeneral: number;
  pilares: Pilar[];
  resumenFinal?: string; // Opcional, por si la IA añade un resumen al final
}

export interface CoordenadaClave {
  titulo: string;
  score: number;
}

// Estructura para los Posts del Blog
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
}

export interface PostData extends Post {
  content: string;
}

// Estructura de datos para un Caso de Éxito
export interface CaseStudyData {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string; // URL completa del video de YouTube para el fondo
    selfHostedVideo?: string; // Path a un video local, ej: 'video.mp4'
  };
  client: {
    name: string;
    description: string;
  };
  challenge: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    points: string[];
  };
  results: {
    title: string;
    metrics: { value: string; label: string }[];
  };
  testimonial: {
    text: string;
    author: string;
    role: string;
    image: string; // solo el nombre del archivo, ej: 'cecilia.png'
  };
  services: string[];
  videos: { src: string; title: string }[];
  images: { src: string; alt: string }[];
  basePath: string; // ej: '/images/casos-exito/emama'
}
