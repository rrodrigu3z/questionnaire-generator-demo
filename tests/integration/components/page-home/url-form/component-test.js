import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | page-home/url-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);

    this.set('onSubmit', () => { });

    await render(hbs`
      <PageHome::UrlForm
        @onSubmit={{action onSubmit}}
      />
    `);

    assert.dom('form').exists();
    assert.dom('form input#article-url').hasNoValue();
    assert.dom('#article-url').hasProperty('type', 'url');
    assert.dom('#article-url').hasProperty('required', true);
    assert.dom('form input[type="submit"]').exists();
  });

  test('it submits form', async function(assert) {
    assert.expect(2);

    let wikipediaURL = 'https://en.wikipedia.org/wiki/AI';

    this.set('onSubmit', (url) => {
      assert.ok(true, 'onSubmit called');
      assert.equal(url, wikipediaURL, 'passes the right URL');
    });

    await render(hbs`
      <PageHome::UrlForm
        @onSubmit={{action onSubmit}}
      />
    `);

    await fillIn('#article-url', wikipediaURL);
    await click('form input[type="submit"]');
  });

  test('it validates URL', async function(assert) {
    assert.expect(1);

    let wikipediaURL = 'https://wikipedia.com/';
    this.set('onSubmit', () => { });

    await render(hbs`
      <PageHome::UrlForm
        @onSubmit={{action onSubmit}}
      />
    `);

    await fillIn('#article-url', wikipediaURL);
    await click('form input[type="submit"]');

    assert.dom('[data-test-error-message]')
      .hasText('Please use a valid English Wikipedia URL');
  });
});
