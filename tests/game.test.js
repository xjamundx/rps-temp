'use strict';

var assert = require('assert');

/**
 * Detects if a challenge object has some important properties.
 */
function isChallenge(challenge) {
	return challenge.imageUrl && challenge.name;
}

describe('rock paper scissors game', function() {

	it('should allow me to create a new one', function() {
		var Game = require('../lib/game');
		var game = new Game();
		assert.ok(game, 'I should be able to play some kind of game');
	});

	it('should allow me to create a game against the computer', function() {
		var Game = require('../lib/game');
		var game = new Game({opponent: 'computer'});
		assert.ok(game, 'I should be able to play against the computer');
	});

	it('should provide a name and image for each type of challenge I can use', function() {
		var Game = require('../lib/game');
		var game = new Game({opponent: 'computer'});
		var challenges = game.getChallenges();
		assert.ok(challenges.every(isChallenge), 'challenges should contain an imageUrl and name');
	});

	it('should allow me to challenge the computer', function() {
		var Game = require('../lib/game');
		var game = new Game({opponent: 'computer'});
		var challenges = game.getChallenges();
		var len = challenges.length;
		var i;

		// because the opponent is randomized, we need to really make sure that this is working properly for all cases
		// so we'll test it challenges.length ^ 2 just to try to give us a high level of confidence we're checking
		// for things like ties, etc.
		function testCallback(err, data) {
			assert.ifError(err);
			assert.ok('success' in data); // we may have won or lost
			assert.ok('opponent' in data); // we need to know who we played
			assert.ok('tie' in data); // we need to know if it was a tie or not

			// check to make sure the data structure make sense
			assert.equal(typeof data.tie, 'boolean');
			assert.equal(typeof data.success, 'boolean');
			assert.ok(isChallenge(data.opponent), 'the opponent object should be filled with info about my challenger');
		}

		// cycle through each of the challenges len times to test variations
		for (i = 0; i < Math.pow(len, 2); i++) {
			game.challenge(challenges[i % len], testCallback);
		}
	});
});
