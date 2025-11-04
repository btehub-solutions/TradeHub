# TradeHub Phone Authentication System

Complete phone-based authentication system using Supabase Auth with OTP verification.

## Features

- ✅ Phone number authentication with Nigerian format (+234)
- ✅ OTP verification via SMS
- ✅ Auto-submit on 6th digit entry
- ✅ Resend OTP with 60-second cooldown
- ✅ Profile completion flow for new users
- ✅ Protected routes with middleware
- ✅ Client and server-side auth utilities
- ✅ Mobile-first responsive design
- ✅ Form validation with Zod
- ✅ Loading states and error handling

## File Structure

```
app/
├── (auth)/
│   ├── login/page.tsx              # Phone number input
│   ├── verify/page.tsx             # OTP verification
│   └── complete-profile/page.tsx   # First-time user profile setup

lib/
├── auth/
│   ├── index.ts                    # Server-side auth utilities
│   ├── useUser.ts                  # Client-side auth hook
│   └── withAuth.tsx                # Protected route HOC
├── supabase/
│   ├── client.ts                   # Browser client
│   ├── server.ts                   # Server client
│   └── middleware.ts               # Auth middleware

components/ui/
├── button.tsx
├── input.tsx
├── label.tsx
├── card.tsx
├── toast.tsx
├── toaster.tsx
└── use-toast.ts
```

## Authentication Flow

### 1. Login Page (`/login`)

**Features:**
- Nigerian phone number input (+234 prefix)
- Validates 10-digit format starting with 7, 8, or 9
- Zod validation for phone numbers
- Sends OTP via Supabase Auth
- Stores phone number in sessionStorage
- Redirects to `/verify` on success

**Usage:**
```typescript
// Phone validation schema
const phoneSchema = z.string()
  .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
  .refine((val) => ['7', '8', '9'].includes(val[0]), {
    message: 'Nigerian numbers must start with 7, 8, or 9',
  });
```

### 2. Verify Page (`/verify`)

**Features:**
- 6-digit OTP input with individual boxes
- Auto-focus next input on digit entry
- Auto-submit when all 6 digits entered
- Paste support for OTP codes
- Resend OTP with 60-second cooldown timer
- Backspace navigation between inputs
- Verifies OTP with Supabase
- Checks if profile exists
- Redirects to `/complete-profile` for new users
- Redirects to `/` for existing users

**Key Functions:**
```typescript
// Auto-submit on 6th digit
if (index === 5 && value && newOtp.every(digit => digit !== '')) {
  handleVerifyOTP(newOtp.join(''));
}

// Paste support
const handlePaste = (e: React.ClipboardEvent) => {
  const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
  // Auto-submit if complete
  if (pastedData.length === 6) {
    handleVerifyOTP(pastedData);
  }
};
```

### 3. Complete Profile Page (`/complete-profile`)

**Features:**
- Collects full name, state, and city/location
- React Hook Form with Zod validation
- Nigerian states dropdown
- Creates or updates profile in database
- Success animation before redirect
- Redirects to home page on completion

**Validation Schema:**
```typescript
const profileSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  location: z.string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location is too long'),
  state: z.string()
    .min(1, 'Please select a state'),
});
```

## Auth Utilities

### Server-Side (`lib/auth/index.ts`)

```typescript
// Get current user
const user = await getUser();

// Get user with profile
const { user, profile } = await getUserWithProfile();

// Sign out
await signOut();

// Format phone number
const formatted = formatNigerianPhone('8012345678'); // Returns: +2348012345678

// Validate phone number
const isValid = validateNigerianPhone('8012345678'); // Returns: true/false
```

### Client-Side Hook (`lib/auth/useUser.ts`)

```typescript
'use client';

import { useUser } from '@/lib/auth/useUser';

function MyComponent() {
  const { user, profile, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>Not authenticated</div>;

  return <div>Welcome, {profile?.full_name}!</div>;
}
```

### Protected Route HOC (`lib/auth/withAuth.tsx`)

```typescript
'use client';

import { withAuth } from '@/lib/auth/withAuth';

function ProtectedPage() {
  return <div>This page requires authentication</div>;
}

// Wrap component to require authentication
export default withAuth(ProtectedPage);

// Require authentication AND complete profile
export default withAuth(ProtectedPage, { requireProfile: true });
```

## Middleware Protection

The middleware automatically handles:

1. **Protected Routes** - Redirects to `/login` if not authenticated
   - `/profile/*`
   - `/listings/create`

