// Display featured jobs on home page
function displayFeaturedJobs() {
    const featuredContainer = document.getElementById('featuredJobs');
    if (!featuredContainer) return;

    // Show only first 3 jobs as featured
    const featuredJobs = jobs.slice(0, 3);
    
    featuredContainer.innerHTML = featuredJobs.map(job => `
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedJobs();
});
