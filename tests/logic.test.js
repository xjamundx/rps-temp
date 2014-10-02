var assert = require('assert');

describe('rock paper scissors logic', function() {

	it('should exist', function() {
		var logic = require('../lib/logic');
	});

	it('should allow me to fetch some possible challenges', function() {
		var logic = require('../lib/logic');
		var moves = logic.getChallenges();
		assert.ok(moves);
		assert.ok(Array.isArray(moves), 'moves need to be a list');
		assert.ok(moves.length > 1, 'we need at least 2 moves');
	});

	it('should allow me to determine who won a challenge', function() {
		var logic = require('../lib/logic');
		var moves = logic.getChallenges();
		var winner = logic.challenge(moves[0], moves[1]);
		assert.ok(winner, 'winner does not exist');
		assert.ok([moves[0], moves[1]].indexOf(winner) > -1, 'winner was not found among challengers');
	});

	it('probably should allow a tie', function() {
		var logic = require('../lib/logic');
		var moves = logic.getChallenges();
		var winner;

		winner = logic.challenge(moves[0], moves[0]);
		assert.ok(!winner, 'this should have been a tie');

		winner = logic.challenge(moves[1], moves[1]);
		assert.ok(!winner, 'this should have been a tie');
	});

});