import Ember from 'ember';
import { module, test } from 'qunit';

import { sort } from 'ember-array-computed-macros';

module('Unit | Computed | sort');

test('Sort an array property', (assert) => {
  const subject = Ember.Object.extend({
    sortedFoos: sort('foos')
  }).create({ foos: [1, 3, 4, 2] });

  assert.deepEqual(subject.get('sortedFoos'), [1, 2, 3, 4]);
});

test('Sort with function', (assert) => {
  const subject = Ember.Object.extend({
    sortedFoos: sort('foos', (a, b) => Ember.compare(a, b) * -1)
  }).create({ foos: [1, 3, 4, 2] });

  assert.deepEqual(subject.get('sortedFoos'), [4, 3, 2, 1]);
});
