# ember-array-computed-macros
[![npm version](https://badge.fury.io/js/ember-array-computed-macros.svg)](http://badge.fury.io/js/ember-array-computed-macros) [![Build Status](https://travis-ci.org/martndemus/ember-array-computed-macros.svg?branch=master)](https://travis-ci.org/martndemus/ember-array-computed-macros) [![Ember Observer Score](http://emberobserver.com/badges/ember-array-computed-macros.svg)](http://emberobserver.com/addons/ember-array-computed-macros)

## Macros

This addon is supplemental to the already existing array computed macros existing in Ember.js

#### `maxBy(listProperty, valueProperty)`

Takes all values of `valueProperty` from `listProperty` and then picks the maximum value from that.

Example:
```js
var ContactList = Ember.Component.extend({
  highestAge: maxBy('people', 'age')
});

const myContactList = ContactList.create({
  people: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 }
  ]
}).

myContactList.get('highestAge') // returns 42
```

### `minBy(listPropery, valueProperty)`

See `maxBy`, except it takes the minimum value instead of the maximum.

### `orderBy(listProperty, ...sortProperties)`

Takes a `listProperty` and returns that list sorted by the `sortProperties`.
Append `:desc` to the sort property to sort in reverse order for that property.

```js
import Ember from 'ember';
import { map } from 'ember-array-computed-macros';

export default Ember.Component.extend({
  names: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 }
  ],
  orderedNames: orderBy('names', 'last', 'first'. 'age:desc')
});
```

There is also a variant for `groupBy` that works with a dynamic list of
sortProperties called `groupByComputedProperty`:

```js
import Ember from 'ember';
import { map } from 'ember-array-computed-macros';

export default Ember.Component.extend({
  names: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 }
  ],

  nameOrdering: ['last', 'first', 'age:desc'],
  orderedNames: orderByComputedProperty('names', 'nameOrdering')
});
```

### `groupBy(listProperty, valueProperty)`

Pushes all items in `listProperty` that have the same value at `valueProperty`
into an array.

```js
var ContactList = Ember.Component.extend({
  groupedByAge: groupBy('people', 'age')
});

const myContactList = ContactList.create({
  people: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 },
    { first: 'Robert', last: 'Jackson', age: 42 },
    { first: 'Stefan', last: 'Penner', age 33 }
  ]
}).

myContactList.get('groupedByAge') // returns:
//[
//  [
//    { first: 'Tom', last: 'Dale', age: 21 }
//  ],
//  [
//    { first: 'Yehuda', last: 'Katz', age: 42 },
//    { first: 'Robert', last: 'Jackson', age: 42 }
//  ],
//  [
//    { first: 'Stefan', last: 'Penner', age 33 }
//  ]
//]
```

### `reduce(listProperty, reduceFunction, initialValue)`

Takes all values of `listProperty` and then reduces those values with the
`reduceFunction`. If you don't supply an `initialValue`, then the first value of
the list will be the `initialValue`.

### `reduceBy(listProperty, valueProperty, reduceFunction, initialValue)`

Takes all values of `valueProperty` from `listProperty` and then reduces those
values with the `reduceFunction`. If you don't supply an `initialValue`, then
the first value of the list will be the `initialValue`.

### `sumBy(listProperty, valueProperty)`

Takes all values of `valueProperty` from `listProperty` and then sums those values.

Example:
```js
var ContactList = Ember.Component.extend({
  collectiveAge: sumBy('people', 'age')
});

const myContactList = ContactList.create({
  people: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 }
  ]
}).

myContactList.get('collectiveAge') // returns 53
```


### `meanBy(listProperty, valueProperty)`

Takes all values of `valueProperty` from `listProperty` and calculate their [arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean) value.

Example:
```js
var ContactList = Ember.Component.extend({
  averageAge: meanBy('people', 'age')
});

const myContactList = ContactList.create({
  people: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 }
  ]
});

myContactList.get('collectiveAge') // returns 31.5
```

### `reverse(listProperty)`

Reverses the array at `listProperty` with `Array.prototype.reverse`.

### `everyBy(listPropery, valueProperty, compareFn)`

Takes all values of `valueProperty` from `listProperty` and then checks
if `compareFn` returns truthy value for all of them.
Value is provided to `compareFn` as first argument.

If you don't supply a `compareFn` it check if all values are truthy.

```js
var MovieList = Ember.Component.extend({
  allHavingReleaseDate: everyBy('movies', 'releasedAt'),
  allReleasedAfter2000: everyBy('movies', 'releasedAt', function(value) {
    return value.isAfter('2000-01-01');
  })
});

const myMovieList = MovieList.create({
  movies: [
    { title: 'La haine', releasedAt: moment('1995-05-31') },
    { title: 'Sin City', releasedAt: moment('2005-03-28') }
  ]
});

myMovieList.get('allHavingReleaseDate'); // true
myMovieList.get('allReleasedAfter2000'); // false
```

### `anyBy(listProperty, valueProperty, compareFn)`

Takes all values of `valueProperty` from `listProperty` and then checks
if `compareFn` returns truthy value for any of them.
Value is provided to `compareFn` as first argument.

If you don't supply a `compareFn` it check if any value is truthy.

### From Ember.js

The addon re-exports all array computed macros from Ember.js for convenience.

* map
* mapBy
* filter
* filterBy
* min
* max
* sum
* sort

## Use with decorators

```js
import Ember from 'ember';
import { map } from 'ember-array-computed-macros/decorators';

export default Ember.Component.extend({
  names: [
    { first: 'Tom', last: 'Dale' },
    { first: 'Yehuda', last: 'Katz' }
  ],

  @mapBy('names', 'first')
  firstNames
});
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
