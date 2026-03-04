// Load jobs from localStorage
loadJobs();

// Get job ID from URL
function getJobIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || null;
}

// Display job detail
function displayJobDetail() {
    const jobId = getJobIdFromUrl();
    const job = jobId ? jobs.find(j => j.id === jobId) : null;
    const container = document.getElementById('jobDetail');

    if (!job) {
        container.innerHTML = `
            <h2>Job Not Found</h2>
            <p>The job you are looking for does not exist.</p>
            <a href="jobs.html" class="btn btn-primary">Back to Jobs</a>
        `;
        return;
    }

    container.innerHTML = `
        <a href="jobs.html" class="btn btn-secondary" style="margin-bottom: 20px;">Back to Jobs</a>
        
        <h2>${job.title}</h2>
        <p class="company">${job.company}</p>
        
        <div class="meta">
            <div class="meta-item">
                <span style="font-weight: bold;">Location:</span> ${job.location}
            </div>
            <div class="meta-item">
                <span style="font-weight: bold;">Category:</span> ${job.category}
            </div>
            <div class="meta-item">
                <span style="font-weight: bold;">Salary:</span> ${job.salary}
            </div>
            <div class="meta-item">
                <span style="font-weight: bold;">Posted:</span> ${job.datePosted}
            </div>
        </div>

        <h3>Job Description</h3>
        <p class="description">${job.description}</p>

        <h3>Requirements</h3>
        <p class="description">${job.requirements}</p>

        <div class="actions">
            <button class="btn btn-primary" onclick="applyJob()">Apply Now</button>
            <a href="jobs.html" class="btn btn-secondary">Back to Jobs</a>
        </div>
    `;
}

// Apply for job
function applyJob() {
    alert('Thank you for your interest! Your application has been submitted successfully.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', displayJobDetail);
