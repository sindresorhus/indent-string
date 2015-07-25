'use strict';
var assert = require('assert');
var fn = require('./');

it('should indent each line in a string', function () {
	assert.strictEqual(fn('foo\nbar', ' '), ' foo\n bar');
	assert.strictEqual(fn('foo\r\nbar', ' '), ' foo\r\n bar');
	assert.strictEqual(fn('foo\nbar', ' ', 4), '    foo\n    bar');
});

it('should not indent whitespace only lines', function () {
	assert.strictEqual(fn('foo\nbar\n', ' '), ' foo\n bar\n');
});

it('should indent with leading whitespace', function () {
	assert.strictEqual(fn(' foo\n bar\n', ' '), '  foo\n  bar\n');
});

it('should not indent when count is 0', function () {
	assert.strictEqual(fn('foo\nbar\n', ' ', 0), 'foo\nbar\n');
});
