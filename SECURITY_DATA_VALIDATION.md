# Security & Data Validation Checklist

## 🔒 Security Testing Checklist

### Row Level Security (RLS) Policies

#### Verify RLS Enabled
- [ ] Check RLS enabled on `profiles` table
- [ ] Check RLS enabled on `listings` table
- [ ] Check RLS enabled on `categories` table
- [ ] Verify no tables bypass RLS

#### Test Profile RLS Policies
```sql
-- Test as authenticated user
SELECT * FROM profiles; -- Should see all profiles
SELECT * FROM profiles WHERE id = 'other-user-id'; -- Should see other profiles
UPDATE profiles SET full_name = 'Test' WHERE id = 'other-user-id'; -- Should FAIL
DELETE FROM profiles WHERE id = 'other-user-id'; -- Should FAIL
```

- [ ] Users can view all profiles (public read)
- [ ] Users can only update their own profile
- [ ] Users can only delete their own profile
- [ ] Users can insert their own profile on signup
- [ ] Anonymous users cannot modify profiles

#### Test Listing RLS Policies
```sql
-- Test as authenticated user
SELECT * FROM listings; -- Should see all listings
SELECT * FROM listings WHERE user_id = 'other-user-id'; -- Should see
UPDATE listings SET title = 'Hacked' WHERE user_id = 'other-user-id'; -- Should FAIL
DELETE FROM listings WHERE user_id = 'other-user-id'; -- Should FAIL
```

- [ ] All users can view all listings (public read)
- [ ] Users can only create listings for themselves
- [ ] Users can only update their own listings
- [ ] Users can only delete their own listings
- [ ] Anonymous users can view but not modify

#### Test Categories RLS
- [ ] All users can read categories
- [ ] Only admins can create categories (if restricted)
- [ ] Only admins can update categories
- [ ] Only admins can delete categories

#### Test Storage Bucket Policies
- [ ] Public read access for listing images
- [ ] Public read access for profile pictures
- [ ] Only authenticated users can upload
- [ ] Users can only delete their own uploads
- [ ] File size limits enforced (5MB)
- [ ] File type restrictions enforced

---

### API Route Protection

#### Authentication Middleware
- [ ] All protected routes check authentication
- [ ] Unauthenticated requests return 401
- [ ] Invalid tokens return 401
- [ ] Expired tokens return 401

#### Test Protected Endpoints
```bash
# Test without auth token
curl -X POST https://your-app.com/api/listings -d '{...}' # Should return 401

# Test with invalid token
curl -X POST https://your-app.com/api/listings \
  -H "Authorization: Bearer invalid-token" \
  -d '{...}' # Should return 401

# Test with valid token
curl -X POST https://your-app.com/api/listings \
  -H "Authorization: Bearer valid-token" \
  -d '{...}' # Should succeed
```

#### API Endpoints to Test
- [ ] `POST /api/listings` - Requires auth
- [ ] `PUT /api/listings/:id` - Requires auth + ownership
- [ ] `DELETE /api/listings/:id` - Requires auth + ownership
- [ ] `PUT /api/profile` - Requires auth
- [ ] `GET /api/profile` - Requires auth
- [ ] `GET /api/listings` - Public (no auth required)
- [ ] `GET /api/categories` - Public (no auth required)

#### Authorization Testing
- [ ] User A cannot edit User B's listings
- [ ] User A cannot delete User B's listings
- [ ] User A cannot edit User B's profile
- [ ] Admin roles work correctly (if implemented)

---

### Sensitive Data Protection

#### Environment Variables
- [ ] `.env.local` not committed to git
- [ ] `.env.example` has placeholder values only
- [ ] No API keys in client-side code
- [ ] No database credentials in client code
- [ ] Supabase keys properly configured (anon key only)

#### Check for Exposed Secrets
```bash
# Search for potential secrets in code
grep -r "SUPABASE_SERVICE_ROLE_KEY" app/
grep -r "sk_live_" app/
grep -r "password" app/
grep -r "secret" app/
```

- [ ] No service role keys in client code
- [ ] No hardcoded passwords
- [ ] No API keys in source code
- [ ] No database connection strings in client
- [ ] No private keys committed

#### Client-Side Data
- [ ] User passwords never sent to client
- [ ] OTP codes not logged
- [ ] Phone numbers properly masked (if needed)
- [ ] Email addresses not exposed unnecessarily
- [ ] User IDs are UUIDs (not sequential)

