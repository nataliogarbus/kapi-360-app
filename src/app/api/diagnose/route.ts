import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { REPORT_STRUCTURE } from '@/app/report-structure';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { ipAddress } from '@vercel/edge';

// --- CONFIGURACIÓN DE SERVICIOS ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// --- CONFIGURACIÓN DE RATE LIMITER ---
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
  prefix: '@kapi/ratelimit',
});

// --- FUNCIONES HELPERS DE OBTENCIÓN DE DATOS ---

const extractStructuredDataFromHtml = async (html: string): Promise<any | null> => {
  if (!html || html.trim() === '') return null;
  try {
    const prompt = `
      Tu tarea es actuar como un robot extractor de datos. Analiza el siguiente código HTML y devuelve únicamente un objeto JSON válido con la siguiente estructura. No incluyas explicaciones ni texto fuera del JSON.

      ESTRUCTURA JSON REQUERIDA:
      {
        "contact_form_present": boolean,
        "newsletter_form_present": boolean,
        "social_media_links": string[],
        "key_services": string[],
        "value_proposition": string
      }

      INSTRUCCIONES DETALLADAS:
      - "contact_form_present": true si encuentras un formulario de contacto (con campos como nombre, email, mensaje), false si no.
      - "newsletter_form_present": true si encuentras un formulario específico para suscripción a newsletter, false si no.
      - "social_media_links": Un array con las URLs completas a perfiles de redes sociales (Facebook, Instagram, LinkedIn, etc.) que encuentres. Si no hay, devuelve un array vacío [].
      - "key_services": Un array de strings con los principales productos o servicios que ofrece el sitio.
      - "value_proposition": Una frase corta que resuma la principal propuesta de valor o eslogan del sitio.

      Ahora, analiza el siguiente HTML y devuelve el objeto JSON:

      HTML:
      ${html.substring(0, 40000)}
    `;
    const result = await model.generateContent(prompt);
    const cleanedText = result.response.text().replace(/\
```json\n|\
```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error al extraer datos estructurados del HTML:", error);
    return null;
  }
};

const getPageSpeedData = async (url: string): Promise<any | null> => {
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    console.warn("Omitiendo análisis de PageSpeed: Clave de API no encontrada.");
    return null;
  }
  let fullUrl = url;
  if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
    fullUrl = `https://${fullUrl}`;
  }
  const api_url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(fullUrl)}&key=${apiKey}&strategy=MOBILE`;
  try {
    const response = await fetch(api_url);
    if (!response.ok) throw new Error(`Respuesta no exitosa de la API de PageSpeed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos de PageSpeed:", error);
    return null;
  }
};

// --- LÓGICA DE GENERACIÓN DE PROMPT Y ANÁLISIS ---

const createGenerativePrompt = (url: string | undefined, pageSpeedScore: number | null, hasHttps: boolean, structuredData: any | null, pillar: any) => {
    let promptContext = `**DATOS DE CONTEXTO PARA TU ANÁLISIS:**\n- URL Analizada: ${url || 'No proporcionada'}`;
    promptContext += `\n- Usa HTTPS: ${hasHttps ? 'Sí' : 'No'}`;
    if (pageSpeedScore !== null) promptContext += `\n- Google PageSpeed Score (Móvil): ${pageSpeedScore}/100`;
    
    if (structuredData) {
        promptContext += `\n- Propuesta de Valor: ${structuredData.value_proposition || 'No detectada'}`;
        promptContext += `\n- Servicios Clave: ${structuredData.key_services?.join(', ') || 'No detectados'}`;
        promptContext += `\n- Formulario de Contacto: ${structuredData.contact_form_present ? 'Sí' : 'No'}`;
        promptContext += `\n- Formulario de Newsletter: ${structuredData.newsletter_form_present ? 'Sí' : 'No'}`;
        promptContext += `\n- Redes Sociales: ${structuredData.social_media_links?.join(', ') || 'No detectadas'}`;
    }

    const goldenExample = `**EJEMPLO DE ANÁLISIS DE ALTA CALIDAD:**
{
  "id": "rendimiento_web",
  "titulo": "Rendimiento Web (Core Web Vitals)",
  "score": 75,
  "diagnostico": "El puntaje de PageSpeed (75/100) es aceptable pero tiene un claro margen de mejora...",
  "planDeAccion": [ { "titulo": "Lo Hago Yo", "pasos": ["Comprimir imágenes."] } ]
}`;

    const task = `**TAREA Y FORMATO DE SALIDA:**\nTu misión es analizar la información del contexto para rellenar la siguiente estructura JSON para el pilar "${pillar.titulo}". Debes seguir el estilo, la profundidad y la calidad del 'EJEMPLO DE ANÁLISIS DE ALTA CALIDAD' proporcionado.`;
    const jsonStructure = `**ESTRUCTURA JSON A RELLENAR:**\n${JSON.stringify(pillar, null, 2)}`;

    const personaAndRules = `**IDENTIDAD Y REGLAS DE ORO:**
1.  **IDENTIDAD:** Actúas como "El Estratega Digital Kapi"...
2.  **FORMATO:** Tu única salida debe ser un bloque de código JSON válido...
3.  **COMPLETITUD:** DEBES rellenar TODOS los campos...
4.  **PROHIBIDO SER GENÉRICO:** Queda estrictamente prohibido usar frases vagas...
5.  **PUNTUACIONES REALISTAS:** Asigna un 'score' entre 0 y 100 basado en los datos. No dejes todo en 0.
6.  **MANEJO DE DATOS FALTANTES:** Si los datos de PageSpeed o Apollo no están disponibles, indícalo claramente en el diagnóstico de la coordenada correspondiente (ej: "No se pudieron obtener los datos de PageSpeed para un análisis completo.") y asigna un 'score' de -1 para indicar que no es aplicable. En esos casos, basa tu análisis únicamente en el contenido del sitio web.`;

    return `${promptContext}\n\n---\n\n${goldenExample}\n\n---\n\n${task}\n\n${jsonStructure}\n\n---\n\n${personaAndRules}`;
};

