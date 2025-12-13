import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import ViaPublicaClient from './ViaPublicaClient';

export const metadata: Metadata = {
    title: 'Publicidad en Vía Pública y Pantallas LED | Kapi',
    description: 'Maximizá tu impacto con publicidad en vía pública (OOH) y circuitos digitales (DOOH). Pantallas LED, Subtes, Aeropuertos y Shoppings en Argentina.',
};

export default function ViaPublicaPage() {
    const allPosts = getSortedPostsData();

    return <ViaPublicaClient allPosts={allPosts} />;
}
