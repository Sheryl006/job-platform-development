<?php
include 'config.php';

// Check if job ID is provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header('Location: jobs.php');
    exit();
}

$job_id = mysqli_real_escape_string($conn, $_GET['id']);

// Fetch job details
$query = "SELECT * FROM jobs WHERE id = '$job_id'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) === 0) {
    header('Location: jobs.php');
    exit();
}

$job = mysqli_fetch_assoc($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($job['title']); ?> - LINKED OUT</title>
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

    <!-- Main Content -->
    <main>
        <div class="container">
            <a href="jobs.php" class="btn btn-secondary" style="margin-bottom: 20px;">← Back to Jobs</a>

            <div class="job-details">
                <h2><?php echo htmlspecialchars($job['title']); ?></h2>

                <div class="detail-row">
                    <span class="detail-label">Organization:</span>
                    <span class="detail-value"><?php echo htmlspecialchars($job['organization']); ?></span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value"><span class="category-badge"><?php echo htmlspecialchars($job['category']); ?></span></span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Posted Date:</span>
                    <span class="detail-value"><?php echo date('F d, Y', strtotime($job['date_posted'])); ?></span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Contact Email:</span>
                    <span class="detail-value"><a href="mailto:<?php echo htmlspecialchars($job['email']); ?>"><?php echo htmlspecialchars($job['email']); ?></a></span>
                </div>

                <h3>Job Description</h3>
                <div class="description">
                    <?php echo nl2br(htmlspecialchars($job['description'])); ?>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p><strong>Interested in this position?</strong></p>
                    <p>Please send your CV and cover letter to: <a href="mailto:<?php echo htmlspecialchars($job['email']); ?>"><?php echo htmlspecialchars($job['email']); ?></a></p>
                </div>
            </div>

            <div style="margin-top: 30px;">
                <a href="jobs.php" class="btn btn-secondary">← Back to Jobs</a>
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
