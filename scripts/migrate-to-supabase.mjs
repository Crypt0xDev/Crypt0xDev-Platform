// ============================================================================
// Migración de contenido Markdown → Supabase
// ============================================================================
// Lee los .md de src/content, sube las imágenes referenciadas a Supabase
// Storage y crea las filas en las tablas de la base de datos.
//
// USO (una sola vez, cuando el esquema ya esté aplicado en Supabase):
//   1. Rellena .env con PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//      y PUBLIC_SUPABASE_STORAGE_BUCKET.
//   2. Crea el bucket de Storage (por defecto "media") como público.
//   3. Ejecuta:
//        node --env-file=.env scripts/migrate-to-supabase.mjs
//        node --env-file=.env scripts/migrate-to-supabase.mjs --dry-run   (prueba)
//
// Es idempotente por (language, slug…): usa upsert, así puedes re-ejecutarlo.
// ============================================================================

import { createClient } from '@supabase/supabase-js';
import matter from 'gray-matter';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'src', 'content');
const PUBLIC = path.join(ROOT, 'public');

const DRY = process.argv.includes('--dry-run');

const URL = process.env.PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';

if (!DRY && (!URL || !KEY)) {
  console.error('✗ Faltan PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.');
  console.error('  Ejecuta con:  node --env-file=.env scripts/migrate-to-supabase.mjs');
  process.exit(1);
}

const supabase = DRY ? null : createClient(URL, KEY, { auth: { persistSession: false } });

// --- Utilidades -------------------------------------------------------------
const iso = (v) => (v ? new Date(v).toISOString() : null);
const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);

/** Recorre un directorio y devuelve todos los .md. */
async function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const contentType = (ext) => ({
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
}[ext.toLowerCase()] || 'application/octet-stream');

// Sube cada imagen /images/... una sola vez y cachea su URL pública.
const uploadedCache = new Map();

