import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const articles = [
  { title: 'Artificial Intelligence' },
  { title: 'Deep Learning' }
];

module('Integration | Component | page-home/articles-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1)

    this.set('onSelect', () => { });

    await render(hbs`
      <PageHome::ArticlesSelect
        @placeholder="Please select..."
        @onSelect={{action onSelect}}
      />
    `);

    assert.dom('button').hasText('Please select...');
  });

  test('it selects an article', async function(assert) {
    assert.expect(4)

    this.set('articles', articles);
    this.set('onSelect', function(article) {
      assert.equal(articles[0], article, 'selects article');
      this.set('selected', article);
    });


    await render(hbs`
      <PageHome::ArticlesSelect
        @placeholder="Please select..."
        @articles={{this.articles}}
        @selected={{this.selected}}
        @onSelect={{action onSelect}}
      />
    `);

    await click('button');
    assert.dom('ul li').exists({ count: 2 }, 'shows dropdown');

    await click('ul li:first-child');
    assert.dom('ul li').doesNotExist('closes dropdown');
    assert.dom('button').hasText('Artificial Intelligence', 'Shows selected article');
  });
});
