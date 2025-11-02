# 🤝 Guía de Contribución - Crypt0xDev

<div align="center">

![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)
![Code of Conduct](https://img.shields.io/badge/Code_of_Conduct-Enforced-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**¡Únete a nuestra comunidad y ayuda a mejorar Crypt0xDev!**

*Todas las contribuciones son bienvenidas, desde correcciones de typos hasta nuevas características*

</div>

---

## 🌟 **¿Por qué Contribuir?**

- 🎓 **Aprende**: Experimenta con Astro, TypeScript y tecnologías modernas
- 🌍 **Impacto**: Ayuda a la comunidad de ciberseguridad hispanohablante
- 🚀 **Portfolio**: Contribuciones públicas en un proyecto real
- 🤝 **Red**: Conecta con otros profesionales del sector
- 📚 **Conocimiento**: Mejora tus skills mientras ayudas a otros

---

## 📋 **Tipos de Contribuciones**

### 🐛 **Bug Reports y Fixes**
- Reportar errores encontrados
- Corregir bugs existentes
- Mejorar manejo de errores
- Optimizar rendimiento

### ✨ **Nuevas Características**
- Implementar funcionalidades nuevas
- Mejorar UX/UI existente
- Agregar integraciones
- Optimizaciones técnicas

### 📝 **Contenido y Documentación**
- Escribir nuevos posts técnicos
- Crear writeups de CTF
- Mejorar documentación existente
- Traducir contenido

### 🎨 **Diseño y UX**
- Mejorar interfaz de usuario
- Optimizar responsive design
- Crear nuevos componentes
- Mejorar accesibilidad

### 🧪 **Testing y Calidad**
- Escribir tests automatizados
- Mejorar cobertura de testing
- Verificar compatibilidad
- Auditorías de calidad

---

## 🚀 **Primeros Pasos**

### 1. **Preparación del Entorno**

```bash
# Fork el repositorio en GitHub (botón Fork)

# Clonar tu fork
git clone https://github.com/TU-USUARIO/Crypt0xDev.git
cd Crypt0xDev

# Agregar upstream para sync
git remote add upstream https://github.com/Crypt0xDev/Crypt0xDev.git

# Verificar remotes
git remote -v
# origin    https://github.com/TU-USUARIO/Crypt0xDev.git (fetch)
# origin    https://github.com/TU-USUARIO/Crypt0xDev.git (push)
# upstream  https://github.com/Crypt0xDev/Crypt0xDev.git (fetch)
# upstream  https://github.com/Crypt0xDev/Crypt0xDev.git (push)

# Instalar dependencias
pnpm install

# Verificar que todo funciona
pnpm dev
```

### 2. **Mantener el Fork Actualizado**

```bash
# Obtener últimos cambios del repositorio original
git fetch upstream

# Cambiar a main branch
git checkout main

# Merge cambios upstream
git merge upstream/main

# Push cambios actualizados a tu fork
git push origin main
```

---

## 🔄 **Workflow de Contribución**

### **Proceso Paso a Paso**

```bash
# 1. Asegurarte que tienes la última versión
git checkout main
git pull upstream main

# 2. Crear nueva rama para tu feature/fix
git checkout -b feature/descripcion-corta
# o
git checkout -b fix/descripcion-del-bug

# 3. Hacer tus cambios
# ... editar archivos ...

# 4. Verificar que todo funciona
pnpm dev
pnpm build

# 5. Hacer commits siguiendo convenciones
git add .
git commit -m "feat: descripción clara del cambio"

# 6. Push a tu fork
git push origin feature/descripcion-corta

# 7. Crear Pull Request en GitHub
# Ir a GitHub y crear PR desde tu rama hacia main
```

### **Convenciones de Commits**

Usamos [Conventional Commits](https://conventionalcommits.org/) para mantener un historial claro:

```bash
# Nuevas características
git commit -m "feat: agregar sistema de búsqueda"
git commit -m "feat(blog): implementar paginación"

# Corrección de bugs
git commit -m "fix: corregir enlaces rotos en navegación"
git commit -m "fix(seo): actualizar meta descriptions"

# Documentación
git commit -m "docs: actualizar guía de instalación"
git commit -m "docs(readme): mejorar sección de contribución"

# Refactoring
git commit -m "refactor: optimizar componente Header"
git commit -m "refactor(utils): simplificar funciones i18n"

# Styling
git commit -m "style: mejorar responsive design en mobile"
git commit -m "style(ui): actualizar paleta de colores"

# Performance
git commit -m "perf: optimizar carga de imágenes"
git commit -m "perf(build): reducir bundle size"

# Tests
git commit -m "test: agregar tests para utils/helpers"
git commit -m "test(components): test para Header component"
```

---

## 📝 **Estándares de Código**

### **TypeScript**

```typescript
// ✅ BUENO: Interfaces tipadas y exports explícitos
export interface WriteupCardProps {
  title: string;
  platform: 'htb' | 'tryhackme' | 'vulnhub';
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  description?: string;
}

// ✅ BUENO: Funciones puras con tipos
export function formatDate(date: Date, locale: string = 'es'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
  }).format(date);
}

// ❌ EVITAR: Any types y mutaciones
function badFunction(data: any): any {
  data.someProperty = 'modified'; // Mutación directa
  return data;
}
```

### **Componentes Astro**

```astro
---
// ✅ BUENO: Props interface y destructuring claro
export interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { 
  title, 
  description,
  variant = 'primary' 
} = Astro.props;
---

<!-- ✅ BUENO: HTML semántico y accesible -->
<article class={`card card--${variant}`}>
  <header class="card__header">
    <h2 class="card__title">{title}</h2>
  </header>
  {description && (
    <p class="card__description">{description}</p>
  )}
  <div class="card__content">
    <slot />
  </div>
</article>

<style>
  /* ✅ BUENO: CSS scope y naming consistente */
  .card {
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  
  .card--primary {
    background: var(--color-primary);
    color: var(--color-white);
  }
  
  .card__title {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
</style>
```

### **CSS y Styling**

```css
/* ✅ BUENO: Variables CSS para consistency */
:root {
  --color-primary: #00ff88;
  --color-secondary: #ff0080;
  --spacing-unit: 1rem;
  --border-radius: 0.5rem;
}

/* ✅ BUENO: Clases semánticas con BEM */
.writeup-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-unit);
}

.writeup-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.writeup-card__badge--difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 500;
}

/* ❌ EVITAR: Magic numbers y specificity alta */
div.container > .content > p {
  margin-top: 15px; /* Magic number */
  color: #333 !important; /* !important innecesario */
}
```

### **Content Collections**

```markdown
<!-- ✅ BUENO: Frontmatter completo y consistente -->
---
title: "Introducción a Buffer Overflows"
description: "Guía completa sobre técnicas de buffer overflow para principiantes"
pubDate: "2024-11-02"
heroImage: "/images/blog/buffer-overflow-hero.jpg"
tags: ["binary-exploitation", "tutorial", "beginner"]
draft: false
---

# Contenido bien estructurado

## Sección con contexto

Explicación clara con ejemplos prácticos.

```bash
# Comandos con sintaxis highlighting
gcc -o vulnerable vulnerable.c -fno-stack-protector
```

## Referencias

- [Enlace 1](https://example.com)
- [Enlace 2](https://example.com)
```

---

## 🎯 **Guidelines por Tipo de Contribución**

### **🐛 Reportar Bugs**

#### Template de Bug Report
```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer click en '...'
3. Scroll down hasta '...'
4. Ver error

**Comportamiento Esperado**
Descripción de lo que esperabas que pasara.

**Screenshots**
Si aplica, agregar screenshots del problema.

**Información del Entorno:**
 - OS: [ej. Windows 11]
 - Browser: [ej. Chrome 118]
 - Versión Node.js: [ej. 18.20.8]
 - Versión pnpm: [ej. 7.1.0]

**Contexto Adicional**
Cualquier otra información relevante.
```

### **✨ Proponer Features**

#### Template de Feature Request
```markdown
**¿Tu feature request está relacionado con un problema?**
Descripción clara del problema. Ej. "Me frustra cuando..."

**Describe la solución que te gustaría**
Descripción clara y concisa de lo que quieres que pase.

**Describe alternativas consideradas**
Descripción de soluciones o features alternativas.

**Mockups/Wireframes** (opcional)
Si tienes ideas visuales, compártelas.

**Prioridad Estimada**
- [ ] Crítica (afecta funcionalidad core)
- [ ] Alta (mejora significativa de UX)
- [ ] Media (nice to have)
- [ ] Baja (wishlist)
```

### **📝 Contribuir Contenido**

#### Posts del Blog
```markdown
# Ubicación: src/content/blog/es/tu-post.md

---
title: "Título Descriptivo y SEO-Friendly"
description: "Meta description de máximo 160 caracteres para SEO"
pubDate: "2024-11-02"
heroImage: "/images/blog/tu-hero-image.jpg" # Opcional
tags: ["ciberseguridad", "tutorial", "herramientas"]
draft: false
---

# Guidelines para Posts

1. **Título atractivo** y descriptivo
2. **Introducción clara** del problema/tema
3. **Estructura lógica** con headings (##, ###)
4. **Ejemplos prácticos** con código
5. **Conclusión** con takeaways clave
6. **Referencias** a fuentes confiables

## Formato de Código

```bash
# Comandos con contexto
sudo nmap -sS -sV target.com

```

## Imágenes

- Usar formatos optimizados (WebP, PNG)
- Incluir alt text descriptivo
- Tamaño máximo recomendado: 800x400px
```

#### CTF Writeups
```markdown
# Ubicación: src/content/writeups/es/[plataforma]/tu-writeup.md

---
title: "Nombre de la Máquina/Challenge"
description: "Breve descripción del writeup y técnicas principales"
platform: "htb" # htb | tryhackme | vulnhub | hackmyvm
category: "machines" # machines | rooms | challenges
difficulty: "medium" # easy | medium | hard | insane
os: "linux" # linux | windows | other
pubDate: "2024-11-02"
tags: ["web", "privesc", "enumeration"]
retired: true # true si la máquina está retirada
points: 30 # Puntos de la máquina (HTB)
attackVectors: ["web", "network"]
cves: ["CVE-2021-44228"] # Si aplica
certifications: ["OSCP", "eJPT"] # Certificaciones relacionadas
skillLevel: "intermediate"
estimatedTime: "3-4 hours"
---

# Estructura Recomendada para Writeups

## Información de la Máquina
Tabla con datos básicos: IP, dificultad, OS, puntos

## Reconocimiento
### Nmap
### Enumeración de servicios

## Explotación
### Análisis de vulnerabilidades
### Exploit development/adaptation

## Escalada de Privilegios
### Enumeración local
### Técnicas utilizadas

## Post-Explotación (opcional)
### Persistencia
### Lateral movement
### Cleanup

## Lessons Learned
Takeaways clave y técnicas aprendidas

## Referencias
Enlaces a CVEs, tools, técnicas utilizadas
```

### **🎨 Contribuir UI/UX**

#### Guidelines de Diseño
```css
/* Seguir design system existente */
:root {
  /* Colors - mantener consistencia */
  --color-primary: #00ff88;
  --color-secondary: #ff0080;
  --color-accent: #0080ff;
  
  /* Spacing - usar unidades consistentes */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

---

## ✅ **Checklist antes de Pull Request**

### **Verificación Técnica**
- [ ] **Build exitoso** (`pnpm build`)
- [ ] **TypeScript sin errores** (`tsc --noEmit`)
- [ ] **Testing manual** de funcionalidad afectada
- [ ] **Responsive design** verificado
- [ ] **Cross-browser testing** (Chrome, Firefox, Safari)
- [ ] **Performance** no degradado

### **Verificación de Código**
- [ ] **Convenciones seguidas** (naming, structure)
- [ ] **Código comentado** apropiadamente
- [ ] **No console.logs** en producción
- [ ] **Variables CSS** utilizadas apropiadamente
- [ ] **Accesibilidad** considerada (ARIA labels, semantic HTML)

### **Verificación de Contenido**
- [ ] **Spelling y grammar** verificados
- [ ] **Enlaces funcionando** correctamente
- [ ] **Imágenes optimizadas** y con alt text
- [ ] **Frontmatter válido** en content collections
- [ ] **SEO meta tags** apropiados

### **Documentación**
- [ ] **README actualizado** si es necesario
- [ ] **Documentación técnica** actualizada
- [ ] **Comentarios en código** completos
- [ ] **Changelog** considerado para cambios grandes

---

## 📋 **Proceso de Review**

### **Qué Esperamos en el Review**

1. **Funcionalidad**: ¿El feature/fix funciona como se espera?
2. **Performance**: ¿No hay degradación de rendimiento?
3. **Security**: ¿No introduce vulnerabilidades?
4. **Maintainability**: ¿El código es limpio y mantenible?
5. **UX**: ¿Mejora la experiencia del usuario?
6. **Accessibility**: ¿Es accesible para todos los usuarios?

### **Timeline de Review**

| **Tipo de PR** | **Tiempo Estimado** | **Revisor** |
|----------------|---------------------|-------------|
| **Bug fix crítico** | 24-48 horas | Maintainer principal |
| **Feature pequeño** | 2-5 días | Maintainer o contributor senior |
| **Feature grande** | 1-2 semanas | Team review |
| **Documentación** | 1-3 días | Cualquier maintainer |

### **Proceso de Feedback**

1. **Review inicial**: Feedback técnico y de estructura
2. **Cambios solicitados**: Implementar feedback recibido
3. **Re-review**: Verificación de cambios implementados
4. **Aprobación**: Merge cuando todo está correcto
5. **Deploy**: Cambios van a producción automáticamente

---

## 🏆 **Reconocimiento de Contribuidores**

### **Sistema de Créditos**

Los contribuidores son reconocidos de múltiples formas:

- 📝 **Contributors file**: Listado en CONTRIBUTORS.md
- 🎯 **GitHub profile**: Contribuciones aparecen en tu perfil
- 🌟 **All Contributors**: Bot que reconoce todos los tipos de contribución
- 📢 **Social media**: Shout-outs por contribuciones significativas
- 💼 **Professional references**: Referencias profesionales disponibles

### **Tipos de Contribución Reconocidas**

Usando [All Contributors specification](https://allcontributors.org/):

| Emoji | Tipo | Descripción |
|-------|------|-------------|
| 💻 | `code` | Contribuciones de código |
| 📖 | `doc` | Documentación |
| 🐛 | `bug` | Bug reports |
| 💡 | `ideas` | Ideas y planning |
| 🎨 | `design` | Diseño UI/UX |
| 📝 | `content` | Posts y writeups |
| 🔍 | `review` | Code reviews |
| 🧪 | `test` | Testing |
| 🚇 | `infra` | Infrastructure |
| 📢 | `talk` | Charlas sobre el proyecto |

---

## 🤝 **Código de Conducta**

### **Nuestros Valores**

- **🤝 Respeto**: Tratamos a todos con respeto y dignidad
- **📚 Aprendizaje**: Promovemos el aprendizaje continuo
- **🌍 Inclusión**: Bienvenidos contribuidores de todos los backgrounds
- **💬 Comunicación**: Comunicación clara y constructiva
- **🔄 Colaboración**: Trabajamos juntos hacia objetivos comunes

### **Comportamiento Esperado**

- ✅ **Usar lenguaje acogedor e inclusivo**
- ✅ **Respetar diferentes puntos de vista y experiencias**
- ✅ **Aceptar críticas constructivas graciosamente**
- ✅ **Enfocarse en lo que es mejor para la comunidad**
- ✅ **Mostrar empatía hacia otros miembros**

### **Comportamiento Inaceptable**

- ❌ **Uso de lenguaje o imágenes sexualizadas**
- ❌ **Trolling, comentarios insultantes/despectivos**
- ❌ **Acoso público o privado**
- ❌ **Publicar información privada sin permiso**
- ❌ **Otra conducta que podría considerarse inapropiada**

### **Enforcement**

Instancias de comportamiento abusivo, acosador o inaceptable pueden ser reportadas contactando al equipo del proyecto en crypt0xdev@proton.me. Todas las quejas serán revisadas e investigadas.

---

## 📞 **Soporte para Contribuidores**

### **Canales de Comunicación**

| **Canal** | **Propósito** | **Respuesta** |
|-----------|---------------|---------------|
| 🐛 [GitHub Issues](https://github.com/Crypt0xDev/Crypt0xDev/issues) | Bug reports, feature requests | 24-48h |
| 💬 [GitHub Discussions](https://github.com/Crypt0xDev/Crypt0xDev/discussions) | Q&A, ideas | 1-3 días |
| 📧 Email (crypt0xdev@proton.me) | Contacto privado, CoC issues | 2-5 días |

### **Mentorship**

Para contribuidores nuevos, ofrecemos:

- 🎯 **Good first issues**: Issues etiquetadas para principiantes
- 👥 **Pair programming**: Sessions para features complejos
- 📚 **Resources**: Links a documentación y tutorials
- 🤝 **Code review educativo**: Feedback detallado y constructivo

---

## 🚀 **Ideas para Contribuir**

### **🟢 Good First Issues (Principiantes)**

- 📝 **Corrección de typos** en documentación
- 🎨 **Mejorar alt text** de imágenes
- 📱 **Testear responsive** en diferentes dispositivos
- 🔗 **Verificar enlaces** rotos
- 📚 **Traducir contenido** existente
- 🏷️ **Agregar tags** faltantes a posts

### **🟡 Intermediate Issues**

- 🔍 **Implementar búsqueda** con Pagefind
- 💬 **Agregar comentarios** con Giscus
- 📊 **Dashboard de analytics** básico
- 🎨 **Mejorar componentes** UI existentes
- 📝 **Escribir posts técnicos** nuevos
- 🔐 **Crear writeups** de máquinas retiradas

### **🔴 Advanced Issues**

- ⚡ **Optimizaciones de performance** avanzadas
- 🧪 **Testing suite** completo con Vitest
- 🤖 **GitHub Actions** workflows avanzados
- 📱 **Progressive Web App** features
- 🔒 **Security audit** y hardening
- 🧠 **ML recommendations** system

---

## 🎉 **¡Empezar a Contribuir!**

### **Pasos Siguientes**

1. 🍴 **Fork** el repositorio
2. 📋 **Revisa** los [issues abiertos](https://github.com/Crypt0xDev/Crypt0xDev/issues)
3. 💬 **Comenta** en el issue que te interesa
4. 🚀 **Sigue** el workflow de contribución
5. 📤 **Envía** tu Pull Request

### **¿Necesitas Ayuda?**

No dudes en preguntar si:

- 🤔 **No estás seguro** de cómo implementar algo
- 🔧 **Tienes problemas técnicos** con el setup
- 💡 **Quieres proponer** una idea nueva
- 📚 **Necesitas clarificación** sobre los requirements

---

<div align="center">

## 🙏 **¡Gracias por Contribuir!**

**Cada contribución, sin importar el tamaño, hace una diferencia**

[![Contributors](https://img.shields.io/github/contributors/Crypt0xDev/Crypt0xDev?style=for-the-badge)](https://github.com/Crypt0xDev/Crypt0xDev/graphs/contributors)
[![Pull Requests](https://img.shields.io/github/issues-pr/Crypt0xDev/Crypt0xDev?style=for-the-badge)](https://github.com/Crypt0xDev/Crypt0xDev/pulls)
[![Issues](https://img.shields.io/github/issues/Crypt0xDev/Crypt0xDev?style=for-the-badge)](https://github.com/Crypt0xDev/Crypt0xDev/issues)

**🌟 Tu contribución ayuda a democratizar el conocimiento en ciberseguridad**

---

**¿Listo para empezar?** [**Crear tu primer Issue**](https://github.com/Crypt0xDev/Crypt0xDev/issues/new/choose) **o** [**Ver Good First Issues**](https://github.com/Crypt0xDev/Crypt0xDev/labels/good%20first%20issue)

*Guía de contribución actualizada el 2 de noviembre de 2025*

</div>