<?php 
if(!checkRequestMethod('DELETE')){return;}

$request = file_get_contents('php://input');
$data = json_decode($request, true);

if(!checkDataIfEmpty($data)){return;}

trimData($data);
$idUser = $_SESSION['idUser'];
$idPoll = $data['idPoll'];

$query = 'DELETE FROM polls WHERE id_user=? AND id_poll=?';
$statement = $conn->prepare($query);
$statement->bind_param('ss', $idUser, $idPoll);
$statement->execute();

if($statement->affected_rows > 0){
    echo returnMessage(true, 'Polling berhasil dihapus');
}else {
    echo returnMessage(false, 'Polling gagal dihapus');
}
?>