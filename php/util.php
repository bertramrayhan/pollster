<?php
function returnMessage(bool $isSuccess, string $message) {
    return json_encode(['success' => $isSuccess, 'message' => $message]);
}

function checkRequestMethod($allowedMethod){
    if($_SERVER['REQUEST_METHOD'] !== $allowedMethod){
        http_response_code(405);
        echo returnMessage(false, 'Method tidak diizinkan');
        return false;
    }
    return true;
}

function handlePreflightRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('HTTP/1.1 204 No Content');
        exit;
    }
}

function preventDirectAccess() {
    if (basename(__FILE__) == basename($_SERVER['SCRIPT_FILENAME'])) {
        http_response_code(403);
        // Kita bisa menggunakan fungsi returnJsonResponse kita yang baru!
        // Tapi untuk kasus ini, pesan sederhana sudah cukup.
        die(returnMessage(false, 'Akses Ditolak'));
    }
}
preventDirectAccess();

function trimData(array &$inputData){
    foreach ($inputData as $key => $value) {
        if (is_string($value)) {
            $inputData[$key] = trim($value);
        }
    }
}

function checkDataIfEmpty(array $inputData) {
    foreach ($inputData as $key => $value) {
        if (!isset($value) || (is_string($value) && trim($value) === "")) {
            echo returnMessage(false, "Data '" . $key . "' tidak boleh kosong.");
            return false;
        }
    }
    return true;
}

function validateInput(string $username, string $password) {
    if(mb_strlen($username) < 4){
        echo returnMessage(false, 'Username minimal 4 karakter');
        exit;
    }else if(mb_strlen($username) > 50){
        echo returnMessage(false, 'Username maksimal 25 karakter');
        exit;
    }else if(!preg_match('/^[a-zA-Z0-9_\.]+$/', $username)){
        echo returnMessage(false, 'Username hanya boleh menggunakan abjad (a-z), angka, garis bawah (_), dan titik (.)');
        exit;
    }
    if(mb_strlen($password) < 8){
        echo returnMessage(false, 'Password minimal 8 karekter');
        exit;
    }else if(mb_strlen($password) > 50){
        echo returnMessage(false, 'Password maksimal 50 karakter');
        exit;
    }
}

function checkSameData($conn, string $tableName, string $columnName, string $value) : bool{
    $query = "SELECT * FROM $tableName WHERE $columnName = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param('s', $value);
    $statement->execute();

    $result = $statement->get_result();

    if($result->num_rows > 0){
        return true;
    }

    return false;
}

function generateNewId($conn, string $column, string $table, string $prefix, int $lenNum) : string{
    $query = "SELECT $column FROM $table ORDER BY $column DESC LIMIT 1";
    $result = $conn->query($query);
    
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();

        $prefixLen = strlen($prefix);
        $angkaLama = (int) substr($row[$column], $prefixLen);
        $idBaru = $prefix . sprintf("%0{$lenNum}d", $angkaLama + 1);
    } else {
        $idBaru = $prefix . sprintf("%0{$lenNum}d", 1);
    }

    return $idBaru;
}

function checkIdUser(){    
    if(!isset($_SESSION['idUser'])){
        http_response_code(401);
        echo returnMessage(false, 'Akses ditolak. Silahkan login terlebih dahulu');
        return false;
    }
    
    return true;
}

function returnErrorQuery($conn){
    http_response_code(500);
    echo returnMessage(false, "Gagal menjalankan query: " . $conn->error);
}
?>