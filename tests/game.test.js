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
		var game = new Game({type: 'computer'});
		assert.ok(game, 'I should be able to play against the computer');
	});

	it('should provide a name and image for each type of challenge I can use', function() {
		var Game = require('../lib/game');
		var game = new Game({type: 'computer'});
		var challenges = game.getChallenges();
		assert.ok(challenges.every(isChallenge), 'challenges should contain an imageUrl and name');
	});

	it('should allow me to challenge the computer', function() {
		var Game = require('../lib/game');
		var game = new Game({type: 'computer'});
		var challenges = game.getChallenges();
		game.challenge(challenges[0], function(err, data) {
			assert.ifError(err);
			assert.ok('success' in data); // we may have won or lost
			assert.ok('opponent' in data); // we need to know who we played
			assert.equal(typeof data.success, 'boolean', 'success property should be a simple boolean');
			assert.ok(isChallenge(data.opponent), 'the opponent object should be filled with info about my challenger');
		});
	});
});
