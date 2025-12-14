# QUICK START SECURITY FIX GUIDE

**Time to implement:** 30-45 minutes for critical fixes

## Step 1: Environment Variables (5 min)

### 1.1 Update `.env.example` is already created ✅

### 1.2 Create `.env` in project root

```bash
cd /Users/ahmedzoha/Documents/azweb
cat > .env << 'EOF'
WORDPRESS_URL=https://ahmedzoha.com/wp
PUBLIC_FORMSPREE_ID=f/YOUR_FORM_ID_HERE
PUBLIC_GA_ID=G-XXXXXXXXXX
EOF
```

### 1.3 Verify `.gitignore` has `.env`

```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

### 1.4 Test it works

```bash
npm run build
# Should complete without errors
```

---

## Step 2: Update WordPress Configuration (10 min)

### 2.1 Update `src/lib/wordpress.js`

Replace line 2:

```javascript
// BEFORE:
const WORDPRESS_URL = "https://ahmedzoha.com/wp";

// AFTER:
const WORDPRESS_URL =
  import.meta.env.WORDPRESS_URL || "https://ahmedzoha.com/wp";
```

Add this after the API_URL definition (around line 4):

```javascript
const API_TIMEOUT = 10000; // 10 seconds

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.error("API request timeout");
    }
    throw error;
  }
}
```

Replace all `fetch(url)` calls with `fetchWithTimeout(url)`:

```javascript
// In getPosts function, change:
const response = await fetch(url);
// To:
const response = await fetchWithTimeout(url);
```

---

## Step 3: Add Security Headers (5 min)

### 3.1 Create `vercel.json`

```bash
cat > /Users/ahmedzoha/Documents/azweb/vercel.json << 'EOF'
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
EOF
```

---

## Step 4: Fix Contact Form (15 min)

### 4.1 Update `.env`

```bash
# Add to your .env file:
PUBLIC_FORMSPREE_ID=f/your_actual_formspree_id
```

Get your Formspree ID from: https://formspree.io/

- Create an account if needed
- Create a new form for your contact page
- Copy the form ID (looks like: `f/abc123def456`)

### 4.2 Replace contact form in `src/pages/contact.astro`

(See SECURITY_FIXES.md for complete updated code - copy and paste the entire fixed section)

---

## Step 5: Fix Sidebar Image Error (5 min)

Update `src/components/Sidebar.astro` profile section:
(See SECURITY_FIXES.md for complete fixed code)

---

## Step 6: Testing (5 min)

```bash
# Test local build
npm run build

# If build succeeds, test preview
npm run preview

# Visit http://localhost:3000 and test:
# 1. Forms don't submit with invalid data
# 2. Images load correctly
# 3. Navigation works

# Check for console errors (F12 > Console tab)
```

---

## Step 7: Deploy (5 min)

```bash
# Commit changes
git add .
git commit -m "Security fixes: env vars, CSP headers, form validation"

# Push to GitHub (Vercel auto-deploys)
git push origin main
```

Or manually deploy if using Vercel:

1. Go to https://vercel.com
2. Select your project
3. Redeploy (vercel.json will be picked up automatically)

---

## Verification Checklist

After deployment, verify:

```bash
# Check security headers
curl -I https://ahmedzoha.com

# Should show:
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - Strict-Transport-Security: max-age=...
```

Or use online tool: https://securityheaders.com/?q=ahmedzoha.com

---

## Priority Order

If you can only do some fixes today:

### MUST DO TODAY (Critical)

1. ✅ Move WordPress URL to `.env`
2. ✅ Create `vercel.json` with headers

### DO THIS WEEK

3. Fix contact form validation
4. Update Sidebar image handler

### DO THIS MONTH

5. Add privacy policy page
6. Add terms of service page
7. Add robots.txt and sitemap
8. Add schema markup

---

## Files to Commit

After making changes, these files will be modified:

```
✅ .env (NEW - DON'T COMMIT)
✅ .env.example (NEW - DO COMMIT)
✅ vercel.json (NEW - DO COMMIT)
✅ src/lib/wordpress.js (MODIFIED - DO COMMIT)
✅ src/pages/contact.astro (MODIFIED - DO COMMIT)
✅ src/components/Sidebar.astro (MODIFIED - DO COMMIT)
✅ .gitignore (MODIFIED - DO COMMIT)
```

---

## Need Help?

If you encounter issues:

1. **Build fails with "WORDPRESS_URL not defined"**

   - Make sure `.env` file exists in root directory
   - Run: `npm run build` again

2. **Form doesn't submit**

   - Check browser console (F12) for errors
   - Verify `PUBLIC_FORMSPREE_ID` in `.env`
   - Test on Formspree website directly

3. **Images not loading**

   - Check that `/images/profile.jpg` exists in `public/` folder
   - Fallback (initials "AZ") should appear if image fails

4. **Headers not showing**
   - Local development (npm run dev) won't show vercel.json headers
   - Need to test on Vercel deployment
   - Use: https://securityheaders.com/?q=ahmedzoha.com

---

**Estimated Total Time:** 30-45 minutes  
**Difficulty:** Easy-Medium  
**Risk:** Low (all changes are backwards compatible)

Good luck! 🚀
