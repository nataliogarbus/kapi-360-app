import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://kapi-360-app.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // Ejemplo de ruta bloqueada si fuera necesario
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
