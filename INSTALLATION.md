# TradeHub Installation Instructions

## Quick Start

### 1. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui dependencies**:
  - Radix UI components (@radix-ui/react-*)
  - class-variance-authority
  - tailwindcss-animate
- **Supabase** - Backend & Auth (@supabase/supabase-js, @supabase/ssr)
- **Cloudinary** - Media management
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Utility functions

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

## What's Included

✅ Next.js 15 with App Router  
✅ TypeScript configuration  
✅ Tailwind CSS with custom theme (Blue primary, Orange accent)  
✅ shadcn/ui component system  
✅ Mobile-responsive Header & Footer  
✅ SEO-optimized layout  
✅ Supabase integration ready  
✅ Cloudinary setup  
✅ Form validation (React Hook Form + Zod)  
✅ Lucide React icons  
✅ Font optimization (Inter, Geist Sans, Geist Mono)  

## Project Structure Created

```
/app
  /api              - API routes
  /(auth)           - Authentication routes
  /(main)           - Main application routes
/components
  /ui               - shadcn/ui components (Button, Input, Card)
  /features         - Feature-specific components
  /layout           - Header & Footer
/lib
  /supabase         - Supabase client
  /utils            - Utility functions
/types              - TypeScript definitions
/public             - Static assets
```

## Next Steps

1. **Configure Supabase**: Set up your database tables and authentication
2. **Configure Cloudinary**: Create upload presets for image handling
3. **Add more UI components**: Use `npx shadcn-ui@latest add [component]`
4. **Build features**: Start creating your marketplace features

For detailed documentation, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
