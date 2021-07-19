import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('t-flag-object-inner', 'Integration | Component | t flag object inner', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#t-flag-object-inner}}
      template block text
    {{/t-flag-object-inner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  assert.ok(this.$('div').hasClass('dtc'));
  assert.ok(this.$('div').hasClass('v-mid'));
});

test('it applies the correct collapse class for none', function(assert) {
  this.render(hbs`{{t-flag-object-inner collapse="none"}}`);
  assert.ok(this.$('div').hasClass('dtc'));
});

test('it applies the correct collapse class for s', function(assert) {
  this.render(hbs`{{t-flag-object-inner collapse="s"}}`);
  assert.ok(this.$('div').hasClass('dtc-m'));
  assert.ok(this.$('div').hasClass('dtc-l'));
});

test('it applies the correct collapse class for m', function(assert) {
  this.render(hbs`{{t-flag-object-inner collapse="m"}}`);
  assert.ok(this.$('div').hasClass('dtc-l'));
});

test('it applies a max width when given', function(assert) {
  this.render(hbs`{{t-flag-object-inner maxWidth="6"}}`);
  assert.ok(this.$('div').hasClass('mw6'));
});
