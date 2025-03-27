<?php
// filepath: c:\Users\Admin\dryfruit-shop\verify_otp.php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $enteredOtp = $_POST['otp'];

    // Check if OTP matches
    if ($enteredOtp == $_SESSION['otp']) {
        echo "OTP verified successfully!";
    } else {
        echo "Invalid OTP. Please try again.";
    }
}
?>