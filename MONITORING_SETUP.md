# TradeHub Monitoring & Analytics Setup

Complete guide for setting up monitoring, analytics, and performance tracking for TradeHub.

## Table of Contents
- [Vercel Analytics](#vercel-analytics)
- [Vercel Speed Insights](#vercel-speed-insights)
- [Error Tracking](#error-tracking)
- [Uptime Monitoring](#uptime-monitoring)
- [Performance Budgets](#performance-budgets)
- [Custom Metrics](#custom-metrics)
- [Alerts & Notifications](#alerts--notifications)

---

## Vercel Analytics

### Overview
Vercel Analytics provides real-time insights into your application's usage and performance.

### Setup

1. **Enable Analytics in Vercel:**
   - Go to your project in Vercel Dashboard
   - Navigate to Analytics tab
   - Click "Enable Analytics"

2. **Install Package (Already Installed):**
   ```bash
   npm install @vercel/analytics
   ```

3. **Integration (Already Configured):**
   ```typescript
   // app/layout.tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Metrics Tracked

- **Page Views:** Total visits per page
- **Unique Visitors:** Distinct users
- **Top Pages:** Most visited pages
- **Top Referrers:** Traffic sources
- **Devices:** Desktop vs Mobile breakdown
- **Browsers:** Browser usage statistics
- **Countries:** Geographic distribution

### Accessing Analytics

1. Go to Vercel Dashboard
2. Select your project
3. Click "Analytics" tab
4. View real-time and historical data

---

## Vercel Speed Insights

### Overview
Speed Insights provides real-time Web Vitals data from actual users.

### Setup

1. **Install Package (Already Installed):**
   ```bash
   npm install @vercel/speed-insights
   ```

2. **Integration (Already Configured):**
   ```typescript
   // app/layout.tsx
   import { SpeedInsights } from '@vercel/speed-insights/next';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <SpeedInsights />
         </body>
       </html>
     );
   }
   ```

### Web Vitals Tracked

- **LCP (Largest Contentful Paint):** Loading performance
  - Target: < 2.5s
  - Current: Monitor in dashboard

- **FID (First Input Delay):** Interactivity
  - Target: < 100ms
  - Current: Monitor in dashboard

- **CLS (Cumulative Layout Shift):** Visual stability
  - Target: < 0.1
  - Current: Monitor in dashboard

- **FCP (First Contentful Paint):** Initial render
  - Target: < 1.8s
  - Current: Monitor in dashboard

- **TTFB (Time to First Byte):** Server response
  - Target: < 600ms
  - Current: Monitor in dashboard

### Accessing Speed Insights

1. Go to Vercel Dashboard
2. Select your project
3. Click "Speed Insights" tab
4. View real-time Web Vitals data

---

## Error Tracking

### Option 1: Vercel Logs (Built-in)

**Setup:**
1. Go to Vercel Dashboard
2. Select your project
3. Click "Logs" tab
4. Filter by error level

**Features:**
- Real-time error logs
- Function execution logs
- Build logs
- Request logs

**Limitations:**
- Basic error information
- No error grouping
- Limited retention (7 days on free tier)

### Option 2: Sentry (Recommended for Production)

**Setup:**

1. **Create Sentry Account:**
   - Sign up at sentry.io
   - Create new project (Next.js)
   - Copy DSN

2. **Install Sentry SDK:**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Configure Sentry:**
   ```bash
   npx @sentry/wizard -i nextjs
   ```

4. **Add Environment Variable:**
   ```bash
   SENTRY_DSN=your-sentry-dsn
   SENTRY_AUTH_TOKEN=your-auth-token
   ```

5. **Configure Error Boundaries:**
   ```typescript
   // app/error.tsx
   'use client';
   
   import * as Sentry from '@sentry/nextjs';
   import { useEffect } from 'react';
   
   export default function Error({ error, reset }) {
     useEffect(() => {
       Sentry.captureException(error);
     }, [error]);
     
     return (
       <div>
         <h2>Something went wrong!</h2>
         <button onClick={reset}>Try again</button>
       </div>
     );
   }
   ```

**Features:**
- Error grouping and deduplication
- Stack traces with source maps
- User context and breadcrumbs
- Performance monitoring
- Release tracking
- Email/Slack notifications

**Cost:**
- Free tier: 5,000 errors/month
- Team tier: $26/month for 50,000 errors

---

## Uptime Monitoring

### Option 1: Vercel Monitoring (Built-in)

**Features:**
- Automatic health checks
- 99.99% uptime SLA (Pro plan)
- Incident notifications

**Limitations:**
- Basic monitoring only
- No custom checks
- Pro plan required for SLA

### Option 2: UptimeRobot (Free)

**Setup:**

1. **Create Account:**
   - Sign up at uptimerobot.com
   - Free tier: 50 monitors, 5-minute intervals

2. **Add Monitor:**
   - Type: HTTP(s)
   - URL: https://tradehub.ng
   - Interval: 5 minutes
   - Alert contacts: Your email

3. **Configure Alerts:**
   - Email notifications
   - SMS (optional, paid)
   - Webhook integrations

4. **Create Status Page (Optional):**
   - Public status page
   - Custom domain support
   - Incident history

**Monitors to Create:**
- Homepage: https://tradehub.ng
- API Health: https://tradehub.ng/api/health
- Search: https://tradehub.ng/search
- Listings: https://tradehub.ng/listings

### Option 3: Better Uptime (Recommended)

**Features:**
- 30-second check intervals
- Multiple locations
- Status pages
- Incident management
- On-call scheduling

**Cost:**
- Free tier: 10 monitors
- Team tier: $18/month

---

## Performance Budgets

### Lighthouse CI (Already Configured)

**Configuration:**
```json
// lighthouse-budget.json
{
  "path": "/*",
  "resourceSizes": [
    { "resourceType": "script", "budget": 300 },
    { "resourceType": "stylesheet", "budget": 50 },
    { "resourceType": "image", "budget": 500 },
    { "resourceType": "total", "budget": 1000 }
  ],
  "timings": [
    { "metric": "first-contentful-paint", "budget": 2000 },
    { "metric": "interactive", "budget": 3500 },
    { "metric": "largest-contentful-paint", "budget": 2500 }
  ]
}
```

**GitHub Action:**
- Runs on every PR
- Fails if budgets exceeded
- Uploads reports as artifacts

### Bundle Size Monitoring

**Setup:**

1. **Install size-limit:**
   ```bash
   npm install --save-dev @size-limit/preset-next
   ```

2. **Configure:**
   ```json
   // package.json
   {
     "size-limit": [
       {
         "path": ".next/static/**/*.js",
         "limit": "300 KB"
       }
     ]
   }
   ```

3. **Add Script:**
   ```json
   {
     "scripts": {
       "size": "size-limit"
     }
   }
   ```

---

## Custom Metrics

### Database Performance

**Monitor in Supabase:**
1. Go to Supabase Dashboard
2. Click "Database" → "Query Performance"
3. Review slow queries
4. Check connection pool usage

**Key Metrics:**
- Query execution time
- Connection count
- Database size
- Table sizes
- Index usage

### API Response Times

**Track with Vercel:**
1. Go to Vercel Dashboard
2. Click "Functions" tab
3. View execution duration
4. Monitor cold starts

**Custom Logging:**
```typescript
// lib/logger.ts
export function logApiCall(endpoint: string, duration: number) {
  console.log(JSON.stringify({
    type: 'api_call',
    endpoint,
    duration,
    timestamp: new Date().toISOString()
  }));
}
```

### User Engagement

**Track Custom Events:**
```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: object) {
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', eventName, properties);
  }
}

// Usage
trackEvent('listing_created', { category: 'electronics' });
trackEvent('search_performed', { query: 'laptop' });
trackEvent('contact_seller', { method: 'whatsapp' });
```

---

## Alerts & Notifications

### Vercel Deployment Notifications

**Setup:**
1. Go to Project Settings → Notifications
2. Enable notifications for:
   - Deployment started
   - Deployment succeeded
   - Deployment failed
   - Domain configuration

**Integrations:**
- Email
- Slack
- Discord
- Custom webhooks

### Error Rate Alerts (Sentry)

**Configure:**
1. Go to Sentry project settings
2. Click "Alerts" → "Create Alert"
3. Set conditions:
   - Error count > 10 in 5 minutes
   - New issue detected
   - Regression detected

**Notification Channels:**
- Email
- Slack
- PagerDuty
- Webhooks

### Uptime Alerts (UptimeRobot)

**Configure:**
1. Go to My Settings → Alert Contacts
2. Add email addresses
3. Set alert preferences:
   - When monitor goes down
   - When monitor comes back up
   - After X minutes of downtime

---

## Monitoring Checklist

### Daily Checks
- [ ] Check error rate in Vercel logs
- [ ] Review Speed Insights Web Vitals
- [ ] Monitor uptime status
- [ ] Check database performance

### Weekly Checks
- [ ] Review Analytics trends
- [ ] Analyze slow API endpoints
- [ ] Check bundle size changes
- [ ] Review user feedback

### Monthly Checks
- [ ] Performance budget review
- [ ] Cost optimization analysis
- [ ] Security audit
- [ ] Dependency updates

---

## Dashboard Setup

### Create Custom Dashboard

**Recommended Tools:**
- Grafana (self-hosted)
- Datadog (paid)
- New Relic (paid)

**Metrics to Display:**
1. **Traffic:**
   - Page views
   - Unique visitors
   - Bounce rate

2. **Performance:**
   - Web Vitals scores
   - API response times
   - Error rates

3. **Business:**
   - New listings created
   - User signups
   - Search queries

4. **Infrastructure:**
   - Function execution time
   - Database connections
   - Storage usage

---

## Cost Optimization

### Monitor Usage

**Vercel:**
- Function execution time
- Bandwidth usage
- Build minutes

**Supabase:**
- Database size
- Storage usage
- Bandwidth
- Auth users

**Cloudinary:**
- Storage
- Transformations
- Bandwidth

### Set Budget Alerts

1. **Vercel:**
   - Go to Team Settings → Billing
   - Set spending limit
   - Enable email alerts

2. **Supabase:**
   - Monitor usage in dashboard
   - Upgrade plan if needed

3. **Cloudinary:**
   - Set usage alerts
   - Optimize transformations

---

## Troubleshooting

### High Error Rate

**Steps:**
1. Check Vercel logs for patterns
2. Review recent deployments
3. Check external service status
4. Rollback if necessary

### Slow Performance

**Steps:**
1. Check Speed Insights for regressions
2. Review bundle size changes
3. Analyze slow database queries
4. Check CDN cache hit rate

### High Costs

**Steps:**
1. Review function execution logs
2. Optimize database queries
3. Reduce image transformations
4. Enable more aggressive caching

---

*Last Updated: November 2024*
