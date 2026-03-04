<?php
session_start();
include 'config.php';

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit();
}

// Fetch all jobs
$query = "SELECT * FROM jobs ORDER BY date_posted DESC";
$result = mysqli_query($conn, $query);
$jobs = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $jobs[] = $row;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - LINKED OUT</title>
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
            <h2>Admin Dashboard</h2>

            <p>Welcome, <strong><?php echo htmlspecialchars($_SESSION['admin_username']); ?></strong>!</p>

            <div style="margin-bottom: 30px;">
                <a href="add_job.php" class="btn">+ Add New Job</a>
            </div>

            <?php if (count($jobs) > 0) { ?>
                <h3>Manage Jobs (Total: <?php echo count($jobs); ?>)</h3>

                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Organization</th>
                                <th>Category</th>
                                <th>Posted Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($jobs as $job) { ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($job['title']); ?></td>
                                    <td><?php echo htmlspecialchars($job['organization']); ?></td>
                                    <td><?php echo htmlspecialchars($job['category']); ?></td>
                                    <td><?php echo date('M d, Y', strtotime($job['date_posted'])); ?></td>
                                    <td>
                                        <a href="edit_job.php?id=<?php echo $job['id']; ?>" class="btn btn-secondary" style="padding: 8px 12px; font-size: 12px; margin-right: 5px;">Edit</a>
                                        <a href="delete_job.php?id=<?php echo $job['id']; ?>" class="btn btn-danger" style="padding: 8px 12px; font-size: 12px;" onclick="return confirmDelete();">Delete</a>
                                    </td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            <?php } else { ?>
                <div class="error" style="text-align: center;">
                    <p>No jobs added yet. <a href="add_job.php">Add your first job</a></p>
                </div>
            <?php } ?>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2024 LINKED OUT. All rights reserved. A Kenyan Job Advertisement Platform.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
