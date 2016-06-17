import test from 'ava';
import m from './';

test('indent each line in a string', t => {
	t.is(m('foo\nbar', ' '), ' foo\n bar');
	t.is(m('foo\r\nbar', ' '), ' foo\r\n bar');
	t.is(m('foo\nbar', ' ', 4), '    foo\n    bar');
});

test('not indent whitespace only lines', t => {
	t.is(m('foo\nbar\n', ' '), ' foo\n bar\n');
});

test('indent with leading whitespace', t => {
	t.is(m(' foo\n bar\n', ' '), '  foo\n  bar\n');
});

test('not indent when count is 0', t => {
	t.is(m('foo\nbar\n', ' ', 0), 'foo\nbar\n');
});
