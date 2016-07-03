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

test('everyBy with compare function', (assert) => {
  const first = { age: 42 };
  const second = { age: 18 };
  const subject = Ember.Object.extend({
    teenagerOnly: everyBy('persons', 'age', function(item) {
      return item >= 13 && item <= 19;
    })
  }).create({ persons: Ember.A([first, second]) });

  assert.equal(subject.get('teenagerOnly'), false);

  run(() => set(first, 'age', 13));

  assert.equal(subject.get('teenagerOnly'), true);
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

test('anyBy with compare function', (assert) => {
  const subject = Ember.Object.extend({
    anyTeenager: anyBy('persons', 'age', function(item) {
      return item >= 13 && item <= 19;
    })
  }).create({
    persons: Ember.A([
      { age: 42 }
    ])
  });

  assert.equal(subject.get('anyTeenager'), false);

  run(() => subject.get('persons').pushObject({ age: 19 }));

  assert.equal(subject.get('anyTeenager'), true);
});
