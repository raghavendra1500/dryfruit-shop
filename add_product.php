<?php
// filepath: c:\Users\Admin\dryfruit-shop\add_product.php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'dryfruit_shop');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$name = $_POST['name'];
$price = $_POST['price'];
$stock = $_POST['stock'];
$image = $_FILES['image'];

// Validate inputs
if (!$name || strlen($name) < 3) {
    echo json_encode(['success' => false, 'message' => 'Product name must be at least 3 characters long']);
    exit;
}
if (!is_numeric($price) || $price <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid price']);
    exit;
}
if (!is_numeric($stock) || $stock < 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid stock quantity']);
    exit;
}
if (!$image || !in_array(strtolower(pathinfo($image['name'], PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'webp'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid image format. Only JPG, JPEG, PNG, and WEBP are allowed']);
    exit;
}

// Handle image upload
$targetDir = "uploads/";
$uniqueFileName = uniqid() . "_" . basename($image['name']);
$targetFile = $targetDir . $uniqueFileName;

if ($image['size'] > 2 * 1024 * 1024) { // Limit file size to 2MB
    echo json_encode(['success' => false, 'message' => 'Image size exceeds 2MB']);
    exit;
}

if (!move_uploaded_file($image['tmp_name'], $targetFile)) {
    echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
    exit;
}

// Insert product into database
$stmt = $conn->prepare("INSERT INTO products (name, price, stock, image) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sdis", $name, $price, $stock, $targetFile);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Product added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add product: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>