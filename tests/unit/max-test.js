import Ember from 'ember';
import { module, test } from 'qunit';

import { maxBy } from 'ember-array-computed-macros';

module('Unit | Computed | max & maxBy');

test('Max by a simple list property', (assert) => {
  const subject = Ember.Object.extend({
    maxBar: maxBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('maxBar'), 4);
});
