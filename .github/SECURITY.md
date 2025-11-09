# 🔐 Security Policy - Crypt0xDev

## 🛡️ **Supported Versions**

Mantenemos activamente las siguientes versiones del proyecto:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Fully supported |
| 0.9.x   | ✅ Security updates only |
| < 0.9   | ❌ No longer supported |

## 🚨 **Reporting a Vulnerability**

### **¿Encontraste una vulnerabilidad de seguridad?**

**NO** abras un issue público. En su lugar, repórtala de manera responsable:

### 📧 **Contacto Seguro**

1. **Email**: Envía detalles a `security@crypt0xdev.com` (si disponible)
2. **GitHub**: Usa [Private vulnerability reporting](https://github.com/Crypt0xDev/Crypt0/security/advisories/new)
3. **Issue privado**: Contacta directamente al maintainer

### 📋 **Información a incluir**

Por favor incluye:

- **Descripción detallada** del problema de seguridad
- **Pasos para reproducir** la vulnerabilidad
- **Impacto potencial** y severidad estimada
- **Versiones afectadas** del software
- **Mitigaciones temporales** (si las conoces)

### ⏱️ **Tiempos de Respuesta**

| Acción | Tiempo Esperado |
|--------|-----------------|
| **Confirmación inicial** | 24-48 horas |
| **Evaluación completa** | 7 días |
| **Parche disponible** | 14-30 días |
| **Divulgación pública** | Después del parche |

## 🔒 **Scope de Seguridad**

### ✅ **En Scope**

- **Vulnerabilidades del código fuente**
- **Problemas de configuración**
- **Dependencias con vulnerabilidades conocidas**
- **Inyecciones de código en el contenido**
- **Problemas de autenticación/autorización**

### ❌ **Fuera de Scope**

- **DDoS attacks**
- **Ingeniería social**
- **Vulnerabilidades en servicios de terceros** (Vercel, GitHub)
- **Problemas en navegadores específicos**
- **Rate limiting issues**

## 🏆 **Security Best Practices**

### **Para Contribuidores**

- ✅ Mantén dependencias actualizadas
- ✅ Usa `pnpm audit` regularmente
- ✅ Evita hardcodear credenciales
- ✅ Valida todo input del usuario
- ✅ Implementa Content Security Policy

### **Para Usuarios**

- ✅ Mantén Node.js actualizado
- ✅ Usa HTTPS en producción
- ✅ Revisa dependencias antes de instalar
- ✅ Configura correctamente variables de entorno

## 📚 **Recursos de Seguridad**

- **[OWASP Top 10](https://owasp.org/www-project-top-ten/)**
- **[Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)**
- **[Astro Security Guide](https://docs.astro.build/en/concepts/why-astro/#security-focused)**
- **[GitHub Security Advisories](https://github.com/advisories)**

## 🙏 **Agradecimientos**

Agradecemos a todos los investigadores de seguridad que reporten vulnerabilidades de manera responsable. Los contribuidores serán reconocidos públicamente (si lo desean) una vez que el problema sea resuelto.

---

<div align="center">

**Para reportes de seguridad urgentes, contacta inmediatamente**

[![Security Policy](https://img.shields.io/badge/Security-Policy-red?style=for-the-badge)](SECURITY.md)

</div>