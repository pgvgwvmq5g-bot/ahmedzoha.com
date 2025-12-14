# CRITICAL SECURITY FIXES

This document provides step-by-step fixes for all critical security issues found in the audit.

## 1. Move WordPress URL to Environment Variables

### Current Code (VULNERABLE)

```javascript
// src/lib/wordpress.js - CURRENT
const WORDPRESS_URL = "https://ahmedzoha.com/wp";
const API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;
```

### Fixed Code

```javascript
// src/lib/wordpress.js - FIXED
const WORDPRESS_URL =
  import.meta.env.WORDPRESS_URL || "https://ahmedzoha.com/wp";
const API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

// Add timeout protection
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

// Update fetch calls to use fetchWithTimeout instead of fetch
export async function getPosts(options = {}) {
  // ... existing code ...
  const response = await fetchWithTimeout(url);
  // ... rest of function ...
}
```

### Steps to Implement

1. Update `src/lib/wordpress.js` with code above
2. Create `.env` file with:
   ```
   WORDPRESS_URL=https://ahmedzoha.com/wp
   ```
3. Test: `npm run build`

---

## 2. Add Content Security Policy (CSP) Headers

### Create/Update `astro.config.mjs`

Replace or update your existing config:

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  site: "https://ahmedzoha.com",

  // Add Vite server configuration for local CSP headers
  vite: {
    ssr: {
      external: ["@astrojs/tailwind"],
    },
    server: {
      middlewareMode: true,
      // Local development headers
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: 3000,
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[hash][extname]",
          chunkFileNames: "chunks/[name].[hash].js",
          entryFileNames: "[name].[hash].js",
        },
      },
    },
  },
});
```

### For Vercel Deployment

Create `vercel.json` in project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://*.ahmedzoha.com https://www.google-analytics.com; frame-ancestors 'none'"
        },
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
```

### Steps to Implement

1. Create `vercel.json` in project root
2. Commit to repository
3. Redeploy to Vercel

---

## 3. Fix Contact Form Security

### Current Code (VULNERABLE)

```astro
<!-- src/pages/contact.astro -->
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
  class="space-y-5"
>
  <input type="email" name="email" required />
  <!-- No validation, no protection -->
</form>
```

### Fixed Code

