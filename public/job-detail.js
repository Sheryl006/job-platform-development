// Display job detail
function displayJobDetail() {
    const jobId = parseInt(localStorage.getItem('selectedJobId'));
    const job = jobs.find(j => j.id === jobId);

    const jobDetailDiv = document.getElementById('jobDetail');

    if (!job) {
        jobDetailDiv.innerHTML = `
            <h2>Job Not Found</h2>
            <p>The job you are looking for does not exist.</p>
            <a href="jobs.html" class="btn btn-primary">Back to Jobs</a>
        `;
        return;
    }

    jobDetailDiv.innerHTML = `
        <a href="jobs.html" class="btn btn-secondary" style="margin-bottom: 20px;">Back to Jobs</a>
        
        <h2>${escapeHtml(job.title)}</h2>
        <div class="company">${escapeHtml(job.company)}</div>
        
        <div class="meta">
            <div class="meta-item">
                <div class="meta-label">Location</div>
                <div class="meta-value">${escapeHtml(job.location)}</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Category</div>
                <div class="meta-value">${escapeHtml(job.category)}</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Salary Range</div>
                <div class="meta-value">${escapeHtml(job.salary)}</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Posted Date</div>
                <div class="meta-value">${escapeHtml(job.datePosted)}</div>
            </div>
        </div>

        <h3>Job Description</h3>
        <div class="description">${escapeHtml(job.description)}</div>

        <h3>Requirements</h3>
        <div class="description">${escapeHtml(job.requirements)}</div>

        <div>
            <button class="btn btn-primary" onclick="applyJob()">Apply Now</button>
            <a href="jobs.html" class="btn btn-secondary">Back to Jobs</a>
        </div>
    `;
}

// Apply for job
function applyJob() {
    alert('Thank you for your interest! Your application has been submitted successfully. An employer will contact you soon.');
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

// Load job detail on page load
document.addEventListener('DOMContentLoaded', function() {
    loadJobsFromStorage();
    displayJobDetail();
});
