📁 public/                                    # Carpeta pública (se copia directamente al build)
│
├── 📄 manifest.json                          # PWA manifest (configuración app web)
├── 📄 robots.txt                             # SEO - Instrucciones para crawlers
│
├── 📁 favicons/                              # 🎨 ICONOS DEL SITIO
│   ├── favicon.svg                           # Favicon principal (vector)
│   ├── favicon-16x16.png                     # (CREAR) Favicon pequeño
│   ├── favicon-32x32.png                     # (CREAR) Favicon mediano
│   ├── apple-touch-icon.png                  # (CREAR) Icono para iOS
│   └── android-chrome-192x192.png            # (CREAR) Icono para Android
│
├── 📁 fonts/                                 # 🔤 FUENTES PERSONALIZADAS
│   ├── fonts.css                             # Definiciones de fuentes
│   ├── inter/                                # Fuente Inter (texto general)
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-SemiBold.woff2
│   │   ├── Inter-Bold.woff2
│   │   └── ...
│   └── jetbrains/                            # Fuente JetBrains Mono (código)
│       ├── JetBrainsMono-Regular.woff2
│       ├── JetBrainsMono-Bold.woff2
│       └── ...
│
├── 📁 scripts/                               # 📜 SCRIPTS GLOBALES
│   ├── theme.js                              # Script de tema claro/oscuro
│   ├── analytics.js                          # (CREAR) Google Analytics opcional
│   └── search.js                             # (CREAR) Lógica de búsqueda opcional
│
├── 📁 og/                                    # 🌐 OPEN GRAPH (SEO/Redes Sociales)
│   ├── og-default.png                        # (CREAR) Imagen por defecto 1200x630px
│   ├── og-blog.png                           # (CREAR) OG para blog
│   ├── og-writeups.png                       # (CREAR) OG para writeups
│   └── og-ctf.png                            # (CREAR) OG para CTF
│
└── 📁 images/                                # 🖼️ TODAS LAS IMÁGENES
    │
    ├── 📁 blog/                              # 📝 IMÁGENES DE BLOG
    │   ├── platform-hero.jpg                 # (CREAR) Hero del blog de plataforma
    │   ├── docker-security.png               # (Ejemplo) Hero de artículo
    │   ├── network-pentesting.jpg            # (Ejemplo) Hero de artículo
    │   │
    │   ├── 📁 CriptografíaBásica/            # Blog: Criptografía Básica
    │   │   ├── logo.jpg                      # ✅ EXISTE
    │   │   └── hero.png                      # (CREAR) Hero del artículo
    │   │
    │   ├── 📁 entorno/                       # Blog: Entorno de Pentesting
    │   │   ├── logo.png                      # ✅ EXISTE
    │   │   ├── Portada.png                   # ✅ EXISTE (renombrar a hero.png)
    │   │   ├── kali-tools.png                # (CREAR) Capturas del artículo
    │   │   └── setup-guide.png               # (CREAR) Capturas del artículo
    │   │
    │   └── 📁 pythonhacking/                 # Blog: Python para Hacking
    │       ├── portada.webp                  # ✅ EXISTE (renombrar a hero.webp)
    │       ├── script-example.png            # (CREAR) Ejemplos de código
    │       └── automation-demo.png           # (CREAR) Demos
    │
    ├── 📁 writeups/                          # 🎯 IMÁGENES DE WRITEUPS
    │   │
    │   ├── 📁 htb/                           # HackTheBox
    │   │   ├── 📁 keeper/                    # Máquina: Keeper
    │   │   │   ├── logo.png                  # ✅ EXISTE - Logo oficial
    │   │   │   ├── card.png                  # ✅ EXISTE - Hero image
    │   │   │   ├── nmap-scan.png             # (CREAR) Capturas del proceso
    │   │   │   ├── rt-login.png              # (CREAR) Request Tracker
    │   │   │   ├── keepass-dump.png          # (CREAR) KeePass exploit
    │   │   │   └── root-proof.png            # (CREAR) Proof screenshot
    │   │   │
    │   │   ├── 📁 topology/                  # Máquina: Topology
    │   │   │   ├── logo.png                  # ✅ EXISTE
    │   │   │   ├── card.png                  # ✅ EXISTE
    │   │   │   └── ...                       # (CREAR) Capturas
    │   │   │
    │   │   ├── 📁 sau/                       # Máquina: Sau
    │   │   │   ├── logo.png                  # ✅ EXISTE
    │   │   │   ├── card.png                  # ✅ EXISTE
    │   │   │   └── ...
    │   │   │
    │   │   ├── 📁 pc/                        # Máquina: PC
    │   │   │   ├── logo.png                  # ✅ EXISTE
    │   │   │   ├── card.png                  # ✅ EXISTE
    │   │   │   └── ...
    │   │   │
    │   │   ├── 📁 codify/                    # Máquina: Codify
    │   │   │   ├── logo.png                  # ✅ EXISTE
    │   │   │   ├── card.png                  # ✅ EXISTE
    │   │   │   └── ...
    │   │   │
    │   │   ├── 📁 jet/                       # Máquina: Jet
    │   │   │   ├── jet.png                   # ✅ EXISTE (renombrar a logo.png)
    │   │   │   ├── jet1.png                  # ✅ EXISTE (renombrar a card.png)
    │   │   │   └── ...
    │   │   │
    │   │   ├── 📁 ascension/                 # Máquina: Ascension
    │   │   │   ├── logo.png                  # (CREAR)
    │   │   │   ├── card.png                  # (CREAR)
    │   │   │   └── ...
    │   │   │
    │   │   ├── 📁 beep/                      # Máquina: Beep
    │   │   │   ├── logo.png                  # (CREAR)
    │   │   │   ├── card.png                  # (CREAR)
    │   │   │   └── ...
    │   │   │
    │   │   └── 📁 lame/                      # Máquina: Lame
    │   │       ├── logo.png                  # (CREAR)
    │   │       ├── card.png                  # (CREAR)
    │   │       └── ...
    │   │
    │   ├── 📁 tryhackme/                     # TryHackMe
    │   │   ├── 📁 kenobi/                    # Room: Kenobi
    │   │   │   ├── logo.png                  # (CREAR)
    │   │   │   ├── card.png                  # (CREAR)
    │   │   │   └── ...
    │   │   └── ...
    │   │
    │   ├── 📁 hackmyvm/                      # HackMyVM
    │   │   ├── 📁 quick/                     # Máquina: Quick
    │   │   │   ├── logo.png                  # (CREAR)
    │   │   │   ├── card.png                  # (CREAR)
    │   │   │   └── ...
    │   │   │
    │   │   └── 📁 kenobi/                    # Máquina: Kenobi
    │   │       ├── logo.png                  # (CREAR)
    │   │       ├── card.png                  # (CREAR)
    │   │       └── ...
    │   │
    │   └── 📁 vulnhub/                       # VulnHub
    │       └── ...                           # (CREAR carpetas por máquina)
    │
    ├── 📁 ctf/                               # 🚩 IMÁGENES DE CTF
    │   ├── default-ctf.png                   # ✅ EXISTE - Imagen por defecto
    │   ├── 📁 picoctf-2024/                  # (CREAR) Por evento
    │   │   ├── hero.png                      # Hero del evento
    │   │   ├── web-challenge-1.png           # Challenge específico
    │   │   └── crypto-solution.png           # Soluciones
    │   │
    │   ├── 📁 htb-university-2024/           # (CREAR)
    │   └── 📁 custom-ctf/                    # (CREAR)
    │
    ├── 📁 platforms/                         # 🏢 LOGOS DE PLATAFORMAS
    │   ├── htb.png                           # ✅ EXISTE - Logo HackTheBox
    │   ├── tryhackme.jpg                     # ✅ EXISTE - Logo TryHackMe
    │   ├── vulnhub.png                       # ✅ EXISTE - Logo VulnHub
    │   ├── hackmyvm.png                      # ✅ EXISTE - Logo HackMyVM
    │   ├── portswigger.png                   # (CREAR) Logo PortSwigger
    │   │
    │   └── 📁 htb/                           # Iconos de HTB por categoría
    │       ├── htb.png                       # ✅ EXISTE - Logo alternativo
    │       ├── machines.png                  # ✅ EXISTE - Icono máquinas
    │       ├── fortresses.png                # ✅ EXISTE - Icono fortalezas
    │       └── endgames.png                  # ✅ EXISTE - Icono endgames
    │
    └── 📁 archive/                           # 📦 BACKUP/ANTIGUAS
        └── old-images/                       # Imágenes que ya no se usan