---

### Input Validation & Sanitization

#### Form Input Validation
- [ ] All required fields validated
- [ ] String length limits enforced
- [ ] Numeric ranges validated
- [ ] Email format validated
- [ ] Phone number format validated
- [ ] URL format validated (if applicable)
- [ ] Date format validated

#### Server-Side Validation
```typescript
// Example validation checks
- [ ] Title: 10-100 characters
- [ ] Description: 50-2000 characters
- [ ] Price: Positive number, max 1 billion
- [ ] Phone: Valid Nigerian format (+234...)
- [ ] Category: Exists in database
- [ ] Location: Valid state/LGA
- [ ] Images: Valid file types (jpg, png, webp)
- [ ] Images: Max size 5MB per file
```

#### SQL Injection Prevention
- [ ] All queries use parameterized statements
- [ ] No string concatenation in SQL
- [ ] Supabase client handles escaping
- [ ] Test with SQL injection payloads:
  - `' OR '1'='1`
  - `'; DROP TABLE listings; --`
  - `admin'--`
  - `1' UNION SELECT * FROM profiles--`

#### XSS Prevention
- [ ] All user input escaped in HTML
- [ ] React automatically escapes (verify)
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] Test with XSS payloads:
  - `<script>alert('XSS')</script>`
  - `<img src=x onerror=alert('XSS')>`
  - `javascript:alert('XSS')`
  - `<iframe src="javascript:alert('XSS')">`

#### File Upload Validation
- [ ] File type whitelist enforced
- [ ] File size limits enforced (5MB)
- [ ] File extension validated
- [ ] MIME type validated
- [ ] File content validated (not just extension)
- [ ] Malicious file names rejected
- [ ] Test with:
  - Oversized files (>5MB)
  - Wrong file types (.exe, .php, .js)
  - Files with no extension
  - Files with double extensions (.jpg.exe)
  - SVG files with embedded scripts

---

### CORS Configuration

#### CORS Headers
- [ ] CORS properly configured for API routes
- [ ] Only allowed origins can access API
- [ ] Credentials handled correctly
- [ ] Preflight requests work

#### Test CORS
```bash
# Test from different origin
curl -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS https://your-app.com/api/listings
```

- [ ] Requests from allowed origins succeed
- [ ] Requests from disallowed origins fail
- [ ] Wildcard (*) not used in production
- [ ] Credentials flag set correctly

---

### Session & Token Security

#### JWT/Session Tokens
- [ ] Tokens have expiration time
- [ ] Tokens stored securely (httpOnly cookies or secure storage)
- [ ] Tokens not exposed in URLs
- [ ] Refresh token mechanism works
- [ ] Logout invalidates tokens

#### Test Token Security
- [ ] Expired tokens rejected
- [ ] Tampered tokens rejected
- [ ] Stolen tokens can be revoked
- [ ] Token refresh works correctly
- [ ] Concurrent sessions handled

---

### Rate Limiting & DDoS Protection

#### Rate Limiting
- [ ] API endpoints have rate limits
- [ ] Login attempts limited (prevent brute force)
- [ ] OTP requests limited (prevent spam)
- [ ] File uploads limited per user
- [ ] Listing creation limited per user/day

#### Test Rate Limiting
```bash
# Send multiple requests rapidly
for i in {1..100}; do
  curl -X POST https://your-app.com/api/listings
done
```

- [ ] Excessive requests return 429 (Too Many Requests)
- [ ] Rate limit resets after time period
- [ ] Rate limit per IP address
- [ ] Rate limit per user account

---

### HTTPS & Transport Security

#### SSL/TLS Configuration
- [ ] HTTPS enforced (no HTTP)
- [ ] Valid SSL certificate
- [ ] TLS 1.2+ required
- [ ] HSTS header set
- [ ] Secure cookies (Secure flag)

#### Security Headers
```bash
# Check security headers
curl -I https://your-app.com
```

- [ ] `Strict-Transport-Security` header present
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY` or `SAMEORIGIN`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Content-Security-Policy` configured
- [ ] `Referrer-Policy` set

---

### Third-Party Integrations

#### Supabase Security
- [ ] Anon key used in client (not service role key)
- [ ] Service role key only in server/API routes
- [ ] RLS policies enforced
- [ ] Database backups enabled
- [ ] Audit logs enabled

