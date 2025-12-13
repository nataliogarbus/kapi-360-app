import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import CreatividadClient from './CreatividadClient';

export const metadata: Metadata = {
    title: 'Agencia de Creatividad y Branding | Kapi',
    description: 'Transformamos tu marca con diseño de alto impacto. Branding, UX/UI, Campañas Publicitarias y Contenido para Redes Sociales.',
};

export default function CreatividadPage() {
    const allPosts = getSortedPostsData();

    return <CreatividadClient allPosts={allPosts} />;
}
