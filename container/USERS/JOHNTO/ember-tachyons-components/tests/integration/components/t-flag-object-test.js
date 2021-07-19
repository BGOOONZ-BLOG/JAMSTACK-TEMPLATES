import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('t-flag-object', 'Integration | Component | t flag object', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#t-flag-object}}
      template block text
    {{/t-flag-object}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  assert.ok(this.$('div').hasClass('dt'));
});

test('it applies the correct collapse class for none', function(assert) {
  this.render(hbs`{{t-flag-object collapse="none"}}`);
  assert.ok(this.$('div').hasClass('dt'));
});

test('it applies the correct collapse class for s', function(assert) {
  this.render(hbs`{{t-flag-object collapse="s"}}`);
  assert.ok(this.$('div').hasClass('dt-m'));
  assert.ok(this.$('div').hasClass('dt-l'));
});

test('it applies the correct collapse class for m', function(assert) {
  this.render(hbs`{{t-flag-object collapse="m"}}`);
  assert.ok(this.$('div').hasClass('dt-l'));
});
