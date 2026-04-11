# 📝 Guía de Creación de Contenido

Esta guía te ayudará a crear y mantener contenido de alta calidad en Crypt0xDev.

## 📋 Tabla de Contenidos

- [Writeups](#writeups)
- [Posts de Blog](#posts-de-blog)
- [CTF Challenges](#ctf-challenges)
- [Recursos](#recursos)
- [Validación de Schemas](#validación-de-schemas)

---

## 🎯 Writeups

Los writeups son el contenido principal del sitio. Documenta tus soluciones de forma clara y educativa.

### Estructura de Carpetas

```
src/content/writeups/
├── en/
│   ├── hackthebox/
│   ├── tryhackme/
│   ├── vulnhub/
│   └── hackmyvm/
└── es/
    ├── hackthebox/
    ├── tryhackme/
    ├── vulnhub/
    └── hackmyvm/
```

### Template de Writeup

```markdown
---
title: 'NombreMáquina - Plataforma'
description: 'Descripción concisa de la máquina y técnicas principales'
pubDate: 2024-04-11
platform: 'htb' # htb, tryhackme, vulnhub, hackmyvm
category: 'machines' # machines, challenges, rooms, etc.
difficulty: 'medium' # easy, medium, hard, insane
os: 'linux' # linux, windows, other
language: es # es o en
tags: ['web', 'sqli', 'privilege-escalation', 'sudo']
retired: true
logo: '/images/writeups/htb/nombremaquina/logo.png'
heroImage: '/images/writeups/htb/nombremaquina/card.png'
attackVectors: ['web', 'privilege-escalation']
techniques: ['T1190', 'T1078'] # MITRE ATT&CK IDs
vulnerabilities: ['CVE-2021-1234', 'SQL-Injection']
certifications: ['OSCP', 'eJPT']
skillLevel: 'intermediate' # beginner, intermediate, advanced, expert
estimatedTime: '2-3 horas'
points: 20
rating: 4.5
---

# NombreMáquina - Plataforma Writeup

**Dificultad**: Medium
**OS**: Linux
**Plataforma**: HackTheBox
**IP**: 10.10.10.X

## Introducción

Breve introducción sobre la máquina y qué aprenderás.

## Reconocimiento

### Escaneo de puertos

\`\`\`bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.X -oG allPorts
\`\`\`

### Enumeración de servicios

\`\`\`bash
nmap -p22,80 -sCV 10.10.10.X -oN targeted
\`\`\`

## Enumeración Web

...

## Explotación

...

## Escalada de Privilegios

...

## Flags

\`\`\`bash

# User flag

cat /home/user/user.txt

# Root flag

cat /root/root.txt
\`\`\`

## Técnicas MITRE ATT&CK

| ID    | Técnica                           | Descripción |
| ----- | --------------------------------- | ----------- |
| T1190 | Exploit Public-Facing Application | ...         |
| T1078 | Valid Accounts                    | ...         |

## Herramientas Utilizadas

- nmap
- gobuster
- sqlmap
- linpeas

## Lecciones Aprendidas

### Vulnerabilidades Identificadas

1. SQL Injection en formulario de login
2. Sudo misconfiguration

### Mitigaciones Recomendadas

1. Implementar prepared statements
2. Revisar configuración de sudo

## Referencias

- [Link a recursos externos]
```

### Campos Obligatorios

| Campo         | Tipo   | Descripción                       |
| ------------- | ------ | --------------------------------- |
| `title`       | string | Título del writeup                |
| `description` | string | Descripción corta                 |
| `pubDate`     | date   | Fecha de publicación              |
| `platform`    | enum   | htb, tryhackme, vulnhub, hackmyvm |
| `difficulty`  | enum   | easy, medium, hard, insane        |
| `os`          | enum   | linux, windows, other             |
| `language`    | enum   | es, en                            |

### Campos Opcionales Recomendados

- `tags`: Array de strings con técnicas/herramientas
- `attackVectors`: Vectores de ataque principales
- `techniques`: IDs de MITRE ATT&CK
- `certifications`: Certificaciones relacionadas
- `estimatedTime`: Tiempo estimado de resolución

---

## 📰 Posts de Blog

Los posts de blog cubren tutoriales, noticias y análisis.

### Categorías Disponibles

- `tutorial`: Guías paso a paso
- `writeup`: Explicaciones de técnicas
- `research`: Investigaciones originales
- `tools`: Reviews de herramientas
- `news`: Noticias de ciberseguridad

### Template de Blog Post

```markdown
---
title: 'Título del Post'
description: 'Descripción concisa del contenido'
author: 'Crypt0xDev'
pubDate: 2024-04-11
heroImage: '/images/blog/post-slug/hero.png'
category: 'tutorial'
tags: ['pentesting', 'tutorial', 'beginner']
difficulty: 'beginner' # beginner, intermediate, advanced
language: 'es'
featured: false
readTime: 10
---

# Título Principal

Introducción del post...

## Sección 1

Contenido...

## Conclusión

Resumen y conclusiones...
```

---

## 🚩 CTF Challenges

Documentación de challenges de CTF.

### Categorías

- `web`: Web exploitation
- `pwn`: Binary exploitation
- `crypto`: Cryptography
- `forensics`: Análisis forense
- `reversing`: Reverse engineering
- `misc`: Misceláneos
- `osint`: Open Source Intelligence

### Template de CTF

```markdown
---
title: 'Nombre del Challenge'
description: 'Descripción del reto'
ctfName: 'picoCTF 2024'
pubDate: 2024-04-11
category: 'web'
difficulty: 'medium'
points: 500
tags: ['sqli', 'xss', 'web']
language: 'es'
---

# Nombre del Challenge

## Descripción

Descripción del challenge...

## Solución

### Paso 1: Análisis inicial

...

### Paso 2: Explotación

...

## Flag

\`\`\`
flag{example_flag_here}
\`\`\`

## Herramientas

- Burp Suite
- Python

## Scripts

\`\`\`python

# exploit.py

...
\`\`\`
```

---

## 📚 Recursos

Documentación de herramientas, cheatsheets, labs, etc.

### Estructura

```
src/content/resources/
├── en/
│   ├── tools/
│   ├── cheatsheets/
│   ├── labs/
│   ├── projects/
│   ├── challenges/
│   ├── videos/
│   └── vulnerabilities/
└── es/
    └── ...
```

### Template de Recurso

```markdown
---
title: 'Nombre del Recurso'
description: 'Descripción del recurso'
category: 'tools'
url: 'https://ejemplo.com'
tags: ['pentesting', 'web', 'free']
---

# Nombre del Recurso

## Descripción

Información detallada...

## Características

- Feature 1
- Feature 2

## Instalación

\`\`\`bash
sudo apt install herramienta
\`\`\`

## Uso Básico

\`\`\`bash
herramienta -h
\`\`\`

## Recursos Adicionales

- [Documentación oficial](...)
```

---

## ✅ Validación de Schemas

Todos los archivos markdown deben cumplir con los schemas definidos en `src/content/config.ts`.

### Validar Manualmente

```bash
npm run astro check
```

### Errores Comunes

1. **Fecha inválida**: Usa formato `YYYY-MM-DD`
2. **Enum inválido**: Revisa valores permitidos en `config.ts`
3. **Campo requerido faltante**: Asegúrate de incluir todos los campos obligatorios
4. **Tipo incorrecto**: Verifica que strings, numbers, arrays coincidan

---

## 🎨 Mejores Prácticas

### Markdown

1. **Usa encabezados jerárquicos**: H1 → H2 → H3
2. **Bloques de código**: Especifica el lenguaje
   ```bash
   # Bueno
   nmap -sC -sV 10.10.10.1
   ```
3. **Imágenes**: Usa rutas relativas o absolutas desde `/public`
4. **Enlaces**: Usa rutas absolutas para links internos

### Contenido

1. **Sé claro y conciso**: Evita jerga innecesaria
2. **Incluye ejemplos**: Comandos reales y outputs
3. **Explica el por qué**: No solo el cómo
4. **Cita fuentes**: Referencias y créditos
5. **Actualiza contenido**: Revisa periódicamente

### SEO

1. **Descripción única**: Cada página debe tener descripción única
2. **Tags relevantes**: Máximo 8-10 tags por contenido
3. **Título descriptivo**: Incluye plataforma y nombre
4. **Hero images**: 1200x630px para Open Graph

---

## 🌐 Contenido Bilingüe

**IMPORTANTE**: Todo contenido debe existir en **español** e **inglés**.

### Checklist

- [ ] Archivo .md creado en `/en/`
- [ ] Archivo .md creado en `/es/`
- [ ] Mismo nombre de archivo en ambos idiomas
- [ ] Campo `language` correcto en frontmatter
- [ ] Imágenes compartidas o específicas por idioma

### Estructura de Traducción

```
src/content/writeups/
├── en/
│   └── hackthebox/
│       └── example.md        # language: en
└── es/
    └── hackthebox/
        └── example.md        # language: es
```

---

## 📸 Imágenes

### Ubicación

```
public/images/
├── blog/
│   └── [category]/
│       └── [slug]/
├── writeups/
│   └── [platform]/
│       └── [machine-name]/
└── platforms/
    └── [platform]/
```

### Formatos Recomendados

- **Hero images**: 1200x630px, WebP
- **Screenshots**: PNG con compresión
- **Logos**: SVG cuando sea posible
- **Diagramas**: SVG o PNG

### Optimización

```bash
# Convertir a WebP
cwebp input.png -o output.webp -q 80

# Redimensionar
convert input.png -resize 1200x630 output.png
```

---

## 🔍 Metadatos MITRE ATT&CK

Las técnicas deben seguir el formato oficial:

```yaml
techniques:
  - 'T1190' # Exploit Public-Facing Application
  - 'T1059.001' # Command and Scripting Interpreter: PowerShell
  - 'T1078.003' # Valid Accounts: Local Accounts
```

[MITRE ATT&CK Navigator](https://attack.mitre.org/)

---

## 📞 Soporte

¿Tienes dudas?

- Revisa `src/content/config.ts` para esquemas completos
- Consulta writeups existentes como ejemplo
- Abre un issue en GitHub

---

**Última actualización**: Abril 2024
