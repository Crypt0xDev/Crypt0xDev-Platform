# 🌐 Guía de Internacionalización (i18n)

Sistema completo de internacionalización para contenido bilingüe (Español/Inglés).

## 📋 Tabla de Contenidos

- [Arquitectura i18n](#arquitectura-i18n)
- [Idiomas Soportados](#idiomas-soportados)
- [Traducciones de UI](#traducciones-de-ui)
- [Contenido Bilingüe](#contenido-bilingüe)
- [Utilidades i18n](#utilidades-i18n)
- [Mejores Prácticas](#mejores-prácticas)

---

## 🏗️ Arquitectura i18n

```
src/i18n/
├── constants/          # Constantes i18n
│   ├── platforms.ts   # Configuración de plataformas
│   ├── categories.ts  # Categorías traducidas
│   ├── difficulty.ts  # Niveles de dificultad
│   └── index.ts       # Exports consolidados
├── core/              # Funciones core i18n
│   └── index.ts       # Helper functions
├── translations/      # Archivos de traducción
│   ├── en.json        # Inglés
│   └── es.json        # Español
├── types/             # Tipos TypeScript
│   ├── i18n.ts
│   ├── platform.ts
│   ├── content.ts
│   └── search.ts
└── utils/             # Utilidades
    ├── content.ts     # Helpers de contenido
    ├── date.ts        # Formato de fechas
    ├── string.ts      # Manipulación de strings
    ├── validation.ts  # Validaciones
    └── __tests__/     # Tests unitarios
```

---

## 🌍 Idiomas Soportados

### Configuración Actual

```typescript
// src/i18n/core/index.ts
export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'es';
```

### Astro Config

```javascript
// astro.config.mjs
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en'],
  routing: {
    prefixDefaultLocale: true,
  },
}
```

---

## 🎨 Traducciones de UI

### Archivos de Traducción

Ubicados en `src/i18n/translations/`:

**es.json** (161 líneas)

```json
{
  "nav": {
    "home": "Inicio",
    "writeups": "Writeups",
    "blog": "Blog",
    "resources": "Recursos",
    "about": "Acerca de"
  },
  "blog": {
    "title": "Blog",
    "latest_posts": "Últimas Publicaciones",
    "read_more": "Leer más"
  }
}
```

**en.json** (161 líneas)

```json
{
  "nav": {
    "home": "Home",
    "writeups": "Writeups",
    "blog": "Blog",
    "resources": "Resources",
    "about": "About"
  },
  "blog": {
    "title": "Blog",
    "latest_posts": "Latest Posts",
    "read_more": "Read more"
  }
}
```

### Uso en Componentes

```astro
---
// En componentes Astro
import { getLangFromUrl, useTranslations } from '@i18n/core';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<nav>
  <a href={`/${lang}`}>{t('nav.home')}</a>
  <a href={`/${lang}/blog`}>{t('nav.blog')}</a>
</nav>

<h1>{t('blog.title')}</h1>
```

### Función de Traducción

```typescript
// Uso básico
const t = useTranslations('es');
t('nav.home'); // "Inicio"

// Con dot notation
t('blog.latest_posts'); // "Últimas Publicaciones"

// Fallback si no existe
t('inexistente.key'); // "inexistente.key"
```

---

## 📝 Contenido Bilingüe

### Estructura de Carpetas

**REGLA DE ORO**: Cada archivo en `/es/` debe tener su equivalente en `/en/`

```
src/content/
├── blog/
│   ├── en/
│   │   ├── tutorial/
│   │   │   └── pentesting-lab.md
│   │   └── news/
│   │       └── log4shell-vulnerability.md
│   └── es/
│       ├── tutorial/
│       │   └── laboratorio-pentesting.md
│       └── news/
│           └── log4shell-vulnerabilidad.md
├── writeups/
│   ├── en/
│   │   └── hackthebox/
│   │       └── blackfield.md
│   └── es/
│       └── hackthebox/
│           └── blackfield.md
└── ...
```

### Frontmatter de Contenido

```markdown
---
# ESPAÑOL
title: 'Laboratorio de Pentesting'
description: 'Guía para montar tu lab'
language: es # ← IMPORTANTE
tags: ['pentesting', 'laboratorio']
---

# Contenido en español...
```

```markdown
---
# INGLÉS
title: 'Pentesting Lab'
description: 'Guide to set up your lab'
language: en # ← IMPORTANTE
tags: ['pentesting', 'lab']
---

# Content in English...
```

### Filtrar por Idioma

```typescript
import { getCollection } from 'astro:content';
import { filterByLang } from '@i18n/utils/content';

// Obtener todos los posts
const allPosts = await getCollection('blog');

// Filtrar por idioma
const spanishPosts = filterByLang(allPosts, 'es');
const englishPosts = filterByLang(allPosts, 'en');
```

---

## 🛠️ Utilidades i18n

### Date Utils

```typescript
import { formatDate } from '@i18n/utils/date';

// Formatear fecha según idioma
formatDate(new Date(), 'es'); // "11 de abril de 2024"
formatDate(new Date(), 'en'); // "April 11, 2024"

// Con formato personalizado
formatDate(new Date(), 'es', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

### String Utils

```typescript
import { slugify, capitalize } from '@i18n/utils/string';

// Crear slug
slugify('Máquinas de HackTheBox'); // "maquinas-de-hackthebox"

// Capitalizar
capitalize('hello world'); // "Hello world"
```

### Content Utils

```typescript
import { groupBy, sortByDate, filterByLang } from '@i18n/utils/content';

// Agrupar por categoría
const grouped = groupBy(posts, 'category');
// { tutorial: [...], news: [...] }

// Ordenar por fecha (más reciente primero)
const sorted = sortByDate(posts);

// Filtrar por idioma
const spanish = filterByLang(posts, 'es');
```

---

## 🔗 Rutas i18n

### Estructura de URLs

```
https://crypt0xdev.com/
├── /es/                    # Español (default)
│   ├── /es/blog/
│   ├── /es/writeups/
│   └── /es/about/
└── /en/                    # Inglés
    ├── /en/blog/
    ├── /en/writeups/
    └── /en/about/
```

### Generar Rutas Localizadas

```typescript
import { getLocalizedPath } from '@i18n/core';

// Cambiar idioma de una ruta
getLocalizedPath('/es/blog/post', 'en');
// → "/en/blog/post"

getLocalizedPath('/en/about', 'es');
// → "/es/about"
```

### Páginas Dinámicas

```astro
---
// src/pages/[lang]/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts.map(post => ({
    params: {
      lang: post.data.language,
      slug: post.slug
    },
    props: { post }
  }));
}
---
```

---

## 🎯 Constantes Traducidas

### Plataformas

```typescript
// src/i18n/constants/platforms.ts
export const PLATFORMS = {
  htb: {
    name: 'HackTheBox',
    slug: 'hackthebox',
    url: 'https://www.hackthebox.com',
    color: {
      primary: '#9FEF00',
      gradient: 'from-blue-500 to-blue-700',
    },
    icon: '🎯',
  },
  // ...
};
```

### Categorías (traducidas)

```typescript
// Ejemplo de uso
import { CATEGORIES } from '@i18n/constants/categories';

CATEGORIES.blog.tutorial.es; // "Tutorial"
CATEGORIES.blog.tutorial.en; // "Tutorial"

CATEGORIES.blog.news.es; // "Noticias"
CATEGORIES.blog.news.en; // "News"
```

### Dificultad

```typescript
import { DIFFICULTY } from '@i18n/constants/difficulty';

DIFFICULTY.easy.es; // "Fácil"
DIFFICULTY.easy.en; // "Easy"

DIFFICULTY.hard.color; // "red"
DIFFICULTY.hard.icon; // "🔴"
```

---

## ✅ Mejores Prácticas

### 1. Consistencia en Traducciones

```json
// ✅ BUENO - Keys consistentes
{
  "nav.home": "...",
  "nav.blog": "...",
  "nav.about": "..."
}

// ❌ MALO - Inconsistente
{
  "navHome": "...",
  "navigation.blog": "...",
  "ABOUT": "..."
}
```

### 2. Namespacing

```json
{
  "nav": { "home": "Inicio" },
  "blog": { "title": "Blog" },
  "footer": { "rights": "Derechos" }
}
```

### 3. Validar Contenido Bilingüe

```bash
# Script para verificar que cada archivo en /es tenga su /en
find src/content -path "*/es/*.md" | while read file; do
  en_file="${file//\/es\//\/en\/}"
  [ ! -f "$en_file" ] && echo "❌ Missing: $en_file"
done
```

### 4. Usar Constantes

```typescript
// ✅ BUENO
import { PLATFORMS } from '@i18n/constants/platforms';
const htbName = PLATFORMS.htb.name;

// ❌ MALO - Hardcoded
const htbName = 'HackTheBox';
```

### 5. Fallback a Idioma Por Defecto

```typescript
// Si no existe traducción, usar español
const content = post.data.language === 'en' ? post : fallbackToSpanish(post);
```

---

## 🧪 Testing i18n

```typescript
// src/i18n/utils/__tests__/date.test.ts
import { test, expect } from 'vitest';
import { formatDate } from '../date';

test('Format date in Spanish', () => {
  const date = new Date('2024-04-11');
  expect(formatDate(date, 'es')).toContain('abril');
});

test('Format date in English', () => {
  const date = new Date('2024-04-11');
  expect(formatDate(date, 'en')).toContain('April');
});
```

---

## 🌐 Agregar Nuevo Idioma

### 1. Actualizar Core

```typescript
// src/i18n/core/index.ts
export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français', // ← Nuevo
};
```

### 2. Crear Archivo de Traducción

```json
// src/i18n/translations/fr.json
{
  "nav": {
    "home": "Accueil",
    "blog": "Blog"
  }
}
```

### 3. Actualizar Astro Config

```javascript
// astro.config.mjs
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en', 'fr'],
}
```

### 4. Crear Estructura de Contenido

```
src/content/
├── blog/fr/
├── writeups/fr/
└── ...
```

---

## 📊 Checklist de i18n

Al crear contenido nuevo:

- [ ] Archivo creado en `/es/`
- [ ] Archivo creado en `/en/`
- [ ] Campo `language` correcto en frontmatter
- [ ] Misma estructura de carpetas en ambos idiomas
- [ ] Imágenes accesibles desde ambos idiomas
- [ ] URLs traducidas cuando sea necesario
- [ ] Metadatos (title, description) traducidos
- [ ] Tags en el idioma correspondiente

---

## 🔍 Debugging

### Ver Idioma Actual

```astro
---
import { getLangFromUrl } from '@i18n/core';
const lang = getLangFromUrl(Astro.url);
console.log('Current language:', lang);
---
```

### Verificar Traducciones Faltantes

```typescript
const t = useTranslations('es');
const missing = [];

// Verificar keys importantes
['nav.home', 'nav.blog', 'footer.rights'].forEach((key) => {
  if (t(key) === key) missing.push(key);
});

console.log('Missing translations:', missing);
```

---

## 📞 Soporte

- Archivos de ejemplo en `src/content/`
- Tests en `src/i18n/utils/__tests__/`
- Configuración en `src/i18n/core/index.ts`

---

**Última actualización**: Abril 2024
