import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { REPORT_STRUCTURE } from '@/app/report-structure'; // Importamos la estructura

// ... (inicialización de clientes sin cambios)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


const createGenerativePrompt = (url: string | undefined, context?: string) => {
    let structureToAnalyze = REPORT_STRUCTURE;
    if (context) {
        const selectedPillars = context.split(', ');
        structureToAnalyze = {
            ...REPORT_STRUCTURE,
            pilares: REPORT_STRUCTURE.pilares.filter(p => selectedPillars.includes(p.titulo))
        };
    }

    return `
    Actúas como un analista experto en marketing digital y estratega de negocio para PYMES. 
    Tu MISIÓN es analizar la URL de un cliente (${url || 'No proporcionada'}) y devolver un informe ESTRUCTURADO en formato JSON.

    Debes rellenar los campos de contenido para la siguiente estructura. No cambies los IDs ni los títulos, solo añade tu análisis en los campos correspondientes (queEs, porQueImporta, diagnostico, score, y los pasos de los planes de acción).

    Estructura a rellenar:
    ${JSON.stringify(structureToAnalyze, null, 2)}

    REGLAS DE SALIDA:
    - Tu respuesta DEBE ser un único bloque de código JSON que complete la estructura proporcionada.
    - No incluyas explicaciones ni texto fuera del JSON.
    `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode, context } = body;

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    let finalPrompt;
    // ... (lógica de switch sin cambios significativos, ahora pasa el context en custom)
    switch (mode) {
      case 'auto':
      case 'custom':
        finalPrompt = createGenerativePrompt(url, context);
        break;
      // ... otros cases
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
    
    const finalReportObject = JSON.parse(analysisText);

    // (Opcional pero recomendado) Fusionar con la estructura local para asegurar consistencia

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
    const errorResponse = {
      error: (error as Error).message || 'Ocurrió un error desconocido en el servidor.'
    }
    return NextResponse.json(errorResponse, { status: 500 });
  }
}