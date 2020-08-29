import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import stubService from 'questionnaire-generator-demo/tests/helpers/stub-service';

module('Integration | Component | nav-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    const selectedModel = { name: 'T5/GPT2' };
    stubService('questionnaire', {
      selectedModel,
      toggleModel() { }
    });

    await render(hbs`<NavBar />`);

    assert.dom('nav [data-test-home-button]').hasText('Back to home')
    assert.dom('nav [data-test-model-button]').hasText(selectedModel.name);
  });

  test('it changes the model', async function(assert) {
    assert.expect(1);

    stubService('questionnaire', {
      toggleModel() { assert.ok('calls toggle model action'); }
    })

    await render(hbs`<NavBar />`);
    await click('nav [data-test-model-button]');
  });
});
