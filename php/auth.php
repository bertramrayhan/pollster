<?php
require 'util.php';
require 'koneksi.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

handlePreflightRequest();

if(!checkRequestMethod('POST')){exit;}

$request = file_get_contents('php://input');
$data = json_decode($request, true);

if(!checkDataIfEmpty($data)){exit;}

trimData($data);
$username = $data['username'];
$password = $data['password'];

validateInput($username, $password);

$statement = null;
$result = null;
if($data['authPage'] === 'register'){
    if(checkSameData($conn, 'users', 'username', $username)){
        echo returnMessage(false, 'Username sudah digunakan');
        exit;
    }

    $newIdUser = generateNewId($conn, 'id_user', 'users', 'usr', 2);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $query = 'INSERT INTO users (id_user, username, password) VALUES (?,?,?)';
    $statement = $conn->prepare($query);
    $statement->bind_param('sss', $newIdUser, $username, $hashedPassword);

    if($statement->execute()){
        echo returnMessage(true, 'Akun berhasil dibuat!');
    }else {
        echo returnMessage(false, 'Akun gagal dibuat, coba lagi');
    }

}else if($data['authPage'] === 'login'){
    $query = 'SELECT id_user, password FROM users WHERE username = ?';
    $statement = $conn->prepare($query);
    $statement->bind_param('s', $username);
    $statement->execute();

    $result = $statement->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $passwordFromDatabase = $row['password'];

        if(password_verify($password, $passwordFromDatabase)){
            session_start();
            session_regenerate_id(true);

            session_unset();

            $_SESSION['idUser'] = $row['id_user'];
            $_SESSION['username'] = $username;

            echo returnMessage(true, 'Login berhasil!');
        }else{
            echo returnMessage(false, 'Username atau Password salah');
        }
    }else{
        echo returnMessage(false, 'Username atau Password salah');
    }

    $result->close();
}else {
    echo returnMessage(false, 'Request tidak diterima');
    exit;
}

if ($statement) {
    $statement->close();
}
$conn->close();
?>