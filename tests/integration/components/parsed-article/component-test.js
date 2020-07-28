import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | parsed-article', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<ParsedArticle />`);

    assert.dom('article h1 img').exists();
    assert.dom('article h1').hasText('Artificial Intelligence');
    assert.dom('article .article-paragraphs p').exists({ count: 4 });
  });
});
