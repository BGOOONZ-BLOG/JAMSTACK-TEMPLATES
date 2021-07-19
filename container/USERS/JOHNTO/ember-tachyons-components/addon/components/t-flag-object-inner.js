import Ember from 'ember';
import Collapse from '../mixins/collapse';
import MaxWidth from '../mixins/max-width';
import layout from '../templates/components/t-flag-object-inner';

export default Ember.Component.extend(Collapse, MaxWidth, {
  layout,
  classNameBindings: [
    'isCollapseNone:dtc',
    'isCollapseNone:v-mid',
    'isCollapseSmall:dtc-m',
    'isCollapseSmall:dtc-l',
    'isCollapseSmall:v-mid-m',
    'isCollapseSmall:v-mid-l',
    'isCollapseMedium:dtc-l',
    'isCollapseMedium:v-mid-l',
    'maxWidthClass'
  ]
});
