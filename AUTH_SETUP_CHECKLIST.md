# Phone Authentication Setup Checklist

Use this checklist to ensure your authentication system is properly configured.

## 📋 Pre-Deployment Checklist

### 1. Supabase Configuration

- [ ] **Enable Phone Authentication**
  - Go to Supabase Dashboard → Authentication → Providers
  - Enable "Phone" provider
  - Save changes

- [ ] **Configure SMS Provider**
  - Choose provider: Twilio / MessageBird / Vonage
  - Add API credentials
  - Test with a test phone number
  - Verify SMS delivery

- [ ] **Set Auth Settings**
  - Enable phone signups: ON
  - Enable phone change: ON
  - Set OTP expiration: 60 seconds (default)
  - Configure rate limiting

### 2. Environment Variables

- [ ] **Check `.env.local` file exists**
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  ```

- [ ] **Verify environment variables are loaded**
  - Restart dev server after adding variables
  - Check `process.env.NEXT_PUBLIC_SUPABASE_URL` is defined

### 3. Database Setup

- [ ] **Profiles table exists**
  - Run SQL from `supabase/schema.sql`
  - Verify table structure in Supabase dashboard

- [ ] **Row Level Security (RLS) policies**
  - Profiles: SELECT (public), INSERT/UPDATE (own)
  - Check policies are active

- [ ] **Test database connection**
  - Try fetching from profiles table
  - Verify RLS policies work

### 4. File Structure

- [ ] **Auth pages created**
  - `/app/(auth)/login/page.tsx`
  - `/app/(auth)/verify/page.tsx`
  - `/app/(auth)/complete-profile/page.tsx`

- [ ] **Auth utilities created**
  - `/lib/auth/index.ts`
  - `/lib/auth/useUser.ts`
  - `/lib/auth/withAuth.tsx`

- [ ] **UI components created**
  - `/components/ui/label.tsx`
  - `/components/ui/toast.tsx`
  - `/components/ui/toaster.tsx`
  - `/components/ui/use-toast.ts`

- [ ] **Middleware updated**
  - `/lib/supabase/middleware.ts` has protected routes

### 5. Testing

- [ ] **Test login flow**
  - Go to `/login`
  - Enter valid Nigerian phone number (e.g., 8012345678)
  - Verify OTP is sent
  - Check SMS received

- [ ] **Test OTP verification**
  - Enter 6-digit OTP
  - Verify auto-submit works
  - Test paste functionality
  - Check error handling for wrong OTP

- [ ] **Test profile creation**
  - Complete profile form
  - Verify data saves to database
  - Check redirect to home page

- [ ] **Test existing user flow**
  - Log out
  - Log in again with same number
  - Verify skips profile creation
  - Check redirects to home

- [ ] **Test protected routes**
  - Try accessing `/profile` without auth
  - Verify redirects to `/login`
  - Log in and verify access granted

- [ ] **Test sign out**
  - Click sign out button
  - Verify session cleared
  - Check redirect to login
  - Try accessing protected route

### 6. Mobile Testing

- [ ] **Test on mobile device**
  - Phone number input works
  - OTP input is touch-friendly
  - Forms are responsive
  - Buttons are easily tappable

- [ ] **Test different screen sizes**
  - Mobile (< 768px)
  - Tablet (768px - 1024px)
  - Desktop (> 1024px)

### 7. Error Handling

- [ ] **Test error scenarios**
  - Invalid phone number format
  - Wrong OTP code
  - Expired OTP
  - Network errors
  - Database errors

- [ ] **Verify error messages**
  - Clear and user-friendly
  - Displayed prominently
  - Auto-clear on retry

### 8. Security

- [ ] **HTTPS enabled** (production)
- [ ] **Secure cookies configured**
- [ ] **RLS policies active**
- [ ] **Rate limiting configured**
- [ ] **No sensitive data in logs**

### 9. UI/UX

- [ ] **Loading states work**
  - Button shows spinner
  - Inputs disabled during loading
  - Smooth transitions

- [ ] **Success states work**
  - Profile creation success message
  - Smooth redirects
  - No flashing content

- [ ] **Consistent styling**
  - Matches TradeHub brand
  - Emerald/teal color scheme
  - Clean, modern design

### 10. Documentation

- [ ] **Read `AUTH_SYSTEM.md`**
- [ ] **Read `AUTH_QUICK_START.md`**
- [ ] **Read `IMPLEMENTATION_SUMMARY.md`**
- [ ] **Team members briefed**

## 🚀 Deployment Checklist

### Before Deploying

- [ ] All tests passing
- [ ] SMS provider has sufficient credits
- [ ] Environment variables set in production
- [ ] Database migrations applied
- [ ] RLS policies verified

### After Deploying

- [ ] Test production auth flow
- [ ] Monitor SMS delivery
- [ ] Check error logs
- [ ] Verify rate limiting works
- [ ] Test from multiple devices

## 📊 Monitoring

### Metrics to Track

- [ ] **Auth conversion rate**
  - Login attempts → Successful logins
  - OTP sent → OTP verified
  - Profile started → Profile completed

- [ ] **Error rates**
  - Failed OTP verifications
  - SMS delivery failures
  - Database errors

- [ ] **Performance**
  - Page load times
  - OTP delivery time
  - Database query times

### Set Up Alerts

- [ ] SMS delivery failures
- [ ] High error rates
- [ ] Unusual login patterns
- [ ] SMS provider quota warnings

## 🔧 Troubleshooting Guide

### Issue: OTP Not Received

**Check:**
- [ ] SMS provider credentials correct
- [ ] Phone number format correct (+234...)
- [ ] SMS provider has credits
- [ ] Check Supabase logs
- [ ] Test with different phone number

### Issue: Profile Not Creating

**Check:**
- [ ] User is authenticated
- [ ] RLS policies allow INSERT
- [ ] Required fields provided
- [ ] Check browser console
- [ ] Check Supabase logs

### Issue: Redirect Loop

**Check:**
- [ ] Clear browser cookies
- [ ] Check middleware logic
- [ ] Verify sessionStorage
- [ ] Check protected routes array

### Issue: Styling Broken

**Check:**
- [ ] Tailwind CSS configured
- [ ] shadcn/ui installed correctly
- [ ] No conflicting CSS
- [ ] Build cache cleared

## ✅ Final Verification

Before marking as complete:

- [ ] All checklist items above completed
- [ ] Tested on multiple devices
- [ ] Team members can use the system
- [ ] Documentation is clear
- [ ] No critical bugs
- [ ] Performance is acceptable
- [ ] Security measures in place

## 🎉 Ready to Launch!

Once all items are checked:

1. ✅ Auth system is production-ready
2. ✅ Users can sign up and log in
3. ✅ Protected routes are secure
4. ✅ Mobile experience is smooth
5. ✅ Error handling is robust

**Congratulations! Your phone authentication system is ready!** 🚀

---

## 📞 Support

If you encounter issues not covered here:

1. Check the detailed documentation in `AUTH_SYSTEM.md`
2. Review Supabase documentation
3. Check Supabase logs and browser console
4. Test with Supabase test phone numbers
5. Verify all environment variables are set

## 📝 Notes

- Keep this checklist updated as you add features
- Share with team members for onboarding
- Use for testing after major changes
- Reference during code reviews
