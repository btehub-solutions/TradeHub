# TradeHub 🛍️

A mobile-first marketplace platform for buying and selling pre-loved items in Nigeria. Built with performance, accessibility, and the Nigerian market in mind.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tradehub)

## 🌟 Features

### Core Functionality
- 📱 **Phone-based Authentication** - OTP verification via Supabase Auth
- 🛍️ **Listing Management** - Create, edit, and manage product listings
- 🔍 **Advanced Search** - Full-text search with filters (category, location, price)
- 👤 **User Profiles** - Customizable profiles with avatar and bio
- 💬 **Direct Contact** - WhatsApp and phone call integration
- ⭐ **Favorites** - Save and manage favorite listings
- 📊 **Analytics** - View counts and listing performance

### Technical Features
- 🚀 **Optimized for Slow Networks** - Aggressive caching and compression
- 📱 **Mobile-First Design** - Responsive UI built with Tailwind CSS
- 🖼️ **Image Optimization** - Cloudinary CDN with automatic format conversion
- 🔒 **Row Level Security** - Supabase RLS for data protection
- 🌐 **PWA Support** - Installable app with offline capabilities
- ⚡ **Edge Functions** - Fast API responses via Vercel Edge
- 🎨 **Modern UI** - shadcn/ui components with Lucide icons
- 🔍 **SEO Optimized** - Meta tags, sitemap, and structured data

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation

### Backend & Services
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage + Cloudinary
- **Image CDN:** Cloudinary
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics + Speed Insights

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **CI/CD:** GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Cloudinary account (free tier works)
- Vercel account for deployment (optional)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tradehub.git
   cd tradehub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local with your credentials
   # See ENVIRONMENT_VARIABLES.md for detailed instructions
   ```

4. **Set up Supabase:**
   ```bash
   # Run migrations in order:
   # 1. supabase/migrations/001_initial_schema.sql
   # 2. supabase/migrations/002_rls_policies.sql
   # 3. supabase/migrations/003_storage_buckets.sql
   # 4. supabase/migrations/004_seed_categories.sql
   
   # Or use Supabase CLI:
   npx supabase db push
   ```

5. **Configure Supabase Authentication:**
   - Go to Authentication → Providers
   - Enable Email provider
   - Set Site URL: `http://localhost:3000`
   - Add Redirect URL: `http://localhost:3000/auth/callback`

6. **Set up Cloudinary:**
   - Create an unsigned upload preset named `tradehub_listings`
   - Configure folder: `listings`
   - Set max file size: 5MB

7. **Run the development server:**
   ```bash
   npm run dev
   ```

8. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tradehub/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│       ├── ci.yml         # Main CI pipeline
│       └── performance-budget.yml
├── app/
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   ├── verify/
│   │   └── complete-profile/
│   ├── (main)/            # Main application routes
│   │   ├── listings/      # Listing pages
│   │   ├── profile/       # User profile
│   │   └── search/        # Search page
│   ├── api/               # API routes
│   │   ├── listings/
│   │   ├── categories/
│   │   └── profile/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── layout/            # Layout components (Header, Footer)
│   ├── listings/          # Listing-specific components
│   ├── profile/           # Profile components
│   └── features/          # Feature components
├── lib/
│   ├── supabase/          # Supabase client & utilities
│   │   ├── client.ts      # Browser client
│   │   ├── server.ts      # Server client
│   │   └── middleware.ts  # Auth middleware
│   ├── auth/              # Authentication utilities
│   ├── data/              # Static data (locations, etc.)
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── supabase/
│   ├── migrations/        # Database migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   ├── 003_storage_buckets.sql
│   │   └── 004_seed_categories.sql
│   └── schema.sql         # Complete schema
├── types/
│   ├── database.ts        # Supabase types
│   └── index.ts           # Application types
├── public/                # Static assets
├── .env.example           # Environment variables template
├── vercel.json            # Vercel configuration
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔐 Environment Variables

TradeHub requires several environment variables. See detailed documentation:

- **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - Complete reference
- **[.env.example](./.env.example)** - Template file

### Required Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**

2. **Import project to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Configure environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all required variables for Production, Preview, and Development
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

4. **Set up custom domain:**
   - Go to Project Settings → Domains
   - Add your domain (e.g., tradehub.ng)
   - Configure DNS records

### Detailed Deployment Guide

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment instructions including:
- Supabase setup and configuration
- Cloudinary setup
- Vercel deployment steps
- Domain and SSL configuration
- Post-deployment checklist

### CI/CD Pipeline

GitHub Actions automatically:
- ✅ Runs linting and type checking
- ✅ Builds the application
- ✅ Runs security scans
- ✅ Deploys preview for PRs
- ✅ Deploys to production on main branch merge

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - Environment variables reference
- **[POST_DEPLOYMENT_CHECKLIST.md](./POST_DEPLOYMENT_CHECKLIST.md)** - Post-deployment verification
- **[AUTH_SYSTEM.md](./AUTH_SYSTEM.md)** - Authentication system documentation
- **[LISTING_DETAIL_PAGE.md](./LISTING_DETAIL_PAGE.md)** - Listing feature documentation
- **[PROFILE_FEATURE_GUIDE.md](./PROFILE_FEATURE_GUIDE.md)** - Profile system documentation

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues & Roadmap

### Current Limitations
- SMS verification not yet implemented (using email OTP)
- No in-app messaging system (using WhatsApp/phone)
- Limited payment integration

### Roadmap
- [ ] SMS verification via Termii
- [ ] In-app messaging system
- [ ] Payment integration (Paystack/Flutterwave)
- [ ] Advanced analytics dashboard
- [ ] Admin panel
- [ ] Mobile apps (React Native)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- Images by [Cloudinary](https://cloudinary.com/)
- Deployed on [Vercel](https://vercel.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

For support, email support@tradehub.ng or open an issue on GitHub.

---

**Made with ❤️ for the Nigerian market**
