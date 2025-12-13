import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import VentasClient from './VentasClient';

export const metadata: Metadata = {
    title: 'Consultoría de Ventas y Sales Ops | Kapi',
    description: 'Profesionalizá tu área comercial. Implementación de CRM, Scripts de Venta, Procesos y Automatización para escalar tu facturación.',
};

export default function VentasPage() {
    const allPosts = getSortedPostsData();

    return <VentasClient allPosts={allPosts} />;
}
