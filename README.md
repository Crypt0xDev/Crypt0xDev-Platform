<div align="center">

# 🔐 Crypt0xDev

**Hub de ciberseguridad — todo lo que necesitas en un solo lugar**
**Cybersecurity hub — everything you need in one place**

[![Astro](https://img.shields.io/badge/Astro-5.18-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green?style=flat-square)](docs/contributing.md)

**[🌐 Live](https://crypt0xdev.com)** · **[📚 Docs](docs/README.md)** · **[🐛 Issues](https://github.com/Crypt0xDev/Crypt0/issues)**

</div>

---

## ¿Qué es esto? / What is this?

Crypt0xDev es un hub de ciberseguridad bilingüe (ES/EN). No es solo un blog ni solo una colección de writeups — es un espacio centralizado para **todo lo relacionado con la seguridad ofensiva y defensiva**: writeups de máquinas, challenges CTF, investigación, noticias del sector, herramientas, recursos de aprendizaje, cheatsheets, vulnerabilidades (CVEs) y más.

> Crypt0xDev is a bilingual (ES/EN) cybersecurity hub. Not just a blog or a writeup collection — it's a centralized space for **everything related to offensive and defensive security**: machine writeups, CTF challenges, research, industry news, tools, learning resources, cheatsheets, vulnerabilities (CVEs), and more.

---

## ⚡ Inicio rápido / Quick Start

```bash
git clone https://github.com/Crypt0xDev/Crypt0.git
cd Crypt0
npm install
cp .env.example .env
npm run dev     # → http://localhost:4321
```

```bash
npm run build   # Build de producción
npm run test    # Tests con Vitest
npm run preview # Preview del build
```

---

## ✨ Características / Features

|             | Qué incluye / What's included                                                 |
| ----------- | ----------------------------------------------------------------------------- |
| 🎯 Writeups | Máquinas de HTB · TryHackMe · VulnHub · HackMyVM                              |
| 🚩 CTF      | Challenges por categoría: web, pwn, crypto, forensics, reversing, misc, osint |
| 📰 Blog     | Noticias · Investigación · Tutoriales · Herramientas · Análisis               |
| 📚 Recursos | Cheatsheets · Labs · Herramientas · Videos · CVEs · Proyectos                 |
| 🌐 Idiomas  | Español + Inglés (todo el contenido bilingüe)                                 |
| 🎨 UI       | Dark/Light Mode · Responsive · Búsqueda client-side                           |

---

## 🛠️ Stack

| Tecnología                                    | Versión | Propósito            |
| --------------------------------------------- | ------- | -------------------- |
| [Astro](https://astro.build/)                 | 5.18    | Framework SSG + i18n |
| [TypeScript](https://www.typescriptlang.org/) | 5.9     | Type safety          |
| [TailwindCSS](https://tailwindcss.com/)       | 3.4     | Styling              |
| [Pagefind](https://pagefind.app/)             | 1.4     | Búsqueda estática    |
| [Vitest](https://vitest.dev/)                 | 4.0     | Testing              |
| [Sentry](https://sentry.io/)                  | 10.40   | Error tracking       |
| [Vercel](https://vercel.com/)                 | —       | Deploy + CDN         |

---

## 📚 Documentación / Documentation

Toda la documentación detallada está en [`/docs`](docs/):

| Documento                                    | Descripción                       |
| -------------------------------------------- | --------------------------------- |
| [📖 docs/README.md](docs/README.md)          | Estructura del proyecto y scripts |
| [✍️ content-guide.md](docs/content-guide.md) | Crear writeups, posts y CTFs      |
| [🌐 i18n-guide.md](docs/i18n-guide.md)       | Sistema de internacionalización   |
| [🏗️ architecture.md](docs/architecture.md)   | Arquitectura técnica y patrones   |
| [🚀 deployment.md](docs/deployment.md)       | Deploy a Vercel, Netlify, Docker… |
| [🤝 contributing.md](docs/contributing.md)   | Cómo contribuir al proyecto       |

---

## 📁 Estructura / Structure

```
src/
├── components/   # UI: common · shared · ui · writeup
├── content/      # Markdown: blog · writeups · ctf · resources
│   ├── en/       # Contenido en inglés / Content in English
│   └── es/       # Contenido en español / Content in Spanish
├── i18n/         # Traducciones · Types · Utils · Constants
├── layouts/      # Layout · BlogLayout · WriteupLayout
└── pages/        # [lang]/ · api/
```

---

## 🤝 Contribuir / Contributing

```bash
git checkout -b feature/mi-feature
# ... cambios ...
git commit -m "feat: descripción"
git push origin feature/mi-feature
# Abre un Pull Request en GitHub
```

Guía completa → [docs/contributing.md](docs/contributing.md)

---

<div align="center">

MIT © [Crypt0xDev](https://github.com/Crypt0xDev) · [crypt0xdev.com](https://crypt0xdev.com)

</div>
