import Ember from 'ember';
import { module, test } from 'qunit';

import { filter, filterBy } from 'ember-array-computed-macros';

module('Unit | Computed | filter & filterBy');

test('Filter with a function', (assert) => {
  const subject = Ember.Object.extend({
    filteredList: filter('list', (item) => item)
  }).create({ list: [true, false, true, false] });

  assert.equal(subject.get('filteredList.length'), 2);
});

test('Filter by a simple list property', (assert) => {
  const subject = Ember.Object.extend({
    filteredList: filterBy('list', 'bar')
  }).create({ list: [{ bar: false }, { bar: true }, { bar: true }, { bar: false }] });

  assert.equal(subject.get('filteredList.length'), 2);
});
