# Vercel Deployment Quick Start

Fast-track guide to deploy TradeHub to Vercel in under 30 minutes.

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] GitHub account with TradeHub repository
- [ ] Vercel account (sign up at vercel.com)
- [ ] Supabase project created and configured
- [ ] Cloudinary account with upload preset
- [ ] All environment variables ready

---

## Step 1: Prepare Repository (5 minutes)

### 1.1 Verify Files

Ensure these files exist in your repository:
- [ ] `vercel.json` - Vercel configuration
- [ ] `.env.example` - Environment variables template
- [ ] `package.json` - Dependencies
- [ ] `next.config.mjs` - Next.js configuration

### 1.2 Commit and Push

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## Step 2: Import to Vercel (3 minutes)

### 2.1 Connect GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your repositories

### 2.2 Import Repository

1. Find "TradeHub" in the repository list
2. Click "Import"
3. Configure project:
   - **Project Name:** tradehub (or your preferred name)
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

---

## Step 3: Configure Environment Variables (10 minutes)

### 3.1 Add Production Variables

Click "Environment Variables" and add each variable:

#### Application URLs
```
NEXT_PUBLIC_APP_URL = https://tradehub.ng
NEXT_PUBLIC_SITE_URL = https://tradehub.ng
```
**Environment:** Production only

#### Supabase
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
```
**Environment:** Production, Preview, Development

#### Cloudinary
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = tradehub_listings
CLOUDINARY_API_KEY = your-api-key
CLOUDINARY_API_SECRET = your-api-secret
```
**Environment:** Production, Preview, Development

#### Build Configuration
```
NODE_ENV = production
NEXT_TELEMETRY_DISABLED = 1
```
**Environment:** Production only

### 3.2 Environment Selection

For each variable, select appropriate environments:
- ✅ **Production** - Live site (tradehub.ng)
- ✅ **Preview** - PR deployments (staging)
- ⬜ **Development** - Local development (optional)

---

## Step 4: Deploy (5 minutes)

### 4.1 Start Deployment

1. Click "Deploy" button
2. Wait for build to complete (2-5 minutes)
3. Watch build logs for errors

### 4.2 Verify Deployment

Once deployed, you'll see:
- ✅ Deployment URL: `https://tradehub-xxx.vercel.app`
- ✅ Build logs
- ✅ Deployment status: "Ready"

### 4.3 Test Deployment

1. Click "Visit" to open your site
2. Test critical features:
   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] Search functions
   - [ ] Login/signup works
   - [ ] Images display

---

## Step 5: Configure Custom Domain (5 minutes)

### 5.1 Add Domain

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter: `tradehub.ng`
4. Click "Add"

### 5.2 Add www Subdomain

1. Click "Add Domain" again
2. Enter: `www.tradehub.ng`
3. Click "Add"

### 5.3 Configure DNS

Add these records at your domain registrar:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 5.4 Wait for Verification

- DNS propagation: 5 minutes - 48 hours (usually < 1 hour)
- SSL certificate: Automatic after DNS verification
- Check status in Vercel Domains tab

---

## Step 6: Post-Deployment Verification (5 minutes)

### 6.1 Test Production Site

Visit `https://tradehub.ng` and verify:

**Core Functionality:**
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] Search functionality
- [ ] Category filtering

**Authentication:**
- [ ] Sign up flow
- [ ] Email verification
- [ ] Login flow
- [ ] Profile access

**Listings:**
- [ ] Create listing
- [ ] Upload images
- [ ] View listing details
- [ ] Edit listing
- [ ] Delete listing

**Performance:**
- [ ] Page load < 3 seconds
- [ ] Images load quickly
- [ ] No console errors
- [ ] Mobile responsive

### 6.2 Check Analytics

1. Go to Vercel Dashboard → Analytics
2. Verify tracking is active
3. Check Speed Insights for Web Vitals

### 6.3 Monitor Errors

1. Go to Vercel Dashboard → Logs
2. Filter by "Error"
3. Verify no critical errors

---

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Solution: Add all required variables in Vercel settings
- Redeploy after adding variables

**Error: Module not found**
- Solution: Verify package.json dependencies
- Run `npm install` locally to test

**Error: Build timeout**
- Solution: Optimize build process
- Contact Vercel support for timeout increase

### Site Not Loading

**DNS not propagating**
- Solution: Wait up to 48 hours
- Check DNS with dnschecker.org
- Verify DNS records are correct

**SSL certificate pending**
- Solution: Wait for DNS verification
- Certificate issued automatically after DNS propagates

### Images Not Displaying

**Cloudinary not configured**
- Solution: Verify Cloudinary environment variables
- Check upload preset exists and is unsigned
- Test image upload in development

### Authentication Not Working

**Redirect URL mismatch**
- Solution: Add production URL to Supabase redirect URLs
- Format: `https://tradehub.ng/auth/callback`
- Include both www and non-www if needed

---

## Next Steps

After successful deployment:

1. **Set Up Monitoring:**
   - Enable Vercel Analytics
   - Configure uptime monitoring
   - Set up error tracking

2. **Configure CI/CD:**
   - Set up GitHub Actions
   - Configure automatic deployments
   - Add preview deployments for PRs

3. **Optimize Performance:**
   - Review Web Vitals
   - Optimize images
   - Enable caching

4. **Security:**
   - Enable 2FA on all accounts
   - Review RLS policies
   - Set up security headers

5. **Documentation:**
   - Update team documentation
   - Create runbooks
   - Document procedures

---

## Quick Reference

### Vercel Dashboard URLs

- **Project:** https://vercel.com/your-team/tradehub
- **Deployments:** https://vercel.com/your-team/tradehub/deployments
- **Settings:** https://vercel.com/your-team/tradehub/settings
- **Analytics:** https://vercel.com/your-team/tradehub/analytics
- **Logs:** https://vercel.com/your-team/tradehub/logs

### Common Commands

```bash
# Deploy from CLI
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs

# Promote deployment
vercel promote <deployment-url>
```

### Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel/discussions
- **Status:** https://vercel-status.com

---

## Deployment Checklist

Use this checklist for each deployment:

### Pre-Deployment
- [ ] Code tested locally
- [ ] All tests passing
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Team notified

### Deployment
- [ ] Environment variables set
- [ ] Build successful
- [ ] No build warnings
- [ ] Deployment URL accessible

### Post-Deployment
- [ ] Production site tested
- [ ] Critical features working
- [ ] No errors in logs
- [ ] Performance acceptable
- [ ] Analytics tracking

### Follow-Up
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Document any issues

---

**Estimated Total Time: 30 minutes**

*Last Updated: November 2024*