#### WhatsApp Integration
- [ ] Phone numbers validated before opening WhatsApp
- [ ] No sensitive data in WhatsApp links
- [ ] Pre-filled messages safe

#### SMS/OTP Provider
- [ ] OTP codes expire (10 minutes)
- [ ] OTP codes single-use
- [ ] Rate limiting on OTP requests
- [ ] Phone number verification
- [ ] No OTP codes logged

---

## ✅ Data Validation Testing

### Input Field Validation

#### Text Fields
- [ ] **Title**
  - Min length: 10 characters
  - Max length: 100 characters
  - No HTML tags
  - No script tags
  - Special characters allowed: `-`, `'`, `,`, `.`
  - Test: Empty, too short, too long, HTML, emoji

- [ ] **Description**
  - Min length: 50 characters
  - Max length: 2000 characters
  - Line breaks preserved
  - No HTML tags (or sanitized)
  - Test: Empty, too short, too long, HTML, markdown

- [ ] **Full Name**
  - Min length: 2 characters
  - Max length: 100 characters
  - Letters, spaces, hyphens, apostrophes
  - Test: Empty, numbers, special chars

#### Numeric Fields
- [ ] **Price**
  - Positive numbers only
  - Max value: 1,000,000,000 (1 billion)
  - Decimal places: 0 or 2
  - No negative numbers
  - No zero (or allow for "Free")
  - Test: -100, 0, 0.5, 999999999999, "abc", null

#### Phone Numbers
- [ ] **Phone Validation**
  - Format: +234XXXXXXXXXX (13 digits total)
  - Starts with +234
  - Followed by 10 digits
  - No spaces or dashes (or auto-format)
  - Test: Invalid formats, wrong country code, too short, too long

#### Dropdowns/Selects
- [ ] **Category**
  - Must select from existing categories
  - Cannot submit invalid category ID
  - Test: Empty, non-existent ID, SQL injection

- [ ] **Condition**
  - Must be: "new", "used", or "refurbished"
  - Case-insensitive
  - Test: Empty, invalid value, SQL injection

- [ ] **Location (State/LGA)**
  - Must select from valid Nigerian states
  - LGA must belong to selected state
  - Test: Empty, invalid state, mismatched LGA

#### File Uploads
- [ ] **Images**
  - Accepted types: JPG, JPEG, PNG, WEBP
  - Max size: 5MB per file
  - Max files: 5 per listing
  - Min dimensions: 300x300px (recommended)
  - Max dimensions: 4000x4000px
  - Test: PDF, EXE, oversized, 0 bytes, corrupt file

---

### Edge Cases Testing

#### Empty States
- [ ] Submit form with all fields empty
- [ ] Submit form with only required fields
- [ ] Submit form with whitespace only
- [ ] Upload listing with no images
- [ ] Search with empty query
- [ ] Filter with no selections

#### Boundary Values
- [ ] Title exactly 10 characters
- [ ] Title exactly 100 characters
- [ ] Description exactly 50 characters
- [ ] Description exactly 2000 characters
- [ ] Price = 1 (minimum)
- [ ] Price = 1,000,000,000 (maximum)
- [ ] Upload exactly 5 images
- [ ] Image exactly 5MB

#### Special Characters
- [ ] Title with emoji: "iPhone 📱 for sale"
- [ ] Description with line breaks
- [ ] Name with apostrophe: "O'Brien"
- [ ] Name with hyphen: "Mary-Jane"
- [ ] Price with commas: "1,000,000"
- [ ] Phone with spaces: "+234 803 123 4567"

#### Unicode & Internationalization
- [ ] Text with accents: "Café"
- [ ] Text with diacritics: "Naïve"
- [ ] Arabic/RTL text (if applicable)
- [ ] Chinese characters (if applicable)
- [ ] Emoji in various fields
- [ ] Very long single word (no spaces)

#### Malicious Input
- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] Path traversal: `../../etc/passwd`
- [ ] Command injection: `; rm -rf /`
- [ ] LDAP injection
- [ ] XML injection
- [ ] NoSQL injection

---

### Error Handling Validation

#### User-Friendly Error Messages
- [ ] "Title must be at least 10 characters" (not "Invalid input")
- [ ] "Please enter a valid phone number" (not "Regex failed")
- [ ] "Image size must be less than 5MB" (not "File too large")
- [ ] "Please select a category" (not "Category required")
- [ ] No technical jargon in error messages
- [ ] No stack traces shown to users
- [ ] No database error messages exposed

