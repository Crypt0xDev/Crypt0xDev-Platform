// ============================================================================
// Clientes de Supabase
// ============================================================================
// - getSupabase()      → cliente público (clave anon). Solo LEE contenido
//                        publicado (limitado por las políticas RLS). Seguro
//                        para usar en cualquier parte.
// - getSupabaseAdmin() → cliente con service_role. SALTA las RLS. SOLO en el
//                        servidor (panel de administración, endpoints, migración).
//                        Nunca debe llegar al navegador.
// ============================================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

let publicClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

/** Cliente público (solo lectura de contenido publicado). */
export function getSupabase(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      'Faltan PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY en el entorno.'
    );
  }
  publicClient ??= createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return publicClient;
}

/** Cliente de administración (service_role). SOLO servidor. */
export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseAdmin() no puede usarse en el navegador.');
  }
  if (!url || !serviceKey) {
    throw new Error(
      'Faltan PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.'
    );
  }
  adminClient ??= createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

/** ¿Está configurado Supabase? Útil para degradar con elegancia. */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
