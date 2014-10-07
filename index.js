'use strict';

require('./css/style.less');

// setup the game
var Game = require('./lib/game');
var game = new Game({type: 'computer'});

// setup the game element
var gameElement = document.querySelector('[data-game]');

// add the heading part
var heading = document.createElement('h1');
heading.textContent = "Rock, Paper, Scissors";
gameElement.appendChild(heading);

// add the arena part
var arena = document.createElement('div');
arena.className = 'arena';
gameElement.appendChild(arena);
arena.textContent = 'Choose a move to play!';

// play a challenge
function playChallenge(challenge) {
	game.challenge(challenge, function(err, data) {
		if (err) {
			arena.textContent = "Unable to retrieve results of challenge. Please try again.";
			return;
		}
		arena.textContent = data.success ? 'You Won!' : 'You Lost!';
	});
}

// provide the challenges
var challenges = game.getChallenges();
var frag = document.createDocumentFragment();
var nav = document.createElement('nav');
nav.className = 'nav';
challenges.forEach(function(challenge) {
	var button = document.createElement('button');
	button.className = 'button-icon button-icon-' + challenge.name;
	button.textContent = challenge.name;
	button.onclick = playChallenge.bind(null, challenge); // pass through the challenge
	nav.appendChild(button);
});
frag.appendChild(nav);
gameElement.appendChild(frag);