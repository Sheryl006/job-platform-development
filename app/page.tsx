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

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const jobs = getJobs();
    setFeaturedJobs(jobs.slice(0, 3));
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Welcome to LINKED OUT</h1>
          <p>Discover your dream job opportunity today</p>
          <Link href="/jobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Featured Jobs</h2>
        <div className="grid-3">
          {featuredJobs.map(job => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div className="job-card cursor-pointer">
                <h3>{job.title}</h3>
                <p className="font-semibold text-blue-600">{job.company}</p>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-lg font-bold text-green-600 mt-2">{job.salary}</p>
                <p className="text-sm text-gray-500 mt-2">Posted: {job.posted}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12 mt-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Why Choose LINKED OUT?</h2>
          <div className="grid-3 mt-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Browse jobs quickly and apply with just a few clicks.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Top Companies</h3>
              <p className="text-gray-600">Find positions from leading companies worldwide.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Career Growth</h3>
              <p className="text-gray-600">Explore opportunities that match your career goals.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
