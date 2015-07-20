'use strict';
var assert = require('assert');
var indentString = require('./');

it('should indent each line in a string', function () {
	assert.strictEqual(indentString('foo\nbar', ' '), ' foo\n bar');
	assert.strictEqual(indentString('foo\r\nbar', ' '), ' foo\r\n bar');
	assert.strictEqual(indentString('foo\nbar', ' ', 4), '    foo\n    bar');
});

it('should not indent whitespace only lines', function () {
	assert.strictEqual(indentString('foo\nbar\n', ' '), ' foo\n bar\n');
});

it('should indent with leading whitespace', function () {
	assert.strictEqual(indentString(' foo\n bar\n', ' '), '  foo\n  bar\n');
});

it('should not indent when count is 0', function () {
	assert.strictEqual(indentString('foo\nbar\n', ' ', 0), 'foo\nbar\n');
});
