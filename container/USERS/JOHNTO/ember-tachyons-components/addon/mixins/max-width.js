import Ember from 'ember';

export default Ember.Mixin.create({
  maxWidth: 'none',

  maxWidthClass: Ember.computed('maxWidth', function() {
    const maxWidth = this.get('maxWidth');

    if (maxWidth && maxWidth !== 'none') {
      return `mw${maxWidth}`;
    }
  })
});
