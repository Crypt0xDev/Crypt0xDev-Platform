-- ============================================================================
-- Crypt0xDev — Esquema inicial de la base de datos (Supabase / PostgreSQL)
-- ============================================================================
-- Cómo usarlo:
--   1. Crea un proyecto en https://supabase.com
--   2. Ve a  SQL Editor  →  New query
--   3. Pega TODO este archivo y pulsa "Run"
-- Esto crea las tablas, los roles y las reglas de acceso de la plataforma.
-- No contiene ninguna clave secreta: es seguro tenerlo en el repositorio.
-- ============================================================================

-- Extensiones necesarias -----------------------------------------------------
create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- ============================================================================
-- TIPOS (enums) — reflejan los schemas actuales de src/content.config.ts
-- ============================================================================
create type user_role       as enum ('admin', 'editor', 'author');
create type content_status  as enum ('draft', 'pending', 'published');
create type language_code    as enum ('es', 'en');

create type wu_platform     as enum ('htb', 'tryhackme', 'vulnhub', 'hackmyvm', 'portswigger');
create type wu_difficulty   as enum ('easy', 'medium', 'hard', 'insane');
create type wu_os           as enum ('linux', 'windows', 'other');

create type blog_category   as enum ('tutorial', 'writeup', 'research', 'tools', 'news');
create type ctf_category    as enum ('web', 'pwn', 'crypto', 'forensics', 'reversing', 'misc', 'osint');
create type comment_status  as enum ('pending', 'approved', 'rejected');

-- ============================================================================
-- PERFILES / COLABORADORES
-- Cada usuario que inicia sesión (Supabase Auth) tiene un perfil con su rol.
-- ============================================================================
create table profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url   text,
  role         user_role not null default 'author',
  created_at   timestamptz not null default now()
);

-- Al registrarse un usuario, se crea su perfil automáticamente.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Helper: ¿el usuario actual es admin o editor? (para las reglas de acceso)
create or replace function is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- ============================================================================
-- Función común: mantener updated_at al día
-- ============================================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- WRITEUPS
-- ============================================================================
create table writeups (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null,
  language        language_code not null default 'es',
  title           text not null,
  description     text not null,
  body            text not null default '',          -- contenido markdown
  hero_image      text,                              -- URL (R2) o null
  logo            text,
  platform        wu_platform not null,
  category        text,
  difficulty      wu_difficulty not null,
  os              wu_os not null,
  tags            text[] not null default '{}',
  attack_vectors  text[] not null default '{}',
  techniques      text[] not null default '{}',
  vulnerabilities text[] not null default '{}',
  certifications  text[] not null default '{}',
  skill_level     text,
  estimated_time  text,
  points          integer,
  rating          numeric(2,1) check (rating >= 1 and rating <= 5),
  retired         boolean not null default false,
  status          content_status not null default 'draft',
  author_id       uuid references profiles (id) on delete set null,
  pub_date        timestamptz not null default now(),
  updated_date    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (language, platform, slug)
);
create index writeups_status_idx   on writeups (status);
create index writeups_platform_idx on writeups (platform);
create index writeups_tags_idx     on writeups using gin (tags);
create trigger writeups_updated_at before update on writeups
  for each row execute function set_updated_at();

-- ============================================================================
-- BLOG
-- ============================================================================
create table blog (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  language     language_code not null default 'es',
  title        text not null,
  description  text not null,
  body         text not null default '',
  hero_image   text,
  logo         text,
  category     blog_category,
  tags         text[] not null default '{}',
  difficulty   text,
  featured     boolean not null default false,
  read_time    integer,
  status       content_status not null default 'draft',
  author_id    uuid references profiles (id) on delete set null,
  pub_date     timestamptz not null default now(),
  updated_date timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (language, slug)
);
create index blog_status_idx on blog (status);
create trigger blog_updated_at before update on blog
  for each row execute function set_updated_at();

-- ============================================================================
-- CTF
-- ============================================================================
create table ctf (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  language     language_code not null default 'es',
  title        text not null,
  description  text not null,
  body         text not null default '',
  ctf_name     text not null,
  hero_image   text,
  logo         text,
  platform     text,
  difficulty   wu_difficulty not null,
  category     ctf_category not null,
  points       integer,
  machine      jsonb,                                -- { name, os, ip, release }
  flags        jsonb,                                -- { user, root }
  tags         text[] not null default '{}',
  tools        text[] not null default '{}',
  status       content_status not null default 'draft',
  author_id    uuid references profiles (id) on delete set null,
  pub_date     timestamptz not null default now(),
  solved_date  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (language, category, slug)
);
create index ctf_status_idx   on ctf (status);
create index ctf_category_idx on ctf (category);
create trigger ctf_updated_at before update on ctf
  for each row execute function set_updated_at();

