# 🛠️ Guía de Instalación y Configuración - Crypt0xDev

<div align="center">

![Setup Guide](https://img.shields.io/badge/Guía-Instalación-blue?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Dificultad-Principiante-green?style=for-the-badge)
![Time](https://img.shields.io/badge/Tiempo-10--15_min-orange?style=for-the-badge)

**Guía paso a paso para configurar y ejecutar Crypt0xDev en tu entorno local**

</div>

---

## 📋 **Tabla de Contenidos**

1. [🔧 Prerrequisitos del Sistema](#-prerrequisitos-del-sistema)
2. [⚡ Instalación Rápida](#-instalación-rápida)
3. [🔧 Configuración Detallada](#-configuración-detallada)
4. [🚀 Comandos de Desarrollo](#-comandos-de-desarrollo)
5. [🌐 Configuración de VS Code](#-configuración-de-vs-code)
6. [📦 Gestión de Dependencias](#-gestión-de-dependencias)
7. [🔍 Troubleshooting](#-troubleshooting)
8. [🚀 Despliegue en Producción](#-despliegue-en-producción)

---

## 🔧 **Prerrequisitos del Sistema**

### **Software Requerido**

#### 1. Node.js (Obligatorio)
```bash
# Versión mínima requerida: 18.20.8 LTS
# Recomendado: Última versión LTS

# Verificar versión instalada
node --version

# Si no tienes Node.js instalado:
# Windows: Descargar desde https://nodejs.org/
# macOS: brew install node
# Linux (Ubuntu/Debian): 
sudo apt update
sudo apt install nodejs npm

# Linux (CentOS/RHEL):
sudo yum install nodejs npm
```

#### 2. pnpm (Gestor de Paquetes Recomendado)
```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Verificar instalación
pnpm --version

# Alternativa: usar npm (funciona pero menos eficiente)
# npm install en lugar de pnpm install
```

#### 3. Git (Control de Versiones)
```bash
# Verificar si Git está instalado
git --version

# Si no está instalado:
# Windows: Descargar desde https://git-scm.com/
# macOS: brew install git
# Linux: sudo apt install git
```

### **Verificación de Prerrequisitos**
```bash
# Script de verificación completo
echo "🔍 Verificando prerrequisitos..."

echo "📦 Node.js:"
node --version

echo "🚀 pnpm:"
pnpm --version

echo "🔧 Git:"
git --version

echo "✅ Todos los prerrequisitos verificados!"
```

### **Especificaciones Mínimas del Sistema**

| **Componente** | **Mínimo** | **Recomendado** |
|----------------|------------|-----------------|
| **RAM** | 4GB | 8GB+ |
| **Almacenamiento** | 1GB libre | 5GB+ libre |
| **CPU** | Dual-core | Quad-core+ |
| **Conexión** | Banda ancha | Fibra óptica |
| **OS** | Windows 10, macOS 10.15, Ubuntu 18.04 | Última versión estable |

---

## ⚡ **Instalación Rápida**

### **Método 1: Clonar Repositorio (Recomendado)**

```bash
# 1. Clonar el repositorio
git clone https://github.com/Crypt0xDev/Crypt0xDev.git

# 2. Navegar al directorio
cd Crypt0xDev

# 3. Instalar dependencias
pnpm install

# 4. Iniciar servidor de desarrollo
pnpm dev

# 5. Abrir en el navegador
# http://localhost:4321
```

### **Método 2: Fork para Contribuir**

```bash
# 1. Fork el repositorio en GitHub (usar botón Fork)

# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/Crypt0xDev.git
cd Crypt0xDev

# 3. Configurar upstream
git remote add upstream https://github.com/Crypt0xDev/Crypt0xDev.git

# 4. Instalar y ejecutar
pnpm install
pnpm dev
```

### **Método 3: Descarga Direct**

```bash
# Si no tienes Git instalado
# 1. Ir a https://github.com/Crypt0xDev/Crypt0xDev
# 2. Click en "Code" > "Download ZIP"  
# 3. Extraer archivo ZIP
# 4. Abrir terminal en la carpeta extraída

cd Crypt0xDev-main
pnpm install
pnpm dev
```

---

## 🔧 **Configuración Detallada**

### **Estructura de Instalación**

Después de la instalación, tu estructura debería verse así:

```
Crypt0xDev/
├── 📁 node_modules/          # Dependencias (generado por pnpm install)
├── 📁 public/                # Assets estáticos
├── 📁 src/                   # Código fuente

├── 📄 .astro/                # Cache de Astro (generado automáticamente)
├── 📄 astro.config.mjs       # Configuración principal
├── 📄 package.json           # Metadatos del proyecto
├── 📄 pnpm-lock.yaml         # Lockfile de dependencias
├── 📄 tsconfig.json          # Configuración TypeScript
└── 📄 README.md              # Documentación principal
```

### **Variables de Entorno (Opcional)**

```bash
# Crear archivo .env.local para configuración local
touch .env.local

# Contenido ejemplo:
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ANALYTICS_ID=your_analytics_id_here
```

### **Configuración de Puerto (Si 4321 está ocupado)**

```bash
# Opción 1: Usar flag --port
pnpm dev --port 3000

# Opción 2: Configurar en astro.config.mjs
# server: {
#   port: 3000,
#   host: true
# }
```

---

## 🚀 **Comandos de Desarrollo**

### **Scripts Principales**

| **Comando** | **Función** | **Cuándo Usar** |
|-------------|-------------|-----------------|
| `pnpm dev` | Servidor desarrollo con hot reload | Desarrollo diario |
| `pnpm build` | Build optimizado para producción | Antes de deploy |
| `pnpm preview` | Previsualizar build local | Testing pre-deploy |
| `pnpm astro` | CLI de Astro para comandos avanzados | Debugging avanzado |

### **Workflow de Desarrollo Típico**

```bash
# 1. Iniciar desarrollo
pnpm dev
# ➜ Servidor corriendo en http://localhost:4321

# 2. Hacer cambios en archivos
# Los cambios se reflejan automáticamente (hot reload)

# 3. Verificar build antes de commit
pnpm build
# ➜ Build en ./dist/

# 4. Previsualizar build (opcional)
pnpm preview
# ➜ Preview en http://localhost:4321

# 5. Commit cambios
git add .
git commit -m "feat: nueva funcionalidad"
```

### **Comandos Útiles de Astro**

```bash
# Ver todas las páginas que se generarán
pnpm astro build --dry-run

# Información del proyecto
pnpm astro info

# Sincronizar Content Collections
pnpm astro sync

# Verificar configuración
pnpm astro check
```

---

## 🌐 **Configuración de VS Code**

### **Extensiones Recomendadas**

```json
// .vscode/extensions.json (se creará automáticamente)
{
  "recommendations": [
    "astro-build.astro-vscode",        // Sintaxis Astro
    "bradlc.vscode-tailwindcss",       // Tailwind CSS IntelliSense
    "ms-vscode.vscode-typescript-next", // TypeScript avanzado
    "esbenp.prettier-vscode",          // Formateador de código
    "streetsidesoftware.code-spell-checker" // Corrector ortográfico
  ]
}
```

### **Configuración de VS Code**

```json
// .vscode/settings.json (crear manualmente si necesitas personalizar)
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "emmet.includeLanguages": {
    "astro": "html"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "astro.enabled": true
}
```

### **Snippets Útiles**

```json
// .vscode/astro.json (crear si quieres snippets personalizados)
{
  "Astro Component": {
    "prefix": "astro-component",
    "body": [
      "---",
      "export interface Props {",
      "  $1",
      "}",
      "",
      "const { $2 } = Astro.props;",
      "---",
      "",
      "<div>",
      "  $0",
      "</div>",
      "",
      "<style>",
      "  /* Estilos del componente */",
      "</style>"
    ],
    "description": "Template básico para componente Astro"
  }
}
```

---

## 📦 **Gestión de Dependencias**

### **Dependencias Actuales**

```json
// package.json - Solo dependencias esenciales
{
  "dependencies": {
    "@astrojs/sitemap": "^3.6.0",  // Generación de sitemap
    "astro": "^5.15.3"             // Framework principal
  }
}
```

### **Agregar Nuevas Dependencias**

```bash
# Agregar dependencia de producción
pnpm add nombre-paquete

# Agregar dependencia de desarrollo
pnpm add -D nombre-paquete

# Ejemplos útiles:
pnpm add @astrojs/tailwind tailwindcss  # Tailwind CSS
pnpm add @astrojs/react react react-dom # React (si necesitas)
pnpm add fuse.js                        # Búsqueda cliente
```

### **Actualizar Dependencias**

```bash
# Ver dependencias desactualizadas
pnpm outdated

# Actualizar todas las dependencias menores
pnpm update

# Actualizar a última versión (¡cuidado!)
pnpm update --latest

# Actualizar dependencia específica
pnpm update astro@latest
```

### **Limpiar Caché y Reinstalar**

```bash
# Si tienes problemas, limpia y reinstala
rm -rf node_modules .astro dist
pnpm install

# En Windows:
rmdir /s node_modules .astro dist
pnpm install
```

---

## 🔍 **Troubleshooting**

### **Problemas Comunes y Soluciones**

#### 1. **Puerto 4321 ya está en uso**
```bash
# Error: listen EADDRINUSE: address already in use :::4321

# Solución 1: Usar otro puerto
pnpm dev --port 3000

# Solución 2: Encontrar y cerrar proceso
# Windows:
netstat -ano | findstr :4321
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:4321 | xargs kill -9
```

#### 2. **Error de permisos en Windows**
```bash
# Error: EACCES permission denied

# Solución: Ejecutar terminal como administrador
# O cambiar política de ejecución PowerShell:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 3. **TypeScript errors tras actualización**
```bash
# Regenerar tipos de Astro
rm -rf .astro
pnpm dev

# Reiniciar TypeScript server en VS Code:
# Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

#### 4. **Hot reload no funciona**
```bash
# Limpiar caché completamente
rm -rf node_modules .astro dist
pnpm install
pnpm dev

# Verificar que no hay conflictos de puerto
```

#### 5. **Build falla en producción**
```bash
# Error común: Content Collections no encontradas
pnpm astro sync
pnpm build

# Verificar que todos los archivos .md tienen frontmatter válido
```

### **Verificación de Instalación**

```bash
# Script de verificación completa
echo "🔍 Verificando instalación..."

echo "📦 Dependencias instaladas:"
pnpm list

echo "🔧 Configuración Astro:"
pnpm astro info

echo "🏗️ Test de build:"
pnpm build

echo "✅ Instalación verificada correctamente!"
```

### **Logs y Debugging**

```bash
# Ejecutar con logs detallados
DEBUG=astro:* pnpm dev

# Ver build con información detallada
pnpm build --verbose

# Verificar configuración sin ejecutar
pnpm astro check
```

---

## 🚀 **Despliegue en Producción**

### **Vercel (Recomendado)**

#### Setup Automático
1. **Fork o push** el código a GitHub
2. **Conectar** repositorio en [vercel.com](https://vercel.com)
3. **Deploy automático** - Vercel detecta Astro automáticamente
4. **Dominio personalizado** (opcional)

#### Variables de Entorno Vercel
```bash
# En Vercel Dashboard > Settings > Environment Variables
NODE_VERSION=18.20.8
PNPM_VERSION=7.1.0
PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

### **Netlify**

```bash
# Configuración automática
# Build command: pnpm build
# Publish directory: dist
# Node version: 18
```

### **GitHub Pages**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: pnpm/action-setup@v2
        with:
          version: 7
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### **Hosting Estático Manual**

```bash
# Build para cualquier hosting estático
pnpm build

# Subir contenido de ./dist/ a tu hosting:
# - FTP tradicional
# - cPanel File Manager  
# - SSH/rsync
# - CDN (CloudFlare, AWS S3, etc.)
```

---

## ✅ **Checklist de Configuración Completa**

### **Desarrollo Local**
- [ ] **Node.js 18.20.8+** instalado
- [ ] **pnpm 7.1.0+** instalado  
- [ ] **Repositorio clonado** correctamente
- [ ] **Dependencias instaladas** (`pnpm install`)
- [ ] **Servidor dev** funcionando (`pnpm dev`)
- [ ] **VS Code configurado** con extensiones recomendadas
- [ ] **Build exitoso** (`pnpm build`)

### **Preparación Producción**
- [ ] **Variables de entorno** configuradas
- [ ] **Build de producción** exitoso
- [ ] **Lighthouse audit** pasado (100/100)
- [ ] **Cross-browser testing** completado
- [ ] **Responsive design** verificado
- [ ] **SEO meta tags** validados

### **Deployment**
- [ ] **Hosting seleccionado** (Vercel/Netlify/etc.)
- [ ] **Dominio configurado** (si aplica)
- [ ] **HTTPS habilitado**
- [ ] **Deploy automático** configurado
- [ ] **Analytics configurados** (opcional)
- [ ] **Monitoreo configurado** (opcional)

---

## 🆘 **Soporte Adicional**

### **Recursos de Ayuda**

| **Recurso** | **URL** | **Para qué usar** |
|-------------|---------|-------------------|
| **Documentación Astro** | https://docs.astro.build/ | Referencia técnica oficial |
| **TypeScript Handbook** | https://www.typescriptlang.org/docs/ | Ayuda con TypeScript |
| **GitHub Issues** | https://github.com/Crypt0xDev/Crypt0xDev/issues | Reportar bugs específicos |
| **Astro Discord** | https://astro.build/chat | Comunidad y ayuda rápida |

### **Contacto Directo**

Si tienes problemas específicos que no se resuelven con esta guía:

- 📧 **Email**: crypt0xdev@proton.me
- 🐛 **GitHub Issues**: Para bugs y problemas técnicos
- 💬 **Discussions**: Para preguntas generales

---

<div align="center">

## 🎉 **¡Instalación Completada!**

**Si llegaste hasta aquí, tienes Crypt0xDev funcionando correctamente**

[![Success](https://img.shields.io/badge/Status-Ready_to_Code!-success?style=for-the-badge)](https://localhost:4321)

**Próximos pasos:**
1. 🎨 **Personaliza** el contenido
2. 📝 **Agrega** tus propios posts y writeups  
3. 🚀 **Despliega** en producción
4. 🌟 **Comparte** tu sitio con la comunidad

---

**¿Necesitas ayuda?** Revisa la [documentación completa](DOCUMENTATION.md) o [contacta con soporte](#-soporte-adicional)

*Guía creada el 2 de noviembre de 2025*

</div>