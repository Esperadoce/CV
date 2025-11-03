# 🚀 Modern CV - Interactive Portfolio Website Template

A stunning, modern CV/portfolio website featuring breathtaking 3D animations, smooth scroll effects, glass-morphism design, and fully responsive layout. Perfect for developers, designers, and IT professionals looking to showcase their skills and experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Esperadoce-181717?logo=github)](https://github.com/Esperadoce)

## ✨ Features

- **🌌 3D Background**: Interactive Three.js animated background with particles and geometric shapes with parallax effects
- **🎨 Glass-Morphism Design**: Modern frosted-glass effect with semi-transparent sections showing 3D background
- **🎭 Dark Theme**: Elegant dark color scheme optimized for visual impact
- **✨ Smooth Animations**: Scroll-triggered reveal animations and smooth transitions throughout
- **🖱️ Custom Cursor**: Animated custom cursor for desktop users (with trailing effect)
- **📊 Animated Skill Circles**: Beautiful circular progress indicators with gradient effects and stroke animations
- **📱 Fully Responsive**: Perfectly optimized for mobile (single column), tablet (2 columns), and desktop devices
- **🎯 Interactive Projects**: Modal-based project showcase with detailed information on click
- **📧 Contact Form**: Functional contact form (ready for backend integration)
- **🎉 Easter Egg**: Hidden surprise for curious visitors in top-left corner
- **⚡ Loading Screen**: Smooth loading animation with progress bar and percentage indicator
- **🚀 Performance Optimized**: Fast loading and smooth 60fps animations with hardware acceleration
- **📥 Downloadable CV**: Quick download button for PDF resume
- **🐳 Docker Ready**: Containerized with nginx, automated deployment via GitHub Actions
- **🔄 CI/CD Pipeline**: Automatic build and deploy to GitHub Pages and Container Registry

## 📁 Project Structure

```
CV/
├── assets/
│   ├── css/
│   │   ├── main.css          # Core styles, base layout, sections, footer
│   │   ├── components.css    # All component styles (nav, hero, skills, timeline, projects, contact)
│   │   ├── animations.css    # Keyframe animations and scroll reveal effects
│   │   └── responsive.css    # Media queries for mobile, tablet, desktop
│   ├── js/
│   │   ├── main.js          # Application entry point and module loader
│   │   ├── 3d-background.js # Three.js 3D scene with particles and geometric shapes
│   │   ├── animations.js    # Scroll animations, navbar, skill circles
│   │   ├── cursor.js        # Custom cursor with trail effect (desktop only)
│   │   ├── loading.js       # Loading screen with progress bar
│   │   └── utils.js         # Utility functions (modal, form, download CV, easter egg)
│   ├── images/
│   │   ├── projects/        # Project screenshots (add your images here)
│   │   └── icons/           # Custom icons (optional)
│   ├── lib/
│   │   └── three.min.js     # Three.js r128 library (local copy, no CDN)
│   ├── cv/
│   │   └── your-cv.pdf      # Downloadable PDF CV (add your resume here)
│   └── fonts/               # Custom fonts (optional)
├── index.html               # Main HTML file
├── Dockerfile               # Docker configuration for nginx
├── docker-compose.yml       # Docker Compose for easy deployment
├── nginx.conf               # Custom nginx configuration
├── .dockerignore           # Docker build exclusions
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI/CD pipeline
├── README.md                # This file
├── DEPLOYMENT.md           # Detailed deployment guide
├── .gitignore              # Git ignore file
└── LICENSE                 # License file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- [Docker](https://docs.docker.com/get-docker/) (recommended for deployment)
- OR a local web server for development

### Quick Start with Docker 🐳

The fastest way to run your CV website:

```bash
# Clone the repository
git clone https://github.com/Esperadoce/CV.git
cd CV

# Run with Docker Compose (recommended)
docker-compose up -d

# OR build and run manually
docker build -t cv-website .
docker run -d -p 28080:8080 cv-website
```

Visit: `http://localhost:28080`

### Installation (Traditional)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Esperadoce/CV.git
   cd CV
   ```

2. **Add your content**
   - Edit `index.html` to add your personal information
   - Replace profile emoji with your photo in `assets/images/`
   - Add your CV PDF to `assets/cv/`
   - Add project screenshots to `assets/images/projects/`

3. **Run locally**
   
   **Option 1: Using Docker (Recommended)**
   ```bash
   docker-compose up -d
   ```
   Then open `http://localhost:28080`

   **Option 2: Using Python**
   ```bash
   python -m http.server 28080
   ```

   **Option 3: Using Node.js**
   ```bash
   npx http-server -p 28080
   ```

   **Option 4: Using VS Code**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

4. **Deploy Automatically** 🚀
   
   Simply push to GitHub and it auto-deploys:
   ```bash
   git add .
   git commit -m "Update CV"
   git push
   ```
   
   **Automatic deployment includes:**
   - ✅ GitHub Pages (free hosting at `username.github.io/CV`)
   - ✅ Docker image published to GitHub Container Registry
   - ✅ Optional: Deploy to your own server via SSH
   
   **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment options**

## 🎨 Customization

### Personal Information

Update your details in `index.html`:
```html
<!-- Hero Section -->
<h1>Your Name</h1>
<p class="tagline">Your Title | Your Role | Your Specialty</p>

<!-- About Section -->
<p>Write your bio and professional summary here</p>

<!-- Contact Section -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
```

### Change Colors

Edit the gradient colors in CSS files to match your brand:
```css
/* Primary gradient colors used throughout */
#667eea  /* Primary purple-blue */
#764ba2  /* Secondary purple */

/* Section backgrounds */
.section-light: rgba(245, 245, 247, 0.85)  /* Light sections */
.section-dark: rgba(0, 0, 0, 0.7)          /* Dark sections */
```

### Modify Skills

Edit skills and percentages in `index.html`:
```html
<div class="skill-card">
    <circle class="skill-circle-progress" data-percent="90"></circle>
    <div class="skill-percent">90%</div>
    <div class="skill-name">Your Skill Name</div>
</div>
```

**Note**: Mobile devices automatically adjust circle sizes and use optimized layouts (2 columns on tablet, 1 column on mobile).

### Update Experience

Edit the timeline in `index.html`:
```html
<div class="timeline-item">
    <div class="timeline-content">
        <div class="timeline-title">Job Title</div>
        <div class="timeline-company">Company Name</div>
        <div class="timeline-date">Start - End Date</div>
        <ul>
            <li>Achievement or responsibility</li>
        </ul>
    </div>
</div>
```

### Update Projects

Edit project cards in `index.html`:
```html
<div class="project-card" onclick="showModal('Project Title', 'Detailed description')">
    <div class="project-image">🎯</div> <!-- Use emoji or replace with <img> -->
    <div class="project-content">
        <div class="project-title">Project Name</div>
        <div class="project-tech">Tech Stack</div>
        <p class="project-description">Brief description</p>
    </div>
</div>
```

### Add Profile Photo

Replace the emoji with an actual image in `index.html`:
```html
<!-- Change from -->
<div class="profile-image">👨‍💻</div>

<!-- To -->
<div class="profile-image">
    <img src="assets/images/profile.jpg" alt="Your Name">
</div>
```

Then add CSS in `assets/css/components.css`:
```css
.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}
```

### Connect Contact Form

In `assets/js/utils.js`, replace the alert with your backend:
```javascript
export function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Replace this with your API endpoint
    fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => alert('Message sent successfully!'))
    .catch(error => alert('Error sending message'));
}
```

### Adjust 3D Background

Modify particle count and shapes in `assets/js/3d-background.js`:
```javascript
// Particle count (default: 1000)
const particleCount = 1000;

// Number of geometric shapes (default: 20)
const shapeCount = 20;

// Shape opacity (default: 0.75)
material.opacity = 0.75;
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox
- **JavaScript ES6+** - Modular and clean code
- **Three.js** - 3D graphics and animations
- **LocalStorage API** - Theme preference persistence
- **Docker** - Containerization with nginx
- **GitHub Actions** - CI/CD pipeline for automated deployment

## 🌐 Deployment Options

This CV supports multiple deployment methods:

| Method | Cost | Setup Time | Best For |
|--------|------|------------|----------|
| **GitHub Pages** | FREE | 2 min | Quick start, public repos |
| **Docker + VPS** | $5/mo | 10 min | Full control, custom domain |
| **Netlify** | FREE | 5 min | Easy drag-and-drop |
| **Vercel** | FREE | 5 min | Modern hosting |

**Quick Deploy Commands:**

```bash
# Deploy to GitHub Pages (automatic on push)
git push origin master

# Deploy to your server with Docker
docker pull ghcr.io/esperadoce/cv:latest
docker run -d -p 28080:8080 ghcr.io/esperadoce/cv:latest

# Deploy with Docker Compose
docker-compose up -d
```

📖 **See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### � Usage Terms

You are **free to use** this template for your personal or commercial projects! However, please include the following attribution:

**In your website footer or README:**
```
Template design by Esperadoce (https://github.com/Esperadoce/CV)
```

**Or simply:**
- Keep the footer credit if you use it as-is
- Add a link back to this repository in your README
- Star ⭐ this repository if you find it useful!

## 👤 Author

**Hicham Bouchikhi (Esperadoce)**
- GitHub: [@Esperadoce](https://github.com/Esperadoce)
- Repository: [CV Template](https://github.com/Esperadoce/CV)
- LinkedIn: [Hicham Bouchikhi](https://fr.linkedin.com/in/hicham-bouchikhi)

## 🌟 Show Your Support

If you found this template helpful:
- ⭐ Star this repository
- 🍴 Fork it for your own use
- 🐛 Report bugs or suggest features via [Issues](https://github.com/Esperadoce/CV/issues)
- 📢 Share it with others who might need it!

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for the amazing 3D graphics library
- Apple's design philosophy for UI/UX inspiration
- The open-source community for continuous support

## 📝 Important Notes

- ✅ **Three.js is included locally** in `assets/lib/three.min.js` - no CDN dependencies
- 📝 **Replace placeholder content** with your actual name, bio, experience, and projects
- 👤 **Add your photo** to `assets/images/` and update the profile-image section
- 📄 **Add your CV PDF** to `assets/cv/your-cv.pdf` for the download button to work
- 🖼️ **Optimize images** before adding them (compress and resize for web)
- 🔒 **Configure contact form** backend in `assets/js/utils.js`
- 🧪 **Test on mobile devices** - responsive design is optimized but should be verified
- 🎨 **Glass-morphism requires** backdrop-filter support (works on modern browsers)
- 🚀 **Use a web server** - ES6 modules require HTTP/HTTPS (not file://)
- 📱 **Mobile circles fixed** - skill circles now display properly on all screen sizes

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💖 Support

If this template helped you create an awesome portfolio:
- Give it a ⭐ on GitHub
- Share it with your friends and colleagues
- Mention [@Esperadoce](https://github.com/Esperadoce) in your project

---

**Made with ❤️ and lots of ☕**

*Template created and maintained by [Hicham Bouchikhi (Esperadoce)](https://github.com/Esperadoce)*
