import { z, defineCollection } from 'astro:content';

// ============================================================================
// BLOG COLLECTION
// ============================================================================
const blogSchema = z.object({
  // Información básica
  title: z.string(),
  description: z.string(),
  author: z.string().default('Crypt0xDev'),

  // Fechas
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),

  // Imágenes
  heroImage: z.string().optional(), // Imagen de portada
  logo: z.string().optional(), // Logo o icono del artículo

  // Categorización
  category: z.enum(['tutorial', 'writeup', 'research', 'tools', 'news']).optional(),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),

  // Configuración
  language: z.enum(['es', 'en']).default('es'),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),

  // Metadatos adicionales
  readTime: z.number().optional()
});

const blog = defineCollection({
  type: 'content',
  schema: blogSchema
});

// ============================================================================
// WRITEUPS COLLECTION
// ============================================================================
const writeupSchema = z.object({
  // Información básica
  title: z.string(),
  description: z.string(),

  // Fechas
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),

  // Imágenes
  heroImage: z.string().optional(), // Imagen de portada del writeup
  logo: z.string().optional(), // Logo de la plataforma o máquina

  // Plataforma y clasificación
  platform: z.enum(['htb', 'tryhackme', 'vulnhub', 'hackmyvm', 'portswigger']),
  category: z.enum(['machines', 'fortresses', 'endgames', 'prolabs', 'challenges', 'rooms', 'paths', 'other']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
  os: z.enum(['linux', 'windows', 'other']),

  // Categorización
  tags: z.array(z.string()).default([]),
  language: z.enum(['es', 'en']).default('es'),
  retired: z.boolean().default(false),

  // Vectores de ataque y técnicas
  attackVectors: z.array(z.enum([
    'web', 'network', 'binary', 'crypto', 'forensics', 'steganography',
    'reverse-engineering', 'pwn', 'osint', 'wireless', 'mobile', 'cloud',
    'active-directory', 'privilege-escalation', 'lateral-movement'
  ])).optional(),
  techniques: z.array(z.string()).optional(), // MITRE ATT&CK techniques
  vulnerabilities: z.array(z.string()).optional(), // CVEs, CWEs

  // Certificaciones relacionadas
  certifications: z.array(z.enum([
    'OSCP', 'OSWE', 'OSEP', 'OSED', 'OSMR', 'OSDA',
    'eJPT', 'eCPPT', 'eWPT', 'CEH', 'PNPT', 'CRTP', 'CRTE'
  ])).optional(),

  // Metadatos adicionales
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  estimatedTime: z.string().optional(),
  points: z.number().optional(),
  rating: z.number().min(1).max(5).optional()
});

const writeups = defineCollection({
  type: 'content',
  schema: writeupSchema
});

// ============================================================================
// CTF COLLECTION
// ============================================================================
const ctfSchema = z.object({
  // Información básica
  title: z.string(),
  description: z.string(),
  ctfName: z.string(), // Nombre del CTF event (ej: "picoCTF 2024")

  // Fechas
  pubDate: z.coerce.date(), // Fecha de publicación del writeup
  solvedDate: z.coerce.date().optional(), // Fecha cuando se resolvió

  // Imágenes
  heroImage: z.string().optional(), // Imagen de portada del CTF
  logo: z.string().optional(), // Logo de la plataforma

  // Plataforma y clasificación
  platform: z.enum(['HackTheBox', 'TryHackMe', 'PicoCTF', 'OverTheWire', 'Custom']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
  category: z.enum(['web', 'pwn', 'crypto', 'forensics', 'reversing', 'misc', 'osint']),
  points: z.number().optional(),

  // Información de la máquina (si aplica)
  machine: z.object({
    name: z.string(),
    os: z.enum(['linux', 'windows', 'other']).optional(),
    ip: z.string().optional(),
    release: z.coerce.date().optional()
  }).optional(),

  // Flags obtenidas
  flags: z.object({
    user: z.string().optional(),
    root: z.string().optional()
  }).optional(),

  // Categorización
  tags: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  language: z.enum(['es', 'en']).default('es'),

  // Configuración
  draft: z.boolean().default(false)
});

const ctf = defineCollection({
  type: 'content',
  schema: ctfSchema
});

// ============================================================================
// RESOURCES COLLECTION
// ============================================================================
const resourcesSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
  url: z.string().url().optional(),
  tags: z.array(z.string()).default([])
});

const resources = defineCollection({
  type: 'content',
  schema: resourcesSchema
});

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================
export const collections = { 
  blog, 
  writeups, 
  ctf,
  resources
};