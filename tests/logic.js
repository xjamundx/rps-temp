var assert = require('assert');

describe('tic-tac-toe logic', function() {
	it('should exist', function() {
		var logic = require('../lib/logic');
	});
	it('should allow me to fetch some possible challenges', function() {
		var logic = require('../lib/logic');
		var moves = logic.getChallenges();
		assert.ok(moves);
	});
});