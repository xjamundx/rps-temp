'use strict';

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
 * Sets a message on the arena for all to see.
 * @param {Object|String} data - data used to construct a message or the message itself
 * @param {Game.Challenge} data.opponent
 * @param {Boolean} data.tie
 * @param {Boolean} data.success
 */
function setMessage(data) {
	var msg = typeof data === 'object' ? getResultMessage(data) : data;
	var existingText = document.querySelector('.text-challenge');
	var p = existingText ? existingText : document.createElement('p');
	p.textContent = msg;
	if (!p) {
		p.className = 'text-challenge';
		this.el.appendChild(p);
	}
}

/**
 * Set the image for the challenger in the arena.
 * @param {Game.Challenge} data.opponent
 */
function setImage(opponent) {
	var existingImg = document.querySelector('.img-challenge');
	var img = existingImg ? existingImg : new Image();
	img.src = opponent.imageUrl;
	if (!existingImg) {
		img.className = 'img-challenge';
		this.el.appendChild(img);
	}
}

/**
 * Display the background color for the arena based on results object
 * @param {Object} data
 * @param {Game.Challenge} data.opponent
 * @param {Boolean} data.tie
 * @param {Boolean} data.success
 */
function setWinner(data) {
	this.el.className = getArenaClassName(data.success, data.tie);
}

/**
 * Return the element reference
 * @returns {HTMLElement|*}
 */
function getElement() {
	return this.el;
}

function Arena() {
	var div = document.createElement('div');
	div.className = 'arena';
	var text = document.createElement('p');
	text.textContent = 'Choose a move to play!';
	text.className = 'text-challenge';
	div.appendChild(text);

	// store the element in this.el
	this.el = div;
}

Arena.prototype = {
	getElement: getElement,
	setMessage: setMessage,
	setText: setMessage,
	setImage: setImage,
	setWinner: setWinner
};

module.exports = Arena;
