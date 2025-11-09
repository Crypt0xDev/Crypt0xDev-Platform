---
title: "DVWA - Damn Vulnerable Web Application"
description: "Intentionally vulnerable PHP/MySQL web application for practicing ethical hacking. Includes multiple security levels and OWASP Top 10 vulnerabilities."
category: "projects"
url: "https://github.com/digininja/DVWA"
tags: ["vulnerable-app", "php", "mysql", "practice", "owasp", "web-security", "docker"]
---

# DVWA - Damn Vulnerable Web Application

**DVWA** is an **intentionally vulnerable** PHP/MySQL web application designed for security professionals to **practice ethical hacking** in a legal and controlled environment.

## Main Features

- **Completely free and open source**
- **Multiple security levels**: Low, Medium, High, Impossible
- **OWASP Top 10 vulnerabilities**
- **Simple and clear interface**
- **Documentation for each vulnerability**
- **Easy installation**: Docker, XAMPP, LAMP

## Included Vulnerabilities

### 1. Brute Force
- Brute force attack on login forms
- Security control bypass
- Rate limiting bypass

### 2. Command Injection
- OS command injection
- Remote code execution
- Filter bypass

### 3. CSRF (Cross-Site Request Forgery)
- Cross-site request forgery
- Anti-CSRF tokens
- Origin validation

### 4. File Inclusion
- Local File Inclusion (LFI)
- Remote File Inclusion (RFI)
- Path traversal

### 5. File Upload
- File validation bypass
- PHP shell upload
- Double extension tricks

### 6. Insecure CAPTCHA
- CAPTCHA bypass
- Parameter manipulation
- Logic flaws

### 7. SQL Injection
- Basic SQL injection
- Blind SQL Injection
- UNION attacks
- Data extraction

### 8. SQL Injection (Blind)
- Time-based attacks
- Boolean-based attacks
- Out-of-band techniques

### 9. Weak Session IDs
- Session ID prediction
- Session fixation
- Session hijacking

### 10. XSS (Cross-Site Scripting)
- Reflected XSS
- Stored XSS
- DOM-based XSS

### 11. XSS (DOM)
- DOM manipulation
- Client-side vulnerabilities

### 12. XSS (Reflected)
- Reflected attacks
- Filter bypass
- Encoding techniques

### 13. XSS (Stored)
- Persistent XSS
- Database injection
- Multi-user attacks

### 14. CSP Bypass
- Content Security Policy bypass
- Inline script execution

### 15. JavaScript Attacks
- Client-side security
- Obfuscation bypass

## Security Levels

### Low
- **No protections**: Basic vulnerable code
- **Ideal for**: Absolute beginners
- **Goal**: Learn basic concepts of each vulnerability

### Medium
- **Basic protections**: Simple validations
- **Ideal for**: Users with basic knowledge
- **Goal**: Learn bypass techniques

### High
- **Advanced protections**: Multiple security layers
- **Ideal for**: Intermediate/advanced users
- **Goal**: Complex bypass techniques

### Impossible
- **Secure code**: Correct implementation
- **Ideal for**: See how secure code should be
- **Goal**: Compare with vulnerable levels

## Installation

### Option 1: Docker (Recommended)

```bash
# Download image
docker pull vulnerables/web-dvwa

# Run container
docker run --rm -it -p 80:80 vulnerables/web-dvwa

# Access in browser
http://localhost
```

**Default credentials:**
- Username: `admin`
- Password: `password`

### Option 2: XAMPP/WAMP (Windows)

```bash
# 1. Download DVWA
git clone https://github.com/digininja/DVWA.git

# 2. Copy to XAMPP htdocs
cp -r DVWA /xampp/htdocs/

# 3. Configure database
cp config/config.inc.php.dist config/config.inc.php

# 4. Edit config.inc.php with MySQL credentials

# 5. Access and create DB
http://localhost/DVWA/setup.php
```

### Option 3: Linux (LAMP Stack)

```bash
# Install dependencies
sudo apt update
sudo apt install apache2 mysql-server php php-mysqli php-gd libapache2-mod-php

# Clone repository
git clone https://github.com/digininja/DVWA.git
sudo mv DVWA /var/www/html/

# Configure permissions
sudo chown -R www-data:www-data /var/www/html/DVWA
sudo chmod -R 755 /var/www/html/DVWA

# Configure database
sudo cp /var/www/html/DVWA/config/config.inc.php.dist /var/www/html/DVWA/config/config.inc.php

# Edit configuration
sudo nano /var/www/html/DVWA/config/config.inc.php

# Access
http://localhost/DVWA
```

## Initial Configuration

1. **Access setup.php**:
   ```
   http://localhost/DVWA/setup.php
   ```

2. **Verify requirements**:
   - PHP version ≥ 5.3
   - allow_url_include = On
   - MySQL configured

3. **Create database**:
   - Click on "Create / Reset Database"

4. **Login**:
   - Username: `admin`
   - Password: `password`

5. **Change security level**:
   - DVWA Security > Low/Medium/High/Impossible

## Practice Methodology

### For Beginners

1. **Start at Low level**
2. **Read documentation** of each module
3. **Try to exploit** the vulnerability
4. **Read source code** (View Source)
5. **Compare with Impossible level**
6. **Move to next level**

### For Intermediate

1. **Start at Medium or High**
2. **Don't read documentation** immediately
3. **Identify vulnerability** on your own
4. **Develop exploit**
5. **Document your process**
6. **Create automated scripts**

## Complementary Tools

### Essential
- **Burp Suite**: Intercept and modify requests
- **OWASP ZAP**: Automatic scanner
- **Firefox/Chrome DevTools**: Frontend analysis

### Useful
- **SQLMap**: Automate SQL Injection
- **wfuzz**: Parameter fuzzing
- **Nikto**: Web vulnerability scanner
- **Metasploit**: Exploitation framework

### Scripts
```bash
# Automate SQLi with sqlmap
sqlmap -u "http://localhost/DVWA/vulnerabilities/sqli/?id=1&Submit=Submit#" \
  --cookie="security=low; PHPSESSID=your_session" \
  --dbs

# Fuzzing with wfuzz
wfuzz -c -z file,wordlist.txt \
  http://localhost/DVWA/vulnerabilities/brute/?username=admin&password=FUZZ
```

## Similar Projects

- **bWAPP**: Buggy Web Application
- **WebGoat**: OWASP learning platform
- **OWASP Juice Shop**: Modern JavaScript application
- **HackTheBox**: Pentesting platform
- **Mutillidae**: OWASP vulnerable app

## Best Practices

1. **Never expose DVWA to Internet**: Only localhost
2. **Use virtual machines**: Security isolation
3. **Take notes**: Document learned techniques
4. **Read the code**: Learn from mistakes
5. **Practice ethically**: Only in authorized environments

## Additional Resources

- [Official GitHub](https://github.com/digininja/DVWA)
- [Documentation](https://github.com/digininja/DVWA/tree/master/docs)
- [Video Tutorials](https://www.youtube.com/results?search_query=DVWA+tutorial)
- [Writeups](https://github.com/search?q=dvwa+writeup)

## Related Certifications

DVWA is excellent for preparing:
- **CEH**: Certified Ethical Hacker
- **eWPT**: eLearnSecurity Web Penetration Tester
- **OSWE**: Offensive Security Web Expert
- **BSCP**: Burp Suite Certified Practitioner

---

**⚠️ Legal Warning**: DVWA is only for educational purposes in controlled environments. Never use these techniques on systems without explicit authorization.
