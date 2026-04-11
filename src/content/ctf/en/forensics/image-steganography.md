---
title: "Image Steganography - ForensCTF 2024"
description: "Extract hidden data from a PNG image using steganography techniques."
ctfName: "ForensCTF 2024"
category: "forensics"
difficulty: "easy"
points: 100
pubDate: 2024-10-25
heroImage: "/images/ctf/default-ctf.png"
tags: ["forensics", "steganography", "image-analysis", "png"]
language: en
solves: 1567
author: "Forensics Team"
skillLevel: "beginner"
estimatedTime: "20-30 minutes"
tools: ["steghide", "zsteg", "binwalk", "exiftool"]
---

# Image Steganography - ForensCTF 2024

## Description

We are provided with an apparently normal PNG image. However, it contains hidden information that we must extract.

## Initial Analysis

First we check the metadata:

```bash
exiftool image.png
```

Then we search for hidden data:

```bash
binwalk image.png
zsteg image.png
```

## Data Extraction

Using `zsteg` we find data in the LSB:

```bash
zsteg -a image.png
```

Result:
```
b1,rgb,lsb,xy       .. text: "CTF{h1dd3n_1n_pla1n_s1ght}"
```

## Alternative Solution

We can also use `steghide`:

```bash
steghide extract -sf image.png
```

## Flag

`CTF{h1dd3n_1n_pla1n_s1ght}`
