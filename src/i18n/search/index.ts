// Utilidades de búsqueda del lado del cliente

export interface SearchItem {
  type: 'blog' | 'writeup' | 'ctf';
  title: string;
  description: string;
  content: string;
  slug: string;
  actualSlug?: string;
  language: string;
  tags: string[];
  category?: string;
  difficulty?: string;
  platform?: string;
  ctfName?: string;
  os?: string;
  date: Date;
  draft?: boolean;
}

export interface SearchResult {
  type: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  category?: string;
  difficulty?: string;
  platform?: string;
  ctfName?: string;
  os?: string;
  date: Date;
  score: number;
}

function calculateRelevance(
  query: string,
  item: SearchItem
): number {
  let score = 0;
  const queryLower = query.toLowerCase();
  const titleLower = item.title.toLowerCase();
  const descLower = item.description.toLowerCase();
  const contentLower = item.content.toLowerCase();

  // Coincidencia exacta en título
  if (titleLower === queryLower) score += 300;
  else if (titleLower.includes(queryLower)) score += 100;

  // Palabras del título
  const titleWords = titleLower.split(/\s+/);
  if (titleWords.some(word => word === queryLower)) score += 150;

  // Tags
  const matchingTags = item.tags.filter(tag => tag.toLowerCase().includes(queryLower));
  score += matchingTags.length * 50;
  if (item.tags.some(tag => tag.toLowerCase() === queryLower)) score += 100;

  // Platform/Category
  if (item.platform && item.platform.toLowerCase().includes(queryLower)) score += 60;
  if (item.ctfName && item.ctfName.toLowerCase().includes(queryLower)) score += 60;
  if (item.category && item.category.toLowerCase().includes(queryLower)) score += 40;

  // Descripción
  if (descLower.includes(queryLower)) score += 30;

  // Contenido
  const contentMatches = (contentLower.match(new RegExp(queryLower, 'g')) || []).length;
  score += Math.min(contentMatches * 3, 50);

  // Encabezados en el contenido
  const headingRegex = new RegExp(`#+\\s+.*${queryLower}.*`, 'gi');
  const headingMatches = (item.content.match(headingRegex) || []).length;
  score += headingMatches * 20;

  return score;
}

function extractPreview(content: string, query: string, maxLength: number = 150): string {
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  const index = contentLower.indexOf(queryLower);

  if (index === -1) {
    return content.substring(0, maxLength).trim() + '...';
  }

  const start = Math.max(0, index - 60);
  const end = Math.min(content.length, index + query.length + 90);
  const preview = content.substring(start, end).trim();

  return (start > 0 ? '...' : '') + preview + (end < content.length ? '...' : '');
}

let searchIndexCache: SearchItem[] | null = null;

export async function searchContent(query: string, lang: string = 'es'): Promise<SearchResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    // Cargar índice si no está en caché
    if (!searchIndexCache) {
      const response = await fetch('/api/search.json');
      if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.statusText}`);
      }
      searchIndexCache = await response.json();
    }

    // Verificar que el índice esté disponible
    if (!searchIndexCache) {
      return [];
    }

    // Filtrar por idioma y draft
    const items = searchIndexCache.filter(
      item => item.language === lang && !item.draft
    );

    const results: SearchResult[] = [];

    for (const item of items) {
      const score = calculateRelevance(query, item);

      if (score > 0) {
        let url = '';
        if (item.type === 'blog') {
          url = `/${lang}/blog/${item.slug.split('/').pop()}`;
        } else if (item.type === 'writeup') {
          url = `/${lang}/writeup/${item.actualSlug || item.slug}`;
        } else if (item.type === 'ctf') {
          url = `/${lang}/ctf/${item.slug.split('/').pop()}`;
        }

        results.push({
          type: item.type,
          title: item.title,
          description: extractPreview(item.description || item.content, query, 120),
          url,
          tags: item.tags,
          category: item.category,
          difficulty: item.difficulty,
          platform: item.platform,
          ctfName: item.ctfName,
          os: item.os,
          date: item.date,
          score
        });
      }
    }

    // Ordenar por relevancia y luego por fecha
    return results
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 30);

  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

// Limpiar caché (útil para desarrollo)
export function clearSearchCache() {
  searchIndexCache = null;
}
