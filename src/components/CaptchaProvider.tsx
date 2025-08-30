'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import React from 'react';

export default function CaptchaProvider({ children }: { children: React.ReactNode }) {
  // Si estamos en entorno de desarrollo, no renderizamos el proveedor de reCAPTCHA.
  if (process.env.NODE_ENV === 'development') {
    console.log("Modo desarrollo: reCAPTCHA deshabilitado.");
    return <>{children}</>;
  }

  // El resto de la lógica solo se ejecuta en producción
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    // Este error ahora solo aparecerá en producción si la variable no está configurada
    return (
        <>
            <div className="bg-red-900 text-white p-4 text-center fixed top-0 left-0 w-full z-50">
                Error: La clave de sitio de reCAPTCHA no está configurada en las variables de entorno.
            </div>
            {children}
        </>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}