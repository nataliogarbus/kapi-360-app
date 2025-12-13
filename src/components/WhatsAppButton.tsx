'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CONTACT_INFO } from '@/lib/constants';

const WhatsAppButton = () => {
    const pathname = usePathname();
    const [message, setMessage] = useState('');

    useEffect(() => {
        let msg = "Hola Kapi, me gustaría recibir más información sobre sus servicios.";

        // Growth & Marketing
        if (pathname?.includes('/soluciones/via-publica')) {
            msg = "Hola Kapi, vengo de la sección de Vía Pública y Pantallas. Me gustaría conocer formatos y costos.";
        } else if (pathname?.includes('/soluciones/influencers')) {
            msg = "Hola Kapi, me interesa su red de Influencers y Creadores. Quiero armar una campaña.";
        } else if (pathname?.includes('/soluciones/social-media')) {
            msg = "Hola Kapi, necesito gestión profesional de Redes Sociales para mi marca.";
        }

        // Strategy & Business
        else if (pathname?.includes('/soluciones/seo-ux')) {
            msg = "Hola Kapi, quiero mejorar mi Posicionamiento SEO y la UX de mi sitio.";
        } else if (pathname?.includes('/soluciones/creatividad')) {
            msg = "Hola Kapi, estoy buscando soluciones de Creatividad y Branding para mi marca.";
        } else if (pathname?.includes('/soluciones/ventas')) {
            msg = "Hola Kapi, quiero profesionalizar mis Canales de Venta y equipo comercial.";
        } else if (pathname?.includes('/soluciones/prospeccion')) {
            msg = "Hola Kapi, me interesa el servicio de Prospección B2B y Generación de Leads.";
        }

        // Tech & Development
        else if (pathname?.includes('/soluciones/web')) {
            msg = "Hola Kapi, necesito desarrollar un Sitio Web corporativo de alto impacto.";
        } else if (pathname?.includes('/soluciones/ecommerce')) {
            msg = "Hola Kapi, quiero escalar mi E-commerce (Shopify/Woo/MeLi).";
        } else if (pathname?.includes('/soluciones/apps')) {
            msg = "Hola Kapi, tengo una idea para una App Móvil y quiero desarrollarla.";
        } else if (pathname?.includes('/soluciones/medida')) {
            msg = "Hola Kapi, busco una Solución Tecnológica a Medida (Software Factory).";
        }

        else if (pathname?.includes('/diagnostico')) {
            msg = "Hola Kapi, hice el Diagnóstico IA y quiero profundizar en los resultados.";
        }

        setMessage(encodeURIComponent(msg));
    }, [pathname]);

    const whatsappUrl = `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${message}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Contactar por WhatsApp"
        >
            <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
        </Link>
    );
};

export default WhatsAppButton;
