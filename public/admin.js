// Load jobs first
loadJobs();

// Admin login
function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        loadAdminJobs();
    } else {
        alert('Invalid username or password. Demo: admin / admin123');
    }
}

// Admin logout
function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('adminUsername').value = 'admin';
    document.getElementById('adminPassword').value = 'admin123';
}

// Show dashboard if logged in
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
}

// Add new job
function addJob() {
    const title = document.getElementById('jobTitle').value.trim();
    const company = document.getElementById('jobCompany').value.trim();
    const category = document.getElementById('jobCategory').value;
    const location = document.getElementById('jobLocation').value.trim();
    const salary = document.getElementById('jobSalary').value.trim();
    const description = document.getElementById('jobDescription').value.trim();

    if (!title || !company || !category || !location || !salary || !description) {
        alert('Please fill in all fields');
        return;
    }

    const newJob = {
        id: Math.max(...jobs.map(j => j.id), 0) + 1,
        title: title,
        company: company,
        category: category,
        location: location,
        salary: salary,
        description: description,
        requirements: 'To be determined',
        datePosted: new Date().toISOString().split('T')[0]
    };

    jobs.push(newJob);
    saveJobs();

    // Clear form
    document.getElementById('jobTitle').value = '';
    document.getElementById('jobCompany').value = '';
    document.getElementById('jobCategory').value = '';
    document.getElementById('jobLocation').value = '';
    document.getElementById('jobSalary').value = '';
    document.getElementById('jobDescription').value = '';

    loadAdminJobs();
    alert('Job added successfully!');
}

// Load and display jobs in admin dashboard
function loadAdminJobs() {
    const adminJobsList = document.getElementById('adminJobsList');

    if (jobs.length === 0) {
        adminJobsList.innerHTML = '<p>No jobs available.</p>';
        return;
    }

    adminJobsList.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <div class="meta">
                <span class="meta-item">${job.location}</span>
                <span class="meta-item">${job.category}</span>
            </div>
            <div class="actions">
                <button class="btn btn-success" onclick="editJob(${job.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteJob(${job.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Edit job
function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const newTitle = prompt('Edit Job Title:', job.title);
    if (newTitle !== null && newTitle.trim()) {
        job.title = newTitle.trim();
        saveJobs();
        loadAdminJobs();
    }
}

// Delete job
function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
        jobs = jobs.filter(job => job.id !== jobId);
        saveJobs();
        loadAdminJobs();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
        loadAdminJobs();
    }
});
