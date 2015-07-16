# ember-array-computed-macros
[![npm version](https://badge.fury.io/js/ember-array-computed-macros.svg)](http://badge.fury.io/js/ember-array-computed-macros) [![Build Status](https://travis-ci.org/martndemus/ember-array-computed-macros.svg?branch=master)](https://travis-ci.org/martndemus/ember-array-computed-macros)

## Usage

### Map

```js
import Ember from 'ember';
import { map } from 'ember-array-computed-macros';

export default Ember.Component.extend({
  names: ['Tom', 'Yehuda'],
  upperCasedNames: map('names', (name) => name.toUpperCase())
});
```

### Map By

```js
import Ember from 'ember';
import { map } from 'ember-array-computed-macros';

export default Ember.Component.extend({
  names: [
    { first: 'Tom', last: 'Dale' },
    { first: 'Yehuda', last: 'Katz' }
  ],
  firstNames: mapBy('names', 'first')
});
```

### Order By

```js
import Ember from 'ember';
import { map } from 'ember-array-computed-macros';

export default Ember.Component.extend({
  names: [
    { first: 'Tom', last: 'Dale', age: 21 },
    { first: 'Yehuda', last: 'Katz', age: 42 }
  ],
  oderedNames: orderBy('names', 'last', 'first'. 'age:desc')
});
```

### Other

* filter
* filterBy
* everyBy
* anyBy
* min
* minBy
* max
* maxBy
* reverse
* sum
* sort


## Decorators

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
