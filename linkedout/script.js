// Form Validation
function validateLoginForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '') {
        alert('Please enter your username');
        return false;
    }

    if (password === '') {
        alert('Please enter your password');
        return false;
    }

    return true;
}

function validateJobForm() {
    const title = document.getElementById('title').value.trim();
    const organization = document.getElementById('organization').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const email = document.getElementById('email').value.trim();

    if (title === '') {
        alert('Please enter job title');
        return false;
    }

    if (organization === '') {
        alert('Please enter organization name');
        return false;
    }

    if (category === '') {
        alert('Please select a category');
        return false;
    }

    if (description === '') {
        alert('Please enter job description');
        return false;
    }

    if (email === '') {
        alert('Please enter contact email');
        return false;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    return true;
}

// Confirm Delete Action
function confirmDelete() {
    return confirm('Are you sure you want to delete this job? This action cannot be undone.');
}

// Simple Logout Confirmation
function confirmLogout() {
    return confirm('Are you sure you want to logout?');
}
