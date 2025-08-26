'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import React from 'react';

export default function CaptchaProvider({ children }: { children: React.ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
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