```astro
---
// src/pages/contact.astro - Updated frontmatter
import BaseLayout from '../layouts/BaseLayout.astro';

// Use environment variable for form ID
const FORMSPREE_ID = import.meta.env.PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID';
const contactInfo = [];
const socialLinks = [
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=b0oVLKwAAAAJ&hl=en', icon: 'scholar' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmedzoha', icon: 'linkedin' },
  { name: 'X (Twitter)', url: 'https://x.com/AhmedZoha', icon: 'twitter' },
];
---

<BaseLayout title="Contact" description="Get in touch with Dr Ahmed Zoha">
  <section class="pt-8 lg:pt-16">
    <div class="mb-12">
      <h1 class="text-4xl lg:text-5xl font-light mb-4">
        Get in <span class="text-accent-yellow">Touch</span>
      </h1>
      <p class="text-text-secondary max-w-2xl">
        I'm always interested in hearing about new research collaborations,
        speaking opportunities, or just having a conversation about AI.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
      <div>
        <h2 class="text-xl font-medium mb-6">Send a Message</h2>
        <form
          id="contact-form"
          action={`https://formspree.io/f/${FORMSPREE_ID}`}
          method="POST"
          class="space-y-5"
          novalidate
        >
          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label for="name-input" class="block text-sm text-text-secondary mb-2">
                Name <span class="text-accent-yellow">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                minlength="2"
                maxlength="100"
                class="w-full px-4 py-3 bg-dark-700 rounded-lg border border-dark-500
                       focus:border-accent-yellow focus:outline-none transition-colors"
                placeholder="Your name"
                aria-describedby="name-error"
              />
              <p id="name-error" class="text-xs text-red-400 mt-1" role="alert"></p>
            </div>
            <div>
              <label for="email-input" class="block text-sm text-text-secondary mb-2">
                Email <span class="text-accent-yellow">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                class="w-full px-4 py-3 bg-dark-700 rounded-lg border border-dark-500
                       focus:border-accent-yellow focus:outline-none transition-colors"
                placeholder="your@email.com"
                aria-describedby="email-error"
              />
              <p id="email-error" class="text-xs text-red-400 mt-1" role="alert"></p>
            </div>
          </div>

          <div>
            <label for="subject-input" class="block text-sm text-text-secondary mb-2">
              Subject <span class="text-accent-yellow">*</span>
            </label>
            <select
              id="subject-input"
              name="subject"
              required
              class="w-full px-4 py-3 bg-dark-700 rounded-lg border border-dark-500
                     focus:border-accent-yellow focus:outline-none transition-colors"
            >
              <option value="">Select a topic</option>
              <option value="research">Research Collaboration</option>
              <option value="speaking">Speaking Opportunity</option>
              <option value="consulting">Consulting</option>
              <option value="media">Media Inquiry</option>
              <option value="student">PhD/Postdoc Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label for="message-input" class="block text-sm text-text-secondary mb-2">
              Message <span class="text-accent-yellow">*</span>
            </label>
            <textarea
              id="message-input"
              name="message"
              required
              minlength="10"
              maxlength="5000"
              rows="5"
              class="w-full px-4 py-3 bg-dark-700 rounded-lg border border-dark-500
                     focus:border-accent-yellow focus:outline-none transition-colors resize-none"
              placeholder="Your message..."
              aria-describedby="message-error"
            ></textarea>
            <p id="message-error" class="text-xs text-red-400 mt-1" role="alert"></p>
          </div>

          <!-- Honeypot field for spam prevention -->
          <input type="text" name="_gotcha" style="display:none" aria-hidden="true" />

          <button
            type="submit"
            class="w-full md:w-auto px-8 py-3 bg-accent-yellow text-dark-900 font-medium
                   rounded-lg hover:bg-accent-yellow/90 transition-colors flex items-center
                   justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span id="submit-text">Send Message</span>
            <span id="submit-spinner" class="hidden">Sending...</span>
          </button>
        </form>

        <!-- Error/Success messages -->
        <div id="form-success" class="hidden mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400">
          Thank you! Your message has been sent.
        </div>
        <div id="form-error" class="hidden mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400">
          <p id="form-error-text"></p>
        </div>
      </div>

      <!-- Social links section -->
      <div>
        <h2 class="text-xl font-medium mb-6">Connect</h2>
        <div class="space-y-4">
          {socialLinks.map(link => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-4 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
            >
              <span>{link.name}</span>
              <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<script>
  const form = document.getElementById('contact-form');
  const inputs = form?.querySelectorAll('input, textarea, select');
  const errorMessages = {};

  // Validation rules
  const validationRules = {
    'name-input': {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
      messages: {
        required: 'Name is required',
        minLength: 'Name must be at least 2 characters',
        pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes',
      }
    },
    'email-input': {
      pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/,
      messages: {
        required: 'Email is required',
        pattern: 'Please enter a valid email address',
      }
    },
    'subject-input': {
      messages: {
        required: 'Please select a subject',
      }
    },
    'message-input': {
      minLength: 10,
      maxLength: 5000,
      messages: {
        required: 'Message is required',
        minLength: 'Message must be at least 10 characters',
        maxLength: 'Message cannot exceed 5000 characters',
      }
    }
  };

  // Real-time validation
  inputs?.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      if (errorMessages[input.id]) {
        validateInput(input);
      }
    });
  });

  function validateInput(input) {
    const rules = validationRules[input.id];
    const errorEl = document.getElementById(`${input.id.replace('-input', '')}-error`);

    if (!rules || !errorEl) return true;

    // Check required
    if (input.required && !input.value.trim()) {
      showError(errorEl, rules.messages.required);
      return false;
    }

    // Check minLength
    if (rules.minLength && input.value.length < rules.minLength) {
      showError(errorEl, rules.messages.minLength);
      return false;
    }

    // Check maxLength
    if (rules.maxLength && input.value.length > rules.maxLength) {
      showError(errorEl, rules.messages.maxLength);
      return false;
    }

    // Check pattern
    if (rules.pattern && input.value && !rules.pattern.test(input.value)) {
      showError(errorEl, rules.messages.pattern);
      return false;
    }

    clearError(errorEl);
    return true;
  }

  function showError(el, message) {
    el.textContent = message;
    el.style.display = 'block';
  }

  function clearError(el) {
    el.textContent = '';
    el.style.display = 'none';
  }

  // Form submission
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all inputs
    let isValid = true;
    inputs?.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Submit form
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitSpinner.classList.remove('hidden');
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        successMsg.classList.remove('hidden');
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      document.getElementById('form-error-text').textContent =
        'Failed to send message. Please try again.';
      errorMsg.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    }
  });
