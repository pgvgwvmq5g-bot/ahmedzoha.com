# Hostinger Deployment Guide

## 📋 Overview

This guide covers deploying your Astro portfolio website to Hostinger using manual FTP/SFTP uploads.

**Deployment Model:** Build locally → Upload `dist/` folder to Hostinger

---

## 🚀 Quick Deployment Steps

### 1. Build Your Site Locally

```bash
# Navigate to your project
cd /Users/ahmedzoha/Documents/azweb

# Install dependencies (if needed)
npm install

# Build production version
npm run build
```

This creates a `dist/` folder with your static website.

---

### 2. Connect to Hostinger

**Option A: Using FileZilla (Recommended)**

1. Download FileZilla: https://filezilla-project.org/
2. Open FileZilla
3. Enter your Hostinger credentials:
   - **Host:** Your domain or FTP hostname (e.g., `ftp.ahmedzoha.com`)
   - **Username:** Your Hostinger FTP username
   - **Password:** Your Hostinger FTP password
   - **Port:** 21 (FTP) or 22 (SFTP - recommended)
4. Click "Quickconnect"

**Option B: Using Hostinger File Manager**

1. Log into Hostinger control panel (hPanel)
2. Go to **Files → File Manager**
3. Navigate to `public_html/` directory

---

### 3. Upload Your Site

**Important:** Upload the **contents** of the `dist/` folder, NOT the folder itself.

#### Using FileZilla:

1. **Local site** (left panel): Navigate to `/Users/ahmedzoha/Documents/azweb/dist/`
2. **Remote site** (right panel): Navigate to `public_html/`
3. **Select all files** in the `dist/` folder (not the folder itself)
4. **Right-click** → **Upload**
5. Wait for upload to complete

#### Using File Manager:

1. Navigate to `public_html/`
2. Click **Upload** button
3. Select all files from your `dist/` folder
4. Upload them

**Correct structure after upload:**
```
public_html/
├── index.html
├── about/
│   └── index.html
├── blog/
│   └── index.html
├── images/
├── _astro/
└── ... (other files)
```

