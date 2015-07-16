import Ember from 'ember';
import { module, test } from 'qunit';

import { min, minBy } from 'ember-array-computed-macros';

module('Unit | Computed | min & minBy');

test('Min of an array property', (assert) => {
  const subject = Ember.Object.extend({
    minFoo: min('foos')
  }).create({ foos: [1, 3, 4, 2] });

  assert.equal(subject.get('minFoo'), 1);
});

test('Min by a simple list property', (assert) => {
  const subject = Ember.Object.extend({
    minBar: minBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.equal(subject.get('minBar'), 1);
});

