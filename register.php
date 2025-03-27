<?php
// filepath: c:\Users\Admin\dryfruit-shop\register.php
session_start();
$host = 'localhost'; // Database host
$db = 'dryfruit_shop'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password

// Connect to the database
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    // Validate mobile number
    if (!preg_match('/^[0-9]{10}$/', $mobile)) {
        echo "Invalid mobile number.";
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Validate password
    if ($password !== $confirmPassword) {
        echo "Passwords do not match.";
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Save user to the database
    $stmt = $conn->prepare("INSERT INTO users (mobile, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $mobile, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "User registered successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>