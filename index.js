'use strict';

require('./css/style.less');

// setup the game
var Game = require('./lib/game');
var game = new Game({type: 'computer'});

// setup the game element
var gameElement = document.querySelector('[data-game]');

// add the heading part
var heading = document.createElement('h1');
heading.textContent = 'Rock, Paper, Scissors';
gameElement.appendChild(heading);

// add the arena part
var arena = document.createElement('div');
arena.className = 'arena';
gameElement.appendChild(arena);
var text = document.createElement('p');
text.textContent = 'Choose a move to play!';
text.className = 'text-challenge';
arena.appendChild(text);

/**
 * Get arena class name based on results of the challenge.
 * @param success
 * @param tie
 * @returns {string}
 */

function getArenaClassName(success, tie) {
	var className =  'arena';
	if (success) {
		className += ' arena-win';
	} else if (tie) {
		className += ' arena-tie';
	} else {
		className += ' arena-loss';
	}
	return className;
}

/**
 * Generate a results message from the response callback data.
 * @param {Object} data
 * @param {Game.Challenge} data.opponent
 * @param {Boolean} data.tie
 * @param {Boolean} data.success
 * @returns {string}
 */
function getResultMessage(data) {
	var msg = 'You lost to';
	if (data.success) {
		msg = 'You beat';
	} else if (data.tie) {
		msg = 'You tied';
	}
	msg += ' ' + data.opponent.name + '!';
	return msg;
}

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
		arena.textContent = 'Unable to retrieve results of challenge. Please try again.';
		return;
	}

	// update the arena color based on the result
	arena.className = getArenaClassName(data.success, data.tie);

	// show a message based on the result
	var msg = getResultMessage(data);
	var existingText = document.querySelector('.text-challenge');
	var p = existingText ? existingText : document.createElement('p');
	p.textContent = msg;
	if (!p) {
		p.className = 'text-challenge';
		arena.appendChild(p);
	}

	// update an existing image or add a new one
	var existingImg = document.querySelector('.img-challenge');
	var img = existingImg ? existingImg : new Image();
	img.src = data.opponent.imageUrl;
	if (!existingImg) {
		img.className = 'img-challenge';
		arena.appendChild(img);
	}
}

/**
 * Challenge the opponent.
 * @param {Game.Challenge} challenge
 */
function playChallenge(challenge) {
	game.challenge(challenge, handleChallengeResponse);
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
