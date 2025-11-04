# TradeHub Post-Deployment Checklist

Use this checklist to verify your deployment is complete and production-ready.

## Pre-Deployment

### Code Repository
- [ ] All code committed to main branch
- [ ] No .env files in repository
- [ ] .gitignore includes sensitive files
- [ ] package.json dependencies up to date
- [ ] No console.log statements in production code
- [ ] Build passes locally: `npm run build`
- [ ] Linting passes: `npm run lint`

### Environment Variables
- [ ] All variables documented in .env.example
- [ ] Production values ready (not test/dev values)
- [ ] API keys are valid and active
- [ ] No hardcoded secrets in code

---

## Supabase Setup

### Project Configuration
- [ ] Supabase project created
- [ ] Project region selected (closest to Nigeria)
- [ ] Database password saved securely
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] Service role key copied (stored securely)

### Database Migrations
- [ ] Migration 001: Initial schema executed
- [ ] Migration 002: RLS policies executed
- [ ] Migration 003: Storage buckets executed
- [ ] Migration 004: Seed categories executed
- [ ] All tables visible in Table Editor
- [ ] Sample data inserted for testing

### Row Level Security
- [ ] RLS enabled on profiles table
- [ ] RLS enabled on listings table
- [ ] RLS enabled on favorites table
- [ ] RLS enabled on listing_views table
- [ ] Policies tested with test user account

### Storage Configuration
- [ ] 'listings' bucket created
- [ ] 'profiles' bucket created
- [ ] Both buckets set to public
- [ ] Storage policies applied
- [ ] Test image upload successful

### Authentication
- [ ] Email provider enabled
- [ ] Site URL set to production domain
- [ ] Redirect URLs configured:
  - [ ] https://tradehub.ng/auth/callback
  - [ ] https://tradehub.ng/verify
  - [ ] https://*.vercel.app/auth/callback
- [ ] Email templates customized
- [ ] Test signup flow works
- [ ] Test login flow works
- [ ] Password reset works

---

## Cloudinary Setup

### Account Configuration
- [ ] Cloudinary account created
- [ ] Cloud name noted
- [ ] API key copied
- [ ] API secret copied (stored securely)

### Upload Preset
- [ ] Upload preset created: tradehub_listings
- [ ] Signing mode: Unsigned
- [ ] Folder: listings
- [ ] Allowed formats: jpg, png, webp
- [ ] Max file size: 5MB
- [ ] Image transformations configured
- [ ] Test upload successful

### Optimization
- [ ] Auto format enabled
- [ ] Auto quality enabled
- [ ] Responsive breakpoints configured
- [ ] CDN delivery working

---

## Vercel Deployment

### Project Setup
- [ ] GitHub repository connected
- [ ] Framework preset: Next.js
- [ ] Build command: npm run build
- [ ] Output directory: .next
- [ ] Node.js version: 18.x or higher

### Environment Variables (Production)
- [ ] NEXT_PUBLIC_APP_URL set
- [ ] NEXT_PUBLIC_SITE_URL set
- [ ] NEXT_PUBLIC_SUPABASE_URL set
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY set
- [ ] SUPABASE_SERVICE_ROLE_KEY set
- [ ] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME set
- [ ] NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET set
- [ ] CLOUDINARY_API_KEY set
- [ ] CLOUDINARY_API_SECRET set
- [ ] NODE_ENV=production set
- [ ] NEXT_TELEMETRY_DISABLED=1 set

### Environment Variables (Preview)
- [ ] All preview environment variables set
- [ ] Using staging/test credentials
- [ ] Preview URL configured

### Build & Deploy
- [ ] Initial deployment successful
- [ ] Build logs checked for errors
- [ ] No build warnings
- [ ] Deployment URL accessible
- [ ] All pages load correctly

---

## Domain Configuration

### DNS Setup
- [ ] A record added: @ → 76.76.21.21
- [ ] CNAME record added: www → cname.vercel-dns.com
- [ ] DNS propagation verified (dnschecker.org)
- [ ] TTL set appropriately (3600)

### Vercel Domain
- [ ] Domain added in Vercel: tradehub.ng
- [ ] www subdomain added: www.tradehub.ng
- [ ] Domain verified in Vercel
- [ ] SSL certificate issued
- [ ] HTTPS enforced
- [ ] www redirects to non-www (or vice versa)

### Domain Testing
- [ ] https://tradehub.ng loads
- [ ] https://www.tradehub.ng redirects correctly
- [ ] SSL certificate valid (green lock icon)
- [ ] No mixed content warnings

