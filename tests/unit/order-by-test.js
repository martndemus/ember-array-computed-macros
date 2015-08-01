import Ember from 'ember';
import { module, test } from 'qunit';

import { orderBy, orderByComputedProperty } from 'ember-array-computed-macros';

const { run, set } = Ember;

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
  const first  = { bar: 3 };
  const second = { bar: 4 };

  const subject = Ember.Object.extend({
    orderedFoos: orderBy('foos', 'bar'),
  }).create({ foos: Ember.A([first, second]) });

  assert.deepEqual(subject.get('orderedFoos'), [first, second]);

  run(() => set(first, 'bar', 5));

  assert.deepEqual(subject.get('orderedFoos'), [second, first]);
});

test('Bug: Ember.ArrayProxy does not have the method sort', (assert) => {
  const list = Ember.ArrayProxy.create({
    content: Ember.A([{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }])
  });
  const subject = Ember.Object.extend({
    orderedFoos: orderBy('foos', 'bar')
  }).create({ foos: list });

  assert.deepEqual(subject.get('orderedFoos'), [
    { bar: 1 }, { bar: 3 }, { bar: 3 }, { bar: 4 }
  ]);
});

test('Order by dynamic computed property', (assert) => {
  const subject = Ember.Object.extend({
    ordering: ['foo'],
    orderedList: orderByComputedProperty('list', 'ordering')
  }).create({ list: [
    { foo: 1, bar: 3 }, { foo: 2, bar: 4 }, {  foo: 1, bar: 1 }, { foo: 2, bar: 3 }
  ] });

  assert.deepEqual(subject.get('orderedList'), [
    { foo: 1, bar: 3 }, { foo: 1, bar: 1 }, { foo: 2, bar: 4 }, { foo: 2, bar: 3 }
  ]);

  run(() => set(subject, 'ordering', ['bar']));

  assert.deepEqual(subject.get('orderedList'), [
    { foo: 1, bar: 1 }, { foo: 1, bar: 3 }, { foo: 2, bar: 3 }, { foo: 2, bar: 4 }
  ]);
});
