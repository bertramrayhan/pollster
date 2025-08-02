<?php 
if(!checkRequestMethod('POST')){return;}

$request = file_get_contents('php://input');
$data = json_decode($request, true);

if(!checkDataIfEmpty($data)){return;}

trimData($data['options']);
$idUser = $_SESSION['idUser'];
$question = trim($data['question']);
$baseSlug = strtolower(str_replace(' ', '-', $question));
$slug = $baseSlug;
$options = $data['options'];

$counter = 1;
while(checkSameData($conn, 'polls', 'slug', $slug)){
    $slug = $baseSlug . '-' . $counter;
    $counter++;
}

$conn->begin_transaction();

try {
    $newIdPoll = generateNewId($conn, 'id_poll', 'polls', 'poll', 3);
    $query = 'INSERT INTO polls (id_poll, id_user, question, slug) VALUES (?,?,?,?)';
    $statement = $conn->prepare($query);
    $statement->bind_param('ssss', $newIdPoll, $idUser, $question, $slug);
    $statement->execute();

    if($statement->affected_rows > 0){
        $query = 'INSERT INTO poll_options VALUES (?,?,?)';
        $optionStatement = $conn->prepare($query);
        foreach ($options as $option) {
            $newIdOption = generateNewId($conn, 'id_option', 'poll_options', 'opt', 4);
            $optionStatement->bind_param('sss', $newIdOption, $newIdPoll, $option);
            $optionStatement->execute();
        }
        $conn->commit();
        echo returnMessage(true, 'Poll berhasil dibuat');
    } else {
        $conn->rollback();
        returnErrorQuery($conn);
    }
} catch (Exception $e) {
    $conn->rollback();
    echo returnMessage(false, $e->getMessage());
    return;
}
?>