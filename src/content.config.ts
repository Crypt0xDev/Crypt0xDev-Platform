import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================================
// BLOG COLLECTION
// ============================================================================
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().default('Crypt0xDev'),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  logo: z.string().optional(),
  category: z
    .enum(['tutorial', 'writeup', 'research', 'tools', 'news'])
    .optional(),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  language: z.enum(['es', 'en']).default('es'),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  readTime: z.number().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: blogSchema,
});

// ============================================================================
// WRITEUPS COLLECTION
// ============================================================================
const writeupSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  logo: z.string().optional(),
  platform: z.enum(['htb', 'tryhackme', 'vulnhub', 'hackmyvm', 'portswigger']),
  category: z
    .enum([
      'machines',
      'fortresses',
      'endgames',
      'prolabs',
      'challenges',
      'rooms',
      'paths',
      'other',
    ])
    .optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
  os: z.enum(['linux', 'windows', 'other']),
  tags: z.array(z.string()).default([]),
  language: z.enum(['es', 'en']).default('es'),
  retired: z.boolean().default(false),
  attackVectors: z
    .array(
      z.enum([
        'web',
        'network',
        'binary',
        'crypto',
        'forensics',
        'steganography',
        'reverse-engineering',
        'pwn',
        'osint',
        'wireless',
        'mobile',
        'cloud',
        'active-directory',
        'privilege-escalation',
        'lateral-movement',
      ])
    )
    .optional(),
  techniques: z.array(z.string()).optional(),
  vulnerabilities: z.array(z.string()).optional(),
  certifications: z
    .array(
      z.enum([
        'OSCP',
        'OSWE',
        'OSEP',
        'OSED',
        'OSMR',
        'OSDA',
        'eJPT',
        'eCPPT',
        'eWPT',
        'CEH',
        'PNPT',
        'CRTP',
        'CRTE',
      ])
    )
    .optional(),
  skillLevel: z
    .enum(['beginner', 'intermediate', 'advanced', 'expert'])
    .optional(),
  estimatedTime: z.string().optional(),
  points: z.number().optional(),
  rating: z.number().min(1).max(5).optional(),
});

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: writeupSchema,
});

// ============================================================================
// CTF COLLECTION
// ============================================================================
const ctfSchema = z.object({
  title: z.string(),
  description: z.string(),
  ctfName: z.string(),
  pubDate: z.coerce.date(),
  solvedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  logo: z.string().optional(),
  platform: z
    .enum(['HackTheBox', 'TryHackMe', 'PicoCTF', 'OverTheWire', 'Custom'])
    .optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
  category: z.enum([
    'web',
    'pwn',
    'crypto',
    'forensics',
    'reversing',
    'misc',
    'osint',
  ]),
  points: z.number().optional(),
  machine: z
    .object({
      name: z.string(),
      os: z.enum(['linux', 'windows', 'other']).optional(),
      ip: z.string().optional(),
      release: z.coerce.date().optional(),
    })
    .optional(),
  flags: z
    .object({
      user: z.string().optional(),
      root: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  language: z.enum(['es', 'en']).default('es'),
  draft: z.boolean().default(false),
});

const ctf = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ctf' }),
  schema: ctfSchema,
});

// ============================================================================
// RESOURCES COLLECTION
// ============================================================================
const resourcesSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
  url: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: resourcesSchema,
});

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================
export const collections = {
  blog,
  writeups,
  ctf,
  resources,
};
