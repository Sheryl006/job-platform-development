'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAppContext } from '@/lib/context'
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  reviewed: { label: 'Reviewed', icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  shortlisted: { label: 'Shortlisted', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
}

export default function ApplicationsPage() {
  const router = useRouter()
  const { currentUser, applications, getApplicationsByUser, getJobById } = useAppContext()

  if (!currentUser || currentUser.role !== 'job_seeker') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">You must be logged in as a job seeker to view this page.</p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const userApplications = getApplicationsByUser(currentUser.id)

  const getStatusIcon = (status: string) => {
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]
    if (!config) return null
    const Icon = config.icon
    return <Icon className={config.color} size={20} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-lg text-muted-foreground">
            Track your job applications and their status
          </p>
        </div>

        {userApplications.length > 0 ? (
          <div className="space-y-4">
            {userApplications.map((application) => {
              const job = getJobById(application.jobId)
              if (!job) return null

              const statusConfig = STATUS_CONFIG[application.status as keyof typeof STATUS_CONFIG]
              const StatusIcon = statusConfig.icon

              return (
                <Card key={application.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">
                          {job.company_logo || job.company.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                        <span>Resume: {application.resume}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusConfig.bg}`}>
                        <StatusIcon className={statusConfig.color} size={18} />
                        <span className={`font-semibold ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          View Job
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {application.coverLetter && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Cover Letter:</p>
                      <p className="text-foreground line-clamp-2">{application.coverLetter}</p>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="mb-4">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Applications Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't applied to any jobs yet. Start exploring opportunities now!
            </p>
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
