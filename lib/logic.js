/**
 * Main logic for the rock-paper-scissors game
 */

'use strict';

var challenges = {
	rock: {
		losesTo: 'paper'
	},
	paper: {
		losesTo: 'scissors'
	},
	scissors: {
		losesTo: 'rock'
	}
};

module.exports = {

	/**
	 * Returns a list of all of the possible challenges a player can make in the game.
	 * @returns {Array}
	 */
	getChallenges: function() {
		return Object.keys(challenges);
	},

	/**
	 * Determine the champion of a single rock paper scissors challenge.
	 *
	 * @param {string} challenge1
	 * @param {string} challenge2
	 *
	 * @throws {Error} - In the case that the inputs are not valid challengers
	 * @return {string|undefined} - The name of the winning challenge or undefined in the case of a tie.
	 */
	challenge: function(challenge1, challenge2) {

		// ensure that the challengers are valid
		if (!challenges.hasOwnProperty(challenge1) ||
			!challenges.hasOwnProperty(challenge2)
		) {
			throw new Error('You did not provide a proper challenger');
		}

		// handle the tie case
		if (challenge1 === challenge2) {
			return;
		}

		// use the losesTo property to figure out who the winner should be
		return challenges[challenge1].losesTo === challenge2 ? challenge2 : challenge1;
	}
};
