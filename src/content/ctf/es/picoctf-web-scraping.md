---
title: "Web Scraping Challenge - PicoCTF 2023"
description: "Reto de web scraping que requiere automatizar la extracción de datos de múltiples páginas web."
ctfName: "PicoCTF 2023"
category: "web"
difficulty: "easy"
points: 100
pubDate: 2024-11-02
heroImage: "/images/ctf/default-ctf.png"
tags: ["web", "python", "scraping", "automation"]
lang: es
solves: 1523
author: "PicoCTF Team"
skillLevel: "beginner"
estimatedTime: "30-45 minutos"
tools: ["python", "requests", "beautifulsoup"]
---

# Web Scraping Challenge - PicoCTF 2023

## Descripción del Reto

Este reto de PicoCTF 2023 requiere extraer información de múltiples páginas web mediante web scraping automatizado.

## Análisis Inicial

Al acceder al sitio, vemos que hay 100 páginas numeradas, cada una con una pequeña porción de la flag.

```bash
curl http://challenge.picoctf.org:12345/page/1
```

## Solución

### Script de Python

```python
import requests
from bs4 import BeautifulSoup

base_url = "http://challenge.picoctf.org:12345/page/"
flag_parts = []

for i in range(1, 101):
    response = requests.get(base_url + str(i))
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Buscar el fragmento de la flag
    flag_part = soup.find('span', class_='flag-part').text
    flag_parts.append(flag_part)

# Unir todos los fragmentos
flag = ''.join(flag_parts)
print(f"Flag: {flag}")
```

### Alternativa con cURL y grep

```bash
for i in {1..100}; do
    curl -s "http://challenge.picoctf.org:12345/page/$i" | grep -oP 'flag-part">\K[^<]+'
done | tr -d '\n'
```

## Flag

```
picoCTF{web_scr4p1ng_1s_fun_12345678}
```

## Lecciones Aprendidas

- Web scraping básico con Python
- Uso de bibliotecas como requests y BeautifulSoup
- Automatización de tareas repetitivas
- Manejo de datos en bucles

## Herramientas Utilizadas

- Python 3
- requests
- BeautifulSoup4
- cURL
