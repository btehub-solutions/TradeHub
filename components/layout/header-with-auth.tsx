'use client'

import Link from 'next/link'
import { Menu, Search, ShoppingBag, User, LogOut, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useUser } from '@/lib/auth/useUser'
import { signOutClient } from '@/lib/auth/client'
import { useRouter } from 'next/navigation'

export function HeaderWithAuth() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, profile, loading } = useUser()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOutClient()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold text-emerald-700">TradeHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/listings" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Browse
            </Link>
            {user && (
              <>
                <Link 
                  href="/listings/create" 
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Sell
                </Link>
                <Link 
                  href="/profile" 
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  My Listings
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            
            {loading ? (
              <div className="h-10 w-20 bg-muted animate-pulse rounded" />
            ) : user ? (
              <>
                <Button asChild>
                  <Link href="/listings/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Ad
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" />
                    {profile?.full_name?.split(' ')[0] || 'Profile'}
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/listings" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              
              {user && (
                <>
                  <Link 
                    href="/listings/create" 
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sell
                  </Link>
                  <Link 
                    href="/profile" 
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                </>
              )}
              
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {loading ? (
                  <div className="h-10 bg-muted animate-pulse rounded" />
                ) : user ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-foreground">
                      {profile?.full_name}
                    </div>
                    <Button asChild>
                      <Link href="/listings/create" onClick={() => setMobileMenuOpen(false)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Post Ad
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
