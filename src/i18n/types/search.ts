/**
 * Tipos para el sistema de búsqueda
 */

/**
 * Item de búsqueda (antes de procesar)
 */
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

/**
 * Resultado de búsqueda (después de procesar)
 */
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
  highlight?: {
    field: string;
    text: string;
  };
}

/**
 * Opciones de búsqueda
 */
export interface SearchOptions {
  query: string;
  type?: 'blog' | 'writeup' | 'ctf' | 'all';
  platform?: string;
  difficulty?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

/**
 * Filtros de búsqueda
 */
export interface SearchFilters {
  type: Set<'blog' | 'writeup' | 'ctf'>;
  platforms: Set<string>;
  difficulties: Set<string>;
  tags: Set<string>;
  os: Set<string>;
}
