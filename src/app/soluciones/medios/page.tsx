import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import MediosClient from './MediosClient';

export const metadata: Metadata = {
    title: 'Publicidad en TV y Medios Masivos | Kapi',
    description: 'Planificación y compra de medios masivos. Publicidad en TV, Radio, Diarios y Revistas (PNTs, Spots y Auspicios) en Argentina.',
};

export default function MediosPage() {
    const allPosts = getSortedPostsData();

    return <MediosClient allPosts={allPosts} />;
}