---

## Application Testing

### Core Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Listing creation works
- [ ] Image upload works
- [ ] Listing detail page loads
- [ ] User profile loads
- [ ] Edit profile works

### Authentication Flow
- [ ] Sign up with email works
- [ ] Email verification works
- [ ] Login works
- [ ] Logout works
- [ ] Password reset works
- [ ] Protected routes redirect to login
- [ ] Session persists on refresh

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s
- [ ] Images optimized and loading
- [ ] Fonts loading correctly

### Mobile Testing
- [ ] Responsive design works
- [ ] Touch interactions work
- [ ] Mobile navigation works
- [ ] Forms usable on mobile
- [ ] Images display correctly
- [ ] PWA installable
- [ ] Offline page works

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Security

### Headers
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection enabled
- [ ] Referrer-Policy set
- [ ] Permissions-Policy configured
- [ ] HTTPS enforced
- [ ] HSTS header set

### API Security
- [ ] API routes protected
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] No sensitive data in responses
- [ ] Error messages don't leak info

### Data Security
- [ ] RLS policies tested
- [ ] Users can only access own data
- [ ] No SQL injection vulnerabilities
- [ ] File upload validation works
- [ ] XSS protection in place

---

## Monitoring & Analytics

### Vercel Analytics
- [ ] Vercel Analytics enabled
- [ ] Analytics showing data
- [ ] Real User Monitoring active
- [ ] Web Vitals tracking

### Speed Insights
- [ ] Speed Insights enabled
- [ ] Performance data visible
- [ ] No critical issues

### Error Tracking (Optional)
- [ ] Sentry configured (if using)
- [ ] Error notifications set up
- [ ] Source maps uploaded

### Uptime Monitoring (Optional)
- [ ] Uptime monitor configured
- [ ] Alert notifications set up
- [ ] Status page created

---

## SEO & Social

### Meta Tags
- [ ] Title tags on all pages
- [ ] Meta descriptions set
- [ ] Open Graph tags configured
- [ ] Twitter Card tags set
- [ ] Favicon present
- [ ] Apple touch icon set

### Sitemap & Robots
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] Submitted to Google Search Console
- [ ] Submitted to Bing Webmaster Tools

### Social Media
- [ ] Social sharing works
- [ ] Preview images display correctly
- [ ] Links unfurl properly on platforms

---

## Documentation

### Internal Docs
- [ ] README.md updated
- [ ] DEPLOYMENT.md complete
- [ ] Environment variables documented
- [ ] API documentation current
- [ ] Code comments adequate

### User Documentation
- [ ] Help/FAQ page created
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Contact information available

---

## Backup & Recovery

### Database Backups
- [ ] Supabase automatic backups enabled
- [ ] Backup schedule configured
- [ ] Backup restoration tested
- [ ] Point-in-time recovery available

### Rollback Plan
- [ ] Previous deployment identified
- [ ] Rollback procedure documented
- [ ] Team knows how to rollback
- [ ] Database rollback plan ready

---

## Team & Communication

### Access & Permissions
- [ ] Team members have Vercel access
- [ ] Team members have Supabase access
- [ ] Team members have Cloudinary access
- [ ] GitHub repository permissions set
- [ ] 2FA enabled on all accounts

### Notifications
- [ ] Deployment notifications configured
- [ ] Error alerts set up
- [ ] Uptime alerts configured
- [ ] Team communication channel ready

---

## Post-Launch

### Monitoring (First 24 Hours)
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Monitor server costs
- [ ] Check database performance

### Week 1 Tasks
- [ ] Review analytics data
- [ ] Address critical bugs
- [ ] Optimize slow queries
- [ ] Gather user feedback
- [ ] Plan improvements

### Ongoing Maintenance
- [ ] Weekly dependency updates
- [ ] Monthly security audits
- [ ] Quarterly performance reviews
- [ ] Regular backup verification
- [ ] Cost optimization reviews

---

## Emergency Contacts

### Service Providers
- **Vercel Support:** vercel.com/support
- **Supabase Support:** supabase.com/support
- **Cloudinary Support:** cloudinary.com/support

### Internal Team
- **Technical Lead:** [Name/Contact]
- **DevOps:** [Name/Contact]
- **Product Owner:** [Name/Contact]

---

## Sign-off

- [ ] Technical lead approval
- [ ] Product owner approval
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] All critical issues resolved

**Deployment Date:** _______________

**Deployed By:** _______________

**Approved By:** _______________

---

*Keep this checklist updated as your deployment process evolves.*
