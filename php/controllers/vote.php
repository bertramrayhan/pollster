<?php 
if(!checkRequestMethod('POST')){return;}

$request = file_get_contents('php://input');
$data = json_decode($request, true);

if(!checkDataIfEmpty($data)){return;}

trimData($data);
$idUser = $_SESSION['idUser'];
$slug = $data['slug'];
$idOption = $data['idOption'];
$idPoll = null;

$query = "SELECT p.id_poll, v.id_vote 
          FROM polls p
          LEFT JOIN votes v ON p.id_poll = v.id_poll AND v.id_user = ?
          WHERE p.slug = ?";

$statement = $conn->prepare($query);
$statement->bind_param('ss', $idUser, $slug);
$statement->execute();
$result = $statement->get_result();

if ($result->num_rows === 0) {
    echo returnMessage(false, 'Poll tidak ditemukan.');
    return;
}

$row = $result->fetch_assoc();
$idPoll = $row['id_poll'];

if ($row['id_vote'] !== null) {
    echo returnMessage(false, 'Anda sudah pernah memberikan suara untuk polling ini');
    return;
}

$newIdVote = generateNewId($conn, 'id_vote', 'votes', 'vote', 5);
$query = 'INSERT INTO votes (id_vote, id_user, id_poll, id_option) VALUES (?,?,?,?)';
$statement = $conn->prepare($query);
$statement->bind_param('ssss', $newIdVote, $idUser, $idPoll, $idOption);
$statement->execute();

if($statement->affected_rows > 0){
    echo returnMessage(true, 'Vote berhasil');
}else {
    echo returnMessage(false, 'Vote gagal');
}
?>