</script>
```

### Steps to Implement

1. Replace the entire contact form in `src/pages/contact.astro`
2. Update `.env` with your Formspree ID:
   ```
   PUBLIC_FORMSPREE_ID=f/your_actual_form_id
   ```
3. Test form submission locally with `npm run dev`

---

## 4. Fix Sidebar Image Error Handler

### Current Code (VULNERABLE)

```astro
<!-- src/components/Sidebar.astro -->
<img
  src="/images/profile.jpg"
  alt="Ahmed Zoha"
  onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=...'"
/>
```

### Fixed Code

Replace the profile section in `src/components/Sidebar.astro`:

```astro
<!-- Profile Section -->
<div class="p-6 border-b border-dark-500/30">
  <div class="flex items-center gap-3">
    <div class="w-12 h-12 rounded-full bg-dark-600 overflow-hidden relative" id="profile-img-container">
      <img
        id="profile-img"
        src="/images/profile.jpg"
        alt="Ahmed Zoha"
        class="w-full h-full object-cover"
      />
      <div class="w-full h-full flex items-center justify-center text-accent-yellow text-lg font-semibold hidden" id="profile-fallback">
        AZ
      </div>
    </div>
    <div>
      <h2 class="font-semibold text-text-primary">Dr Ahmed Zoha</h2>
      <p class="text-[10px] text-text-muted leading-relaxed">
        Professor of Distributed AI |<br/>
        Research Director | Driving AI for Social Good
      </p>
    </div>
  </div>
</div>

<script>
  // Safe image error handling
  const profileImg = document.getElementById('profile-img');
  const fallback = document.getElementById('profile-fallback');

  if (profileImg && fallback) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      fallback.classList.remove('hidden');
    });
  }
</script>
```

---

## 5. Create Environment Example File

Already done in `.env.example` file shown earlier.

---

## Implementation Checklist

- [ ] Move WordPress URL to `.env`
- [ ] Update `astro.config.mjs` with Vite config
- [ ] Create `vercel.json` with security headers
- [ ] Update contact form with validation
- [ ] Fix sidebar image error handler
- [ ] Create `.env.example`
- [ ] Update `.gitignore` to exclude `.env`
- [ ] Test locally: `npm run build && npm run preview`
- [ ] Deploy to production
- [ ] Verify headers with: `https://securityheaders.com`
- [ ] Monitor errors in production

---

## Verification

After implementing fixes, verify security headers:

1. **Online Tool:** Visit https://securityheaders.com and enter your domain
2. **cURL Command:**

   ```bash
   curl -I https://ahmedzoha.com
   ```

   Should show headers like:

   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Strict-Transport-Security: ...`

3. **Test WordPress API:**

   ```bash
   # Should only work from your domain
   curl https://ahmedzoha.com/wp/wp-json/wp/v2/posts
   ```

4. **Test Form:**
   Submit test form and verify email is received via Formspree

---

**Last Updated:** December 13, 2025
