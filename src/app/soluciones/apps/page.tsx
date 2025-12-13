import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import AppsClient from './AppsClient';

export const metadata: Metadata = {
    title: 'Desarrollo de Apps Móviles iOS y Android | Kapi',
    description: 'Creamos aplicaciones móviles nativas e híbridas. Llevá tu negocio al bolsillo de tus clientes. React Native, Flutter, Swift.',
};

export default function AppsPage() {
    const allPosts = getSortedPostsData();

    return <AppsClient allPosts={allPosts} />;
}
