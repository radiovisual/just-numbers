# just-numbers [![Build Status](https://travis-ci.org/radiovisual/just-numbers.svg?branch=master)](https://travis-ci.org/radiovisual/just-numbers)

> Remove all non-number characters and return a number. `'$1,234'` → 1234


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
//=> 0

justNumbers('$1,234.23', {float: true});
//=> 1234.23
```

This module will return `0` if no numbers are found in the string;

## API

### just-numbers(input, [options])

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


## License

MIT © [Michael Wuergler](http://numetriclabs.com)
