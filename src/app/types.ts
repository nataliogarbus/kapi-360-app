// Estructura del Reporte de IA
export interface Pillar {
  pilar: string;
  puntaje: number;
  resumen: string;
  analisis_profundo: string;
  plan_de_accion: string[];
}

export interface Reporte {
  puntaje_general: number;
  pilares: Pillar[];
  resumen_ejecutivo: string;
  plan_de_accion_3_niveles: {
    lo_hago_yo: string[];
    lo_hace_kapi_con_mi_equipo: string[];
    lo_hace_kapi: string[];
  };
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
