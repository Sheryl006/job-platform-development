'use client';

import { useState, useEffect } from 'react';
import { getJobs, addJob, updateJob, deleteJob } from '@/lib/data';

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

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    category: 'Technology',
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      loadJobs();
    }
  }, []);

  const loadJobs = () => {
    setJobs(getJobs());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      loadJobs();
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials. Use admin/admin123');
    }
  };

  const handleLogout = () => {
    localStorage.setItem('adminLoggedIn', 'false');
    setIsLoggedIn(false);
    setJobs([]);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateJob(editingId, formData);
      setEditingId(null);
    } else {
      addJob(formData);
    }
    setFormData({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      category: 'Technology',
    });
    setShowForm(false);
    loadJobs();
  };

  const handleEdit = (job: Job) => {
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      description: job.description,
      category: job.category,
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
      loadJobs();
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="container py-12 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
              />
            </div>
            <button type="submit" className="w-full btn btn-primary">
              Login
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">Demo: admin / admin123</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="mb-8">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              title: '',
              company: '',
              location: '',
              salary: '',
              description: '',
              category: 'Technology',
            });
          }}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Job'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            {editingId ? 'Edit Job' : 'Add New Job'}
          </h2>
          <form onSubmit={handleAddJob}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="title">Job Title *</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company *</label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary *</label>
                <input
                  id="salary"
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g., $50,000 - $70,000"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Marketing</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Job Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Job' : 'Add Job'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-blue-900 p-6 border-b">Jobs ({jobs.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Title</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Company</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Salary</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-gray-900">{job.company}</td>
                  <td className="px-6 py-4 text-gray-900">{job.location}</td>
                  <td className="px-6 py-4 text-gray-900">{job.salary}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                      {job.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
