/**
 * Utilidades para SEO (Meta tags, Open Graph, Schema.org)
 */

interface SEOMetaTags {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: Date;
  modifiedTime?: Date;
  author?: string;
  tags?: string[];
}

/**
 * Genera meta tags completos para SEO
 */
export function generateMetaTags(data: SEOMetaTags) {
  return {
    title: data.title,
    description: truncate(data.description, 155),
    canonical: data.canonical,
    ogTitle: data.title,
    ogDescription: truncate(data.description, 155),
    ogImage: data.ogImage || '/og-image.png',
    ogType: data.ogType || 'website',
    twitterCard: 'summary_large_image',
    ...(data.publishedTime && { publishedTime: data.publishedTime.toISOString() }),
    ...(data.modifiedTime && { modifiedTime: data.modifiedTime.toISOString() }),
    ...(data.author && { author: data.author }),
    ...(data.tags && { keywords: data.tags.join(', ') }),
  };
}

/**
 * Genera Schema.org JSON-LD para artículos
 */
export function generateArticleSchema(data: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime: Date;
  modifiedTime?: Date;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    datePublished: data.publishedTime.toISOString(),
    dateModified: (data.modifiedTime || data.publishedTime).toISOString(),
    author: {
      '@type': 'Person',
      name: data.author,
    },
  };
}

/**
 * Genera Schema.org JSON-LD para breadcrumbs
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Trunca texto para meta descriptions
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Genera título SEO con formato consistente
 */
export function generateSEOTitle(title: string, siteName: string = 'Crypt0xDev'): string {
  return `${title} | ${siteName}`;
}

/**
 * Extrae excerpt de contenido HTML/Markdown
 */
export function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remover markdown/HTML
  const text = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Imágenes
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // Links
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/[#*_~`]/g, '') // Markdown syntax
    .trim();

  return truncate(text, maxLength);
}

/**
 * Genera slug SEO-friendly desde texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/--+/g, '-') // Múltiples guiones a uno
    .replace(/^-+|-+$/g, ''); // Remover guiones al inicio/fin
}
