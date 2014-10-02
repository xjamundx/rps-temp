/**
 * Main logic for the rock-paper-scissors game
 */

var challenges = {
	rock: true,
	paper: true,
	scissors: true
};

module.exports = {

	/**
	 * Returns a list of all of the possible challenges a player can make in the game.
	 * @returns {Array}
	 */
	getChallenges: function() {
		return Object.keys(challenges);
	}
};