const generatePillarAnalysis = async (pillar: any, url: string | undefined, pageSpeedScore: number | null, hasHttps: boolean, structuredData: any | null): Promise<any> => {
    try {
        const prompt = createGenerativePrompt(url, pageSpeedScore, hasHttps, structuredData, pillar);
        const result = await model.generateContent(prompt);
        const cleanedText = result.response.text().replace(/\
```json\n|\
```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error(`Error al generar análisis para el pilar '${pillar.titulo}':`, error);
        return pillar;
    }
};

// --- RUTA PRINCIPAL DE LA API ---
export async function POST(req: NextRequest) {
  try {
    const ip = ipAddress(req) || '127.0.0.1';
    const body = await req.json();
    const { recaptchaToken } = body;

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      const params = new URLSearchParams();
      params.append('secret', recaptchaSecret);
      params.append('response', recaptchaToken);
      params.append('remoteip', ip);
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
          return NextResponse.json({ error: 'Verificación de humanidad fallida.' }, { status: 403 });
      }
    }

    const { success } = await ratelimit.limit(ip);
    if (!success) return new NextResponse('Too many requests.', { status: 429 });

    const { mode, url, context } = body;

    if ((mode === 'auto' || mode === 'custom') && !url) {
        return NextResponse.json({ error: 'La URL es requerida.' }, { status: 400 });
    }
    if (!mode) return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    if (mode === 'consulta') return NextResponse.json({ analysis: { puntajeGeneral: 0, pilares: [] }, debugData: {} });

    let pageSpeedData: any = null, structuredData: any = null;
    const hasHttps = url ? url.startsWith('https://') : false;

    if (mode === 'auto' || mode === 'custom') {
        const scrapeUrl = `${req.nextUrl.origin}/api/scrape`;
        let scrapedHtml: string | null = null;
        try {
            const scrapeResponse = await fetch(scrapeUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
            if (scrapeResponse.ok) scrapedHtml = (await scrapeResponse.json()).html;
        } catch (e) { console.error("Error en scraping:", e); }

        [pageSpeedData, structuredData] = await Promise.all([
            getPageSpeedData(url!),
            extractStructuredDataFromHtml(scrapedHtml || '')
        ]);
    }

    const pageSpeedScore = pageSpeedData ? Math.round(pageSpeedData.lighthouseResult.categories.performance.score * 100) : null;
    
    const pilaresAAnalizar = context ? REPORT_STRUCTURE.pilares.filter(p => context.includes(p.titulo)) : REPORT_STRUCTURE.pilares;

    const analysisPromises = pilaresAAnalizar.map(pilar => 
        generatePillarAnalysis(pilar, url, pageSpeedScore, hasHttps, structuredData)
    );
    const analyzedPilares = await Promise.all(analysisPromises);

    const scores = analyzedPilares.map(p => p.score).filter(s => s >= 0);
    const puntajeGeneral = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    const analysisObject = { puntajeGeneral, pilares: analyzedPilares };

    return NextResponse.json({ 
        analysis: analysisObject,
        debugData: {
            apollo: { status: "disabled", data: null },
            pageSpeed: { status: pageSpeedData ? "success" : "error", data: pageSpeedData },
            structuredHtmlData: { status: structuredData ? "success" : "error", data: structuredData }
        }
    }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
    console.error('[API /api/diagnose] Error en la ruta:', errorMessage);
    return NextResponse.json({ error: `Error en el servidor: ${errorMessage}` }, { status: 500 });
  }
}