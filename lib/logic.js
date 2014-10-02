/**
 * Main logic for the rock-paper-scissors game
 */

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
	 * @return {string|undefined} - The name of the winning challenge or undefined in the case of a tie.
	 */
	challenge: function(challenge1, challenge2) {
		if (challenge1 === challenge2) {
			return;
		}
		return challenges[challenge1].losesTo === challenge2 ? challenge2 : challenge1;
	}
};