async function uploadAsset(publicPath) {
  if (!publicPath || !publicPath.startsWith('/images/')) return publicPath;
  if (uploadedCache.has(publicPath)) return uploadedCache.get(publicPath);

  const localFile = path.join(PUBLIC, publicPath.replace(/^\//, ''));
  if (!existsSync(localFile)) {
    console.warn(`  ⚠ imagen no encontrada: ${publicPath}`);
    uploadedCache.set(publicPath, publicPath);
    return publicPath;
  }
  const storageKey = publicPath.replace(/^\/images\//, '');
  if (DRY) {
    uploadedCache.set(publicPath, `[dry] ${storageKey}`);
    return uploadedCache.get(publicPath);
  }
  const bytes = await readFile(localFile);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storageKey, bytes, { contentType: contentType(path.extname(localFile)), upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storageKey);
  uploadedCache.set(publicPath, data.publicUrl);
  return data.publicUrl;
}

/** Reescribe las rutas /images/... del cuerpo Markdown a URLs del Storage. */
async function rewriteBody(body) {
  const refs = new Set([...body.matchAll(/\/images\/[^\s)"']+/g)].map((m) => m[0]));
  let out = body;
  for (const ref of refs) {
    const url = await uploadAsset(ref);
    out = out.split(ref).join(url);
  }
  return out;
}

// --- Mapeadores por colección ----------------------------------------------
function slugOf(file, base) {
  return path.basename(file, '.md');
}

async function mapWriteup(fm, body) {
  return {
    slug: fm.__slug, language: fm.language || 'es',
    title: fm.title, description: fm.description,
    body: await rewriteBody(body),
    hero_image: await uploadAsset(fm.heroImage), logo: await uploadAsset(fm.logo),
    platform: fm.platform, category: fm.category ?? null,
    difficulty: fm.difficulty, os: fm.os,
    tags: arr(fm.tags), attack_vectors: arr(fm.attackVectors),
    techniques: arr(fm.techniques), vulnerabilities: arr(fm.vulnerabilities),
    certifications: arr(fm.certifications),
    skill_level: fm.skillLevel ?? null, estimated_time: fm.estimatedTime ?? null,
    points: fm.points ?? null, rating: fm.rating ?? null,
    retired: Boolean(fm.retired), status: 'published',
    pub_date: iso(fm.pubDate), updated_date: iso(fm.updatedDate),
  };
}

async function mapBlog(fm, body) {
  return {
    slug: fm.__slug, language: fm.language || 'es',
    title: fm.title, description: fm.description,
    body: await rewriteBody(body),
    hero_image: await uploadAsset(fm.heroImage), logo: await uploadAsset(fm.logo),
    category: fm.category ?? null, tags: arr(fm.tags),
    difficulty: fm.difficulty ?? null, featured: Boolean(fm.featured),
    read_time: fm.readTime ?? null,
    status: fm.draft ? 'draft' : 'published',
    pub_date: iso(fm.pubDate), updated_date: iso(fm.updatedDate),
  };
}

async function mapCtf(fm, body) {
  return {
    slug: fm.__slug, language: fm.language || 'es',
    title: fm.title, description: fm.description,
    body: await rewriteBody(body), ctf_name: fm.ctfName || fm.title,
    hero_image: await uploadAsset(fm.heroImage), logo: await uploadAsset(fm.logo),
    platform: fm.platform ?? null, difficulty: fm.difficulty,
    category: fm.category, points: fm.points ?? null,
    machine: fm.machine ?? null, flags: fm.flags ?? null,
    tags: arr(fm.tags), tools: arr(fm.tools),
    status: fm.draft ? 'draft' : 'published',
    pub_date: iso(fm.pubDate), solved_date: iso(fm.solvedDate),
  };
}

async function mapResource(fm, body) {
  return {
    slug: fm.__slug, language: fm.language || 'es',
    title: fm.title, description: fm.description,
    body: await rewriteBody(body),
    category: fm.category ?? null, url: fm.url ?? null,
    tags: arr(fm.tags), status: 'published',
  };
}

const COLLECTIONS = [
  { dir: 'writeups', table: 'writeups', map: mapWriteup, conflict: 'language,platform,slug' },
  { dir: 'blog', table: 'blog', map: mapBlog, conflict: 'language,slug' },
  { dir: 'ctf', table: 'ctf', map: mapCtf, conflict: 'language,category,slug' },
  { dir: 'resources', table: 'resources', map: mapResource, conflict: 'language,slug' },
];

// --- Ejecución --------------------------------------------------------------
async function run() {
  console.log(DRY ? '▶ Migración (DRY RUN — no escribe nada)\n' : '▶ Migración a Supabase\n');
  let total = 0;

  for (const col of COLLECTIONS) {
    const files = await walk(path.join(CONTENT, col.dir));
    console.log(`\n=== ${col.table} (${files.length} archivos) ===`);
    const rows = [];
    for (const file of files) {
      const raw = await readFile(file, 'utf8');
      const { data: fm, content: body } = matter(raw);
      fm.__slug = slugOf(file);
      try {
        rows.push(await col.map(fm, body));
        console.log(`  ✓ ${path.relative(CONTENT, file)}`);
      } catch (e) {
        console.error(`  ✗ ${path.relative(CONTENT, file)} → ${e.message}`);
      }
    }
    if (!DRY && rows.length) {
      const { error } = await supabase.from(col.table).upsert(rows, { onConflict: col.conflict });
      if (error) { console.error(`  ✗ upsert ${col.table}: ${error.message}`); continue; }
    }
    total += rows.length;
  }

  console.log(`\n${DRY ? '(dry) ' : ''}✓ ${total} elementos procesados, ${uploadedCache.size} imágenes.`);
  if (DRY) console.log('  Ejecuta sin --dry-run para escribir en Supabase.');
}

run().catch((e) => { console.error(e); process.exit(1); });
