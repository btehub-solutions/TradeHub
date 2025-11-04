# Auth System Quick Start Guide

## 🚀 Quick Setup

### 1. Configure Supabase

```bash
# In Supabase Dashboard:
# 1. Authentication → Providers → Enable Phone
# 2. Configure SMS provider (Twilio/MessageBird)
# 3. Add provider credentials
```

### 2. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run Database Migrations

```bash
# Apply schema from supabase/schema.sql
# This creates the profiles table and policies
```

## 📱 User Flow

```
1. User enters phone → /login
2. Receives OTP via SMS
3. Enters OTP → /verify
4. New user? → /complete-profile
5. Existing user? → / (home)
```

## 🔧 Common Use Cases

### Check if User is Logged In (Client)

```typescript
'use client';
import { useUser } from '@/lib/auth/useUser';

function MyComponent() {
  const { user, profile, loading } = useUser();
  
  if (!user) return <div>Please log in</div>;
  return <div>Hello {profile?.full_name}!</div>;
}
```

### Check if User is Logged In (Server)

```typescript
import { getUser } from '@/lib/auth';

export default async function Page() {
  const user = await getUser();
  if (!user) redirect('/login');
  
  return <div>Protected content</div>;
}
```

### Protect a Page

```typescript
'use client';
import { withAuth } from '@/lib/auth/withAuth';

function ProtectedPage() {
  return <div>Protected content</div>;
}

export default withAuth(ProtectedPage);
```

### Sign Out

```typescript
'use client';
import { signOutClient } from '@/lib/auth';
import { useRouter } from 'next/navigation';

function SignOutButton() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOutClient();
    router.push('/login');
  };
  
  return <button onClick={handleSignOut}>Sign Out</button>;
}
```

## 🎨 Auth Pages

- **`/login`** - Phone number input
- **`/verify`** - OTP verification
- **`/complete-profile`** - Profile setup

## 🛡️ Protected Routes

Add to `lib/supabase/middleware.ts`:

```typescript
const protectedRoutes = [
  '/profile',
  '/listings/create',
  '/your-route-here',  // Add your protected routes
];
```

## 📦 Available Utilities

### Server-Side
```typescript
import { getUser, getUserWithProfile, signOut } from '@/lib/auth';
```

### Client-Side
```typescript
import { useUser } from '@/lib/auth/useUser';
import { signOutClient } from '@/lib/auth';
import { withAuth } from '@/lib/auth/withAuth';
```

## ⚡ Phone Number Format

```typescript
// Accepted formats:
8012345678      → +2348012345678
08012345678     → +2348012345678
2348012345678   → +2348012345678
+2348012345678  → +2348012345678

// Must start with 7, 8, or 9
// Must be 10 digits (without country code)
```

## 🐛 Debugging

```typescript
// Check auth state
const { user } = await supabase.auth.getUser();
console.log('User:', user);

// Check profile
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();
console.log('Profile:', data);
```

## 📝 Testing Flow

1. Go to `/login`
2. Enter: `8012345678`
3. Check SMS for OTP
4. Enter 6-digit code
5. Complete profile (if new user)
6. Redirected to home

## 🔐 Security Notes

- OTP expires after 60 seconds
- Resend cooldown: 60 seconds
- Phone numbers are unique
- Sessions stored in secure cookies
- RLS policies protect data

## 🎯 Next Steps

After setup:
1. Test login flow
2. Test profile creation
3. Test protected routes
4. Add sign out button to header
5. Customize auth page styling
