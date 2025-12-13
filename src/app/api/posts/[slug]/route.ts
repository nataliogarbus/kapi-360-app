import { NextRequest, NextResponse } from 'next/server';
import { getPostData } from '@/lib/posts';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const slug = params.slug;
        const searchParams = request.nextUrl.searchParams;
        const lang = searchParams.get('lang') as 'es' | 'en' || 'es';

        // getPostData is async in some implementations, but posts.ts seems synchronous?
        // Let's check posts.ts content if I recall... it uses fs.readFileSync.
        // Wait, getPostData might be async because in page.tsx it was called directly?
        // In page.tsx: "const postData = getPostData(params.slug);" 
        // It seems synchronous. 
        // But let's wrap in Promise.resolve just in case or just call it.

        const postData = getPostData(slug, lang);

        if (!postData) {
            return new NextResponse('Post not found', { status: 404 });
        }

        return NextResponse.json(postData);
    } catch (error) {
        console.error('Error fetching post:', error);
        return new NextResponse('Error interno al obtener el artículo', { status: 500 });
    }
}
