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

// --- Prompt v2.2 ---
const generativePrompt = `
Actúa como un analista experto en marketing digital y estratega de negocio para PYMES. Genera un informe detallado y accionable en formato Markdown basado en la URL del cliente: ${url}. El tono debe ser profesional, directo y orientado a KPIs. **La estructura del informe DEBE seguir este formato anidado EXACTO, incluyendo todos los títulos, puntajes, subtítulos en negrita y guiones:**

**Puntaje General:** [Puntaje de 0 a 100]/100

## Mercado y Competencia (Puntaje: [Puntaje de 0 a 100]/100)
**Qué es:** [Explicación concisa del pilar]
**Por qué importa:** [Explicación del impacto en el negocio]
**Coordenadas Clave:**
- **[Nombre de Métrica 1]:** [Puntaje de 0 a 100]/100
- **[Nombre de Métrica 2]:** [Puntaje de 0 a 100]/100
- **[Nombre de Métrica 3]:** [Puntaje de 0 a 100]/100
- **[Nombre de Métrica 4]:** [Puntaje de 0 a 100]/100
**Plan de Acción:**
- **Lo Hago Yo:**
  - [Paso 1 a realizar por el usuario]
  - [Paso 2 a realizar por el usuario]
- **Lo Hace Kapi con mi Equipo:**
  - [Paso 1 en colaboración]
  - [Paso 2 en colaboración]
- **Lo Hace Kapi:**
  - [Paso 1 que ejecuta Kapi]
  - [Paso 2 que ejecuta Kapi]

## Plataforma y UX (Puntaje: [Puntaje de 0 a 100]/100)
(Repetir la misma estructura anidada que el pilar anterior)

## Contenido y Redes (Puntaje: [Puntaje de 0 a 100]/100)
(Repetir la misma estructura anidada que el pilar anterior)

## Crecimiento e IA (Puntaje: [Puntaje de 0 a 100]/100)
(Repetir la misma estructura anidada que el pilar anterior)

(Cualquier texto adicional o resumen puede ir aquí, después de los 4 pilares estructurados.)
`;


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode, context } = body;

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    console.log(`[API /api/diagnose] Iniciando diagnóstico con Gemini para:`, { url, mode });

    let prompt;

    switch (mode) {
      case 'auto':
      case 'custom':
        prompt = generativePrompt.replace('${url}', url || '[URL no proporcionada]');
        break;

      case 'manual':
        prompt = `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: \"${context}\". Por favor, genera un plan de acción detallado en formato Markdown para abordar este problema específico. Incluye pasos claros y recomendaciones prácticas.`;
        break;

      case 'consulta':
        prompt = `El usuario está solicitando una consulta directa. Genera una respuesta amable que confirme la recepción de su interés y explique que el equipo de Kapi se pondrá en contacto en breve. No realices ningún tipo de análisis.`;
        break;
      
      default:
        return NextResponse.json({ error: 'Modo no válido' }, { status: 400 });
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Guardado en Supabase
    supabase.from('diagnostics').insert([
      { url: url, mode: mode, report_content: analysisText, context: context },
    ]).then(({ error }) => {
      if (error) {
        console.error('[API /api/diagnose] Error saving to Supabase:', error);
      } else {
        console.log(`[API /api/diagnose] Report for ${url || 'consulta/manual'} saved to Supabase.`);
      }
    });

    return NextResponse.json({ analysis: analysisText }, { status: 200 });

  } catch (error) {
    console.error('[API /api/diagnose] Error llamando a la API de Gemini:', error);
    return NextResponse.json({ error: 'Error al contactar el servicio de IA. Por favor, verifica la clave de API y vuelve a intentarlo.' }, { status: 500 });
  }
}