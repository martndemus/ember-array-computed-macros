import Ember from 'ember';
import { module, test } from 'qunit';

import { sum, sumBy } from 'ember-array-computed-macros';

module('Unit | Computed | sum & sumBy');

test('Sums a list property', (assert) => {
  const subject = Ember.Object.extend({
    sumOfList: sum('list')
  }).create({ list: [1, 10, 4] });

  assert.equal(subject.get('sumOfList'), 15);
});

test('Sums a list of values', (assert) => {
  const subject = Ember.Object.extend({
    sumOfAll: sumBy('list', 'score')
  }).create({ list: [{ score: 1 }, { score: 10 }, { score: 4 }] });

  assert.equal(subject.get('sumOfAll'), 15);
});
