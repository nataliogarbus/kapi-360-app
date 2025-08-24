'use client';

// Este es un componente de prueba mínimo para diagnosticar errores de hidratación.
// No importa ningún componente personalizado.

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Hola Mundo de Depuración</h1>
        <p className="mt-2 text-lg text-gray-300">
          Si ves este mensaje de forma estable, el problema está en uno de los componentes personalizados (Header, Footer, etc.).
        </p>
      </div>
    </main>
  );
}
