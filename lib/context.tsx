'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary'
  experience: string
  posted: string
  company_logo?: string
  requirements: string[]
}

export interface User {
  id: string
  name: string
  email: string
  role: 'job_seeker' | 'employer' | 'admin'
  avatar?: string
  phone?: string
}

export interface Application {
  id: string
  jobId: string
  userId: string
  resume: string
  coverLetter: string
  appliedDate: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
}

interface AppContextType {
  currentUser: User | null
  jobs: Job[]
  applications: Application[]
  login: (user: User) => void
  logout: () => void
  addJob: (job: Job) => void
  applyForJob: (jobId: string, userId: string, resume: string, coverLetter: string) => void
  getJobById: (id: string) => Job | undefined
  getApplicationsByUser: (userId: string) => Application[]
  getApplicationsByJob: (jobId: string) => Application[]
  updateApplicationStatus: (applicationId: string, status: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Kenya',
      location: 'Nairobi',
      description: 'We are looking for a talented Senior Frontend Developer to join our innovative team. You will work on cutting-edge web applications used by millions of users worldwide.',
      salary: 'KES 180,000 - 220,000/month',
      type: 'Full-time',
      experience: '5+ years',
      posted: '2 days ago',
      company_logo: 'TC',
      requirements: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'REST APIs']
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Nairobi',
      description: 'Join our fast-growing startup as a Full Stack Developer. You\'ll have the opportunity to work on diverse projects and contribute to product development from day one.',
      salary: 'KES 120,000 - 160,000/month',
      type: 'Full-time',
      experience: '3+ years',
      posted: '5 days ago',
      company_logo: 'SX',
      requirements: ['Node.js', 'React', 'MongoDB', 'AWS', 'Git']
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'DesignStudio',
      location: 'Kisumu',
      description: 'Create beautiful and intuitive user interfaces for our web and mobile applications. Work collaboratively with product and engineering teams.',
      salary: 'KES 90,000 - 130,000/month',
      type: 'Full-time',
      experience: '3+ years',
      posted: '1 week ago',
      company_logo: 'DS',
      requirements: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'CSS']
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudInfra Solutions',
      location: 'Mombasa',
      description: 'Manage and optimize our cloud infrastructure. We\'re looking for experienced DevOps engineers who can work with modern containerization and orchestration technologies.',
      salary: 'KES 150,000 - 200,000/month',
      type: 'Full-time',
      experience: '4+ years',
      posted: '3 days ago',
      company_logo: 'CI',
      requirements: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux']
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'DataSense Analytics',
      location: 'Nakuru',
      description: 'Work with large-scale datasets and machine learning models. Contribute to data-driven decision making across the organization.',
      salary: 'KES 130,000 - 180,000/month',
      type: 'Full-time',
      experience: '2+ years',
      posted: '4 days ago',
      company_logo: 'DS',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow']
    },
  ])
  const [applications, setApplications] = useState<Application[]>([])

  const login = useCallback((user: User) => {
    setCurrentUser(user)
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const addJob = useCallback((job: Job) => {
    setJobs(prev => [...prev, job])
  }, [])

  const applyForJob = useCallback((jobId: string, userId: string, resume: string, coverLetter: string) => {
    const application: Application = {
      id: Date.now().toString(),
      jobId,
      userId,
      resume,
      coverLetter,
      appliedDate: new Date().toISOString(),
      status: 'pending'
    }
    setApplications(prev => [...prev, application])
  }, [])

  const getJobById = useCallback((id: string) => {
    return jobs.find(job => job.id === id)
  }, [jobs])

  const getApplicationsByUser = useCallback((userId: string) => {
    return applications.filter(app => app.userId === userId)
  }, [applications])

  const getApplicationsByJob = useCallback((jobId: string) => {
    return applications.filter(app => app.jobId === jobId)
  }, [applications])

  const updateApplicationStatus = useCallback((applicationId: string, status: string) => {
    setApplications(prev => prev.map(app =>
      app.id === applicationId ? { ...app, status: status as Application['status'] } : app
    ))
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentUser,
        jobs,
        applications,
        login,
        logout,
        addJob,
        applyForJob,
        getJobById,
        getApplicationsByUser,
        getApplicationsByJob,
        updateApplicationStatus
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
