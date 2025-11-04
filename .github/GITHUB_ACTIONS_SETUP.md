# GitHub Actions Setup Guide

Complete guide for setting up CI/CD with GitHub Actions for TradeHub.

## Overview

TradeHub uses GitHub Actions for:
- ✅ Automated testing and linting
- ✅ Type checking
- ✅ Security scanning
- ✅ Performance budgets
- ✅ Preview deployments for PRs
- ✅ Production deployments

---

## Prerequisites

- GitHub repository with admin access
- Vercel account connected to GitHub
- Environment variables ready

---

## Step 1: Configure GitHub Secrets

### 1.1 Access Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### 1.2 Add Required Secrets

Add each of the following secrets:

#### Vercel Secrets

**VERCEL_TOKEN**
- **Value:** Your Vercel API token
- **How to get:**
  1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
  2. Click "Create Token"
  3. Name: "GitHub Actions"
  4. Scope: Full Account
  5. Copy the token

**VERCEL_ORG_ID**
- **Value:** Your Vercel organization/team ID
- **How to get:**
  1. Go to Vercel project settings
  2. Look for "Project ID" section
  3. Copy "Team ID" or "Org ID"

**VERCEL_PROJECT_ID**
- **Value:** Your TradeHub project ID
- **How to get:**
  1. Go to Vercel project settings
  2. Copy "Project ID"

#### Environment Variables (for builds)

**NEXT_PUBLIC_APP_URL**
```
https://tradehub.ng
```

**NEXT_PUBLIC_SUPABASE_URL**
```
https://your-project.supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
your-anon-key-here
```

**NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME**
```
your-cloud-name
```

**NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET**
```
tradehub_listings
```

---

## Step 2: Verify Workflow Files

### 2.1 Check Files Exist

Verify these files are in your repository:

```
.github/
└── workflows/
    ├── ci.yml                      # Main CI/CD pipeline
    └── performance-budget.yml      # Performance checks
```

### 2.2 Review CI Workflow

The CI workflow (`.github/workflows/ci.yml`) includes:

**Jobs:**
1. **Lint** - ESLint checks
2. **Type Check** - TypeScript validation
3. **Build** - Next.js build
4. **Security Scan** - Dependency audit
5. **Deploy Preview** - PR deployments
6. **Deploy Production** - Main branch deployments

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

### 2.3 Review Performance Workflow

The performance workflow (`.github/workflows/performance-budget.yml`) includes:

**Jobs:**
1. **Lighthouse** - Performance audits
2. **Bundle Size** - Size limit checks

**Triggers:**
- Pull requests to `main` or `develop`
- Push to `main`

---

## Step 3: Test GitHub Actions

### 3.1 Create Test PR

1. **Create a new branch:**
   ```bash
   git checkout -b test/github-actions
   ```

2. **Make a small change:**
   ```bash
   echo "# Test" >> TEST.md
   git add TEST.md
   git commit -m "Test GitHub Actions"
   git push origin test/github-actions
   ```

3. **Create Pull Request:**
   - Go to GitHub repository
   - Click "Pull requests" → "New pull request"
   - Select your test branch
   - Create PR

### 3.2 Monitor Workflow

1. Go to **Actions** tab in GitHub
2. Watch workflows execute:
   - ✅ CI/CD Pipeline
   - ✅ Performance Budget Check

3. Check for:
   - All jobs passing (green checkmarks)
   - No errors in logs
   - Preview deployment created

### 3.3 Verify Preview Deployment

1. Look for comment on PR from Vercel bot
2. Click preview URL
3. Test the preview deployment
4. Verify changes are visible

---

## Step 4: Configure Branch Protection

### 4.1 Enable Branch Protection

1. Go to **Settings** → **Branches**
2. Click "Add rule"
3. Branch name pattern: `main`

### 4.2 Configure Rules

Enable these protections:

**Require Status Checks:**
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

**Required Checks:**
- ✅ Lint Code
- ✅ TypeScript Type Check
- ✅ Build Application
- ✅ Security Scan

**Additional Settings:**
- ✅ Require pull request reviews before merging (1 approval)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require linear history
- ✅ Include administrators

### 4.3 Save Rules

Click "Create" or "Save changes"

---

## Step 5: Configure Notifications

### 5.1 Email Notifications

GitHub automatically sends emails for:
- Workflow failures
- PR status updates
- Deployment notifications

### 5.2 Slack Integration (Optional)

