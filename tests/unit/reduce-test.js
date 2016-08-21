import Ember from 'ember';
import { module, test } from 'qunit';

import { reduce, reduceBy } from 'ember-array-computed-macros';

module('Unit | Computed | reduce');

test('Reduce a simple array', (assert) => {
  const subject = Ember.Object.extend({
    summedFoos: reduce('foos', function(memo, value) { return memo + value; })
  }).create({ foos: [1, 2, 3] });

  assert.equal(subject.get('summedFoos'), 6);
});

test('Reduce with an initial value', (assert) => {
  const subject = Ember.Object.extend({
    summedFoos: reduce('foos', function(memo, value) { return memo + value; }, 1)
  }).create({ foos: [1, 2, 3] });

  assert.equal(subject.get('summedFoos'), 7);
});

test('Reduce by property', (assert) => {
  const subject = Ember.Object.extend({
    summedFooBars: reduceBy('foos', 'bar', function(memo, value) { return memo + value; })
  }).create({ foos: [{ bar: 1 }, { bar: 2 }, { bar: 3 }] });

  assert.equal(subject.get('summedFooBars'), 6);
});

test('Reduce by property with an initial value', (assert) => {
  const subject = Ember.Object.extend({
    summedFooBars: reduceBy('foos', 'bar', function(memo, value) { return memo + value; }, 1)
  }).create({ foos: [{ bar: 1 }, { bar: 2 }, { bar: 3 }] });

  assert.equal(subject.get('summedFooBars'), 7);
});

test('reduce with an initial value of zero', (assert) => {
  const subject = Ember.Object.extend({
    summedFoos: reduce('foos', function(memo, value) {
      if (value > 0) { memo += 1; }
      return memo;
    }, 0)
  }).create({ foos: [10, 0, 3, 0, 20] });

  assert.equal(subject.get('summedFoos'), 3);
});

test('reduce by property with an initial value of zero', (assert) => {
  const subject = Ember.Object.extend({
    summedFooBars: reduceBy('foos', 'bar', function(memo, value) {
      if (value > 0) { memo += 1; }
      return memo;
    }, 0)
  }).create({ foos: [{ bar: 10 }, { bar: 0 }, { bar: 5 }] });

  assert.equal(subject.get('summedFooBars'), 2);
});
