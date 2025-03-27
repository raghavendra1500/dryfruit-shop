<!-- filepath: c:\Users\Admin\dryfruit-shop\freeze_stock.php -->
<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli('localhost', 'root', '', 'dryfruit_shop');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

foreach ($data as $item) {
    // Check if the stock is sufficient
    $stmt = $conn->prepare("SELECT stock FROM products WHERE id = ?");
    $stmt->bind_param("i", $item['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row['stock'] < $item['quantity']) {
        echo json_encode(['success' => false, 'message' => 'Insufficient stock for product ID: ' . $item['id']]);
        exit;
    }

    // Deduct the stock
    $stmt = $conn->prepare("UPDATE products SET stock = stock - ? WHERE id = ?");
    $stmt->bind_param("ii", $item['quantity'], $item['id']);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Failed to freeze stock for product ID: ' . $item['id']]);
        exit;
    }
}

echo json_encode(['success' => true, 'message' => 'Stock frozen successfully']);
$conn->close();
?>