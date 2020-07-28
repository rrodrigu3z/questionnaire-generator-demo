import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | questionnaire', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Questionnaire />`);

    assert.dom('h1 img').exists();
    assert.dom('h1').hasText('Generated Questions');
    assert.dom('div[role="alert"]').exists();
    assert.dom('ul').exists({ count: 2 });
  });
});
