'use strict';

var logic = require('./logic');

// sadly coupled with the names of the challanges
// todo: move to a config file or something
var images = {
	'rock': 'http://www.gardenclassics.co.nz/img/product/rock13.jpg',
	'paper': 'http://www.indexbraille.com/getmedia/205d81da-37a4-46c8-a669-9508730412c4/paper_fan-folded_16x9.jpg?width=960',
	'scissors': 'http://www.tweezerman.com/uploaded_files/images/products/b_6320733628686da67fde9e36922355287200_Scissors.jpg'
};

/**
 * Create a list of challenges.
 * @typedef {Object} Challenge
 * @property {String} name
 * @property {String imageUrl
 */
var challenges = logic.getChallenges().map(function(challenge) {
	return {
		name: challenge,
		imageUrl: images[challenge]
	};
});

/**
 * The basic rock paper scissors game instance.
 * @class
 * @param {object} options
 * @param {string} options.opponent - i.e. "computer"
 *
 */
var Game = function(options) {
	options = options || {};
	this.opponent = options.opponent;
};

/**
 * Challenge your opponent.
 * @param {Challenge} challenge
 * @param {Function} cb
 */
Game.prototype.challenge = function(challenge, cb) {
	var opponent = this.getChallenges()[0];
	var winner = logic.challenge(challenge.name, opponent.name);
	cb(null, {
		tie: !winner && challenge.name === opponent,
		success: winner && winner === challenge.name,
		opponent: opponent
	});
};

/**
 * Returns a random-ish list of challenges.
 * @returns {Challenge[]}
 */
Game.prototype.getChallenges = function() {

	// not perfectly random, but will work fine
	// see: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	return challenges.sort(function() {
		return .5 - Math.random();
	});
};

module.exports = Game;
