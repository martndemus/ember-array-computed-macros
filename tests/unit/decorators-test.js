import Ember from 'ember';
import { module, test } from 'qunit';

import {
  map,
  mapBy,
  orderBy,
  filter,
  filterBy,
  everyBy,
  anyBy,
  minBy,
  min,
  maxBy,
  max,
  reverse,
  sum,
  sort
} from 'ember-array-computed-macros/decorators'; // jshint ignore:line

module('Unit | Decorators');

test('All decorators are exported', (assert) => {
  assert.ok(map);
  assert.ok(mapBy);
  assert.ok(orderBy);
  assert.ok(filter);
  assert.ok(filterBy);
  assert.ok(everyBy);
  assert.ok(anyBy);
  assert.ok(minBy);
  assert.ok(maxBy);
  assert.ok(min);
  assert.ok(max);
  assert.ok(reverse);
  assert.ok(sum);
  assert.ok(sort);
});

test('Decorator works', (assert) => {
  const subject = Ember.Object.extend({
    foos: [],
    /* jshint ignore:start */
    @orderBy('foos', 'bar') orderedFoos
    /* jshint ignore:end */
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('orderedFoos'), [
    { bar: 1 }, { bar: 3 }, { bar: 3 }, { bar: 4 }
  ]);
});
