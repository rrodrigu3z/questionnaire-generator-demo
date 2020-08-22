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

  test('parse article', function(assert) {
    assert.expect(2);

    stubService('fetch', {
      post(url, data) {
        assert.equal(data.title, 'Artificial_intelligence');
        assert.ok(
          url.match(/\/articles\/parse_pargraphs$/),
          'requests to the proper URL'
        );
      }
    });

    this.service.parse('Artificial_intelligence');
  });
});
