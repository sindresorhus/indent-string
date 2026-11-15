import {test} from 'node:test';
import assert from 'node:assert/strict';
import indentString from './index.js';

test('throw if the input is not a string', () => {
	assert.throws(() => {
		indentString(5);
	}, {name: 'TypeError', message: 'Expected `input` to be a `string`, got `number`'});

	assert.throws(() => {
		indentString(true);
	}, {name: 'TypeError', message: 'Expected `input` to be a `string`, got `boolean`'});

	assert.throws(() => {
		indentString(undefined);
	}, {name: 'TypeError', message: 'Expected `input` to be a `string`, got `undefined`'});

	assert.throws(() => {
		indentString(null);
	}, {name: 'TypeError', message: 'Expected `input` to be a `string`, got `object`'});

	assert.throws(() => {
		indentString({});
	}, {name: 'TypeError', message: 'Expected `input` to be a `string`, got `object`'});
});

test('throw if count is not a number', () => {
	assert.throws(() => {
		indentString('foo', 'bar');
	}, {name: 'TypeError', message: 'Expected `count` to be a `number`, got `string`'});

	assert.throws(() => {
		indentString('foo', null);
	}, {name: 'TypeError', message: 'Expected `count` to be a `number`, got `object`'});

	assert.throws(() => {
		indentString('foo', {});
	}, {name: 'TypeError', message: 'Expected `count` to be a `number`, got `object`'});

	assert.throws(() => {
		indentString('foo', true);
	}, {name: 'TypeError', message: 'Expected `count` to be a `number`, got `boolean`'});
});

test('throw if count is negative', () => {
	assert.throws(() => {
		indentString('foo', -1);
	}, {name: 'RangeError', message: 'Expected `count` to be at least 0, got `-1`'});

	assert.throws(() => {
		indentString('foo', -0.5);
	}, {name: 'RangeError', message: 'Expected `count` to be at least 0, got `-0.5`'});
});

test('throw if indent is not a string', () => {
	assert.throws(() => {
		indentString('foo', 1, {indent: 1});
	}, {name: 'TypeError', message: 'Expected `options.indent` to be a `string`, got `number`'});

	assert.throws(() => {
		indentString('foo', 1, {indent: null});
	}, {name: 'TypeError', message: 'Expected `options.indent` to be a `string`, got `object`'});

	assert.throws(() => {
		indentString('foo', 1, {indent: true});
	}, {name: 'TypeError', message: 'Expected `options.indent` to be a `string`, got `boolean`'});
});

test('leaves an empty string alone', () => {
	assert.equal(indentString(''), '');
	assert.equal(indentString('', 4), '');
	assert.equal(indentString('', 4, {indent: '♥'}), '');
});

test('leaves a whitespace-only line alone by default', () => {
	const whitespace = ' '.repeat(3);
	assert.equal(indentString(whitespace), whitespace);
	assert.equal(indentString(whitespace, 2), whitespace);
	assert.equal(indentString(`foo\n${whitespace}\nbar`, 1), ` foo\n${whitespace}\n bar`);
});

test('leaves a bare line separator alone', () => {
	assert.equal(indentString('\n'), '\n');
	assert.equal(indentString('\n', 4), '\n');
	assert.equal(indentString('foo\n\nbar', 1), ' foo\n\n bar');
	assert.equal(indentString('\n\n'), '\n\n');
});

test('indents each line in a string', () => {
	assert.equal(indentString('foo\nbar'), ' foo\n bar');
	assert.equal(indentString('foo\nbar', 1), ' foo\n bar');
	assert.equal(indentString('foo\r\nbar', 1), ' foo\r\n bar');
	assert.equal(indentString('foo\nbar', 4), '    foo\n    bar');
	assert.equal(indentString('foo\nbar', 2), '  foo\n  bar');
});

test('leaves the trailing newline unindented by default', () => {
	assert.equal(indentString('foo\nbar\n'), ' foo\n bar\n');
	assert.equal(indentString('foo\nbar\n', 1, {includeEmptyLines: false}), ' foo\n bar\n');
	assert.equal(indentString('foo\nbar\n', 1, {includeEmptyLines: null}), ' foo\n bar\n');
});

test('indents empty lines when `includeEmptyLines` is true', () => {
	assert.equal(indentString('foo\n\nbar\n ', 1, {includeEmptyLines: true}), ' foo\n \n bar\n  ');
	// A bare separator is two empty lines: one before the \n and one after it.
	assert.equal(indentString('\n', 1, {includeEmptyLines: true}), ' \n ');
});

test('keeps CRLF intact when `includeEmptyLines` is true', () => {
	assert.equal(indentString('foo\r\nbar', 1, {includeEmptyLines: true}), ' foo\r\n bar');
	assert.equal(indentString('foo\r\n\r\nbar\r\n', 1, {includeEmptyLines: true}), ' foo\r\n \r\n bar\r\n ');
	assert.equal(indentString('\r\n', 1, {includeEmptyLines: true}), ' \r\n ');
	// A lone CR is still a line separator.
	assert.equal(indentString('foo\rbar', 1, {includeEmptyLines: true}), ' foo\r bar');
});

test('keeps leading whitespace and adds to it', () => {
	assert.equal(indentString(' foo\n bar\n', 1), '  foo\n  bar\n');
	assert.equal(indentString('\tfoo', 1), ' \tfoo');
});

test('repeats a custom indent `count` times', () => {
	assert.equal(indentString('foo\nbar\n', 1, {indent: '♥'}), '♥foo\n♥bar\n');
	assert.equal(indentString('foo\nbar', 2, {indent: '♥'}), '♥♥foo\n♥♥bar');
	assert.equal(indentString('foo\nbar', 4, {indent: '♥'}), '♥♥♥♥foo\n♥♥♥♥bar');
	assert.equal(indentString('foo\nbar', 1, {indent: '\t'}), '\tfoo\n\tbar');
	assert.equal(indentString('foo\nbar', 2, {indent: 'ab'}), 'ababfoo\nababbar');
	assert.equal(indentString('foo\nbar', 1, {indent: ''}), 'foo\nbar');
});

test('a `$` sequence in `options.indent` is a replacement pattern, not a literal', () => {
	// The indent is handed to `String#replace` as a replacement string, where `$&` expands
	// to the match (the empty string before each line) and `$$` collapses to one `$`.
	assert.equal(indentString('foo', 1, {indent: '$&'}), 'foo');
	assert.equal(indentString('foo', 1, {indent: '$$'}), '$foo');
	assert.equal(indentString('foo', 1, {indent: 'a$&b'}), 'abfoo');
});

test('returns the input unchanged when count is 0', () => {
	assert.equal(indentString('foo\nbar\n', 0), 'foo\nbar\n');
	assert.equal(indentString('foo\n\nbar', 0, {indent: '>>'}), 'foo\n\nbar');
	assert.equal(indentString('foo\n\nbar', 0, {includeEmptyLines: true}), 'foo\n\nbar');
});
