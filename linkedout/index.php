<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LINKED OUT - Job Advertisement Platform</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <h1>LINKED OUT</h1>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="jobs.php">Jobs</a></li>
            <li><a href="admin_login.php">Admin Login</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h2>Find Your Dream Job</h2>
            <p>Explore thousands of job opportunities from top companies across Kenya. Connect with employers and advance your career.</p>
            <a href="jobs.php" class="btn">View Available Jobs</a>
        </div>
    </section>

    <!-- Main Content -->
    <main>
        <div class="container">
            <h2>About LINKED OUT</h2>
            <p>LINKED OUT is Kenya's premier online job advertisement and search platform. We connect job seekers with employers across various industries including Technology, Finance, Education, and more.</p>
            
            <h3>Why Choose LINKED OUT?</h3>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li>Access to thousands of job listings from top companies</li>
                <li>Easy-to-use search and filter functionality</li>
                <li>Detailed job descriptions and company information</li>
                <li>Direct contact with employers</li>
                <li>Regular updates with new job opportunities</li>
            </ul>

            <h3>Featured Categories</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                <div class="job-card">
                    <h3>Technology</h3>
                    <p>Software engineers, developers, data scientists, and IT professionals.</p>
                </div>
                <div class="job-card">
                    <h3>Finance</h3>
                    <p>Financial analysts, accountants, investment managers, and banking professionals.</p>
                </div>
                <div class="job-card">
                    <h3>Education</h3>
                    <p>Teachers, lecturers, trainers, and educational administrators.</p>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2024 LINKED OUT. All rights reserved. A Kenyan Job Advertisement Platform.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
