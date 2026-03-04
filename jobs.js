// Display all jobs
function displayJobs(jobsToDisplay) {
    const jobsList = document.getElementById('jobsList');
    const noJobs = document.getElementById('noJobs');
    
    if (jobsToDisplay.length === 0) {
        jobsList.innerHTML = '';
        noJobs.style.display = 'block';
    } else {
        noJobs.style.display = 'none';
        jobsList.innerHTML = jobsToDisplay.map(job => `
            <div class="job-card">
                <h3>${job.title}</h3>
                <div class="company">${job.company}</div>
                <div class="location">📍 ${job.location}</div>
                <div class="category">${job.category}</div>
                <div class="salary">${job.salary}</div>
                <a href="job-detail.html?id=${job.id}">View Details →</a>
            </div>
        `).join('');
    }
}

// Filter jobs by category
function filterJobs() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === '') {
        displayJobs(jobs);
    } else {
        const filteredJobs = jobs.filter(job => job.category === selectedCategory);
        displayJobs(filteredJobs);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }
    displayJobs(jobs);
});
