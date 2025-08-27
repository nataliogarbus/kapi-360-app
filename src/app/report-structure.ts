export const REPORT_STRUCTURE = {
  puntajeGeneral: 0,
  pilares: [
    {
      id: 'mercado_competencia',
      titulo: 'Mercado y Competencia',
      score: 0,
      queEs: '',
      porQueImporta: '',
      coordenadasClave: [
        { id: 'penetracion_mercado', titulo: 'Penetración de Mercado' },
        { id: 'diferenciacion_competitiva', titulo: 'Diferenciación Competitiva' },
        { id: 'analisis_precios', titulo: 'Análisis de Precios y Ofertas' },
        { id: 'reputacion_online', titulo: 'Reputación Online y Reseñas' }
      ],
      planDeAccion: {
        loHagoYo: [],
        loHaceKapiConMiEquipo: [],
        loHaceKapi: []
      }
    },
    {
      id: 'plataforma_ux',
      titulo: 'Plataforma y UX',
      score: 0,
      queEs: '',
      porQueImporta: '',
      coordenadasClave: [
        { id: 'rendimiento_web', titulo: 'Rendimiento Web (Core Web Vitals)' },
        { id: 'experiencia_usuario', titulo: 'Experiencia de Usuario (UX/UI)' },
        { id: 'accesibilidad_web', titulo: 'Accesibilidad (WCAG)' },
        { id: 'seguridad_frontend', titulo: 'Seguridad del Frontend (HTTPS)' }
      ],
      planDeAccion: {
        loHagoYo: [],
        loHaceKapiConMiEquipo: [],
        loHaceKapi: []
      }
    },
    {
      id: 'contenido_autoridad',
      titulo: 'Contenido y Autoridad',
      score: 0,
      queEs: '',
      porQueImporta: '',
      coordenadasClave: [
        { id: 'estrategia_contenidos_seo', titulo: 'Estrategia de Contenidos y SEO' },
        { id: 'engagement_redes', titulo: 'Engagement en Redes Sociales' },
        { id: 'calidad_contenido', titulo: 'Calidad y Relevancia del Contenido' },
        { id: 'link_building', titulo: 'Autoridad de Dominio (Backlinks)' }
      ],
      planDeAccion: {
        loHagoYo: [],
        loHaceKapiConMiEquipo: [],
        loHaceKapi: []
      }
    },
    {
      id: 'crecimiento_adquisicion',
      titulo: 'Crecimiento y Adquisición',
      score: 0,
      queEs: '',
      porQueImporta: '',
      coordenadasClave: [
        { id: 'generacion_leads', titulo: 'Generación de Leads' },
        { id: 'analisis_datos_funnels', titulo: 'Análisis de Datos y Funnels' },
        { id: 'email_marketing', titulo: 'Estrategia de Email Marketing' },
        { id: 'publicidad_paga', titulo: 'Uso de Publicidad Paga (SEM)' }
      ],
      planDeAccion: {
        loHagoYo: [],
        loHaceKapiConMiEquipo: [],
        loHaceKapi: []
      }
    }
  ]
};