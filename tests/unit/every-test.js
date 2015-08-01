import Ember from 'ember';
import { module, test } from 'qunit';
import { anyBy, everyBy } from 'ember-array-computed-macros';

const { run, set } = Ember;

module('Unit | Computed | anyBy & everyBy');

test('everyBy', (assert) => {
  const first  = { bar: false };
  const second = { bar: true };
  const subject = Ember.Object.extend({
    allBarTrue: everyBy('list', 'bar')
  }).create({ list: Ember.A([first, second]) });

  assert.equal(subject.get('allBarTrue'), false);

  run(() => set(first, 'bar', true));

  assert.equal(subject.get('allBarTrue'), true);
});

test('anyBy', (assert) => {
  const first  = { bar: false };
  const second = { bar: true };
  const subject = Ember.Object.extend({
    anyBarTrue: anyBy('list', 'bar')
  }).create({ list: Ember.A([first, second]) });

  assert.equal(subject.get('anyBarTrue'), true);

  run(() => set(second, 'bar', false));

  assert.equal(subject.get('anyBarTrue'), false);
});
