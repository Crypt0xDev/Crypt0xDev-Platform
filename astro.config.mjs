// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://crypt0xdev.com',
  output: 'static',
  
  // Integraciones
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
      filter: (page) => 
        !page.includes('/404') && 
        !page.includes('/api/') &&
        !page.includes('/_astro/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    tailwind({
      applyBaseStyles: false, // No aplicar estilos base para tener control total
    }),
    // Pagefind - Indexación de búsqueda
    {
      name: 'pagefind',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const { execSync } = await import('child_process');
          const path = await import('path');
          const siteDir = path.join(process.cwd(), 'dist');
          execSync(`npx pagefind --site "${siteDir}" --glob "**/{es,en}/**/*.html"`, {
            stdio: 'inherit'
          });
        }
      }
    }
  ],
  
  // Configuración de i18n
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  
  // Configuración de markdown
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  
  // Performance optimizations (Astro ya optimiza por defecto)
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
          },
        },
      },
    },
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 4321,
    host: true,
  },
  
  // Compresión HTML (Astro lo hace por defecto en producción)
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
