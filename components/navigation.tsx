'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/lib/context'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const router = useRouter()
  const { currentUser, logout } = useAppContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-xs font-bold">
              CL
            </div>
            <span className="hidden sm:inline text-foreground">CareerLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
              Browse Jobs
            </Link>
            {currentUser?.role === 'employer' && (
              <Link href="/employer/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
                Dashboard
              </Link>
            )}
            {currentUser?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Welcome, {currentUser.name}</span>
                {currentUser.role === 'job_seeker' && (
                  <Link href="/applications">
                    <Button variant="ghost" size="sm">
                      My Applications
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/jobs" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
              Browse Jobs
            </Link>
            {currentUser?.role === 'employer' && (
              <Link href="/employer/dashboard" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
                Dashboard
              </Link>
            )}
            {currentUser?.role === 'admin' && (
              <Link href="/admin/dashboard" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg">
                Admin
              </Link>
            )}
            <div className="px-4 py-2 border-t border-border mt-2">
              {currentUser ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{currentUser.name}</p>
                  {currentUser.role === 'job_seeker' && (
                    <Link href="/applications">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        My Applications
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
