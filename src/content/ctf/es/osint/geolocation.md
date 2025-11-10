---
title: "Geolocalización de Fotografía - OSINT CTF 2024"
description: "Identificar la ubicación exacta donde fue tomada una fotografía usando técnicas OSINT."
ctfName: "OSINT CTF 2024"
category: "osint"
difficulty: "medium"
points: 200
pubDate: 2024-10-20
heroImage: "/images/ctf/default-ctf.png"
tags: ["osint", "geolocation", "google-earth", "reverse-image-search"]
language: es
solves: 432
author: "OSINT Team"
skillLevel: "intermediate"
estimatedTime: "45-60 minutos"
tools: ["google-earth", "google-lens", "yandex", "exiftool"]
---

# Geolocalización de Fotografía - OSINT CTF 2024

## Descripción

Se nos proporciona una fotografía sin metadatos EXIF. Debemos identificar la ubicación exacta (coordenadas GPS) donde fue tomada.

## Metodología

### 1. Análisis Visual

Identificamos elementos clave:
- Arquitectura distintiva
- Señales de tráfico
- Idioma en carteles
- Vegetación
- Estilo de construcción

### 2. Búsqueda Inversa de Imágenes

Usamos múltiples motores:
- Google Lens
- Yandex Images
- TinEye

### 3. Google Earth

Una vez identificada la ciudad/área:
1. Usar Street View
2. Comparar ángulos
3. Verificar detalles arquitectónicos

## Solución

Tras el análisis identificamos:
- **Ubicación**: Plaza Mayor, Madrid
- **Coordenadas**: 40.4153°N, 3.7074°W
- **Punto exacto**: Esquina noreste de la plaza

## Flag

`CTF{40.4153_-3.7074_madrid_plaza_mayor}`
