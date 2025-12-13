import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import EcommerceClient from './EcommerceClient';

export const metadata: Metadata = {
    title: 'Agencia de E-commerce y MercadoLibre Expert | Kapi',
    description: 'Desarrollo de tiendas online (Shopify, WooCommerce, VTEX) y gestión profesional de MercadoLibre. Aumentá tus ventas digitales.',
};

export default function EcommercePage() {
    const allPosts = getSortedPostsData();

    return <EcommerceClient allPosts={allPosts} />;
}
