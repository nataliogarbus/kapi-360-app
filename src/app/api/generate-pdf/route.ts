import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  try {
    const { urlToPrint } = await request.json();

    if (!urlToPrint) {
      return new NextResponse('URL a imprimir no proporcionada', { status: 400 });
    }

    // Asegurarse de que la URL tiene el parámetro para la vista de impresión
    const printUrl = new URL(urlToPrint);
    printUrl.searchParams.set('view', 'pdf');

    const browser = await puppeteer.launch({ 
      headless: true,
      // Opciones para entornos de serverless como Vercel
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();

    await page.goto(printUrl.toString(), { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="propuesta-kopruch.pdf"',
      },
    });

  } catch (error) {
    console.error('Error al generar el PDF:', error);
    return new NextResponse('Error al generar el PDF', { status: 500 });
  }
}
