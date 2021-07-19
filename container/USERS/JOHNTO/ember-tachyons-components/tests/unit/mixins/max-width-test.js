import Ember from 'ember';
import MaxWidthMixin from 'ember-tachyons-components/mixins/max-width';
import { module, test } from 'qunit';

module('Unit | Mixin | max width');

// Replace this with your real tests.
test('it works', function(assert) {
  let MaxWidthObject = Ember.Object.extend(MaxWidthMixin);
  let subject = MaxWidthObject.create();
  assert.ok(subject);
});
