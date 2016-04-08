# just-numbers 

[![Build Status](https://travis-ci.org/radiovisual/just-numbers.svg?branch=master)](https://travis-ci.org/radiovisual/just-numbers)

> Remove all non-number characters and return a number. `'$1,234'` → `1234`  

> Optionally attempt to preserve decimal precision using the [float option](https://github.com/radiovisual/just-numbers#float): `'$1,234.12'` → `1234.12`


## Install

```
$ npm install --save just-numbers
```


## Usage

```js
const justNumbers = require('just-numbers');

justNumbers('$1,234.00');
//=> 123400

justNumbers('$1$2$3$4$5');
//=> 12345

justNumbers('no-numbers-in-string');
//=> undefined

justNumbers('$1,234.23', {float: true});
//=> 1234.23

justNumbers('no-numbers-in-string', {zeroOnEmpty: true});
//=> 0
```

## v1.0

The `0.x` version of this module would simply return `0` (zero) when no numbers were found in the string.
 This behavior has changed in `v1.0`, and now `undefined` is returned when no numbers are found in the string.
 If you want to mimic the behavior of `0.x`, you can tell just-numbers to return zero on empty with the [zeroOnEmpty](https://github.com/radiovisual/just-numbers#zeroonempty) option.

Version 1.0 also allows you to supply your own return value in the event of an empty string using the [onNull](https://github.com/radiovisual/just-numbers#onnull) option.

## API

### just-numbers(input, [options])

Returns a `number`. If no numbers are found in the string `undefined` or a [custom value](https://github.com/radiovisual/just-numbers#onnull) is returned.

#### input

Type: `string`

The string containing numbers.

#### options

##### float

Type: `boolean`    
Default: `false`

Turns on the attempt to preserve your decimal precision in strings.

```js
justNumbers('$123,456,789.02', {float: true});
//=> 123456789.02
```

##### zeroOnEmpty

Type: `boolean`    
Default: `false`

Returns `0` on empty strings (mimics the `0.x` API)

```js
justNumbers('no numbers here', {zeroOnEmpty: true});
//=> 0
```

##### onNull

Type: `string|object`    
Default: `undefined`

Override the return value when no numbers are found in the string.

```js
justNumbers('no numbers here', {onNull: Infinity});
//=> Infinity

justNumbers('no numbers here', {onNull: 'NO NUMBERS!'});
//=> "NO NUMBERS!"
```

**Tip:** To avoid quirky behavior when overriding the `onNull` value,
**avoid values** like `{onNull: undefined}`, `{onNull: null}`, or `{onNull: 0}`. Instead, just use the default behaviors
(which returns undefined) or the [zeroOnEmpty](https://github.com/radiovisual/just-numbers#zeroonempty) option.

## Notes

- If you supply a number to just-numbers, it will simply return that number...because numbers are *just numbers* :smiley:. 

## License

MIT © [Michael Wuergler](http://numetriclabs.com)
