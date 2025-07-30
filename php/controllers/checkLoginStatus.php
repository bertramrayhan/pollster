<?php 
if(!checkRequestMethod('POST')){return;}

if(isset($_SESSION['username']) && !empty($_SESSION['username'])){
    echo json_encode([
        'loggedIn'=> true
    ]);
}else {
    echo json_encode([
        'loggedIn'=> false
    ]);
}
?>