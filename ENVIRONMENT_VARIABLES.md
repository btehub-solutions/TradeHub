# TradeHub Environment Variables Guide

Complete reference for all environment variables used in TradeHub.

## Table of Contents
- [Overview](#overview)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Environment-Specific Configuration](#environment-specific-configuration)
- [Security Best Practices](#security-best-practices)
- [Vercel Setup Instructions](#vercel-setup-instructions)

---

## Overview

TradeHub uses environment variables to configure external services and application behavior. Variables are categorized as:

- **Public Variables** (`NEXT_PUBLIC_*`): Exposed to the browser, safe for client-side code
- **Private Variables**: Server-side only, never exposed to the browser
- **Build Variables**: Used during the build process

---

## Required Variables

### Application URLs

#### `NEXT_PUBLIC_APP_URL`
- **Type:** Public
- **Required:** Yes
- **Description:** The main URL where your application is hosted
- **Development:** `http://localhost:3000`
- **Production:** `https://tradehub.ng`
- **Used For:** Redirects, canonical URLs, API callbacks

#### `NEXT_PUBLIC_SITE_URL`
- **Type:** Public
- **Required:** Yes
- **Description:** Site URL for SEO and social sharing
- **Development:** `http://localhost:3000`
- **Production:** `https://tradehub.ng`
- **Used For:** Meta tags, sitemap generation, Open Graph

---

### Supabase Configuration

#### `NEXT_PUBLIC_SUPABASE_URL`
- **Type:** Public
- **Required:** Yes
- **Description:** Your Supabase project URL
- **Format:** `https://xxxxxxxxxxxxx.supabase.co`
- **Where to Find:** Supabase Dashboard → Settings → API → Project URL
- **Used For:** Database connections, authentication, storage

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Type:** Public
- **Required:** Yes
- **Description:** Supabase anonymous/public API key
- **Format:** Long JWT token starting with `eyJ...`
- **Where to Find:** Supabase Dashboard → Settings → API → Project API keys → anon/public
- **Used For:** Client-side database queries (RLS enforced)
- **Security:** Safe to expose (RLS policies protect data)

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Type:** Private (⚠️ KEEP SECRET)
- **Required:** Yes
- **Description:** Supabase service role key with admin privileges
- **Format:** Long JWT token starting with `eyJ...`
- **Where to Find:** Supabase Dashboard → Settings → API → Project API keys → service_role
- **Used For:** Server-side operations, bypassing RLS when needed
- **Security:** ⚠️ NEVER expose to client, grants full database access

---

### Cloudinary Configuration

#### `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- **Type:** Public
- **Required:** Yes
- **Description:** Your Cloudinary cloud name
- **Format:** Alphanumeric string (e.g., `tradehub-prod`)
- **Where to Find:** Cloudinary Dashboard → Account Details → Cloud name
- **Used For:** Image uploads, transformations, CDN delivery

#### `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- **Type:** Public
- **Required:** Yes
- **Description:** Unsigned upload preset for client-side uploads
- **Format:** Alphanumeric string (e.g., `tradehub_listings`)
- **Where to Find:** Cloudinary Dashboard → Settings → Upload → Upload presets
- **Used For:** Direct browser uploads without backend
- **Security:** Must be "unsigned" preset

#### `CLOUDINARY_API_KEY`
- **Type:** Private
- **Required:** Yes (for server-side operations)
- **Description:** Cloudinary API key
- **Format:** Numeric string
- **Where to Find:** Cloudinary Dashboard → Account Details → API Key
- **Used For:** Server-side image operations, signed uploads

#### `CLOUDINARY_API_SECRET`
- **Type:** Private (⚠️ KEEP SECRET)
- **Required:** Yes (for server-side operations)
- **Description:** Cloudinary API secret
- **Format:** Alphanumeric string
- **Where to Find:** Cloudinary Dashboard → Account Details → API Secret
- **Used For:** Signing requests, secure operations
- **Security:** ⚠️ NEVER expose to client

---

### Termii SMS Configuration (Optional)

#### `TERMII_API_KEY`
- **Type:** Private (⚠️ KEEP SECRET)
- **Required:** No (optional for SMS features)
- **Description:** Termii API key for SMS notifications
- **Format:** Alphanumeric string
- **Where to Find:** Termii Dashboard → API Settings
- **Used For:** Phone verification, SMS notifications
- **Note:** Can be added later, not required for MVP

#### `TERMII_SENDER_ID`
- **Type:** Private
- **Required:** No (if using Termii)
- **Description:** Registered sender ID for SMS
- **Format:** String (e.g., `TradeHub`)
- **Where to Find:** Termii Dashboard → Sender IDs
- **Used For:** SMS sender identification

---

## Optional Variables

### Build Configuration

#### `NODE_ENV`
- **Type:** Build
- **Required:** No (auto-set by Vercel)
- **Description:** Node environment
- **Values:** `development`, `production`, `test`
- **Default:** `development`
- **Used For:** Conditional behavior, optimizations

#### `NEXT_TELEMETRY_DISABLED`
- **Type:** Build
- **Required:** No
- **Description:** Disable Next.js telemetry
- **Values:** `1` (disabled), `0` (enabled)
- **Default:** `0`
- **Recommended:** `1` for production

---

### Analytics & Monitoring

#### `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`
- **Type:** Public
- **Required:** No (auto-set by Vercel)
- **Description:** Vercel Analytics ID
- **Used For:** Web analytics, performance monitoring
- **Note:** Automatically configured when deployed to Vercel

#### `SENTRY_DSN` (Future)
- **Type:** Private
- **Required:** No
- **Description:** Sentry error tracking DSN
- **Used For:** Error monitoring and reporting
- **Note:** Can be added for enhanced error tracking

---

## Environment-Specific Configuration

### Development (.env.local)

```bash
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (Development Project)
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-dev-service-key

# Cloudinary (Development Account)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tradehub-dev
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tradehub_dev
CLOUDINARY_API_KEY=your-dev-api-key
CLOUDINARY_API_SECRET=your-dev-api-secret

# Optional
NODE_ENV=development
```

### Preview/Staging (Vercel Environment)

```bash
# App URLs (use Vercel preview URL)
NEXT_PUBLIC_APP_URL=https://tradehub-git-branch-name.vercel.app
NEXT_PUBLIC_SITE_URL=https://tradehub-git-branch-name.vercel.app

# Supabase (Staging Project or Branch)
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-key

# Cloudinary (Staging Account)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tradehub-staging
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tradehub_staging
CLOUDINARY_API_KEY=your-staging-api-key
CLOUDINARY_API_SECRET=your-staging-api-secret

# Build
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Production (Vercel Environment)

```bash
# App URLs
NEXT_PUBLIC_APP_URL=https://tradehub.ng
NEXT_PUBLIC_SITE_URL=https://tradehub.ng

# Supabase (Production Project)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-key

# Cloudinary (Production Account)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tradehub-prod
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tradehub_listings
CLOUDINARY_API_KEY=your-prod-api-key
CLOUDINARY_API_SECRET=your-prod-api-secret

# Termii (Production - Optional)
TERMII_API_KEY=your-prod-termii-key
TERMII_SENDER_ID=TradeHub

# Build
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## Security Best Practices

### DO ✅

1. **Use .env.local for local development**
   - Never commit this file
   - Listed in .gitignore

2. **Store secrets in Vercel Environment Variables**
   - Encrypted at rest
   - Access controlled
   - Audit logged

3. **Use different credentials per environment**
   - Development
   - Staging/Preview
   - Production

4. **Rotate keys regularly**
   - Every 90 days minimum
   - After team member changes
   - After suspected compromise

5. **Use service role key sparingly**
   - Only for admin operations
   - Never in client-side code
   - Log all usage

6. **Enable 2FA on all service accounts**
   - Vercel
   - Supabase
   - Cloudinary
   - GitHub

### DON'T ❌

1. **Never commit .env files to Git**
   - Use .env.example instead
   - Add .env* to .gitignore

2. **Never hardcode secrets in code**
   - Use environment variables
   - No API keys in source

3. **Never expose private variables to client**
   - No SUPABASE_SERVICE_ROLE_KEY in browser
   - No API secrets in frontend

4. **Never share keys in chat/email**
   - Use secure password managers
   - Use encrypted channels

5. **Never use production keys in development**
   - Separate environments
   - Separate credentials

---

## Vercel Setup Instructions

### Step 1: Access Environment Variables

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**

### Step 2: Add Variables

For each variable:

1. Click **Add New**
2. Enter **Key** (variable name)
3. Enter **Value** (variable value)
4. Select **Environments:**
   - ✅ Production (for production values)
   - ✅ Preview (for staging values)
   - ✅ Development (for local dev values)
5. Click **Save**

### Step 3: Organize by Environment

**Production Only:**
- Use production Supabase project
- Use production Cloudinary account
- Use production domain URLs

**Preview Only:**
- Use staging Supabase project
- Use staging Cloudinary account
- Use Vercel preview URLs

**Development Only:**
- Use development Supabase project
- Use development Cloudinary account
- Use localhost URLs

### Step 4: Redeploy

After adding/changing variables:
1. Go to **Deployments**
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Verify new variables are active

---

## Troubleshooting

### Build Fails: "Missing environment variable"

**Solution:**
1. Check variable name spelling (case-sensitive)
2. Verify variable is set in correct environment
3. Ensure no trailing spaces in values
4. Redeploy after adding variables

### "Invalid Supabase URL"

**Solution:**
1. Verify URL format: `https://xxxxx.supabase.co`
2. Check for trailing slashes (remove them)
3. Ensure project is not paused
4. Verify project exists in Supabase dashboard

### Images Not Uploading

**Solution:**
1. Verify Cloudinary cloud name is correct
2. Check upload preset exists and is unsigned
3. Verify CORS settings in Cloudinary
4. Check browser console for errors

### Authentication Not Working

**Solution:**
1. Verify Supabase URL and keys
2. Check redirect URLs in Supabase settings
3. Ensure anon key is public (NEXT_PUBLIC_*)
4. Verify RLS policies are correct

---

## GitHub Actions Secrets

For CI/CD pipeline, add these secrets to GitHub:

1. Go to GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add **New repository secret** for each:

```
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
VERCEL_TOKEN (from Vercel account settings)
VERCEL_ORG_ID (from Vercel project settings)
VERCEL_PROJECT_ID (from Vercel project settings)
```

---

## Validation Checklist

Before deploying, verify:

- [ ] All required variables are set
- [ ] No typos in variable names
- [ ] Values are from correct environment
- [ ] Private keys are not exposed
- [ ] URLs have correct format (no trailing slash)
- [ ] Build completes successfully
- [ ] Application functions correctly

---

*Last Updated: November 2024*
