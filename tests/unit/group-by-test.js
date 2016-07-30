import Ember from 'ember';
import { module, test } from 'qunit';

import { groupBy } from 'ember-array-computed-macros';

const { run } = Ember;

module('Unit | Computed | groupBy');

test('Groups on a simple property', (assert) => {
  const subject = Ember.Object.extend({
    groupedFoos: groupBy('foos', 'bar')
  }).create({ foos: Ember.A([{ bar: 3 }, { bar: 4 }, { bar: 1 }, { bar: 3 }]) });

  assert.deepEqual(subject.get('groupedFoos'), [
    [{ bar: 3 }, { bar: 3 }], [{ bar: 4 }], [{ bar: 1 }]
  ]);

  run(() => {
    subject.set('foos.firstObject.bar', 5);
  });

  assert.deepEqual(subject.get('groupedFoos'), [
    [{ bar: 5 }], [{ bar: 4 }], [{ bar: 1 }], [{ bar: 3 }]
  ]);

  run(() => {
    subject.set('groupedFoos.firstObject.firstObject.bar', 4);
  });

  assert.deepEqual(subject.get('groupedFoos'), [
    [{ bar: 4 }, { bar: 4 }], [{ bar: 1 }], [{ bar: 3 }]
  ]);
});
