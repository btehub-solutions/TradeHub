# TradeHub - Next.js 15 Setup Guide

## Project Overview
TradeHub is a modern marketplace application built with Next.js 15, TypeScript, and the App Router.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Backend**: Supabase (Auth & Database)
- **Media**: Cloudinary
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Your Cloudinary upload preset
- `NEXT_PUBLIC_APP_URL` - Your app URL (default: http://localhost:3000)

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
TradeHub/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   ├── (auth)/              # Authentication routes (grouped)
│   │   └── login/
│   ├── (main)/              # Main app routes (grouped)
│   │   ├── listings/
│   │   └── profile/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout with SEO
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── layout/              # Layout components
│   │   ├── header.tsx       # Mobile-responsive header
│   │   └── footer.tsx       # Footer
│   └── features/            # Feature-specific components
├── lib/
│   ├── supabase/            # Supabase client setup
│   ├── utils/               # Utility functions
│   │   └── cn.ts            # Class name utility
│   └── utils.ts
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
└── supabase/               # Supabase migrations & config
```

## Key Features

### 1. Mobile-First Design
- Responsive breakpoints: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Mobile-optimized header with hamburger menu
- Touch-friendly UI components

### 2. Custom Theme
- **Primary Color**: Blue (#3b82f6)
- **Accent Color**: Orange (#f97316)
- Dark mode support with CSS variables
- Optimized fonts: Inter, Geist Sans, Geist Mono

### 3. SEO Optimization
- Comprehensive metadata in layout.tsx
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready

### 4. Form Validation
- React Hook Form for form management
- Zod for schema validation
- Type-safe form handling

## Adding shadcn/ui Components

To add more shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:
```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add toast
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tailwind Configuration

Custom configuration includes:
- CSS variables for theming
- Custom color palette (primary: blue, accent: orange)
- Mobile-first breakpoints
- Font optimization
- Animation utilities

## Next Steps

1. **Set up Supabase**:
   - Create tables for users, listings, etc.
   - Configure authentication
   - Set up Row Level Security (RLS)

2. **Configure Cloudinary**:
   - Create upload presets
   - Set up transformations

3. **Build Features**:
   - User authentication
   - Listing creation/management
   - Search and filtering
   - User profiles
   - Messaging system

4. **Testing**:
   - Add unit tests
   - Add integration tests
   - Add E2E tests

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
