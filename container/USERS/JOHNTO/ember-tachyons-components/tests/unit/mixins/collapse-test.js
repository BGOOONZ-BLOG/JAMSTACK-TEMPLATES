import Ember from 'ember';
import CollapseMixin from 'ember-tachyons-components/mixins/collapse';
import { module, test } from 'qunit';

module('Unit | Mixin | collapse');

test('it works', function(assert) {
  let CollapseObject = Ember.Object.extend(CollapseMixin);
  let subject = CollapseObject.create();
  assert.ok(subject);
});
