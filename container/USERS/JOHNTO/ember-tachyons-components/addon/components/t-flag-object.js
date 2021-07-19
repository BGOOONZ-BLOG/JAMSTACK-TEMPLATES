import Ember from 'ember';
import Collapse from '../mixins/collapse';
import MaxWidth from '../mixins/max-width';
import layout from '../templates/components/t-flag-object';

export default Ember.Component.extend(Collapse, MaxWidth, {
  layout,
  classNameBindings: [
    'isCollapseNone:dt',
    'isCollapseSmall:dt-m',
    'isCollapseSmall:dt-l',
    'isCollapseMedium:dt-l',
    'maxWidthClass'
  ],

  type: 't-flag-object-inner'
});
