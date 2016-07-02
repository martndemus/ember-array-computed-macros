import DS from 'ember-data';
import { meanBy } from 'ember-array-computed-macros';

export default DS.Model.extend({
  children:     DS.hasMany('children', {async: true}),
  meanChildAge: meanBy('children', 'age')
});
