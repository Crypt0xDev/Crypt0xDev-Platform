import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Pre-generar índice de búsqueda con todo el contenido
export const GET: APIRoute = async () => {
  try {
    const searchIndex: any[] = [];

    // Indexar posts de blog
    const blogPosts = await getCollection('blog');
    for (const post of blogPosts) {
      searchIndex.push({
        type: 'blog',
        title: post.data.title,
        description: post.data.description,
        content: post.body || '',
        slug: post.slug,
        language: post.data.language,
        tags: post.data.tags || [],
        category: post.data.category,
        difficulty: post.data.difficulty,
        date: post.data.pubDate,
        draft: post.data.draft || false
      });
    }

    // Indexar writeups
    const writeups = await getCollection('writeups');
    for (const writeup of writeups) {
      const slugParts = writeup.slug.split('/');
      const actualSlug = slugParts.slice(1).join('/');
      
      searchIndex.push({
        type: 'writeup',
        title: writeup.data.title,
        description: writeup.data.description,
        content: writeup.body || '',
        slug: writeup.slug,
        actualSlug: actualSlug,
        language: writeup.data.language,
        platform: writeup.data.platform,
        difficulty: writeup.data.difficulty,
        tags: writeup.data.tags || [],
        os: writeup.data.os,
        date: writeup.data.pubDate
      });
    }

    // Indexar CTFs
    const ctfs = await getCollection('ctf');
    for (const ctf of ctfs) {
      searchIndex.push({
        type: 'ctf',
        title: ctf.data.title,
        description: ctf.data.description,
        content: ctf.body || '',
        slug: ctf.slug,
        language: ctf.data.language,
        ctfName: ctf.data.ctfName,
        category: ctf.data.category,
        tags: ctf.data.tags || [],
        difficulty: ctf.data.difficulty,
        date: ctf.data.pubDate,
        draft: ctf.data.draft || false
      });
    }

    return new Response(JSON.stringify(searchIndex), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('Search index error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate search index',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
