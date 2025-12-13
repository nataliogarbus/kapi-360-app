import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import MedidaClient from './MedidaClient';

export const metadata: Metadata = {
    title: 'Desarrollo de Software a Medida | Kapi Tech',
    description: 'Software Factory. Desarrollo de sistemas a medida, integración de APIs, Dashboards y automatización de procesos complejos.',
};

export default function MedidaPage() {
    const allPosts = getSortedPostsData();

    return <MedidaClient allPosts={allPosts} />;
}
