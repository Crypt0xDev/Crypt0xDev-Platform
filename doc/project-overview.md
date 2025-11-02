# 🔐 Crypt0xDev

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-5.15.3-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**Blog profesional de ciberseguridad y plataforma de writeups CTF**

[🌐 **Demo en Vivo**](https://crypt0xdev.vercel.app) • [📖 **Documentación Completa**](DOCUMENTATION.md) • [🚀 **Inicio Rápido**](#-inicio-rápido)

![Performance](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=flat-square)
![Build Status](https://img.shields.io/badge/Build-Passing-success?style=flat-square)
![Páginas](https://img.shields.io/badge/Páginas-152-blue?style=flat-square)

</div>

---

## ✨ **Características Destacadas**

<table>
  <tr>
    <td>🌍</td>
    <td><strong>Bilingüe Completo</strong></td>
    <td>Soporte nativo para Español e Inglés con rutas localizadas</td>
  </tr>
  <tr>
    <td>⚡</td>
    <td><strong>Ultra Rápido</strong></td>
    <td>SSG puro con Astro Islands - Lighthouse Score 100/100</td>
  </tr>
  <tr>
    <td>🔐</td>
    <td><strong>Especializado CTF</strong></td>
    <td>Writeups organizados: HackTheBox, TryHackMe, VulnHub, HackMyVM</td>
  </tr>
  <tr>
    <td>📚</td>
    <td><strong>Content Collections</strong></td>
    <td>Sistema tipado con Zod para máxima consistencia</td>
  </tr>
  <tr>
    <td>🎨</td>
    <td><strong>UI Moderna</strong></td>
    <td>Diseño cyberpunk responsive con modo oscuro/claro</td>
  </tr>
  <tr>
    <td>🔍</td>
    <td><strong>SEO Profesional</strong></td>
    <td>Meta tags, sitemap XML, Open Graph y structured data</td>
  </tr>
</table>

---

## 🏗️ **Stack Tecnológico**

| **Framework** | **Lenguaje** | **Deployment** | **Gestión** |
|---------------|--------------|----------------|-------------|
| [Astro 5.15.3](https://astro.build/) | [TypeScript 5.0+](https://www.typescriptlang.org/) | [Vercel](https://vercel.com/) | [pnpm](https://pnpm.io/) |
| Islands Architecture | Type Safety Completo | Edge Network CDN | Lockfile Reproducible |

---

## 🚀 **Inicio Rápido**

### **Prerrequisitos**
```bash
Node.js >= 18.20.8 (LTS recomendado)
pnpm >= 7.1.0 (gestor preferido)
```

### **Instalación**
```bash
# Clonar repositorio
git clone https://github.com/Crypt0xDev/Crypt0xDev.git
cd Crypt0xDev

# Instalar dependencias
pnpm install

# Iniciar desarrollo
pnpm dev
# ➜ http://localhost:4321
```

### **Scripts Disponibles**
| Script | Comando | Propósito |
|--------|---------|-----------|
| `dev` | `pnpm dev` | Servidor desarrollo con hot reload |
| `build` | `pnpm build` | Build optimizado para producción |
| `preview` | `pnpm preview` | Preview del build local |

---

## 📊 **Estado del Proyecto**

### **Métricas de Build**
```
✅ Build Status: SUCCESS
✅ Páginas generadas: 152 páginas estáticas
✅ Tiempo de build: ~4 segundos
✅ Bundle size: < 50KB gzipped
✅ TypeScript errors: 0
✅ Lighthouse Score: 100/100/100/100
```

### **Contenido Actual**
- **📝 Blog Posts**: 12 artículos (6 ES + 6 EN)
- **🔐 CTF Writeups**: 16 writeups (8 ES + 8 EN)
- **🏷️ Tags**: 108 páginas dinámicas
- **🌐 Idiomas**: Español e Inglés completos

### **Plataformas CTF Soportadas**
- **HackTheBox (HTB)**: Machines y Challenges
- **TryHackMe (THM)**: Rooms y Learning Paths
- **VulnHub**: Boot2Root VMs
- **HackMyVM**: Máquinas de práctica

---

## 📁 **Estructura del Proyecto**

```
Crypt0xDev/
├── 🎯 Configuración
│   ├── astro.config.mjs          # Config principal Astro + sitemap
│   ├── package.json              # Dependencies y scripts
│   └── tsconfig.json             # TypeScript config estricto
│
├── 🌐 Assets Públicos (/public)
│   ├── robots.txt                # SEO crawler config
│   └── images/                   # Assets organizados por categoría
│       ├── blog/                 # Hero images artículos
│       ├── writeups/             # Screenshots CTF
│       └── platforms/            # Logos plataformas
│
├── 💻 Código Fuente (/src)
│   ├── components/               # Componentes Astro reutilizables
│   │   ├── ui/                   # Componentes base (Header, Footer, etc.)
│   │   ├── common/               # Compartidos (TOC, Related Posts)
│   │   └── writeup/              # Especializados CTF
│   │
│   ├── content/                  # Content Collections (CMS tipado)
│   │   ├── config.ts             # Schemas Zod y validación
│   │   ├── blog/                 # Artículos técnicos (ES/EN)
│   │   └── writeups/             # CTF writeups (ES/EN)
│   │
│   ├── i18n/                     # Sistema internacionalización
│   ├── layouts/                  # Layouts del sistema
│   ├── pages/                    # File-based routing
│   ├── styles/                   # CSS global + variables
│   └── utils/                    # Utilidades TypeScript
│
└── 📚 Documentación (/doc)
    └── [archivos análisis y documentación]
```

---

## 📝 **Creación de Contenido**

### **Nuevo Post del Blog**
```markdown
---
# src/content/blog/es/nuevo-post.md
title: "Título del Artículo"
description: "Descripción SEO del contenido"
pubDate: "2024-11-02"
heroImage: "/images/blog/hero-image.jpg" # Opcional
tags: ["ciberseguridad", "tutorial"]
draft: false
---

# Tu contenido aquí

Contenido en **Markdown** con soporte completo.
```

### **Nuevo Writeup CTF**
```markdown
---
# src/content/writeups/es/htb/maquina.md
title: "Nombre de la Máquina"
description: "Breve descripción del writeup"
platform: "htb" # htb | tryhackme | vulnhub | hackmyvm
category: "machines" # machines | rooms | challenges
difficulty: "medium" # easy | medium | hard | insane
os: "linux" # linux | windows | other
pubDate: "2024-11-02"
tags: ["web", "privesc", "enumeration"]
retired: false
points: 30 # Puntos HTB
attackVectors: ["web", "network"]
cves: ["CVE-2021-44228"] # Si aplica
certifications: ["OSCP", "eJPT"] # Certificaciones relacionadas
skillLevel: "intermediate" # beginner | intermediate | advanced | expert
estimatedTime: "3-4 hours"
---

## Reconocimiento

Tu writeup aquí...
```

---

## 🎨 **Personalización**

### **Temas y Colores**
```css
/* src/styles/global.css */
:root {
  --color-primary: #00ff88;
  --color-secondary: #ff0080; 
  --color-accent: #0080ff;
}

[data-theme="dark"] {
  --bg-color: #0a0a0a;
  --text-color: #ffffff;
}

[data-theme="light"] {
  --bg-color: #ffffff;
  --text-color: #000000;
}
```

### **Nuevos Componentes**
```astro
---
// src/components/ui/NewComponent.astro
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}
---

<div class={`component component--${variant}`}>
  <h2>{title}</h2>
  <slot />
</div>
```

---

## 🚀 **Deployment**

### **Vercel (Recomendado)**
1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configuración automática detectada
3. Deploy en cada push a `main`

### **Otros Hostings**
```bash
# Netlify
pnpm build
# Subir carpeta ./dist

# GitHub Pages
pnpm build
# Configurar GitHub Actions (ver DOCUMENTATION.md)

# Railway/Render
# Detectan Astro automáticamente
```

---

## 🔍 **SEO y Optimización**

### **Features SEO Incluidos**
- ✅ **Meta tags automáticos** en todas las páginas
- ✅ **Sitemap XML** generado automáticamente
- ✅ **Open Graph** tags para redes sociales  
- ✅ **Twitter Cards** para mejor sharing
- ✅ **Canonical URLs** para evitar contenido duplicado
- ✅ **Hreflang** para contenido multiidioma
- ✅ **Structured data** para mejor indexación

### **Performance**
- ✅ **Lighthouse Score**: 100/100 en todas las métricas
- ✅ **Core Web Vitals**: FCP < 1.2s, LCP < 1.8s, CLS < 0.05
- ✅ **Bundle Size**: < 50KB total
- ✅ **Images**: Lazy loading y formatos optimizados

---

## 🤝 **Contribución**

### **Cómo Contribuir**
```bash
# 1. Fork del repositorio
git clone https://github.com/tu-usuario/Crypt0xDev.git

# 2. Crear feature branch
git checkout -b feature/nueva-funcionalidad

# 3. Hacer cambios y probar
pnpm dev
pnpm build # Verificar build

# 4. Commit con convenciones
git commit -m "feat: agregar nueva funcionalidad"

# 5. Push y Pull Request
git push origin feature/nueva-funcionalidad
```

### **Estándares**
- **Commits**: [Conventional Commits](https://conventionalcommits.org/)
- **TypeScript**: Tipado estricto obligatorio
- **Testing**: Build exitoso + verificación manual
- **Documentation**: Actualizar docs si es necesario

---

## 📚 **Documentación Adicional**

| **Documento** | **Descripción** |
|---------------|-----------------|
| [📖 DOCUMENTATION.md](DOCUMENTATION.md) | Documentación técnica completa |
| [�️ INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) | Guía completa de instalación |
| [🤝 CONTRIBUTING.md](CONTRIBUTING.md) | Guía de contribución al proyecto |

---

## 🔮 **Roadmap**

### **🎯 Próximas Mejoras**
- [ ] **Sistema de búsqueda** avanzada con Pagefind
- [ ] **Comentarios** con Giscus
- [ ] **Newsletter** signup
- [ ] **RSS feeds** para blog y writeups
- [ ] **Analytics** con Plausible

### **🚀 Features Futuros**
- [ ] **Dashboard personal** con progreso CTF
- [ ] **Sistema de bookmarks** para writeups favoritos
- [ ] **API REST** para datos públicos
- [ ] **Mobile app** companion

---

## 📞 **Soporte y Comunidad**

### **Canales de Ayuda**
- 🐛 **[GitHub Issues](https://github.com/Crypt0xDev/Crypt0xDev/issues)** - Bug reports y feature requests
- 💬 **[Discussions](https://github.com/Crypt0xDev/Crypt0xDev/discussions)** - Preguntas y comunidad
- 📧 **[Email](mailto:crypt0xdev@proton.me)** - Contacto directo

### **Síguenos**
- 🐦 **[Twitter](https://twitter.com/crypt0xdev)** - Updates y noticias
- 💼 **[LinkedIn](https://linkedin.com/in/crypt0xdev)** - Contenido profesional
- 🔗 **[GitHub](https://github.com/Crypt0xDev)** - Código y proyectos

---

## 📜 **Licencia**

Este proyecto está licenciado bajo la [MIT License](LICENSE) - ver el archivo LICENSE para detalles completos.

```
MIT License - Libre uso comercial y personal
Copyright (c) 2024 Crypt0xDev
```

---

<div align="center">

## 🌟 **¡Apoya el Proyecto!**

Si encuentras útil **Crypt0xDev**, considera darle una ⭐ al repositorio

[![GitHub stars](https://img.shields.io/github/stars/Crypt0xDev/Crypt0xDev?style=social)](https://github.com/Crypt0xDev/Crypt0xDev/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Crypt0xDev/Crypt0xDev?style=social)](https://github.com/Crypt0xDev/Crypt0xDev/network/members)

---

**🔐 Desarrollado con ❤️ para la comunidad de ciberseguridad**

*Hecho con [Astro](https://astro.build/) • Deployed en [Vercel](https://vercel.com/) • Powered by [TypeScript](https://www.typescriptlang.org/)*

**Última actualización**: 2 de noviembre de 2025

</div>