import test from 'ava';
import m from './';

test('throw if input is not a string', t => {
	t.throws(() => m(5), 'Expected `input` to be a `string`, got `number`');
	t.throws(() => m(true), 'Expected `input` to be a `string`, got `boolean`');
});

test('throw if count is not a number', t => {
	t.throws(() => m('foo', 'bar'), 'Expected `count` to be a `number`, got `string`');
});

test('throw if indent is not a string', t => {
	t.throws(() => m('foo', 1, 1), 'Expected `options.indent` to be a `string`, got `number`'); // Old syntax
	t.throws(() => m('foo', 1, {indent: 1}), 'Expected `options.indent` to be a `string`, got `number`');
});

test('throw if blank is not a boolean', t => {
	t.throws(() => m('foo', 1, {blank: 1}), 'Expected `options.blank` to be a `boolean`, got `number`');
	t.throws(() => m('foo', 1, {blank: 'false'}), 'Expected `options.blank` to be a `boolean`, got `string`');
});

test('indent each line in a string', t => {
	t.is(m('foo\nbar'), ' foo\n bar');
	t.is(m('foo\nbar', 1), ' foo\n bar');
	t.is(m('foo\r\nbar', 1), ' foo\r\n bar');
	t.is(m('foo\nbar', 4), '    foo\n    bar');
});

test('not indent whitespace only lines', t => {
	t.is(m('foo\nbar\n', 1), ' foo\n bar\n');
	t.is(m('foo\nbar\n', 1, {blank: false}), ' foo\n bar\n');
});

test('indent every line if options.blank is true', t => {
	t.is(m('foo\n\nbar\n	', 1, {blank: true}), ' foo\n \n bar\n 	');
});

test('indent with leading whitespace', t => {
	t.is(m(' foo\n bar\n', 1), '  foo\n  bar\n');
});

test('indent with custom string', t => {
	t.is(m('foo\nbar\n', 1, {indent: '♥'}), '♥foo\n♥bar\n');
});

test('indent with custom string and old syntax', t => {
	t.is(m('foo\nbar\n', 1, '#'), '#foo\n#bar\n');
});

test('not indent when count is 0', t => {
	t.is(m('foo\nbar\n', 0), 'foo\nbar\n');
});
