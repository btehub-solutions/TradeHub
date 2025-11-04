# TradeHub Deployment Guide

Complete guide for deploying TradeHub to Vercel with Supabase backend.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Supabase Configuration](#supabase-configuration)
- [Cloudinary Configuration](#cloudinary-configuration)
- [Termii SMS Configuration](#termii-sms-configuration)
- [Vercel Deployment](#vercel-deployment)
- [Domain Configuration](#domain-configuration)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

Before deploying TradeHub, ensure you have:

- GitHub account with repository access
- Vercel account (free tier works)
- Supabase account (free tier works)
- Cloudinary account (free tier works)
- Termii account for SMS (optional, for production)
- Domain name (tradehub.ng) with DNS access
- Node.js 18+ installed locally for testing

---

## Environment Setup

### Required Environment Variables

TradeHub requires the following environment variables across all environments:

#### Public Variables (Safe to expose to browser)
```
NEXT_PUBLIC_APP_URL=https://tradehub.ng
NEXT_PUBLIC_SITE_URL=https://tradehub.ng
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

#### Private Variables (Server-side only)
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
TERMII_API_KEY=your-termii-api-key
TERMII_SENDER_ID=TradeHub
```

#### Build Variables
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## Supabase Configuration

### Step 1: Create Supabase Project

1. Go to supabase.com/dashboard
2. Click "New Project"
3. Fill in project details:
   - Name: TradeHub Production
   - Database Password: Generate strong password (save securely)
   - Region: Choose closest to Nigeria (eu-west-1 or ap-south-1)
   - Pricing Plan: Free tier for testing, Pro for production

### Step 2: Run Database Migrations

Navigate to SQL Editor in Supabase dashboard and run migration files in order from supabase/migrations folder.

Or use Supabase CLI:
```bash
npm install -g supabase
supabase link --project-ref your-project-ref
supabase db push
```

### Step 3: Configure Storage

1. Go to Storage in Supabase dashboard
2. Verify buckets are created: listings, profiles
3. Storage policies are set in migrations

### Step 4: Get API Keys

Go to Settings → API and copy:
- Project URL: NEXT_PUBLIC_SUPABASE_URL
- Anon/Public Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
- Service Role Key: SUPABASE_SERVICE_ROLE_KEY (Keep secret!)

### Step 5: Configure Authentication

1. Go to Authentication → Providers
2. Enable Email provider
3. Set Site URL: https://tradehub.ng
4. Add Redirect URLs:
   - https://tradehub.ng/auth/callback
   - https://tradehub.ng/verify
   - https://*.vercel.app/auth/callback

---

## Cloudinary Configuration

### Step 1: Create Account

1. Sign up at cloudinary.com
2. Note your Cloud Name from dashboard

### Step 2: Create Upload Preset

1. Go to Settings → Upload
2. Click "Add upload preset"
3. Configure:
   - Preset name: tradehub_listings
   - Signing Mode: Unsigned
   - Folder: listings
   - Allowed formats: jpg, png, webp
   - Max file size: 5MB
   - Transformation: Limit dimensions to 1920x1920

### Step 3: Get API Credentials

Go to Dashboard and copy:
- Cloud Name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- API Key: CLOUDINARY_API_KEY
- API Secret: CLOUDINARY_API_SECRET

---

## Termii SMS Configuration

### Step 1: Create Account

1. Sign up at termii.com
2. Complete verification
3. Add credits for SMS

### Step 2: Get API Key

1. Go to API Settings
2. Copy API Key: TERMII_API_KEY
3. Register Sender ID: TradeHub

### Step 3: Configure (Optional for MVP)

SMS is optional for initial launch. Can be added later for:
- Phone verification
- Transaction notifications
- Security alerts

---

## Vercel Deployment

### Step 1: Connect Repository

1. Go to vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository
4. Select TradeHub repository

### Step 2: Configure Project

1. Framework Preset: Next.js (auto-detected)
2. Root Directory: ./
3. Build Command: npm run build
4. Output Directory: .next (default)
5. Install Command: npm install

### Step 3: Set Environment Variables

Click "Environment Variables" and add all variables from the Environment Setup section above.

For each variable, set the environment:
- Production: Live site variables
- Preview: Staging/test variables
- Development: Local development variables

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Vercel will provide a URL: https://tradehub-xxx.vercel.app

### Step 5: Verify Deployment

Check the following:
- Homepage loads correctly
- Images display properly
- Authentication works
- Database connections successful
- API routes responding

---

## Domain Configuration

### Step 1: Add Domain to Vercel

1. Go to Project Settings → Domains
2. Add domain: tradehub.ng
3. Add www subdomain: www.tradehub.ng

### Step 2: Configure DNS

Add the following DNS records at your domain registrar:

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

### Step 3: SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt.
- Wait 24-48 hours for DNS propagation
- Certificate will auto-renew

### Step 4: Verify Domain

1. Wait for DNS propagation (use dnschecker.org)
2. Vercel will automatically verify and enable HTTPS
3. Test: https://tradehub.ng

---

## Post-Deployment Checklist

### Environment Variables
- All variables set in Vercel
- No secrets in code repository
- .env files in .gitignore

### Database
- All tables created
- RLS policies enabled
- Storage buckets configured
- Seed data loaded (categories)

### Authentication
- Email provider enabled
- Redirect URLs configured
- Email templates customized

### Domain & SSL
- Domain DNS configured
- SSL certificate active
- www redirect working
- HTTPS enforced

### Performance
- Vercel Analytics enabled
- Speed Insights working
- Image optimization active
- Caching headers set

### Security
- Security headers configured
- RLS policies tested
- API routes protected
- CORS configured

### Monitoring
- Error tracking setup
- Uptime monitoring active
- Performance budgets set

---

## Rollback Procedures

### Quick Rollback (Vercel Dashboard)

1. Go to Deployments tab
2. Find last working deployment
3. Click "..." menu → "Promote to Production"
4. Confirm rollback

### Database Rollback

If migration fails:
```bash
supabase db reset
supabase db push
```

### Emergency Procedures

1. Disable problematic features via feature flags
2. Revert to last stable commit
3. Redeploy from GitHub
4. Notify users of maintenance

### Rollback Checklist

- Verify previous deployment is stable
- Check database compatibility
- Test critical user flows
- Monitor error rates
- Communicate with users

---

## Monitoring & Maintenance

### Daily Checks
- Error rate in Vercel dashboard
- Database usage in Supabase
- Storage usage in Cloudinary

### Weekly Checks
- Performance metrics
- User feedback
- Security updates

### Monthly Checks
- Dependency updates
- Cost optimization
- Backup verification

---

## Troubleshooting

### Build Failures

**Issue:** Build fails on Vercel
**Solution:**
1. Check build logs for errors
2. Verify all dependencies in package.json
3. Test build locally: npm run build
4. Check Node.js version compatibility

### Database Connection Issues

**Issue:** Cannot connect to Supabase
**Solution:**
1. Verify SUPABASE_URL and keys
2. Check Supabase project status
3. Verify RLS policies allow access
4. Check network/firewall settings

### Image Upload Failures

**Issue:** Images not uploading to Cloudinary
**Solution:**
1. Verify Cloudinary credentials
2. Check upload preset configuration
3. Verify file size limits
4. Check CORS settings

### Authentication Issues

**Issue:** Users cannot sign in
**Solution:**
1. Verify redirect URLs in Supabase
2. Check email provider settings
3. Verify JWT secret configuration
4. Check browser console for errors

---

## Support & Resources

- **Vercel Docs:** vercel.com/docs
- **Supabase Docs:** supabase.com/docs
- **Cloudinary Docs:** cloudinary.com/documentation
- **Next.js Docs:** nextjs.org/docs

---

## Security Best Practices

1. Never commit .env files
2. Use Vercel environment variable encryption
3. Rotate API keys regularly
4. Enable 2FA on all accounts
5. Monitor for suspicious activity
6. Keep dependencies updated
7. Use strong database passwords
8. Limit service role key usage

---

*Last Updated: November 2024*
