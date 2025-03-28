<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars($_POST['name']);
  // Validate and sanitize all inputs
  // Send email with PHPMailer
}
?>

<?php
header('Content-Type: application/json');

// Validate
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

$data = json_decode(file_get_contents('php://input'), true);
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Invalid email']));
}

// Save to database (example with SQLite)
try {
    $db = new PDO('sqlite:subscribers.db');
    $db->exec('CREATE TABLE IF NOT EXISTS subscribers (email TEXT UNIQUE, date_added TEXT)');
    // Replace SQLite with MySQL in production:
    $db = new PDO('mysql:host=localhost;dbname=mosque', 'username', 'password');
    
    $stmt = $db->prepare('INSERT OR IGNORE INTO subscribers (email, date_added) VALUES (?, ?)');
    $stmt->execute([$email, date('Y-m-d H:i:s')]);
    
    echo json_encode(['success' => true]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
// Instead of direct DB storage, integrate with Mailchimp:
$apiKey = 'your-mailchimp-key';
$listId = 'your-list-id';
file_get_contents("https://usX.api.mailchimp.com/3.0/lists/$listId/members", false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Authorization: apikey $apiKey\r\nContent-type: application/json",
        'content' => json_encode([
            'email_address' => $email,
            'status' => 'subscribed'
        ])
    ]
]));