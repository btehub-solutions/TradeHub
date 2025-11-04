# TradeHub Rollback Procedures

Emergency procedures for rolling back deployments and recovering from issues.

## Table of Contents
- [Quick Rollback](#quick-rollback)
- [Database Rollback](#database-rollback)
- [Environment Variable Rollback](#environment-variable-rollback)
- [Emergency Procedures](#emergency-procedures)
- [Post-Rollback Actions](#post-rollback-actions)

---

## Quick Rollback

### Vercel Deployment Rollback

**When to Use:**
- New deployment causes critical bugs
- Performance degradation
- Breaking changes in production
- User-facing errors

**Steps:**

1. **Access Vercel Dashboard:**
   - Go to vercel.com/dashboard
   - Select TradeHub project
   - Click "Deployments" tab

2. **Identify Last Working Deployment:**
   - Look for deployment before the issue
   - Check deployment time and commit
   - Verify it was marked as "Ready"

3. **Promote Previous Deployment:**
   - Click "..." menu on the working deployment
   - Select "Promote to Production"
   - Confirm the promotion

4. **Verify Rollback:**
   - Wait 30-60 seconds for DNS propagation
   - Visit https://tradehub.ng
   - Test critical user flows
   - Check error logs

**Time to Complete:** 2-5 minutes

### Via Vercel CLI

```bash
# List recent deployments
vercel ls

# Promote specific deployment to production
vercel promote <deployment-url>

# Example
vercel promote tradehub-abc123.vercel.app
```

---

## Database Rollback

### Supabase Migration Rollback

**When to Use:**
- Migration causes data issues
- Schema changes break application
- Performance problems after migration

**Option 1: Point-in-Time Recovery (Supabase Pro)**

1. **Access Supabase Dashboard:**
   - Go to supabase.com/dashboard
   - Select your project
   - Click "Database" → "Backups"

2. **Select Recovery Point:**
   - Choose timestamp before migration
   - Click "Restore"
   - Confirm restoration

3. **Wait for Completion:**
   - Restoration takes 5-30 minutes
   - Monitor progress in dashboard

**Option 2: Manual Rollback (Free Tier)**

1. **Create Rollback SQL:**
   ```sql
   -- Example: Rollback migration 004
   -- Remove added columns
   ALTER TABLE listings DROP COLUMN IF EXISTS new_column;
   
   -- Restore old constraints
   ALTER TABLE listings ADD CONSTRAINT old_constraint ...;
   
   -- Revert data changes
   UPDATE listings SET status = 'active' WHERE status = 'new_status';
   ```

2. **Execute Rollback:**
   - Go to SQL Editor in Supabase
   - Paste rollback SQL
   - Review carefully
   - Execute

3. **Verify Data Integrity:**
   - Check table structure
   - Verify data consistency
   - Test application functionality

### Database Backup Strategy

**Before Any Migration:**

1. **Create Manual Backup:**
   ```bash
   # Using Supabase CLI
   supabase db dump -f backup-$(date +%Y%m%d-%H%M%S).sql
   ```

2. **Store Backup Securely:**
   - Save to cloud storage (S3, Google Drive)
   - Keep locally for quick access
   - Document backup timestamp

3. **Test Backup Restoration:**
   - Verify backup file integrity
   - Test restoration on staging

---

## Environment Variable Rollback

### Vercel Environment Variables

**When to Use:**
- Incorrect API keys
- Wrong service URLs
- Configuration errors

**Steps:**

1. **Access Environment Variables:**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables

2. **Identify Changed Variables:**
   - Check recent changes
   - Compare with documentation
   - Review .env.example

3. **Restore Previous Values:**
   - Click "Edit" on affected variable
   - Enter previous value
   - Save changes

4. **Redeploy:**
   - Go to Deployments
   - Click "Redeploy" on latest
   - Wait for completion

**Prevention:**
- Document all variable changes
- Test in Preview environment first
- Keep backup of production values

---

## Emergency Procedures

### Critical Production Issue

**Severity Levels:**

**P0 - Critical (Site Down):**
- Complete site outage
- Data loss risk
- Security breach

**P1 - High (Major Feature Broken):**
- Authentication broken
- Payments failing
- Data corruption

**P2 - Medium (Minor Feature Broken):**
- Search not working
- Images not loading
- UI glitches

**P3 - Low (Cosmetic Issues):**
- Styling issues
- Non-critical features
- Performance degradation

### P0 Response (Site Down)

**Immediate Actions (0-5 minutes):**

1. **Assess Impact:**
   - Check Vercel status page
   - Check Supabase status
   - Check error logs

2. **Quick Rollback:**
   - Promote last working deployment
   - Verify site is accessible

3. **Notify Team:**
   - Alert technical team
   - Update status page (if available)
   - Prepare user communication

**Investigation (5-30 minutes):**

1. **Identify Root Cause:**
   - Review deployment changes
   - Check error logs
   - Analyze metrics

2. **Implement Fix:**
   - Fix issue in code
   - Test thoroughly
   - Deploy fix

3. **Monitor:**
   - Watch error rates
   - Check performance metrics
   - Verify user reports

### P1 Response (Major Feature Broken)

**Immediate Actions (0-15 minutes):**

1. **Verify Issue:**
   - Reproduce the problem
   - Check error logs
   - Assess user impact

2. **Decision Point:**
   - Can fix quickly? → Deploy hotfix
   - Complex issue? → Rollback

3. **Communicate:**
   - Notify affected users
   - Update support team
   - Document issue

**Resolution (15-60 minutes):**

1. **Implement Solution:**
   - Fix or rollback
   - Test thoroughly
   - Deploy

2. **Verify Fix:**
   - Test affected features
   - Monitor error rates
   - Check user feedback

### Maintenance Mode

**When to Use:**
- Major database migration
- Critical security update
- Infrastructure changes

**Setup:**

1. **Create Maintenance Page:**
   ```typescript
   // app/maintenance/page.tsx
   export default function Maintenance() {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1>We'll be right back!</h1>
           <p>TradeHub is undergoing scheduled maintenance.</p>
           <p>Expected completion: [TIME]</p>
         </div>
       </div>
     );
   }
   ```

2. **Redirect Traffic:**
   ```javascript
   // middleware.ts
   if (process.env.MAINTENANCE_MODE === 'true') {
     return NextResponse.redirect('/maintenance');
   }
   ```

3. **Enable Maintenance Mode:**
   - Set MAINTENANCE_MODE=true in Vercel
   - Redeploy

4. **Disable After Completion:**
   - Set MAINTENANCE_MODE=false
   - Redeploy
   - Verify functionality

---

## Post-Rollback Actions

### Immediate (0-1 hour)

- [ ] Verify site functionality
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Document incident

### Short-term (1-24 hours)

- [ ] Identify root cause
- [ ] Implement proper fix
- [ ] Test fix thoroughly
- [ ] Deploy fix to production
- [ ] Communicate resolution

### Long-term (1-7 days)

- [ ] Conduct post-mortem
- [ ] Update documentation
- [ ] Improve testing procedures
- [ ] Enhance monitoring
- [ ] Train team on prevention

---

## Incident Documentation Template

```markdown
# Incident Report: [Title]

## Summary
Brief description of the incident

## Timeline
- [Time] - Issue detected
- [Time] - Team notified
- [Time] - Rollback initiated
- [Time] - Service restored
- [Time] - Root cause identified
- [Time] - Fix deployed

## Impact
- Duration: X minutes
- Users affected: Estimate
- Features impacted: List
- Data loss: Yes/No

## Root Cause
Detailed explanation of what caused the issue

## Resolution
How the issue was resolved

## Prevention
Steps to prevent similar issues:
1. Action item 1
2. Action item 2
3. Action item 3

## Action Items
- [ ] Update monitoring
- [ ] Improve testing
- [ ] Update documentation
- [ ] Team training
```

---

## Rollback Checklist

### Pre-Rollback
- [ ] Identify last working deployment
- [ ] Document current state
- [ ] Notify team
- [ ] Prepare communication

### During Rollback
- [ ] Execute rollback procedure
- [ ] Monitor progress
- [ ] Verify functionality
- [ ] Check error logs

### Post-Rollback
- [ ] Confirm site working
- [ ] Monitor metrics
- [ ] Communicate status
- [ ] Document incident
- [ ] Plan fix

---

## Contact Information

### Emergency Contacts

**Technical Lead:**
- Name: [Name]
- Phone: [Phone]
- Email: [Email]

**DevOps:**
- Name: [Name]
- Phone: [Phone]
- Email: [Email]

**Product Owner:**
- Name: [Name]
- Phone: [Phone]
- Email: [Email]

### Service Providers

**Vercel Support:**
- Email: support@vercel.com
- Dashboard: vercel.com/support

**Supabase Support:**
- Email: support@supabase.com
- Dashboard: supabase.com/support

**Cloudinary Support:**
- Email: support@cloudinary.com
- Dashboard: cloudinary.com/support

---

## Testing Rollback Procedures

### Quarterly Rollback Drill

1. **Schedule Drill:**
   - Choose low-traffic time
   - Notify team
   - Prepare test environment

2. **Execute Drill:**
   - Perform rollback on staging
   - Time the procedure
   - Document issues

3. **Review:**
   - Identify improvements
   - Update procedures
   - Train team

---

*Last Updated: November 2024*
