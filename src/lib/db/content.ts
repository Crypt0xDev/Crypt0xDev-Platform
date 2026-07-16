// ============================================================================
// Consultas de contenido (lectura pública)
// ============================================================================
// Estas funciones sustituyen a la lectura de archivos .md: el frontend pide
// el contenido a Supabase en lugar de a la colección de Astro.
// Solo devuelven contenido 'published' (garantizado además por las RLS).
// ============================================================================

import { getSupabase } from '../supabase';
import type {
  Writeup, BlogPost, CtfChallenge, Resource, Language, ContentTable,
} from './types';

export interface ListOptions {
  language?: Language;
  limit?: number;
  offset?: number;
}

// --- Writeups ---------------------------------------------------------------
export interface WriteupFilters extends ListOptions {
  platform?: string;
  difficulty?: string;
  os?: string;
  tag?: string;
}

export async function listWriteups(filters: WriteupFilters = {}): Promise<Writeup[]> {
  let query = getSupabase()
    .from('writeups')
    .select('*')
    .eq('status', 'published')
    .order('pub_date', { ascending: false });

  if (filters.language) query = query.eq('language', filters.language);
  if (filters.platform) query = query.eq('platform', filters.platform);
  if (filters.difficulty) query = query.eq('difficulty', filters.difficulty);
  if (filters.os) query = query.eq('os', filters.os);
  if (filters.tag) query = query.contains('tags', [filters.tag]);
  query = applyPaging(query, filters);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Writeup[];
}

export async function getWriteup(
  language: Language, platform: string, slug: string
): Promise<Writeup | null> {
  const { data, error } = await getSupabase()
    .from('writeups')
    .select('*')
    .eq('language', language)
    .eq('platform', platform)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return (data as Writeup) ?? null;
}

// --- Blog -------------------------------------------------------------------
export async function listBlog(
  filters: ListOptions & { category?: string } = {}
): Promise<BlogPost[]> {
  let query = getSupabase()
    .from('blog')
    .select('*')
    .eq('status', 'published')
    .order('pub_date', { ascending: false });

  if (filters.language) query = query.eq('language', filters.language);
  if (filters.category) query = query.eq('category', filters.category);
  query = applyPaging(query, filters);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getBlogPost(
  language: Language, slug: string
): Promise<BlogPost | null> {
  const { data, error } = await getSupabase()
    .from('blog')
    .select('*')
    .eq('language', language)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPost) ?? null;
}

// --- CTF --------------------------------------------------------------------
export async function listCtf(
  filters: ListOptions & { category?: string; difficulty?: string } = {}
): Promise<CtfChallenge[]> {
  let query = getSupabase()
    .from('ctf')
    .select('*')
    .eq('status', 'published')
    .order('pub_date', { ascending: false });

  if (filters.language) query = query.eq('language', filters.language);
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.difficulty) query = query.eq('difficulty', filters.difficulty);
  query = applyPaging(query, filters);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as CtfChallenge[];
}

export async function getCtf(
  language: Language, category: string, slug: string
): Promise<CtfChallenge | null> {
  const { data, error } = await getSupabase()
    .from('ctf')
    .select('*')
    .eq('language', language)
    .eq('category', category)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return (data as CtfChallenge) ?? null;
}

// --- Resources --------------------------------------------------------------
export async function listResources(
  filters: ListOptions & { category?: string } = {}
): Promise<Resource[]> {
  let query = getSupabase()
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.language) query = query.eq('language', filters.language);
  if (filters.category) query = query.eq('category', filters.category);
  query = applyPaging(query, filters);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Resource[];
}

// --- Utilidades -------------------------------------------------------------
/** Total de elementos publicados en una tabla (para paginación). */
export async function countPublished(table: ContentTable): Promise<number> {
  const q = getSupabase().from(table).select('*', { count: 'exact', head: true });
  const { count, error } = table === 'resources' ? await q : await q.eq('status', 'published');
  if (error) throw error;
  return count ?? 0;
}

function applyPaging<T>(query: T, opts: ListOptions): T {
  const q = query as unknown as {
    limit: (n: number) => T;
    range: (from: number, to: number) => T;
  };
  if (opts.limit != null && opts.offset != null) {
    return q.range(opts.offset, opts.offset + opts.limit - 1);
  }
  if (opts.limit != null) return q.limit(opts.limit);
  return query;
}
