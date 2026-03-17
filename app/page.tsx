'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Briefcase, Users, Target, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background z-0" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground text-balance leading-tight">
            Find Your Next <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Career</span> Opportunity
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            CareerLink connects talented professionals with leading companies. Whether you're looking for your next job or recruiting top talent, we make it simple and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/jobs">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                Browse Jobs <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/register?role=employer">
              <Button size="lg" variant="outline" className="border-2">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why Choose CareerLink?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We provide the best platform for job seekers and employers to connect and grow together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border border-border/40 bg-background hover:bg-card hover:-translate-y-1">
              <div className="mb-6 w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <Target className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Smart Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our intelligent matching algorithm connects the right candidates with the right opportunities.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border border-border/40 bg-background hover:bg-card hover:-translate-y-1">
              <div className="mb-6 w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <Users className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Trusted Network</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join thousands of professionals and companies already using CareerLink to build their teams.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border border-border/40 bg-background hover:bg-card hover:-translate-y-1">
              <div className="mb-6 w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <Briefcase className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Real Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access verified job listings from top companies across all industries and experience levels.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* For Job Seekers */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-12">For Job Seekers</h3>
            <div className="space-y-8">
              {[
                { step: '1', title: 'Create Profile', desc: 'Sign up and build your professional profile' },
                { step: '2', title: 'Browse Jobs', desc: 'Explore thousands of opportunities' },
                { step: '3', title: 'Apply', desc: 'Submit your resume and cover letter' },
                { step: '4', title: 'Get Hired', desc: 'Connect with employers and land your dream job' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-12">For Employers</h3>
            <div className="space-y-8">
              {[
                { step: '1', title: 'Setup Account', desc: 'Register your company and verify details' },
                { step: '2', title: 'Post Jobs', desc: 'Create and publish job listings' },
                { step: '3', title: 'Review Applications', desc: 'Evaluate candidates and communicate' },
                { step: '4', title: 'Hire', desc: 'Make offers and build your ideal team' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-3">50K+</div>
              <p className="text-primary-foreground/90 text-lg">Active Job Listings</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-3">100K+</div>
              <p className="text-primary-foreground/90 text-lg">Registered Candidates</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-3">5K+</div>
              <p className="text-primary-foreground/90 text-lg">Hiring Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        <div className="bg-gradient-to-br from-secondary to-background rounded-2xl p-16 border border-border/40 shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join CareerLink today and take the next step in your career journey or find your ideal candidate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=job_seeker">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                I'm Looking for a Job
              </Button>
            </Link>
            <Link href="/register?role=employer">
              <Button size="lg" variant="outline" className="border-2">
                I'm Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-foreground mb-4 text-lg">CareerLink</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Connecting talent with opportunity</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm">For Job Seekers</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/jobs" className="hover:text-foreground transition-colors">Browse Jobs</Link></li>
                <li><Link href="/register?role=job_seeker" className="hover:text-foreground transition-colors">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm">For Employers</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/register?role=employer" className="hover:text-foreground transition-colors">Post a Job</Link></li>
                <li><Link href="/register?role=employer" className="hover:text-foreground transition-colors">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2026 CareerLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
