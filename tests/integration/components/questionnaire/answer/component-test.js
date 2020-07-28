import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | questionnaire/answer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders as incorrect answer', async function(assert) {
    await render(hbs`<Questionnaire::Answer />`);

    assert.dom('li img').doesNotExist();
    assert.dom('li').hasText('Respuesta Incorrecta');
  });

  test('it renders correct answer', async function(assert) {
    await render(hbs`<Questionnaire::Answer @correct=true />`);

    assert.dom('li img').exists();
    assert.dom('li').hasText('Respuesta Correcta');
  });
});