═══════════════════════════════════════════════════════════════════════════

📊 ESTADÍSTICAS ACTUALES:
═══════════════════════════════════════════════════════════════════════════

✅ Archivos existentes:    27 imágenes
📁 Carpetas creadas:       30+ directorios
🎯 Writeups con imágenes:  6 de 9 (keeper, topology, sau, pc, codify, jet)
📝 Blogs con imágenes:     3 (CriptografíaBásica, entorno, pythonhacking)
🏢 Plataformas:            4 logos + 4 iconos HTB


═══════════════════════════════════════════════════════════════════════════

🔧 ACCIONES RECOMENDADAS:
═══════════════════════════════════════════════════════════════════════════

1. ✅ RENOMBRAR (para consistencia):
   • images/writeups/htb/jet/jet.png      → logo.png
   • images/writeups/htb/jet/jet1.png     → card.png
   • images/blog/entorno/Portada.png      → hero.png
   • images/blog/pythonhacking/portada.webp → hero.webp

2. 📸 CREAR (imágenes faltantes):
   • Logos y cards para: ascension, beep, lame (HTB)
   • Logos y cards para máquinas de TryHackMe, HackMyVM, VulnHub
   • Hero images para blogs existentes
   • OG images para SEO (og/)
   • Favicons adicionales (favicons/)

