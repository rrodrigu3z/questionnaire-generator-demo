import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | page-home', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    await render(hbs`<PageHome />`);
    assert.dom('h2').hasText('Wikipedia questionnaire generator');
    assert.dom('[data-test-article-item]').doesNotExist();

    await click('[data-test-article-select]');
    assert.dom('[data-test-article-item]').exists({ count: 2 });
  });
});
