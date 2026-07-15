# Roadmap — Evolución a Plataforma (Backend separado completo)

> Documento de planificación para transformar **Crypt0xDev** de un sitio estático
> (Astro + Markdown) en una **plataforma de contenido multiusuario** con panel de
> administración, colaboradores, comentarios, calificaciones y subida de medios.
>
> **Estado:** propuesta para revisión · **Fecha:** 2026-07 · **Autor:** Crypt0xDev

---

## 1. Visión

Hoy el proyecto es un blog/hub estático donde publicar exige editar archivos `.md`
y hacer commits. El objetivo es convertirlo en una plataforma donde:

1. **Se publica sin tocar código** — desde un panel web.
2. **Colaboran varias personas** — con roles y permisos.
3. **La audiencia interactúa** — comentarios y calificaciones por publicación.
4. **Se sube cualquier formato** — vídeo (embebido), imágenes, PDF y más.

Esto deja de ser un blog y pasa a ser una **plataforma multiusuario**. La estrategia
elegida es **backend separado completo**, pero **sin construir el backend desde cero**:
se usa un **Headless CMS** que ya trae panel, roles, auth y biblioteca de medios.

---

## 2. Arquitectura objetivo

```
┌─────────────────┐     API REST/GraphQL     ┌──────────────────────┐
│   FRONTEND      │ ───────────────────────► │   BACKEND (CMS)      │
│   Astro (SSR)   │                          │   Directus           │
│   web pública   │ ◄─────────────────────── │   Panel + Auth       │
└────────┬────────┘                          │   Roles/colaboradores│
         │                                    └──────────┬───────────┘
         ▼                                               ▼
┌─────────────────┐                          ┌──────────────────────┐
│  Vídeos         │                          │  PostgreSQL          │
│  YouTube/Bunny  │                          │  Object Storage (R2) │
│  (embebidos)    │                          │  → imágenes, PDF…    │
└─────────────────┘                          └──────────────────────┘
```

**Principio rector:** el contenido y los datos viven en el backend; los vídeos viven
en un servicio de vídeo (solo se guarda el enlace); el frontend solo consume la API.

---

## 3. Stack

| Capa | Tecnología | Motivo |
| :--- | :--- | :--- |
| Backend / CMS | **Directus** | Modelado de contenido desde la UI (sin código), roles finos, biblioteca de medios multiformato, API REST + GraphQL automática. |
| Base de datos | **PostgreSQL** | Estándar, robusta; gestionada por Directus. |
| Archivos (img/PDF) | **Cloudflare R2** (o S3) | Barato, sin costes de salida. |
| Vídeos | **YouTube / Bunny / Mux** | Embebidos; nunca en la base de datos. |
| Frontend | **Astro** (SSR/híbrido) | Se reaprovecha lo existente; ahora consume la API. |
| Hosting backend | **VPS (Hetzner) o Railway/Fly.io** | Directus + Postgres a bajo coste. |
| Hosting frontend | **Vercel** | Igual que ahora. |

> **Alternativa considerada:** *Payload CMS 3* (modelo definido en TypeScript). Se
> descarta como opción principal porque requiere tocar código para modelar, y una
> prioridad es publicar/gestionar sin código.

---

## 4. Modelo de datos (colecciones)

| Colección | Descripción | Campos clave |
| :--- | :--- | :--- |
| `users` | Colaboradores | rol (admin/editor/autor), nombre, email |
| `writeups` | Writeups de máquinas | los del schema actual + `video_url` |
| `blog` | Artículos | título, cuerpo, categoría, autor, estado |
| `ctf` | Retos CTF | categoría, dificultad, flags, `tools` |
| `resources` | Recursos | tipo, url, tags |
| `media` | Archivos (img/PDF…) | gestionado por Directus → R2 |
| `comments` | Comentarios | post, autor, texto, **estado** (pendiente/aprobado), fecha |
| `ratings` | Calificaciones | post, valor (1–5), usuario/huella |

Los schemas Zod actuales (`src/content.config.ts`) sirven como base directa para
modelar las colecciones de contenido — no se pierde el diseño ya hecho.

