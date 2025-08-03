<?php 
if(!checkRequestMethod('GET')){return;}

$query = 'SELECT polls.id_poll, polls.slug, polls.question, users.username AS author, 
polls.created_at, COUNT(votes.id_user) AS vote_count,
(CASE WHEN polls.id_user = ? THEN TRUE ELSE FALSE END) as is_owner
FROM polls
JOIN users ON users.id_user = polls.id_user
LEFT JOIN votes ON votes.id_poll = polls.id_poll
GROUP BY polls.id_poll, polls.slug, polls.question, users.username, polls.created_at 
ORDER BY polls.id_poll DESC;';

$idUser = $_SESSION['idUser'];
$statement = $conn->prepare($query);
$statement->bind_param('s', $idUser);
$statement->execute();

$result = $statement->get_result();
if ($result) {
    $allPolls = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode([
        'success' => true,
        'polls'   => $allPolls
    ]);
} else {
    returnErrorQuery($conn);
}
?>