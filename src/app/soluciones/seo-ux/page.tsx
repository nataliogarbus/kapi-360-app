import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import SeoUxClient from './SeoUxClient';

export const metadata: Metadata = {
    title: 'Agencia SEO, AEO y Diseño UX | Kapi',
    description: 'No solo te posicionamos en Google. Optimizamos tu sitio para la Inteligencia Artificial (AEO) y para que tus usuarios compren (UX/CRO).',
};

export default function SeoUxPage() {
    const allPosts = getSortedPostsData();

    return <SeoUxClient allPosts={allPosts} />;
}
