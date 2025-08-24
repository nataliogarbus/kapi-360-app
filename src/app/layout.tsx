import './globals.css';
import type { Metadata } from "next";

// ATENCIÓN: Este es un layout de depuración ultra-mínimo.

export const metadata: Metadata = {
  title: "Kapi 360 - Debug",
  description: "Debug session.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}