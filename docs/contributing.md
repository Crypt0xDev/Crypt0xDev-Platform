# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Crypt0xDev! Esta guía te ayudará a hacer contribuciones de calidad.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estándares de Código](#estándares-de-código)
- [Tipos de Contribuciones](#tipos-de-contribuciones)

---

## 📜 Código de Conducta

### Nuestro Compromiso

Nos comprometemos a mantener un ambiente abierto, acogedor, diverso e inclusivo.

### Comportamiento Esperado

- ✅ Ser respetuoso con diferentes opiniones
- ✅ Aceptar críticas constructivas
- ✅ Enfocarse en lo mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros

### Comportamiento Inaceptable

- ❌ Lenguaje ofensivo o discriminatorio
- ❌ Trolling o comentarios despectivos
- ❌ Acoso público o privado
- ❌ Publicar información privada sin permiso

---

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio desde GitHub

# Clonar tu fork
git clone https://github.com/TU_USUARIO/Crypt0.git
cd Crypt0

# Agregar upstream
git remote add upstream https://github.com/Crypt0xDev/Crypt0.git
```

### 2. Crear Branch

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear branch descriptivo
git checkout -b feature/nombre-feature
# o
git checkout -b fix/descripcion-bug
# o
git checkout -b docs/mejora-documentacion
```

**Convención de nombres**:

- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Documentación
- `style/` - Formato, estilo
- `refactor/` - Refactorización de código
- `test/` - Tests
- `chore/` - Mantenimiento

### 3. Hacer Cambios

```bash
# Instalar dependencias
npm install

# Crear .env desde ejemplo
cp .env.example .env

# Iniciar desarrollo
npm run dev

# Hacer tus cambios...
```

### 4. Probar Cambios

```bash
# Ejecutar tests
npm test

# Verificar TypeScript
npm run astro check

# Build local
npm run build
npm run preview
```

### 5. Commit

```bash
# Agregar archivos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar componente de búsqueda avanzada"
```

**Formato de commits** (Conventional Commits):

```
<tipo>(<scope>): <descripción corta>

<descripción larga opcional>

<footer opcional>
```

**Tipos**:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, sin cambios de código
- `refactor`: Refactorización
- `test`: Agregar o modificar tests
- `chore`: Mantenimiento

**Ejemplos**:

```bash
git commit -m "feat(writeups): agregar writeup de máquina Blackfield"
git commit -m "fix(i18n): corregir traducciones en español"
git commit -m "docs: actualizar README con instrucciones de instalación"
git commit -m "style(components): formatear código con Prettier"
```

### 6. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-feature

# Crear Pull Request desde GitHub
```

---

## 🔄 Proceso de Pull Request

### Antes de Crear el PR

- [ ] Tests pasan (`npm test`)
- [ ] Build exitoso (`npm run build`)
- [ ] Código formateado
- [ ] Documentación actualizada
- [ ] Commits siguen convención
- [ ] Branch actualizado con `main`

### Template de Pull Request

```markdown
## 📝 Descripción

Breve descripción de los cambios realizados.

## 🎯 Tipo de Cambio

- [ ] 🐛 Bug fix
- [ ] ✨ Nueva funcionalidad
- [ ] 📝 Documentación
- [ ] 🎨 Estilo/UI
- [ ] ♻️ Refactorización
- [ ] ⚡ Performance
- [ ] ✅ Tests

## 🧪 Cómo se Probó

Describe cómo probaste tus cambios:

1. ...
2. ...

## 📸 Screenshots (si aplica)

[Agregar screenshots de cambios visuales]

## ✅ Checklist

- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado self-review
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan warnings
- [ ] He agregado tests
- [ ] Tests nuevos y existentes pasan
- [ ] Contenido bilingüe (es + en)

## 🔗 Issues Relacionados

Cierra #123
Relacionado con #456
```

### Review Process

1. **Automated checks** - CI/CD corre automáticamente
2. **Code review** - Maintainer revisa el código
3. **Cambios solicitados** - Implementar feedback
4. **Aprobación** - PR aprobado
5. **Merge** - Se integra a main

---

## 💻 Estándares de Código

### TypeScript

```typescript
// ✅ BUENO - Type-safe, descriptivo
interface WriteupProps {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  platform: Platform;
}

function getWriteup(props: WriteupProps): Writeup {
  // ...
}

// ❌ MALO - Sin tipos
function getWriteup(props) {
  // ...
}
```

### Componentes Astro

```astro
---
// ✅ BUENO - Props tipadas, imports organizados
import type { CollectionEntry } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import { formatDate } from '@i18n/utils/date';

interface Props {
  post: CollectionEntry<'blog'>;
  lang: 'es' | 'en';
}

const { post, lang } = Astro.props;
const formattedDate = formatDate(post.data.pubDate, lang);
---

<Layout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <time datetime={post.data.pubDate.toISOString()}>
      {formattedDate}
    </time>
  </article>
</Layout>
```

### CSS/Tailwind

```astro
<!-- ✅ BUENO - Clases organizadas, responsive -->
<div
  class="
    container mx-auto px-4
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
    dark:bg-gray-900
  "
>
  {/* contenido */}
</div>

<!-- ❌ MALO - Desordenado, sin responsive -->
<div class="px-4 bg-white grid gap-6">
  {/* contenido */}
</div>
```

### Nombres de Archivos

```
✅ BUENO:
- kebab-case.astro
- PascalCase.tsx (componentes React)
- camelCase.ts

❌ MALO:
- MiComponente.astro
- mi_script.ts
- CONSTANTS.TS
```

---

## 📝 Tipos de Contribuciones

### 🆕 Nuevo Writeup

1. Crear archivos en `/en/` y `/es/`
2. Seguir template de [content-guide.md](./content-guide.md)
3. Agregar imágenes en `/public/images/writeups/`
4. Validar schema con `npm run astro check`
5. Incluir técnicas MITRE ATT&CK relevantes

**Checklist**:

- [ ] Writeup en español (`language: es`)
- [ ] Writeup en inglés (`language: en`)
- [ ] Imágenes optimizadas (WebP)
- [ ] Metadatos completos
- [ ] Tags relevantes
- [ ] Sección de mitigaciones

### 🐛 Reportar Bug

Crear issue con:

```markdown
**Descripción del Bug**
Descripción clara del problema.

**Pasos para Reproducir**

1. Ir a '...'
2. Hacer click en '...'
3. Ver error

**Comportamiento Esperado**
Qué debería suceder.

**Screenshots**
Si aplica, agregar screenshots.

**Entorno**

- OS: [Windows/Mac/Linux]
- Navegador: [Chrome/Firefox/Safari]
- Versión: [1.0.0]

**Contexto Adicional**
Cualquier otra información relevante.
```

### ✨ Proponer Feature

Crear issue con:

```markdown
**Descripción del Feature**
Descripción clara de la funcionalidad propuesta.

**Problema que Resuelve**
¿Qué problema soluciona?

**Solución Propuesta**
¿Cómo lo implementarías?

**Alternativas Consideradas**
Otras opciones que consideraste.

**Contexto Adicional**
Mockups, referencias, etc.
```

### 📚 Mejorar Documentación

- Corregir typos
- Aclarar instrucciones
- Agregar ejemplos
- Actualizar información obsoleta
- Traducir contenido

### 🧪 Agregar Tests

```typescript
// src/i18n/utils/__tests__/example.test.ts
import { test, expect, describe } from 'vitest';
import { myFunction } from '../example';

describe('myFunction', () => {
  test('should return expected value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });

  test('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(null)).toThrow();
  });
});
```

### 🎨 Mejoras de UI/UX

- Seguir diseño existente
- Mantener consistencia
- Responsive en móvil/tablet/desktop
- Modo oscuro compatible
- Accesibilidad (a11y)

---

## 🔍 Review Checklist

Al revisar PRs, verificar:

### Código

- [ ] Cumple estándares del proyecto
- [ ] TypeScript sin errores
- [ ] Sin código comentado innecesario
- [ ] Variables descriptivas
- [ ] Funciones pequeñas y enfocadas

### Tests

- [ ] Tests incluidos para nuevo código
- [ ] Tests existentes pasan
- [ ] Coverage apropiado

### Documentación

- [ ] README actualizado si aplica
- [ ] Comentarios en código complejo
- [ ] JSDoc para funciones públicas

### i18n

- [ ] Contenido en español e inglés
- [ ] Traducciones en JSON
- [ ] Rutas localizadas

### Performance

- [ ] Sin imports innecesarios
- [ ] Imágenes optimizadas
- [ ] Sin re-renders innecesarios

### Accesibilidad

- [ ] Alt text en imágenes
- [ ] Contraste de colores adecuado
- [ ] Navegable por teclado
- [ ] ARIA labels cuando sea necesario

---

## 🎁 Reconocimientos

Los contribuidores aparecerán en:

- `CONTRIBUTORS.md`
- Release notes
- Menciones en redes sociales

---

## 📞 Obtener Ayuda

### Canales de Comunicación

- **GitHub Issues** - Bugs y features
- **GitHub Discussions** - Preguntas generales
- **Email** - contact@crypt0xdev.com

### Recursos

- [Documentación](./README.md)
- [Guía de Contenido](./content-guide.md)
- [Guía i18n](./i18n-guide.md)
- [Astro Docs](https://docs.astro.build)

---

## ⚡ Tips para Contribuidores

1. **Comunica temprano** - Comenta en issues antes de empezar
2. **Mantén PRs pequeños** - Más fáciles de revisar
3. **Un cambio a la vez** - Feature por PR
4. **Sé paciente** - Reviews pueden tomar tiempo
5. **Acepta feedback** - Es para mejorar el código
6. **Documenta** - Explica decisiones complejas

---

## 📜 Licencia

Al contribuir, aceptas que tu código será licenciado bajo MIT License.

---

¡Gracias por contribuir a Crypt0xDev! 🙏

**Última actualización**: Abril 2024
