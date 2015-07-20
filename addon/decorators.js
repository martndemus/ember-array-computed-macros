import macroAlias from 'ember-computed-decorators/macro-alias';

import {
  map as _map,
  mapBy as _mapBy,
  orderBy as _orderBy,
  groupBy as _groupBy,
  filter as _filter,
  filterBy as _filterBy,
  everyBy as _everyBy,
  anyBy as _anyBy,
  min as _min,
  minBy as _minBy,
  max as _max,
  maxBy as _maxBy,
  reverse as _reverse,
  sum as _sum,
  sort as _sort
} from 'ember-array-computed-macros';

export var map = macroAlias(_map);
export var mapBy = macroAlias(_mapBy);
export var orderBy = macroAlias(_orderBy);
export var groupBy = macroAlias(_groupBy);
export var filter = macroAlias(_filter);
export var filterBy = macroAlias(_filterBy);
export var everyBy = macroAlias(_everyBy);
export var anyBy = macroAlias(_anyBy);
export var min = macroAlias(_min);
export var minBy = macroAlias(_minBy);
export var max = macroAlias(_max);
export var maxBy = macroAlias(_maxBy);
export var reverse = macroAlias(_reverse);
export var sum = macroAlias(_sum);
export var sort = macroAlias(_sort);
