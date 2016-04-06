'use strict';
var needles = require('needle-string');

module.exports = function (str, opts) {
	if (typeof str !== 'string') {
		throw new TypeError('numberify expected a string');
	}

	opts = opts || {};
	opts.float = opts.float && opts.float === true || false;
	opts.zeroOnEmpty = opts.zeroOnEmpty && opts.zeroOnEmpty === true || false;
	opts.onNull = opts.onNull || undefined;

	var num = str.replace(/[^0-9.]/ig, '');

	var decimals = needles(num, '.');
	var decimalpos = num.split('.')[decimals].length;

	num = num.replace(/\./ig, '');

	if (num === '') {
		return opts.zeroOnEmpty ? 0 : opts.onNull;
	}
	if (opts.float && decimalpos > 0 && decimalpos !== num.length) {
		return rebuildFloat(num, decimalpos);
	}
	return parseFloat(num, 10);
};

function rebuildFloat(str, decimal) {
	var end = str.length - decimal;
	var s = str.substring(0, end);
	var e = str.substring(end);
	return parseFloat(s + '.' + e);
}
