import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ url }) => {
  const lang = url.searchParams.get('lang') || 'es';
  
  try {
    const blogPosts = await getCollection('blog', ({ data }) => {
      return data.language === lang && !data.draft;
    });

    const debug = {
      totalPosts: blogPosts.length,
      posts: blogPosts.map(post => ({
        slug: post.slug,
        title: post.data.title,
        tags: post.data.tags,
        category: post.data.category,
        hasBody: !!post.body,
        bodyLength: post.body?.length || 0,
        bodyPreview: post.body?.substring(0, 100)
      }))
    };

    return new Response(JSON.stringify(debug, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
