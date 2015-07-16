import Ember from 'ember';
import { module, test } from 'qunit';

import { map, mapBy } from 'ember-array-computed-macros';

const { get } = Ember;

module('Unit | Computed | map & mapBy');

test('Just map', (assert) => {
  const subject = Ember.Object.extend({
    bars: map('foos', (item) => get(item, 'bar'))
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('bars'), [3, 4, 1, 3]);
});

test('Map by a simple list property', (assert) => {
  const subject = Ember.Object.extend({
    bars: mapBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('bars'), [3, 4, 1, 3]);
});
