---
title: "Corrupted QR Code - Misc CTF 2024"
description: "Repair and decode a partially damaged QR code."
ctfName: "Misc CTF 2024"
category: "misc"
difficulty: "easy"
points: 125
pubDate: 2024-10-10
heroImage: "/images/ctf/default-ctf.png"
tags: ["misc", "qr-code", "image-manipulation", "python"]
language: en
solves: 1345
author: "Misc Team"
skillLevel: "beginner"
estimatedTime: "25-40 minutes"
tools: ["python", "pil", "zbar", "qr-code-generator"]
---

# Corrupted QR Code - Misc CTF 2024

## Description

We are provided with an image of a QR code that is partially corrupted. We must repair it to read the flag.

## Analysis

When trying to scan the QR we get an error. Inspecting the image we see that some modules are missing.

## Manual Solution

We can use the inherent redundancy of QR codes:

1. QR codes have error correction (levels L, M, Q, H)
2. Identify intact position patterns
3. Reconstruct missing modules

## Python Solution

```python
from PIL import Image
import qrcode
from pyzbar.pyzbar import decode

# Load image
img = Image.open('corrupted_qr.png')

# Try to decode
result = decode(img)

if result:
    flag = result[0].data.decode('utf-8')
    print(f"Flag: {flag}")
```

## Reconstruction

If corruption is severe, we can:
1. Identify the correction level
2. Manually reconstruct missing bits
3. Use QR repair tools

## Flag

`CTF{qr_c0d3s_h4v3_r3dund4ncy}`
