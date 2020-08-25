import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | Home Page', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /', async function(assert) {
    assert.expect(4);

    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h2').hasText('Wikipedia questionnaire generator');
    assert.dom('#article-url').exists();
    assert.dom('[data-test-article-select]').exists();
  });

  test('process a wikipedia URL', async function(assert) {
    assert.expect(2);

    let url = 'https://en.wikipedia.org/wiki/Artificial_intelligence';

    server.post('/articles/parse_paragraphs', (_, request) => {
      let params = JSON.parse(request.requestBody);
      assert.equal(params.title, 'Artificial_intelligence');
    });

    await visit('/');
    await fillIn('#article-url', url);
    await click('input[type="submit"]');

    assert.equal(
      currentURL(),
      '/generator/Artificial_intelligence',
      'redirects to generator page'
    );
  });

  test('select a pre-defined article', async function(assert) {
    assert.expect(2);

    server.post('/articles/parse_paragraphs', (_, request) => {
      let params = JSON.parse(request.requestBody);
      assert.equal(params.title, 'Artificial_intelligence');
    });

    await visit('/');
    await click('[data-test-article-select]');
    await click('[data-test-article-item]');

    assert.equal(
      currentURL(),
      '/generator/Artificial_intelligence',
      'redirects to generator page'
    );
  });
});