2. **Auth Routes** - Redirects authenticated users away
   - `/login` → `/` (if profile complete) or `/complete-profile`
   - `/verify` → `/` (if profile complete) or `/complete-profile`
   - `/complete-profile` → `/` (if profile already complete)

**Add more protected routes:**
```typescript
// In lib/supabase/middleware.ts
const protectedRoutes = [
  '/profile', 
  '/listings/create',
  '/messages',  // Add your route
];
```

## Database Schema

The auth system uses the `profiles` table:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  phone_number TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT,
  state TEXT,
  bio TEXT,
  whatsapp_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Supabase Setup

### 1. Enable Phone Auth

In Supabase Dashboard:
1. Go to Authentication → Providers
2. Enable Phone provider
3. Configure SMS provider (Twilio, MessageBird, etc.)
4. Add your provider credentials

### 2. Configure Phone Settings

```
Phone Auth Settings:
- Enable Phone Signups: ON
- Enable Phone Change: ON
- Minimum Password Length: N/A (using OTP only)
```

### 3. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Usage Examples

### Example 1: Display User Info

```typescript
'use client';

import { useUser } from '@/lib/auth/useUser';

export function UserProfile() {
  const { user, profile, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h2>{profile?.full_name}</h2>
      <p>{profile?.location}, {profile?.state}</p>
      <p>{user.phone}</p>
    </div>
  );
}
```

### Example 2: Protected Page Component

```typescript
'use client';

import { withAuth } from '@/lib/auth/withAuth';

function CreateListingPage() {
  return (
    <div>
      <h1>Create New Listing</h1>
      {/* Your form here */}
    </div>
  );
}

export default withAuth(CreateListingPage, { requireProfile: true });
```

### Example 3: Sign Out Button

```typescript
'use client';

import { signOutClient } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutClient();
    router.push('/login');
    router.refresh();
  };

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign Out
    </Button>
  );
}
```

### Example 4: Server Component with Auth

```typescript
import { getUserWithProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const data = await getUserWithProfile();

  if (!data) {
    redirect('/login');
  }

  const { user, profile } = data;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile?.full_name}</p>
      <p>Phone: {user.phone}</p>
      <p>Location: {profile?.location}, {profile?.state}</p>
    </div>
  );
}
```

## Styling

The auth pages use:
- **Tailwind CSS** for styling
- **shadcn/ui** components (Button, Input, Card, Label)
- **Lucide React** icons
- **Mobile-first** responsive design
- **Emerald/Teal gradient** backgrounds

### Color Scheme

```css
Background: bg-gradient-to-br from-emerald-600 to-teal-700
Primary: emerald-600
Accent: emerald-100
```

## Error Handling

All auth pages include:
- Form validation errors
- API error messages
- Loading states
- User-friendly error messages
- Automatic error clearing on retry

## Security Features

1. **Phone Validation** - Ensures valid Nigerian phone format
2. **OTP Verification** - 6-digit code via SMS
3. **Session Management** - Secure cookie-based sessions
4. **Protected Routes** - Middleware-level protection
5. **Row Level Security** - Database-level access control
6. **HTTPS Only** - Secure communication

## Testing Checklist

- [ ] Phone number validation works correctly
- [ ] OTP is sent successfully
- [ ] OTP verification works
- [ ] Profile creation works for new users
- [ ] Existing users skip profile creation
- [ ] Protected routes redirect to login
- [ ] Authenticated users can't access auth pages
- [ ] Sign out works correctly
- [ ] Mobile responsive design works
- [ ] Error messages display properly
- [ ] Loading states show correctly
- [ ] Resend OTP cooldown works

## Troubleshooting

### OTP Not Received
1. Check Supabase phone provider configuration
2. Verify SMS provider credentials
3. Check phone number format (+234...)
4. Review Supabase logs

### Profile Not Creating
1. Check database permissions (RLS policies)
2. Verify user is authenticated
3. Check profile table schema
4. Review browser console for errors

### Redirect Issues
1. Clear browser cache and cookies
2. Check middleware configuration
3. Verify route paths are correct
4. Review sessionStorage data

## Next Steps

1. **Add WhatsApp Integration** - Allow users to add WhatsApp number
2. **Profile Photos** - Add avatar upload with Cloudinary
3. **Email Backup** - Optional email for account recovery
4. **Two-Factor Auth** - Additional security layer
5. **Social Login** - Google, Facebook integration
6. **Rate Limiting** - Prevent OTP spam
7. **Analytics** - Track auth conversion rates

## Support

For issues or questions:
1. Check Supabase documentation
2. Review error logs in browser console
3. Check Supabase dashboard logs
4. Verify environment variables are set
