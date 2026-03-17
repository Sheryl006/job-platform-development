'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAppContext } from '@/lib/context'
import { MapPin, Briefcase, Clock, DollarSign, ArrowLeft } from 'lucide-react'

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { getJobById, currentUser, applyForJob } = useAppContext()
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const job = getJobById(params.id as string)

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" onClick={() => router.back()} className="mb-8 gap-2">
            <ArrowLeft size={20} /> Back
          </Button>
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Job Not Found</h2>
            <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) {
      router.push('/login')
      return
    }
    if (!coverLetter.trim()) {
      alert('Please write a cover letter')
      return
    }
    if (!resumeFile) {
      alert('Please upload your resume')
      return
    }

    applyForJob(job.id, currentUser.id, resumeFile.name, coverLetter)
    setSubmitted(true)
    setShowApplyForm(false)

    setTimeout(() => {
      setSubmitted(false)
      setCoverLetter('')
      setResumeFile(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 gap-2">
          <ArrowLeft size={20} /> Back
        </Button>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Application submitted successfully! Good luck with your application.
            </p>
          </div>
        )}

        {/* Job Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary text-lg">
              {job.company_logo || job.company.substring(0, 2)}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2">{job.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Job Details Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <MapPin size={16} />
              Location
            </div>
            <p className="font-semibold text-foreground">{job.location}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <DollarSign size={16} />
              Salary
            </div>
            <p className="font-semibold text-foreground">{job.salary}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Briefcase size={16} />
              Type
            </div>
            <p className="font-semibold text-foreground">{job.type}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Clock size={16} />
              Experience
            </div>
            <p className="font-semibold text-foreground">{job.experience}</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Job Description */}
          <div className="md:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">About This Job</h2>
              <div className="prose prose-sm max-w-none mb-8">
                <p className="text-foreground leading-relaxed mb-6">{job.description}</p>

                <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Posted {job.posted}
                </p>
              </div>
            </Card>
          </div>

          {/* Apply Section */}
          <div>
            <Card className="p-6 sticky top-20">
              {!showApplyForm ? (
                <Button
                  onClick={() => {
                    if (!currentUser) {
                      router.push('/login')
                    } else {
                      setShowApplyForm(true)
                    }
                  }}
                  size="lg"
                  className="w-full"
                >
                  Apply Now
                </Button>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Upload Resume (PDF/DOC)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                    />
                    {resumeFile && (
                      <p className="text-xs text-muted-foreground mt-1">{resumeFile.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Cover Letter
                    </label>
                    <Textarea
                      placeholder="Tell the employer why you're a great fit for this role..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      className="flex-1"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowApplyForm(false)
                        setCoverLetter('')
                        setResumeFile(null)
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary text-sm rounded text-foreground font-medium"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Jobs */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Similar Jobs</h2>
          {/* Similar jobs would go here */}
          <p className="text-muted-foreground">Explore more opportunities on our jobs page.</p>
          <Link href="/jobs">
            <Button variant="outline" className="mt-4">
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
