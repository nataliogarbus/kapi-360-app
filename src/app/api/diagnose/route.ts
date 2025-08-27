import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { REPORT_STRUCTURE } from '@/app/report-structure';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { ipAddress } from '@vercel/edge';
import sanitizeHtml from 'sanitize-html';

// --- CONFIGURACIÓN DE SERVICIOS ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- CONFIGURACIÓN DE RATE LIMITER ---
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
  prefix: '@kapi/ratelimit',
});

// --- FUNCIONES HELPERS DE OBTENCIÓN DE DATOS ---

const getHtmlSummary = async (html: string): Promise<string | null> => {
  if (!html || html.trim() === '') return null;
  try {
    const prompt = `Tu tarea es actuar como un extractor de información. Analiza el siguiente código HTML y extrae un resumen conciso en formato de texto plano. El resumen debe incluir: la propuesta de valor principal, los servicios o productos clave ofrecidos, las llamadas a la acción (CTAs) explícitas y el público objetivo si se puede inferir. Sé breve y directo.\n\nHTML:\n${html.substring(0, 30000)}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error al generar resumen del HTML:", error);
    return "Error al procesar el HTML.";
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

const getApolloData = async (domain: string): Promise<any | null> => {
  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) {
    console.error("FATAL: APOLLO_API_KEY no está configurada en el entorno.");
    return null;
  }
  const cleanDomain = domain.replace(/^www\./, '');
  const api_url = `https://api.apollo.io/v1/organizations/enrich?api_key=${apiKey}&domain=${cleanDomain}`;
  try {
    const response = await fetch(api_url, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } });
    if (!response.ok) {
      console.warn(`ADVERTENCIA: La llamada a la API de Apollo.io para el dominio '${cleanDomain}' falló con estado: ${response.status}`);
      return null;
    }
    const data = await response.json();
    if (data && data.organization) {
         console.log(`ÉXITO: Datos de organización de Apollo.io encontrados para '${cleanDomain}'.`);
         return data.organization;
    } else {
        console.log(`INFO: La llamada a Apollo.io para '${cleanDomain}' fue exitosa pero no se encontró información de la organización.`);
        return null;
    }
  } catch (error) {
    console.error(`ERROR CRÍTICO: Falló la llamada a la API de Apollo.io para '${cleanDomain}'.`, error);
    return null;
  }
};

// --- LÓGICA DE GENERACIÓN DE PROMPT Y ANÁLISIS ---

const createGenerativePrompt = (url: string | undefined, pageSpeedScore: number | null, htmlSummary: string | null, apolloData: any | null, pillar: any) => {
    let promptContext = `**DATOS DE CONTEXTO PARA TU ANÁLISIS:**\n- URL Analizada: ${url || 'No proporcionada'}`;
    if (pageSpeedScore !== null) promptContext += `\n- Google PageSpeed Score (Móvil): ${pageSpeedScore}/100`;
    if (apolloData) promptContext += `\n- Datos de la empresa (de Apollo.io): ${JSON.stringify(apolloData, null, 2)}`;
    if (htmlSummary) promptContext += `\n- Resumen del contenido del sitio:\n${htmlSummary}`;

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

const generatePillarAnalysis = async (pillar: any, url: string | undefined, pageSpeedScore: number | null, htmlSummary: string | null, apolloData: any | null): Promise<any> => {
    try {
        const prompt = createGenerativePrompt(url, pageSpeedScore, htmlSummary, apolloData, pillar);
        const result = await model.generateContent(prompt);
        const cleanedText = result.response.text().replace(/```json\n|```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error(`Error al generar análisis para el pilar '${pillar.titulo}':`, error);
        return pillar; // Devolver la estructura original del pilar en caso de error
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

    let pageSpeedData: any = null, apolloData: any = null, htmlSummary: string | null = null;

    if (mode === 'auto' || mode === 'custom') {
        const scrapeUrl = `${req.nextUrl.origin}/api/scrape`;
        let scrapedHtml: string | null = null;
        try {
            const scrapeResponse = await fetch(scrapeUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
            if (scrapeResponse.ok) scrapedHtml = (await scrapeResponse.json()).html;
        } catch (e) { console.error("Error en scraping:", e); }

        htmlSummary = await getHtmlSummary(scrapedHtml || '');

        [apolloData, pageSpeedData] = await Promise.all([ getApolloData(url!), getPageSpeedData(url!) ]);
    }

    const pageSpeedScore = pageSpeedData ? Math.round(pageSpeedData.lighthouseResult.categories.performance.score * 100) : null;
    
    const pilaresAAnalizar = context ? REPORT_STRUCTURE.pilares.filter(p => context.includes(p.titulo)) : REPORT_STRUCTURE.pilares;

    const analysisPromises = pilaresAAnalizar.map(pilar => 
        generatePillarAnalysis(pilar, url, pageSpeedScore, htmlSummary, apolloData)
    );
    const analyzedPilares = await Promise.all(analysisPromises);

    const totalScore = analyzedPilares.reduce((acc, p) => acc + (p.score || 0), 0);
    const puntajeGeneral = analyzedPilares.length > 0 ? Math.round(totalScore / analyzedPilares.length) : 0;

    const analysisObject = { puntajeGeneral, pilares: analyzedPilares };

    return NextResponse.json({ 
        analysis: analysisObject,
        debugData: { apollo: apolloData, pageSpeed: pageSpeedData, htmlSummary: htmlSummary }
    }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
    console.error('[API /api/diagnose] Error en la ruta:', errorMessage);
    return NextResponse.json({ error: `Error en el servidor: ${errorMessage}` }, { status: 500 });
  }
}