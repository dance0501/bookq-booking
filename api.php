<?php
/**
 * BookQ Booking Solution - MySQL Backend API with SQL LIKE Search
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database Connection Config (Laragon defaults)
$host = 'localhost';
$db   = 'bookq';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // SQL LIKE Search Query
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';
        $date = isset($_GET['date']) ? trim($_GET['date']) : '';

        if (!empty($search)) {
            // คำสั่ง SQL ใช้ LIKE สำหรับค้นหาคำที่ตรงบางส่วน
            $sql = "SELECT * FROM bookings 
                    WHERE name LIKE :search 
                       OR phone LIKE :search 
                       OR service LIKE :search 
                       OR company LIKE :search 
                    ORDER BY date DESC, time ASC";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['search' => '%' . $search . '%']);
        } else if (!empty($date)) {
            $sql = "SELECT * FROM bookings WHERE date = :date ORDER BY time ASC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['date' => $date]);
        } else {
            $sql = "SELECT * FROM bookings ORDER BY date DESC, time ASC";
            $stmt = $pdo->query($sql);
        }

        $bookings = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $bookings]);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }

        if (empty($input['name']) || empty($input['phone']) || empty($input['service']) || empty($input['date']) || empty($input['time'])) {
            echo json_encode(['success' => false, 'error' => 'Missing required fields']);
            exit;
        }

        $id = isset($input['id']) ? $input['id'] : 'bq-' . rand(1000, 9999);
        $admin = isset($input['admin']) ? $input['admin'] : 'แอดมินอัญ';
        $status = isset($input['status']) ? $input['status'] : 'pending';

        $sql = "INSERT INTO bookings (id, name, company, phone, service, date, time, admin, status) 
                VALUES (:id, :name, :company, :phone, :service, :date, :time, :admin, :status)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'name' => $input['name'],
            'company' => isset($input['company']) ? $input['company'] : '',
            'phone' => $input['phone'],
            'service' => $input['service'],
            'date' => $input['date'],
            'time' => $input['time'],
            'admin' => $admin,
            'status' => $status
        ]);

        echo json_encode(['success' => true, 'message' => 'Booking created', 'id' => $id]);
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($input['id']) || empty($input['status'])) {
            echo json_encode(['success' => false, 'error' => 'Missing id or status']);
            exit;
        }

        $sql = "UPDATE bookings SET status = :status WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['status' => $input['status'], 'id' => $input['id']]);

        echo json_encode(['success' => true, 'message' => 'Status updated']);
        break;

    default:
        http_response_code(455);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
