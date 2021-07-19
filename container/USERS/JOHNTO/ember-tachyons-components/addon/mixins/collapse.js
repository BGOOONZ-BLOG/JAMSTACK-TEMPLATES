import Ember from 'ember';

export default Ember.Mixin.create({
  collapse: 'none',

  isCollapseNone: Ember.computed('collapse', function() {
    return this.get('collapse') === 'none';
  }),

  isCollapseSmall: Ember.computed('collapse', function() {
    return this.get('collapse') === 's';
  }),

  isCollapseMedium: Ember.computed('collapse', function() {
    return this.get('collapse') === 'm';
  })
});
