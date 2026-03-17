'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAppContext } from '@/lib/context'
import { BarChart3, Users, Briefcase, TrendingUp, AlertCircle, Trash2, Ban, Download, Eye } from 'lucide-react'

export default function AdminDashboardPage() {
  const { currentUser, jobs, applications } = useAppContext()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs' | 'reports'>('overview')
  const [suspendedAccounts, setSuspendedAccounts] = useState<string[]>([])
  const [removedJobs, setRemovedJobs] = useState<string[]>([])
  const [showConfirm, setShowConfirm] = useState<{ type: string, id: string } | null>(null)

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6">You must be logged in as an admin to view this page.</p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  // Get unique companies
  const uniqueCompanies = Array.from(new Set(jobs.map(job => job.company)))
  const activeJobs = jobs.filter(job => !removedJobs.includes(job.id))

  // Calculate stats
  const avgSalary = activeJobs.length > 0
    ? activeJobs.reduce((sum, job) => {
        const salaryStr = job.salary.replace(/[^\d]/g, '')
        const salary = parseInt(salaryStr) || 0
        return sum + salary
      }, 0) / activeJobs.length
    : 0

  const pendingApplications = applications.filter(app => app.status === 'pending').length

  const handleRemoveJob = (jobId: string) => {
    setRemovedJobs([...removedJobs, jobId])
    setShowConfirm(null)
  }

  const handleSuspendAccount = (company: string) => {
    setSuspendedAccounts([...suspendedAccounts, company])
    setShowConfirm(null)
  }

  const handleRestoreSuspended = (company: string) => {
    setSuspendedAccounts(suspendedAccounts.filter(acc => acc !== company))
  }

  const handleRestoreJob = (jobId: string) => {
    setRemovedJobs(removedJobs.filter(id => id !== jobId))
  }

  const generateReport = () => {
    const reportData = {
      generatedAt: new Date().toLocaleString(),
      totalJobs: activeJobs.length,
      removedJobs: removedJobs.length,
      totalApplications: applications.length,
      activeCompanies: uniqueCompanies.filter(c => !suspendedAccounts.includes(c)).length,
      suspendedAccounts: suspendedAccounts.length,
      pendingApplications,
      applicationsByStatus: {
        pending: applications.filter(a => a.status === 'pending').length,
        reviewed: applications.filter(a => a.status === 'reviewed').length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
      },
      averageSalary: Math.round(avgSalary),
    }
    
    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CareerLink_Report_${new Date().getTime()}.json`
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Full system control and platform management
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-border pb-4">
          {['overview', 'users', 'jobs', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              <Card className="p-6 border border-border/40 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2 font-medium">Total Jobs</p>
                    <p className="text-3xl font-bold text-foreground">{activeJobs.length}</p>
                    <p className="text-xs text-destructive mt-1">{removedJobs.length} removed</p>
                  </div>
                  <Briefcase className="text-primary" size={24} />
                </div>
              </Card>

              <Card className="p-6 border border-border/40 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2 font-medium">Active Companies</p>
                    <p className="text-3xl font-bold text-foreground">{uniqueCompanies.filter(c => !suspendedAccounts.includes(c)).length}</p>
                    <p className="text-xs text-destructive mt-1">{suspendedAccounts.length} suspended</p>
                  </div>
                  <Users className="text-primary" size={24} />
                </div>
              </Card>

              <Card className="p-6 border border-border/40 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2 font-medium">Total Applications</p>
                    <p className="text-3xl font-bold text-foreground">{applications.length}</p>
                    <p className="text-xs text-accent mt-1">{pendingApplications} pending</p>
                  </div>
                  <TrendingUp className="text-accent" size={24} />
                </div>
              </Card>

              <Card className="p-6 border border-border/40 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2 font-medium">System Health</p>
                    <p className="text-3xl font-bold text-green-600">99.8%</p>
                    <p className="text-xs text-muted-foreground mt-1">Uptime</p>
                  </div>
                  <AlertCircle className="text-green-600" size={24} />
                </div>
              </Card>

              <Card className="p-6 border border-border/40 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2 font-medium">Avg. Salary</p>
                    <p className="text-2xl font-bold text-foreground">${Math.round(avgSalary).toLocaleString()}</p>
                  </div>
                  <BarChart3 className="text-primary" size={24} />
                </div>
              </Card>
            </div>

            {/* Application Status Overview */}
            <Card className="p-8 mb-12 border border-border/40">
              <h2 className="text-2xl font-bold text-foreground mb-8">Application Status Distribution</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Pending', count: applications.filter(a => a.status === 'pending').length, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50' },
                  { label: 'Reviewed', count: applications.filter(a => a.status === 'reviewed').length, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
                  { label: 'Shortlisted', count: applications.filter(a => a.status === 'shortlisted').length, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
                  { label: 'Rejected', count: applications.filter(a => a.status === 'rejected').length, color: 'from-red-500 to-red-600', bgColor: 'bg-red-50' },
                ].map((status) => {
                  const percentage = applications.length > 0 ? (status.count / applications.length) * 100 : 0
                  return (
                    <div key={status.label}>
                      <div className={`${status.bgColor} rounded-xl p-4 mb-3`}>
                        <p className={`font-bold text-3xl bg-gradient-to-r ${status.color} bg-clip-text text-transparent`}>{status.count}</p>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full bg-gradient-to-r ${status.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">{status.label} ({Math.round(percentage)}%)</p>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Top Jobs */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border border-border/40">
                <h2 className="text-2xl font-bold text-foreground mb-6">Top Positions</h2>
                <div className="space-y-4">
                  {activeJobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="flex items-start justify-between pb-4 border-b border-border/40 last:border-b-0">
                      <div>
                        <h4 className="font-semibold text-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <span className="text-primary font-bold">{job.salary}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 border border-border/40">
                <h2 className="text-2xl font-bold text-foreground mb-6">Job Types Distribution</h2>
                <div className="space-y-4">
                  {Array.from(new Set(activeJobs.map(job => job.type))).map((type) => {
                    const count = activeJobs.filter(job => job.type === type).length
                    const percentage = activeJobs.length > 0 ? (count / activeJobs.length) * 100 : 0
                    return (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-foreground font-medium">{type}</p>
                          <p className="text-muted-foreground text-sm">{count} ({Math.round(percentage)}%)</p>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <Card className="p-8 border border-border/40">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">User Account Management</h2>
              <p className="text-muted-foreground">Monitor and manage employer accounts</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Company</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Active Jobs</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Applications</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueCompanies.map((company) => {
                    const isSuspended = suspendedAccounts.includes(company)
                    const companyJobs = activeJobs.filter(job => job.company === company)
                    const companyApps = applications.filter(app => activeJobs.find(j => j.id === app.job_id && j.company === company))
                    
                    return (
                      <tr key={company} className={`border-b border-border hover:bg-secondary/30 transition-colors ${isSuspended ? 'opacity-60' : ''}`}>
                        <td className="py-4 px-4 text-foreground font-medium">{company}</td>
                        <td className="py-4 px-4 text-muted-foreground">{companyJobs.length}</td>
                        <td className="py-4 px-4 text-muted-foreground">{companyApps.length}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isSuspended 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {isSuspended ? 'Suspended' : 'Active'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {isSuspended ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRestoreSuspended(company)}
                              className="text-xs"
                            >
                              Restore
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowConfirm({ type: 'suspend', id: company })}
                              className="text-xs text-destructive hover:bg-destructive/10"
                            >
                              <Ban size={14} className="mr-1" />
                              Suspend
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Jobs Moderation Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">
            {/* Active Jobs */}
            <Card className="p-8 border border-border/40">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Active Job Listings</h2>
                <p className="text-muted-foreground">Review and manage job postings</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-secondary/40">
                    <tr>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Job Title</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Company</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Type</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Applications</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeJobs.slice(0, 10).map((job) => {
                      const jobApps = applications.filter(app => app.job_id === job.id).length
                      return (
                        <tr key={job.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                          <td className="py-4 px-4 text-foreground font-medium">{job.title}</td>
                          <td className="py-4 px-4 text-muted-foreground">{job.company}</td>
                          <td className="py-4 px-4 text-muted-foreground">{job.type}</td>
                          <td className="py-4 px-4 text-foreground font-medium">{jobApps}</td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                <Eye size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowConfirm({ type: 'remove', id: job.id })}
                                className="text-xs text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Removed Jobs */}
            {removedJobs.length > 0 && (
              <Card className="p-8 border border-border/40 bg-destructive/5">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Removed Job Listings ({removedJobs.length})</h2>
                  <p className="text-muted-foreground">Archived jobs - can be restored if needed</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-secondary/40">
                      <tr>
                        <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Job Title</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Company</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.filter(job => removedJobs.includes(job.id)).map((job) => (
                        <tr key={job.id} className="border-b border-border opacity-60">
                          <td className="py-4 px-4 text-foreground font-medium line-through">{job.title}</td>
                          <td className="py-4 px-4 text-muted-foreground">{job.company}</td>
                          <td className="py-4 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRestoreJob(job.id)}
                              className="text-xs"
                            >
                              Restore
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <Card className="p-8 border border-border/40">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Usage Reports & Analytics</h2>
                <p className="text-muted-foreground">Generate detailed platform reports for analysis</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
                      <span className="text-muted-foreground">Total Jobs Posted</span>
                      <span className="font-bold text-foreground">{activeJobs.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
                      <span className="text-muted-foreground">Jobs Removed</span>
                      <span className="font-bold text-destructive">{removedJobs.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
                      <span className="text-muted-foreground">Total Applications</span>
                      <span className="font-bold text-foreground">{applications.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
                      <span className="text-muted-foreground">Active Companies</span>
                      <span className="font-bold text-foreground">{uniqueCompanies.filter(c => !suspendedAccounts.includes(c)).length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
                      <span className="text-muted-foreground">Suspended Accounts</span>
                      <span className="font-bold text-destructive">{suspendedAccounts.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Application Status</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Pending', count: applications.filter(a => a.status === 'pending').length },
                      { label: 'Reviewed', count: applications.filter(a => a.status === 'reviewed').length },
                      { label: 'Shortlisted', count: applications.filter(a => a.status === 'shortlisted').length },
                      { label: 'Rejected', count: applications.filter(a => a.status === 'rejected').length },
                    ].map(({ label, count }) => (
                      <div key={label} className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-bold text-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={generateReport}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2 py-6 text-base font-semibold"
                >
                  <Download size={20} />
                  Download Full Report (JSON)
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-2"
                >
                  Generate PDF Report
                </Button>
              </div>
            </Card>

            {/* Report Preview */}
            <Card className="p-8 border border-border/40">
              <h3 className="text-lg font-bold text-foreground mb-6">Recent Report Data</h3>
              <div className="bg-secondary/40 rounded-lg p-6 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground">{JSON.stringify({
                  generatedAt: new Date().toLocaleString(),
                  platformMetrics: {
                    activeJobs: activeJobs.length,
                    removedJobs: removedJobs.length,
                    totalApplications: applications.length,
                    activeCompanies: uniqueCompanies.filter(c => !suspendedAccounts.includes(c)).length,
                    suspendedAccounts: suspendedAccounts.length,
                  },
                  applicationStatus: {
                    pending: applications.filter(a => a.status === 'pending').length,
                    reviewed: applications.filter(a => a.status === 'reviewed').length,
                    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
                    rejected: applications.filter(a => a.status === 'rejected').length,
                  },
                  systemMetrics: {
                    averageSalary: `$${Math.round(avgSalary).toLocaleString()}`,
                    uptime: '99.8%',
                    systemHealth: 'Optimal'
                  }
                }, null, 2)}</pre>
              </div>
            </Card>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="p-8 max-w-md w-full border-2 border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {showConfirm.type === 'remove' ? 'Remove Job Posting?' : 'Suspend Account?'}
              </h3>
              <p className="text-muted-foreground mb-8">
                {showConfirm.type === 'remove' 
                  ? 'This action will remove the job posting from the platform. It can be restored later.'
                  : 'This action will suspend the employer account. They will not be able to post new jobs or manage applications.'}
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 border-2"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (showConfirm.type === 'remove') {
                      handleRemoveJob(showConfirm.id)
                    } else {
                      handleSuspendAccount(showConfirm.id)
                    }
                  }}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
                >
                  {showConfirm.type === 'remove' ? 'Remove' : 'Suspend'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
