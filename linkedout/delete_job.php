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

// Check if job exists
$query = "SELECT * FROM jobs WHERE id = '$job_id'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) === 0) {
    header('Location: admin_dashboard.php');
    exit();
}

// Delete the job
$delete_query = "DELETE FROM jobs WHERE id = '$job_id'";

if (mysqli_query($conn, $delete_query)) {
    header('Location: admin_dashboard.php?message=Job deleted successfully');
    exit();
} else {
    header('Location: admin_dashboard.php?error=Error deleting job');
    exit();
}
?>
