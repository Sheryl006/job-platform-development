// Load jobs from localStorage
loadJobs();

// Display featured jobs on home page
function displayFeaturedJobs() {
    const container = document.getElementById('featuredJobs');
    if (!container) return;

    const featured = jobs.slice(0, 3);
    
    container.innerHTML = featured.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <div class="meta">
                <span class="meta-item">${job.location}</span>
                <span class="meta-item">${job.category}</span>
                <span class="meta-item">${job.salary}</span>
            </div>
            <p class="description">${job.description.substring(0, 100)}...</p>
            <div class="actions">
                <a href="job-detail.html?id=${job.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', displayFeaturedJobs);
