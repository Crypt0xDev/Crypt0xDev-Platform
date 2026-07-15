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

## 7. Escalabilidad y gestión a volumen

Escenario real: cientos de writeups por plataforma (p. ej. ~300 de HTB) que, sumando
todas las plataformas y categorías, llegan fácilmente a **600–1000+ entradas**. Esto
**refuerza** la decisión de panel/backend y añade estas consideraciones.

### Por qué el panel deja de ser opcional
Mantener 600+ archivos `.md` a mano (crear, renombrar, borrar, mover imágenes) es
inmanejable. Desde el panel, **añadir o quitar = un clic**, con búsqueda, filtros y
acciones en lote. Directus gestiona miles de registros sin problema.

### Los datos NO son el cuello de botella
600 —o 10.000— writeups son solo texto: unos pocos MB en PostgreSQL, que maneja
millones de filas. Lo que pesa son **imágenes/PDF/vídeo**, que van a object storage
(barato) y a hosts de vídeo, **nunca a la base de datos**.

### El punto crítico: estrategia de renderizado

| Estrategia | Cómo escala | Cuándo conviene |
| :--- | :--- | :--- |
| SSG puro (construir cada página en cada deploy) | Bien hasta ~1–2k páginas; el build tarda cada vez más | Pocos cientos, cambios poco frecuentes |
| **SSR/híbrido + caché (recomendado)** | Renderiza bajo demanda y cachea; publicar/quitar es **inmediato, sin reconstruir todo** | Cientos/miles con cambios frecuentes desde el panel |

Con un panel que añade/quita contenido a diario, **SSR/híbrido con caché** es la
opción: publicar un writeup lo hace visible al instante sin recompilar 600 páginas.

### UX de listados a volumen
- **Paginación** — nunca mostrar 600 entradas en una sola página.
- **Filtros** — por plataforma, dificultad, OS, tags, certificación.
- **Búsqueda** full-text sobre todo el catálogo.

### Impacto en las fases
- La **Fase 2** prioriza **SSR/híbrido con caché** en lugar de SSG puro.
- Paginación y filtros en los listados desde el inicio, no como añadido posterior.

---

## 8. Costes estimados (mensual)

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

## 9. Riesgos y consideraciones

- **Superficie de ataque:** un backend expuesto es un objetivo real. En un sitio de
  ciberseguridad, el hardening no es opcional.
- **Mantenimiento:** actualizaciones, backups y monitorización pasan a ser tu
  responsabilidad (o del hosting gestionado).
- **Migración reversible:** el contenido `.md` se conserva en git hasta validar que
  la migración a la base de datos es correcta.

---

## 10. Decisiones pendientes (lo que necesito de ti)

1. **Hosting del backend:** ¿VPS propio (más barato, más control) o gestionado tipo
   Railway (más caro, menos mantenimiento)?
2. **Vídeos:** ¿YouTube/Vimeo (gratis, con su marca) o Bunny/Mux (de pago, sin marca)?
3. **Comentarios:** ¿con moderación previa (recomendado) o publicación directa?
4. **Cuentas públicas:** ¿los visitantes necesitan registrarse para comentar, o se
   permite comentar como invitado con moderación?

---

## 11. Próximo paso propuesto

Empezar por una **prueba de concepto (POC)** de la Fase 1: Directus + Postgres
corriendo en local, una colección modelada y el frontend leyendo de la API — para
verlo funcionando antes de comprometerse con la migración completa.
