'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import React from 'react';

export default function CaptchaProvider({ children }: { children: React.ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Si no hay clave, simplemente renderizamos los hijos sin el proveedor.
  // El hook en el formulario fallará, pero la app no se romperá.
  // Se mostrará una advertencia en la consola del navegador.
  if (!recaptchaKey) {
    console.warn("ADVERTENCIA: La clave de Google ReCaptcha no está configurada. El envío de formularios fallará.");
    return <>{children}</>;
  }

  // Si hay clave, envolvemos la aplicación con el proveedor para que funcione.
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
