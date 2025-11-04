import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/features/navigation/Header";
import { BottomNav } from "@/components/features/navigation/BottomNav";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
