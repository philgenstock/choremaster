# Choremaster Helm Chart

This Helm chart deploys the Choremaster application stack on Kubernetes, including:
- PostgreSQL database
- Choremaster Backend (Spring Boot application)
- Choremaster App (Frontend)

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- kubectl configured to communicate with your cluster

## Installation

### Install the chart

```bash
helm install choremaster ./choremaster-k8s
```

### Install with custom values

```bash
helm install choremaster ./choremaster-k8s -f custom-values.yaml
```

### Upgrade an existing installation

```bash
helm upgrade choremaster ./choremaster-k8s
```

### Uninstall

```bash
helm uninstall choremaster
```

## Configuration

The following table lists the configurable parameters of the Choremaster chart and their default values.

### PostgreSQL Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `postgresql.enabled` | Enable PostgreSQL | `true` |
| `postgresql.image.repository` | PostgreSQL image repository | `postgres` |
| `postgresql.image.tag` | PostgreSQL image tag | `15-alpine` |
| `postgresql.service.port` | PostgreSQL service port | `5432` |
| `postgresql.database.name` | Database name | `choremaster` |
| `postgresql.database.user` | Database user | `postgres` |
| `postgresql.database.password` | Database password | `postgres` |
| `postgresql.persistence.enabled` | Enable persistence | `true` |
| `postgresql.persistence.size` | PVC size | `5Gi` |

### Backend Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `backend.enabled` | Enable backend | `true` |
| `backend.replicaCount` | Number of replicas | `1` |
| `backend.image.repository` | Backend image repository | `failender/choremaster-backend` |
| `backend.image.tag` | Backend image tag | `latest` |
| `backend.service.type` | Service type | `ClusterIP` |
| `backend.service.port` | Service port | `8080` |

### Frontend App Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `app.enabled` | Enable frontend app | `true` |
| `app.replicaCount` | Number of replicas | `1` |
| `app.image.repository` | App image repository | `failender/choremaster-app` |
| `app.image.tag` | App image tag | `latest` |
| `app.service.type` | Service type | `LoadBalancer` |
| `app.service.port` | Service port | `80` |

### Google OAuth Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `google.oauth.clientId` | Google OAuth Client ID | `226274128441-0e2re0vo3p5mnf4e2nhok8m2fipncjh5.apps.googleusercontent.com` |

## Architecture

The chart creates the following Kubernetes resources:

1. **PostgreSQL**:
   - Deployment with persistent storage
   - ClusterIP Service
   - Secret for credentials
   - PersistentVolumeClaim (optional)

2. **Backend**:
   - Deployment with Spring Boot application
   - ClusterIP Service
   - ConfigMap with application-prod.yaml
   - Init container to wait for PostgreSQL

3. **Frontend App**:
   - Deployment with web application
   - LoadBalancer Service (can be changed to NodePort or ClusterIP)

## Environment Variables

The backend is configured with the following environment variables:
- `SPRING_PROFILES_ACTIVE=prod` - Activates the production profile
- `SPRING_DATASOURCE_URL` - PostgreSQL connection URL
- `SPRING_DATASOURCE_USERNAME` - Database username (from secret)
- `SPRING_DATASOURCE_PASSWORD` - Database password (from secret)

## Accessing the Application

After installation, get the application URL:

```bash
# For LoadBalancer service type (default for app)
kubectl get service choremaster-app -o jsonpath='{.status.loadBalancer.ingress[0].ip}'

# For NodePort service type
kubectl get service choremaster-app -o jsonpath='{.spec.ports[0].nodePort}'
```

## Production Considerations

For production deployments, consider:

1. **Change default passwords**: Override `postgresql.database.password` with a secure password
2. **Configure OAuth**: Update `google.oauth.clientId` with your client ID
3. **Use specific image tags**: Replace `latest` tags with specific versions
4. **Configure resource limits**: Adjust CPU and memory limits based on your needs
5. **Set up Ingress**: Replace LoadBalancer with Ingress for better traffic management
6. **Enable TLS**: Configure TLS certificates for secure communication
7. **Configure storage class**: Specify appropriate storage class for your environment
8. **Set up monitoring**: Add Prometheus annotations for monitoring
9. **Configure backups**: Set up regular database backups

## Troubleshooting

Check pod status:
```bash
kubectl get pods -l app=choremaster
```

View logs:
```bash
kubectl logs -l app=choremaster,component=backend
kubectl logs -l app=choremaster,component=app
kubectl logs -l app=choremaster,component=postgresql
```

Describe resources:
```bash
kubectl describe deployment choremaster-backend
kubectl describe service choremaster-backend
```
