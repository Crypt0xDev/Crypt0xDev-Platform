// ============================================================================
// Subida de archivos (imágenes / PDF) — Supabase Storage
// ============================================================================
// El panel usa uploadMedia() para guardar imágenes y PDF, y devuelve la URL
// pública que se guarda en la base de datos y se inserta en el Markdown.
//
// Portátil: Supabase Storage es compatible con S3, así que migrar a Cloudflare
// R2 o AWS S3 en el futuro solo cambiaría esta capa, no el resto de la app.
// ============================================================================

import { getSupabaseAdmin } from './supabase';

const BUCKET =
  (import.meta.env.PUBLIC_SUPABASE_STORAGE_BUCKET as string | undefined) ?? 'media';

/** Genera una ruta única y limpia dentro del bucket. */
export function buildMediaPath(folder: string, filename: string): string {
  const clean = filename
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos/diacríticos
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const stamp = Date.now().toString(36);
  const safeFolder = folder.replace(/^\/+|\/+$/g, '');
  return `${safeFolder}/${stamp}-${clean}`;
}

export interface UploadResult {
  path: string;
  url: string;
}

/** Sube un archivo al Storage y devuelve su ruta y URL pública. */
export async function uploadMedia(
  file: ArrayBuffer | Uint8Array | Blob,
  path: string,
  contentType: string
): Promise<UploadResult> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType, upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

/** Borra un archivo del Storage por su ruta. */
export async function deleteMedia(path: string): Promise<void> {
  const { error } = await getSupabaseAdmin().storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
