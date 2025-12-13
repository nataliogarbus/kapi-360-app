import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import ProspeccionClient from './ProspeccionClient';

export const metadata: Metadata = {
    title: 'Servicio de Prospección B2B y Generación de Leads | Kapi',
    description: 'Llenamos la agenda de tu equipo comercial. Estrategias de prospección Outbound, LinkedIn, Cold Email y Lead Generation calificado.',
};

export default function ProspeccionPage() {
    const allPosts = getSortedPostsData();

    return <ProspeccionClient allPosts={allPosts} />;
}