-- ============================================================================
-- RESOURCES
-- ============================================================================
create table resources (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  language     language_code not null default 'es',
  title        text not null,
  description  text not null,
  body         text not null default '',
  category     text,
  url          text,
  tags         text[] not null default '{}',
  status       content_status not null default 'published',
  author_id    uuid references profiles (id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (language, slug)
);
create trigger resources_updated_at before update on resources
  for each row execute function set_updated_at();

-- ============================================================================
-- COMENTARIOS  (polimórficos: sirven para cualquier tipo de contenido)
-- ============================================================================
create table comments (
  id           uuid primary key default gen_random_uuid(),
  content_type text not null,                        -- 'writeup' | 'blog' | 'ctf'
  content_id   uuid not null,
  author_name  text,                                 -- invitado
  author_email text,
  user_id      uuid references profiles (id) on delete set null,  -- o registrado
  body         text not null,
  status       comment_status not null default 'pending',
  created_at   timestamptz not null default now()
);
create index comments_target_idx on comments (content_type, content_id);

-- ============================================================================
-- CALIFICACIONES  (1–5, una por usuario/huella y contenido)
-- ============================================================================
create table ratings (
  id           uuid primary key default gen_random_uuid(),
  content_type text not null,
  content_id   uuid not null,
  user_id      uuid references profiles (id) on delete set null,
  fingerprint  text,                                 -- anónimos (anti-duplicado)
  value        smallint not null check (value between 1 and 5),
  created_at   timestamptz not null default now(),
  unique (content_type, content_id, user_id),
  unique (content_type, content_id, fingerprint)
);
create index ratings_target_idx on ratings (content_type, content_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) — reglas de acceso
-- Regla general:
--   · El público puede LEER solo lo 'published'.
--   · El staff (admin/editor) gestiona todo.
--   · Cada autor gestiona lo suyo.
-- ============================================================================
alter table profiles  enable row level security;
alter table writeups  enable row level security;
alter table blog      enable row level security;
alter table ctf       enable row level security;
alter table resources enable row level security;
alter table comments  enable row level security;
alter table ratings   enable row level security;

-- Perfiles: cada quien ve/edita el suyo; el staff ve todos.
create policy "perfiles: lectura propia o staff" on profiles
  for select using (id = auth.uid() or is_staff());
create policy "perfiles: actualizar el propio" on profiles
  for update using (id = auth.uid());

-- Plantilla de políticas para tablas de contenido (writeups, blog, ctf).
-- Lectura pública de publicados + gestión por staff/autor.
do $$
declare t text;
begin
  foreach t in array array['writeups','blog','ctf'] loop
    execute format($f$
      create policy "%1$s: lectura pública de publicados" on %1$s
        for select using (status = 'published' or author_id = auth.uid() or is_staff());
      create policy "%1$s: crear como autenticado" on %1$s
        for insert with check (auth.uid() is not null);
      create policy "%1$s: actualizar propio o staff" on %1$s
        for update using (author_id = auth.uid() or is_staff());
      create policy "%1$s: borrar propio o staff" on %1$s
        for delete using (author_id = auth.uid() or is_staff());
    $f$, t);
  end loop;
end $$;

-- Recursos: lectura pública total; gestión por staff.
create policy "resources: lectura pública" on resources for select using (true);
create policy "resources: gestión staff"   on resources for all
  using (is_staff()) with check (is_staff());

-- Comentarios: se leen los aprobados; cualquiera puede enviar (queda 'pending');
-- el staff modera (update/delete).
create policy "comments: leer aprobados o staff" on comments
  for select using (status = 'approved' or is_staff());
create policy "comments: enviar" on comments
  for insert with check (true);
create policy "comments: moderar staff" on comments
  for update using (is_staff());
create policy "comments: borrar staff" on comments
  for delete using (is_staff());

-- Calificaciones: lectura pública (para medias); cualquiera puede votar.
create policy "ratings: lectura pública" on ratings for select using (true);
create policy "ratings: votar" on ratings for insert with check (true);

-- ============================================================================
-- FIN DEL ESQUEMA
-- ============================================================================
