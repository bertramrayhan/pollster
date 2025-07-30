<?php 
require_once 'util.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

handlePreflightRequest();

session_start();

if(!checkIdUser()){exit;}

$action = $_GET['action'] ?? null;

if (!$action) {
    http_response_code(400);
    echo returnMessage(false, 'Aksi tidak ditentukan.');
    exit;
}

$allowedActions = [];
foreach (glob(__DIR__ . '/controllers/*.php') as $file) {
    $allowedActions[] = basename($file, '.php');
}

if(in_array($action, $allowedActions)){
    $controllerPath = __DIR__ . '/controllers/' . $action . '.php';
    $statement = null;
    $result = null;
    
    try {
        if (file_exists($controllerPath)) {
            require_once 'koneksi.php'; 
            require $controllerPath;
        } else {
            http_response_code(500);
            echo returnMessage(false, "Error: Controller untuk aksi '$action' tidak ditemukan.");
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo returnMessage(false, "Terjadi error internal: " . $e->getMessage());
    }finally {
        if ($statement !== null) {
            $statement->close();
        }
        if ($result !== null) {
            $result->free(); 
        }
        if ($conn !== null) {
            $conn->close();
        }
    }
} else {
    http_response_code(400);
    echo returnMessage(false, "Aksi '$action' tidak valid.");
}
?>