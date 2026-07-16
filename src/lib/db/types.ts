// ============================================================================
// Tipos de la base de datos — reflejan supabase/migrations/0001_initial_schema.sql
// ============================================================================

export type Language = 'es' | 'en';
export type ContentStatus = 'draft' | 'pending' | 'published';
export type UserRole = 'admin' | 'editor' | 'author';

export type WuPlatform = 'htb' | 'tryhackme' | 'vulnhub' | 'hackmyvm' | 'portswigger';
export type WuDifficulty = 'easy' | 'medium' | 'hard' | 'insane';
export type WuOs = 'linux' | 'windows' | 'other';
export type BlogCategory = 'tutorial' | 'writeup' | 'research' | 'tools' | 'news';
export type CtfCategory =
  | 'web' | 'pwn' | 'crypto' | 'forensics' | 'reversing' | 'misc' | 'osint';
export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Writeup {
  id: string;
  slug: string;
  language: Language;
  title: string;
  description: string;
  body: string;
  hero_image: string | null;
  logo: string | null;
  platform: WuPlatform;
  category: string | null;
  difficulty: WuDifficulty;
  os: WuOs;
  tags: string[];
  attack_vectors: string[];
  techniques: string[];
  vulnerabilities: string[];
  certifications: string[];
  skill_level: string | null;
  estimated_time: string | null;
  points: number | null;
  rating: number | null;
  retired: boolean;
  status: ContentStatus;
  author_id: string | null;
  pub_date: string;
  updated_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  language: Language;
  title: string;
  description: string;
  body: string;
  hero_image: string | null;
  logo: string | null;
  category: BlogCategory | null;
  tags: string[];
  difficulty: string | null;
  featured: boolean;
  read_time: number | null;
  status: ContentStatus;
  author_id: string | null;
  pub_date: string;
  updated_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CtfChallenge {
  id: string;
  slug: string;
  language: Language;
  title: string;
  description: string;
  body: string;
  ctf_name: string;
  hero_image: string | null;
  logo: string | null;
  platform: string | null;
  difficulty: WuDifficulty;
  category: CtfCategory;
  points: number | null;
  machine: Record<string, unknown> | null;
  flags: Record<string, unknown> | null;
  tags: string[];
  tools: string[];
  status: ContentStatus;
  author_id: string | null;
  pub_date: string;
  solved_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  slug: string;
  language: Language;
  title: string;
  description: string;
  body: string;
  category: string | null;
  url: string | null;
  tags: string[];
  status: ContentStatus;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content_type: string;
  content_id: string;
  author_name: string | null;
  author_email: string | null;
  user_id: string | null;
  body: string;
  status: CommentStatus;
  created_at: string;
}

export interface Rating {
  id: string;
  content_type: string;
  content_id: string;
  user_id: string | null;
  fingerprint: string | null;
  value: number;
  created_at: string;
}

/** Nombres de tabla válidos para contenido. */
export type ContentTable = 'writeups' | 'blog' | 'ctf' | 'resources';
