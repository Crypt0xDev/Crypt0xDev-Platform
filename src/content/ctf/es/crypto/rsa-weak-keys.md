---
title: "RSA con Claves Débiles - Crypto CTF 2024"
description: "Factorizar un módulo RSA pequeño para descifrar el mensaje."
ctfName: "Crypto CTF 2024"
category: "crypto"
difficulty: "easy"
points: 150
pubDate: 2024-10-28
heroImage: "/images/ctf/default-ctf.png"
tags: ["crypto", "rsa", "factorization", "number-theory"]
language: es
solves: 1234
author: "Crypto Team"
skillLevel: "beginner"
estimatedTime: "30-45 minutos"
tools: ["python", "sympy", "rsatool"]
---

# RSA con Claves Débiles - Crypto CTF 2024

## Descripción

Se nos proporciona una clave pública RSA con un módulo pequeño y un mensaje cifrado. El objetivo es factorizar el módulo para recuperar la clave privada.

## Datos Proporcionados

```python
n = 62515288803124247619
e = 65537
c = 37928177688440431925
```

## Solución

Usando factorización de enteros:

```python
from sympy import factorint
from Crypto.Util.number import long_to_bytes

n = 62515288803124247619
e = 65537
c = 37928177688440431925

# Factorizar n
factors = factorint(n)
p, q = list(factors.keys())

# Calcular phi
phi = (p - 1) * (q - 1)

# Calcular d
d = pow(e, -1, phi)

# Descifrar
m = pow(c, d, n)
flag = long_to_bytes(m)
print(flag.decode())
```

## Flag

`CTF{w3ak_rsa_k3ys_ar3_bad}`
