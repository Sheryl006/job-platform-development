// Display featured jobs on home page
function displayFeaturedJobs() {
    const featuredJobsContainer = document.getElementById('featured-jobs');
    
    if (!featuredJobsContainer) return;

    const featuredJobs = jobs.slice(0, 6);

    featuredJobsContainer.innerHTML = featuredJobs.map(job => `
        <div class="job-card" onclick="goToJobDetail(${job.id})">
            <h3>${escapeHtml(job.title)}</h3>
            <div class="company">${escapeHtml(job.company)}</div>
            <div class="meta">
                <div class="meta-item">📍 ${escapeHtml(job.location)}</div>
                <div class="meta-item">💼 ${escapeHtml(job.category)}</div>
            </div>
            <div class="salary">${escapeHtml(job.salary)}</div>
        </div>
    `).join('');
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
    displayFeaturedJobs();
});
