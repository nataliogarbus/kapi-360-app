import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import SocialMediaClient from './SocialMediaClient';

export const metadata: Metadata = {
    title: 'Agencia de Social Media & Community Management | Kapi',
    description: 'Gestión profesional de redes sociales. Estrategia de contenidos, diseño gráfico, Reels/TikToks y moderación de comunidad.',
};

export default function SocialMediaPage() {
    const allPosts = getSortedPostsData();

    return <SocialMediaClient allPosts={allPosts} />;
}
