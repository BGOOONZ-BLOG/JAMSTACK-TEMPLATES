import Ember from 'ember';

export default Ember.Component.extend({
  list: [],
  properties: 'id',
  filterQuery: '',
  strictMatch: false,
  partial: '',

  listClass: '',
  inputClass: '',
  placeholder: 'Search...',

  filteredList: function() {
    var props = this.get('formattedProperties');
    var query = this.get('filterQuery').trim();
    var strictMatch = this.get('strictMatch');

    if (Ember.isBlank(query)) {
      return this.get('list');
    }

    return this.get('list').filter(function(object) {
      return props.some(function(prop) {
        if (strictMatch) {
          if (Ember.isEqual(object.get(prop), query)) {
            return true;
          }
        } else {
          if (isLike(object.get(prop), query)) {
            return true;
          }
        }
      });
    });
  }.property('list', 'filterQuery'),

  formattedProperties: function() {
    return this.get('properties').split(' ').map(function(prop) {
      return prop.trim();
    });
  }.property('properties')
});

function isLike(one, two) {
  if (!one || !two) {
    return false;
  }

  return one.toString().indexOf(two.toString()) !== -1;
}
