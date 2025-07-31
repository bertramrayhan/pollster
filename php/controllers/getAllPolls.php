<?php 
if(!checkRequestMethod('GET')){return;}

$query = 'SELECT polls.slug, polls.question, users.username AS author, 
polls.created_at, COUNT(votes.id_user) AS vote_count
FROM polls
JOIN users ON users.id_user = polls.id_user
LEFT JOIN votes ON votes.id_poll = polls.id_poll
GROUP BY polls.id_poll, polls.slug, polls.question, users.username, polls.created_at 
ORDER BY polls.id_poll DESC;';

$result = $conn->query($query);

if ($result) {
    $allPolls = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode([
        'success' => true,
        'polls'   => $allPolls
    ]);
} else {
    http_response_code(500);
    echo returnMessage(false, "Gagal menjalankan query: " . $conn->error);
}
?>