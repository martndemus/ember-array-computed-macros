import Ember from 'ember';

const {
  run
} = Ember;

import { moduleForModel, test } from 'ember-qunit';

import { meanBy } from 'ember-array-computed-macros';


moduleForModel('parent', 'Unit | Computed | meanBy', {
  // Specify the other units that are required for this test.
  needs: ['model:child']
});

test('Sums a list of values', (assert) => {
  const subject = Ember.Object.extend({
    meanValue: meanBy('list', 'score')
  }).create({ list: [{ score: 1 }, { score: 10 }, { score: 4 }] });

  assert.equal(subject.get('meanValue'), 5);
});


test('Sums a list of values from async relationship', function (assert) {
  run(() => {
    const store  = this.store();
    const parent = this.subject({
      children: [
        store.createRecord('child', {age: 2}),
        store.createRecord('child', {age: 4})
      ]
    });

    assert.equal(parent.get('meanChildAge'), 3);
  });
});
