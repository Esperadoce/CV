# 📋 Deployment Checklist

Use this checklist to ensure your CV website is ready for production deployment.

## ✅ Pre-Deployment Checklist

### 📝 Content Updates

- [ ] Update `index.html` with your personal information
  - [ ] Your full name in hero section
  - [ ] Your professional title/tagline
  - [ ] About me section text
  - [ ] Skills and percentages
  - [ ] Work experience entries
  - [ ] Project descriptions
  - [ ] Contact information (email, LinkedIn, GitHub)

- [ ] Add your profile photo
  - [ ] Add image to `assets/images/profile.jpg`
  - [ ] Update HTML to use `<img>` instead of emoji
  - [ ] Optimize image size (recommended: max 500KB)

- [ ] Add your CV PDF
  - [ ] Create or export your PDF CV
  - [ ] Add to `assets/cv/your-cv.pdf`
  - [ ] Update download button in `assets/js/utils.js`

- [ ] Add project images (optional)
  - [ ] Add screenshots to `assets/images/projects/`
  - [ ] Update project cards to use images

### 🎨 Customization

- [ ] Update colors (if desired)
  - [ ] Edit gradient colors in CSS files
  - [ ] Test color contrast for accessibility

- [ ] Update footer
  - [ ] Copyright year
  - [ ] Your name
  - [ ] Links to your profiles

- [ ] Test all links
  - [ ] Email link works
  - [ ] LinkedIn opens correctly
  - [ ] GitHub profile accessible
  - [ ] All internal navigation works

### 🧪 Testing

- [ ] Test locally with Docker
  ```bash
  docker-compose up -d
  # Visit http://localhost:28080
  ```

- [ ] Test on different browsers
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] Test responsive design
  - [ ] Mobile (375px width)
  - [ ] Tablet (768px width)
  - [ ] Desktop (1920px width)
  - [ ] Use browser DevTools device mode

- [ ] Test all features
  - [ ] 3D background loads
  - [ ] Scroll animations work
  - [ ] Navigation menu functional
  - [ ] Skills circles animate
  - [ ] Contact form accepts input
  - [ ] Download CV button works
  - [ ] Easter egg is findable
  - [ ] Custom cursor on desktop

- [ ] Check for errors
  - [ ] Open browser console (F12)
  - [ ] No JavaScript errors
  - [ ] No 404 errors for assets
  - [ ] All images load

### 🔒 Security & Performance

- [ ] Remove sensitive information
  - [ ] No API keys in code
  - [ ] No personal phone numbers (unless intended)
  - [ ] No private addresses

- [ ] Optimize assets
  - [ ] Compress images (use tinypng.com)
  - [ ] Images are web-optimized (JPEG/WebP)
  - [ ] No oversized files

- [ ] Verify .dockerignore
  - [ ] Excludes development files
  - [ ] Excludes .git directory
  - [ ] Excludes backup files

## 🚀 GitHub Setup

### Repository Configuration

- [ ] Create GitHub repository (if not exists)
  ```bash
  # Create at: https://github.com/new
  # Name: CV (or your preferred name)
  # Visibility: Public (required for free GitHub Pages)
  ```

- [ ] Push code to GitHub
  ```bash
  git init
  git add .
  git commit -m "Initial commit with Docker and CI/CD"
  git branch -M master
  git remote add origin https://github.com/yourusername/CV.git
  git push -u origin master
  ```

- [ ] Verify GitHub Actions workflow
  - [ ] Go to repository Actions tab
  - [ ] Check workflow ran successfully
  - [ ] Green checkmark visible

### GitHub Pages Setup

- [ ] Enable GitHub Pages
  - [ ] Go to repository Settings → Pages
  - [ ] Source: Select "GitHub Actions"
  - [ ] Save

- [ ] Wait for deployment (1-2 minutes)
  - [ ] Check Actions tab for progress
  - [ ] Look for green checkmark

- [ ] Verify site is live
  - [ ] Visit: `https://yourusername.github.io/CV/`
  - [ ] Site loads correctly
  - [ ] All features work

- [ ] (Optional) Setup custom domain
  - [ ] Add custom domain in Pages settings
  - [ ] Configure DNS records
  - [ ] Enable HTTPS (automatic after DNS propagation)

### Container Registry

- [ ] Verify image published
  - [ ] Go to: github.com/yourusername?tab=packages
  - [ ] See your cv package listed
  - [ ] Package is public

- [ ] Test pulling image
  ```bash
  docker pull ghcr.io/yourusername/cv:latest
  docker run -d -p 28080:8080 ghcr.io/yourusername/cv:latest
  ```

## 🌐 Optional: Deploy to Your Server

### Server Preparation

- [ ] Have a VPS/server ready
  - [ ] Ubuntu 22.04+ or similar
  - [ ] Minimum 1GB RAM
  - [ ] Public IP address

- [ ] Install Docker on server
  ```bash
  ssh user@your-server.com
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker $USER
  ```

- [ ] Configure firewall
  ```bash
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw allow 22/tcp
  sudo ufw enable
  ```

### GitHub Secrets Configuration

