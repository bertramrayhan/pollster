<?php
require_once __DIR__ . '/util.php';

preventDirectAccess();

require 'secret.php';

$conn = new mysqli($host, $user, $password, $database);

if($conn->connect_error){
    die("Koneksi gagal: " . $conn->connect_error);
}
?>