import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/weather-icon';

export default Component.extend({
  tagName: 'i',
  classNameBindings: ['prefixedClass'],
  layout,

  prefixedClass: computed('name', function () {
    return 'wi wi-' + this.get('name');
  })
});
