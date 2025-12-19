# Choremaster Kubernetes Deployment Guide

## Quick Start

### 1. Build and Push Docker Images

First, ensure your backend includes the production profile by rebuilding the Docker image:

```bash
# Build and push backend
cd choremaster-backend
docker build -t failender/choremaster-backend:latest .
docker push failender/choremaster-backend:latest

# Build and push frontend
cd ../choremaster-app
docker build -t failender/choremaster-app:latest .
docker push failender/choremaster-app:latest
```

### 2. Install with Helm

```bash
# From the project root
helm install choremaster ./choremaster-k8s

# Or with custom values
helm install choremaster ./choremaster-k8s --set postgresql.database.password=SECURE_PASSWORD
```

### 3. Verify Installation

```bash
# Check all pods are running
kubectl get pods -l app=choremaster

# Expected output:
# NAME                                     READY   STATUS    RESTARTS   AGE
# choremaster-postgresql-xxxxxxxxx-xxxxx   1/1     Running   0          2m
# choremaster-backend-xxxxxxxxx-xxxxx      1/1     Running   0          2m
# choremaster-app-xxxxxxxxx-xxxxx          1/1     Running   0          2m
```

### 4. Access the Application

```bash
# Get the LoadBalancer IP (or external IP)
kubectl get service choremaster-app

# Access the app at http://<EXTERNAL-IP>
```

## Configuration Details

### Backend Spring Profile

The backend is configured to run with the `prod` profile through the environment variable:
```yaml
SPRING_PROFILES_ACTIVE=prod
```

The production configuration is located at:
- In the source: `choremaster-backend/src/main/resources/application-prod.yaml`
- In Kubernetes: ConfigMap `choremaster-backend-config`

### Database Connection

The backend connects to PostgreSQL using:
- **Host**: `choremaster-postgresql` (Kubernetes service name)
- **Port**: `5432`
- **Database**: `choremaster`
- **Credentials**: Stored in Kubernetes Secret `choremaster-postgresql-secret`

Connection string: `jdbc:postgresql://choremaster-postgresql:5432/choremaster`

## Customization

### Override Database Password

Create a custom values file:

```yaml
# custom-values.yaml
postgresql:
  database:
    password: "your-secure-password-here"
```

Install with custom values:
```bash
helm install choremaster ./choremaster-k8s -f custom-values.yaml
```

### Use Specific Image Tags

Instead of `latest`, use specific version tags:

```yaml
# custom-values.yaml
backend:
  image:
    tag: "v1.0.0"

app:
  image:
    tag: "v1.0.0"
```

### Configure Resources

Adjust resource limits based on your cluster:

```yaml
# custom-values.yaml
backend:
  resources:
    requests:
      memory: "1Gi"
      cpu: "1000m"
    limits:
      memory: "2Gi"
      cpu: "2000m"
```

### Use NodePort Instead of LoadBalancer

If your cluster doesn't support LoadBalancer:

```yaml
# custom-values.yaml
app:
  service:
    type: NodePort
```

Then access via:
```bash
kubectl get service choremaster-app -o jsonpath='{.spec.ports[0].nodePort}'
# Access at http://<NODE-IP>:<NODE-PORT>
```

## Troubleshooting

### Backend Not Starting

Check logs:
```bash
kubectl logs -l app=choremaster,component=backend --tail=100
```

Common issues:
1. **Database not ready**: The init container waits for PostgreSQL. Check if PostgreSQL is running.
2. **Connection refused**: Verify the PostgreSQL service is accessible.
3. **Authentication failed**: Check the credentials in the secret.

### Database Connection Issues

Verify PostgreSQL is running:
```bash
kubectl get pods -l component=postgresql
kubectl logs -l component=postgresql
```

Test database connection from backend pod:
```bash
kubectl exec -it <backend-pod-name> -- sh
nc -zv choremaster-postgresql 5432
```

### Check ConfigMap

View the production configuration:
```bash
kubectl get configmap choremaster-backend-config -o yaml
```

### View All Resources

```bash
kubectl get all -l app=choremaster
```

## Upgrading

```bash
# Upgrade to new image versions
helm upgrade choremaster ./choremaster-k8s --set backend.image.tag=v1.1.0

# Or with custom values file
helm upgrade choremaster ./choremaster-k8s -f custom-values.yaml
```

## Uninstalling

```bash
# Remove all resources
helm uninstall choremaster

# Manually delete PVC if needed (data will be lost!)
kubectl delete pvc choremaster-postgresql-pvc
```

## Production Checklist

Before deploying to production:

- [ ] Change PostgreSQL password from default
- [ ] Use specific image tags (not `latest`)
- [ ] Configure appropriate resource limits
- [ ] Set up Ingress with TLS instead of LoadBalancer
- [ ] Update Google OAuth client ID if needed
- [ ] Configure persistent volume storage class
- [ ] Set up monitoring and alerting
- [ ] Configure database backups
- [ ] Review security policies
- [ ] Test disaster recovery procedures