**❌ Wrong structure (don't do this):**
```
public_html/
└── dist/
    └── index.html  ← Wrong!
```

---

### 4. Verify Deployment

1. Visit your domain: `https://ahmedzoha.com`
2. Check all pages work:
   - Homepage: `https://ahmedzoha.com/`
   - About: `https://ahmedzoha.com/about`
   - Blog: `https://ahmedzoha.com/blog`
   - Contact: `https://ahmedzoha.com/contact`
3. Test contact form submission
4. Test search functionality (Cmd/Ctrl + K)

---

## 🔧 Environment Variables for Hostinger

Your `.env` file is **NOT uploaded** to Hostinger (it's in `.gitignore`).

Since you're using build-time environment variables (all starting with `PUBLIC_`), they get **baked into the build**.

**Current environment variables:**
```env
# WordPress (not used anymore - can be removed)
WORDPRESS_URL=https://ahmedzoha.com/wp

# Web3Forms (for contact form)
PUBLIC_WEB3FORMS_ACCESS_KEY=b47871b7-4ac1-43d7-a861-61fb97b7408b

# Google Analytics
PUBLIC_GA_ID=G-EEGCFL9XPM
```

**For Hostinger deployment:**
- ✅ These values are compiled into your JavaScript during `npm run build`
- ✅ No server-side environment variables needed
- ✅ `.env` file stays on your local machine only

---

## 📝 Complete Deployment Workflow

### Every Time You Update Your Site:

```bash
# 1. Make your changes to the code
# (edit files in src/, add blog posts, etc.)

# 2. Test locally
npm run dev
# Visit http://localhost:4321 to preview

# 3. Build production version
npm run build

# 4. Test production build locally (optional but recommended)
npm run preview
# Visit http://localhost:4323 to test

# 5. Upload to Hostinger
# - Open FileZilla
# - Connect to your Hostinger FTP
# - Select all files in dist/ folder
# - Upload to public_html/
# - Overwrite existing files when prompted

# 6. Verify live site
# Visit https://ahmedzoha.com
```

---

## 🎯 Common Tasks

### Adding a New Blog Post

1. Edit `src/pages/blog/index.astro`
2. Add your post to the `blogPosts` array:
   ```javascript
   const blogPosts = [
     {
       slug: 'your-new-post',
       title: 'Your Post Title',
       excerpt: 'Brief description...',
       content: `<p>Your HTML content...</p>`,
       date: 'December 13, 2025',
       dateRaw: '2025-12-13',
       category: 'AI & Infrastructure',
       readTime: '8 min read',
       featuredImage: '/images/blog/your-image.jpg',
     },
     // ... existing posts
   ];
   ```
3. Run `npm run build`
4. Upload `dist/` to Hostinger

### Updating Images

1. Add images to `public/images/`
2. Run `npm run build`
3. Upload entire `dist/` folder to Hostinger

### Changing Site Content

1. Edit files in `src/pages/` or `src/components/`
2. Run `npm run build`
3. Upload `dist/` to Hostinger

---

## 🔒 Security Headers

Your `vercel.json` file contains security headers. Since you're using Hostinger (not Vercel), you need to configure these in Hostinger instead.

### Option 1: Using .htaccess (Recommended)

Create/edit `public/.htaccess`:

```apache
# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Force HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>
```

Then:
1. Run `npm run build`
2. The `.htaccess` file will be in `dist/.htaccess`
3. Upload it to `public_html/.htaccess` on Hostinger

---

## 📊 Testing Checklist

After each deployment, verify:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Blog pages display properly
- [ ] Contact form submits successfully
- [ ] Search functionality works (Cmd/Ctrl + K)
- [ ] Images load correctly
- [ ] Google Analytics is tracking (check Real-Time report)
- [ ] Mobile responsive layout works
- [ ] HTTPS is working (green padlock)
- [ ] Security headers are present (check https://securityheaders.com)

---

## 🐛 Troubleshooting

### Issue: Images not showing

**Cause:** Wrong path or missing files
**Fix:**
1. Check images are in `public/images/`
2. Verify paths in code start with `/images/` (leading slash)
3. Ensure case matches exactly (Linux is case-sensitive)

### Issue: Pages return 404

**Cause:** Missing files or wrong directory structure
**Fix:**
1. Ensure you uploaded **contents** of `dist/`, not the `dist/` folder itself
2. Check `astro.config.mjs` has correct `site` URL
3. Clear browser cache

### Issue: CSS/JS not loading

**Cause:** Missing `_astro/` folder
**Fix:**
1. Upload entire `dist/` folder contents including `_astro/`
2. Don't skip hidden files

### Issue: Contact form not working

**Cause:** Environment variable not in build
**Fix:**
1. Check `.env` file has `PUBLIC_WEB3FORMS_ACCESS_KEY`
2. Rebuild: `npm run build`
3. Re-upload `dist/` folder

### Issue: Search not working

**Cause:** JavaScript not loaded or blocked
**Fix:**
1. Check browser console for errors (F12)
2. Verify `_astro/` folder was uploaded
3. Clear browser cache

---

## 🚀 Optimization Tips

### 1. Optimize Images Before Upload

```bash
# Use an image optimizer to reduce file sizes
# Recommended tools:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
# - ImageOptim (Mac)
```

### 2. Test Build Locally First

```bash
npm run preview
# Always test the production build before uploading
```

### 3. Incremental Updates

If you only changed a blog post, you can upload just the changed files:
- `blog/index.html`
- `blog/your-post-slug/index.html`
- Any new images

This is faster than uploading everything.

### 4. Backup Before Major Updates

```bash
# In FileZilla, download current public_html/ folder
# Keep as backup before uploading new version
```

---

## 📁 File Structure Reference

**Local (after build):**
```
azweb/
├── dist/                    ← Upload contents of this folder
│   ├── index.html
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── images/
│   ├── _astro/
│   └── .htaccess
├── src/                     ← Source files (don't upload)
├── public/                  ← Static assets (gets copied to dist/)
├── node_modules/            ← Don't upload
├── .env                     ← Don't upload (has secrets)
└── package.json
```

**Hostinger (public_html/):**
```
public_html/
├── index.html               ← From dist/index.html
├── about/
├── blog/
├── contact/
├── images/
├── _astro/
└── .htaccess
```

---

## 🔄 Automating Deployments (Optional)

If you want to automate uploads instead of manual FTP:

### Option 1: Using lftp (Command Line)

```bash
# Install lftp (Mac)
brew install lftp

# Create deployment script
./deploy.sh
```

Create `deploy.sh`:
```bash
#!/bin/bash

# Build the site
npm run build

# Upload to Hostinger
lftp -e "
set ftp:ssl-allow no;
open ftp://username:password@ftp.ahmedzoha.com;
mirror -R dist/ public_html/;
bye
"

echo "✅ Deployment complete!"
```

### Option 2: Using rsync + SSH

```bash
# Build
npm run build

# Upload via rsync (faster, only uploads changes)
rsync -avz --delete dist/ username@ahmedzoha.com:public_html/
```

---

## 📞 Support Resources

**Hostinger Documentation:**
- File Manager: https://support.hostinger.com/en/articles/1583245-how-to-use-file-manager
- FTP Access: https://support.hostinger.com/en/articles/1583187-how-to-upload-files-via-ftp

**FileZilla Documentation:**
- https://wiki.filezilla-project.org/FileZilla_Client_Tutorial_(en)

---

## ✅ Quick Reference Commands

```bash
# Full deployment workflow
npm run build && echo "Build complete! Now upload dist/ folder to Hostinger"

# Test before deploying
npm run preview

# Check for errors
npm run build 2>&1 | grep -i error

# Clean build (if having issues)
rm -rf dist .astro node_modules
npm install
npm run build
```

---

**Last Updated:** December 13, 2025
**Next Steps:** Run `npm run build` and upload to Hostinger!
