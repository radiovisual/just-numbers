import test from 'ava';
import fn from './';

test('expect a string', t => {
	t.throws(() => {
		fn({});
	}, 'numberify expected a string');
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

test('returns 0 on empty strings', t => {
	t.is(fn('$$$$'), 0);
	t.is(fn(''), 0);
	t.is(fn('  '), 0);
	t.is(fn('qwerty'), 0);
});