3. 📁 CREAR CARPETAS (para futuros writeups):
   • images/writeups/tryhackme/{room-name}/
   • images/writeups/vulnhub/{machine-name}/
   • images/writeups/hackmyvm/{machine-name}/
   • images/ctf/{event-name}/

4. 🗑️ LIMPIAR:
   • Revisar images/archive/ y eliminar lo innecesario
   • images/blog/README.md puede moverse a /doc/


═══════════════════════════════════════════════════════════════════════════

📐 DIMENSIONES ESTÁNDAR:
═══════════════════════════════════════════════════════════════════════════

Tipo                    Dimensiones      Peso Max    Formato
─────────────────────────────────────────────────────────────────────────
Logo de máquina        400x400px        <50KB       PNG (transparente)
Card/Hero writeup      1200x630px       <200KB      JPG/PNG
Hero blog              1200x630px       <200KB      JPG/WebP
Capturas proceso       1920x1080px      <300KB      PNG/JPG
Logo plataforma        Variable         <50KB       PNG/SVG
OG Image (SEO)         1200x630px       <200KB      JPG/PNG
Favicon                16/32/192px      <20KB       PNG/SVG


═══════════════════════════════════════════════════════════════════════════

🎯 NOMENCLATURA ESTÁNDAR:
═══════════════════════════════════════════════════════════════════════════

✅ CORRECTO:
  • logo.png                    (logo de la máquina)
  • card.png                    (hero del writeup)
  • hero.jpg                    (hero del blog)
  • nmap-scan.png               (captura descriptiva)
  • privilege-escalation.png    (captura específica)

❌ INCORRECTO:
  • jet.png, jet1.png           (nombres no descriptivos)
  • Portada.png                 (mayúscula inicial)
  • portada.webp                (inconsistente con "hero")
  • IMG_20241109.png            (nombre genérico)


═══════════════════════════════════════════════════════════════════════════