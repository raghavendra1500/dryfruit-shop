<?php
// filepath: c:\Users\Admin\dryfruit-shop\update_stock.php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'dryfruit_shop');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['id']) || !is_numeric($data['id']) || $data['id'] <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
    exit;
}
if (!isset($data['stock']) || !is_numeric($data['stock']) || $data['stock'] < 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid stock quantity']);
    exit;
}

$id = $data['id'];
$stock = $data['stock'];

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

// Update the stock
$stmt = $conn->prepare("UPDATE products SET stock = ? WHERE id = ?");
$stmt->bind_param("ii", $stock, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Stock updated successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update stock: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>