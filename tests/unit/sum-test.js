import Ember from 'ember';
import { module, test } from 'qunit';

import { sumBy } from 'ember-array-computed-macros';

module('Unit | Computed | sumBy');

test('Sums a list of values', (assert) => {
  const subject = Ember.Object.extend({
    sumOfAll: sumBy('list', 'score')
  }).create({ list: [{ score: 1 }, { score: 10 }, { score: 4 }] });

  assert.equal(subject.get('sumOfAll'), 15);
});
