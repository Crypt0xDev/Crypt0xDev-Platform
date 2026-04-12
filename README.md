<div align="center">

```
 ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗ ██╗  ██╗██████╗ ███████╗██╗   ██╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═████╗╚██╗██╔╝██╔══██╗██╔════╝██║   ██║
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║██╔██║ ╚███╔╝ ██║  ██║█████╗  ██║   ██║
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ████╔╝██║ ██╔██╗ ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝██╔╝ ██╗██████╔╝███████╗ ╚████╔╝
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝
```

<h3>Hub de ciberseguridad ofensiva y defensiva · Bilingual ES/EN</h3>

<br/>

[![Astro](https://img.shields.io/badge/Astro-6.1-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br/>

[![License MIT](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22c55e?style=flat-square)](docs/contributing.md)
[![Live](https://img.shields.io/badge/Live-crypt0xdev.com-ec4899?style=flat-square&logo=globe)](https://crypt0xdev.com)

<br/>

<a href="https://crypt0xdev.com">🌐 Live Site</a>
&nbsp;·&nbsp;
<a href="docs/README.md">📚 Docs</a>
&nbsp;·&nbsp;
<a href="https://github.com/Crypt0xDev/Crypt0xDev-Platform/issues">🐛 Issues</a>
&nbsp;·&nbsp;
<a href="docs/content-guide.md">✍️ Contribuir</a>

</div>

<br/>

<div align="center">

```
┌─────────────────────────────────────────────────────────────────┐
│  🎯 Writeups  ·  🚩 CTF  ·  📰 Blog  ·  📚 Recursos  ·  🔍 Search │
└─────────────────────────────────────────────────────────────────┘
```

</div>

---

## 🧠 ¿Qué es Crypt0xDev?

Crypt0xDev es un hub de ciberseguridad **bilingüe** (ES · EN). No solo un blog ni solo una colección de writeups — es un espacio centralizado para **todo lo relacionado con la seguridad ofensiva y defensiva**.

> Crypt0xDev is a **bilingual** (ES · EN) cybersecurity hub — a centralized space for everything related to offensive and defensive security: machine writeups, CTF challenges, research, news, tools, learning resources, cheatsheets, CVEs, and more.

<br/>

<div align="center">

|     | Contenido / Content                                              |
| :-: | :--------------------------------------------------------------- |
| 🎯  | **Writeups** — HTB · TryHackMe · VulnHub · HackMyVM              |
| 🚩  | **CTF** — Web · Pwn · Crypto · Forensics · Reversing · OSINT     |
| 📰  | **Blog** — Noticias · Investigación · Tutoriales · Análisis      |
| 📚  | **Recursos** — Cheatsheets · Labs · CVEs · Herramientas · Videos |
| 🌐  | **Bilingüe** — Todo el contenido en Español + Inglés             |
| 🎨  | **UI** — Dark/Light Mode · Responsive · Búsqueda offline         |

</div>

---

## ⚡ Quick Start

```bash
# Clonar e instalar
git clone https://github.com/Crypt0xDev/Crypt0xDev-Platform.git
cd Crypt0xDev-Platform
npm install

# Variables de entorno
cp .env.example .env

# Desarrollo → http://localhost:4321
npm run dev
```

```bash
npm run build    # Build de producción
npm run preview  # Preview del build
npm run test     # Tests con Vitest
```

---

## 🛠️ Stack

<div align="center">

|                  Tecnología                   | Versión | Rol                                  |
| :-------------------------------------------: | :-----: | :----------------------------------- |
|         [Astro](https://astro.build/)         |   6.1   | Framework SSG · Content Layer · i18n |
| [TypeScript](https://www.typescriptlang.org/) |   5.9   | Type safety                          |
|   [Tailwind CSS](https://tailwindcss.com/)    |   4.1   | Styling (Vite plugin)                |
|       [Pagefind](https://pagefind.app/)       |   1.4   | Búsqueda estática client-side        |
|         [Vitest](https://vitest.dev/)         |   4.0   | Testing                              |
|         [Sentry](https://sentry.io/)          |  10.40  | Error tracking                       |
|         [Vercel](https://vercel.com/)         |    —    | Deploy · CDN · Edge                  |

</div>

---

## 📁 Estructura del proyecto

```
Crypt0xDev-Platform/
├── src/
│   ├── components/          # UI components
│   │   ├── common/          #   Breadcrumb · TOC · Search · RelatedPosts
│   │   ├── shared/          #   Badge · Button · Card
│   │   ├── ui/              #   Header · Footer · Dropdown · ThemeToggle
│   │   └── writeup/         #   RelatedWriteups
│   ├── content/             # Contenido Markdown
│   │   ├── blog/en|es/      #   Posts (news · research · tools · tutorial)
│   │   ├── writeups/en|es/  #   Writeups por plataforma
│   │   ├── ctf/en|es/       #   CTF challenges
│   │   └── resources/en|es/ #   Recursos y cheatsheets
│   ├── i18n/                # Sistema de internacionalización
│   │   ├── constants/       #   Plataformas · categorías · dificultades
│   │   ├── translations/    #   en.json · es.json
│   │   └── utils/           #   Helpers de contenido · fechas · SEO
│   ├── layouts/             # BlogLayout · WriteupLayout · Layout
│   ├── pages/               # [lang]/ · api/
│   └── styles/              # global.css · Tailwind theme
├── public/                  # Assets estáticos
├── docs/                    # Documentación técnica
└── src/content.config.ts    # Colecciones Astro v6 (glob loaders)
```

---

## 📚 Documentación

<div align="center">

| Archivo                                      | Descripción                       |
| :------------------------------------------- | :-------------------------------- |
| [📖 docs/README.md](docs/README.md)          | Estructura y scripts del proyecto |
| [✍️ content-guide.md](docs/content-guide.md) | Crear writeups, blog posts y CTFs |
| [🌐 i18n-guide.md](docs/i18n-guide.md)       | Sistema de internacionalización   |
| [🏗️ architecture.md](docs/architecture.md)   | Arquitectura técnica y patrones   |
| [🚀 deployment.md](docs/deployment.md)       | Deploy en Vercel, Netlify, Docker |
| [🤝 contributing.md](docs/contributing.md)   | Cómo contribuir al proyecto       |

</div>

---

## 🤝 Contribuir

```bash
# Fork → branch → commit → PR
git checkout -b feat/mi-aportacion
git commit -m "feat: descripción clara del cambio"
git push origin feat/mi-aportacion
# Abre un Pull Request →  github.com/Crypt0xDev/Crypt0xDev-Platform
```

Guía completa en [docs/contributing.md](docs/contributing.md)

---

<div align="center">

**MIT © [Crypt0xDev](https://github.com/Crypt0xDev) · [crypt0xdev.com](https://crypt0xdev.com)**

<br/>

_Hecho con ❤️ y demasiado café · Made with ❤️ and too much coffee_

</div>
