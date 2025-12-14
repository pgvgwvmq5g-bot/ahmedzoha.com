# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website for Dr Ahmed Zoha built with Astro and Tailwind CSS. The site uses WordPress as a headless CMS for managing blog posts and news content, while other content (about, research, projects, impact) is statically generated from Astro components.

## Common Commands

### Development
```bash
npm run dev          # Start dev server on localhost:4321
npm run build        # Build static site to dist/
npm run preview      # Preview production build
```

### Alternative Port
```bash
npm run dev -- --port 3000   # Run dev server on different port
```

## Architecture

### Frontend Framework
- **Astro 5.x** - Static site generator with component islands
- **Tailwind CSS** - Utility-first styling with custom dark theme
- **No client-side framework** - Pure HTML/CSS with minimal vanilla JS for interactions

### Page Types
1. **Static pages** - Direct .astro files in `src/pages/` (index, about, contact, research, impact, projects, modai, news)
2. **Dynamic blog pages** - WordPress-powered content in `src/pages/blog/`
3. **Detail pages** - Individual project and impact pages in subdirectories

### Layout System
- `src/layouts/BaseLayout.astro` - Root layout providing sidebar and main content area
- All pages wrap content with BaseLayout component
- Sidebar is fixed on desktop (lg breakpoint), slides in on mobile

### WordPress Integration
- Headless WordPress located at configured `WORDPRESS_URL` in `src/lib/wordpress.js`
- API functions in `src/lib/wordpress.js`:
  - `getPosts(options)` - Fetch blog posts
  - `getPostBySlug(slug)` - Get single post
  - `getCategories()` - Fetch categories
  - `getPages(options)` - Fetch WordPress pages
  - `getCustomPosts(postType, options)` - Fetch custom post types
  - `getPostCount()` - Get total post count
- Posts are fetched at build time (SSG) - changes require rebuild
- All API functions return empty arrays on error (fail gracefully)

### Styling Architecture
- **Color system** - Dark theme with custom shades in `tailwind.config.mjs`
  - `dark-*` - Background and UI shades (900=darkest, 500=borders)
  - `accent-yellow` - Primary brand color (#d4e931)
  - `accent-blue` - Secondary accent
  - `text-*` - Text hierarchy (primary/secondary/muted)
- **Custom CSS** - `src/styles/global.css` contains:
  - Timeline component styles
  - Card animation keyframes
  - Particle effects
  - Hover transitions
  - Custom scrollbar styling
- **Component classes** - `.nav-link`, `.stats-gradient`, `.glow`, etc.

### Component Structure
- **Sidebar.astro** - Main navigation with profile, menu items, social links, mobile toggle
- **Footer.astro** - Page footer
- **BaseLayout.astro** - Wraps all pages with sidebar + main content area

### Navigation
- Navigation items defined in `Sidebar.astro` (lines 5-15)
- Active state detection via pathname matching
- Mobile menu uses transform classes and overlay

### Content Organization
- Static page content lives directly in page components
- Images should be in `public/images/` (accessible as `/images/...`)
- Profile photos: `public/images/profile.jpg` and `profile-large.jpg`
- Project images: `public/images/projects/`
- Blog images: `public/images/blog/`
- Team images: `public/images/team/`

### Dynamic Routes
- Blog posts: `/blog/[slug].astro` - Fetches from WordPress
- Project details: `/projects/[id].astro` - Static project pages
- Individual impact/project pages in subdirectories with descriptive names

## Configuration

### WordPress URL
Update in `src/lib/wordpress.js` line 3:
```javascript
const WORDPRESS_URL = 'https://ahmedzoha.com/wp';
```

### Site URL
Update in `astro.config.mjs` line 6:
```javascript
site: 'https://ahmedzoha.com',
```

### Theme Colors
Modify in `tailwind.config.mjs` (lines 6-23):
- Primary accent color: `accent.yellow`
- Dark theme shades: `dark.*` object
- Text colors: `text.*` object

### Fonts
- Current: Inter (loaded in `src/styles/global.css` line 1)
- To change: Update Google Fonts import and `tailwind.config.mjs` fontFamily

## Important Notes

### WordPress Integration
- WordPress API fetches happen at build time, not runtime
- API errors return empty arrays - check console for "WordPress API Error" messages
- Posts include formatted data (date, excerpt, featured image, categories, author, read time)
- `formatPost()` function (lines 114-171 in wordpress.js) transforms raw API data

### Mobile Responsiveness
- Sidebar is fixed at 256px width on desktop (lg breakpoint)
- Mobile uses slide-in overlay pattern
- Main content has left margin of 256px on lg+ screens (`lg:ml-64`)
- Timeline and other components have mobile-specific layouts

### Animation System
- Cards use `fadeInUp` animation with staggered delays
- Hover effects include transform + shadow changes
- Particle effects and grid animations in research/impact sections
- All animations defined in `src/styles/global.css`

### File Paths
- All public assets must be in `public/` directory
- Reference as `/images/file.jpg` (leading slash, no "public")
- File names are case-sensitive in production builds

### Deployment
- Build outputs to `dist/` directory
- Upload entire `dist/` contents to web host's `public_html`
- Ensure WordPress installation is accessible and CORS-enabled
