import Ember from 'ember';
import { module, test } from 'qunit';

import { max, maxBy } from 'ember-array-computed-macros';

module('Unit | Computed | max & maxBy');

test('Max of an array property', (assert) => {
  const subject = Ember.Object.extend({
    maxFoo: max('foos')
  }).create({ foos: [1, 3, 4, 2] });

  assert.deepEqual(subject.get('maxFoo'), 4);
});

test('Max by a simple list property', (assert) => {
  const subject = Ember.Object.extend({
    maxBar: maxBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('maxBar'), 4);
});
