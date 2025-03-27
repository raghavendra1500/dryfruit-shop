<?php
// filepath: c:\Users\Admin\dryfruit-shop\google_signin.php
require 'vendor/autoload.php'; // Include Google API PHP Client Library

$client = new Google_Client(['client_id' => 'YOUR_GOOGLE_CLIENT_ID']); // Replace with your Google Client ID
$token = json_decode(file_get_contents('php://input'), true)['token'];

$payload = $client->verifyIdToken($token);
if ($payload) {
    $googleId = $payload['sub'];
    $email = $payload['email'];
    $name = $payload['name'];

    // Connect to the database
    $conn = new mysqli('localhost', 'root', '', 'dryfruit_shop');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if user already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "User logged in successfully!";
    } else {
        // Register the user
        $stmt = $conn->prepare("INSERT INTO users (email, google_id, name) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $email, $googleId, $name);
        if ($stmt->execute()) {
            echo "User registered and logged in successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid Google token.";
}
?>