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
const createGenerativePrompt = (url: string | undefined) => `
Actúas como un analista experto en marketing digital y estratega de negocio para PYMES. 
Tu MISIÓN es analizar la URL de un cliente (${url || 'No proporcionada'}) y devolver un informe ESTRUCTURADO.

REGLAS DE SALIDA:
- Tu respuesta DEBE ser un único bloque de código JSON, sin texto introductorio, ni explicaciones, ni la palabra 
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode, context } = body;

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    let finalPrompt;

    switch (mode) {
      case 'auto':
      case 'custom':
        finalPrompt = createGenerativePrompt(url);
        break;

      case 'manual':
        finalPrompt = `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: "${context}". Por favor, genera un plan de acción detallado en formato JSON, con una estructura similar a: { "diagnostico": "...", "planDeAccion": [{ "titulo": "Recomendación 1", "pasos": ["..."] }] }`;
        break;

      case 'consulta':
        const consultaResponse = {
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
        return NextResponse.json({ analysis: JSON.stringify(consultaResponse) }, { status: 200 });
      
      default:
        return NextResponse.json({ error: 'Modo no válido' }, { status: 400 });
    }
    
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    let analysisText = response.text();

    // Limpieza para asegurar que la respuesta sea solo el JSON
    analysisText = analysisText.replace(/^```json\n/, '').replace(/\n```$/, '').trim();
    analysisText = analysisText.replace(/Apollo\.io/g, '').trim();

    supabase.from('diagnostics').insert([
      { url: url, mode: mode, report_content: analysisText, context: context },
    ]).then(({ error }) => {
      if (error) {
        console.error('[API /api/diagnose] Error saving to Supabase:', error);
      }
    });

    return NextResponse.json({ analysis: analysisText }, { status: 200 });

  } catch (error) {
    console.error('[API /api/diagnose] Error llamando a la API de Gemini:', error);
    return NextResponse.json({ error: 'Error al contactar el servicio de IA.' }, { status: 500 });
  }
}
