<?php 
if(!checkRequestMethod('POST')){return;}

$_SESSION = array();

// Cek apakah aplikasi kita memang menggunakan cookie untuk sesi (hampir selalu ya)
if (ini_get("session.use_cookies")) {
    
    // Dapatkan semua parameter (path, domain, dll.) dari cookie sesi saat ini
    $params = session_get_cookie_params();
    
    // Kirim kembali cookie dengan nama yang sama,
    // TAPI dengan waktu kedaluwarsa di masa lalu.
    // Ini adalah cara standar untuk "memaksa" browser menghapus sebuah cookie.
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
     );
}

session_destroy();

echo returnMessage(true, 'Logout');
?>