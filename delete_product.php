<?php
// filepath: c:\Users\Admin\dryfruit-shop\delete_product.php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'dryfruit_shop');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['id']) || !is_numeric($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
    exit;
}

$id = $data['id'];

// Check if the product exists
$checkStmt = $conn->prepare("SELECT id FROM products WHERE id = ?");
$checkStmt->bind_param("i", $id);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
    $checkStmt->close();
    $conn->close();
    exit;
}
$checkStmt->close();

// Delete the product
$stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete product: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>