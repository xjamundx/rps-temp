'use strict';

var assert = require('assert');

describe('rock paper scissors logic', function() {

	it('should exist', function() {
		var logic = require('../lib/logic');
		assert.ok(logic);
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

	it('should probably not allow you to send in false challenges', function() {
		var logic = require('../lib/logic');
		var moves = logic.getChallenges();
		assert.throws(function() {
			logic.challenge(12312, 11234567);
		}, 'a number is not a valid challenge');
		assert.throws(function() {
			logic.challenge('kljjkljklsjklskj', 'sdlkjsdjkldfsjkflsdjlkfdsjflsd');
		}, 'a random string is not a valid challenge');
		assert.throws(function() {
			logic.challenge(false, moves[1]);
		}, 'false is not a valid challenge');
		assert.throws(function() {
			logic.challenge();
		}, 'undefined is not a valid challenge (even for a tie)');
		assert.throws(function() {
			logic.challenge({}, moves[0]);
		}, 'empty object is not a valid challenge');
		assert.throws(function() {
			logic.challenge(null, moves[1]);
		}, 'null is not a valid challenge');
		assert.throws(function() {
			logic.challenge('toString', moves[1]);
		}, 'you cannot trick the object into a string');
	});

});
