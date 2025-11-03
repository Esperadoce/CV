# 🚀 Deployment Guide - CV Website with Docker

This guide explains how to build, run, and automatically deploy your CV website using Docker and GitHub Actions.

## 📋 Table of Contents

- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [Automated Deployment](#automated-deployment)
- [Deployment Options](#deployment-options)
- [Troubleshooting](#troubleshooting)

---

## 🏠 Local Development

### Quick Start (Without Docker)

```bash
# Using Python
python -m http.server 28080

# Using Node.js
npx http-server -p 28080

# Using PHP
php -S localhost:28080
```

Then visit: `http://localhost:28080`

---

## 🐳 Docker Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) installed (optional)

### Build Docker Image

```bash
# Build the image
docker build -t cv-website:latest .

# Build with custom tag
docker build -t cv-website:v1.0.0 .
```

### Run Container

**Option 1: Using Docker directly**

```bash
# Run on port 28080
docker run -d -p 28080:8080 --name cv-website cv-website:latest

# Run on port 80 (requires admin/root)
docker run -d -p 80:8080 --name cv-website cv-website:latest

# Visit http://localhost:28080 (or http://localhost)
```

**Option 2: Using Docker Compose (Recommended)**

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Docker Commands Reference

```bash
# View running containers
docker ps

# View logs
docker logs cv-website
docker logs -f cv-website  # Follow logs

# Stop container
docker stop cv-website

# Remove container
docker rm cv-website

# Remove image
docker rmi cv-website:latest

# Clean up all unused images/containers
docker system prune -a
```

---

## ⚙️ Automated Deployment

The repository includes GitHub Actions workflow that automatically:
- ✅ Builds Docker image on every push
- ✅ Publishes to GitHub Container Registry (ghcr.io)
- ✅ Deploys to GitHub Pages
- ✅ Can deploy to your server (optional)

### 1️⃣ Enable GitHub Container Registry

The workflow automatically publishes to GitHub Container Registry. No additional setup needed!

After pushing to master/main branch:
- Images are available at: `ghcr.io/esperadoce/cv:latest`
- View packages: https://github.com/Esperadoce?tab=packages

### 2️⃣ Enable GitHub Pages (Free Hosting)

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save and wait for deployment (1-2 minutes)
5. Your site will be live at: `https://esperadoce.github.io/CV/`

### 3️⃣ Deploy to Your Own Server (Optional)

To enable automatic deployment to your server:

#### Step 1: Setup Server

```bash
# On your server, install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER
```

#### Step 2: Configure GitHub Secrets

Go to repository **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SERVER_HOST` | Your server IP or domain | `example.com` or `192.168.1.100` |
| `SERVER_USER` | SSH username | `ubuntu` or `root` |
| `SERVER_SSH_KEY` | Private SSH key | Contents of `~/.ssh/id_rsa` |
| `SERVER_PORT` | SSH port (optional) | `22` (default) |

**Generate SSH Key (if needed):**

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions"

# Copy public key to server
ssh-copy-id user@your-server.com

# Copy private key to GitHub secret
cat ~/.ssh/id_ed25519
```

#### Step 3: Enable Server Deployment

Edit `.github/workflows/deploy.yml`:

```yaml
deploy-to-server:
  needs: build-and-push
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/master' || github.ref == 'refs/heads/main'
  # Remove this line: if: false  👈 DELETE THIS LINE
```

Now every push to master will automatically deploy to your server!

---

## 🌐 Deployment Options

### Option 1: GitHub Pages (FREE) ✅ Recommended

**Pros:**
- ✅ Free hosting
- ✅ HTTPS by default
- ✅ Automatic deployment
- ✅ Custom domain support

**Cons:**
- ❌ Static sites only
- ❌ Public repositories only (for free plan)

**Setup:** See [Enable GitHub Pages](#2️⃣-enable-github-pages-free-hosting)

**URL:** `https://yourusername.github.io/CV/`

---

### Option 2: Your Own Server (VPS)

**Best for:** Full control, custom domain, private hosting

**Providers:**
- [DigitalOcean](https://www.digitalocean.com/) - $4-6/month
- [Linode](https://www.linode.com/) - $5/month
- [Vultr](https://www.vultr.com/) - $2.50-6/month
- [Hetzner](https://www.hetzner.com/) - €4/month

**Setup Steps:**

1. **Create a VPS** (Ubuntu 22.04 recommended)

2. **Install Docker:**
```bash
ssh user@your-server.com
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

3. **Pull and run:**
```bash
# Pull from GitHub Container Registry
docker pull ghcr.io/esperadoce/cv:latest

# Run on port 28080
docker run -d \
  --name cv-website \
  --restart unless-stopped \
  -p 28080:8080 \
  ghcr.io/esperadoce/cv:latest
```

4. **Setup domain (optional):**
```bash
# Install nginx as reverse proxy
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/cv

# Add:
server {
    listen 80;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/cv /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

---

### Option 3: Netlify (Easy Deploy)

**Pros:**
- ✅ Free tier available
- ✅ Drag-and-drop deployment
- ✅ Automatic HTTPS
- ✅ Custom domain

**Setup:**

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your CV repository
5. Build settings: (leave empty - it's static)
6. Click "Deploy site"

Done! URL: `https://random-name-12345.netlify.app`

---

### Option 4: Vercel (Next.js Optimized)

Similar to Netlify, optimized for modern frameworks.

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Import your CV repository
4. Deploy (automatic)

---

### Option 5: Docker Hub + Any Server

**If you prefer Docker Hub over GitHub Container Registry:**

1. **Login to Docker Hub:**
```bash
docker login
```

2. **Tag and push:**
```bash
docker tag cv-website:latest yourusername/cv-website:latest
docker push yourusername/cv-website:latest
```

3. **Pull on any server:**
```bash
docker pull yourusername/cv-website:latest
docker run -d -p 28080:8080 yourusername/cv-website:latest
```

---

## 🔧 Advanced Configuration

### Environment Variables

Currently, the CV is static HTML. To add environment variables:

1. **Create `.env` file:**
```env
ANALYTICS_ID=UA-XXXXXXXXX-X
API_ENDPOINT=https://api.example.com
```

2. **Update nginx.conf to pass env vars**

3. **Load in JavaScript:**
```javascript
// In main.js
const analyticsId = window.ANALYTICS_ID || 'default';
```

### Custom Domain with GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Add custom domain: `cv.yourdomain.com`
3. Add DNS record:
   ```
   Type: CNAME
   Name: cv
   Value: yourusername.github.io
   ```
4. Wait for DNS propagation (5-30 minutes)
5. Enable HTTPS in GitHub Pages settings

### SSL Certificate for Self-Hosted

```bash
# Using Let's Encrypt (free)
sudo certbot --nginx -d yourdomain.com

# Auto-renewal (already configured by certbot)
sudo certbot renew --dry-run
```

### Monitoring and Logs

**View container logs:**
```bash
docker logs -f cv-website
docker logs --tail 100 cv-website
```

**Health check:**
```bash
docker inspect cv-website | grep -A 10 "Health"
```

**Access nginx logs inside container:**
```bash
docker exec cv-website cat /var/log/nginx/access.log
docker exec cv-website cat /var/log/nginx/error.log
```

---

## 🐛 Troubleshooting

### Issue: Port 80 already in use

```bash
# Find what's using port 80
sudo lsof -i :80

# Kill the process or use different port
docker run -d -p 28080:8080 cv-website:latest
```

### Issue: Permission denied (Docker)

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again, or:
newgrp docker
```

### Issue: Container exits immediately

```bash
# Check logs
docker logs cv-website

# Run interactively to debug
docker run -it --rm cv-website:latest sh
```

### Issue: GitHub Actions failing

1. Check workflow runs: **Actions** tab on GitHub
2. Ensure `GITHUB_TOKEN` has packages:write permission
3. Check if repository is public (required for free GitHub Packages)

### Issue: Website not loading on server

```bash
# Check if container is running
docker ps

# Check if port is accessible
curl http://localhost:28080

# Check firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Issue: Changes not showing after deployment

```bash
# Clear browser cache (Ctrl+F5)

# Force rebuild without cache
docker build --no-cache -t cv-website:latest .

# Or with Docker Compose
docker-compose build --no-cache
docker-compose up -d --force-recreate
```

---

## 📊 Performance Tips

### Image Optimization

```bash
# Check image size
docker images cv-website

# Multi-stage build already optimizes size
# Current image: ~25MB (nginx:alpine base)
```

### Enable HTTP/2 (nginx)

Add to `nginx.conf`:
```nginx
listen 8080 http2;
```

### CDN Integration

For even faster loading, use a CDN:
- [Cloudflare](https://www.cloudflare.com/) (free)
- [Fastly](https://www.fastly.com/)
- Setup in your domain DNS settings

---

## 🔐 Security Best Practices

✅ Container runs as non-root user
✅ Security headers enabled in nginx
✅ Health checks configured
✅ Minimal Alpine Linux base
✅ No unnecessary packages
✅ .dockerignore prevents sensitive files

**Additional security for production:**

```bash
# Scan image for vulnerabilities
docker scan cv-website:latest

# Update base image regularly
docker pull nginx:alpine
docker build --no-cache -t cv-website:latest .
```

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Esperadoce/CV/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Esperadoce/CV/discussions)
- **Email**: hicham@bouchikhi.net

---

## 🎉 Quick Reference Card

```bash
# LOCAL DEVELOPMENT
docker-compose up -d              # Start
docker-compose logs -f            # View logs
docker-compose down               # Stop

# MANUAL DEPLOYMENT
docker build -t cv-website .      # Build
docker run -d -p 28080:8080 cv-website  # Run
docker ps                         # Check status

# PRODUCTION SERVER
docker pull ghcr.io/esperadoce/cv:latest  # Pull latest
docker stop cv-website && docker rm cv-website  # Remove old
docker run -d --name cv-website --restart unless-stopped \
  -p 28080:8080 ghcr.io/esperadoce/cv:latest  # Deploy new

# GITHUB ACTIONS
git add . && git commit -m "Update" && git push  # Auto-deploy!
```

---

**Made with ❤️ by [Hicham Bouchikhi](https://github.com/Esperadoce)**

*For more info, see [README.md](README.md)*
