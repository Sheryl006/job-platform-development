'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAppContext } from '@/lib/context'
import { MapPin, Briefcase, Clock, Search } from 'lucide-react'

export default function JobsPage() {
  const { jobs, currentUser } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('')
  const [filterLocation, setFilterLocation] = useState<string>('')

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = !filterType || job.type === filterType
      const matchesLocation = !filterLocation || job.location.toLowerCase().includes(filterLocation.toLowerCase())

      return matchesSearch && matchesType && matchesLocation
    })
  }, [jobs, searchQuery, filterType, filterLocation])

  const jobTypes = Array.from(new Set(jobs.map(job => job.type)))
  const locations = Array.from(new Set(jobs.map(job => job.location)))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">Job Opportunities</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore {jobs.length} active job listings from top companies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search jobs, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:border-primary transition-colors"
          >
            <option value="">All Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:border-primary transition-colors"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Results Info */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
        </p>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => window.location.href = `/jobs/${job.id}`}
                className="cursor-pointer"
              >
                <Card className="p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group border border-border/40 hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center font-bold text-primary text-sm shadow-md">
                          {job.company_logo || job.company.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">{job.company}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-5 line-clamp-2 leading-relaxed">{job.description}</p>

                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-5">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-primary/60" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-primary/60" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary/60" />
                          {job.posted}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-secondary/70 text-xs rounded-full text-foreground font-medium border border-border/40">
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 3 && (
                          <span className="px-3 py-1.5 text-xs text-muted-foreground">
                            +{job.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-6">
                      <div className="text-right">
                        <p className="font-bold text-xl text-foreground">{job.salary}</p>
                        <p className="text-sm text-muted-foreground font-medium">{job.experience}</p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        {currentUser?.role === 'job_seeker' ? (
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                            Apply Now
                          </Button>
                        ) : !currentUser ? (
                          <Link href="/login">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                              Apply Now
                            </Button>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-16 text-center border border-border/40">
            <p className="text-muted-foreground text-lg mb-6">No jobs found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setFilterType('')
                setFilterLocation('')
              }}
              className="border-2"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
