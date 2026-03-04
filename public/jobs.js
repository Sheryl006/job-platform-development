// Load jobs from localStorage
loadJobs();

// Display jobs
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
        <div class="job-card">
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <div class="meta">
                <span class="meta-item">${job.location}</span>
                <span class="meta-item">${job.category}</span>
                <span class="meta-item">${job.salary}</span>
            </div>
            <p class="description">${job.description.substring(0, 120)}...</p>
            <div class="actions">
                <a href="job-detail.html?id=${job.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Filter jobs by category
function filterJobs() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    let filtered = jobs;

    if (selectedCategory) {
        filtered = jobs.filter(job => job.category === selectedCategory);
    }

    displayJobs(filtered);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }
    displayJobs(jobs);
});
