import Ember from 'ember';
import { module, test } from 'qunit';

import { anyBy, everyBy } from 'ember-array-computed-macros';

const { run } = Ember;

module('Unit | Computed | anyBy & everyBy');

test('everyBy', (assert) => {
  const subject = Ember.Object.extend({
    allBarTrue: everyBy('list', 'bar')
  }).create({ list: [{ bar: false }, { bar: true }] });

  assert.equal(subject.get('allBarTrue'), false);

  run(() => subject.set('list', [{ bar: true }, { bar: true }]));

  assert.equal(subject.get('allBarTrue'), true);
});

test('anyBy', (assert) => {
  const subject = Ember.Object.extend({
    anyBarTrue: anyBy('list', 'bar')
  }).create({ list: [{ bar: false }, { bar: true }] });

  assert.equal(subject.get('anyBarTrue'), true);

  run(() => subject.set('list', [{ bar: false }, { bar: false }]));

  assert.equal(subject.get('anyBarTrue'), false);
});
