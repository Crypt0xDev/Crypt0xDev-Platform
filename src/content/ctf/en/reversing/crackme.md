---
title: "Basic CrackMe - RevEng CTF 2024"
description: "Reverse engineer a binary to find the correct password."
ctfName: "RevEng CTF 2024"
category: "reversing"
difficulty: "easy"
points: 175
pubDate: 2024-10-15
heroImage: "/images/ctf/default-ctf.png"
tags: ["reverse-engineering", "crackme", "ghidra", "decompilation"]
language: en
solves: 987
author: "RevEng Team"
skillLevel: "beginner"
estimatedTime: "40-60 minutes"
tools: ["ghidra", "ida", "gdb", "radare2"]
---

# Basic CrackMe - RevEng CTF 2024

## Description

We are provided with an ELF binary that asks for a password. We must reverse engineer it to find the correct key.

## Static Analysis

Open the binary in Ghidra:

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

## check_password Function

Decompiling `check_password`:

```c
int check_password(char *input) {
    char correct[] = "S3cr3t_P4ssw0rd";
    return strcmp(input, correct) == 0;
}
```

## Solution

The password is: `S3cr3t_P4ssw0rd`

Execute:
```bash
./crackme
Enter password: 
S3cr3t_P4ssw0rd
Correct!
CTF{r3v3rs3_3ng1n33r1ng_m4st3r}
```

## Flag

`CTF{r3v3rs3_3ng1n33r1ng_m4st3r}`
