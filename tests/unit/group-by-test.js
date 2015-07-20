import Ember from 'ember';
import { module, test } from 'qunit';

import { groupBy } from 'ember-array-computed-macros';

module('Unit | Computed | groupBy');

test('Groups on a simple property', (assert) => {
  const subject = Ember.Object.extend({
    groupedFoos: groupBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('groupedFoos'), [
    [{ bar: 3 }, { bar: 3 }], [{ bar: 4 }], [{ bar: 1 }]
  ]);
});
