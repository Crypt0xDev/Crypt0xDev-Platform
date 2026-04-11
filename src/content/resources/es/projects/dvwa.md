---
title: "DVWA - Damn Vulnerable Web Application"
description: "Aplicación web PHP/MySQL intencionalmente vulnerable para practicar hacking ético. Incluye múltiples niveles de seguridad y vulnerabilidades OWASP Top 10."
category: "projects"
tags: ["vulnerable-app", "php", "mysql", "practice", "owasp", "web-security", "docker"]
---

# DVWA - Damn Vulnerable Web Application

**DVWA** es una aplicación web PHP/MySQL **intencionalmente vulnerable** diseñada para que profesionales de seguridad puedan **practicar hacking ético** en un entorno legal y controlado.

## Características Principales

- **Completamente gratuito y open source**
- **Múltiples niveles de seguridad**: Low, Medium, High, Impossible
- **Vulnerabilidades OWASP Top 10**
- **Interfaz simple y clara**
- **Documentación de cada vulnerabilidad**
- **Fácil instalación**: Docker, XAMPP, LAMP

## Vulnerabilidades Incluidas

### 1. Brute Force
- Ataque de fuerza bruta a formularios de login
- Bypass de controles de seguridad
- Rate limiting bypass

### 2. Command Injection
- Inyección de comandos OS
- Ejecución remota de código
- Bypass de filtros

### 3. CSRF (Cross-Site Request Forgery)
- Falsificación de peticiones entre sitios
- Tokens anti-CSRF
- Validación de origen

### 4. File Inclusion
- Local File Inclusion (LFI)
- Remote File Inclusion (RFI)
- Path traversal

### 5. File Upload
- Bypass de validación de archivos
- Upload de shells PHP
- Double extension tricks

### 6. Insecure CAPTCHA
- Bypass de CAPTCHA
- Manipulación de parámetros
- Logic flaws

### 7. SQL Injection
- Inyección SQL básica
- Blind SQL Injection
- UNION attacks
- Extracción de datos

### 8. SQL Injection (Blind)
- Time-based attacks
- Boolean-based attacks
- Out-of-band techniques

### 9. Weak Session IDs
- Predicción de session IDs
- Session fixation
- Session hijacking

### 10. XSS (Cross-Site Scripting)
- Reflected XSS
- Stored XSS
- DOM-based XSS

### 11. XSS (DOM)
- Manipulación del DOM
- Client-side vulnerabilities

### 12. XSS (Reflected)
- Reflected attacks
- Bypass de filtros
- Encoding techniques

### 13. XSS (Stored)
- Persistent XSS
- Database injection
- Multi-user attacks

### 14. CSP Bypass
- Content Security Policy bypass
- Inline script execution

### 15. JavaScript Attacks
- Client-side security
- Obfuscation bypass

## Niveles de Seguridad

### Low (Bajo)
- **Sin protecciones**: Código vulnerable básico
- **Ideal para**: Principiantes absolutos
- **Objetivo**: Aprender conceptos básicos de cada vulnerabilidad

### Medium (Medio)
- **Protecciones básicas**: Validaciones simples
- **Ideal para**: Usuarios con conocimientos básicos
- **Objetivo**: Aprender técnicas de bypass

### High (Alto)
- **Protecciones avanzadas**: Múltiples capas de seguridad
- **Ideal para**: Usuarios intermedios/avanzados
- **Objetivo**: Técnicas de bypass complejas

### Impossible (Imposible)
- **Código seguro**: Implementación correcta
- **Ideal para**: Ver cómo debe ser el código seguro
- **Objetivo**: Comparar con niveles vulnerables

## Instalación

### Opción 1: Docker (Recomendado)

```bash
# Descargar imagen
docker pull vulnerables/web-dvwa

# Ejecutar contenedor
docker run --rm -it -p 80:80 vulnerables/web-dvwa

# Acceder en navegador
http://localhost
```

**Credenciales por defecto:**
- Usuario: `admin`
- Password: `password`

### Opción 2: XAMPP/WAMP (Windows)

```bash
# 1. Descargar DVWA
git clone https://github.com/digininja/DVWA.git

# 2. Copiar a htdocs de XAMPP
cp -r DVWA /xampp/htdocs/

# 3. Configurar base de datos
cp config/config.inc.php.dist config/config.inc.php

# 4. Editar config.inc.php con credenciales MySQL

# 5. Acceder y crear BD
http://localhost/DVWA/setup.php
```

