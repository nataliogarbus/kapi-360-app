import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react';
import "./globals.css";
import CaptchaProvider from "@/components/CaptchaProvider";
import GoogleTagManager from "@/components/GoogleTagManager";
import Script from "next/script";
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kapi 360 - Diagnóstico Digital IA",
  description: "Obtén un análisis 360° de tu presencia digital impulsado por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-kapi-negro-suave text-kapi-gris-medio`}>
        <Suspense fallback={null}>
          <GoogleTagManager />
        </Suspense>
        <CaptchaProvider>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Header />
          {children}
          <Footer />
        </CaptchaProvider>
        {/* Pipedrive Leadbooster Script */}
        <Script id="pipedrive-leadbooster-config" strategy="beforeInteractive">
          {`
            window.pipedriveLeadboosterConfig = {
              base: 'leadbooster-chat.pipedrive.com',
              companyId: 14585997,
              playbookUuid: '37088c09-695a-43f7-b818-74bc701801e6',
              version: 2
            };
            (function() {
              var w = window;
              if (w.LeadBooster) {
                console.warn('LeadBooster already exists');
              } else {
                w.LeadBooster = {
                  q: [],
                  on: function(n, h) { this.q.push({ t: 'o', n: n, h: h }); },
                  trigger: function(n) { this.q.push({ t: 't', n: n }); },
                };
              }
            })();
          `}
        </Script>
        <Script src="https://leadbooster-chat.pipedrive.com/assets/loader.js" async strategy="lazyOnload" />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
