import Ember from 'ember';
import { module, test } from 'qunit';

import { orderBy } from 'ember-array-computed-macros';

const { run } = Ember;

module('Unit | Computed | orderBy');

test('Sorts by a simple property', (assert) => {
  const subject = Ember.Object.extend({
    orderedFoos: orderBy('foos', 'bar')
  }).create({ foos: [{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }] });

  assert.deepEqual(subject.get('orderedFoos'), [
    { bar: 1 }, { bar: 3 }, { bar: 3 }, { bar: 4 }
  ]);
});

test('Sorts by multiple properties', (assert) => {
  const subject = Ember.Object.extend({
    orderedList: orderBy('list', 'foo', 'bar')
  }).create({ list: [
    { foo: 1, bar: 3 }, { foo: 2, bar: 4 }, {  foo: 1, bar: 1 }, { foo: 2, bar: 3 }
  ] });

  assert.deepEqual(subject.get('orderedList'), [
    { foo: 1, bar: 1 }, { foo: 1, bar: 3 }, { foo: 2, bar: 3 }, { foo: 2, bar: 4 }
  ]);
});

test('Sorts by multiple properties one desc', (assert) => {
  const subject = Ember.Object.extend({
    orderedList: orderBy('list', 'foo:desc', 'bar')
  }).create({ list: [
    { foo: 1, bar: 3 }, { foo: 2, bar: 4 }, {  foo: 1, bar: 1 }, { foo: 2, bar: 3 }
  ] });

  assert.deepEqual(subject.get('orderedList'), [
    { foo: 2, bar: 3 }, { foo: 2, bar: 4 }, { foo: 1, bar: 1 }, { foo: 1, bar: 3 }
  ]);
});

test('Listens for property changes', (assert) => {
  const subject = Ember.Object.extend({
    orderedFoos: orderBy('foos', 'bar'),
  }).create({ foos: Ember.A([{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }]) });

  run(() => subject.set('foos.firstObject.bar', 5));

  assert.deepEqual(subject.get('orderedFoos'), [
    { bar: 1 }, { bar: 3 }, { bar: 4 }, { bar: 5 }
  ]);
});
