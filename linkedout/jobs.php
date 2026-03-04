<?php
include 'config.php';

// Get selected category filter
$filter_category = isset($_GET['category']) ? $_GET['category'] : '';

// Build query
$query = "SELECT * FROM jobs ORDER BY date_posted DESC";

if ($filter_category !== '' && $filter_category !== 'all') {
    $filter_category = mysqli_real_escape_string($conn, $filter_category);
    $query = "SELECT * FROM jobs WHERE category = '$filter_category' ORDER BY date_posted DESC";
}

$result = mysqli_query($conn, $query);
$jobs = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $jobs[] = $row;
    }
}

// Get all categories for filter dropdown
$category_query = "SELECT DISTINCT category FROM jobs ORDER BY category ASC";
$category_result = mysqli_query($conn, $category_query);
$categories = array();

if (mysqli_num_rows($category_result) > 0) {
    while ($row = mysqli_fetch_assoc($category_result)) {
        $categories[] = $row['category'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Listings - LINKED OUT</title>
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
            <h2>Job Listings</h2>

            <!-- Filter Section -->
            <div class="filter-section">
                <label for="category-filter"><strong>Filter by Category:</strong></label>
                <select id="category-filter" name="category" onchange="filterJobs()">
                    <option value="all">All Categories</option>
                    <?php foreach ($categories as $cat) { ?>
                        <option value="<?php echo $cat; ?>" <?php if ($filter_category === $cat) echo 'selected'; ?>>
                            <?php echo $cat; ?>
                        </option>
                    <?php } ?>
                </select>
            </div>

            <!-- Job Listings -->
            <?php if (count($jobs) > 0) { ?>
                <p style="color: #666; margin-bottom: 20px;">Found <?php echo count($jobs); ?> job(s)</p>

                <?php foreach ($jobs as $job) { ?>
                    <div class="job-card">
                        <h3><?php echo htmlspecialchars($job['title']); ?></h3>
                        <div class="job-info">
                            <div class="job-meta">
                                <span><strong>Organization:</strong> <?php echo htmlspecialchars($job['organization']); ?></span>
                                <span><strong>Category:</strong> <span class="category-badge"><?php echo htmlspecialchars($job['category']); ?></span></span>
                                <span><strong>Posted:</strong> <?php echo date('M d, Y', strtotime($job['date_posted'])); ?></span>
                            </div>
                            <a href="job_details.php?id=<?php echo $job['id']; ?>" class="btn">View Details</a>
                        </div>
                    </div>
                <?php } ?>
            <?php } else { ?>
                <div class="error" style="text-align: center;">
                    <p>No jobs found in this category. Please try another category or view all jobs.</p>
                </div>
            <?php } ?>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2024 LINKED OUT. All rights reserved. A Kenyan Job Advertisement Platform.</p>
    </footer>

    <script src="script.js"></script>
    <script>
        function filterJobs() {
            const category = document.getElementById('category-filter').value;
            if (category === 'all') {
                window.location.href = 'jobs.php';
            } else {
                window.location.href = 'jobs.php?category=' + encodeURIComponent(category);
            }
        }
    </script>
</body>
</html>
