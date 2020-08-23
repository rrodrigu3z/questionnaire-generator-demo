import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | parsed-article', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('onSelect', () => { });
    this.set('paragraphs', [
      { paragraph: "Hello World" },
      { paragraph: "AI is cool" }
    ]);
  });

  test('it renders', async function(assert) {
    assert.expect(4);

    await render(hbs`
      <ParsedArticle
        @title="AI"
        @paragraphs={{this.paragraphs}}
        @onSelectParagraph={{this.onSelect}}
      />
    `);

    assert.dom('article h1 img').exists();
    assert.dom('article h1').hasText('AI');
    assert.dom('article .article-paragraphs .paragraph').exists({ count: 2 });
    assert.dom('.article-paragraphs').hasText('Hello World AI is cool');
  });

  test('it renders with a selected paragraph', async function(assert) {
    assert.expect(2);

    this.set('selectedParagraph', 1);

    await render(hbs`
      <ParsedArticle
        @title="AI"
        @paragraphs={{this.paragraphs}}
        @selectedParagraph={{this.selectedParagraph}}
        @onSelectParagraph={{this.onSelect}}
      />
    `);

    assert.dom('.paragraph.paragraph-active').exists({ count: 1 });
    assert.dom('.paragraph-active').hasText('AI is cool');
  });

  test('it changes selected paragraph', async function(assert) {
    assert.expect(3);

    this.set('selectedParagraph', 1);

    this.set('onSelect', (index) => {
      assert.equal(index, 0, 'sends the correct index');
    })

    await render(hbs`
      <ParsedArticle
        @title="AI"
        @paragraphs={{this.paragraphs}}
        @selectedParagraph={{this.selectedParagraph}}
        @onSelectParagraph={{this.onSelect}}
      />
    `);

    assert.dom('.paragraph-active').hasText('AI is cool');

    click('.article-paragraphs .paragraph:first-child');
    this.set('selectedParagraph', 0);

    assert.dom('.paragraph-active').hasText('Hello World');
  });
});
