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


// --- FUNCIONES HELPERS DE OBTENCIÓN DE DATOS ---
const getPageSpeedScore = async (url: string): Promise<number | null> => {
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
    if (!response.ok) {
      throw new Error(`Respuesta no exitosa de la API de PageSpeed: ${response.status}`);
    }
    const data = await response.json();
    return Math.round(data.lighthouseResult.categories.performance.score * 100);
  } catch (error) {
    console.error("Error al obtener datos de PageSpeed:", error);
    return null;
  }
};

const getApolloData = async (domain: string): Promise<any | null> => {
  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) {
    console.warn("Omitiendo enriquecimiento de Apollo: Clave de API no encontrada.");
    return null;
  }
  
  const cleanDomain = domain.replace(/^www\./, '');
  const api_url = `https://api.apollo.io/v1/organizations/enrich?api_key=${apiKey}&domain=${cleanDomain}`;

  try {
    const response = await fetch(api_url, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
    if (!response.ok) {
      throw new Error(`Respuesta no exitosa de la API de Apollo.io: ${response.status}`);
    }
    const data = await response.json();
    return data.organization || null;
  } catch (error) {
    console.error("Error al obtener datos de Apollo.io:", error);
    return null;
  }
};

// --- PROMPT ENGINEERING ---
const createGenerativePrompt = (url: string | undefined, pageSpeedScore: number | null, scrapedHtml: string | null, apolloData: any | null, context?: string) => {
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
    if (apolloData) {
        realDataCtx += `
- Datos de la empresa (de Apollo.io):`;
        if (apolloData.industry) realDataCtx += `
  - Industria: ${apolloData.industry}`
        if (apolloData.estimated_num_employees) realDataCtx += `
  - Empleados (Estimado): ${apolloData.estimated_num_employees}`
        if (apolloData.city && apolloData.country) realDataCtx += `
  - Ubicación: ${apolloData.city}, ${apolloData.country}`
        if (apolloData.keywords && apolloData.keywords.length > 0) realDataCtx += `
  - Palabras Clave del Negocio: ${apolloData.keywords.join(', ')}`
        if (apolloData.current_technologies && apolloData.current_technologies.length > 0) {
            realDataCtx += `
  - Tecnologías Detectadas: ${apolloData.current_technologies.map((tech: any) => tech.name).join(', ')}`
        }
    }
    if (scrapedHtml) {
        const truncatedHtml = scrapedHtml.substring(0, 15000);
        realDataCtx += `
- Contenido HTML del sitio:

${truncatedHtml}
`;
    }

    const personaAndRules = `
    **PERSONA Y OBJETIVO:**
    Actúas como "El Estratega Digital Kapi", un consultor de negocios senior, experto en el ecosistema digital de PYMES. Tu objetivo es entregar un informe que aporte un valor inmenso e inmediato al cliente. Analiza la URL proporcionada (${url || 'No proporcionada'}) y los datos de contexto.

    **DATOS DE CONTEXTO PARA TU ANÁLISIS:**${realDataCtx}

    **REGLAS DE ORO PARA LA RESPUESTA:**
    1.  **FORMATO:** Tu única salida debe ser un bloque de código JSON válido, sin explicaciones ni texto adicional fuera del JSON.
    2.  **COMPLETITUD:** DEBES rellenar TODOS los campos de la estructura JSON, incluyendo los arrays de "pasos" dentro de cada "planDeAccion".
    3.  **PROHIBIDO SER GENÉRICO:** Queda estrictamente prohibido usar frases vagas como "se necesita un análisis" o "requiere investigación". Debes ofrecer un diagnóstico específico y accionable. Si un dato falta, haz una inferencia razonable (ej: "Dado que no se detecta un blog, se infiere que la estrategia de contenido es limitada.").
    4.  **PLANES DE ACCIÓN DETALLADOS:** Para CADA coordenada, el campo "planDeAccion" DEBE contener un array con los 3 tipos de planes. CADA plan ("Lo Hago Yo", etc.) DEBE contener un array de "pasos" con 2 o 3 acciones concretas y claras.
    5.  **TONO:** Profesional, directo, confiado y orientado a resultados.

    **ESTRUCTURA JSON A RELLENAR:**
    `;

    return `${personaAndRules}${JSON.stringify(structureToAnalyze, null, 2)}

Genera el informe JSON completo ahora.`;
}

// --- RUTA PRINCIPAL DE LA API ---
export async function POST(req: NextRequest) {
  try {
    const ip = ipAddress(req) || '127.0.0.1';
    const body = await req.json();
    const { recaptchaToken } = body;

    // --- VERIFICACIÓN DE RECAPTCHA ---
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      const params = new URLSearchParams();
      params.append('secret', recaptchaSecret);
      params.append('response', recaptchaToken);
      params.append('remoteip', ip);
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
      });
      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
          console.warn('Verificación de reCAPTCHA fallida o puntaje bajo:', recaptchaData);
          return NextResponse.json({ error: 'Verificación de humanidad fallida.' }, { status: 403 });
      }
    } else {
      console.warn("Clave secreta de reCAPTCHA no configurada. Omitiendo verificación.");
    }

    // --- CHEQUEO DE RATE LIMIT ---
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
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
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
        // --- OBTENCIÓN DE DATOS ENRIQUECIDOS ---
        const scrapeUrl = `${req.nextUrl.origin}/api/scrape`;
        let scrapedHtml: string | null = null;
        try {
            const scrapeResponse = await fetch(scrapeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url }),
            });
            if (scrapeResponse.ok) {
                scrapedHtml = (await scrapeResponse.json()).html;
            } else {
                console.warn(`El scraping de la URL ${url} falló con estado: ${scrapeResponse.status}`);
            }
        } catch (scrapeError) {
            console.error("Error llamando a la API de scraping interna:", scrapeError);
        }

        const [apolloData, pageSpeedScore] = await Promise.all([
            getApolloData(url!),
            getPageSpeedScore(url!)
        ]);

        finalPrompt = createGenerativePrompt(url, pageSpeedScore, scrapedHtml, apolloData, context);

    } else { // manual
        finalPrompt = createGenerativePrompt(undefined, null, null, null, context);
    }

    console.log("--- INICIO PROMPT PARA IA ---", finalPrompt, "--- FIN PROMPT ---");

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