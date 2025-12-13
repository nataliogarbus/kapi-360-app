import { NextRequest, NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') as 'es' | 'en' || 'es';
    const limit = searchParams.get('limit');

    const allPosts = getSortedPostsData(lang);

    if (limit === 'all') {
      return NextResponse.json(allPosts);
    }

    const featuredPosts = allPosts.slice(0, 3);
    return NextResponse.json(featuredPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse('Error interno al obtener los artículos', { status: 500 });
  }
}
