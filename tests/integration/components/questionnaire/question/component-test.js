import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | questionnaire/question', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Questionnaire::Question />`);

    assert.dom('h2').hasText('Cual de las siguientes opciones es válida?');
    assert.dom('ul li').exists({ count: 3 });
  });
});
