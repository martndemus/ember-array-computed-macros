import Ember from 'ember';

const { compare, computed, get, isEqual } = Ember;

// For your convenience
export var map      = Ember.computed.map;
export var mapBy    = Ember.computed.mapBy;
export var max      = Ember.computed.max;
export var min      = Ember.computed.min;
export var filter   = Ember.computed.filter;
export var filterBy = Ember.computed.filterBy;
export var sort     = Ember.computed.sort;
export var sum      = Ember.computed.sum;

export var maxBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    const values = get(this, listProperty).map((item) => get(item, valueProperty));
    return Math.max(...values);
  }).readOnly();
};

export var minBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    const values = get(this, listProperty).map((item) => get(item, valueProperty));
    return Math.min(...values);
  }).readOnly();
};

function _parseSortProperties(sortProperties) {
  return sortProperties.map((sortProperty) => {
    let descending = false;

    if (sortProperty.match(/:desc$/)) {
      sortProperty = sortProperty.replace(':desc', '');
      descending   = true;
    }

    return [sortProperty, descending];
  });
}

function _orderBy(list, sortProperties) {
  // Bug/workaround: Ember.ArrayProxy has no method sort.
  // see: https://github.com/emberjs/ember.js/issues/11936
  if (typeof list.sort !== 'function' && typeof list.toArray === 'function') {
    list = list.toArray();
  }

  return list.sort((item1, item2) => {
    let result = 0;

    sortProperties.forEach(([sortProperty, descending]) => {
      if (result === 0) {
        result = compare(get(item1, sortProperty), get(item2, sortProperty));
        if (result !== 0 && descending) {
          result = result * -1;
        }
      }
    });

    return result;
  });
}

export var orderBy = function(listProperty, ...sortProperties) {
  sortProperties = _parseSortProperties(sortProperties);

  const computedValueKeys = sortProperties.map((item) => item[0]);

  return computed(`${listProperty}.@each.{${computedValueKeys.join(',')}}`, function() {
    const list = get(this, listProperty);
    return _orderBy(list, sortProperties);
  }).readOnly();
};

export var orderByComputedProperty = function(listProperty, orderProperty) {
  return computed(`${listProperty}.[]`, `${orderProperty}.[]`, function() {
    const list           = get(this, listProperty);
    const sortProperties = _parseSortProperties(this.get(orderProperty));

    return _orderBy(list, sortProperties);
  }).readOnly();
};

export var sumBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    return get(this, listProperty).reduce((sum, item) => {
      return sum + (get(item, valueProperty) || 0);
    }, 0);
  }).readOnly();
};

export var reverse = function(listProperty) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).reverse();
  });
};

export var everyBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).reduce((allTrue, item) => {
      return allTrue && get(item, valueProperty);
    }, true);
  });
};

export var anyBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).reduce((anyTrue, item) => {
      return anyTrue || get(item, valueProperty);
    }, false);
  });
};

export var groupBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    return get(this, listProperty).reduce((groups, item) => {
      let group = groups.find((group) => {
        const firstOfGroup = group.get('firstObject');

        if (firstOfGroup !== undefined) {
          return isEqual(get(firstOfGroup, valueProperty), get(item, valueProperty));
        }
      });

      if (group === undefined) {
        group = Ember.A();
        groups.pushObject(group);
      }

      group.pushObject(item);

      return groups;
    }, Ember.A());
  });
};
