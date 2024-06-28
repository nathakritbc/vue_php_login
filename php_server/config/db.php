<?php
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "vue_php_login";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>