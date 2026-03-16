<?php

$conn = new mysqli("localhost", "root", "", "game_scores");

if ($conn->connect_error) {
	die("Connection failed");
}

$result = $conn->query("SELECT name, score, date FROM highscores ORDER BY score DESC LIMIT 10");

$scores = array();

while ($row = $result->fetch_assoc()) {
	$scores[] = $row;
}

echo json_encode($scores);

$conn->close();

?>