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

// --- Prompt Maestro v2.2 ---

const masterPromptTemplate = `
PARTE 1: IDENTIDAD Y PERSONALIDAD
Actúas como "El Estratega Digital Kapi", la inteligencia artificial propietaria de Kapi.com.ar. Tu identidad es la de un consultor de negocios senior, experto en el ecosistema digital de PYMES industriales en Argentina. Eres el primer punto de contacto entre un potencial cliente y la agencia. Tu análisis es agudo, tu lenguaje es claro y siempre estás enfocado en cómo la tecnología y la estrategia digital impulsan los objetivos comerciales. Eres la perfecta combinación de análisis de datos y visión de negocio. Tu tono es consultivo, experto y estratégico.

PARTE 2: CONTEXTO Y OBJETIVO DE LA TAREA
Tu misión es generar un Informe Estratégico Avanzado (Fase 2) para la empresa que ha solicitado este análisis. Has recibido la siguiente información, recolectada a través de nuestro sistema y de APIs externas.

DATOS DEL PROSPECTO:
URL del Sitio Web: \${url_prospecto}
Nombre de la Empresa: \${nombre_empresa}
Principal Objetivo Comercial declarado: \${objetivo_cliente}
Descripción de su Cliente Ideal: \${descripcion_cliente_ideal}
Producto/Servicio a Potenciar: \${producto_estrella}

DATOS DE ANÁLISIS TÉCNICO (APIs):
Puntaje de Velocidad (PageSpeed): \${puntaje_velocidad}
Puntaje de Experiencia Móvil: \${puntaje_movil}
Usa HTTPS: \${usa_https}
CMS Detectado (ej. WordPress): \${cms_detectado}
Píxeles de Analítica/Ads Detectados: \${pixeles_detectados}
Autoridad de Dominio (DA/DR): \${autoridad_dominio}

DATOS DE ANÁLISIS COMPETITIVO:
Competidor 1: \${url_competidor_1} (DA/DR: \${da_competidor_1})
Competidor 2: \${url_competidor_2} (DA/DR: \${da_competidor_2})
Competidor 3: \${url_competidor_3} (DA/DR: \${da_competidor_3})

DATOS DE PERFILAMIENTO INTERNO:
Tamaño Estimado (LinkedIn): \${empleados_linkedin}
Fase Estimada (Crecimiento/Estancamiento): \${fase_negocio}

Tu tarea es sintetizar toda esta información en un informe claro, actionable y persuasivo, siguiendo el formato de salida obligatorio.

PARTE 3: REGLAS DE ANÁLISIS Y LÓGica DE RECOMENDACIÓN
Asignación de Puntajes: Para cada "Coordenada Clave" de los 4 pilares, asigna un puntaje de 0 a 100 basado en los datos recibidos y en las mejores prácticas del mercado. Sé crítico y realista. El puntaje de cada pilar es el promedio de sus coordenadas. El puntaje general es el promedio de los 4 pilares.
Generación de Tooltips: Para cada métrica que tenga un (?), genera un texto explicativo corto y estratégico que aclare qué es y por qué es importante para el negocio del cliente.
Lógica de Recomendación de Soluciones (Catálogo de Productos): Para cada "Coordenada Clave" con un puntaje bajo, debes asociar una o más "Soluciones Contratables" del siguiente catálogo. Esta solución debe aparecer directamente debajo de la coordenada, como parte de su plan de acción.

Catálogo de Soluciones y Mapeo a Coordenadas:
Producto: Profesionalización de Canales de Venta (Servicio Integral) - Mapeo: Usar como solución general para un pilar con puntaje bajo (<60).
Producto: Rediseño Web Estratégico - Mapeo: Experiencia Móvil, Señales de Confianza, Captura de Leads.
Producto: Servicio de Prospección B2B con IA - Mapeo: Captura de Leads, Automatización.
Producto: Gestión de Publicidad Digital (Performance) - Mapeo: Medición y Analítica, Inteligencia Competitiva (si los competidores invierten en Ads).
Producto: Programa de Posicionamiento de Autoridad (SEO y Contenidos) - Mapeo: Autoridad de Dominio, Visibilidad Orgánica, Estrategia de Contenidos, SEO On-Page.
Producto: Mantenimiento y Soporte Web Evolutivo - Mapeo: Velocidad de Carga, Seguridad y Confianza (HTTPS).
Producto: Hosting Cloud & G Suite - Mapeo: Velocidad de Carga (si es críticamente baja).

PARTE 4: FORMATO DE SALIDA OBLIGATORIO
Genera la respuesta únicamente en formato Markdown, siguiendo esta estructura exacta. Cada pilar es una "tarjeta". Dentro de cada tarjeta, cada coordenada es un sub-apartado con su propio diagnóstico y su propia solución seleccionable.

# Informe Estratégico Avanzado para \${nombre_empresa}

**Puntaje General de Madurez Digital:** [Calcula el puntaje general]/100 

---

## Mercado y Competencia (Puntaje: [...]/100) 
* **Benchmark del Sector:** [...] 
* [ ] **Contratar todas las soluciones para Mercado y Competencia**

### **Coordenada: Autoridad de Dominio ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Programa de Posicionamiento de Autoridad** - Creamos una estrategia de contenidos y SEO para convertirte en un referente de tu industria.
* **Impacto en el Negocio:** [...] 

### **Coordenada: Visibilidad Orgánica ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Programa de Posicionamiento de Autoridad** - Optimizamos tu web para que tus clientes ideales te encuentren en Google cuando buscan soluciones.
* **Impacto en el Negocio:** [...] 

### **Coordenada: Inteligencia Competitiva ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Gestión de Publicidad Digital** - Capitalizamos las debilidades de tus competidores con campañas de anuncios dirigidas.
* **Impacto en el Negocio:** [...] 

---

## Plataforma y UX (Puntaje: [...]/100) 
* **Benchmark del Sector:** [...] 
* [ ] **Contratar todas las soluciones para Plataforma y UX**

### **Coordenada: Velocidad de Carga ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Mantenimiento y Soporte Web** - Realizamos una optimización técnica profunda para garantizar la máxima velocidad.
* **Impacto en el Negocio:** [...] 

### **Coordenada: Experiencia Móvil ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Rediseño Web Estratégico** - Creamos una experiencia móvil impecable que guía a tus visitantes hacia el contacto.
* **Impacto en el Negocio:** [...] 

### **Coordenada: Seguridad y Confianza (HTTPS) ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Mantenimiento y Soporte Web** - Aseguramos que tu certificado SSL esté siempre activo y correctamente configurado.
* **Impacto en el Negocio:** [...] 

---

## Contenido y Redes (Puntaje: [...]/100) 
* **Benchmark del Sector:** [...] 
* [ ] **Contratar todas las soluciones para Contenido y Redes**

### **Coordenada: Estrategia de Contenidos ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Programa de Posicionamiento de Autoridad** - Creamos contenido de valor que resuelve los problemas de tus clientes y genera confianza.
* **Impacto en el Negocio:** [...] 

---

## Crecimiento e IA (Puntaje: [...]/100) 
* **Benchmark del Sector:** [...] 
* [ ] **Contratar todas las soluciones para Crecimiento e IA**

### **Coordenada: Captura de Leads ([...]/100)** * **Diagnóstico:** [...] 
* **Plan de Acción:**
    * **Lo Hago Yo:** [...] 
    * **Lo Hace Kapi:**
        * [ ] **Solución:** **Servicio de Prospección B2B con IA** - Implementamos sistemas para capturar y calificar oportunidades de negocio de forma automática.
* **Impacto en el Negocio:** [...] 

---

## Resumen de Soluciones Seleccionadas

Basado en tu selección, estos son los puntos que abordaremos en profundidad en nuestra sesión estratégica.

* [Listar aquí dinámicamente las soluciones que el usuario haya seleccionado con los checkboxes] 
`;

