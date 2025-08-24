import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapi 360 - Debug',
  description: 'Debugging CSS issue',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-red-500">{children}</body>
    </html>
  );
}