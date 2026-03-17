'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppContext } from '@/lib/context'
import { Plus, Eye, Users, AlertCircle } from 'lucide-react'

export default function EmployerDashboardPage() {
  const router = useRouter()
  const { currentUser, jobs, addJob, applications, getApplicationsByJob, updateApplicationStatus } = useAppContext()
  const [showNewJobForm, setShowNewJobForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    salary: '',
    type: 'Full-time' as const,
    experience: '',
    description: '',
  })

  if (!currentUser || currentUser.role !== 'employer') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">You must be logged in as an employer to view this page.</p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newJob.title.trim() || !newJob.location.trim() || !newJob.description.trim()) {
      alert('Please fill in all required fields')
      return
    }

    const jobToAdd = {
      id: Date.now().toString(),
      title: newJob.title,
      company: currentUser.name,
      location: newJob.location,
      salary: newJob.salary,
      type: newJob.type,
      experience: newJob.experience,
      description: newJob.description,
      posted: 'Just now',
      requirements: [],
      company_logo: currentUser.name.substring(0, 2),
    }

    addJob(jobToAdd)

    setNewJob({
      title: '',
      location: '',
      salary: '',
      type: 'Full-time',
      experience: '',
      description: '',
    })
    setShowNewJobForm(false)
  }

  const employerJobs = jobs.filter(job => job.company === currentUser.name)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Employer Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage your job listings and applications
            </p>
          </div>
          <Button onClick={() => setShowNewJobForm(!showNewJobForm)} size="lg" className="gap-2">
            <Plus size={20} /> Post New Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-foreground">{employerJobs.length}</p>
              </div>
              <Eye className="text-primary" size={24} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-foreground">
                  {employerJobs.reduce((sum, job) => sum + getApplicationsByJob(job.id).length, 0)}
                </p>
              </div>
              <Users className="text-primary" size={24} />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">To Review</p>
                <p className="text-3xl font-bold text-foreground">
                  {employerJobs.reduce((sum, job) =>
                    sum + getApplicationsByJob(job.id).filter(app => app.status === 'pending').length, 0
                  )}
                </p>
              </div>
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </Card>
        </div>

        {/* New Job Form */}
        {showNewJobForm && (
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Post a New Job</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Job Title *</label>
                  <Input
                    placeholder="e.g., Senior Developer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                  <Input
                    placeholder="e.g., New York, NY"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Salary Range</label>
                  <Input
                    placeholder="e.g., $80,000 - $120,000"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Job Type</label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value as 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Experience Required</label>
                  <Input
                    placeholder="e.g., 5+ years"
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Job Description *</label>
                <Textarea
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" size="lg">Post Job</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowNewJobForm(false)
                    setNewJob({
                      title: '',
                      location: '',
                      salary: '',
                      type: 'Full-time',
                      experience: '',
                      description: '',
                    })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Job Listings */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Job Listings</h2>

          {employerJobs.length > 0 ? (
            <div className="space-y-4">
              {employerJobs.map((job) => {
                const jobApplications = getApplicationsByJob(job.id)
                const pendingCount = jobApplications.filter(app => app.status === 'pending').length

                return (
                  <Card key={job.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                        <p className="text-muted-foreground mb-3">{job.location} • {job.type}</p>
                        <p className="text-foreground mb-4 line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{jobApplications.length} application{jobApplications.length !== 1 ? 's' : ''}</span>
                          {pendingCount > 0 && (
                            <span className="text-yellow-600 font-semibold">{pendingCount} pending review</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm" className="w-full">View Details</Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                        >
                          {selectedJob === job.id ? 'Hide' : 'View'} Applications
                        </Button>
                      </div>
                    </div>

                    {/* Applications for this job */}
                    {selectedJob === job.id && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-bold text-foreground mb-4">Applications ({jobApplications.length})</h4>
                        {jobApplications.length > 0 ? (
                          <div className="space-y-3">
                            {jobApplications.map((app) => (
                              <div key={app.id} className="p-3 bg-secondary rounded-lg flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-medium text-foreground">Resume: {app.resume}</p>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{app.coverLetter}</p>
                                </div>
                                <div className="flex gap-2">
                                  <select
                                    value={app.status}
                                    onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                                    className="px-2 py-1 text-sm border border-border rounded bg-background"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="shortlisted">Shortlisted</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No applications yet</p>
                        )}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto opacity-50 mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Active Jobs</h2>
              <p className="text-muted-foreground mb-6">
                You haven't posted any jobs yet. Start recruiting top talent now!
              </p>
              <Button onClick={() => setShowNewJobForm(true)} className="gap-2">
                <Plus size={20} /> Post Your First Job
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