#### Error Message Testing
- [ ] Each validation rule has clear error message
- [ ] Multiple errors shown at once (or one at a time)
- [ ] Error messages displayed near relevant field
- [ ] Error messages accessible (screen readers)
- [ ] Error messages dismissible
- [ ] Error messages in user's language

#### Network Error Handling
- [ ] API timeout shows friendly message
- [ ] Network failure shows retry option
- [ ] 404 errors show helpful page
- [ ] 500 errors show generic message (not details)
- [ ] Failed image uploads show error
- [ ] Failed form submission preserves data

---

### Database Constraints

#### Test Database Constraints
```sql
-- Test NOT NULL constraints
INSERT INTO listings (title, description) VALUES (NULL, 'Test'); -- Should FAIL

-- Test UNIQUE constraints
INSERT INTO profiles (id, phone) VALUES ('uuid', '+2348031234567');
INSERT INTO profiles (id, phone) VALUES ('uuid2', '+2348031234567'); -- Should FAIL

-- Test FOREIGN KEY constraints
INSERT INTO listings (user_id) VALUES ('non-existent-uuid'); -- Should FAIL

-- Test CHECK constraints
INSERT INTO listings (price) VALUES (-100); -- Should FAIL (if CHECK exists)
```

- [ ] NOT NULL constraints enforced
- [ ] UNIQUE constraints enforced
- [ ] FOREIGN KEY constraints enforced
- [ ] CHECK constraints enforced (if any)
- [ ] Default values work correctly

---

## 🔐 Security Best Practices Checklist

### Code Security
- [ ] No `eval()` or `Function()` constructor
- [ ] No `innerHTML` without sanitization
- [ ] No `document.write()`
- [ ] Dependencies up to date (no known vulnerabilities)
- [ ] No console.log() with sensitive data in production
- [ ] Error messages don't reveal system info

### Authentication Security
- [ ] Passwords never stored in plain text (N/A for OTP)
- [ ] OTP codes expire after 10 minutes
- [ ] OTP codes single-use only
- [ ] Account lockout after failed attempts
- [ ] Secure password reset flow (if applicable)
- [ ] Two-factor authentication (future consideration)

### Data Privacy
- [ ] GDPR compliance (if applicable)
- [ ] User data deletion capability
- [ ] Privacy policy available
- [ ] Terms of service available
- [ ] Cookie consent (if using cookies)
- [ ] Data retention policy

### Monitoring & Logging
- [ ] Security events logged
- [ ] Failed login attempts logged
- [ ] Suspicious activity detected
- [ ] No sensitive data in logs
- [ ] Logs stored securely
- [ ] Log retention policy

---

## 🧪 Security Testing Tools

### Automated Security Scanning
```bash
# npm audit for dependency vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# OWASP ZAP (Zed Attack Proxy)
# Download and run against your app
# https://www.zaproxy.org/

# Snyk for vulnerability scanning
npm install -g snyk
snyk test
```

### Manual Testing Tools
- [ ] **Burp Suite Community** - Web security testing
- [ ] **OWASP ZAP** - Automated security scanner
- [ ] **Postman** - API testing
- [ ] **Browser DevTools** - Network/console inspection
- [ ] **SQLMap** - SQL injection testing (use carefully)

---

## 📋 Security Sign-off

### Security Tester Information
- **Tester Name:** _______________
- **Date:** _______________
- **Environment:** _______________

### Security Test Results
- **Critical Issues:** _______________
- **High Issues:** _______________
- **Medium Issues:** _______________
- **Low Issues:** _______________

### Critical Security Checks
- [ ] RLS policies working correctly
- [ ] Authentication required for protected routes
- [ ] No sensitive data exposed to client
- [ ] Input validation on all forms
- [ ] XSS prevention implemented
- [ ] SQL injection prevention verified
- [ ] File upload security verified
- [ ] HTTPS enforced
- [ ] Security headers configured

### Sign-off
- [ ] All critical issues resolved
- [ ] All high issues resolved or accepted
- [ ] Security documentation complete
- [ ] Team trained on security practices

**Approved by:** _______________
**Date:** _______________

---

**Last Updated:** {{ DATE }}
**Version:** 1.0
