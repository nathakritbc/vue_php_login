<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Unset only the username session variable
unset($_SESSION['username']);

// Check if the username session variable is unset
if (!isset($_SESSION['username'])) {
    echo json_encode(array("success" => true, "message" => "Username session variable unset successfully."));
} else {
    echo json_encode(array("success" => false, "message" => "Failed to unset username session variable."));
}
?>