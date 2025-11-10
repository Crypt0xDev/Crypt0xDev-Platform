---
title: "RSA with Weak Keys - Crypto CTF 2024"
description: "Factorize a small RSA modulus to decrypt the message."
ctfName: "Crypto CTF 2024"
category: "crypto"
difficulty: "easy"
points: 150
pubDate: 2024-10-28
heroImage: "/images/ctf/default-ctf.png"
tags: ["crypto", "rsa", "factorization", "number-theory"]
language: en
solves: 1234
author: "Crypto Team"
skillLevel: "beginner"
estimatedTime: "30-45 minutes"
tools: ["python", "sympy", "rsatool"]
---

# RSA with Weak Keys - Crypto CTF 2024

## Description

We are provided with an RSA public key with a small modulus and an encrypted message. The goal is to factorize the modulus to recover the private key.

## Provided Data

```python
n = 62515288803124247619
e = 65537
c = 37928177688440431925
```

## Solution

Using integer factorization:

```python
from sympy import factorint
from Crypto.Util.number import long_to_bytes

n = 62515288803124247619
e = 65537
c = 37928177688440431925

# Factorize n
factors = factorint(n)
p, q = list(factors.keys())

# Calculate phi
phi = (p - 1) * (q - 1)

# Calculate d
d = pow(e, -1, phi)

# Decrypt
m = pow(c, d, n)
flag = long_to_bytes(m)
print(flag.decode())
```

## Flag

`CTF{w3ak_rsa_k3ys_ar3_bad}`
