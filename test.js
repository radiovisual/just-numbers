import test from 'ava';
import fn from './';

test('expect a string', t => {
	t.throws(() => {
		fn({});
	}, 'just-numbers expected a string');
});

test('returns a number', t => {
	t.is(typeof fn('1'), 'number');
	t.is(typeof fn('1.0'), 'number');
});

test('converts strings to numbers', t => {
	t.is(fn('$1$2$3$4$5'), 12345);
	t.is(fn('$1,234.25'), 123425);
	t.is(fn('$1,234.00'), 123400);
	t.is(fn('$123,456,789'), 123456789);
	t.is(fn('$ 1 2 3 , 4 5 6 , 7 8 9'), 123456789);
	t.is(fn('$ 1 2 3 , 4 5 6 , 7 8 9.9876'), 1234567899876);
});

test('defaults to just numbers', t => {
	t.is(fn('$123,456,789.02'), 12345678902);
	t.is(fn('$1,234.00'), 123400);
	t.is(fn('$1,234.01'), 123401);
});

test('float option', t => {
	t.is(fn('$123,456,789.02', {float: true}), 123456789.02);
	t.is(fn('123..456..789..02', {float: true}), 123456789.02);
	t.is(fn('123$456$789 . 02', {float: true}), 123456789.02);
	t.is(fn('$1,234.00', {float: false}), 123400);
	t.is(fn('$1,234.01', {float: false}), 123401);
});

test('returns undefined on empty strings', t => {
	t.is(fn('$$$$'), undefined);
	t.is(fn(''), undefined);
	t.is(fn('  '), undefined);
	t.is(fn('qwerty'), undefined);
});

test('allows zeroOnEmpty option', t => {
	t.is(fn('$$$$', {zeroOnEmpty: true}), 0);
	t.is(fn('', {zeroOnEmpty: true}), 0);
	t.is(fn('qwerty', {zeroOnEmpty: true}), 0);
});

test('allows custom onNull object', t => {
	t.is(fn('$$$$', {onNull: Infinity}), Infinity);
	t.is(fn('qwerty', {onNull: ':)'}), ':)');
	t.is(fn('qwerty', {onNull: 'NO NUMBERS!'}), 'NO NUMBERS!');
});

test('prioritize zeroOnEmpty', t => {
	t.is(fn('$$$$', {onNull: Infinity, zeroOnEmpty: true}), 0);
});

test('let numbers pass through', t => {
	t.is(fn(100), 100);
	t.is(fn(100.23), 100.23);
});
