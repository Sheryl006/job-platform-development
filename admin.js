// Admin credentials (hardcoded for demo)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Handle admin login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        loadAdminJobs();
    } else {
        alert('Invalid username or password');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showLoginForm();
}

// Show add job form
function showAddForm() {
    document.getElementById('addJobForm').style.display = 'block';
}

// Hide add job form
function hideAddForm() {
    document.getElementById('addJobForm').style.display = 'none';
    document.getElementById('jobTitle').value = '';
    document.getElementById('company').value = '';
    document.getElementById('location').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
}

// Handle add job
function handleAddJob(event) {
    event.preventDefault();
    
    const newJob = {
        id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        location: document.getElementById('location').value,
        salary: document.getElementById('salary').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value
    };
    
    jobs.push(newJob);
    saveJobs();
    loadAdminJobs();
    hideAddForm();
    alert('Job added successfully!');
}

// Load jobs in admin dashboard
function loadAdminJobs() {
    const tbody = document.querySelector('.jobs-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = jobs.map(job => `
        <tr>
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td>${job.location}</td>
            <td>${job.salary}</td>
            <td>${job.category}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-edit" onclick="editJob(${job.id})">Edit</button>
                    <button class="btn btn-delete" onclick="deleteJob(${job.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Edit job
function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    const newTitle = prompt('Job Title:', job.title);
    if (newTitle === null) return;
    
    const newCompany = prompt('Company:', job.company);
    if (newCompany === null) return;
    
    const newLocation = prompt('Location:', job.location);
    if (newLocation === null) return;
    
    const newSalary = prompt('Salary:', job.salary);
    if (newSalary === null) return;
    
    const newDescription = prompt('Description:', job.description);
    if (newDescription === null) return;
    
    job.title = newTitle;
    job.company = newCompany;
    job.location = newLocation;
    job.salary = newSalary;
    job.description = newDescription;
    
    saveJobs();
    loadAdminJobs();
    alert('Job updated successfully!');
}

// Delete job
function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
        jobs = jobs.filter(j => j.id !== jobId);
        saveJobs();
        loadAdminJobs();
        alert('Job deleted successfully!');
    }
}

// Save jobs to localStorage
function saveJobs() {
    localStorage.setItem('linkedout-jobs', JSON.stringify(jobs));
}

// Check if admin is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
        loadAdminJobs();
    } else {
        showLoginForm();
    }
});