---

## 5. Roles de colaboradores

| Rol | Puede | No puede |
| :--- | :--- | :--- |
| **Admin** | Todo: usuarios, roles, publicar, moderar, configurar | — |
| **Editor** | Crear/editar/publicar cualquier contenido, moderar comentarios | Gestionar usuarios/roles |
| **Autor** | Crear y editar **su propio** contenido (queda en borrador hasta aprobación) | Publicar de otros, moderar |

---

## 6. Fases de ejecución

### Fase 1 — Fundación del backend
- Levantar **Directus + PostgreSQL** (docker-compose para desarrollo).
- Modelar colecciones: `writeups`, `blog`, `ctf`, `resources`, `comments`, `ratings`.
- Configurar **roles** (admin/editor/autor) y permisos.
- **Script de migración**: importar los ~72 archivos `.md` actuales (frontmatter +
  cuerpo) a la base de datos vía API. *No se pierde nada del contenido existente.*
- **Entregable:** backend funcionando con todo el contenido actual ya cargado.

### Fase 2 — Frontend conectado
- Cambiar Astro a modo **SSR/híbrido** (adaptador Node/Vercel).
- Reemplazar la lectura de `.md` por llamadas a la API de Directus.
- Componente **`<VideoEmbed>`** y galería de imágenes/PDF.
- Mantener búsqueda (Pagefind sobre páginas renderizadas, o índice desde la API).
- **Entregable:** la web pública se ve igual o mejor, pero servida desde el backend.

### Fase 3 — Interacción
- Colección `comments` con **moderación** (aprobar antes de mostrar).
- Colección `ratings` (1–5) con anti-duplicado.
- UI en el frontend + endpoints públicos con **rate-limiting**.
- **Entregable:** los visitantes pueden comentar y calificar cada publicación.

### Fase 4 — Pulido y seguridad
- (Opcional) Cuentas de usuarios públicos.
- Notificaciones, SEO dinámico, sitemap desde la API.
- **Hardening** (crítico por ser sitio de ciberseguridad): HTTPS, backups
  automáticos, rate-limiting, permisos mínimos, protección del panel de admin.
- **Entregable:** plataforma en producción, segura y respaldada.

---

## 7. Costes estimados (mensual)

| Concepto | Coste aprox. |
| :--- | :--- |
| VPS backend (Directus + Postgres) | 5–10 € |
| Object storage (R2) | ~0–2 € |
| Vídeos (YouTube/Vimeo) | 0 € · (Bunny/Mux si se quiere sin marca: 1–5 €) |
| Frontend (Vercel) | 0 € (hobby) |
| **Total** | **~5–15 €/mes** |

> Coste que hoy no existe (el sitio estático es gratis). Es el precio de tener
> colaboradores, panel e interacción. Justificado si de verdad habrá varios autores.

---

## 8. Riesgos y consideraciones

- **Superficie de ataque:** un backend expuesto es un objetivo real. En un sitio de
  ciberseguridad, el hardening no es opcional.
- **Mantenimiento:** actualizaciones, backups y monitorización pasan a ser tu
  responsabilidad (o del hosting gestionado).
- **Migración reversible:** el contenido `.md` se conserva en git hasta validar que
  la migración a la base de datos es correcta.

---

## 9. Decisiones pendientes (lo que necesito de ti)

1. **Hosting del backend:** ¿VPS propio (más barato, más control) o gestionado tipo
   Railway (más caro, menos mantenimiento)?
2. **Vídeos:** ¿YouTube/Vimeo (gratis, con su marca) o Bunny/Mux (de pago, sin marca)?
3. **Comentarios:** ¿con moderación previa (recomendado) o publicación directa?
4. **Cuentas públicas:** ¿los visitantes necesitan registrarse para comentar, o se
   permite comentar como invitado con moderación?

---

## 10. Próximo paso propuesto

Empezar por una **prueba de concepto (POC)** de la Fase 1: Directus + Postgres
corriendo en local, una colección modelada y el frontend leyendo de la API — para
verlo funcionando antes de comprometerse con la migración completa.
