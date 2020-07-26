import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | page-home/articles-popover', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3)

    this.set('articles', [
      { title: 'Artificial Intelligence' },
      { title: 'Deep Learning' }
    ]);

    this.set('onSelect', function(article) {
      assert.equal(this.articles[0], article, 'selects article');
    });

    await render(hbs`
      <PageHome::ArticlesPopover
        @articles={{this.articles}}
        @onSelect={{action onSelect}}
      />`);

    assert.dom('ul').exists();
    assert.dom('ul li').exists({ count: 2 });

    await click('ul li:first-child');
  });
});
