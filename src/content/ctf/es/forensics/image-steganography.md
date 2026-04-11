---
title: "Esteganografía en Imágenes - ForensCTF 2024"
description: "Extraer datos ocultos en una imagen PNG usando técnicas de esteganografía."
ctfName: "ForensCTF 2024"
category: "forensics"
difficulty: "easy"
points: 100
pubDate: 2024-10-25
heroImage: "/images/ctf/default-ctf.png"
tags: ["forensics", "steganography", "image-analysis", "png"]
language: es
solves: 1567
author: "Forensics Team"
skillLevel: "beginner"
estimatedTime: "20-30 minutos"
tools: ["steghide", "zsteg", "binwalk", "exiftool"]
---

# Esteganografía en Imágenes - ForensCTF 2024

## Descripción

Se nos proporciona una imagen PNG aparentemente normal. Sin embargo, contiene información oculta que debemos extraer.

## Análisis Inicial

Primero verificamos los metadatos:

```bash
exiftool image.png
```

Luego buscamos datos ocultos:

```bash
binwalk image.png
zsteg image.png
```

## Extracción de Datos

Usando `zsteg` encontramos datos en el LSB:

```bash
zsteg -a image.png
```

Resultado:
```
b1,rgb,lsb,xy       .. text: "CTF{h1dd3n_1n_pla1n_s1ght}"
```

## Solución Alternativa

También podemos usar `steghide`:

```bash
steghide extract -sf image.png
```

## Flag

`CTF{h1dd3n_1n_pla1n_s1ght}`
