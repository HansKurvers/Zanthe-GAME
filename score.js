// Scores ophalen uit localStorage
function getScores() {
	var scores = localStorage.getItem("highscores");
	if (scores) {
		return JSON.parse(scores);
	}
	return [];
}

// Scores opslaan in localStorage
function saveScores(scores) {
	localStorage.setItem("highscores", JSON.stringify(scores));
}

// Score toevoegen
function scoreOpslaan() {
	var naam = document.getElementById("naam").value.trim();
	var score = document.getElementById("score").value.trim();

	if (naam === "" || score === "") {
		alert("Vul zowel een naam als een score in!");
		return;
	}

	var scores = getScores();
	scores.push({
		name: naam,
		score: parseInt(score),
		date: new Date().toLocaleDateString("nl-NL")
	});

	// Sorteer op score (hoogste eerst)
	scores.sort(function(a, b) {
		return b.score - a.score;
	});

	// Bewaar maximaal 10 scores
	if (scores.length > 10) {
		scores = scores.slice(0, 10);
	}

	saveScores(scores);

	// Velden leegmaken
	document.getElementById("naam").value = "";
	document.getElementById("score").value = "";

	// Tabel bijwerken
	toonScores();
}

// Scores tonen in de tabel
function toonScores() {
	var scores = getScores();
	var table = document.getElementById("scoreTable");
	table.innerHTML = "";

	for (var i = 0; i < scores.length; i++) {
		var row = document.createElement("tr");
		row.innerHTML =
			"<td>" + (i + 1) + "</td>" +
			"<td>" + scores[i].name + "</td>" +
			"<td>" + scores[i].score + "</td>" +
			"<td>" + scores[i].date + "</td>";
		table.appendChild(row);
	}
}

// Bij laden van de pagina: scores tonen
toonScores();