import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | postit-note', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<PostitNote />`);

    assert.dom('.note-title').hasText('How to generate questions?');
    assert.dom('.note-text').exists();
  });
});
