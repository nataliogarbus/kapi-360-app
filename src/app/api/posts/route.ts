import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

export async function GET() {
  try {
    const allPosts = getSortedPostsData();
    const featuredPosts = allPosts.slice(0, 3);
    return NextResponse.json(featuredPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse('Error interno al obtener los artículos', { status: 500 });
  }
}
