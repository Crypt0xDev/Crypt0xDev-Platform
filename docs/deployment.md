# 🚀 Guía de Despliegue

Guía completa para desplegar Crypt0xDev en diferentes plataformas.

## 📋 Tabla de Contenidos

- [Build de Producción](#build-de-producción)
- [Vercel (Recomendado)](#vercel-recomendado)
- [Netlify](#netlify)
- [Cloudflare Pages](#cloudflare-pages)
- [GitHub Pages](#github-pages)
- [VPS/Servidor Propio](#vpsservidor-propio)
- [Docker](#docker)
- [Variables de Entorno](#variables-de-entorno)
- [CI/CD](#cicd)
- [Optimizaciones](#optimizaciones)

---

## 🏗️ Build de Producción

### Preparar Build

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con valores de producción

# Ejecutar tests
npm test

# Verificar TypeScript
npm run astro check

# Build de producción
npm run build

# Preview local del build
npm run preview
```

### Estructura de Build

```
dist/
├── _astro/          # Assets optimizados (CSS, JS)
├── images/          # Imágenes estáticas
├── pagefind/        # Índice de búsqueda
├── es/              # Sitio en español
│   ├── index.html
│   ├── blog/
│   ├── writeups/
│   └── ...
├── en/              # Sitio en inglés
│   ├── index.html
│   ├── blog/
│   ├── writeups/
│   └── ...
├── sitemap-*.xml    # Sitemaps
└── robots.txt       # Robots.txt
```

---

## 🌐 Vercel (Recomendado)

### Ventajas

- ✅ Zero-config para Astro
- ✅ Edge Functions
- ✅ Analytics integrado
- ✅ Preview deployments automáticos
- ✅ HTTPS automático
- ✅ CDN global

### Deploy desde GitHub

1. **Importar proyecto**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Import Project"
   - Conecta tu repositorio de GitHub

2. **Configuración automática**

   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Variables de entorno**
   - Settings → Environment Variables
   - Agregar variables de `.env.example`

4. **Deploy**
   - Click "Deploy"
   - Cada push a `main` despliega automáticamente

### Configuración vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "astro",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "/es",
      "permanent": true
    }
  ]
}
```

### Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

## 🔷 Netlify

### Deploy Manual

```bash
# Build
npm run build

# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/es/:splat"
  status = 200
  force = false

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Deploy desde GitHub

1. Conecta repositorio en [netlify.com](https://netlify.com)
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

---

## ☁️ Cloudflare Pages

### Configuración

```bash
# Build localmente
npm run build

# Instalar Wrangler CLI
npm i -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy dist
```

### Desde GitHub

1. Ve a Cloudflare Pages
2. Conecta repositorio
3. Configuración:
   ```
   Build command: npm run build
   Build output directory: dist
   ```

### wrangler.toml

```toml
name = "crypt0xdev"
compatibility_date = "2024-04-11"

[site]
bucket = "./dist"

[[redirects]]
from = "/"
to = "/es"
status = 301
```

---

## 📄 GitHub Pages

### Workflow para GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          PUBLIC_SITE_URL: https://crypt0xdev.github.io

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### astro.config.mjs para GitHub Pages

```javascript
export default defineConfig({
  site: 'https://crypt0xdev.github.io',
  base: '/', // o '/repo-name' si no es user/org page
  // ... resto de config
});
```

---

## 🖥️ VPS/Servidor Propio

### Con Node.js + PM2

```bash
# En el servidor
cd /var/www/crypt0xdev

# Clonar repositorio
git clone https://github.com/Crypt0xDev/Crypt0.git .

# Instalar dependencias
npm install

# Build
npm run build

# Servir con servidor estático
npm i -g serve
serve -s dist -l 3000

# O usar PM2
npm i -g pm2
pm2 serve dist 3000 --name crypt0xdev --spa
pm2 save
pm2 startup
```

### Con Nginx

```nginx
# /etc/nginx/sites-available/crypt0xdev
server {
    listen 80;
    server_name crypt0xdev.com www.crypt0xdev.com;

    root /var/www/crypt0xdev/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css text/javascript application/javascript;

    # Cache static assets
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /es/index.html;
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/crypt0xdev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### HTTPS con Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d crypt0xdev.com -d www.crypt0xdev.com
```

---

## 🐳 Docker

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  crypt0xdev:
    build: .
    ports:
      - '80:80'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build y Run

```bash
# Build imagen
docker build -t crypt0xdev .

# Run container
docker run -d -p 80:80 --name crypt0xdev crypt0xdev

# Con docker-compose
docker-compose up -d
```

---

## 🔐 Variables de Entorno

### Producción

```bash
# .env.production
PUBLIC_SITE_URL=https://crypt0xdev.com
NODE_ENV=production
SENTRY_DSN=https://xxx@sentry.io/xxx
PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Por Plataforma

**Vercel**

- Dashboard → Settings → Environment Variables

**Netlify**

- Site settings → Build & deploy → Environment

**GitHub Actions**

- Settings → Secrets and variables → Actions

**Cloudflare**

- Dashboard → Workers & Pages → Settings → Variables

---

## 🔄 CI/CD

### GitHub Actions - Pipeline Completo

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: TypeScript check
        run: npm run astro check

      - name: Build
        run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## ⚡ Optimizaciones

### Performance

```javascript
// astro.config.mjs
export default defineConfig({
  // Optimizar build
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },

  // Compresión
  compressHTML: true,

  // Vite optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
          },
        },
      },
    },
  },
});
```

### CDN para Assets

Subir `/public/images/` a Cloudinary o AWS S3.

```typescript
// En producción, usar CDN URLs
const imageUrl = import.meta.env.PROD
  ? `https://cdn.crypt0xdev.com/images/${image}`
  : `/images/${image}`;
```

### Cache Headers

```nginx
# Nginx
location /_astro/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location ~* \.(jpg|jpeg|png|gif|svg|webp)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000";
}
```

---

## 📊 Monitoreo

### Sentry

```javascript
// astro.config.mjs
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    sentry({
      dsn: process.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: 'crypt0xdev',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
});
```

### Analytics

- **Vercel Analytics** - Incluido automáticamente
- **Google Analytics** - Via `PUBLIC_GA_TRACKING_ID`
- **Plausible** - Privacy-friendly alternative

---

## ✅ Checklist Pre-Deploy

- [ ] Tests pasan (`npm test`)
- [ ] TypeScript sin errores (`npm run astro check`)
- [ ] Build exitoso (`npm run build`)
- [ ] Preview funcional (`npm run preview`)
- [ ] Variables de entorno configuradas
- [ ] Sitemap generado
- [ ] robots.txt configurado
- [ ] SEO optimizado
- [ ] Images optimizadas
- [ ] HTTPS habilitado
- [ ] CDN configurado
- [ ] Monitoring activo
- [ ] Backup configurado

---

## 🆘 Troubleshooting

### Build falla

```bash
# Limpiar cache
rm -rf node_modules dist .astro
npm install
npm run build
```

### 404 en rutas

Configurar fallback a `index.html` en tu servidor.

### Imágenes no cargan

Verificar rutas absolutas desde `/public/`.

---

## 📞 Soporte

- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [Vercel Docs](https://vercel.com/docs)
- GitHub Issues para problemas específicos

---

**Última actualización**: Abril 2024