- [ ] Generate SSH key pair (if needed)
  ```bash
  ssh-keygen -t ed25519 -C "github-actions"
  ```

- [ ] Copy public key to server
  ```bash
  ssh-copy-id user@your-server.com
  ```

- [ ] Add secrets to GitHub
  - [ ] Go to: Settings → Secrets and variables → Actions
  - [ ] Add `SERVER_HOST` (your server IP/domain)
  - [ ] Add `SERVER_USER` (SSH username)
  - [ ] Add `SERVER_SSH_KEY` (private key content)
  - [ ] Add `SERVER_PORT` (default: 22)

### Enable Auto-Deployment

- [ ] Edit `.github/workflows/deploy.yml`
  - [ ] Find `deploy-to-server` job
  - [ ] Remove line: `if: false`
  - [ ] Commit and push

- [ ] Test deployment
  ```bash
  git commit -m "Enable server deployment" --allow-empty
  git push
  ```

- [ ] Verify on server
  ```bash
  ssh user@your-server.com
  docker ps | grep cv-website
  curl http://localhost
  ```

### Domain Setup (Optional)

- [ ] Point domain to server
  - [ ] Create A record: yourdomain.com → server IP
  - [ ] Wait for DNS propagation (5-30 minutes)

- [ ] Install and configure nginx reverse proxy
  ```bash
  sudo apt install nginx certbot python3-certbot-nginx
  sudo nano /etc/nginx/sites-available/cv
  ```

- [ ] Get SSL certificate
  ```bash
  sudo certbot --nginx -d yourdomain.com
  ```

- [ ] Test HTTPS
  - [ ] Visit: https://yourdomain.com
  - [ ] SSL certificate valid
  - [ ] Site loads correctly

## 📊 Post-Deployment

### Verification

- [ ] All deployment targets working
  - [ ] GitHub Pages live
  - [ ] Container registry has image
  - [ ] Server deployment successful (if configured)

- [ ] Test from different devices
  - [ ] Desktop computer
  - [ ] Mobile phone
  - [ ] Tablet

- [ ] Test from different networks
  - [ ] Home network
  - [ ] Mobile data
  - [ ] Different location/country

### Monitoring

- [ ] Setup monitoring (optional)
  - [ ] Google Analytics
  - [ ] Cloudflare Analytics (if using Cloudflare)
  - [ ] Server monitoring (if self-hosted)

- [ ] Check container health
  ```bash
  docker ps
  docker logs cv-website
  docker inspect cv-website | grep -A 10 Health
  ```

### Documentation

- [ ] Update README with your URL
  - [ ] Add live demo link
  - [ ] Add screenshots

- [ ] Share your CV
  - [ ] Add to LinkedIn profile
  - [ ] Add to GitHub profile README
  - [ ] Share on social media

## 🔄 Maintenance

### Regular Updates

- [ ] Setup update workflow
  - [ ] Make changes locally
  - [ ] Test with `docker-compose up -d`
  - [ ] Commit and push to auto-deploy

- [ ] Keep dependencies updated
  - [ ] Update base Docker image periodically
  - [ ] Update Three.js if needed
  - [ ] Check for security updates

### Backup

- [ ] Backup important files
  - [ ] Download CV PDF
  - [ ] Save custom images
  - [ ] Export custom code changes

## ✨ Optional Enhancements

- [ ] Add more features
  - [ ] Blog section
  - [ ] Portfolio filtering
  - [ ] Light/dark theme toggle
  - [ ] Multi-language support
  - [ ] Contact form backend

- [ ] SEO optimization
  - [ ] Add meta descriptions
  - [ ] Create sitemap.xml
  - [ ] Add structured data (JSON-LD)
  - [ ] Submit to search engines

- [ ] Analytics
  - [ ] Google Analytics
  - [ ] Facebook Pixel (if needed)
  - [ ] LinkedIn Insight Tag

- [ ] Performance
  - [ ] Enable CDN (Cloudflare)
  - [ ] Optimize images further
  - [ ] Add service worker for PWA

## 🎉 Launch Checklist

### Final Review

- [ ] Content is accurate and professional
- [ ] All links work correctly
- [ ] No spelling or grammar errors
- [ ] Contact information is correct
- [ ] Images load properly
- [ ] Site is responsive on all devices
- [ ] All features functional
- [ ] No console errors
- [ ] Performance is good (use PageSpeed Insights)
- [ ] Site is accessible (use WAVE tool)

### Go Live!

- [ ] Final push to GitHub
  ```bash
  git add .
  git commit -m "Ready for production"
  git push origin master
  ```

- [ ] Verify deployment successful
- [ ] Share your new CV website! 🎊

---

## 📞 Need Help?

Stuck on a step? Check these resources:

- 📖 **QUICKSTART.md** - Quick 5-minute setup
- 📖 **DEPLOYMENT.md** - Detailed deployment guide
- 📖 **DOCKER_SETUP.md** - Docker configuration details
- 🐛 **GitHub Issues** - Report problems
- 💬 **GitHub Discussions** - Ask questions
- 📧 **Email** - hicham@bouchikhi.net

---

**Ready to Deploy?** Start from the top and check off each item!

Good luck! 🚀
