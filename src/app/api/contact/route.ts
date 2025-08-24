import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, company, city, phone, message, newsletter, register } = await request.json();

    // Validar que las variables de entorno estén configuradas
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ error: 'Faltan credenciales SMTP en las variables de entorno.' }, { status: 500 });
    }

    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string, 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Contenido del correo
    const mailOptions = {
      from: process.env.SMTP_USER, // O un correo específico para el remitente
      to: 'hola@kapi.com.ar',
      subject: `Nuevo mensaje de contacto de ${name} (Kapi 360)`, 
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'N/A'}</p>
        <p><strong>Ciudad:</strong> ${city || 'N/A'}</p>
        <p><strong>Teléfono:</strong> ${phone || 'N/A'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <p><strong>Suscribirse al Newsletter:</strong> ${newsletter ? 'Sí' : 'No'}</p>
        <p><strong>Opción de Registro:</strong> ${register ? 'Sí' : 'No'} (funcionalidad futura)</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error: any) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor al enviar el correo' }, { status: 500 });
  }
}
