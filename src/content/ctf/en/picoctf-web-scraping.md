---
title: "Web Scraping Challenge - PicoCTF 2023"
description: "Web scraping challenge requiring automated data extraction from multiple web pages."
ctfName: "PicoCTF 2023"
category: "web"
difficulty: "easy"
points: 100
pubDate: 2024-11-02
heroImage: "/images/ctf/default-ctf.png"
tags: ["web", "python", "scraping", "automation"]
lang: en
solves: 1523
author: "PicoCTF Team"
skillLevel: "beginner"
estimatedTime: "30-45 minutes"
tools: ["python", "requests", "beautifulsoup"]
---

# Web Scraping Challenge - PicoCTF 2023

## Challenge Description

This PicoCTF 2023 challenge requires extracting information from multiple web pages through automated web scraping.

## Initial Analysis

When accessing the site, we see there are 100 numbered pages, each with a small portion of the flag.

```bash
curl http://challenge.picoctf.org:12345/page/1
```

## Solution

### Python Script

```python
import requests
from bs4 import BeautifulSoup

base_url = "http://challenge.picoctf.org:12345/page/"
flag_parts = []

for i in range(1, 101):
    response = requests.get(base_url + str(i))
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the flag fragment
    flag_part = soup.find('span', class_='flag-part').text
    flag_parts.append(flag_part)

# Join all fragments
flag = ''.join(flag_parts)
print(f"Flag: {flag}")
```

### Alternative with cURL and grep

```bash
for i in {1..100}; do
    curl -s "http://challenge.picoctf.org:12345/page/$i" | grep -oP 'flag-part">\K[^<]+'
done | tr -d '\n'
```

## Flag

```
picoCTF{web_scr4p1ng_1s_fun_12345678}
```

## Lessons Learned

- Basic web scraping with Python
- Using libraries like requests and BeautifulSoup
- Automating repetitive tasks
- Handling data in loops

## Tools Used

- Python 3
- requests
- BeautifulSoup4
- cURL
