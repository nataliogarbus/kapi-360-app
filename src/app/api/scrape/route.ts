import { NextRequest, NextResponse } from 'next/server';

/**
 * API route para hacer scraping del contenido HTML de una URL.
 * Recibe una petición POST con un cuerpo JSON que contiene una "url".
 */
export async function POST(req: NextRequest) {
  try {
    // Leer una `url` del cuerpo (body) JSON de la petición.
    const body = await req.json();
    const { url } = body;

    // Validar que la URL no esté vacía.
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return NextResponse.json({ error: 'La URL es requerida y no puede estar vacía.' }, { status: 400 });
    }

    // Normalizar la URL para asegurar que tenga un protocolo.
    let fullUrl = url;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }

    // Usar `fetch` para obtener el contenido HTML de esa `url`.
    const response = await fetch(fullUrl, {
      headers: {
        // Incluir un User-Agent y cabecera Accept para simular un navegador.
        'User-Agent': 'KapiDigitalBot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    // Si la petición `fetch` no es exitosa (response.ok es falso), lanzar un error.
    if (!response.ok) {
      throw new Error(`Error al obtener la URL: ${response.status} ${response.statusText}`);
    }

    // Si la petición es exitosa, devolver un objeto JSON con el html y la url final.
    const finalUrl = response.url;
    const html = await response.text();
    return NextResponse.json({ html, finalUrl }, { status: 200 });

  } catch (error) {
    // Si ocurre cualquier otro error, devolver un JSON con una clave `error` y un estado 500.
    console.error('[API /api/scrape] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    return NextResponse.json({ error: `Error en el servidor: ${errorMessage}` }, { status: 500 });
  }
}