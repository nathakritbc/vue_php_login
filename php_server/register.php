<?php
include_once('./config/db.php'); // Ensure you have a file to manage DB connection

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if(!@$data->username){
    echo json_encode(array("success" => false, "message" => "Username is required"));
    exit;
}

if(!@$data->password){
    echo json_encode(array("success" => false, "message" => "Password is required"));
    exit;
}

$username = $data->username;
$password = password_hash($data->password, PASSWORD_BCRYPT);

 
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
if ($conn->query($sql) === TRUE) {
  echo json_encode(array("success" => true,"message" => "User created successfully."));
} else {
  echo json_encode(array("success" => false, "message" => $conn->error));
}

$conn->close();
?>