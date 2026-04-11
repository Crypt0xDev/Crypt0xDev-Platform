---
title: "Código QR Corrupto - Misc CTF 2024"
description: "Reparar y decodificar un código QR parcialmente dañado."
ctfName: "Misc CTF 2024"
category: "misc"
difficulty: "easy"
points: 125
pubDate: 2024-10-10
heroImage: "/images/ctf/default-ctf.png"
tags: ["misc", "qr-code", "image-manipulation", "python"]
language: es
solves: 1345
author: "Misc Team"
skillLevel: "beginner"
estimatedTime: "25-40 minutos"
tools: ["python", "pil", "zbar", "qr-code-generator"]
---

# Código QR Corrupto - Misc CTF 2024

## Descripción

Se nos proporciona una imagen de un código QR que está parcialmente corrupto. Debemos repararlo para leer la flag.

## Análisis

Al intentar escanear el QR obtenemos un error. Inspeccionando la imagen vemos que faltan algunos módulos.

## Solución Manual

Podemos usar la redundancia inherente de los códigos QR:

1. Los códigos QR tienen corrección de errores (niveles L, M, Q, H)
2. Identificar patrones de posición intactos
3. Reconstruir módulos faltantes

## Solución con Python

```python
from PIL import Image
import qrcode
from pyzbar.pyzbar import decode

# Cargar imagen
img = Image.open('corrupted_qr.png')

# Intentar decodificar
result = decode(img)

if result:
    flag = result[0].data.decode('utf-8')
    print(f"Flag: {flag}")
```

## Reconstrucción

Si la corrupción es severa, podemos:
1. Identificar el nivel de corrección
2. Reconstruir manualmente los bits faltantes
3. Usar herramientas de reparación de QR

## Flag

`CTF{qr_c0d3s_h4v3_r3dund4ncy}`