### Opción 3: Linux (LAMP Stack)

```bash
# Instalar dependencias
sudo apt update
sudo apt install apache2 mysql-server php php-mysqli php-gd libapache2-mod-php

# Clonar repositorio
git clone https://github.com/digininja/DVWA.git
sudo mv DVWA /var/www/html/

# Configurar permisos
sudo chown -R www-data:www-data /var/www/html/DVWA
sudo chmod -R 755 /var/www/html/DVWA

# Configurar base de datos
sudo cp /var/www/html/DVWA/config/config.inc.php.dist /var/www/html/DVWA/config/config.inc.php

# Editar configuración
sudo nano /var/www/html/DVWA/config/config.inc.php

# Acceder
http://localhost/DVWA
```

## Configuración Inicial

1. **Acceder a setup.php**:
   ```
   http://localhost/DVWA/setup.php
   ```

2. **Verificar requisitos**:
   - PHP version ≥ 5.3
   - allow_url_include = On
   - MySQL configurado

3. **Crear base de datos**:
   - Click en "Create / Reset Database"

4. **Login**:
   - Usuario: `admin`
   - Password: `password`

5. **Cambiar nivel de seguridad**:
   - DVWA Security > Low/Medium/High/Impossible

## Metodología de Práctica

### Para Principiantes

1. **Empieza en nivel Low**
2. **Lee la documentación** de cada módulo
3. **Intenta explotar** la vulnerabilidad
4. **Lee el código fuente** (View Source)
5. **Compara con nivel Impossible**
6. **Sube al siguiente nivel**

### Para Intermedios

1. **Empieza en Medium o High**
2. **No leas la documentación** inmediatamente
3. **Identifica la vulnerabilidad** por tu cuenta
4. **Desarrolla el exploit**
5. **Documenta tu proceso**
6. **Crea scripts automatizados**

## Herramientas Complementarias

### Esenciales
- **Burp Suite**: Interceptar y modificar peticiones
- **OWASP ZAP**: Scanner automático
- **Firefox/Chrome DevTools**: Análisis de frontend

### Útiles
- **SQLMap**: Automatizar SQL Injection
- **wfuzz**: Fuzzing de parámetros
- **Nikto**: Scanner de vulnerabilidades web
- **Metasploit**: Framework de explotación

### Scripts
```bash
# Automatizar SQLi con sqlmap
sqlmap -u "http://localhost/DVWA/vulnerabilities/sqli/?id=1&Submit=Submit#" \
  --cookie="security=low; PHPSESSID=your_session" \
  --dbs

# Fuzzing con wfuzz
wfuzz -c -z file,wordlist.txt \
  http://localhost/DVWA/vulnerabilities/brute/?username=admin&password=FUZZ
```

## Proyectos Similares

- **bWAPP**: Buggy Web Application
- **WebGoat**: OWASP learning platform
- **OWASP Juice Shop**: Moderna aplicación JavaScript
- **HackTheBox**: Plataforma de pentesting
- **Mutillidae**: OWASP vulnerable app

## Buenas Prácticas

1. **Nunca expongas DVWA a Internet**: Solo localhost
2. **Usa máquinas virtuales**: Aislamiento de seguridad
3. **Toma notas**: Documenta técnicas aprendidas
4. **Lee el código**: Aprende de los errores
5. **Practica ética**: Solo en entornos autorizados

## Recursos Adicionales

- [GitHub Oficial](https://github.com/digininja/DVWA)
- [Documentación](https://github.com/digininja/DVWA/tree/master/docs)
- [Video Tutoriales](https://www.youtube.com/results?search_query=DVWA+tutorial)
- [Writeups](https://github.com/search?q=dvwa+writeup)

## Certificaciones Relacionadas

DVWA es excelente para preparar:
- **CEH**: Certified Ethical Hacker
- **eWPT**: eLearnSecurity Web Penetration Tester
- **OSWE**: Offensive Security Web Expert
- **BSCP**: Burp Suite Certified Practitioner

---

**⚠️ Advertencia Legal**: DVWA es solo para fines educativos en entornos controlados. Nunca uses estas técnicas en sistemas sin autorización explícita.
