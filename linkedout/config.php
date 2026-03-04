<?php
// Database Configuration
$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'linkedout_db';

// Create connection
$conn = mysqli_connect($host, $db_user, $db_password, $db_name);

// Check connection
if (!$conn) {
    die('Connection Failed: ' . mysqli_connect_error());
}

// Set charset to utf8
mysqli_set_charset($conn, 'utf8');
?>
