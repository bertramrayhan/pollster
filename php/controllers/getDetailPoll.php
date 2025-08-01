<?php 
if(!checkRequestMethod('GET')){return;}

if(!checkDataIfEmpty($_GET)){return;}

$slug = $_GET['slug'];

$query = 'SELECT p.question, po.option_text, po.id_option, 
COUNT(v.id_vote) AS total_vote,
SUM(COUNT(v.id_vote)) OVER () AS total_votes
FROM polls p
LEFT JOIN poll_options po ON po.id_poll = p.id_poll
LEFT JOIN votes v ON v.id_option = po.id_option
WHERE p.slug = ?
GROUP BY p.question, po.option_text, po.id_option
ORDER BY total_vote DESC;';

$statement = $conn->prepare($query);
$statement->bind_param('s', $slug);
$statement->execute();

$result = $statement->get_result();
if($result){
    if($result->num_rows > 0){
        $detailPoll = $result->fetch_all(MYSQLI_ASSOC);

        array_walk($detailPoll, function (&$row) {
            $row['total_votes'] = (int) $row['total_votes'];
        });

        echo json_encode([
            'success'=> true,
            'detailPoll'=> $detailPoll
        ]);
    }
}else {
    http_response_code(500);
    echo returnMessage(false, "Gagal menjalankan query: " . $conn->error);
    error_log("Gagal menjalankan query: " . $conn->error);
}
?>