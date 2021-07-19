import { percentage } from 'ember-percentages/helpers/percentage';
import { module, test } from 'qunit';

module('Unit | Helper | percentage');

test('it returns a percentage without a trailing .0', function(assert) {
  assert.equal(percentage(0.42), '42%');
});

test('it correctly rounds the percentage up where appropriate', function(assert) {
  assert.equal(percentage(0.6789, { decimals: 1 }), '67.9%');
});

test('it correctly rounds the percentage down where appropriate', function(assert) {
  assert.equal(percentage(0.6788881, { decimals: 4 }), '67.8888%');
});

test('it correctly handles 1', function(assert) {
  assert.equal(percentage(1), '100%');
});

test('it correctly handles 0', function(assert) {
  assert.equal(percentage(0), '0%');
});

test('it returns 0 when passed a falsey value', function(assert) {
  assert.equal(percentage(null), '0%');
});
