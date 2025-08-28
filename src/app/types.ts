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
