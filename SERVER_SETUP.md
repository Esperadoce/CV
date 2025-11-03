# 🚀 Server Setup Guide

This guide will help you set up your server for automatic CV deployment.

## 📋 Prerequisites

- Ubuntu 22.04+ (or similar Linux distribution)
- Root or sudo access
- Domain name (optional)

## 🔧 Server Setup Steps

### 1. Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and back in for group changes to take effect
```

### 2. Create Application Directory

```bash
# Create directory for the CV application
sudo mkdir -p /opt/cv
sudo chown $USER:$USER /opt/cv
cd /opt/cv
```

### 3. Upload docker-compose.yml

Copy the `docker-compose.server.yml` file to your server:

```bash
# From your local machine
scp docker-compose.server.yml user@your-server:/opt/cv/docker-compose.yml
```

Or create it manually on the server:

```bash
cat > /opt/cv/docker-compose.yml << 'EOF'
version: '3.8'

services:
  cv-website:
    image: esperadoce/cv:${TAG:-latest}
    container_name: cv-website
    restart: unless-stopped
    ports:
      - "28080:8080"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
    networks:
      - cv-network

networks:
  cv-network:
    driver: bridge
EOF
```

### 4. Configure Firewall

```bash
# Allow necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 28080/tcp # CV Website (if direct access needed)
sudo ufw enable
```

### 5. Setup Nginx Reverse Proxy (Optional but Recommended)

```bash
# Install nginx
sudo apt install nginx certbot python3-certbot-nginx -y

# Create nginx configuration
sudo nano /etc/nginx/sites-available/cv
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name cv.yourdomain.com;  # Change to your domain

    location / {
        proxy_pass http://localhost:28080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/cv /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 6. Get SSL Certificate (Optional but Recommended)

```bash
# Get Let's Encrypt SSL certificate
sudo certbot --nginx -d cv.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 7. Test Manual Deployment

```bash
cd /opt/cv

# Pull and start the container
docker pull esperadoce/cv:latest
docker compose up -d

# Check status
docker ps
docker logs cv-website

# Test access
curl http://localhost:28080
```

If you set up nginx, test via your domain:
```bash
curl http://cv.yourdomain.com
```

## 🔐 GitHub Secrets Setup

Add these secrets to your GitHub repository:

Go to: `https://github.com/Esperadoce/CV/settings/secrets/actions`

### Required Secrets:

1. **DOCKERHUB_USERNAME**
   - Value: `esperadoce`

2. **DOCKERHUB_TOKEN**
   - Create at: https://hub.docker.com/settings/security
   - Click "New Access Token"
   - Name: "GitHub Actions CV"
   - Copy the token and add as secret

3. **SSH_HOST**
   - Value: Your server IP or domain
   - Example: `123.45.67.89` or `server.yourdomain.com`

4. **SSH_USER**
   - Value: Your SSH username
   - Example: `ubuntu` or your username

5. **SSH_KEY**
   - Your private SSH key
   - Generate new key pair:
   
   ```bash
   # On your local machine
   ssh-keygen -t ed25519 -C "github-actions-cv" -f ~/.ssh/github_actions_cv
   
   # Copy public key to server
   ssh-copy-id -i ~/.ssh/github_actions_cv.pub user@your-server
   
   # Display private key to copy to GitHub
   cat ~/.ssh/github_actions_cv
   ```
   
   - Copy the entire output (including `-----BEGIN` and `-----END` lines)

6. **SSH_PORT**
   - Value: SSH port (usually `22`)
   - If using default port 22, you can omit this

7. **SSH_KNOWN_HOSTS**
   - Get the server's SSH fingerprint:
   
   ```bash
   ssh-keyscan -H your-server-ip-or-domain
   ```
   
   - Copy the output and add as secret

## ✅ Verify Setup

### Test SSH Connection from GitHub

You can test the setup by manually running the workflow:

1. Go to: `https://github.com/Esperadoce/CV/actions`
2. Click "CI/CD" workflow
3. Click "Run workflow"
4. Watch the deployment process

### Check Deployment

After the workflow runs:

```bash
# SSH to your server
ssh user@your-server

# Check container status
cd /opt/cv
docker ps
docker logs cv-website

# Test website
curl http://localhost:28080
```

## 🔄 How Auto-Deployment Works

1. You push code to `master` branch
2. GitHub Actions triggers automatically
3. Builds Docker image and pushes to Docker Hub
4. Connects to your server via SSH
5. Pulls the new image
6. Restarts the container with `docker compose up -d`
7. Your CV is updated! 🎉

## 🐛 Troubleshooting

### Container not starting

```bash
# Check logs
docker logs cv-website

# Check if port is available
sudo netstat -tlnp | grep 28080

# Restart container
docker compose restart
```

### Permission denied errors

```bash
# Ensure user is in docker group
sudo usermod -aG docker $USER

# Reboot or re-login
```

### GitHub Actions failing

1. Check workflow logs in GitHub Actions tab
2. Verify all secrets are set correctly
3. Test SSH connection manually:
   ```bash
   ssh -i ~/.ssh/github_actions_cv user@your-server
   ```

### Nginx errors

```bash
# Check nginx status
sudo systemctl status nginx

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

## 📊 Monitoring

### View logs in real-time

```bash
docker logs -f cv-website
```

### Check resource usage

```bash
docker stats cv-website
```

### Health check

```bash
docker inspect cv-website | grep -A 10 Health
```

## 🔄 Manual Updates

If you need to update manually:

```bash
cd /opt/cv
docker compose pull
docker compose up -d
docker image prune -f
```

## 📝 Server Directory Structure

```
/opt/cv/
├── docker-compose.yml    # Docker Compose configuration
└── (Docker volumes)      # Created automatically
```

## 🎉 Done!

Your server is now set up for automatic deployment!

Every time you push to master:
- GitHub Actions builds the image
- Pushes to Docker Hub
- Deploys to your server
- Your CV updates automatically

**Next steps:**
1. Add all GitHub secrets
2. Push code to master
3. Watch the magic happen! ✨

---

**Need help?** Check the main [DEPLOYMENT.md](DEPLOYMENT.md) guide.
