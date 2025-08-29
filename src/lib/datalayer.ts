// src/lib/datalayer.ts

// Definimos un tipo para la estructura de nuestros eventos
export type GTMEvent = {
  event: string;
  [key: string]: any; // Permite otras propiedades de cualquier tipo
};

/**
 * Envía un evento al dataLayer de Google Tag Manager.
 * @param event - El objeto del evento a enviar.
 */
export const pushEvent = (event: GTMEvent) => {
  // Comprobación de seguridad para evitar errores en el lado del servidor (SSR)
  // donde el objeto `window` no existe.
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  } else {
    console.log('GTM dataLayer not available.', event);
  }
};