1. **Install GitHub App:**
   - Go to Slack workspace
   - Install GitHub app
   - Connect to repository

2. **Configure Notifications:**
   ```
   /github subscribe owner/tradehub
   /github subscribe owner/tradehub deployments
   /github subscribe owner/tradehub workflows
   ```

3. **Customize:**
   ```
   /github subscribe owner/tradehub reviews comments
   ```

---

## Workflow Details

### CI/CD Pipeline

**Trigger Events:**
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

**Job Flow:**
```
Lint → Type Check → Build → Security Scan
                              ↓
                    Deploy Preview (PRs)
                              ↓
                    Deploy Production (main)
```

**Execution Time:**
- Lint: ~30 seconds
- Type Check: ~45 seconds
- Build: ~2-3 minutes
- Security Scan: ~1 minute
- Deploy: ~2-3 minutes
- **Total: ~6-8 minutes**

### Performance Budget

**Checks:**
- Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Bundle size limits
- Resource size budgets
- Timing budgets

**Thresholds:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- Bundle size: < 300 KB

---

## Troubleshooting

### Workflow Fails: Missing Secrets

**Error:**
```
Error: Unable to find Vercel token
```

**Solution:**
1. Verify VERCEL_TOKEN is set in GitHub Secrets
2. Check token hasn't expired
3. Regenerate token if needed

### Build Fails: Environment Variables

**Error:**
```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**Solution:**
1. Add missing variable to GitHub Secrets
2. Update workflow file to include variable
3. Re-run workflow

### Deploy Fails: Vercel Connection

**Error:**
```
Error: Project not found
```

**Solution:**
1. Verify VERCEL_PROJECT_ID is correct
2. Check VERCEL_ORG_ID matches your team
3. Ensure Vercel token has correct permissions

### Performance Budget Fails

**Error:**
```
Budget exceeded: script size is 350 KB (limit: 300 KB)
```

**Solution:**
1. Analyze bundle with `npm run analyze`
2. Optimize imports
3. Code split large components
4. Update budget if necessary

---

## Maintenance

### Weekly Tasks

- [ ] Review failed workflows
- [ ] Update dependencies
- [ ] Check for security alerts
- [ ] Monitor build times

### Monthly Tasks

- [ ] Review and update budgets
- [ ] Optimize workflow performance
- [ ] Update GitHub Actions versions
- [ ] Review branch protection rules

### Quarterly Tasks

- [ ] Audit secrets and tokens
- [ ] Review workflow efficiency
- [ ] Update documentation
- [ ] Team training on CI/CD

---

## Advanced Configuration

### Custom Workflow Triggers

**Deploy on Tag:**
```yaml
on:
  push:
    tags:
      - 'v*'
```

**Scheduled Runs:**
```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
```

**Manual Trigger:**
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'staging'
```

### Matrix Builds

Test multiple Node versions:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

### Caching Dependencies

Speed up builds:
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

---

## Security Best Practices

### Secrets Management

1. **Never commit secrets to code**
2. **Use GitHub Secrets for sensitive data**
3. **Rotate tokens regularly (every 90 days)**
4. **Limit token scope to minimum required**
5. **Use separate tokens for different purposes**

### Workflow Security

1. **Pin action versions:**
   ```yaml
   uses: actions/checkout@v4  # Good
   uses: actions/checkout@main  # Avoid
   ```

2. **Review third-party actions:**
   - Check source code
   - Verify maintainer
   - Check usage stats

3. **Limit permissions:**
   ```yaml
   permissions:
     contents: read
     deployments: write
   ```

---

## Monitoring

### GitHub Actions Dashboard

View workflow status:
1. Go to **Actions** tab
2. Filter by workflow
3. Check success rate
4. Review execution times

### Metrics to Track

- **Success Rate:** Target > 95%
- **Build Time:** Target < 5 minutes
- **Queue Time:** Target < 1 minute
- **Failure Rate:** Target < 5%

### Alerts

Set up alerts for:
- Workflow failures
- Long build times
- Security vulnerabilities
- Budget violations

---

## Resources

- **GitHub Actions Docs:** https://docs.github.com/actions
- **Vercel GitHub Integration:** https://vercel.com/docs/git/vercel-for-github
- **Workflow Syntax:** https://docs.github.com/actions/reference/workflow-syntax-for-github-actions
- **Security Hardening:** https://docs.github.com/actions/security-guides

---

*Last Updated: November 2024*
