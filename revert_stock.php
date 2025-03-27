<?php
// filepath: c:\Users\Admin\dryfruit-shop\revert_stock.php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli('localhost', 'root', '', 'dryfruit_shop');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

foreach ($data as $item) {
    $stmt = $conn->prepare("UPDATE products SET stock = stock + ? WHERE id = ?");
    $stmt->bind_param("ii", $item['quantity'], $item['id']);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Failed to revert stock']);
        exit;
    }
}

echo json_encode(['success' => true, 'message' => 'Stock reverted successfully']);
$conn->close();
?>