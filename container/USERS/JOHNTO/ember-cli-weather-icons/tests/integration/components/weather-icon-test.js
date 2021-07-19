import { find } from '@ember/test-helpers';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | weather icon', function(hooks){
  setupRenderingTest(hooks),

  test('it renders', async function(assert) {

    await render(hbs`{{weather-icon}}`);

    assert.equal(find('*').textContent.trim(), '');

    await render(hbs`
      {{#weather-icon}}
        template block text
      {{/weather-icon}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  test('it uses the correct tag', async function(assert) {
    await render(hbs`{{weather-icon}}`);
    assert.ok(find('i'));
  });

  test('it adds the wi class', async(assert) => {
    await render(hbs`{{weather-icon name='sunny'}}`);
    assert.ok(find('i').classList.contains('wi'));
  });

  test('it adds the prefixed class', async function(assert) {
    await render(hbs`{{weather-icon name='day-sunny'}}`);
    assert.ok(find('i').classList.contains('wi-day-sunny'));
  });

  test('it correctly binds prefixedClass to the name property', async function(assert) {
    set(this, 'currWeather', 'day-sunny');
    await render(hbs`{{weather-icon name=currWeather}}`);
    assert.ok(find('i').classList.contains('wi-day-sunny'));

    set(this, 'currWeather', 'cloudy');
    await render(hbs`{{weather-icon name=currWeather}}`);
    assert.ok(find('i').classList.contains('wi-cloudy'));
  });
});
