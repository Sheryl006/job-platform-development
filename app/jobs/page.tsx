'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getJobs } from '@/lib/data';

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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allJobs = getJobs();
    setJobs(allJobs);
    setFilteredJobs(allJobs);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [selectedCategory, searchTerm, jobs]);

  const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing'];

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">Job Listings</h1>

      <div className="grid-2 mb-8">
        <div className="form-group">
          <label htmlFor="search">Search Jobs</label>
          <input
            id="search"
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Filter by Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
      </div>

      <div className="space-y-4">
        {filteredJobs.map(job => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div className="job-card cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3>{job.title}</h3>
                  <p className="font-semibold text-blue-600">{job.company}</p>
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{job.salary}</p>
                  <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    {job.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
              <p className="text-sm text-gray-500 mt-3">Posted: {job.posted}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="alert alert-info text-center py-8">
          <p>No jobs found matching your criteria. Try adjusting your search.</p>
        </div>
      )}
    </main>
  );
}
