import Ember from 'ember';
import { module, test } from 'qunit';

import { reverse } from 'ember-array-computed-macros';

module('Unit | Computed | reverse');

test('Sums a list property', (assert) => {
  const subject = Ember.Object.extend({
    reversedList: reverse('list')
  }).create({ list: [1, 10, 4] });

  assert.deepEqual(subject.get('reversedList'), [4, 10, 1]);
});
