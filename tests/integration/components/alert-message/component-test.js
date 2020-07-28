import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | alert-message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<AlertMessage @badge="Tip" @message="Hello World!" />`);
    assert.dom('div[role="alert"]').hasText('Tip Hello World!');
  });
});
