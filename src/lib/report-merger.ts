import { Reporte, Pilar } from '@/app/types';
import { REPORT_STRUCTURE } from '@/app/report-structure';

export const mergeWithStructure = (aiResponse: any): Reporte => {
  if (!aiResponse || !Array.isArray(aiResponse.pilares)) {
    console.warn("Respuesta de la IA inválida o sin pilares. Usando estructura por defecto.");
    return {
        puntajeGeneral: 0,
        pilares: REPORT_STRUCTURE.pilares.map(pilarTemplate => ({
            ...pilarTemplate,
            score: 0,
            queEs: "Información no disponible.",
            porQueImporta: "Información no disponible.",
            coordenadasClave: pilarTemplate.coordenadasClave.map(coordTemplate => ({
                ...coordTemplate,
                score: 0,
            })),
            planDeAccion: {
                loHagoYo: [],
                loHaceKapiConMiEquipo: [],
                loHaceKapi: [],
            }
        }))
    };
  }

  const finalReport: Reporte = {
    puntajeGeneral: aiResponse.puntajeGeneral || 0,
    pilares: REPORT_STRUCTURE.pilares.map(pilarTemplate => {
      const aiPilar = aiResponse.pilares.find((p: any) => p.id === pilarTemplate.id);

      if (!aiPilar) {
        return {
            ...pilarTemplate,
            score: 0,
            queEs: "Información no generada.",
            porQueImporta: "Información no generada.",
             coordenadasClave: pilarTemplate.coordenadasClave.map(coordTemplate => ({
                ...coordTemplate,
                score: 0,
            })),
            planDeAccion: {
                loHagoYo: [],
                loHaceKapiConMiEquipo: [],
                loHaceKapi: [],
            }
        };
      }

      const pilarResult: Pilar = {
        ...pilarTemplate,
        ...aiPilar,
        coordenadasClave: pilarTemplate.coordenadasClave.map(coordTemplate => {
          const aiCoordenada = aiPilar.coordenadasClave?.find((c: any) => c.titulo === coordTemplate.titulo);
          return {
            ...coordTemplate,
            score: aiCoordenada?.score || 0,
          };
        }),
        planDeAccion: {
          loHagoYo: aiPilar.planDeAccion?.loHagoYo || [],
          loHaceKapiConMiEquipo: aiPilar.planDeAccion?.loHaceKapiConMiEquipo || [],
          loHaceKapi: aiPilar.planDeAccion?.loHaceKapi || [],
        }
      };
      return pilarResult;
    })
  };
  return finalReport;
}