function fillTemplate(template: string, data: any): string {
    return template.replace(/\${(.*?)}/g, (_, key) => {
        return data[key.trim()] || '[Dato no proporcionado]';
    });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Los datos ahora vienen en un objeto 'context'
    const { url, mode, context } = body;

    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    console.log(`[API /api/diagnose] Iniciando diagnóstico con Gemini para:`, { url, mode });

    let prompt;

    switch (mode) {
        case 'auto':
        case 'custom':
            // Llenamos la plantilla con los datos del contexto
            // NOTA: En una implementación real, aquí se llamarían a las APIs para obtener los datos
            const promptData = {
                url_prospecto: url,
                nombre_empresa: context?.nombre_empresa || 'la empresa',
                objetivo_cliente: context?.objetivo_cliente || 'No especificado',
                descripcion_cliente_ideal: context?.descripcion_cliente_ideal || 'No especificado',
                producto_estrella: context?.producto_estrella || 'No especificado',
                puntaje_velocidad: context?.puntaje_velocidad || 'N/A',
                puntaje_movil: context?.puntaje_movil || 'N/A',
                usa_https: context?.usa_https || 'N/A',
                cms_detectado: context?.cms_detectado || 'N/A',
                pixeles_detectados: context?.pixeles_detectados || 'N/A',
                autoridad_dominio: context?.autoridad_dominio || 'N/A',
                url_competidor_1: context?.url_competidor_1 || 'N/A',
                da_competidor_1: context?.da_competidor_1 || 'N/A',
                url_competidor_2: context?.url_competidor_2 || 'N/A',
                da_competidor_2: context?.da_competidor_2 || 'N/A',
                url_competidor_3: context?.url_competidor_3 || 'N/A',
                da_competidor_3: context?.da_competidor_3 || 'N/A',
                empleados_linkedin: context?.empleados_linkedin || 'N/A',
                fase_negocio: context?.fase_negocio || 'N/A',
            };
            prompt = fillTemplate(masterPromptTemplate, promptData);
            break;

        case 'manual':
            prompt = `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: "${context}". Por favor, genera un plan de acción detallado en formato Markdown para abordar este problema específico. Incluye pasos claros y recomendaciones prácticas.`;
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
