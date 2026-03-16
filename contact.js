// Feedback ophalen uit localStorage
function getFeedback() {
	var feedback = localStorage.getItem("feedback");
	if (feedback) {
		return JSON.parse(feedback);
	}
	return [];
}

// Feedback opslaan in localStorage
function saveFeedback(feedbackList) {
	localStorage.setItem("feedback", JSON.stringify(feedbackList));
}

// Feedback tonen
function toonFeedback() {
	var feedbackList = getFeedback();
	var container = document.getElementById("feedbackContainer");

	if (feedbackList.length === 0) {
		container.innerHTML = "<p>Nog geen feedback geplaatst.</p>";
		return;
	}

	container.innerHTML = "";

	for (var i = 0; i < feedbackList.length; i++) {
		var item = feedbackList[i];
		var div = document.createElement("div");
		div.className = "feedback-item";

		var sterren = "";
		for (var s = 0; s < item.rating; s++) {
			sterren += "★";
		}

		div.innerHTML =
			"<strong>" + item.name + "</strong> " + sterren +
			"<p>" + item.text + "</p>" +
			"<small>" + item.date + "</small>";

		container.appendChild(div);
	}
}

// Feedback formulier afhandelen
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
	e.preventDefault();

	var naam = document.getElementById("feedbackName").value.trim();
	var tekst = document.getElementById("feedbackText").value.trim();

	// Sterren rating ophalen
	var rating = 0;
	var radios = document.getElementsByName("rating");
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			rating = parseInt(radios[i].value);
			break;
		}
	}

	if (naam === "" || tekst === "" || rating === 0) {
		alert("Vul alle velden in en kies een aantal sterren!");
		return;
	}

	var feedbackList = getFeedback();
	feedbackList.push({
		name: naam,
		rating: rating,
		text: tekst,
		date: new Date().toLocaleDateString("nl-NL")
	});

	saveFeedback(feedbackList);

	// Formulier resetten
	document.getElementById("feedbackForm").reset();

	// Feedback opnieuw tonen
	toonFeedback();

	alert("Bedankt voor je feedback!");
});

// Vraag formulier afhandelen
document.getElementById("questionForm").addEventListener("submit", function(e) {
	e.preventDefault();

	var naam = document.getElementById("questionName").value.trim();
	var email = document.getElementById("questionEmail").value.trim();
	var vraag = document.getElementById("questionText").value.trim();

	if (naam === "" || email === "" || vraag === "") {
		alert("Vul alle velden in!");
		return;
	}

	alert("Bedankt " + naam + "! Je vraag is verstuurd. We nemen contact op via " + email + ".");

	document.getElementById("questionForm").reset();
});

// Bij laden: feedback tonen
toonFeedback();