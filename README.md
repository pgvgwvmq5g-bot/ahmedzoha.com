# Dr Ahmed Zoha - Portfolio Website

A modern, minimalist portfolio website built with Astro, Tailwind CSS, and WordPress as a headless CMS.

## 🌟 Features

- **Beautiful Dark Theme** - Matches your reference design
- **WordPress Integration** - Manage blog/news from WordPress admin
- **Fully Responsive** - Works on all devices
- **Fast Static Site** - Built with Astro for speed
- **SEO Optimized** - Clean HTML, meta tags, etc.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- Git ([Download](https://git-scm.com))
- Cursor IDE ([Download](https://cursor.com))
- Hostinger account with domain

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure WordPress URL
Edit `src/lib/wordpress.js` line 3:
```javascript
const WORDPRESS_URL = 'https://ahmedzoha.com/wp';
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open http://localhost:4321

---

## 📖 Documentation

| Guide | Description |
|-------|-------------|
| [WORDPRESS_SETUP.md](./WORDPRESS_SETUP.md) | Complete WordPress installation guide |
| This README | Project overview and deployment |

---

## 📝 CUSTOMIZATION GUIDE

### Essential Files to Edit:

#### 1. Update Your Profile Info
**File:** `src/components/Sidebar.astro`
- Line 45-50: Your name and title
- Line 73-83: Navigation items
- Line 85-90: Social media links

#### 2. Update Homepage
**File:** `src/pages/index.astro`
- Line 7-11: Career statistics (Citations, Publications, Grants)
- Line 14-26: Highlight cards
- Lines 35-42: Hero section text

#### 3. Update About Page
**File:** `src/pages/about.astro`
- Line 7-26: Career timeline
- Line 29-38: Expertise/skills
- Lines 55-70: Biography text

#### 4. Update Research Page
**File:** `src/pages/research.astro`
- Lines 7-26: Research areas
- Lines 29-58: Publications list

#### 5. Update Projects Page
**File:** `src/pages/projects.astro`
- Lines 7-52: Project entries

#### 6. Update Contact Page
**File:** `src/pages/contact.astro`
- Lines 7-20: Contact information
- Lines 23-30: Social media links
- Line 70: Form action (Formspree URL)

---

## 🖼️ Adding Images

### Profile Photos
1. Add your photo to: `public/images/profile.jpg`
2. Add a larger version to: `public/images/profile-large.jpg`

### Project Images
1. Create folder: `public/images/projects/`
2. Add images like: `healthcare.jpg`, `traffic.jpg`, etc.

### Blog Images
1. Create folder: `public/images/blog/`
2. Add images for your blog posts

### Team Images (for MODAI page)
1. Create folder: `public/images/team/`
2. Add team member photos

---

## 🔧 Setting Up Contact Form

### Option 1: Formspree (Recommended - Free)
1. Go to [formspree.io](https://formspree.io)
2. Sign up free
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xxxxx`)
5. Replace `YOUR_FORM_ID` in `src/pages/contact.astro` line 70

### Option 2: Use Hostinger's Built-in Forms
Contact Hostinger support for setting up server-side form handling.

---

## 🌐 GitHub Setup

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Future Updates
```bash
git add .
git commit -m "Your update message"
git push
```

---

## 🚢 DEPLOYING TO HOSTINGER

### Method 1: Manual Upload (Easiest)

#### Step 1: Build the Project
```bash
npm run build
```
This creates a `dist/` folder.

#### Step 2: Upload to Hostinger
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Files** → **File Manager**
3. Navigate to `public_html`
4. Delete any existing files
5. Upload ALL contents of the `dist/` folder
6. Your structure should be:
   ```
   public_html/
   ├── index.html
   ├── about/
   ├── research/
   ├── ... (other folders)
   ├── _astro/
   └── images/
   ```

### Method 2: Git Deployment (Automatic)

#### Step 1: In Hostinger hPanel
1. Go to **Advanced** → **Git**
2. Click **Create Repository** or **Manage**
3. Connect your GitHub repository

#### Step 2: Configure Build Settings
- Repository: `https://github.com/YOUR_USERNAME/portfolio.git`
- Branch: `main`
- Auto deployment: Enable

#### Step 3: Set Build Commands (if available)
```
Build command: npm run build
Publish directory: dist
```

---

## 🔒 SSL Certificate Setup

1. In Hostinger hPanel → **Security** → **SSL**
2. Click **Install** for your domain
3. Enable **Force HTTPS**

---

## 🎨 STYLING CUSTOMIZATION

### Change Accent Color
Edit `tailwind.config.mjs`:
```javascript
accent: {
  yellow: '#d4e931',  // Change this color
}
```

### Common Color Options:
- Blue: `#3b82f6`
- Purple: `#8b5cf6`
- Green: `#10b981`
- Orange: `#f59e0b`
- Pink: `#ec4899`

### Change Fonts
Edit `src/styles/global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap');
```

Then update `tailwind.config.mjs`:
```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── projects/
│   │   └── blog/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── research.astro
│   │   ├── impact.astro
│   │   ├── projects.astro
│   │   ├── modai.astro
│   │   ├── news.astro
│   │   ├── blog.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## 🆘 Troubleshooting

### "Command not found: npm"
Install Node.js from [nodejs.org](https://nodejs.org)

### "Port 4321 already in use"
```bash
npm run dev -- --port 3000
```

### Images not loading
- Check file paths start with `/images/`
- Ensure images are in `public/images/` folder
- File names are case-sensitive

### Build errors
```bash
rm -rf node_modules
npm install
npm run build
```

---

## 📞 Need Help?

- Astro Docs: [docs.astro.build](https://docs.astro.build)
- Tailwind Docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- Hostinger Support: [hostinger.com/support](https://hostinger.com/support)

---

## ✅ Final Checklist Before Going Live

- [ ] Updated all personal information
- [ ] Added profile photos
- [ ] Added project images
- [ ] Set up contact form (Formspree)
- [ ] Updated social media links
- [ ] Tested on mobile devices
- [ ] Installed SSL certificate
- [ ] Verified all pages load correctly
- [ ] Connected domain to hosting

Good luck with your portfolio! 🎉
