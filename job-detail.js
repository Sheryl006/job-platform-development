// Get job ID from URL parameter
function getJobIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Display job details
function displayJobDetail() {
    const jobDetail = document.getElementById('jobDetail');
    const jobId = getJobIdFromURL();
    
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) {
        jobDetail.innerHTML = '<p>Job not found.</p>';
        return;
    }
    
    jobDetail.innerHTML = `
        <h1>${job.title}</h1>
        
        <div class="job-meta">
            <div class="job-meta-item">
                <label>Company</label>
                <span>${job.company}</span>
            </div>
            <div class="job-meta-item">
                <label>Location</label>
                <span>${job.location}</span>
            </div>
            <div class="job-meta-item">
                <label>Salary</label>
                <span>${job.salary}</span>
            </div>
            <div class="job-meta-item">
                <label>Category</label>
                <span>${job.category}</span>
            </div>
        </div>
        
        <h2>Job Description</h2>
        <div class="description">${job.description}</div>
        
        <button class="apply-button" onclick="applyForJob(${job.id})">Apply Now</button>
    `;
}

// Handle job application
function applyForJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    alert(`Thank you for your interest in the ${job.title} position at ${job.company}. Your application has been submitted!`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayJobDetail();
});
