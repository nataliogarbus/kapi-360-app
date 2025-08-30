export type CoordenadaClave = {
  titulo: string;
  score: number;
};

export type PlanDeAccion = {
  loHagoYo: string[];
  loHaceKapiConMiEquipo: string[];
  loHaceKapi: string[];
};

export type Pilar = {
  id: string;
  titulo: string;
  score: number;
  queEs: string;
  porQueImporta: string;
  coordenadasClave: CoordenadaClave[];
  planDeAccion: PlanDeAccion;
};

export type Reporte = {
  puntajeGeneral: number;
  pilares: Pilar[];
};

export interface ReportSectionProps {
  report: Reporte | null;
  isLoading: boolean;
}

// --- Tipos para el Blog ---
export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content?: string; // El contenido es opcional, solo se carga en la página del post
}
