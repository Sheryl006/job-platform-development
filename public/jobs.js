// Display jobs on jobs.html
function displayJobs(jobsToDisplay) {
    const jobsList = document.getElementById('jobsList');
    const noResults = document.getElementById('noResults');

    if (!jobsToDisplay || jobsToDisplay.length === 0) {
        jobsList.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    jobsList.innerHTML = jobsToDisplay.map(job => `
        <div class="job-card" onclick="goToJobDetail(${job.id})">
            <h3>${escapeHtml(job.title)}</h3>
            <div class="company">${escapeHtml(job.company)}</div>
            <div class="meta">
                <div class="meta-item">📍 ${escapeHtml(job.location)}</div>
                <div class="meta-item">💼 ${escapeHtml(job.category)}</div>
                <div class="meta-item">💰 ${escapeHtml(job.salary)}</div>
            </div>
            <div class="description">${escapeHtml(job.description.substring(0, 150))}...</div>
            <button class="btn btn-primary" onclick="event.stopPropagation();">View Details</button>
        </div>
    `).join('');
}

// Filter jobs by category
function filterJobs() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    let filteredJobs = jobs;

    if (selectedCategory) {
        filteredJobs = jobs.filter(job => job.category === selectedCategory);
    }

    displayJobs(filteredJobs);
}

// Navigate to job detail page
function goToJobDetail(jobId) {
    localStorage.setItem('selectedJobId', jobId);
    window.location.href = 'job-detail.html';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Load jobs from localStorage
function loadJobsFromStorage() {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
        jobs = JSON.parse(savedJobs);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadJobsFromStorage();
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }
    displayJobs(jobs);
});
