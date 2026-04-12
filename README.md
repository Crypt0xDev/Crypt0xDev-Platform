<div align="center">

```
 ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗ ██╗  ██╗██████╗ ███████╗██╗   ██╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═████╗╚██╗██╔╝██╔══██╗██╔════╝██║   ██║
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║██╔██║ ╚███╔╝ ██║  ██║█████╗  ██║   ██║
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ████╔╝██║ ██╔██╗ ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝██╔╝ ██╗██████╔╝███████╗ ╚████╔╝
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝  ╚═══╝
```

<p>Cybersecurity Hub &nbsp;·&nbsp; Offensive &amp; Defensive Security &nbsp;·&nbsp; Bilingual <strong>ES / EN</strong></p>

<br/>

[![Astro](https://img.shields.io/badge/Astro-6.1-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
&nbsp;
[![License MIT](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22c55e?style=flat-square)](docs/contributing.md)
[![Live](https://img.shields.io/badge/crypt0xdev.com-online-ec4899?style=flat-square)](https://crypt0xdev.com)

<br/>

[Live Site](https://crypt0xdev.com) &nbsp;·&nbsp;
[Docs](docs/README.md) &nbsp;·&nbsp;
[Issues](https://github.com/Crypt0xDev/Crypt0xDev-Platform/issues) &nbsp;·&nbsp;
[Contribuir](docs/content-guide.md)

</div>

---

## Overview

**Crypt0xDev** es un hub de ciberseguridad **bilingüe (ES · EN)** construido con Astro. Es un espacio centralizado para seguridad ofensiva y defensiva: writeups de máquinas, retos CTF, investigación, tutoriales, herramientas, cheatsheets, CVEs y más — con búsqueda offline de texto completo.

> A bilingual cybersecurity platform centralizing machine writeups, CTF challenges, research, news, tools, cheatsheets, and CVEs — all fully searchable without a backend.

---

## Content

| Section       | Platforms / Categories                                      |
| :------------ | :---------------------------------------------------------- |
| **Writeups**  | HackTheBox · TryHackMe · VulnHub · HackMyVM                 |
| **CTF**       | Web · Pwn · Crypto · Forensics · Reversing · OSINT          |
| **Blog**      | News · Research · Tutorials · Tool reviews                  |
| **Resources** | Cheatsheets · Labs · CVEs · Tools · Videos · Learning paths |

---

## Quick Start

**Prerequisites:** Node.js ≥ 20, npm ≥ 10

```bash
git clone https://github.com/Crypt0xDev/Crypt0xDev-Platform.git
cd Crypt0xDev-Platform
npm install
cp .env.example .env
npm run dev        # → http://localhost:4321
```

| Command           | Description               |
| :---------------- | :------------------------ |
| `npm run dev`     | Start dev server          |
| `npm run build`   | Production build          |
| `npm run preview` | Preview the build locally |
| `npm run test`    | Run unit tests (Vitest)   |

---

## Stack

| Technology                                    | Version | Role                                        |
| :-------------------------------------------- | :-----: | :------------------------------------------ |
| [Astro](https://astro.build/)                 |   6.1   | SSG framework — Content Layer, i18n routing |
| [TypeScript](https://www.typescriptlang.org/) |   5.9   | Type safety                                 |
| [Tailwind CSS](https://tailwindcss.com/)      |   4.1   | Styling via Vite plugin                     |
| [Pagefind](https://pagefind.app/)             |   1.4   | Static full-text search (no backend)        |
| [Vitest](https://vitest.dev/)                 |   4.0   | Unit testing                                |
| [Sentry](https://sentry.io/)                  |  10.x   | Error tracking                              |
| [Vercel](https://vercel.com/)                 |    —    | Hosting · CDN · Edge network                |

---

## Project Structure

```
src/
├── components/
│   ├── common/          # Breadcrumb, TOC, Search, RelatedPosts
│   ├── shared/          # Badge, Button, Card
│   ├── ui/              # Header, Footer, Dropdown, ThemeToggle
│   └── writeup/         # RelatedWriteups
├── content/
│   ├── blog/en|es/      # Posts — news, research, tools, tutorial
│   ├── writeups/en|es/  # Writeups by platform
│   ├── ctf/en|es/       # CTF challenges
│   └── resources/en|es/ # Cheatsheets, labs, CVEs
├── i18n/
│   ├── constants/       # Platforms, categories, difficulties (SVG icons)
│   ├── translations/    # en.json · es.json
│   └── utils/           # Content helpers, date formatting, SEO
├── layouts/             # BlogLayout, WriteupLayout, Layout, PageLayout
├── pages/               # [lang]/ dynamic routes · api/
└── styles/              # global.css · Tailwind theme
```

---

## Documentation

| File                                           | Description                                |
| :--------------------------------------------- | :----------------------------------------- |
| [docs/README.md](docs/README.md)               | Project scripts and structure              |
| [docs/content-guide.md](docs/content-guide.md) | Writing writeups, blog posts, and CTFs     |
| [docs/i18n-guide.md](docs/i18n-guide.md)       | Internationalization system                |
| [docs/architecture.md](docs/architecture.md)   | Technical architecture and design patterns |
| [docs/deployment.md](docs/deployment.md)       | Deploy on Vercel, Netlify, or Docker       |
| [docs/contributing.md](docs/contributing.md)   | Contribution guidelines                    |

---

## Contributing

```bash
# 1. Fork the repo and create your branch
git checkout -b feat/my-contribution

# 2. Commit using conventional commits
git commit -m "feat: clear description of the change"

# 3. Push and open a Pull Request
git push origin feat/my-contribution
```

See [docs/contributing.md](docs/contributing.md) for the full guide, branch naming convention, and content standards.

---

<div align="center">

**MIT © [Crypt0xDev](https://github.com/Crypt0xDev) · [crypt0xdev.com](https://crypt0xdev.com)**

</div>
