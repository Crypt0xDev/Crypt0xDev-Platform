/**
 * Tipos para contenido (Blog, Writeups, CTF)
 */

import type { Platform, Difficulty, OS } from './platform';

/**
 * Post de Blog
 */
export interface BlogPost {
  title: string;
  description: string;
  author: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  logo?: string;
  category?: 'tutorial' | 'writeup' | 'research' | 'tools' | 'news';
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  language: 'es' | 'en';
  draft: boolean;
  featured: boolean;
  readTime?: number;
}

/**
 * Writeup de máquina/challenge
 */
export interface Writeup {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  logo?: string;
  platform: Platform;
  category?: 'machines' | 'fortresses' | 'endgames' | 'prolabs' | 'challenges' | 'rooms' | 'paths' | 'other';
  difficulty: Difficulty;
  os: OS;
  tags: string[];
  language: 'es' | 'en';
  retired: boolean;
  attackVectors?: AttackVector[];
  techniques?: string[];
  vulnerabilities?: string[];
  certifications?: Certification[];
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime?: string;
  points?: number;
  rating?: number;
}

/**
 * CTF Challenge
 */
export interface CTFChallenge {
  title: string;
  description: string;
  ctfName: string;
  pubDate: Date;
  solvedDate?: Date;
  heroImage?: string;
  logo?: string;
  platform?: 'HackTheBox' | 'TryHackMe' | 'PicoCTF' | 'OverTheWire' | 'Custom';
  difficulty: Difficulty;
  category: 'web' | 'pwn' | 'crypto' | 'forensics' | 'reversing' | 'misc' | 'osint';
  points?: number;
  machine?: {
    name: string;
    os?: OS;
    ip?: string;
    release?: Date;
  };
  flags?: {
    user?: string;
    root?: string;
  };
  tags: string[];
  tools: string[];
  language: 'es' | 'en';
  draft: boolean;
}

/**
 * Vectores de ataque disponibles
 */
export type AttackVector =
  | 'web'
  | 'network'
  | 'binary'
  | 'crypto'
  | 'forensics'
  | 'steganography'
  | 'reverse-engineering'
  | 'pwn'
  | 'osint'
  | 'wireless'
  | 'mobile'
  | 'cloud'
  | 'active-directory'
  | 'privilege-escalation'
  | 'lateral-movement';

/**
 * Certificaciones relacionadas
 */
export type Certification =
  | 'OSCP'
  | 'OSWE'
  | 'OSEP'
  | 'OSED'
  | 'OSMR'
  | 'OSDA'
  | 'eJPT'
  | 'eCPPT'
  | 'eWPT'
  | 'CEH'
  | 'PNPT'
  | 'CRTP'
  | 'CRTE';

/**
 * Entry de colección de Astro
 */
export interface CollectionEntry<T> {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: T;
}
