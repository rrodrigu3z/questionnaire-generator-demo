import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import stubService from 'questionnaire-generator-demo/tests/helpers/stub-service';

module('Unit | Service | wikipedia', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:wikipedia');
  });

  test('it extracts the title from URL', function(assert) {
    assert.expect(1);
    const url = 'https://en.wikipedia.org/wiki/Artificial_intelligence';
    const title = this.service.extractTitle(url);

    assert.equal(title, 'Artificial_intelligence');
  });

  test('it decodes the title when extracting it', function(assert) {
    assert.expect(1);
    const url = 'https://en.wikipedia.org/wiki/Gabriel_Faur%C3%A9';
    const title = this.service.extractTitle(url);

    assert.equal(title, 'Gabriel_Fauré');
  });

  test('it returns null title with invalid URL', function(assert) {
    assert.expect(1);
    const url = 'https://other.wiki/wiki/Artificial_intelligence';
    const title = this.service.extractTitle(url);

    assert.notOk(title, 'returns empty title');
  });

  test('isValidUrl returns true with valid URL', function(assert) {
    assert.expect(1);
    const url = 'https://en.wikipedia.org/wiki/Artificial_intelligence';

    assert.ok(this.service.isValidUrl(url));
  });

  test('isValidUrl returns false with invalid URL', function(assert) {
    assert.expect(1);
    const url = 'https://other.wiki/wiki/Artificial_intelligence';

    assert.notOk(this.service.isValidUrl(url));
  });

  test('parse article', async function(assert) {
    assert.expect(4);

    stubService('fetch', {
      post(url, data) {
        assert.equal(data.title, 'Artificial_intelligence');
        assert.ok(
          url.match(/\/articles\/parse_paragraphs$/),
          'requests to the proper URL'
        );

        return { json: () => { return { data: [] } } };
      }
    });

    const json = await this.service.parse('Artificial_intelligence');

    assert.equal(json.title, 'Artificial intelligence', 'returns title');
    assert.deepEqual(json.data, [], 'returns data');
  });
});
