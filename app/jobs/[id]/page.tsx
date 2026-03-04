'use client';

import { useParams, useRouter } from 'next/navigation';
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
  requirements?: string;
  benefits?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobs = getJobs();
    const found = jobs.find(j => j.id === parseInt(params.id as string));
    setJob(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <main className="container py-12"><p>Loading...</p></main>;
  }

  if (!job) {
    return (
      <main className="container py-12">
        <div className="alert alert-error">
          <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
          <p>The job you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/jobs')} className="btn btn-primary mt-4">
            Back to Jobs
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-12">
      <button
        onClick={() => router.push('/jobs')}
        className="text-blue-600 hover:text-blue-900 mb-6"
      >
        ← Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">{job.title}</h1>
          <p className="text-2xl text-blue-600 font-semibold">{job.company}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b">
          <div>
            <p className="text-gray-600 text-sm">Location</p>
            <p className="font-semibold text-gray-900">{job.location}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Salary</p>
            <p className="font-semibold text-green-600">{job.salary}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Category</p>
            <p className="font-semibold text-blue-600">{job.category}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Posted</p>
            <p className="font-semibold text-gray-900">{job.posted}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        {job.requirements && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
          </div>
        )}

        {job.benefits && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Benefits</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.benefits}</p>
          </div>
        )}

        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">Ready to apply?</p>
          <button className="btn btn-primary">Apply Now</button>
        </div>
      </div>
    </main>
  );
}
