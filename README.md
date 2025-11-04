# TradeHub

A mobile-first marketplace platform for buying and selling pre-loved items in Nigeria.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL, Auth, Storage)
- **Cloudinary** (Image optimization)
- **Vercel** (Deployment)

## Features

- 📱 Phone-based OTP authentication
- 🛍️ Create, browse, and search listings
- 👤 User profiles
- 💬 Contact seller (WhatsApp/Call integration)
- 🏷️ Categories and location-based filtering
- 🚀 Optimized for slow networks
- 📱 Mobile-first design
- 🖼️ Image optimization
- 🔍 SEO-friendly

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase and Cloudinary credentials

3. **Set up Supabase:**
   - Run the SQL schema in `supabase/schema.sql`
   - Enable Phone Auth in Supabase Dashboard
   - Configure Storage buckets

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
tradehub/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main app routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── listings/         # Listing components
│   └── auth/             # Auth components
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client & helpers
│   ├── cloudinary/       # Cloudinary helpers
│   └── utils/            # Utility functions
├── types/                 # TypeScript type definitions
└── supabase/             # Database schema & migrations
```

## Environment Variables

See `.env.local.example` for required environment variables.

## Deployment

Deploy to Vercel with one click or via CLI:

```bash
npm run build
vercel
```

## License

MIT
