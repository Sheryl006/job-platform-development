<?php
session_start();

// Hard-coded admin credentials
$admin_username = 'admin';
$admin_password = 'admin123';

$error = '';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Validate credentials
    if ($username === $admin_username && $password === $admin_password) {
        // Set session
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        header('Location: admin_dashboard.php');
        exit();
    } else {
        $error = 'Invalid username or password. Please try again.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - LINKED OUT</title>
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
            <h2>Admin Login</h2>

            <?php if (!empty($error)) { ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php } ?>

            <div class="form-container">
                <form method="POST" onsubmit="return validateLoginForm();">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required>
                    </div>

                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn" style="width: 100%;">Login</button>
                    </div>
                </form>

                <p style="text-align: center; color: #666; margin-top: 20px;">
                    Demo Credentials:<br>
                    <strong>Username:</strong> admin<br>
                    <strong>Password:</strong> admin123
                </p>
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
