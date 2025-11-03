# 🚀 Quick Start Guide

Get your CV website up and running in minutes!

## ⚡ Fastest Way - Docker Compose

```bash
# 1. Clone the repository
git clone https://github.com/Esperadoce/CV.git
cd CV

# 2. Start the website
docker-compose up -d

# 3. Open your browser
# Visit: http://localhost:28080
```

That's it! Your CV is live locally. 🎉

---

## 🐳 Docker Options

### Option 1: Docker Compose (Recommended)

```bash
docker-compose up -d          # Start
docker-compose logs -f        # View logs
docker-compose down           # Stop
```

### Option 2: Docker CLI

```bash
docker build -t cv-website .
docker run -d -p 28080:8080 --name cv-website cv-website:latest
```

### Option 3: Use Helper Scripts

**Windows (PowerShell):**
```powershell
.\deploy.ps1 run
```

**Linux/Mac (Bash):**
```bash
chmod +x deploy.sh
./deploy.sh run
```

---

## 🌐 Deploy to the Internet (FREE)

### GitHub Pages (Easiest - 2 minutes)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Wait 1-2 minutes**
   - Your site will be live at: `https://yourusername.github.io/CV/`

✅ **Bonus:** Every time you push, it auto-deploys!

---

## 📝 Customize Your CV

Edit `index.html` and update:

```html
<!-- Your name -->
<h1>Your Name Here</h1>

<!-- Your title -->
<p class="tagline">Your Title | Your Role</p>

<!-- Your bio -->
<p>Write about yourself...</p>

<!-- Your skills -->
<div class="skill-name">Your Skill</div>

<!-- Your experience -->
<div class="timeline-title">Job Title</div>
<div class="timeline-company">Company Name</div>

<!-- Your contact info -->
<a href="mailto:your@email.com">your@email.com</a>
```

---

## 🔄 Update & Redeploy

```bash
# 1. Make your changes
# Edit files in your favorite editor

# 2. Test locally
docker-compose up -d

# 3. Deploy
git add .
git commit -m "Update CV"
git push

# GitHub Actions automatically deploys! ✨
```

---

## 🆘 Troubleshooting

### Port 8080 already in use?

```bash
# Using the configured port 28080
docker-compose up -d
# Then visit: http://localhost:28080

# Or use a different port
docker run -d -p 3000:8080 cv-website:latest
# Then visit: http://localhost:3000
```

### Docker not installed?

**Windows/Mac:**
- Download: https://www.docker.com/products/docker-desktop

**Linux:**
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### Want to use a custom domain?

See [DEPLOYMENT.md](DEPLOYMENT.md) - Custom Domain section

---

## 📚 Next Steps

- ✅ Customize your content in `index.html`
- ✅ Add your photo to `assets/images/`
- ✅ Add your PDF CV to `assets/cv/`
- ✅ Update colors in CSS files
- ✅ Deploy to GitHub Pages
- ✅ Share your new CV website! 🎉

---

## 🎯 Common Workflows

### Local Development Loop

```bash
# Edit files → Save → Auto-refresh in browser
docker-compose up -d
# Make changes, browser auto-refreshes
```

### Production Deployment

```bash
# Push to master/main → GitHub Actions deploys automatically
git push origin master
```

### Deploy to Your Server

```bash
# One-time setup
ssh your-server.com
docker pull ghcr.io/yourusername/cv:latest
docker run -d -p 28080:8080 --restart unless-stopped ghcr.io/yourusername/cv:latest

# Subsequent updates (automated)
# Just push to GitHub, or manually pull:
ssh your-server.com "docker pull ghcr.io/yourusername/cv:latest && docker restart cv-website"
```

---

## 💡 Tips

- 🔒 Make repository public for free GitHub Pages
- 📸 Compress images before adding (use tinypng.com)
- 🎨 Change colors in `assets/css/main.css`
- 📱 Test on mobile - it's fully responsive!
- ⭐ Star the repo if you find it useful!

---

## 🆘 Need Help?

- 📖 Full docs: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 Issues: [GitHub Issues](https://github.com/Esperadoce/CV/issues)
- 💬 Questions: [GitHub Discussions](https://github.com/Esperadoce/CV/discussions)
- 📧 Email: hicham@bouchikhi.net

---

**Made with ❤️ by [Hicham Bouchikhi](https://github.com/Esperadoce)**

Now go build something awesome! 🚀
