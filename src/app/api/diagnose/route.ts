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

// --- Prompt Base (Markdown) ---
const createGenerativePrompt = (url: string | undefined) => `
Actúa como un analista experto en marketing digital y estratega de negocio para PYMES. 
Analiza la URL de un cliente (${url || 'No proporcionada'}) y genera un informe detallado en formato Markdown.
El informe debe estar bien estructurado, con títulos, listas y negritas.
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
        finalPrompt = `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: "${context}". Por favor, genera un plan de acción detallado en formato Markdown para abordar este problema específico. Incluye pasos claros y recomendaciones prácticas.`;
        break;

      case 'consulta':
        return NextResponse.json({ analysis: "# Consulta Solicitada\n\nGracias por tu interés. Nos pondremos en contacto contigo a la brevedad." }, { status: 200 });
      
default:
        return NextResponse.json({ error: 'Modo no válido' }, { status: 400 });
    }
    
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const analysisText = response.text();

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