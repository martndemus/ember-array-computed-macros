import Ember from 'ember';

const { compare, computed, get } = Ember;

export var map = function(listProperty, mapFunction) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).map(mapFunction);
  }).readOnly();
};

export var mapBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    return get(this, listProperty).map((item) => get(item, valueProperty));
  }).readOnly();
};

export var max = function(listProperty) {
  return computed(`${listProperty}.@each`, function() {
    const values = get(this, listProperty);
    return Math.max(...values);
  }).readOnly();
};

export var maxBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    const values = get(this, listProperty).map((item) => get(item, valueProperty));
    return Math.max(...values);
  }).readOnly();
};

export var min = function(listProperty) {
  return computed(`${listProperty}.@each`, function() {
    const values = get(this, listProperty);
    return Math.min(...values);
  }).readOnly();
};

export var minBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    const values = get(this, listProperty).map((item) => get(item, valueProperty));
    return Math.min(...values);
  }).readOnly();
};

export var filter = function(listProperty, filterFunction) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).filter(filterFunction);
  }).readOnly();
};

export var filterBy = function(listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function() {
    return get(this, listProperty).filter((item) => get(item, valueProperty));
  }).readOnly();
};

export var sort = function(listProperty, sortFunction = compare ) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).sort(sortFunction);
  }).readOnly();
};

export var orderBy = function(listProperty, ...sortProperties) {
  sortProperties = sortProperties.map((sortProperty) => {
    let descending = false;

    if (sortProperty.match(/:desc$/)) {
      sortProperty = sortProperty.replace(':desc', '');
      descending   = true;
    }

    return [sortProperty, descending];
  });

  return computed(`${listProperty}.@each`, function() {
    const list = get(this, listProperty);

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
  }).readOnly();
};

export var sum = function(listProperty) {
  return computed(`${listProperty}.@each`, function() {
    return get(this, listProperty).reduce((sum, item) => {
      return sum + (item || 0);
    }, 0);
  });
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
