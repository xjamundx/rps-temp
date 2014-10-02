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
	challenge: function(challenge1, challenge2) {
		return challenges[challenge1].losesTo === challenge2 ? challenge2 : challenge1;
	}
};