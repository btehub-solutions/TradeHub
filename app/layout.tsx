import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/features/navigation/Header";
import { BottomNav } from "@/components/features/navigation/BottomNav";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnalyticsTracker } from '@/components/providers/analytics-tracker';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "TradeHub - Buy & Sell Pre-Loved Items in Nigeria",
    template: "%s | TradeHub"
  },
  description: "Nigeria's trusted marketplace for buying and selling pre-loved items. Find great deals on electronics, fashion, furniture, and more.",
  keywords: ["marketplace", "Nigeria", "buy", "sell", "pre-loved", "second-hand", "electronics", "fashion"],
  authors: [{ name: "TradeHub" }],
  creator: "TradeHub",
  publisher: "TradeHub",
  applicationName: "TradeHub",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TradeHub',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  manifest: '/manifest.json',
  openGraph: {
    title: "TradeHub - Buy & Sell Pre-Loved Items in Nigeria",
    description: "Nigeria's trusted marketplace for buying and selling pre-loved items.",
    url: '/',
    siteName: 'TradeHub',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TradeHub - Buy & Sell Pre-Loved Items in Nigeria",
    description: "Nigeria's trusted marketplace for buying and selling pre-loved items.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </div>
        <Toaster />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
