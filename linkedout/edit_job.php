<?php
session_start();
include 'config.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit();
}

// Check if job ID is provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header('Location: admin_dashboard.php');
    exit();
}

$job_id = mysqli_real_escape_string($conn, $_GET['id']);

// Fetch job details
$query = "SELECT * FROM jobs WHERE id = '$job_id'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) === 0) {
    header('Location: admin_dashboard.php');
    exit();
}

$job = mysqli_fetch_assoc($result);

$success = '';
$error = '';

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $organization = isset($_POST['organization']) ? trim($_POST['organization']) : '';
    $category = isset($_POST['category']) ? trim($_POST['category']) : '';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';

    // Validate inputs
    if (empty($title) || empty($organization) || empty($category) || empty($description) || empty($email)) {
        $error = 'All fields are required.';
    } else {
        // Escape strings for database
        $title = mysqli_real_escape_string($conn, $title);
        $organization = mysqli_real_escape_string($conn, $organization);
        $category = mysqli_real_escape_string($conn, $category);
        $description = mysqli_real_escape_string($conn, $description);
        $email = mysqli_real_escape_string($conn, $email);

        // Update database
        $update_query = "UPDATE jobs SET title = '$title', organization = '$organization', category = '$category', description = '$description', email = '$email' WHERE id = '$job_id'";

        if (mysqli_query($conn, $update_query)) {
            $success = 'Job updated successfully! <a href="admin_dashboard.php">Back to Dashboard</a>';
            // Refresh job data
            $result = mysqli_query($conn, "SELECT * FROM jobs WHERE id = '$job_id'");
            $job = mysqli_fetch_assoc($result);
        } else {
            $error = 'Error updating job: ' . mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Job - LINKED OUT</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <h1>LINKED OUT - Admin Dashboard</h1>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="jobs.php">Jobs</a></li>
            <li style="margin-left: auto;">
                <a href="admin_logout.php" onclick="return confirmLogout();">Logout</a>
            </li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <div class="container">
            <h2>Edit Job</h2>

            <?php if (!empty($success)) { ?>
                <div class="success"><?php echo $success; ?></div>
            <?php } ?>

            <?php if (!empty($error)) { ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php } ?>

            <div class="form-container">
                <form method="POST" onsubmit="return validateJobForm();">
                    <div class="form-group">
                        <label for="title">Job Title:</label>
                        <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($job['title']); ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="organization">Organization Name:</label>
                        <input type="text" id="organization" name="organization" value="<?php echo htmlspecialchars($job['organization']); ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="category">Category:</label>
                        <select id="category" name="category" required>
                            <option value="">Select a category</option>
                            <option value="Technology" <?php if ($job['category'] === 'Technology') echo 'selected'; ?>>Technology</option>
                            <option value="Finance" <?php if ($job['category'] === 'Finance') echo 'selected'; ?>>Finance</option>
                            <option value="Education" <?php if ($job['category'] === 'Education') echo 'selected'; ?>>Education</option>
                            <option value="Healthcare" <?php if ($job['category'] === 'Healthcare') echo 'selected'; ?>>Healthcare</option>
                            <option value="Sales" <?php if ($job['category'] === 'Sales') echo 'selected'; ?>>Sales</option>
                            <option value="Marketing" <?php if ($job['category'] === 'Marketing') echo 'selected'; ?>>Marketing</option>
                            <option value="Human Resources" <?php if ($job['category'] === 'Human Resources') echo 'selected'; ?>>Human Resources</option>
                            <option value="Other" <?php if ($job['category'] === 'Other') echo 'selected'; ?>>Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="description">Job Description:</label>
                        <textarea id="description" name="description" required><?php echo htmlspecialchars($job['description']); ?></textarea>
                    </div>

                    <div class="form-group">
                        <label for="email">Contact Email:</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($job['email']); ?>" required>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn" style="width: 100%;">Update Job</button>
                    </div>
                </form>

                <a href="admin_dashboard.php" class="btn btn-secondary" style="width: 100%; text-align: center; margin-top: 10px;">← Back to Dashboard</a>
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
