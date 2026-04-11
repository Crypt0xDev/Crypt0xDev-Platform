---
title: "CrackMe Básico - RevEng CTF 2024"
description: "Aplicar ingeniería inversa a un binario para encontrar la clave correcta."
ctfName: "RevEng CTF 2024"
category: "reversing"
difficulty: "easy"
points: 175
pubDate: 2024-10-15
heroImage: "/images/ctf/default-ctf.png"
tags: ["reverse-engineering", "crackme", "ghidra", "decompilation"]
language: es
solves: 987
author: "RevEng Team"
skillLevel: "beginner"
estimatedTime: "40-60 minutos"
tools: ["ghidra", "ida", "gdb", "radare2"]
---

# CrackMe Básico - RevEng CTF 2024

## Descripción

Se nos proporciona un binario ELF que solicita una contraseña. Debemos aplicar ingeniería inversa para encontrar la clave correcta.

## Análisis Estático

Abrimos el binario en Ghidra:

```c
undefined8 main(void) {
    char input[32];
    
    puts("Enter password: ");
    fgets(input, 32, stdin);
    
    if (check_password(input) == 1) {
        puts("Correct!");
        print_flag();
    } else {
        puts("Wrong!");
    }
    return 0;
}
```

## Función check_password

Decompilando `check_password`:

```c
int check_password(char *input) {
    char correct[] = "S3cr3t_P4ssw0rd";
    return strcmp(input, correct) == 0;
}
```

## Solución

La contraseña es: `S3cr3t_P4ssw0rd`

Ejecutamos:
```bash
./crackme
Enter password: 
S3cr3t_P4ssw0rd
Correct!
CTF{r3v3rs3_3ng1n33r1ng_m4st3r}
```

## Flag

`CTF{r3v3rs3_3ng1n33r1ng_m4st3r}`
