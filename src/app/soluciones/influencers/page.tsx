import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import InfluencersClient from './InfluencersClient';

export const metadata: Metadata = {
    title: 'Agencia de Influencers y Creators Network | Kapi',
    description: 'Conectá tu marca con los creadores de contenido más relevantes. Estrategias de Influencer Marketing con foco en performance y autenticidad.',
};

export default function InfluencersPage() {
    const allPosts = getSortedPostsData();

    return <InfluencersClient allPosts={allPosts} />;
}
