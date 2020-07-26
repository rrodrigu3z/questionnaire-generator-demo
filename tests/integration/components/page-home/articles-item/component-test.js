import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | page-home/articles-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5)

    this.set('article', { title: 'Artificial Intelligence' });
    this.set('isSelected', false);
    this.set('onSelect', () => { });

    await render(hbs`
      <PageHome::ArticlesItem
        @article={{this.article}}
        @isSelected={{this.isSelected}}
        @onSelect={{action onSelect}}
      />
    `);

    assert.dom('li').exists();
    assert.dom('li').hasText('Artificial Intelligence');
    assert.dom('li img').exists();
    assert.dom('li svg').doesNotExist();

    this.set('isSelected', true);

    assert.dom('li svg').exists();
  });

  test('it calls select action', async function(assert) {
    assert.expect(1)

    this.set('onSelect', function() {
      assert.ok(true, 'onSelect action called');
    });

    await render(hbs`
      <PageHome::ArticlesItem
        @onSelect={{action onSelect}}
      />
    `);

    await click('li');
  });
});
