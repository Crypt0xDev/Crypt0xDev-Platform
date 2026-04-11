# 🏗️ Arquitectura del Proyecto

Documentación técnica de la arquitectura de Crypt0xDev.

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura de Archivos](#estructura-de-archivos)
- [Sistema de Contenido](#sistema-de-contenido)
- [Internacionalización](#internacionalización)
- [Routing](#routing)
- [Componentes](#componentes)
- [Testing](#testing)
- [Performance](#performance)
- [Seguridad](#seguridad)

---

## 🎯 Visión General

Crypt0xDev es una plataforma web estática (SSG) construida con **Astro**, optimizada para contenido bilingüe de ciberseguridad.

### Características Principales

- ✅ **Static Site Generation (SSG)** - Máxima performance
- ✅ **Contenido basado en Markdown** - Fácil de escribir y mantener
- ✅ **Bilingüe (ES/EN)** - i18n completo
- ✅ **Type-safe** - TypeScript + Zod schemas
- ✅ **Component-driven** - Astro components reutilizables
- ✅ **SEO optimizado** - Meta tags, sitemaps, structured data
- ✅ **Búsqueda client-side** - Pagefind integration
- ✅ **Dark mode** - Tema claro/oscuro
- ✅ **Responsive** - Mobile-first design

---

## 🛠️ Stack Tecnológico

### Core

| Tecnología      | Versión | Propósito                 |
| --------------- | ------- | ------------------------- |
| **Astro**       | 5.18.0  | Framework principal (SSG) |
| **TypeScript**  | 5.9.3   | Type safety               |
| **TailwindCSS** | 3.4.19  | Styling                   |
| **Vitest**      | 4.0.18  | Testing framework         |

### Integraciones

| Integración              | Propósito              |
| ------------------------ | ---------------------- |
| `@astrojs/sitemap`       | Generación de sitemap  |
| `@astrojs/tailwind`      | TailwindCSS support    |
| `@sentry/astro`          | Error tracking         |
| `@vercel/speed-insights` | Performance monitoring |
| `pagefind`               | Client-side search     |

### Content Management

| Tecnología                    | Propósito         |
| ----------------------------- | ----------------- |
| **Astro Content Collections** | Type-safe content |
| **Zod**                       | Schema validation |
| **Markdown**                  | Content format    |
| **Frontmatter**               | Metadata          |

---

## 📂 Estructura de Archivos

### Árbol de Directorios

```
crypt0xdev/
├── public/                      # Assets estáticos
│   ├── fonts/                   # Web fonts (Inter, JetBrains Mono)
│   ├── images/                  # Imágenes públicas
│   │   ├── blog/
│   │   ├── writeups/
│   │   ├── platforms/
│   │   └── ctf/
│   ├── favicons/               # Favicon variants
│   └── scripts/                # Client-side scripts
│       └── theme.js            # Dark mode toggle
│
├── src/
│   ├── assets/                 # Assets procesados por Astro
│   │
│   ├── components/             # Componentes Astro
│   │   ├── common/            # Componentes comunes
│   │   │   ├── Breadcrumb.astro
│   │   │   ├── PagefindSearch.astro
│   │   │   ├── RelatedPosts.astro
│   │   │   ├── SearchBox.astro
│   │   │   └── TOC.astro
│   │   ├── shared/            # Componentes compartidos
│   │   │   ├── Badge.astro
│   │   │   ├── Button.astro
│   │   │   └── Card.astro
│   │   ├── ui/                # UI components
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ThemeToggle.astro
│   │   │   └── LanguageSwitcher.astro
│   │   └── writeup/           # Componentes específicos
│   │       └── RelatedWriteups.astro
│   │
│   ├── content/               # Contenido Markdown
│   │   ├── blog/
│   │   │   ├── en/
│   │   │   └── es/
│   │   ├── ctf/
│   │   │   ├── en/
│   │   │   └── es/
│   │   ├── resources/
│   │   │   ├── en/
│   │   │   └── es/
│   │   ├── writeups/
│   │   │   ├── en/
│   │   │   └── es/
│   │   ├── config.ts          # Zod schemas
│   │   └── site.ts            # Site config
│   │
│   ├── i18n/                  # Sistema i18n
│   │   ├── constants/         # Constantes traducidas
│   │   │   ├── platforms.ts   # HTB, THM, VulnHub, etc.
│   │   │   ├── categories.ts  # Categorías
│   │   │   ├── difficulty.ts  # Niveles de dificultad
│   │   │   └── index.ts
│   │   ├── core/              # Core i18n
│   │   │   └── index.ts       # Language helpers
│   │   ├── translations/      # JSON translations
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   ├── types/             # TypeScript types
│   │   │   ├── i18n.ts
│   │   │   ├── platform.ts
│   │   │   ├── content.ts
│   │   │   └── search.ts
│   │   └── utils/             # Utilidades
│   │       ├── content.ts     # Content helpers
│   │       ├── date.ts        # Date formatting
│   │       ├── string.ts      # String utils
│   │       ├── validation.ts  # Validators
│   │       └── __tests__/     # Unit tests
│   │
│   ├── layouts/               # Page layouts
│   │   ├── Layout.astro       # Base layout
│   │   ├── PageLayout.astro   # Page wrapper
│   │   ├── BlogLayout.astro   # Blog post layout
│   │   └── WriteupLayout.astro # Writeup layout
│   │
│   ├── pages/                 # Routes (file-based routing)
│   │   ├── index.astro        # Homepage redirect
│   │   ├── 404.astro          # Not found page
│   │   ├── api/               # API endpoints
│   │   │   ├── search.json.ts
│   │   │   └── search-debug.json.ts
│   │   └── [lang]/            # i18n routes
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── blog/
│   │       ├── ctf/
│   │       ├── writeup/
│   │       ├── resources/
│   │       ├── search/
│   │       └── tag/
│   │
│   ├── scripts/               # Build scripts
│   │
│   └── styles/                # Global styles
│       ├── global.css         # Global CSS
│       ├── base/
│       │   ├── reset.css
│       │   └── animations.css
│       ├── components/
│       │   ├── layout.css
│       │   ├── platforms.css
│       │   └── prose.css
│       └── utilities/
│           └── helpers.css
│
├── scripts/                   # Automation scripts
│   └── generate-placeholder-images.js
│
├── docs/                      # Documentation
│   ├── README.md
│   ├── content-guide.md
│   ├── i18n-guide.md
│   ├── contributing.md
│   ├── deployment.md
│   └── architecture.md
│
├── .env.example               # Environment variables template
├── astro.config.mjs           # Astro configuration
├── package.json               # Dependencies
├── tailwind.config.mjs        # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vitest.config.ts           # Vitest configuration
```

---

## 📚 Sistema de Contenido

### Content Collections

Definidas en `src/content/config.ts`:

```typescript
// 4 colecciones principales
export const collections = {
  blog, // Posts de blog
  writeups, // Writeups de máquinas
  ctf, // CTF challenges
  resources, // Recursos (tools, cheatsheets, etc.)
};
```

### Schemas con Zod

```typescript
// Ejemplo: writeupSchema
const writeupSchema = z.object({
  // Campos obligatorios
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  platform: z.enum(['htb', 'tryhackme', 'vulnhub', 'hackmyvm']),
  difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
  os: z.enum(['linux', 'windows', 'other']),

  // Campos opcionales
  tags: z.array(z.string()).default([]),
  techniques: z.array(z.string()).optional(), // MITRE ATT&CK
  certifications: z.array(z.enum(['OSCP', 'OSWE', ...])).optional(),
  // ...
});
```

### Flujo de Contenido

```
1. Markdown file (.md)
   ↓
2. Frontmatter validation (Zod)
   ↓
3. Astro Content Collection
   ↓
4. Type-safe access en componentes
   ↓
5. Static HTML generation
```

---

## 🌐 Internacionalización

### Arquitectura i18n

```
┌─────────────────────────────────────┐
│  URL: /es/writeups/blackfield      │
│  URL: /en/writeups/blackfield      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  getLangFromUrl(Astro.url)         │
│  → 'es' o 'en'                     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  useTranslations(lang)             │
│  → t('nav.home')                   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  UI Text: "Inicio" / "Home"        │
└─────────────────────────────────────┘
```

### Contenido Bilingüe

```
src/content/writeups/
├── en/hackthebox/blackfield.md  (language: en)
└── es/hackthebox/blackfield.md  (language: es)
```

Ambos archivos tienen:

- Mismo slug: `hackthebox/blackfield`
- Diferente `language` en frontmatter
- URLs: `/en/writeup/hackthebox/blackfield` y `/es/writeup/hackthebox/blackfield`

### Translation Flow

```typescript
// 1. Detectar idioma de la URL
const lang = getLangFromUrl(Astro.url);

// 2. Cargar función de traducción
const t = useTranslations(lang);

// 3. Traducir UI
<h1>{t('blog.title')}</h1>

// 4. Filtrar contenido por idioma
const posts = await getCollection('blog');
const localizedPosts = filterByLang(posts, lang);
```

---

## 🛣️ Routing

### File-based Routing

Astro usa routing basado en archivos:

```
src/pages/
├── [lang]/
│   ├── index.astro           → /{lang}/
│   ├── about.astro           → /{lang}/about/
│   ├── blog/
│   │   ├── index.astro       → /{lang}/blog/
│   │   ├── [category]/
│   │   │   ├── index.astro   → /{lang}/blog/{category}/
│   │   │   └── [slug].astro  → /{lang}/blog/{category}/{slug}/
│   └── writeup/
│       └── [platform]/
│           └── [...slug].astro → /{lang}/writeup/{platform}/{slug}/
```

### Dynamic Routes

```astro
---
// src/pages/[lang]/writeup/[platform]/[...slug].astro

export async function getStaticPaths() {
  const writeups = await getCollection('writeups');

  return writeups.map(writeup => ({
    params: {
      lang: writeup.data.language,
      platform: writeup.slug.split('/')[0],
      slug: writeup.slug.split('/').slice(1).join('/')
    },
    props: { writeup }
  }));
}

const { writeup } = Astro.props;
---
```

### API Routes

```typescript
// src/pages/api/search.json.ts
export async function GET({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  // Búsqueda...

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

---

## 🧩 Componentes

### Jerarquía de Componentes

```
Layout.astro (base)
  ├── Header.astro
  │   ├── LanguageSwitcher.astro
  │   └── ThemeToggle.astro
  │
  ├── PageLayout.astro / BlogLayout.astro / WriteupLayout.astro
  │   ├── Breadcrumb.astro
  │   ├── TOC.astro
  │   ├── Card.astro
  │   ├── Badge.astro
  │   └── RelatedPosts.astro / RelatedWriteups.astro
  │
  └── Footer.astro
```

### Component Pattern

```astro
---
// src/components/shared/Card.astro
interface Props {
  title: string;
  description?: string;
  href?: string;
  image?: string;
  badge?: string;
}

const { title, description, href, image, badge } = Astro.props;
---

<article class="card">
  {image && <img src={image} alt={title} />}
  <div class="card-content">
    {badge && <Badge text={badge} />}
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {href && <a href={href}>Leer más →</a>}
  </div>
</article>

<style>
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md
           hover:shadow-lg transition-shadow;
  }
</style>
```

---

## 🧪 Testing

### Test Stack

- **Vitest** - Test runner
- **happy-dom** - DOM simulation
- **@testing-library** - Testing utilities

### Test Structure

```
src/i18n/utils/
├── content.ts
├── date.ts
└── __tests__/
    ├── content.test.ts
    ├── date.test.ts
    └── string.test.ts
```

### Example Test

```typescript
// src/i18n/utils/__tests__/date.test.ts
import { test, expect, describe } from 'vitest';
import { formatDate } from '../date';

describe('formatDate', () => {
  test('formats date in Spanish', () => {
    const date = new Date('2024-04-11');
    const result = formatDate(date, 'es');
    expect(result).toContain('abril');
  });

  test('formats date in English', () => {
    const date = new Date('2024-04-11');
    const result = formatDate(date, 'en');
    expect(result).toContain('April');
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:ui       # Run with UI
npm run test:coverage # Coverage report
```

---

## ⚡ Performance

### Build Optimizations

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS
    assets: '_assets', // Separate assets folder
  },
  compressHTML: true, // Minify HTML

  vite: {
    build: {
      cssCodeSplit: true, // Split CSS by route
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'], // Separate vendor bundle
          },
        },
      },
    },
  },
});
```

### Image Optimization

- **WebP format** - Mejor compresión
- **Responsive images** - srcset para diferentes tamaños
- **Lazy loading** - loading="lazy"
- **CDN** - Cloudinary/S3 para producción

### Code Splitting

```astro
---
// Dynamic imports para componentes pesados
const HeavyComponent = await import('./HeavyComponent.astro');
---
```

### Caching Strategy

```
Static assets: Cache-Control: max-age=31536000, immutable
HTML pages: Cache-Control: max-age=3600
API responses: Cache-Control: max-age=300
```

---

## 🔒 Seguridad

### Content Security Policy

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self' data:;
      "
/>
```

### Security Headers

```nginx
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### Input Validation

```typescript
// Validación con Zod en content schemas
const writeupSchema = z.object({
  title: z.string().max(200),
  description: z.string().max(500),
  // ...
});
```

### Sanitization

Markdown se procesa de forma segura por Astro (escaping automático).

---

## 📊 Data Flow

### Content → Page Flow

```
1. Markdown file with frontmatter
   ↓ (Astro reads)
2. Zod schema validation
   ↓ (TypeScript inference)
3. Content Collection entry
   ↓ (getCollection / getEntry)
4. Component receives typed data
   ↓ (Astro builds)
5. Static HTML output
```

### Request Flow (producción)

```
User request → CDN → Static HTML
                  ↓
            Pagefind (client-side search)
                  ↓
            Filter/display results
```

---

## 🔄 Build Pipeline

```
1. npm run build
   ↓
2. Astro compiles .astro files
   ↓
3. TypeScript transpilation
   ↓
4. TailwindCSS processing
   ↓
5. Markdown → HTML
   ↓
6. Content Collections validation
   ↓
7. Static pages generation
   ↓
8. Asset optimization
   ↓
9. Pagefind indexing
   ↓
10. dist/ folder ready
```

---

## 📐 Design Patterns

### Component Composition

```astro
<Layout>
  <PageLayout>
    <Breadcrumb />
    <Card>
      <Badge />
      <Content />
    </Card>
  </PageLayout>
</Layout>
```

### Props Drilling Prevention

Uso de Content Collections para compartir datos sin props drilling.

### Single Source of Truth

- **Config**: `src/content/site.ts`
- **Constants**: `src/i18n/constants/`
- **Types**: `src/i18n/types/`

---

## 🎯 Principios Arquitectónicos

1. **Type Safety** - TypeScript en todo el código
2. **DRY** - Reutilización de componentes y utils
3. **Separation of Concerns** - Lógica separada de presentación
4. **Performance First** - SSG, optimizaciones automáticas
5. **Developer Experience** - Hot reload, error messages claros
6. **Scalability** - Estructura modular, fácil de extender
7. **Accessibility** - Semantic HTML, ARIA labels
8. **SEO** - Meta tags, sitemaps, structured data

---

## 📞 Referencias

- [Astro Docs](https://docs.astro.build)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Zod Docs](https://zod.dev)

---

**Última actualización**: Abril 2024
