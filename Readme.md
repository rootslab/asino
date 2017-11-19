### Asino

[![NPM VERSION](http://img.shields.io/npm/v/asino.svg?style=flat)](https://www.npmjs.org/package/asino)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/asino)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/asino.svg?style=flat)](https://codeclimate.com/github/rootslab/asino)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/asino#mit-license)

![NODE VERSION](https://img.shields.io/node/v/asino.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/asino.svg?style=flat)](http://travis-ci.org/rootslab/asino)
[![BUILD STATUS](http://img.shields.io/david/rootslab/asino.svg?style=flat)](https://david-dm.org/rootslab/asino)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/asino.svg?style=flat)](https://david-dm.org/rootslab/asino#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/asino.svg?style=flat)](http://npm-stat.com/charts.html?package=asino)
![NPM YEARLY](https://img.shields.io/npm/dy/asino.svg)

[![NPM GRAPH](https://nodei.co/npm/asino.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/asino/)


> __Asino__, a stubborn, simple and fast Bloom filter for the rest of us.


### Install

```bash
$ npm install asino [-g]
```

> __require__:

```javascript
var Asino  = require( 'asino' );
```
### Run Tests

> __to run all test files, install devDependencies:__

```bash
 $ cd asino/
 # install or update devDependencies
 $ npm install 
 # run tests
 $ npm test
```

### Constructor

```javascript
Asino( [ Object opt ] )
// or
new Asino( [ Object opt ] )
```

### Options

> Default options are listed.

```javascript
opt = {
	/*
	 * expected population of elements
	 */
	epop : 10000
	
	/*
	 * The max number of bytes to parse from every 
	 * input element, using the pseudo-random table.
	 * In normal mode you should specify this property
	 * generally sizing it on the input length.
	 *
	 * When dunce mode is on, this property is ignored,
	 * because no pseduo-random table will be generated.
	 */
	, ilen : 32
	
	/*
	 * The number of hash functions to use.
	 * The greater the number, lesser is the probability
	 * of collisions.
	 *
	 * - the false positive probability:
	 *
	 *   fpp ~= - 1 / ( 10 ^ hfn )
	 *
 	 * In dunce mode this number is limited to 16.
	 */ 
	, hfn : 6
	
	/*
	 * Dunce mode, it is off for default.
	 *
	 * It is a fast way for testing collisions/duplicates on 
	 * long inputs ( > ~ 64 bytes ), without the construction
	 * and the use of pseudo-random table, because it uses a
	 * crypto digest to simulate 16 doifferent hash functions.
	 *
	 * However, no randomness is involved for producing values,
	 * then, for every distinct function (0-15): 
	 *
	 * Same input -> Same hash result. Every time.
	 *
	 * In dunce mode the integer produced by hash functions
	 * are limited to the range [2^24, 2^32 -1].
	 */
	, dunce: false
}
```

###  Properties

```javascript
/*
 * the internal bitmap.
 */
Asino.vector

/*
 * the internal pseudo-random table used to generate k
 * indipendent hash functions.
 */
Asino.hash

/*
 * the total number of bits used for the bitmap vector.
 */
Asino.bits

/*
 * the total number of hash functions
 */
Asino.hfn

/*
 * the max bytes to parse from input
 */
Asino.ilen

/*
 * the current false positive probability
 */
Asino.fpp

```

### Methods

> Arguments between [] are optional.

```javascript
/*
 * Check if an element exists.
 * When it returns false, we are sure that the element
 * does not exist in the filter. 
 * When it returns true, there is a probability of a
 * false positive, equal to the current fpp.
 */
Asino#key( Buffer data ) : Boolean

/*
 * try to add the element if it doesn't exist.
 * It returns the same result of Asino#key,
 *
 */
Asino#try( Buffer data ) : Boolean

/*
 * Reset/regenerate the filter
 */
Asino#yoke() : Asino

/*
 * Re-build Bloom filter, via a config object.
 */
Asino#grow( [ Object opt ] ) : Asino

opt : { [ hfn: Number ,] [epop: Number ,] [ilen : Number,] [dunce: Boolean] }


```

> See [examples](example/).

### MIT License

> Copyright (c) 2017-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
