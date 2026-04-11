---
title: "Photo Geolocation - OSINT CTF 2024"
description: "Identify the exact location where a photograph was taken using OSINT techniques."
ctfName: "OSINT CTF 2024"
category: "osint"
difficulty: "medium"
points: 200
pubDate: 2024-10-20
heroImage: "/images/ctf/default-ctf.png"
tags: ["osint", "geolocation", "google-earth", "reverse-image-search"]
language: en
solves: 432
author: "OSINT Team"
skillLevel: "intermediate"
estimatedTime: "45-60 minutes"
tools: ["google-earth", "google-lens", "yandex", "exiftool"]
---

# Photo Geolocation - OSINT CTF 2024

## Description

We are provided with a photograph without EXIF metadata. We must identify the exact location (GPS coordinates) where it was taken.

## Methodology

### 1. Visual Analysis

Identify key elements:
- Distinctive architecture
- Traffic signs
- Language on posters
- Vegetation
- Construction style

### 2. Reverse Image Search

Use multiple engines:
- Google Lens
- Yandex Images
- TinEye

### 3. Google Earth

Once the city/area is identified:
1. Use Street View
2. Compare angles
3. Verify architectural details

## Solution

After analysis we identify:
- **Location**: Plaza Mayor, Madrid
- **Coordinates**: 40.4153°N, 3.7074°W
- **Exact point**: Northeast corner of the square

## Flag

`CTF{40.4153_-3.7074_madrid_plaza_mayor}`
