import Ember from 'ember';
import { module, test } from 'qunit';

import { minBy } from 'ember-array-computed-macros';

module('Unit | Computed | minBy');

test('Min by a simple list property', (assert) => {
  const subject = Ember.Object.extend({
    minBar: minBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.equal(subject.get('minBar'), 1);
});

