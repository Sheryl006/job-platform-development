'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAppContext } from '@/lib/context'
import { User, Building2 } from 'lucide-react'

function RegisterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAppContext()

  const [selectedRole, setSelectedRole] = useState<'job_seeker' | 'employer' | null>(
    (searchParams.get('role') as 'job_seeker' | 'employer') || null
  )
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedRole) {
      setError('Please select a role')
      return
    }

    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (selectedRole === 'employer' && !formData.companyName.trim()) {
      setError('Company name is required')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: selectedRole,
        phone: '',
      }

      login(newUser)
      router.push('/')
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          {!selectedRole ? (
            // Role Selection
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
                <p className="text-muted-foreground">Choose your role to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => setSelectedRole('job_seeker')}
                  className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <User className="text-primary mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-bold text-lg text-foreground mb-2">I'm Looking for a Job</h3>
                  <p className="text-muted-foreground text-sm">
                    Browse job listings, apply to positions, and connect with employers
                  </p>
                </button>

                <button
                  onClick={() => setSelectedRole('employer')}
                  className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <Building2 className="text-primary mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="font-bold text-lg text-foreground mb-2">I'm Hiring</h3>
                  <p className="text-muted-foreground text-sm">
                    Post job listings, find talent, and build your team
                  </p>
                </button>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            // Registration Form
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedRole(null)
                    setError('')
                  }}
                >
                  ← Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {selectedRole === 'job_seeker' ? 'Job Seeker Registration' : 'Employer Registration'}
                  </h1>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {selectedRole === 'employer' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="companyName"
                      placeholder="Your Company"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-md mx-auto px-4 py-16">
          <Card className="p-8">
            <div className="h-8 bg-secondary rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-secondary rounded animate-pulse mb-4 w-3/4"></div>
          </Card>
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  )
}
