import Ember from 'ember';
import { module, test } from 'qunit';

import { meanBy } from 'ember-array-computed-macros';

module('Unit | Computed | meanBy');

test('Sums a list of values', (assert) => {
  const subject = Ember.Object.extend({
    meanValue: meanBy('list', 'score')
  }).create({ list: [{ score: 1 }, { score: 10 }, { score: 4 }] });

  assert.equal(subject.get('meanValue'), 5);
});
