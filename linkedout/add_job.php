<?php
session_start();
include 'config.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit();
}

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

        // Insert into database
        $query = "INSERT INTO jobs (title, organization, category, description, email) VALUES ('$title', '$organization', '$category', '$description', '$email')";

        if (mysqli_query($conn, $query)) {
            $success = 'Job added successfully! <a href="admin_dashboard.php">Back to Dashboard</a>';
        } else {
            $error = 'Error adding job: ' . mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Job - LINKED OUT</title>
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
            <h2>Add New Job</h2>

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
                        <input type="text" id="title" name="title" required>
                    </div>

                    <div class="form-group">
                        <label for="organization">Organization Name:</label>
                        <input type="text" id="organization" name="organization" required>
                    </div>

                    <div class="form-group">
                        <label for="category">Category:</label>
                        <select id="category" name="category" required>
                            <option value="">Select a category</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="description">Job Description:</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>

                    <div class="form-group">
                        <label for="email">Contact Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn" style="width: 100%;">Add Job</button>
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
