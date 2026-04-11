# 📚 Documentación Crypt0xDev

Bienvenido a la documentación completa del proyecto **Crypt0xDev** - una plataforma profesional de ciberseguridad y CTF writeups.

## 📑 Índice de Documentación

- [Guía de Contenido](./content-guide.md) - Cómo crear writeups, posts y CTFs
- [Guía de i18n](./i18n-guide.md) - Sistema de internacionalización
- [Guía de Contribución](./contributing.md) - Para colaboradores externos
- [Despliegue](./deployment.md) - Proceso de deploy y CI/CD
- [Arquitectura](./architecture.md) - Diseño técnico del proyecto

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** 18+
- **npm** 8+ o **pnpm** 8+
- **Git**

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Crypt0xDev/Crypt0.git
cd Crypt0

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

## 📂 Estructura del Proyecto

```
crypt0xdev/
├── public/                 # Archivos estáticos
│   ├── fonts/             # Fuentes web
│   ├── images/            # Imágenes públicas
│   └── scripts/           # Scripts del cliente
├── src/
│   ├── assets/            # Assets procesados por Astro
│   ├── components/        # Componentes reutilizables
│   │   ├── common/       # Componentes comunes (Breadcrumb, TOC, etc.)
│   │   ├── shared/       # Componentes compartidos (Badge, Button, Card)
│   │   ├── ui/           # UI principales (Header, Footer, etc.)
│   │   └── writeup/      # Componentes específicos de writeups
│   ├── content/           # Contenido en Markdown
│   │   ├── blog/         # Posts del blog (en/es)
│   │   ├── ctf/          # Challenges CTF (en/es)
│   │   ├── resources/    # Recursos (en/es)
│   │   ├── writeups/     # Writeups de máquinas (en/es)
│   │   ├── config.ts     # Schemas de Zod
│   │   └── site.ts       # Configuración del sitio
│   ├── i18n/              # Sistema de internacionalización
│   │   ├── constants/    # Constantes (plataformas, categorías, etc.)
│   │   ├── core/         # Core i18n (traducciones, helpers)
│   │   ├── search/       # Lógica de búsqueda i18n
│   │   ├── translations/ # Archivos JSON de traducciones
│   │   ├── types/        # Tipos TypeScript
│   │   └── utils/        # Utilidades (date, string, validation)
│   ├── layouts/           # Layouts de página
│   ├── pages/             # Rutas de la aplicación
│   │   ├── api/          # API endpoints
│   │   └── [lang]/       # Rutas con i18n
│   ├── scripts/           # Scripts del lado del servidor
│   └── styles/            # Estilos globales
├── scripts/               # Scripts de automatización
├── docs/                  # Documentación
├── .env.example           # Variables de entorno de ejemplo
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts
├── tailwind.config.mjs    # Configuración de Tailwind
└── tsconfig.json          # Configuración de TypeScript
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev                 # Inicia servidor de desarrollo

# Build
npm run build              # Build de producción
npm run preview            # Preview del build

# Testing
npm run test               # Ejecuta tests
npm run test:ui            # Ejecuta tests con interfaz
npm run test:coverage      # Reporte de cobertura

# Utilidades
npm run generate:images    # Genera imágenes placeholder
```

## 🌐 Sistema de Internacionalización

Crypt0xDev soporta **español** e **inglés** de forma nativa. Todo el contenido debe estar disponible en ambos idiomas.

Ver [Guía de i18n](./i18n-guide.md) para más detalles.

## 📝 Crear Contenido Nuevo

### Nuevo Writeup

```bash
# Estructura requerida
src/content/writeups/
  ├── en/
  │   └── hackthebox/
  │       └── nombre-maquina.md
  └── es/
      └── hackthebox/
          └── nombre-maquina.md
```

Ver [Guía de Contenido](./content-guide.md) para plantillas y ejemplos.

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test -- --watch

# Coverage
npm run test:coverage
```

## 🚀 Despliegue

El proyecto está configurado para **Vercel**, pero funciona en cualquier plataforma que soporte Astro.

Ver [Guía de Despliegue](./deployment.md) para más opciones.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee la [Guía de Contribución](./contributing.md) antes de hacer un PR.

## 📄 Licencia

MIT © Crypt0xDev

## 🔗 Enlaces Útiles

- [Sitio Web](https://crypt0xdev.com)
- [GitHub](https://github.com/Crypt0xDev)
- [Astro Docs](https://docs.astro.build)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## 📞 Soporte

- **Email**: contact@crypt0xdev.com
- **GitHub Issues**: Para bugs y features
- **Discussions**: Para preguntas generales
