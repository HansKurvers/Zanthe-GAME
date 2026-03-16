<?php

$conn = new mysqli("localhost", "root", "", "game_scores");

if ($conn->connect_error) {
	die("Connection failed");
}

$name = $_POST['name'];
$score = $_POST['score'];

$stmt = $conn->prepare("INSERT INTO highscores (name, score) VALUES (?, ?)");
$stmt->bind_param("si", $name, $score);
$stmt->execute();
$stmt->close();

$conn->close();

?>