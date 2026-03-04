interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  category: string;
  posted: string;
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    description: 'We are looking for a Senior React Developer with 5+ years of experience to join our team. You will be responsible for building scalable web applications and mentoring junior developers.',
    category: 'Technology',
    posted: '2024-01-15'
  },
  {
    id: 2,
    title: 'Financial Analyst',
    company: 'Investment Bank',
    location: 'New York, NY',
    salary: '$100,000 - $140,000',
    description: 'Join our finance team as a Financial Analyst. Analyze market trends, prepare financial reports, and provide insights for investment decisions.',
    category: 'Finance',
    posted: '2024-01-14'
  },
  {
    id: 3,
    title: 'Registered Nurse',
    company: 'City Hospital',
    location: 'Boston, MA',
    salary: '$65,000 - $85,000',
    description: 'Caring and compassionate Registered Nurse needed for our 24/7 patient care team. Must have valid RN license and patient care experience.',
    category: 'Healthcare',
    posted: '2024-01-13'
  },
  {
    id: 4,
    title: 'High School Mathematics Teacher',
    company: 'Oakville High School',
    location: 'Denver, CO',
    salary: '$50,000 - $65,000',
    description: 'Experienced Mathematics teacher wanted. Develop curriculum, teach engaging lessons, and mentor students for academic success.',
    category: 'Education',
    posted: '2024-01-12'
  },
  {
    id: 5,
    title: 'Digital Marketing Manager',
    company: 'Creative Agency',
    location: 'Los Angeles, CA',
    salary: '$80,000 - $110,000',
    description: 'Lead our digital marketing campaigns across multiple channels. Manage social media, email, and content strategies to drive engagement.',
    category: 'Marketing',
    posted: '2024-01-11'
  },
  {
    id: 6,
    title: 'Full Stack Developer',
    company: 'StartUp Labs',
    location: 'Remote',
    salary: '$90,000 - $130,000',
    description: 'Develop web applications using modern tech stack. Work with Node.js, React, and MongoDB in a fast-paced startup environment.',
    category: 'Technology',
    posted: '2024-01-10'
  },
  {
    id: 7,
    title: 'Content Marketing Specialist',
    company: 'Media Group',
    location: 'Chicago, IL',
    salary: '$60,000 - $80,000',
    description: 'Create engaging content for blogs, social media, and websites. Develop content strategy to increase brand awareness.',
    category: 'Marketing',
    posted: '2024-01-09'
  },
  {
    id: 8,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Seattle, WA',
    salary: '$110,000 - $150,000',
    description: 'Build machine learning models and analyze large datasets. Work with Python, SQL, and ML frameworks to drive data insights.',
    category: 'Technology',
    posted: '2024-01-08'
  }
];

// Get all jobs from localStorage or return initial jobs
export function getJobs(): Job[] {
  if (typeof window === 'undefined') return initialJobs;
  
  const stored = localStorage.getItem('linkedout_jobs');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialJobs;
    }
  }
  
  // Initialize localStorage with initial jobs
  localStorage.setItem('linkedout_jobs', JSON.stringify(initialJobs));
  return initialJobs;
}

// Add a new job
export function addJob(jobData: Omit<Job, 'id' | 'posted'>) {
  const jobs = getJobs();
  const newJob: Job = {
    ...jobData,
    id: Math.max(...jobs.map(j => j.id), 0) + 1,
    posted: new Date().toISOString().split('T')[0]
  };
  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
}

// Update a job
export function updateJob(id: number, jobData: Omit<Job, 'id' | 'posted'>) {
  const jobs = getJobs();
  const index = jobs.findIndex(j => j.id === id);
  if (index !== -1) {
    jobs[index] = {
      ...jobData,
      id,
      posted: jobs[index].posted
    };
    saveJobs(jobs);
    return jobs[index];
  }
  return null;
}

// Delete a job
export function deleteJob(id: number) {
  const jobs = getJobs();
  const filtered = jobs.filter(j => j.id !== id);
  saveJobs(filtered);
}

// Save jobs to localStorage
function saveJobs(jobs: Job[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('linkedout_jobs', JSON.stringify(jobs));
  }
}
