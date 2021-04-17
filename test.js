import test from 'ava';
import indentString from './index.js';

test('throw if input is not a string', t => {
	t.throws(() => {
		indentString(5);
	}, {
		message: 'Expected `input` to be a `string`, got `number`'
	});

	t.throws(() => {
		indentString(true);
	}, {
		message: 'Expected `input` to be a `string`, got `boolean`'
	});
});

test('throw if count is not a number', t => {
	t.throws(() => {
		indentString('foo', 'bar');
	}, {
		message: 'Expected `count` to be a `number`, got `string`'
	});
});

test('throw if count is a negative', t => {
	t.throws(() => {
		indentString('foo', -1);
	}, {
		message: 'Expected `count` to be at least 0, got `-1`'
	});
});

test('throw if indent is not a string', t => {
	t.throws(() => {
		indentString('foo', 1, {indent: 1});
	}, {
		message: 'Expected `options.indent` to be a `string`, got `number`'
	});
});

test('indent each line in a string', t => {
	t.is(indentString('foo\nbar'), ' foo\n bar');
	t.is(indentString('foo\nbar', 1), ' foo\n bar');
	t.is(indentString('foo\r\nbar', 1), ' foo\r\n bar');
	t.is(indentString('foo\nbar', 4), '    foo\n    bar');
});

test('not indent whitespace only lines', t => {
	t.is(indentString('foo\nbar\n', 1), ' foo\n bar\n');
	t.is(indentString('foo\nbar\n', 1, {includeEmptyLines: false}), ' foo\n bar\n');
	t.is(indentString('foo\nbar\n', 1, {includeEmptyLines: null}), ' foo\n bar\n');
});

test('indent every line if options.blank is true', t => {
	t.is(indentString('foo\n\nbar\n	', 1, {includeEmptyLines: true}), ' foo\n \n bar\n 	');
});

test('indent with leading whitespace', t => {
	t.is(indentString(' foo\n bar\n', 1), '  foo\n  bar\n');
});

test('indent with custom string', t => {
	t.is(indentString('foo\nbar\n', 1, {indent: '♥'}), '♥foo\n♥bar\n');
});

test('not indent when count is 0', t => {
	t.is(indentString('foo\nbar\n', 0), 'foo\nbar\n');
});
