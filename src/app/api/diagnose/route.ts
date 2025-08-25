import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { REPORT_STRUCTURE } from '@/app/report-structure';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const getPageSpeedScore = async (url: string): Promise<number | null> => {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    console.warn("No se proporcionó la clave de API de PageSpeed. Omitiendo análisis de velocidad.");
    return null;
  }
  let fullUrl = url;
  if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
    fullUrl = `https://${fullUrl}`;
  }
  const api_url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(fullUrl)}&key=${apiKey}&strategy=MOBILE`;

  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error en API de PageSpeed: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    const data = await response.json();
    const score = data.lighthouseResult.categories.performance.score * 100;
    return Math.round(score);
  } catch (error) {
    console.error("Error al obtener datos de PageSpeed:", error);
    throw error;
  }
};

const createGenerativePrompt = (url: string | undefined, pageSpeedScore: number | null, context?: string) => {
    let structureToAnalyze = REPORT_STRUCTURE;
    if (context && context.trim() !== '') {
        const selectedPillars = context.split(', ');
        structureToAnalyze = {
            ...REPORT_STRUCTURE,
            pilares: REPORT_STRUCTURE.pilares.filter(p => selectedPillars.includes(p.titulo))
        };
    }
    let realDataCtx = "";
    if (pageSpeedScore !== null) {
        realDataCtx = `
DATOS REALES OBTENIDOS DE APIS:
- Google PageSpeed Score (Móvil): ${pageSpeedScore}/100
`;
    }
    return `
    Actúas como un analista experto en marketing digital. Tu misión es analizar la URL de un cliente (${url || 'No proporcionada'}) y devolver un informe JSON.
    ${realDataCtx}
    REGLAS OBLIGATORIAS:
    1. Tu respuesta DEBE ser un único bloque de código JSON válido.
    2. DEBES rellenar TODOS los campos de la estructura, basando tu análisis en los datos reales proporcionados cuando sea posible.

    ESTRUCTURA A RELLENAR:
    ${JSON.stringify(structureToAnalyze, null, 2)}

    Genera el informe JSON completo ahora.
    `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode, context } = body;

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    if (mode === 'consulta') {
        return NextResponse.json({ analysis: JSON.stringify({ puntajeGeneral: 0, pilares: [{ id: "pilar-consulta", titulo: "Consulta Solicitada", score: 100, queEs: "Has solicitado una consulta directa.", porQueImporta: "Nos pondremos en contacto contigo.", coordenadas: [] }] }) }, { status: 200 });
    }

    let finalPrompt;
    if (mode === 'auto' || mode === 'custom') {
        const pageSpeedScore = await getPageSpeedScore(url);
        finalPrompt = createGenerativePrompt(url, pageSpeedScore, context);
    } else { // manual
        finalPrompt = `Actúa como un consultor experto. Un cliente describe un problema: \"${context}\". Genera un plan de acción en JSON: { \"diagnostico\": \"...\", \"planDeAccion\": [{ \"titulo\": \"...\", \"pasos\": [\"...\"] }] }`;
    }

    const result = await model.generateContent(finalPrompt!); 
    const response = await result.response;
    const analysisText = response.text();

    // MODO DEBUG: Devolvemos el texto crudo de la IA
    return NextResponse.json({ analysis: analysisText }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
    console.error('[API /api/diagnose] Error en la ruta:', errorMessage);
    return NextResponse.json({ error: `Error en el servidor: ${errorMessage}` }, { status: 500 });
  }
}