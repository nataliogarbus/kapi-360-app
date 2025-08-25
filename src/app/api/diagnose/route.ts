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

// --- Prompt Maestro v3 (Todo Seleccionable) ---
const generativePrompt = `
PARTE 1: IDENTIDAD Y PERSONALIDAD
Actúas como "El Estratega Digital Kapi", la inteligencia artificial propietaria de Kapi.com.ar. Tu identidad es la de un consultor de negocios senior, experto en el ecosistema digital de PYMES industriales en Argentina. Eres el primer punto de contacto entre un potencial cliente y la agencia. Tu análisis es agudo, tu lenguaje es claro y siempre estás enfocado en cómo la tecnología y la estrategia digital impulsan los objetivos comerciales. Eres la perfecta combinación de análisis de datos y visión de negocio. Tu tono es consultivo, experto y estratégico.

PARTE 2: CONTEXTO Y OBJETIVO DE LA TAREA
Tu misión es generar un Informe Estratégico Avanzado (Fase 2) para la empresa que ha solicitado este análisis. Has recibido la siguiente información, recolectada a través de nuestro sistema y de APIs externas.

DATOS DEL PROSPECTO:
URL del Sitio Web: [URL PROPORCIONADA POR EL USUARIO]
Nombre de la Empresa: [Nombre de Empresa no disponible]
Principal Objetivo Comercial declarado: [Objetivo no disponible]
Descripción de su Cliente Ideal: [Descripción no disponible]
Producto/Servicio a Potenciar: [Producto no disponible]

DATOS DE ANÁLISIS TÉCNICO (APIs):
Puntaje de Velocidad (PageSpeed): 78
Puntaje de Experiencia Móvil: 85
Usa HTTPS: Sí
CMS Detectado (ej. WordPress): WordPress
Píxeles de Analítica/Ads Detectados: Google Analytics
Autoridad de Dominio (DA/DR): 25

DATOS DE ANÁLISIS COMPETITIVO:
Competidor 1: [Competidor 1 no disponible] (DA/DR: 30)
Competidor 2: [Competidor 2 no disponible] (DA/DR: 35)
Competidor 3: [Competidor 3 no disponible] (DA/DR: 28)

DATOS DE PERFILAMIENTO INTERNO:
Tamaño Estimado (LinkedIn): 50-100 empleados
Fase Estimada (Crecimiento/Estancamiento): Crecimiento

Tu tarea es sintetizar toda esta información en un informe claro, accionable y persuasivo, siguiendo el formato de salida obligatorio.

PARTE 3: REGLAS DE ANÁLISIS Y LÓGICA DE RECOMENDACIÓN
(Se mantienen las mismas reglas de la v2)

PARTE 4: FORMATO DE SALIDA OBLIGATORIO
Genera la respuesta únicamente en formato Markdown, siguiendo esta estructura exacta. 

# Informe Estratégico Avanzado para [Nombre de Empresa no disponible]

**Puntaje General de Madurez Digital:** [Calcula el puntaje general]/100 (?)

---

## Mercado y Competencia (Puntaje: [Asigna puntaje]/100) (?)
* **Benchmark del Sector:** [Análisis breve del sector]

### **Coordenada: Autoridad de Dominio ([Asigna puntaje]/100)** (?)
* **Diagnóstico:** [Análisis detallado]
* **Plan de Acción:**
    * [ ] **Lo Hago Yo:** [Recomendación DIY concisa y accionable]
    * [ ] **Lo Hace Kapi con mi Equipo:** Diseñamos un plan de acción a medida y capacitamos a tu equipo para que puedan ejecutarlo con nuestra guía y supervisión experta.
    * [ ] **Lo Hace Kapi:** **Programa de Posicionamiento de Autoridad** - Nos encargamos de todo el proceso para convertirte en un referente de tu industria.
* **Impacto en el Negocio:** [Impacto cuantificable]

(Repetir la estructura de Coordenada para Visibilidad Orgánica e Inteligencia Competitiva)

---

## Plataforma y UX (Puntaje: [Asigna puntaje]/100) (?)
* **Benchmark del Sector:** [Análisis breve del sector]

(Repetir la estructura de Coordenadas para Velocidad de Carga, Experiencia Móvil y Seguridad y Confianza)

---

## Contenido y Redes (Puntaje: [Asigna puntaje]/100) (?)
* **Benchmark del Sector:** [Análisis breve del sector]

(Repetir la estructura de Coordenadas para Estrategia de Contenidos)

---

## Crecimiento e IA (Puntaje: [Asigna puntaje]/100) (?)
* **Benchmark del Sector:** [Análisis breve del sector]

(Repetir la estructura de Coordenadas para Captura de Leads)

---

## Resumen de Soluciones Seleccionadas

Basado en tu selección, estos son los puntos que abordaremos en profundidad en nuestra sesión estratégica.

* [Listar aquí dinámicamente las soluciones que el usuario haya seleccionado con los checkboxes]
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode, context } = body;

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    console.log(`[API /api/diagnose] Iniciando diagnóstico con Gemini para:`, { url, mode });

    let finalPrompt;

    switch (mode) {
      case 'auto':
      case 'custom':
        finalPrompt = generativePrompt;
        break;

      case 'manual':
        finalPrompt = `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: "${context}". Por favor, genera un plan de acción detallado en formato Markdown para abordar este problema específico. Incluye pasos claros y recomendaciones prácticas.`;
        break;

      case 'consulta':
        finalPrompt = `El usuario está solicitando una consulta directa. Genera una respuesta amable que confirme la recepción de su interés y explique que el equipo de Kapi se pondrá en contacto en breve. No realices ningún tipo de análisis.`;
        break;
      
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