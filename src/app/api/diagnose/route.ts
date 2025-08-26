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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- CONFIGURACIÓN DE RATE LIMITER ---
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 solicitudes por 60 segundos
  analytics: true,
  prefix: '@kapi/ratelimit',
});


// --- FUNCIONES HELPERS ---
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

const createGenerativePrompt = (url: string | undefined, pageSpeedScore: number | null, scrapedHtml: string | null, context?: string) => {
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
        realDataCtx += `
- Google PageSpeed Score (Móvil): ${pageSpeedScore}/100`;
    }
    if (scrapedHtml) {
        // Truncamos el HTML para no exceder el límite de tokens del prompt
        const truncatedHtml = scrapedHtml.substring(0, 20000);
        realDataCtx += `
- Contenido HTML del sitio:

${truncatedHtml}
`;
    }

    return `
    Actúas como un analista experto en marketing digital. Tu misión es analizar la URL de un cliente (${url || 'No proporcionada'}) y devolver un informe JSON.
    Aquí tienes datos adicionales para enriquecer tu análisis:${realDataCtx}

    REGLAS OBLIGATORIAS:
    1. Tu respuesta DEBE ser un único bloque de código JSON válido.
    2. DEBES rellenar TODOS los campos de la estructura, basando tu análisis en los datos reales proporcionados cuando sea posible.

    ESTRUCTURA A RELLENAR:
    ${JSON.stringify(structureToAnalyze, null, 2)}

    Genera el informe JSON completo ahora.
    `;
}

// --- RUTA PRINCIPAL DE LA API ---
export async function POST(req: NextRequest) {
  try {
    // --- VERIFICACIÓN DE RECAPTCHA ---
    const body = await req.json();
    const { recaptchaToken } = body;
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
        console.error("La clave secreta de reCAPTCHA no está configurada.");
        return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
    });
    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.warn('Verificación de reCAPTCHA fallida o puntaje bajo:', recaptchaData);
        return NextResponse.json({ error: 'Verificación de humanidad fallida.' }, { status: 403 });
    }

    // --- CHEQUEO DE RATE LIMIT ---
    const ip = ipAddress(req) || '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    if (!success) {
      return new NextResponse('Too many requests.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toUTCString(),
        },
      });
    }

    // --- SANEAMIENTO Y VALIDACIÓN DE ENTRADA ---
    const { mode } = body;
    const url = body.url ? sanitizeHtml(body.url, { allowedTags: [], allowedAttributes: {} }).trim() : undefined;
    const context = body.context ? sanitizeHtml(body.context, { allowedTags: [], allowedAttributes: {} }).trim() : undefined;

    if (mode === 'auto' || mode === 'custom') {
        if (!url) {
            return NextResponse.json({ error: 'La URL es requerida y no puede estar vacía.' }, { status: 400 });
        }
        let fullUrl = url;
        if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
            fullUrl = `https://${fullUrl}`;
        }
        try {
            new URL(fullUrl);
        } catch (e) {
            return NextResponse.json({ error: 'El formato de la URL proporcionada no es válido.' }, { status: 400 });
        }
    }

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    if (mode === 'consulta') {
        return NextResponse.json({ analysis: JSON.stringify({ puntajeGeneral: 0, pilares: [{ id: "pilar-consulta", titulo: "Consulta Solicitada", score: 100, queEs: "Has solicitado una consulta directa.", porQueImporta: "Nos pondremos en contacto contigo.", coordenadas: [] }] }) }, { status: 200 });
    }

    let finalPrompt;
    if (mode === 'auto' || mode === 'custom') {
        // --- LLAMADA AL SCRAPER INTERNO ---
        const scrapeUrl = `${req.nextUrl.origin}/api/scrape`;
        let scrapedHtml: string | null = null;
        try {
            const scrapeResponse = await fetch(scrapeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url }),
            });
            if (scrapeResponse.ok) {
                const scrapeResult = await scrapeResponse.json();
                scrapedHtml = scrapeResult.html;
            } else {
                console.warn(`El scraping de la URL ${url} falló con estado: ${scrapeResponse.status}`);
            }
        } catch (scrapeError) {
            console.error("Error llamando a la API de scraping interna:", scrapeError);
        }

        const pageSpeedScore = await getPageSpeedScore(url!);
        finalPrompt = createGenerativePrompt(url, pageSpeedScore, scrapedHtml, context);

    } else { // manual
        finalPrompt = createGenerativePrompt(undefined, null, null, context);
    }

    // --- PUNTO DE CONTROL PARA DEBUG ---
    console.log("DEBUG: Enviando siguiente prompt a Gemini:", finalPrompt);

    const result = await model.generateContent(finalPrompt!); 
    const response = await result.response;
    const analysisText = response.text();

    const cleanedText = analysisText.replace(/```json\n|```/g, '').trim();

    let analysisObject;
    try {
        analysisObject = JSON.parse(cleanedText);
    } catch (parseError) {
        console.error("Error al parsear JSON de la IA:", parseError);
        return NextResponse.json({ error: "La respuesta de la IA no es un JSON válido." }, { status: 500 });
    }

    return NextResponse.json({ analysis: analysisObject }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Un error desconocido ocurrió.";
    console.error('[API /api/diagnose] Error en la ruta:', errorMessage);
    return NextResponse.json({ error: `Error en el servidor: ${errorMessage}` }, { status: 500 });
  }
}