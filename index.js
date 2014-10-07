'use strict';

// require css
require('./css/style.less');

// require js
var Game = require('./lib/game');
var Arena = require('./lib/arena');

// setup the game
var game = new Game({type: 'computer'});
var arena = new Arena();

// DOM elements setup at the bottom
var gameElement, heading;

/**
 * Handle challenge responses
 * @param {Error} err
 * @param {Object} data
 * @param {Game.Challenge} data.opponent
 * @param {Boolean} data.tie
 * @param {Boolean} data.success
 */
function handleChallengeResponse(err, data) {

	// check for server errors and other strange things
	if (err) {
		arena.setMessage('Unable to retrieve results of challenge. Please try again.');
		return;
	}

	// update the arena based on the results
	arena.setWinner(data);
	arena.setMessage(data);
	arena.setImage(data.opponent);
}

/**
 * Setup an individual challenge option in the nav.
 * @param challenge
 */
function setupChallenge(nav, challenge) {
	var button = document.createElement('button');
	button.className = 'button-icon button-icon-' + challenge.name;
	button.textContent = challenge.name;
	button.onclick = game.challenge.bind(game, challenge, handleChallengeResponse); // pass through the challenge
	nav.appendChild(button);
}

/**
 * Setup the challenges inside the navigation;
 */
function setupNav() {
	var challenges = game.getChallenges();
	var frag = document.createDocumentFragment();
	var challengeNav = document.createElement('nav');
	challengeNav.className = 'nav nav-challenges';
	challenges.forEach(setupChallenge.bind(null, challengeNav));
	frag.appendChild(challengeNav);
	gameElement.appendChild(frag);
}

// find our base tag
gameElement = document.querySelector('[data-game]');

// setup the heading
heading = document.createElement('h1');
heading.textContent = 'Rock, Paper, Scissors';
gameElement.appendChild(heading);

// add the arena element
gameElement.appendChild(arena.getElement());

// setup and store the navigation
setupNav();
