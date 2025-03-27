<?php
// filepath: c:\Users\Admin\dryfruit-shop\send_otp.php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mobile = $_POST['mobile'];

    // Validate mobile number
    if (!preg_match('/^[0-9]{10}$/', $mobile)) {
        echo "Invalid mobile number.";
        exit;
    }

    // Generate a random 6-digit OTP
    $otp = rand(100000, 999999);

    // Save OTP in the session (or database)
    $_SESSION['otp'] = $otp;

    // Simulate sending OTP (use an SMS API like Twilio in production)
    echo "OTP sent to $mobile: $otp"; // For testing purposes
}
?>