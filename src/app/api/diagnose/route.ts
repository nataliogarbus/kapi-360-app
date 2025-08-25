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

// --- Lógica de PageSpeed Insights ---
const getPageSpeedScore = async (url: string): Promise<number | null> => {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    console.warn("No se proporcionó la clave de API de PageSpeed. Omitiendo análisis de velocidad.");
    return null;
  }
  const api_url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=MOBILE`;

  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      console.error(`Error al llamar a PageSpeed API: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    const score = data.lighthouseResult.categories.performance.score * 100;
    return Math.round(score);
  } catch (error) {
    console.error("Error al obtener datos de PageSpeed:", error);
    return null;
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
        realDataCtx = `\nDATOS REALES OBTENIDOS DE APIS:\n- Google PageSpeed Score (Móvil): ${pageSpeedScore}/100\n`;
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

    let finalReportObject;

    if (mode === 'consulta') {
        finalReportObject = { puntajeGeneral: 0, pilares: [{ id: "pilar-consulta", titulo: "Consulta Solicitada", score: 100, queEs: "Has solicitado una consulta directa.", porQueImporta: "Nos pondremos en contacto contigo.", coordenadas: [] }] }
    } else {
        let finalPrompt;
        if (mode === 'auto' || mode === 'custom') {
            const pageSpeedScore = await getPageSpeedScore(url);
            finalPrompt = createGenerativePrompt(url, pageSpeedScore, context);
        } else { // manual
            finalPrompt = `Actúa como un consultor experto. Un cliente describe un problema: \"${context}\". Genera un plan de acción en JSON: { \"diagnostico\": \"...\", \"planDeAccion\": [{ \"titulo\": \"...\", \"pasos\": [\"...\"] }] }`;
        }

        const result = await model.generateContent(finalPrompt!); 
        const response = await result.response;
        let analysisText = response.text();

        const startIndex = analysisText.indexOf('{');
        const endIndex = analysisText.lastIndexOf('}');
        if (startIndex === -1 || endIndex === -1) {
            throw new Error("La IA no devolvió un JSON válido.");
        }
        analysisText = analysisText.substring(startIndex, endIndex + 1);
        const iaReport = JSON.parse(analysisText);

        if (mode === 'manual') {
            finalReportObject = { puntajeGeneral: 0, pilares: [{ id: "pilar-manual", titulo: "Plan de Acción Manual", score: 100, queEs: `Análisis basado en: \"${context}\"`, porQueImporta: "Plan generado para resolver tu problema.", coordenadas: [{ id: "coord-manual-1", titulo: "Diagnóstico y Plan", score: 100, diagnostico: iaReport.diagnostico || "Análisis generado.", planDeAccion: iaReport.planDeAccion || [] }] }] };
        } else {
            finalReportObject = iaReport;
        }
    }

    supabase.from('diagnostics').insert([
      { url: url, mode: mode, report_content: JSON.stringify(finalReportObject), context: context },
    ]).then(({ error }) => {
      if (error) {
        console.error('[API /api/diagnose] Error saving to Supabase:', error);
      }
    });

    return NextResponse.json({ analysis: finalReportObject }, { status: 200 });

  } catch (error) {
    console.error('[API /api/diagnose] Error en la ruta:', error);
    const errorResponse = { error: (error as Error).message || 'Ocurrió un error desconocido.' }
    return NextResponse.json(errorResponse, { status: 500 });
  }
}