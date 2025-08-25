import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Inicialización de clientes
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- Prompt Clave para Gemini (v4.0 - Salida JSON Estable) ---
const createGenerativePrompt = (url: string | undefined, context?: string) => {
    let customContext = '';
    if (context) {
        customContext = `Para este análisis, enfócate SOLAMENTE en los siguientes pilares: ${context}.`;
    }

    return `
    Actúas como un analista experto en marketing digital y estratega de negocio para PYMES. 
    Tu MISIÓN es analizar la URL de un cliente (${url || 'No proporcionada'}) y devolver un informe ESTRUCTURADO.
    ${customContext}

    REGLAS DE SALIDA:
    - Tu respuesta DEBE ser un único bloque de código JSON, sin texto introductorio, ni explicaciones, ni 
    - El JSON debe ser válido.
    - La estructura del JSON debe ser la siguiente:
    {
      "puntajeGeneral": number,
      "pilares": [
        {
          "id": string,
          "titulo": string,
          "score": number,
          "queEs": string,
          "porQueImporta": string,
          "coordenadas": [
            {
              "id": string,
              "titulo": string,
              "score": number,
              "diagnostico": string,
              "planDeAccion": [
                { "titulo": "Lo Hago Yo", "pasos": [string] },
                { "titulo": "Lo hago yo con Kapi", "pasos": [string] },
                { "titulo": "Lo Hace Kapi", "pasos": [string] }
              ]
            }
          ]
        }
      ]
    }

    Ahora, basándote en el análisis de la URL, genera el informe en este formato JSON.
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
        finalReportObject = {
            puntajeGeneral: 0,
            pilares: [{
                id: "pilar-consulta",
                titulo: "Consulta Solicitada",
                score: 100,
                queEs: "Has solicitado una consulta directa con nuestro equipo.",
                porQueImporta: "Nos pondremos en contacto contigo a la brevedad para entender tus necesidades y ofrecerte una solución a medida.",
                coordenadas: []
            }]
        }
    } else {
        let finalPrompt;
        if (mode === 'auto' || mode === 'custom') {
            finalPrompt = createGenerativePrompt(url, context);
        } else { // manual
            finalPrompt = `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: "${context}". Por favor, genera un plan de acción detallado en formato JSON, con una estructura similar a: { "diagnostico": "...", "planDeAccion": [{ "titulo": "Recomendación 1", "pasos": ["..."] }] }`;
        }

        const result = await model.generateContent(finalPrompt);
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
            finalReportObject = {
                puntajeGeneral: 0,
                pilares: [{
                    id: "pilar-manual",
                    titulo: "Plan de Acción Manual",
                    score: 100,
                    queEs: `Análisis basado en tu descripción: "${context}"`,
                    porQueImporta: "Este es un plan generado específicamente para resolver el problema que describiste.",
                    coordenadas: [{
                        id: "coord-manual-1",
                        titulo: "Diagnóstico y Plan",
                        score: 100,
                        diagnostico: iaReport.diagnostico || "Análisis generado por IA.",
                        planDeAccion: iaReport.planDeAccion || []
                    }]
                }]
            };
        } else {
            finalReportObject = iaReport;
        }
    }

    // Guardar en Supabase (sin esperar)
    supabase.from('diagnostics').insert([
      { url: url, mode: mode, report_content: JSON.stringify(finalReportObject), context: context },
    ]).then(({ error }) => {
      if (error) {
        console.error('[API /api/diagnose] Error saving to Supabase:', error);
      }
    });

    // Devolver el OBJETO, no el string.
    return NextResponse.json({ analysis: finalReportObject }, { status: 200 });

  } catch (error) {
    console.error('[API /api/diagnose] Error en la ruta:', error);
    const errorResponse = {
      error: (error as Error).message || 'Ocurrió un error desconocido en el servidor.'
    }
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
